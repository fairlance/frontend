import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router, User)
export class Client {

  active = true;

  constructor(http, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.auth = {'Authorization': 'Bearer ' + user.token};

  }

  activate(params){
    this.profileId = parseInt(params.id);
    this.populateProfile();
  }

  readProfileData(data) {
    this.freelancer = data.data;
  }

  populateProfile() {
    let first = this;
    first.http
      .fetch('client/' + this.profileId, {
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
    this.dialog = document.querySelector('dialog');
    if (!this.dialog.showModal) {
      dialogPolyfill.registerDialog(this.dialog);
    }
    this.dialog.showModal();
  }

  hideModal() {
    this.dialog.close();
  }

  prepareJob() {
    let job = {
      clientId: this.user.id,
      name: this.name,
      description: this.description,
      isActive: this.active
    };
    return json(job);
  }

  addJob() {
    let first = this;
    first.http
      .fetch('job/new', {
        method: 'post',
        body: this.prepareJob(),
        headers: this.auth
      })
      .then(function () {
        first.dialog.close();
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}