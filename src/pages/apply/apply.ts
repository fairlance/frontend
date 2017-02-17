import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

interface IPeriod {
  value: number,
  name: string
}

interface IReference {
  selected: boolean,
  id: string
}

@inject('AppHttpClient', Router, User)
export class Apply {
  private router: Router;
  private user: any;
  private app: any;
  private auth: Object;
  private details;
  private jobId: number;


  constructor(app, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  activate(params) {
    // this.jobId = parseInt(params.id);
    // this.getJob();
    // this.getFreelancer();
  }

  async getFreelancer(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('freelancer/' + first.user.id, {
        method: 'get',
        headers: first.auth
      });
      let data = await response.json();
      first.user.data = data.data;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }

  async getJob(): Promise<void> {
    let first = this;
    const response = await first.app.fetch('job/' + first.jobId, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.details = data.data;
    console.log(this.details);
  }


}