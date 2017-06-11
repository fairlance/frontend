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
  private messageArray: Array<any> = [];

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
  }

  private async onMessage(evt) {
    let message: Array<any> = JSON.parse(evt.data);
    await message;
    this.messageArray.push(message[0]);
    this.ea.publish('notification', this.messageArray);
  }

  public doSend(message) {
    this.websocket.send(message);
  }

  private onError(evt) {
    console.log(evt.data);
  }
}