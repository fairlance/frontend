import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";


@inject('AppHttpClient', 'SearchHttpClient', Router, User)
export class CreateJob {
  private router: Router;
  private user: any;
  private app: any;
  private search: any;
  private auth: Object;
  private links: Array<IWebExample> = [];
  private url: string;
  private desc: string;

  constructor(app, search, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  private addExample(): void {
    if (this.url && this.url.length && this.desc.length) {
      this.links.push({
        'link': this.url,
        'description': this.desc
      });
      this.url = '';
      this.desc = '';
    }
  }
}