import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";
declare let uploadBaseUrl: string;

@inject('AppHttpClient', Router)
export class Freelancer {
  private router: Router;
  private user: IUser;
  private userService: User = User.getInstance();
  private http: any;
  private auth: Object;
  private profileId: number;
  private freelancer;
  private dialog: any;
  private referenceTitle: string;
  private referenceContent: string;
  private imageUrl: string;
  private videoUrl: string;
  private uploadUrl: string = uploadBaseUrl;

  constructor(http, router) {
    this.router = router;
    this.http = http;
  }

  activate(params) {
    if (this.userService.getCurrentUser()) {
      this.user = this.userService.getCurrentUser();
      this.auth = {'Authorization': 'Bearer ' + this.user.token};
    } else {
      return;
    }
    this.profileId = parseInt(params.id);
    this.populateProfile();
  }

  private async populateProfile(): Promise<void> {
    const first = this;
    try {
      const response = await first.http.fetch('freelancer/' + this.profileId, {
        method: 'get',
        headers: this.auth
      });
      let data = await response.json();
      this.freelancer = data.data;
      this.freelancer.image = this.uploadUrl + this.freelancer.image;
    } catch (error) {
      let data = await error.json();
      if (data.error === "Not logged in.") {
        first.router.navigate('login');
      } else {
        first.router.navigateToRoute('freelancer', {id: first.user.id})
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