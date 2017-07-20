import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';
import {Helper} from '../../services/helper/helper';
import * as $ from 'jquery';

declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, Helper)
export class Application {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private helper: Helper;
  private upload: HttpClient;
  private app: any;
  private auth: Object;
  private details: any;
  private jobId: number;
  private view: boolean = false;
  //application
  private solution: string;
  private summary: string;
  private flexibility: string;
  private deadline: string;
  private hourPrice: string;
  private hours: string;
  private name: string;

  constructor(app, upload, router, helper) {
    this.upload = upload;
    this.router = router;
    this.app = app;
    this.helper = helper;
  }

  async activate(params) {
    const first = this;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      this.jobId = parseInt(params.id);
      this.getJob();
      const response = await first.app.fetch('freelancer/' + this.user.id, {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      this.user = data.data;
    } else {
      return;
    }
  }

  private async getJob(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job/' + first.jobId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.details = data.data;
  }

  private preview(): void {
    this.view = !this.view;
  }

  private cancel(): void {
    this.router.navigateToRoute('projects');
  }

  private prepareApplication(): Object {
    let result = {
      'summary': this.summary,
      'solution': this.solution,
      'deadline': new Date(this.deadline),
      'title': this.name,
      'flexibility': parseInt(this.flexibility),
      'freelancerId': this.user.id,
      'hours': parseInt(this.hours),
      'hourPrice': parseInt(this.hourPrice)
    };
    return json(result);
  }

  private async submit(): Promise<void> {
    let first = this;
    if (this.summary && this.solution && this.deadline && this.name && this.hourPrice && this.hours) {
      try {
        const response = await first.app.fetch('job/' + first.jobId + '/apply', {
          method: 'put',
          headers: first.auth,
          body: first.prepareApplication()
        });
        await response.json();
        first.router.navigateToRoute('jobs/');
      } catch (error) {
        console.log(error);
      }
    } else {
      $('.apply').addClass('error');
      return;
    }
  }
}