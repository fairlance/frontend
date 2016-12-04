import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

interface ISkills {
  name: string
}
interface IUser {
  id?: string,
  type?: string,
  skills?: Array<ISkills>,
  isAvailable?: boolean,
  hourlyRateFrom?: number,
  hourlyRateTo?: number,
  payment?: string,
  industry?: string,
  timezone?: string
}

@inject('AppHttpClient', Router, User)
export class Info {
  private router: Router;
  private user: IUser;
  private http: any;
  private scrollTop: number = 0;
  private skills: Array<ISkills> = [];
  private screen: boolean = false;
  private available: boolean = true;
  private handleScrollEvent: any;
  private newSkill: string = '';
  private timezone: string;
  private rateFrom: string;
  private rateTo: string;
  private payment: string;
  private industry: string;

  constructor(http, router, user) {
    let first = this;
    this.http = http;
    this.router = router;
    this.user = user.getCurrentUser().data.user;
    this.user.type = user.getCurrentUser().data.type;

    this.handleScrollEvent = e => {
      setTimeout(() => {
        first.screen = true
      }, 300);
      document.removeEventListener('scroll', first.handleScrollEvent);
    };
  }

  attached() {
    document.addEventListener('scroll', this.handleScrollEvent);
  }

  detached() {
    document.removeEventListener('scroll', this.handleScrollEvent);
  }

  async addInfo(): Promise<void> {
    var first = this;
    const response = await first.http.fetch(first.user.type + '/' + first.user.id, {
      method: 'post',
      body: first.gatherInfo()
    });
    await response.json();
    first.router.navigate('login');
  };

  private addSkill(): void {
    this.skills.push({
      name: this.newSkill
    });
    this.newSkill = '';
  };

  private gatherInfo(): Object {
    let user: IUser = {
      timezone: this.timezone
    };
    if (this.user.type === 'freelancer') {
      user.skills = this.skills;
      user.isAvailable = this.available;
      user.hourlyRateFrom = parseInt(this.rateFrom);
      user.hourlyRateTo = parseInt(this.rateTo);
    } else {
      user.payment = this.payment;
      user.industry = this.industry;
    }
    return json(user);
  };

}
