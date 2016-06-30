import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', Router, User)
export class Info {
  scrollTop = 0;
  skills = [];
  screen = false;

  constructor(http, router, user) {
    let first = this;
    this.http = http;
    this.router = router;
    this.user = user.getCurrentUser().data;

    this.handleScrollEvent = e => {
      setTimeout(() => {first.screen = true}, 300);
      document.removeEventListener('scroll', first.handleScrollEvent);
    };
  }

  attached() {
    document.addEventListener('scroll', this.handleScrollEvent);
  }

  detached() {
    document.removeEventListener('scroll', this.handleScrollEvent);
  }

  activate(params){
    this.user.type = parseInt(params.type);
  }

  addInfo = function () {
    var first = this;
    first.http.fetch(first.user.type + '/' + first.user.id, {
        method: 'update',
        body: first.gatherInfo()
      })
      .then(function () {
        first.router.navigate('login');
      })
      .catch(function (error) {
        error.json().then(function (data) {
          alert(data);
        });
      });
  };

  addSkill = function () {
    this.skills.push(this.newSkill);
    this.newSkill = '';
  };

  gatherInfo = function () {
    let info;
    if (this.user.type !== 'freelancer') {
      info = {
        skills: this.skills,
        timezone: this.timezone,
        available: this.available,
        rateFrom: this.rateFrom,
        rateTo: this.rateTo
      };
    } else {
      info = {
        timezone: this.timezone,
        payment: this.payment,
        industry: this.industry
      };
    }
    return json(info);
  };

}
