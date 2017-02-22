import {inject} from 'aurelia-framework';
import {User} from '../../services/user/user';
import {EventAggregator} from "aurelia-event-aggregator";
import {Notification} from "../../services/notification/notification";

@inject(EventAggregator, Notification)
export class Navigation {
  private user: any;
  private auth: Object;
  private userService: any = User.getInstance();
  private notificationService: Notification;
  private counter: number = 0;
  private ea: any;
  private subscriber: any;
  private messages: Array<any> = [];

  constructor(eventAggregator, notification) {
    this.user = this.userService.getCurrentUser().data;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
    this.ea = eventAggregator;
    this.notificationService = notification;
  }

  attached() {
    const first = this;
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
      first.counter = first.messages.filter(item => item.read === false).length;
    });
  }

  detached() {
    this.subscriber.dispose();
  }
}