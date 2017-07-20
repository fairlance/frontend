import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';
import {Helper} from "../../services/helper/helper";
import * as $ from 'jquery';

declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'UploadHttpClient', Router, Helper)
export class CompleteProfile {
  private router: Router;
  private type: string;
  private userService: User = User.getInstance();
  private app: HttpClient;
  private auth: Object;
  private user: IUser;
  private helper: Helper;
  private upload: HttpClient;
  private files: Array<any> = [];
  private profilePicture: IAttachmnet;
  private days: Array<number> = Array.from(new Array(31), (val, index) => index + 1);
  private months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  private years: Array<number> = [];
  private selectedYear: number;
  private selectedDay: number = 1;
  private selectedMonth: number = 1;
  private newSkill: string;
  private skills: Array<string> = [];
  private userId: string;
  private uploadUrl: string = uploadBaseUrl;
  //profile
  private description: string;
  private timezone: string;
  private payPal: string;
  private phone: string;
  private certificate: IAttachmnet;
  private portfolioItems: Array<any> = [{url: '', description: '', name: ''}];
  private portfolioLinks: Array<any> = [{url: '', description: '', name: ''}];


  constructor(app, upload, router, helper) {
    let date = new Date();
    const fromYear: number = 1901;
    const toYear: number = date.getFullYear() - 16;
    this.router = router;
    this.upload = upload;
    this.app = app;
    this.helper = helper;
    for (let i: number = 0; i < (toYear - fromYear); i++) {
      this.years.push(toYear - i);
    }
    this.selectedYear = this.years[0];
  }

  async activate(params) {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
  }

  private async uploadProfilePicture() {
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
      first.profilePicture = data.data;
    } catch (error) {
      console.log(error);
    }
  }

  private async uploadPortfolioItem(item: number) {
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
      let temp = first.portfolioItems.slice();
      temp[item] = data.data;
      first.portfolioItems = temp;
    } catch (error) {
      console.log(error);
    }
  }

  private async uploadCertificate() {
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
      first.certificate = data.data;
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

  private addPortfolioItem() {
    if (this.portfolioItems.length < 5) {
      this.portfolioItems.push({
        url: '',
        description: ''
      });
    }
  }

  private addPortfolioLink() {
    if (this.portfolioLinks.length < 5) {
      this.portfolioLinks.push({
        url: '',
        description: ''
      });
    }
  }

  private deleteTag(count: number) {
    this.skills.splice(count, 1);
  }

  private completeProfile() {
    this.portfolioLinks = this.portfolioLinks.filter(function (obj) {
      return obj.url !== '';
    });
    this.portfolioItems = this.portfolioItems.filter(function (obj) {
      return obj.url !== '';
    });
    let profile = {
      image: this.profilePicture ? this.profilePicture.url : '',
      about: this.description,
      timezone: this.timezone,
      birthdate: this.selectedDay + '-' + this.selectedMonth + '-' + this.selectedYear,
      payPalEmail: this.payPal,
      phone: this.phone,
      attachment: this.certificate,
      skills: this.skills,
      portfolioItems: this.portfolioItems,
      portfolioLinks: this.portfolioLinks
    };
    return json(profile);
  }

  private async saveProfile() {
    const first = this;
    try {
      const response = await first.app.fetch(first.user.type + '/' + first.user.id + '/complete_profile', {
        method: 'post',
        headers: this.auth,
        body: first.completeProfile()
      });
      let data = await response.json();
      $('.btn-main').removeClass('disabled');
      this.router.navigateToRoute(this.user.type, {id: this.user.id});
    } catch (error) {
      $('.form-inline').addClass('error');
      console.log(error);
    }
  }
}