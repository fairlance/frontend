import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';

@inject('AppHttpClient', Router)
export class ApplicationOverview {
  private job: any;
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private jobId: string;
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

  async activate(params) {
    this.jobId = params.id;
    this.getApplications();
  }

  async getApplications(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job/' + first.jobId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.job = data.data;
    console.log(first.job);

  }
}