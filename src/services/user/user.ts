import {inject} from 'aurelia-framework';
import {Cookie} from "../cookie/cookie";
import {Router} from "aurelia-router";

@inject(Cookie, Router)
export class User {
  private currentUser: any;
  private cookie: any;
  private router: Router;

  constructor (cookie, router) {
    this.currentUser = {};
    this.cookie = cookie;
    this.router = router;
  }

  public getCurrentUser () {
    if (!this.currentUser || !Object.keys(this.currentUser).length) {
      if (this.cookie.get('fairlance')) {
        return this.cookie.get('fairlance');
      }
      this.router.navigate('login');
      return {};
    }
    return this.currentUser;
  }
}