export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    //todo add routing restrictions
    config.map([
      {route: ['', 'landing'], name: 'landing', moduleId: 'landing', title: 'Welcome to Fairlance'},
      {route: ['registration', 'registration'], name: 'registration', moduleId: 'registration', title: 'Register fairlance account'},
      {route: ['login', 'login'], name: 'login', moduleId: 'login', title: 'Login to Fairlance'},
      {route: ['profile', 'profile'], name: 'profile', moduleId: 'profile', title: 'Your Fairlance profile'}
    ]);

    this.router = router;
  }
}
