import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', Router)
export class Registration {
  private http: any;
  private router: Router;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private clientType: string;

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  private createUser = function () {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      clientType: this.clientType,
      password: this.password
    };
    console.log(user);
    return json(user);
  };

  async submit(): Promise<void> {
    let first = this;
    const response = await first.http.fetch(first.clientType + '/new', {
      method: 'put',
      body: first.createUser()
    });
    first.router.navigate('info');
  }
}
