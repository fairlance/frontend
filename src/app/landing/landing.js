import {inject} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('RegisterHttpClient')
export class Landing {
  placeholder = 'I want to subscribe_';
  email = '';
  style = '';


  constructor(http) {
    this.http = http;
  }

  submit() {
    var first = this;
    first.http.fetch('register', {
        method: 'post',
        body: new FormData(document.querySelector('form'))
      })
      .then(function (response) {
        response.json().then(function () {
          first.email = '';
          first.style = '';
          first.placeholder = 'Thank you!';
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          first.style = 'error';
          first.email = '';
          first.placeholder = data.error;
        });
      });
  }
}
