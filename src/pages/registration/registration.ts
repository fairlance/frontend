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
  private salutations: any = [
    {name: 'Mr', value: 'Mr'},
    {name: 'Mrs', value: 'Mrs'},
    {name: 'Mx', value: 'Mx'},
  ];
  private types: any = [
    {name: 'Freelancer', type: 'freelancer'},
    {name: 'Client', type: 'client'}
  ];
  private userType: any = this.types[0];
  private salutation: any = this.salutations[0];

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  private createUser = function () {
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      salutation: this.salutation,
      clientType: this.userType.type,
      password: this.password
    };
    console.log(user);
    return json(user);
  };

  async submit(): Promise<void> {
    let first = this;
    const response = await first.http.fetch(first.userType.type + '/new', {
      method: 'put',
      body: first.createUser()
    });
    first.router.navigate('complete-profile');
  }
}
