import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../../services/user/user';
import {Helper} from '../../services/helper/helper';

@inject('AppHttpClient', Router, Helper)
export class ApplicationPreview {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private helper: Helper;
  private app: any;
  private auth: Object;
  private job: any;
  private application: any;
  private jobId: number;
  private appId: number;

  constructor(app, router, helper) {
    this.router = router;
    this.app = app;
    this.helper = helper;
  }

  activate(params) {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
    this.jobId = parseInt(params.id);
    this.appId = parseInt(params.appId);
    if (this.appId) {
      this.getApplication();
    }
  }

  private async getApplication() {
    let first = this;
    const response = await first.app.fetch('job/' + first.jobId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.job = data.data;
    first.application = first.job.jobApplications.filter(item => item.id === first.appId)[0];
    console.log('application', first.application);
  }

  private async proceed(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('/project/create_from_job_application/' + first.appId, {
        method: 'post',
        headers: first.auth
      });
      let data = await response.json();
      this.router.navigateToRoute('project', {id: data.data.id}, {replace: true});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

}