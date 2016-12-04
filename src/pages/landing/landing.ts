import {inject} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

@inject('RegisterHttpClient')
export class Landing {
  private placeholder: string = 'I want to subscribe_';
  private email: string = '';
  private style: string = '';
  private http: any;

  constructor(http) {
    this.http = http;
  }

  async submit(): Promise<void> {
    var first = this;
    const response = await first.http.fetch('register', {
        method: 'post',
        body: new FormData(<HTMLFormElement>document.querySelector('form'))
      });
    try {
      await response.json();
      first.email = '';
      first.style = '';
      first.placeholder = 'Thank you!';
    } catch(data) {
      first.style = 'error';
      first.email = '';
      first.placeholder = data.error;
    }
  }

}
