import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router)
export class Registration {

  constructor(http, router) {
    this.http = http;
    this.router = router;
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
    first.http.fetch(first.clientType + '/new', {
        method: 'post',
        body: first.createUser()
      })
      .then(function () {
        first.router.navigate('info');
      })
      .catch(function (error) {
        alert(error)
      });
  }
}
