import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'User';
import {Cookie} from 'Cookie';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, Router, User, Cookie)
export class Login {

  constructor(http, router, user, cookie) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://local.fairlance.io:3001/');
    });
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
      'email' : this.Email,
      'password' : this.Password
    }
  }

  setCookie(data) {
    console.log(this.cookie);
    this.cookie.set('fairlance', data, {
      expiry: 8, // in hours
      secure: false // Either true or false
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
          first.router.navigate('profile/' + data.id);
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          console.log(data);
        });
      });
  }
}