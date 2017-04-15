import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', Router, User)
export class Client {
  private active: boolean = true;
  private user: any;
  private router: Router;
  private http: any;
  private auth: Object;
  private profileId: number;
  private client: Object;

  constructor(http, router, user) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  activate(params): void {
    this.profileId = parseInt(params.id);
    this.populateProfile();
  }

  async populateProfile(): Promise<void> {
    let first = this;
    try {
      const response = await first.http.fetch('client/' + this.profileId, {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      this.client = data.data;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }

}