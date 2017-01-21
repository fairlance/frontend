import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', 'SearchHttpClient', Router, User, Element)
export class Projects {
  private projects = [];
  private router: Router;
  private user: any;
  private app: any;
  private search: any;
  private auth: Object;

  constructor(app, search, router, user) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.auth = {'Authorization': 'Bearer ' + user.token};

    this.getProjects();
  }

  private goToProject(id: string) {
    this.router.navigateToRoute('project', {id: id}, {replace: true});
  }

  async getProjects(): Promise<void>  {
    let first = this;
    const response = await first.app.fetch('project', {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.projects = data.data;
  }
}