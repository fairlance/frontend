import {HttpClient} from 'aurelia-fetch-client';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-mdl');

  let container = aurelia.container;

  let http = new HttpClient();
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('http://pi.fairlance.io:3001/')
  });

  container.registerInstance(HttpClient, http);

  aurelia.start().then(a => a.setRoot());
}
