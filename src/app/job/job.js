import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', 'SearchHttpClient', Router, User)
export class Job {

  details = {client: {id: 0}};

  constructor(app, search, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.auth = {'Authorization': 'Bearer ' + user.token};

  }

  activate(params){
    this.jobId = parseInt(params.id);
    this.getJob();
  }

  getJob() {
    let first = this;
    first.app
      .fetch('job/' + first.jobId, {
        method: 'get',
        headers: this.auth
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.details = data.data;
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }

}