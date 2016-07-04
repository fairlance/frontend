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

    this.getJobs();

  }

  getJobs() {
    let first = this;
    first.http
      .fetch('job/', {
        method: 'get',
        headers: this.auth
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.jobs = data.data;
          console.log(first.jobs);
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}