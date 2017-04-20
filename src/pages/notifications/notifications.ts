import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {EventAggregator} from "aurelia-event-aggregator";
import {Notification} from "../../services/notification/notification";


@inject(Router, EventAggregator)
export class Notifications {
  private router: Router;
  private userService: User = User.getInstance();
  private user: any;
  private messages: Array<any> = [];
  private ea: any;
  private subscriber: any;
  private notificationService: Notification = Notification.getInstance();

  constructor(router, eventAggregator) {
    this.user = this.userService.getCurrentUser().data;
    this.router = router;
    this.ea = eventAggregator;
  }

  attached() {
    const first = this;
    this.subscriber = this.ea.subscribe('notification', response => {
      first.messages = response;
    });
    this.messages = this.notificationService.getMessages();
  }

  detached() {
    this.subscriber.dispose();
  }

  private goToNotification(message: any) {
    message.read = true;
    this.ea.publish('notification', this.messages);
    this.notificationService.doSend(JSON.stringify({
      "type": "read",
      "from": {
        "type": "freelancer",
        "id": 1
      }, "to": [{
        "type": "freelancer",
        "id": 1
      }],
      "data": {
        "timestamp": message.timestamp.toString()
      }
    }));
    this.router.navigateToRoute('application', {
      id: message.data.jobId,
      appId: message.data.jobApplication.id
    });

  }
}