import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';
import {Helper} from '../../services/helper/helper';

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
  private links: Array<IWebExample> = [];
  private url: string;
  private desc: string;
  private intro: string;
  private files: Array<any> = [];
  private attachments: Array<IAttachmnet> = [];
  private uploadUrl: string = uploadBaseUrl;
  private view: boolean = false;
  private submitButton: boolean = true;
  private appId: number;

  constructor(app, upload, router, helper) {
    this.upload = upload;
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
    if (this.appId) {this.getApplication();}
  }

  private async getApplication() {
    this.preview();
    this.submitButton = false;
    await this.getJob();
    let application = this.details.jobApplications.filter(item => item.id === this.appId)[0];
    this.intro = application.message;
    this.links = application.examples;
    this.attachments = application.attachments;

  }

  private async uploadFile() {
    let first = this;
    let form = new FormData();
    await this.helper.sleep(300);
    form.append('uploadfile', this.files[0]);
    try {
      const response = await first.upload.fetch('upload', {
        method: 'post',
        headers: first.auth,
        body: form
      });
      let data = await response.json();
      first.attachments.push(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  private addExample(): void {
    if (this.url.length && this.desc.length) {
      this.links.push({
        'url': this.url,
        'description': this.desc
      });
    }
    this.url = '';
    this.desc = '';
  }

  async getJob(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job/' + first.jobId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.details = data.data;
    console.log(this.details);
  }

  private preview(): void {
    this.view = !this.view;
  }
  
  private prepareApplication(): Object {
    let result = {
      'message': this.intro,
      'freelancerId': this.user.id,
      'hours': 1,
      'hourPrice': 1.1,
      'examples': this.links,
      'attachments': this.attachments
    };
    return json(result);
  }

  private async submit(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('job/' + first.jobId + '/apply', {
        method: 'put',
        headers: first.auth,
        body: first.prepareApplication()
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    first.router.navigate('job/' + first.jobId);
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