import {HttpClient} from 'aurelia-fetch-client';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-mdl');

  let container = aurelia.container;
  let app = new HttpClient();
  let register = new HttpClient();
  let search = new HttpClient();

  app.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(appBaseUrl)
  });
  register.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(registerBaseUrl)
  });
  search.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(searchBaseUrl)
  });

  container.registerInstance('AppHttpClient', app);
  container.registerInstance('RegisterHttpClient', register);
  container.registerInstance('SearchHttpClient', search);

  aurelia.start().then(a => a.setRoot());
}
