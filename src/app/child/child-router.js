export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'welcome'], name: 'welcome',       moduleId: 'app/welcome/welcome',       nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',         moduleId: 'app/users/users',         nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router',  moduleId: 'app/child/child-router',  nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
