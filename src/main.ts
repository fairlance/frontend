import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import '../styles/styles.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import * as Bluebird from 'bluebird';

declare let appBaseUrl: any;
declare let registerBaseUrl: any;
declare let searchBaseUrl: any;

Bluebird.config({ warnings: false });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

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
  await aurelia.start();
  aurelia.setRoot('app');

}