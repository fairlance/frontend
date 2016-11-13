import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', 'SearchHttpClient', Router, User)
export class Job {

  details = {client: {id: 0}};
  references = [];
  application = false;
  periodOptions = [
    {value: 1, name: '24h'},
    {value: 2, name: '48h'},
    {value: 3, name: '3 days'},
    {value: 7, name: 'a week'}
  ];
  period = this.periodOptions[3];

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
    this.getFreelancer();
  }

  selectReference(reference) {
    if(!reference.selected) {
      this.references.push(reference.id);
      reference.selected = true;
    }
  }

  getFreelancer() {
    let first = this;
    first.app
      .fetch('freelancer/' + first.user.id, {
        method: 'get',
        headers: first.auth
      })
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          first.user.data = data.data;
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          if (data.error === "Not logged in.") {
            first.router.navigate('login');
          }
        });
      });
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

  showApplication() {
    this.application = true;

  }

}