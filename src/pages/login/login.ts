import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";

@inject('AppHttpClient', Router, Cookie)
export class Login {
  private http: any;
  private router: Router;
  private cookie: Cookie;
  private emailPlaceholder: string;
  private passwordPlaceholder: string;
  private email: string;
  private password: string;
  private error: boolean = false;

  constructor(http, router, cookie) {
    this.http = http;
    this.router = router;
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
    this.cookie.set('fairlance', data, 8);

  }

  async submit(): Promise<void> {
    let first = this;
    try {
      const response = await first.http.fetch('login', {
        method: 'post',
        body: json(first.getUser())
      });
      let data = await response.json();
      first.setCookie(data);
      console.log(data);
      if(data.data.user.profileCompleted) {
        first.router.navigateToRoute(data.data.type, {id: data.data.id}, {replace: true});
      } else {
        first.router.navigateToRoute('complete-profile', {type: data.data.type, id: data.data.id})
      }
    } catch (error) {
      first.error = true;
    }
  }
}