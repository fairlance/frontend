import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', 'SearchHttpClient', Router, User)
export class Job {

  constructor(app, search, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.auth = {'Authorization': 'Bearer ' + user.token};

  }

  activate(params){
    this.jobId = parseInt(params.id);
  }

}