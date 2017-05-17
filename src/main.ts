import './assets/styles/styles.scss';
import {Aurelia} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import * as Bluebird from 'bluebird';
import { PLATFORM } from 'aurelia-pal';

declare let appBaseUrl: any;
declare let registerBaseUrl: any;
declare let searchBaseUrl: any;
declare let uploadBaseUrl: any;
declare let paymentBaseUrl: any;

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
  let payment = new HttpClient();

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
  payment.configure(config => {
    config
        .useStandardConfiguration()
        .withBaseUrl(paymentBaseUrl)
  });

  container.registerInstance('AppHttpClient', app);
  container.registerInstance('RegisterHttpClient', register);
  container.registerInstance('SearchHttpClient', search);
  container.registerInstance('UploadHttpClient', upload);
  container.registerInstance('PaymentHttpClient', payment);
  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));

}