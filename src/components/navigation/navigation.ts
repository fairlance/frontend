import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json, HttpClient} from 'aurelia-fetch-client';
import {User} from '../../services/user/user';

@inject('AppHttpClient', Router, User)
export class Navigation {
  private router: Router;
  private user: any;
  private app: HttpClient;
  private auth: Object;

  constructor(app, router, user) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};

  }

}