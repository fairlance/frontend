import {inject} from 'aurelia-framework';
import {User} from '../../services/user/user';
import {EventAggregator} from "aurelia-event-aggregator";
import {Router} from "aurelia-router";
import {Notification} from "../../services/notification/notification";
import {Cookie} from "../../services/cookie/cookie";

@inject(EventAggregator, Router, Cookie)
export class Navigation {
  private user: IUser;
  private userService: User = User.getInstance();
  private notificationService: Notification;
  private counter: number = 0;
  private router: Router;
  private ea: EventAggregator;
  private subscriber: any;
  private messages: Array<any> = [];
  private cookie: Cookie;

  constructor(eventAggregator, router, cookie) {
    this.ea = eventAggregator;
    this.router = router;
    this.cookie = cookie;
  }

  attached() {
    const first = this;
    this.notificationService = Notification.getInstance();
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
      first.counter = first.messages.filter(item => item.read === false).length;
    });
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
    } else {
      this.router.navigate('login');
      return;
    }
  }

  logout() {
    this.cookie.remove('fairlance');
    this.router.navigate('login');
  }

  detached() {
    this.subscriber.dispose();
  }
}