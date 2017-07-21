import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Helper} from "../../services/helper/helper";
import * as $ from 'jquery';

declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, Helper)
export class CreateJob {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private app: any;
  private upload: any;
  private auth: Object;
  private name: string;
  private priceFrom: string;
  private priceTo: string;
  private summary: string;
  private details: string;
  private files: Array<any> = [];
  private helper: Helper;
  private newSkill: string;
  private skills: Array<string> = [];
  private uploadUrl: string = uploadBaseUrl;
  private attachedItems: Array<any> = [{url: '', description: '', name: ''}];
  private attachedLinks: Array<any> = [{url: '', description: '', name: ''}];
  private flexibility: string;
  private deadline: string;


  constructor(app, upload, router, helper) {
    this.router = router;
    this.app = app;
    this.upload = upload;
    this.helper = helper;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
  }

  private async uploadItem(item: number) {
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
      let temp = first.attachedItems.slice();
      temp[item] = data.data;
      first.attachedItems = temp;
    } catch (error) {
      console.log(error);
    }
  }

  private addSkill() {
    if (this.newSkill) {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }
  }

  private addItem() {
    if (this.attachedItems.length < 5) {
      this.attachedItems.push({
        url: '',
        description: ''
      });
    }
  }

  private addLink() {
    if (this.attachedLinks.length < 5) {
      this.attachedLinks.push({
        url: '',
        description: ''
      });
    }
  }

  private deleteTag(count: number) {
    this.skills.splice(count, 1);
  }

  async addJob(): Promise<void> {
    let first = this;
    if (this.name && this.skills.length && this.priceFrom && this.priceTo && this.deadline && this.flexibility && this.summary && this.details) {
      try {
        const response = await first.app.fetch('job/new', {
          method: 'post',
          headers: first.auth,
          body: first.prepareJob()
        });
        let data = await response.json();
        this.router.navigateToRoute('job', {id: data.data.id}, {replace: true});

      } catch (error) {
        console.log(error);
      }
    } else {
      $('.create-job').addClass('error');
    }

  };

  private prepareJob(): any {
    this.attachedLinks = this.attachedLinks.filter(function (obj) {
      return obj.url !== '';
    });
    this.attachedItems = this.attachedItems.filter(function (obj) {
      return obj.url !== '';
    });
    let body = {
      name: this.name,
      tags: this.skills,
      priceFrom: parseInt(this.priceFrom),
      priceTo: parseInt(this.priceTo),
      deadline: new Date(this.deadline),
      flexibility: parseInt(this.flexibility),
      summary: this.summary,
      details: this.details,
      attachments: this.attachedItems,
      examples: this.attachedLinks
    };
    console.log(body);
    return json(body);
  }
}