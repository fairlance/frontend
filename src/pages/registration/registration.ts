import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', Router, User)
export class Registration {
  private http: any;
  private router: Router;
  private user: any;
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private clientType: string = 'freelancer';

  constructor(http, router, user) {
    this.http = http;
    this.router = router;
    this.user = user;
  }

  private createUser = function () {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    return json(user);
  };

  async submit(): Promise<void> {
    let first = this;
    const response = await first.http.fetch(first.clientType + '/new', {
      method: 'put',
      body: first.createUser()
    });
    first.user.currentUser = await response.json();
    first.router.navigate('info');
  }
}
