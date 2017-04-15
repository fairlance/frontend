import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Fairlance';
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'pages/landing/landing', title: 'Welcome'},
      {route: ['registration', 'registration'], moduleId: 'pages/registration/registration', name: 'registration', title: 'Register'},
      {route: ['info', 'info'], name: 'info', moduleId: 'pages/info/info', title: 'Additional info'},
      {route: ['application/:id', 'application/:id'], name: 'application', moduleId: 'pages/application/application', title: 'Apply for a job'},
      {route: ['applications', 'applications'], name: 'applications', moduleId: 'pages/applications/applications', title: 'Application overview'},
      {route: ['notifications', 'notifications'], name: 'notifications', moduleId: 'pages/notifications/notifications', title: 'Notifications'},
      {route: ['create-job', 'create-job'], name: 'create-job', moduleId: 'pages/create-job/create-job', title: 'Job Creation'},
      {route: ['jobs', 'jobs'], name: 'jobs', moduleId: 'pages/jobs/jobs', title: 'Jobs'},
      {route: ['projects', 'projects'], name: 'projects', moduleId: 'pages/projects/projects', title: 'Projects'},
      {route: ['login', 'login'], name: 'login', moduleId: 'pages/login/login', title: 'Login'},
      {route: ['client/:id', 'client/:id'], name: 'client', moduleId: 'pages/client/client', title: 'Client'},
      {route: ['job/:id', 'job/:id'], name: 'job', moduleId: 'pages/job/job', title: 'Job details'},
      {route: ['freelancer/:id', 'freelancer/:id'], name: 'freelancer', moduleId: 'pages/freelancer/freelancer', title: 'Freelancer'},
      {route: ['project/:id', 'project/:id'], name: 'project', moduleId: 'pages/project/project', title: 'Project page'}
    ]);

    this.router = router;
  }
}
