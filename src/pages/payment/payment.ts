import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";

@inject('PaymentHttpClient', Router, User, Cookie)
export class Payment {
  private api: any;
  private router: Router;
  private user: any;
  private cookie: Cookie;
  private auth: Object;

  constructor(deposit, router, user, cookie) {
    this.api = deposit;
    this.router = router;
    this.user = user;
    this.cookie = cookie;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  async deposit(): Promise<void> {
    let first = this;
    const response = await first.api.fetch('deposit', {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    window.location.href = data.data.RedirectURL;
    console.log(data);
  }


}