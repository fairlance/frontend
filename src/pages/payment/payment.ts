import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";
import {HttpClient} from "aurelia-fetch-client";
declare let adyen: any;

@inject('AppHttpClient', 'PaymentHttpClient', Router, Cookie)
export class Payment {


  constructor(app, deposit, router, cookie) {

  }

}