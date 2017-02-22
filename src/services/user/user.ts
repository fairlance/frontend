import {inject} from 'aurelia-framework';
import {Cookie} from "../cookie/cookie";
import {Router} from "aurelia-router";

@inject(Cookie, Router)
export class User {
  private static instance: User;
  private currentUser: any = {};
  private cookie: Cookie = new Cookie;

  constructor () {
  }

  static getInstance() {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }


  public getCurrentUser () {
    if (!this.currentUser || !Object.keys(this.currentUser).length) {
      if (this.cookie.get('fairlance')) {
        return this.cookie.get('fairlance');
      }
      // this.router.navigate('login');
      return {};
    }
    return this.currentUser;
  }
}