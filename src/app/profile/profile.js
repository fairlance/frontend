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
        //.withDefaults({
        //  headers: {
        //    'Authorization': 'Bearer ' + user.currentUser.token
        //  }
        //})
        .withBaseUrl('http://local.fairlance.io:3001/freelancer/');
    });
    this.user = user;
    this.http = http;
    //this.populateProfile();
    this.readProfileData();
  }

  getUserId() {
    var urlElements = window.location.href.split('/');
    return urlElements[urlElements.length - 1];
  }

  readProfileData(data) {
    //this.FullName = data.FirstName + ' ' + data.LastName;
    //this.StartDate = new Date(data.Created).toLocaleDateString();
    this.user = {
      FullName: 'Stefan Sopic',
      Title: 'Frontend Develope',
      Joined: '20.01.2016.',
      Rating: 4.5,
      TimeZone: 'CET',
      Online: true,
      ProjectCount: 26,
      HourlyRate: [25, 50],
      Currency: '$',
      Reviews: [
        {
          Title: 'Stefan is awesome',
          Content: 'He is truly the most fucking amazing developer on this shitty planet',
          Rating: 5,
          Created: '25.01.2016',
          ClientName: 'Tara Radovic'
        },
        {
          Title: 'Stefan is average',
          Content: 'He is truly the most fucking average developer on this shitty planet',
          Rating: 4,
          Created: '28.01.2016',
          ClientName: 'Milos Krsmanovic'
        }
      ]
    };
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
