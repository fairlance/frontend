import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Profile {

  getUserId() {
    var urlElements = window.location.href.split('/');
    return urlElements[urlElements.length - 1];
  }

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://local.fairlance.io:3001/freelancer/');
    });
    this.http = http;
    this.populateProfile();
  }

  readProfileData(data) {
    console.log(data);
    this.FullName = data.FirstName + ' ' + data.LastName;
    this.Title = 'Frontend Developer';
    this.StartDate = new Date(data.Created).toLocaleDateString();
  }

  populateProfile() {
    var first = this;
    first.http.fetch(first.getUserId(), {
        method: 'get'
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.readProfileData(data);
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          console.log(data);
        });
      });
  }
}
