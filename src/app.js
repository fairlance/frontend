export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'landing', title: 'Welcome to Fairlance'}
    ]);

    this.router = router;
  }
}
