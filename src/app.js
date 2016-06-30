export class App {
  configureRouter(config, router) {
    config.title = 'Fairlance';

    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'landing', title: 'Welcome'},
      {route: ['registration', 'registration'], name: 'registration', moduleId: 'registration', title: 'Register'},
      {route: ['info/:type', 'info/:type'], name: 'info', moduleId: 'info', title: 'Additional info'},
      {route: ['jobs', 'jobs'], name: 'jobs', moduleId: 'jobs', title: 'Jobs'},
      {route: ['login', 'login'], name: 'login', moduleId: 'login', title: 'Login'},
      {route: ['client/:id', 'client/:id'], name: 'client', moduleId: 'client', title: 'Client'},
      {route: ['freelancer/:id', 'freelancer/:id'], name: 'freelancer', moduleId: 'freelancer', title: 'Freelancer'}
    ]);

    this.router = router;
  }
}