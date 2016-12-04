import {inject} from 'aurelia-framework';
import {Cookie} from "../cookie/cookie";

@inject(Cookie)
export class User {
  private currentUser: any;
  private cookie: any;

  constructor (cookie) {
    this.currentUser = {};
    this.cookie = cookie;
  }

  public getCurrentUser () {
    if (!this.currentUser || !Object.keys(this.currentUser).length) {
      if (this.cookie.get('fairlance')) {
        return this.cookie.get('fairlance');
      }
      return {};
    }
    return this.currentUser;
  }
}