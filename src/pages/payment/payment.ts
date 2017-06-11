import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";

@inject('PaymentHttpClient', Router, Cookie)
export class Payment {
  private api: any;
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private cookie: Cookie;
  private auth: Object;

  constructor(deposit, router, cookie) {
    this.api = deposit;
    this.router = router;
    this.cookie = cookie;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
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