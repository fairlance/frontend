import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from "aurelia-event-aggregator";
import {Notification} from "../../services/notification/notification";
import {User} from "../../services/user/user";


@inject(Router, EventAggregator)
export class Notifications {
  private router: Router;
  private messages: Array<any> = [];
  private ea: any;
  private subscriber: any;
  private notificationService: Notification = Notification.getInstance();
  private userService: User = User.getInstance();
  private user: IUser;

  constructor(router, eventAggregator) {
    this.router = router;
    this.ea = eventAggregator;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
    } else {
      return;
    }
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

  private readMessage(message: any, type: string) {
    const first = this;
    this.messages[type] = this.messages[type].filter(function( obj ) {
      return obj.timestamp !== message.timestamp;
    });
    this.ea.publish('notification', this.messages);
    this.notificationService.doSend(JSON.stringify({
      "type": "read",
      "from": {
        "type": first.user.type,
        "id": first.user.id
      },
      "to": [{
        "type": first.user.type,
        "id": first.user.id
      }],
      "data": {
        "timestamp": message.timestamp.toString()
      }
    }));
    this.goToNotification(message, type);
  }

  private goToNotification(message: any, type: string) {
    switch (type) {
      case 'application':
        this.router.navigateToRoute('application', {
          id: message.data.jobId,
          appId: message.data.jobApplication.id
        });
        break;
      case 'project':
        this.router.navigateToRoute('project', {
          id: message.data.project.id
        });
        break;
      case 'message':
        this.router.navigateToRoute('project', {
          id: message.data.projectId
        });
        break;
    }

  }
}