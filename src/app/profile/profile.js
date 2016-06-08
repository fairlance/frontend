import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, Router, User)
export class Profile {

  constructor(http, router, user) {

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          headers: {
            'Authorization': 'Bearer ' + user.getCurrentUser().data.token
          }
        })
        .withBaseUrl('http://local.fairlance.io:3001/freelancer/');
    });
    this.user = user;
    this.router = router;
    this.http = http;
    this.populateProfile();
  }

  readProfileData(data) {
    this.freelancer = data.data;
  }

  populateProfile() {
    var first = this;
    first.http.fetch(first.user.getCurrentUser().data.id, {
        method: 'get'
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.readProfileData(data);
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

  showModal() {
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }

  hideModal() {
    var dialog = document.querySelector('dialog');
    dialog.close();
  }

  addProject() {
    console.log('add project');
  }
}
