import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';

@inject('AppHttpClient', Router, User)
export class ApplicationOverview {
  private jobs = [];
  private router: Router;
  private user: any;
  private app: HttpClient;
  private auth: Object;

  constructor(app, router, user) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};

    this.getApplications();
  }

  private goToApplication(appId: string, jobId: string) {
    console.log(appId, jobId);
    this.router.navigateToRoute('application', {
      id: jobId,
      appId: appId
    });
  }

  async getApplications(): Promise<void>  {
    let first = this;
    const response = await first.app.fetch('job', {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.jobs = data.data;
  }
}