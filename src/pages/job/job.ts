import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

declare let uploadBaseUrl: string;

@inject('AppHttpClient', 'SearchHttpClient', Router)
export class Job {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private app: any;
  private search: any;
  private auth: Object;
  private details = {client: {id: 0}};
  private references: Array<string> = [];
  private application: boolean = false;
  private periodOptions: Array<IPeriod> = [
    {value: 1, name: '24h'},
    {value: 2, name: '48h'},
    {value: 7, name: 'a week'}
  ];
  private period: IPeriod = this.periodOptions[3];
  private uploadUrl: string = uploadBaseUrl;
  private jobId: number;

  constructor(app, search, router) {
    this.router = router;
    this.app = app;
    this.search = search;
  }

  async activate(params) {
    this.jobId = parseInt(params.id);
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      await this.getJob();
      this.getFreelancer();
    } else {
      return;
    }
  }

  private selectReference(reference: IReference): void {
    if (!reference.selected) {
      this.references.push(reference.id);
      reference.selected = true;
    }
  }

  async getFreelancer(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('freelancer/' + first.user.id, {
        method: 'get',
        headers: first.auth
      });
      let data = await response.json();
      first.user = data.data;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }

  async getJob(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('job/' + first.jobId, {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      first.details = data.data;
    } catch (error) {
      if (error.status === 404) {
        this.router.navigateBack();
      }
    }

  }

  private showApplication(): void {
    this.application = true;
  }

}