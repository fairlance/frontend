import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {EventAggregator} from "aurelia-event-aggregator";
import {Notification} from "../../services/notification/notification";


@inject(Router, EventAggregator, Notification)
export class Notifications {
  private router: Router;
  private userService: any = User.getInstance();
  private user: any;
  private messages: Array<any> = [];
  private ea: any;
  private subscriber: any;
  private notificationService: Notification;

  constructor(router, eventAggregator, notification) {
    this.user = this.userService.getCurrentUser().data;
    this.router = router;
    this.ea = eventAggregator;
    this.notificationService = notification;
  }

  attached() {
    const first = this;
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
    });
  }

  detached() {
    this.subscriber.dispose();
  }

  private goToNotification(message: any) {
    // console.log(message);
    this.notificationService.doSend({"type":"read", "from":"freelancer.1", "to":["freelancer.1"], "data": {"timestamp":"1487627243358"}});
  }
}