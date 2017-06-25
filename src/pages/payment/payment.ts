import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
import {Cookie} from "../../services/cookie/cookie";
import {HttpClient} from "aurelia-fetch-client";
declare let braintree: any;

@inject('AppHttpClient', 'PaymentHttpClient', Router, Cookie)
export class Payment {
  private api: any;
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private cookie: Cookie;
  private auth: Object;
  private project: any;
  private projectId: number;
  private showRelease: boolean = false;
  private app: HttpClient;
  private token: string = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjZmRiZTg2M2I4ZWM5MThmOGUyZWQzYjg3M2FkMzJhYTJjZTJkZGNiNDg4MTRiNWVkYzg5MjE0NDNjNWRjODQwfGNyZWF0ZWRfYXQ9MjAxNy0wNi0yNVQxMDoyNTowNS45ODQ3NzUzNzArMDAwMFx1MDAyNm1lcmNoYW50X2lkPXBjZnl5NmhjbTN2ZGJzM3lcdTAwMjZwdWJsaWNfa2V5PXlrNTl2anpkcnBqd3RxbjQiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcGNmeXk2aGNtM3ZkYnMzeS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3BjZnl5NmhjbTN2ZGJzM3kvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3BjZnl5NmhjbTN2ZGJzM3kifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiRmFpcmxhbmNlIFVHIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoiZmFpcmxhbmNldWciLCJjdXJyZW5jeUlzb0NvZGUiOiJFVVIifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6InBjZnl5NmhjbTN2ZGJzM3kiLCJ2ZW5tbyI6Im9mZiJ9';

  constructor(app, deposit, router, cookie) {
    this.app = app;
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

  activate(params) {
    this.projectId = params.id;
  }

  attached() {
    this.validatePayment();
  }

  private async validatePayment(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('project/' + first.projectId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.project = data.data;
    if (this.user.type === 'client' && this.user.id === this.project.client.id) {
      this.showPayment();
    } else {
      this.router.navigate('login');
    }
  }

  private showPayment() {
    const first = this;
    let button = document.querySelector('#submit-button');
    braintree.dropin.create({
      authorization: first.token,
      container: '#dropin-container'
    }, function (createErr, instance) {
      first.showRelease = true;
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (err, payload) {
          console.log(err, payload);
          // Submit payload.nonce to your server
        });
      });
    });
  }

}