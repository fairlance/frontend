import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';
import {EventAggregator} from "aurelia-event-aggregator";
declare let wsNotificationUrl: string;

@inject('AppHttpClient', Router, User, EventAggregator)
export class Navigation {
  private router: Router;
  private user: any;
  private app: HttpClient;
  private auth: Object;
  private websocket: any;
  private wsUri: string = wsNotificationUrl;
  private messages: Array<any> = [];
  private counter: number = 0;
  private ea: any;

  constructor(app, router, user, eventAggregator) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    if (this.user) {
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      this.openConnection();
    }
    this.ea = eventAggregator;
  }

  attached() {
    this.messages = [
      {
        read: false,
        content: 'Stefan je veliki gospodin koji je toliko debeo da moramo da mu da mo mobilini elefon',
        sender: 'Milos Krsmanovic',
        date: '2017-02-19T02:19:32+00:00',
        project: 1
      },
      {
        read: false,
        content: 'Stefan j e gospodin',
        sender: 'Milos Krsmanovic',
        date: '2017-02-19T02:19:32+00:00',
        project: 1
      },
      {
        read: true,
        content: 'Stefan j e gospodin',
        sender: 'Milos Krsmanovic',
        date: '2017-02-19T02:19:32+00:00',
        project: 1
      },
      {
        read: true,
        content: 'Stefan j e gospodin',
        sender: 'Milos Krsmanovic',
        date: '2017-02-19T02:19:32+00:00',
        project: 1
      },
      {
        read: true,
        content: 'Stefan j e gospodin',
        sender: 'Milos Krsmanovic',
        date: '2017-02-19T02:19:32+00:00',
        project: 1
      }
    ];
    this.counter = this.messages.filter(item => item.read === false).length;
    this.ea.publish('notification', this.messages);
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

  async onMessage(evt) {
    let first = this;
    let messageArray: Array<any> = JSON.parse(evt.data);
    await messageArray.forEach(function (message) {
      if (first.user.id === message.userId) {
        message.side = 'right';
      } else {
        message.side = 'left';
      }
      first.messages.push(message);
    });
  }

  private onError(evt) {
    console.log(evt.data);
  }
}