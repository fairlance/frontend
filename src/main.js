import {HttpClient} from 'aurelia-fetch-client';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-mdl');

  let container = aurelia.container;
  let app = new HttpClient();
  let register = new HttpClient();

  app.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('http://local.fairlance.io:3001/')
  });
  register.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('http://local.fairlance.io:3000/')
  });

  container.registerInstance('AppHttpClient', app);
  container.registerInstance('RegisterHttpClient', register);

  aurelia.start().then(a => a.setRoot());
}
