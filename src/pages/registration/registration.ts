import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from 'user';
import 'fetch';

@inject('AppHttpClient', Router, User)
export class Registration {

  constructor(http, router, user) {
    this.http = http;
    this.router = router;
    this.user = user;
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
        method: 'put',
        body: first.createUser()
      })
      .then(function (response) {
        response.json().then(function(data) {
          first.user.currentUser = data;
          first.router.navigate('info');
        });
      })
      .catch(function (error) {
        alert(error)
      });
  }
}
