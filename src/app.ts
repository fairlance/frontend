import {Aurelia} from 'aurelia-framework';
import {NavigationInstruction, Next, PipelineStep, Redirect, RouterConfiguration, Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import {User} from "./services/user/user";

export class App {
  public userService: User = User.getInstance();
  public user: IUser = <IUser>{};
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    const first = this;

    class AuthorizeStep implements PipelineStep {
      public run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        let loggedIn: boolean = false;
        if (first.userService.getCurrentUser()) {
          first.user = first.userService.getCurrentUser();
          loggedIn = true;
        }
        let allAccess: boolean = (!navigationInstruction.getAllInstructions()[0].config.settings.roles.length);
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf(first.user.type) === -1)) {
          if (!allAccess && loggedIn) {
            return next.cancel(new Redirect('jobs'));
          }
          if (!allAccess && !loggedIn) {
            return next.cancel(new Redirect('login'));
          }
          return next();
        }
        return next();
      }
    }

    config.title = 'Fairlance';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {
        route: ['', 'landing'],
        name: 'landing',
        moduleId: PLATFORM.moduleName('pages/landing/landing'),
        title: 'Welcome',
        settings: {roles: []}
      },
      {
        route: ['registration', 'registration'],
        moduleId: PLATFORM.moduleName('pages/registration/registration'),
        name: 'registration',
        title: 'Register',
        settings: {roles: []}
      },
      {
        route: ['info', 'info'],
        name: 'info',
        moduleId: PLATFORM.moduleName('pages/info/info'),
        title: 'Additional info',
        settings: {roles: ['freelancer']}
      },
      {
        route: ['application/:id', 'application/:id'],
        name: 'application',
        moduleId: PLATFORM.moduleName('pages/application/application'),
        title: 'Apply for a job',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['applications', 'applications'],
        name: 'applications',
        moduleId: PLATFORM.moduleName('pages/applications/applications'),
        title: 'Application overview',
        settings: {roles: ['client']}
      },
      {
        route: ['notifications', 'notifications'],
        name: 'notifications',
        moduleId: PLATFORM.moduleName('pages/notifications/notifications'),
        title: 'Notifications',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['create-job', 'create-job'],
        name: 'create-job',
        moduleId: PLATFORM.moduleName('pages/create-job/create-job'),
        title: 'Job Creation',
        settings: {roles: ['client']}
      },
      {
        route: ['jobs', 'jobs'],
        name: 'jobs',
        moduleId: PLATFORM.moduleName('pages/jobs/jobs'),
        title: 'Jobs',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['payment/:id', 'payment/:id'],
        name: 'payment',
        moduleId: PLATFORM.moduleName('pages/payment/payment'),
        title: 'Payment',
        settings: {roles: ['client']}
      },
      {
        route: ['transactions', 'transactions'],
        name: 'transactions',
        moduleId: PLATFORM.moduleName('pages/transactions/transactions'),
        title: 'Transactions',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['projects', 'projects'],
        name: 'projects',
        moduleId: PLATFORM.moduleName('pages/projects/projects'),
        title: 'Projects',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['login', 'login'],
        name: 'login',
        moduleId: PLATFORM.moduleName('pages/login/login'),
        title: 'Login',
        settings: {roles: []}
      },
      {
        route: ['client/:id', 'client/:id'],
        name: 'client',
        moduleId: PLATFORM.moduleName('pages/client/client'),
        title: 'Client',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['job/:id', 'job/:id'],
        name: 'job',
        moduleId: PLATFORM.moduleName('pages/job/job'),
        title: 'Job details',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['freelancer/:id', 'freelancer/:id'],
        name: 'freelancer',
        moduleId: PLATFORM.moduleName('pages/freelancer/freelancer'),
        title: 'Freelancer',
        settings: {roles: ['freelancer', 'client']}
      },
      {
        route: ['project/:id', 'project/:id'],
        name: 'project',
        moduleId: PLATFORM.moduleName('pages/project/project'),
        title: 'Project page',
        settings: {roles: ['freelancer', 'client']}
      }
    ]);

    this.router = router;
  }
}
