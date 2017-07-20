import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';
import * as $ from 'jquery';

declare let wsBaseUrl: string;
declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, Element)
export class Project {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private app: HttpClient;
  private upload: HttpClient;
  private project: any;
  private auth: Object;
  private element: Element;
  private projectId: number;
  private message: string;
  private wsUri: string = wsBaseUrl;
  private websocket: any;
  private messages: Array<any> = [];
  private slideMenu: any;
  private files: Array<any> = [];
  private uploadUrl: string = uploadBaseUrl;
  private contract: any;
  private systemMessage: any;
  private deadline: string;
  private flexibility: string;

  private contractAgree: boolean = true;
  private contractChanges: boolean = false;
  private contractUpdate: boolean = false;
  private contractWaiting: boolean = false;
  private disableFields: boolean = false;
  private deliverables: Array<any>;

  private status: any = {
    finalizing_terms: {
      'freelancer': 'Finalizing Terms',
      'class': 'finalizing_terms',
      'client': 'Finalizing Terms'
    },
    pending_funds: {
      'freelancer': 'Pending Funds',
      'class': 'pending_funds',
      'client': 'Pending Funding',
      'call_to_action': 'Fund the Project'
    },
    in_progress: {
      'freelancer': 'Working',
      'client': 'Working',
      'class': 'in_progress'
    },
    pending_finished: {
      'freelancer': 'Pending Finish Conformation',
      'class': 'pending_finished',
      'client': 'Marked as Finished',
      'call_to_action': 'Accept as Finished'
    },
    done: {
      'freelancer': 'Done, Congratulations!',
      'client': 'Done, Congratulations!',
      'class': 'done'
    }
  };

  constructor(app, upload, router, element) {
    this.router = router;
    this.app = app;
    this.upload = upload;
    this.element = element;
  }

  async activate(params) {
    this.projectId = params.id;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      await this.getProject();
      this.openConnection();
    } else {
      return;
    }
  }

  detached() {
    this.websocket.close();
  }

  private openConnection() {
    let first = this;
    this.websocket = new WebSocket(this.wsUri + first.projectId + '/ws?token=' + first.user.token);
    this.websocket.onopen = function () {
      first.onOpen()
    };
    this.websocket.onclose = function () {
      first.onClose()
    };
    this.websocket.onmessage = function (evt) {
      first.onMessage(evt)
    };
    this.websocket.onerror = function (evt) {
      first.onError(evt)
    };
  }

  private onOpen(): void {
    console.log('CONNECTED');
  }

  private onClose() {
    console.log('DISCONNECTED');
  }

  async onMessage(evt) {
    let first = this;
    let messageArray: Array<any> = JSON.parse(evt.data);
    let refresh: boolean = false;
    await messageArray.forEach(function (message) {
      if (message.from.type === 'system') {
        first.parseIncoming(message);
        refresh = true;
      } else {
        if (first.user.id === message.from.id && first.user.type === message.from.type) {
          message.side = 'right';
        } else {
          message.side = 'left';
        }
        first.messages.push(message);
      }
    });
    if (refresh && this.project.status === 'finalizing_terms') {
      this.getProject();
    }
    this.scrollBottom();
  }

  private onError(evt) {
    this.writeToScreen(evt.data);
  }

  private doSend(message) {
    if (message) {
      this.websocket.send(message);
      this.message = '';
    }
  }

  private writeToScreen(message: string, timestamp?: number) {
    let pre: any = {data: {}, from: {}};
    pre.data.text = message;
    pre.from.username = 'System';
    pre.side = 'center';
    pre.timestamp = timestamp;
    this.messages.push(pre);
  }

  private scrollBottom() {
    this.slideMenu = document.getElementById('slidemenu');
    this.slideMenu.scrollTop = this.slideMenu.scrollHeight;
  }

  private async uploadFile() {
    let first = this;
    let form = new FormData();
    form.append('uploadfile', this.files[0]);
    try {
      const response = await first.upload.fetch('upload', {
        method: 'post',
        headers: first.auth,
        body: form
      });
      let data = await response.json();
      first.deliverables.push(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  private toggleMenu() {
    let selected = this.element.querySelector('.slide-active');
    let menu = $('#slidemenu');
    menu.stop().animate({
      right: selected ? '-100%' : '0px'
    });
    menu.toggleClass('slide-active');
    $('.overlay').toggle();
    $('#page-content').toggleClass('open')

    this.scrollBottom();
  }

  private async getProject(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('project/' + first.projectId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.project = data.data;
    console.log(first.project);
    first.setContract(this.project.contract.proposal ? this.project.contract.proposal : this.project.contract);
  }

  private setContract(contract: any) {
    this.contract = contract;
    let date = new Date(this.contract.deadline);
    this.deadline = date.toISOString().substr(0, 10);
    this.flexibility = this.contract.deadlineFlexibility.toString();
  }

  private async contractAgreed() {
    let first = this;
    const response = await first.app.fetch('project/' + first.projectId + '/contract/agree', {
      method: 'post',
      headers: this.auth,
    });
  }

  private parseIncoming(message) {
    switch (message.data.type) {
      case 'project_contract_proposal':
        this.writeToScreen('New proposal from ' + message.data.user.firstName, message.timestamp);
        this.loadChanges();
        break;
      case 'project_contract_extension_proposal':
        break;
      case 'project_finished_by_freelancer':
        this.writeToScreen(message.data.user.firstName + ' has finished working on project', message.timestamp);
        break;
      case 'project_done':
        this.writeToScreen('Project done!', message.timestamp);
        break;
      case 'project_status_changed':
        this.writeToScreen('Project status is now: ' + message.data.status, message.timestamp);
        break;
      case 'project_contract_accepted':
        this.writeToScreen('Project accepted by ' + message.data.user.firstName, message.timestamp);
        break;
    }
  }

  private loadChanges() {
    this.disableFields = false;
    this.contractAgree = true;
    this.contractChanges = false;
    this.contractUpdate = false;
    this.contractWaiting = false;
  }

  private async newProposal() {
    let first = this;
    let body = {
      userType: this.user.type,
      userId: this.user.id,
      deadline: new Date(this.deadline),
      deadlineFlexibility: parseInt(this.flexibility),
      hours: this.project.hours,
      perHour: this.project.perHour
    };
    const response = await first.app.fetch('project/' + first.projectId + '/contract/proposal', {
      method: 'post',
      headers: this.auth,
      body: json(body)
    });
    let data = await response.json();
    this.contractAgree = false;
    this.contractChanges = false;
    this.contractUpdate = false;
    this.contractWaiting = true;
  }

  private changeContract() {
    let date = new Date(this.project.contract.deadline);
    if (date.toISOString().substr(0, 10) !== this.deadline || this.project.contract.deadlineFlexibility.toString() !== this.flexibility) {
      this.contractAgree = false;
      this.contractChanges = false;
      this.contractUpdate = true;
      this.contractWaiting = false;
    } else {
      this.contractAgree = true;
      this.contractChanges = false;
      this.contractUpdate = false;
    }
  }

  private async markFinished() {
    let first = this;
    await first.app.fetch('project/' + first.projectId + '/finish', {
      method: 'post',
      headers: this.auth,
    });
    this.getProject();
  }

  private async changeStatus() {
    switch (this.project.status) {
      case 'pending_funds':
        this.router.navigateToRoute('payment', {id: this.projectId});
        break;
      case 'pending_finished':
        let first = this;
        await first.app.fetch('project/' + first.projectId + '/done', {
        method: 'post',
        headers: this.auth,
      });
        this.getProject();
        break;
    }
  }

  private toggleSection(label: string) {
    let section = $('.' + label);
    section.toggle();
    section.parent().toggleClass('opened');
  }
}