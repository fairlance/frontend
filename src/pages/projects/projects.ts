import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Helper} from "../../services/helper/helper";

@inject('AppHttpClient', 'SearchHttpClient', Router, User, Element, Helper)
export class Projects {
  private projects: Array<any> = [];
  private router: Router;
  private helper: Helper;
  private user: any;
  private app: any;
  private search: any;
  private auth: Object;
  private selectFilter: string = '';
  private statusList: Array<any> = [
    {id: 'working', name: 'Working'},
    {id: 'finalizing_terms', name: 'Finalizing Terms'},
    {id: 'pending', name: 'Pending'},
    {id: 'archived', name: 'Archived'},
    {id: 'canceled', name: 'Canceled'}
  ];
  private projectList: Array<any> = [];

  constructor(app, search, router, user, helper) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.helper = helper;
    this.search = search;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};

    this.getProjects();
  }

  private goToProject(id: string) {
    this.router.navigateToRoute('project', {id: id}, {replace: true});
  }

  async getProjects(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('project', {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      first.projects = data.data;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
    first.statusList.forEach(function (status: any) {
      first.projectList.push({
        'list': first.projects.filter(item => item.status === status.id),
        'status': status.name,
        'id': status.id
      });
    });
  }
}