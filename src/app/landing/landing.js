import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Landing {
  placeholder = 'I want to subscribe_';
  email = '';
  style = '';

  getUrl() {
    var urlElements = window.location.href.split('/');
    return urlElements[0] + '//' + urlElements[2].split(':')[0] + ':3000/';
  }

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.getUrl());
    });
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
