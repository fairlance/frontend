import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from "../../services/user/user";
declare let uploadBaseUrl: string;

@inject('AppHttpClient', Router)
export class Client {
  private active: boolean = true;
  private user: IUser;
  private userService: User = User.getInstance();
  private router: Router;
  private http: any;
  private auth: Object;
  private profileId: number;
  private client: any;
  private uploadUrl: string = uploadBaseUrl;

  constructor(http, router) {
    this.router = router;
    this.http = http;
  }

  activate(params): void {
    this.profileId = parseInt(params.id);
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      this.populateProfile();
    } else {
      return;
    }
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
      this.client.image = this.uploadUrl + this.client.image;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }
}