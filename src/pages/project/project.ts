import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

declare let wsBaseUrl: string;
declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, User, Element)
export class Project {
  private router: Router;
  private user: any;
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
  private files: any;
  private uploadUrl: string = uploadBaseUrl;
  private showProposal: boolean = false;
  private showContract: boolean = false;
  private showFiles: boolean = false;
  private contract: any;
  private systemMessage: any;
  private deadline: string;
  private flexibility: string;
  private contractAgree: boolean = true;
  private contractChanges: boolean = false;
  private contractUpdate: boolean = false;
  private contractWaiting: boolean = false;
  private disableFields: boolean = false;

  constructor(app, upload, router, user, element) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.upload = upload;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  async activate(params) {
    this.projectId = params.id;
    await this.getProject();
    this.openConnection();
  }

  deactivate() {
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
    this.writeToScreen('CONNECTED');
  }

  private onClose() {
    this.writeToScreen('DISCONNECTED');
  }

  async onMessage(evt) {
    let first = this;
    let messageArray: Array<any> = JSON.parse(evt.data);
    await messageArray.forEach(function (message) {
      if (first.user.id === message.userId) {
        message.side = 'right';
      } else {
        message.side = 'left';
      }
      if (message.userType === 'system') {
        first.parseIncoming(message);
      } else {
        first.messages.push(message);
      }

    });
    this.scrollBottom();
  }

  private onError(evt) {
    this.writeToScreen(evt.data);
  }

  private doSend(message) {
    if(message) {
      this.websocket.send(message);
      this.message = '';
    }
  }

  private writeToScreen(message: string) {
    let pre: any = {};
    pre.text = message;
    pre.username = 'System';
    pre.side = 'left';
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  private toggleMenu() {
    let selected = this.element.querySelector('.slide-active');

    $('#slidemenu').stop().animate({
      left: selected ? '-100%' : '0px'
    });

    $('#navbar-height-col').stop().animate({
      left: selected ? '-80%' : '0px'
    });

    $('#page-content').stop().animate({
      left: selected ? '0px' : '80%'
    });

    $('.navbar-header').stop().animate({
      left: selected ? '0px' : '80%'
    });

    $(this).toggleClass('slide-active', !selected);
    $('#slidemenu').toggleClass('slide-active');

    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');

    this.scrollBottom();
  }

  private async getProject(): Promise<void>  {
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
    let data: any = JSON.parse(message.text);
    this.systemMessage = data.proposal;
    console.log(message);
    if (data.status) {
      message.text = 'New status of the project is ' + data.status;
      this.messages.push(message);
      this.getProject();
    } else if (data.type === 'project_contract_accepted') {
      message.text = 'Contract accepted by ' + data.user.firstName;
      this.messages.push(message);
      if (data.user.id === this.user.id && data.userType === this.user.type) {
        this.contractAgree = false;
        this.contractChanges = false;
        this.contractUpdate = false;
        this.contractWaiting = true;
      }
    } else if (data.proposal.userId === this.user.id && data.proposal.userType === this.user.type) {
      message.text = 'New proposal made by ' + data.proposal.userType;
      this.messages.push(message);
      this.contractAgree = false;
      this.contractChanges = false;
      this.contractUpdate = false;
      this.contractWaiting = true;
    } else {
      this.contractAgree = false;
      this.contractChanges = true;
      this.contractUpdate = false;
      this.contractWaiting = false;
      this.disableFields = true;
    }
  }

  private async loadChanges() {
    this.setContract(this.systemMessage);
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
    let date = new Date(this.project.deadline);
    if (date.toISOString().substr(0, 10) !== this.deadline || this.project.deadlineFlexibility.toString() !== this.flexibility) {
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

  private toggleSection(section: string) {
    this[section] = !this[section];
  }
}