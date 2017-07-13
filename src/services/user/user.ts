import {Cookie} from "../cookie/cookie";

export class User {
  private static instance: User;
  private currentUser: IUser = {};
  private cookie: Cookie = new Cookie;

  constructor () {}

  static getInstance() {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }


  public getCurrentUser (): any {
    if (!this.currentUser || !Object.keys(this.currentUser).length) {
      if (this.cookie.get('fairlance')) {
        this.currentUser = this.cookie.get('fairlance').data;
      } else {
          return;
      }
    }
    return this.currentUser;
  }

  public deleteUser(): void {
    this.currentUser = {};
  }
}