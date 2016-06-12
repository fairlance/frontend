import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, Router, User)
export class Profile {

  constructor(http, router, user) {

    this.user = user;
    this.router = router;
    this.http = http;
    this.auth = {'Authorization': 'Bearer ' + user.getCurrentUser().data.token};
    this.populateProfile();
  }

  readProfileData(data) {
    this.freelancer = data.data;
  }

  populateProfile() {
    let first = this;
    first.http
      .fetch('freelancer/' + first.user.getCurrentUser().data.id, {
        method: 'get',
        headers: this.auth
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
    if (!dialog.showModal) {
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
    var first = this;
    first.http
      .fetch('freelancer/' + first.user.getCurrentUser().data.id + '/reference', {
        method: 'post',
        headers: this.auth
      })
      .then(function () {
        dialog.close();
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}
