import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
import {Helper} from "../../services/helper/helper";

@inject('AppHttpClient', 'SearchHttpClient', Router, Element, Helper)
export class Projects {
  private projects: Array<any> = [];
  private jobs: Array<any> = [];
  private router: Router;
  private helper: Helper;
  private user: IUser;
  private userService: User = User.getInstance();
  private app: any;
  private search: any;
  private auth: Object;
  private selectFilter: string = '';
  private dialog: any;
  private name: string;
  private description: string;
  private statusList: Array<any> = [
    {id: 'in_progress', name: 'Working'},
    {id: 'finalizing_terms', name: 'Finalizing Terms'},
    {id: 'pending_funds', name: 'Pending Funds'},
    {id: 'pending_finished', name: 'Pending Finished'},
    {id: 'done', name: 'Done'}
  ];
  private projectList: Array<any> = [];

  constructor(app, search, router, helper) {
    this.router = router;
    this.app = app;
    this.helper = helper;
    this.search = search;
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
      this.getProjects();
      this.getJobs();
    } else {
      return;
    }
  }

  private goToProject(id: string) {
    this.router.navigateToRoute('project', {id: id}, {replace: true});
  }

  private async getProjects(): Promise<void> {
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

  private async getJobs(): Promise<void> {
    let first = this;
    try {
      const response = await first.app.fetch('job', {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      first.jobs = data.data;
      console.log(first.jobs);
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }

  private goToCreateJob(): void {
    this.router.navigateToRoute('create-job');
  }
}