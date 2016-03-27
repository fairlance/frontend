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
    this.freelancer = {
      FullName: 'Stefan Sopic',
      Title: 'Frontend Developer',
      Joined: '20.01.2016.',
      Rating: 4.5,
      TimeZone: 'CET',
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
      ],
      References: [
        {
          "Id": 1,
          "Name": "fairlance.io",
          "Description": "Freelance platform with fair trade approach fairlance!",
          "Type": "cell-normal",
          "Width": "mdl-cell--3-col",
          "ImageSrc" : "dist/assets/images/background.png",
          "ClientId": 1,
          "Client": {
            "Id": 1,
            "Name": "Goran Radovanovic",
            "Description": "Whip cracker",
            "Jobs": null,
            "Projects": null,
            "Created": "2016-03-26T00:00:00Z"
          },
          "Created": "2016-03-26T00:00:00Z"
        },
        {
          "Id": 1,
          "Name": "Enklava",
          "Description": "With this film I want to explore the essence of the Serbian/Albanian dispute, which resulted – fifteen years ago – in war, destruction and crimes. But I want to raise the following question: is coexistence still possible between these two communities in a reality marked by the presence of enclaves, isolated islands of Christian minority surrounded by a sea of Muslim majority?",
          "Type": "cell-wide",
          "Width": "mdl-cell--3-col",
          "Video" : "https://www.youtube.com/embed/Dddfro-Vt9M",
          "ClientId": 1,
          "Client": {
            "Id": 1,
            "Name": "Goran Radovanovic",
            "Description": "Whip cracker",
            "Jobs": null,
            "Projects": null,
            "Created": "2016-03-26T00:00:00Z"
          },
          "Created": "2016-03-26T00:00:00Z"
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

  showModal() {
    console.log('sadasdasd');
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
  }
}
