import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Helper} from "../../services/helper/helper";

declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, User, Helper)
export class CreateJob {
  private router: Router;
  private user: any;
  private app: any;
  private upload: any;
  private auth: Object;
  private links: Array<IWebExample> = [];
  private url: string;
  private desc: string;
  private name: string;
  private price: string;
  private summary: string;
  private details: string;
  private attachments: Array<IAttachment> = [];
  private files: any;
  private helper: Helper;
  private uploadUrl: string = uploadBaseUrl;


  constructor(app, upload, router, user, helper) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.upload = upload;
    this.helper = helper;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  private addExample(): void {
    if (this.url && this.url.length && this.desc.length) {
      this.links.push({
        'url': this.url,
        'description': this.desc
      });
      this.url = '';
      this.desc = '';
    }
  }

  private async uploadAttachment(): Promise<void> {
    let first = this;
    let form = new FormData();
    await this.helper.sleep(300);
    console.log(this.files);
    form.append('uploadfile', this.files[0]);
    try {
      const response = await first.upload.fetch('upload', {
        method: 'post',
        headers: first.auth,
        body: form
      });
      let data = await response.json();
      console.log(data);
      first.attachments.push(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async addJob(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job/new', {
      method: 'post',
      headers: first.auth,
      body: first.prepareJob()
    });
    let data = await response.json();
    this.router.navigateToRoute('job', {id: data.data.id}, {replace: true});
  };

  private prepareJob(): any {
    let body = {
      name:     this.name,
      summary:  this.summary,
      price:  parseInt(this.price),
      details:  this.details,
      clientId: this.user.id,
      isActive: true,
      attachments: this.attachments,
      examples: this.links
    };
    return json(body);
  }
}