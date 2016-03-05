export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'landing', title: 'Welcome to Fairlance'},
      {route: ['registration', 'registration'], name: 'registration', moduleId: 'registration', title: 'Register fairlance account'}
    ]);

    this.router = router;
  }
}
