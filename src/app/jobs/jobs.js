import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router, User)
export class Jobs {

  jobs = [];

  constructor(http, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.auth = {'Authorization': 'Bearer ' + user.token};

  }

  getFilters() {
    return;
  }

  getJobs() {
    let first = this;
    first.http
      .fetch('jobs/', {
        method: 'get',
        body: this.getFilters(),
        headers: this.auth
      })
      .then(function (data) {
        first.jobs = data;
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}