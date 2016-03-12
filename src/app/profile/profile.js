import {inject} from 'aurelia-framework';
import {User} from 'User';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient, User)
export class Profile {

  constructor(http, user) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          headers: {
            'Authorization': 'Bearer ' + user.currentUser.token
          }
        })
        .withBaseUrl('http://local.fairlance.io:3001/freelancer/');
    });
    this.user = user;
    this.http = http;
    this.populateProfile();
  }

  getUserId() {
    var urlElements = window.location.href.split('/');
    return urlElements[urlElements.length - 1];
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
