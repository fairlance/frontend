import {inject} from 'aurelia-framework';
import {User} from "../user/user";
import {EventAggregator} from "aurelia-event-aggregator";
declare let wsNotificationUrl: string;

@inject(EventAggregator)
export class Notification {
  private ea: any;
  private userService: any = User.getInstance();
  private user: any;
  private wsUri: string = wsNotificationUrl;
  private websocket: any;
  private messageArray: Array<any> = [];

  constructor(eventAggregator) {
    this.ea = eventAggregator;
    this.user = this.userService.getCurrentUser().data;
    this.openConnection();
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