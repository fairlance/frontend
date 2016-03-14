import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Login {

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://local.fairlance.io:3001/');
    });
    this.http = http;
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

  submit() {
    var first = this;
    first.http.fetch('login', {
        method: 'post',
        body: json(first.getUser())
      })
      .then(function (response) {
        response.json().then(function () {
          //todo redirect to user/user_id
          console.log('Success!');
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          console.log(data);
        });
      });
  }
}
