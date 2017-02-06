import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', Router, User)
export class Freelancer {
  private router: Router;
  private user: any;
  private http: any;
  private auth: Object;
  private profileId: number;
  private freelancer;
  private dialog: any;
  private referenceTitle: string;
  private referenceContent: string;
  private imageUrl: string;
  private videoUrl: string;

  constructor(http, router, user) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};
  }

  activate(params) {
    this.profileId = parseInt(params.id);
    this.populateProfile();
  }

  async populateProfile(): Promise<void> {
    let first = this;
    try {
      const response = await first.http.fetch('freelancer/' + this.profileId, {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      this.freelancer = data.data;
      console.log(this.freelancer, location);
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      }
    }
  }

  private showModal(): void {
    this.dialog = document.querySelector('dialog');
    if (!this.dialog.showModal) {
      //dialogPolyfill.registerDialog(this.dialog);
    }
    this.dialog.showModal();
  }

  private hideModal(): void {
    this.dialog.close();
  }

  private prepareReference(): Object {
    let reference = {
      freelancerId: this.user.id,
      title: this.referenceTitle,
      content: this.referenceContent,
      media: {
        image: this.imageUrl,
        video: this.videoUrl
      }
    };
    return json(reference);
  }

  async addReference(): Promise<void> {
    let first = this;
    const response = await first.http.fetch('freelancer/' + first.user.id + '/reference', {
      method: 'put',
      body: this.prepareReference(),
      headers: this.auth
    });
    first.dialog.close();
    first.populateProfile();
  }
}