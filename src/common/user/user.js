import {inject} from 'aurelia-framework';
import {Cookie} from 'cookie';

@inject(Cookie)
export class User {

  constructor (cookie) {
    this.currentUser = {};
    this.cookie = cookie;
  }

  getCurrentUser () {
    if (!this.currentUser || !this.currentUser.length) {
      if (this.cookie.get('fairlance')) {
        return this.cookie.get('fairlance');
      }
      return {};
    }
    return this.currentUser;
  }
}