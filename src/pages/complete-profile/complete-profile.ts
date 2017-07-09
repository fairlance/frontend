import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';

@inject('AppHttpClient', Router)
export class CompleteProfile {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private app: HttpClient;
  private auth: Object;

  constructor(app, router) {
    this.router = router;
    this.app = app;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
  }
}