import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router)
export class Info {
  scrollTop = 0;
  scrollLeft = 0;

  constructor(http, router) {
    let first = this;
    this.http = http;
    this.router = router;
    this.screen = false;

    this.handleScrollEvent = e => {
      setTimeout(() => {first.screen = true}, 300);
      document.removeEventListener('scroll', first.handleScrollEvent);
    };
  }

  attached() {
    document.addEventListener('scroll', this.handleScrollEvent);
  }

  detached() {
    document.removeEventListener('scroll', this.handleScrollEvent);
  }

  createUser = function () {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    return json(user);
  };

  submit() {
    var first = this;
    console.log(first.createUser());
    first.http.fetch('freelancer/new', {
        method: 'post',
        body: first.createUser()
      })
      .then(function () {
        first.router.navigate('login');
      })
      .catch(function (error) {
        error.json().then(function (data) {

        });
      });
  }
}
