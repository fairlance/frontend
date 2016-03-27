import {inject} from 'aurelia-framework';
import {Cookie} from 'Cookie';

@inject(Cookie)
export class User {

  constructor (cookie) {
    this.currentUser = null;
    this.cookie = cookie;
  }

  getToken () {
    if (!this.currentUser) {

      return this.cookie.get('fairlance').token;
    }
    return this.currentUser.token;
  }
}