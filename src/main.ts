import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'font-awesome/scss/font-awesome.scss';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import * as Bluebird from 'bluebird';

declare let appBaseUrl: any;
declare let registerBaseUrl: any;
declare let searchBaseUrl: any;
declare let uploadBaseUrl: any;

Bluebird.config({ warnings: false });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  let container = aurelia.container;
  let app = new HttpClient();
  let register = new HttpClient();
  let search = new HttpClient();
  let upload = new HttpClient();

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
  upload.configure(config => {
    config
        .useStandardConfiguration()
        .withBaseUrl(uploadBaseUrl)
  });

  container.registerInstance('AppHttpClient', app);
  container.registerInstance('RegisterHttpClient', register);
  container.registerInstance('SearchHttpClient', search);
  container.registerInstance('UploadHttpClient', upload);
  await aurelia.start();
  aurelia.setRoot('app');

}