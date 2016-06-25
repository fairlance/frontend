import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {Cookie} from 'cookie';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router, User, Cookie)
export class Login {

  constructor(http, router, user, cookie) {
    this.http = http;
    this.router = router;
    this.user = user;
    this.cookie = cookie;
    this.setDefaultFields();
  }

  setDefaultFields() {
    this.EmailPlaceholder = 'Email';
    this.PasswordPlaceholder = 'Password';
  }

  getUser() {
    return {
      'email' : this.email,
      'password' : this.password
    }
  }

  setCookie(data) {
    this.cookie.set('fairlance', data, {
      expiry: 8,
      secure: false
    });

  }

  submit() {
    var first = this;
    first.http.fetch('login', {
        method: 'post',
        body: json(first.getUser())
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.user.currentUser = data;
          first.setCookie(data);
          first.router.navigateToRoute(data.data.type, {id: data.data.id}, {replace: true});
        });
      })
      .catch(function (error) {
        alert(error);
      });
  }
}