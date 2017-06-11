import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Fairlance';
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: PLATFORM.moduleName('pages/landing/landing'), title: 'Welcome'},
      {route: ['registration', 'registration'], moduleId: PLATFORM.moduleName('pages/registration/registration'), name: 'registration', title: 'Register'},
      {route: ['info', 'info'], name: 'info', moduleId: PLATFORM.moduleName('pages/info/info'), title: 'Additional info'},
      {route: ['application/:id', 'application/:id'], name: 'application', moduleId: PLATFORM.moduleName('pages/application/application'), title: 'Apply for a job'},
      {route: ['applications', 'applications'], name: 'applications', moduleId: PLATFORM.moduleName('pages/applications/applications'), title: 'Application overview'},
      {route: ['notifications', 'notifications'], name: 'notifications', moduleId: PLATFORM.moduleName('pages/notifications/notifications'), title: 'Notifications'},
      {route: ['create-job', 'create-job'], name: 'create-job', moduleId: PLATFORM.moduleName('pages/create-job/create-job'), title: 'Job Creation'},
      {route: ['jobs', 'jobs'], name: 'jobs', moduleId: PLATFORM.moduleName('pages/jobs/jobs'), title: 'Jobs'},
      {route: ['payment', 'payment'], name: 'payment', moduleId: PLATFORM.moduleName('pages/payment/payment'), title: 'Payment'},
      {route: ['transactions', 'transactions'], name: 'transactions', moduleId: PLATFORM.moduleName('pages/transactions/transactions'), title: 'Transactions'},
      {route: ['projects', 'projects'], name: 'projects', moduleId: PLATFORM.moduleName('pages/projects/projects'), title: 'Projects'},
      {route: ['login', 'login'], name: 'login', moduleId: PLATFORM.moduleName('pages/login/login'), title: 'Login'},
      {route: ['client/:id', 'client/:id'], name: 'client', moduleId: PLATFORM.moduleName('pages/client/client'), title: 'Client'},
      {route: ['job/:id', 'job/:id'], name: 'job', moduleId: PLATFORM.moduleName('pages/job/job'), title: 'Job details'},
      {route: ['freelancer/:id', 'freelancer/:id'], name: 'freelancer', moduleId: PLATFORM.moduleName('pages/freelancer/freelancer'), title: 'Freelancer'},
      {route: ['project/:id', 'project/:id'], name: 'project', moduleId: PLATFORM.moduleName('pages/project/project'), title: 'Project page'}
    ]);

    this.router = router;
  }
}
