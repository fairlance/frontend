import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Cookie} from "../../services/cookie/cookie";

@inject('PaymentHttpClient', Router, Cookie)
export class Payment {
  private api: any;
  private router: Router;
  private cookie: Cookie;
  private auth: Object;

  constructor(deposit, router, cookie) {
    this.api = deposit;
    this.router = router;
    this.cookie = cookie;
  }

}