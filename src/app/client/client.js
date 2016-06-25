import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router, User)
export class Client {

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

  prepareReference() {
    let reference = {
      freelancerId: this.user.id,
      title: this.referenceTitle,
      content: this.referenceContent,
      media: {
        image: this.imageUrl,
        video: this.videoUrl
      }
    };
    return json(reference);
  }

  addReference() {
    let first = this;
    first.http
      .fetch('freelancer/' + first.user.id + '/reference', {
        method: 'post',
        body: this.prepareReference(),
        headers: this.auth
      })
      .then(function () {
        first.dialog.close();
        first.populateProfile();
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}