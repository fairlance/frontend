import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

declare let wsBaseUrl: string;

@inject('AppHttpClient', Router, User, Element)
export class Project {
  private router: Router;
  private user: any;
  private http: any;
  private auth: Object;
  private element: Element;
  private projectId: number;
  private message: string;
  private wsUri: string = wsBaseUrl;
  private websocket: any;
  private messages: Array<any> = [];
  private slideMenu: any;

  constructor(http, router, user, element) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + user.token};
  }

  activate(params) {
    this.projectId = params.id;
    this.openConnection();
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
      if (first.user.id === message.id) {
        message.side = 'right';
        message.avatar = 'http://placehold.it/50/FA6F57/fff&text=ME'
      } else {
        message.side = 'left';
        message.avatar = 'http://placehold.it/50/55C1E7/fff&text=U'
      }
      first.messages.push(message);
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
    pre.avatar = 'http://placehold.it/50/4286f4/fff&text=SYS';
    this.messages.push(pre);
  }

  private scrollBottom() {
    this.slideMenu = document.getElementById('slidemenu');
    this.slideMenu.scrollTop = this.slideMenu.scrollHeight;
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
}