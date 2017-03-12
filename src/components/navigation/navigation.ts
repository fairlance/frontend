import {inject} from 'aurelia-framework';
import {User} from '../../services/user/user';
import {EventAggregator} from "aurelia-event-aggregator";
import {Router} from "aurelia-router";
import {Notification} from "../../services/notification/notification";

@inject(EventAggregator, Router)
export class Navigation {
  private user: IUser;
  private userService: User = User.getInstance();
  private notificationService: Notification;
  private counter: number = 0;
  private router: Router;
  private ea: EventAggregator;
  private subscriber: any;
  private messages: Array<any> = [];

  constructor(eventAggregator, router) {
    this.ea = eventAggregator;
    this.router = router;
  }

  attached() {
    const first = this;
    this.notificationService = Notification.getInstance();
    this.user = this.userService.getCurrentUser().data;
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
      first.counter = first.messages.filter(item => item.read === false).length;
    });
  }



  detached() {
    this.subscriber.dispose();
  }
}