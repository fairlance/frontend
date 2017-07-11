import {inject} from 'aurelia-framework';
import {User} from '../../services/user/user';
import {EventAggregator} from "aurelia-event-aggregator";
import {Router} from "aurelia-router";
import {Notification} from "../../services/notification/notification";
import {Cookie} from "../../services/cookie/cookie";

@inject('AppHttpClient', EventAggregator, Router, Cookie)
export class Navigation {
  private user: IUser;
  private userService: User = User.getInstance();
  private notificationService: Notification;
  private counter: number = 0;
  private router: Router;
  private ea: EventAggregator;
  private subscriber: any;
  private messages: any = {};
  private auth: Object;
  private cookie: Cookie;
  private http: any;

  constructor(http, eventAggregator, router, cookie) {
    this.ea = eventAggregator;
    this.router = router;
    this.cookie = cookie;
    this.http = http;
  }

  attached() {
    const first = this;
    this.notificationService = Notification.getInstance();
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
      first.counter = first.messages.project.length + first.messages.applications.length + first.messages.messages.length;
    });
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      this.router.navigate('login');
      return;
    }
  }

  private async deleteProfile(): Promise<void> {
    let first = this;
    try {
      const response = await first.http.fetch('freelancer/4', {
        method: 'delete',
        headers: this.auth
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      // console.log(error);
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