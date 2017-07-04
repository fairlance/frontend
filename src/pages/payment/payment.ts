import {User} from "../../services/user/user";
import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject('AppHttpClient', Router)
export class Payment {
  private projectId: number;
  private userService: User = User.getInstance();
  private user: IUser;
  private auth: any;
  private http: any;
  private router: Router;
  private disabled: boolean = false;

  constructor(http, router) {
    this.http = http;
    this.router = router;
  }

  async activate(params) {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
    this.projectId = params.id;
  }

  private async moneyTransferred(): Promise<void> {
    const first = this;
    this.disabled = true;
    const response = await first.http.fetch('project/' + this.projectId + '/funded', {
      method: 'post',
      headers: this.auth
    });
    this.router.navigateToRoute('project', {id: this.projectId});
  }
}