import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Fairlance';
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'pages/landing/landing', title: 'Welcome'},
      {route: ['registration', 'registration'], name: 'pages/registration/registration', moduleId: 'registration', title: 'Register'},
      {route: ['info', 'info'], name: 'info', moduleId: 'pages/info/info', title: 'Additional info'},
      {route: ['jobs', 'jobs'], name: 'jobs', moduleId: 'pages/jobs/jobs', title: 'Jobs'},
      {route: ['login', 'login'], name: 'login', moduleId: 'pages/login/login', title: 'Login'},
      {route: ['client/:id', 'client/:id'], name: 'client', moduleId: 'pages/client/client', title: 'Client'},
      {route: ['job/:id', 'job/:id'], name: 'job', moduleId: 'pages/job/job', title: 'Job details'},
      {route: ['freelancer/:id', 'freelancer/:id'], name: 'freelancer', moduleId: 'pages/freelancer/freelancer', title: 'Freelancer'}
    ]);

    this.router = router;
  }
}
