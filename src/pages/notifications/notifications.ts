import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {EventAggregator} from "aurelia-event-aggregator";


@inject('AppHttpClient', Router, User, Element, EventAggregator)
export class Notifications {
  private router: Router;
  private user: any;
  private app: HttpClient;
  private auth: Object;
  private element: Element;
  private messages: Array<any> = [];
  private ea: any;
  private subscriber: any;

  constructor(app, router, user, element,  eventAggregator) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.ea = eventAggregator;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  attached() {
    const first = this;
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
      console.log('aaddadda', first.messages)
    });
  }

  detached() {
    this.subscriber.dispose();
  }
}