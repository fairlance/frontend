import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";

@inject('AppHttpClient', Router, User, Cookie)
export class Login {
  private http: any;
  private router: Router;
  private user: any;
  private cookie: Cookie;
  private emailPlaceholder: string;
  private passwordPlaceholder: string;
  private email: string;
  private password: string;
  private error: boolean = false;

  constructor(http, router, user, cookie) {
    this.http = http;
    this.router = router;
    this.user = user;
    this.cookie = cookie;
    this.setDefaultFields();
  }

  private setDefaultFields(): void {
    this.emailPlaceholder = 'Email';
    this.passwordPlaceholder = 'Password';
  }

  private getUser(): Object {
    return {
      'email': this.email,
      'password': this.password
    }
  }

  private setCookie(data: any): void {
    this.cookie.set('fairlance', data, {
      expiry: 8,
      secure: false
    });

  }

  async submit(): Promise<void> {
    let first = this;
    try {
      const response = await first.http.fetch('login', {
        method: 'post',
        body: json(first.getUser())
      });
      let data = await response.json();
      first.user.currentUser = data;
      first.setCookie(data);
      first.router.navigateToRoute(data.data.type, {id: data.data.id}, {replace: true});
    } catch (error) {
      first.error = true;
    }
  }
}