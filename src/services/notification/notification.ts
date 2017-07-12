import {User} from "../user/user";
import {EventAggregator} from "aurelia-event-aggregator";
import {Container} from 'aurelia-dependency-injection';
declare let wsNotificationUrl: string;

export class Notification {
  private static instance: Notification;
  private ea: EventAggregator = Container.instance.get(EventAggregator);
  private userService: any = User.getInstance();
  private user: IUser;
  private wsUri: string = wsNotificationUrl;
  private websocket: any;
  private messageArray: any = {
    applications: [],
    project: [],
    messages: []
  };

  constructor() {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
    } else {
      return;
    }
    this.openConnection();
  }

  static getInstance() {
    if (!Notification.instance) {
      Notification.instance = new Notification();
    }
    return Notification.instance;
  }

  private openConnection() {
    let first = this;
    this.websocket = new WebSocket(this.wsUri + '?token=' + first.user.token);
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

  public getMessages(): Array<any> {
    return this.messageArray;
  }

  private onClose() {
    console.log('DISCONNECTED');
    this.openConnection();
  }

  private async onMessage(evt) {
    const first = this;
    let message: Array<any> = JSON.parse(evt.data);
    await message;
    switch (message[0].type) {
      case 'project_contract_proposal':
        first.messageArray.project.push(message[0]);
        break;
      case 'project_contract_extension_proposal':
        first.messageArray.project.push(message[0]);
        break;
      case 'project_finished_by_freelancer':
        first.messageArray.project.push(message[0]);
        break;
      case 'project_done':
        first.messageArray.project.push(message[0]);
        break;
      case 'project_status_changed':
        first.messageArray.project.push(message[0]);
        break;
      case 'project_contract_accepted':
        first.messageArray.project.push(message[0]);
        break;
      case 'job_application_added':
        first.messageArray.applications.push(message[0]);
        break;
      case 'job_application_accepted':
        first.messageArray.project.push(message[0]);
        break;
      case 'new_message':
        first.messageArray.messages.push(message[0]);
        break;
    }
    this.ea.publish('notification', this.messageArray);
  }

  public doSend(message) {
    this.websocket.send(message);
  }

  private onError(evt) {
    console.log(evt.data);
  }
}