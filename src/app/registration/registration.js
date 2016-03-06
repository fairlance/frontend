import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Registration {

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://192.168.0.12:3001/freelancer/');
    });
    this.http = http;
    this.setDefaultFields();
  }

  setDefaultFields() {
    this.FirstNamePlaceholder = 'Name';
    this.LastNamePlaceholder = 'Last Name';
    this.EmailPlaceholder = 'Email';
    this.PasswordPlaceholder = 'Password';
    this.RepeatPasswordPlaceholder = 'Repeat Password';
    this.FirstNameStyle = '';
    this.LastNameStyle = '';
    this.EmailStyle = '';
    this.PasswordStyle = '';
  }

  createNewUser(ref) {
    return {
      'firstName' : ref.FirstName,
      'lastName'  : ref.LastName,
      'email'     : ref.Email,
      'password'  : ref.Password
    };
  }

  //todo add check valid email
  //todo add check password and repeat password are the same

  submit() {
    var first = this;
    first.setDefaultFields();
    first.http.fetch('new', {
        method: 'put',
        body: json(first.createNewUser(first))
      })
      .then(function (response) {
        response.json().then(function () {
          console.log('Success');
        });
      })
      .catch(function (error) {
        error.json().then(function (data) {
          for (var element in data) {
            first[element + 'Placeholder'] = data[element];
            first[element + 'Style'] = 'error';
            first[element] = '';
            console.log(element, data[element]);
          }
        });
      });
  }
}
