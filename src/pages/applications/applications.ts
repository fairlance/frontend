import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';

@inject('AppHttpClient', Router)
export class ApplicationOverview {
  private jobs = [];
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
      this.getApplications();
    } else {
      return;
    }
  }

  private goToApplication(appId: string, jobId: string) {
    this.router.navigateToRoute('application', {
      id: jobId,
      appId: appId
    });
  }

  async getApplications(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job', {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.jobs = data.data;
  }
}