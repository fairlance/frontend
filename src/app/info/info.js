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
    this.user = user.getCurrentUser().data.user;
    this.user.type = user.getCurrentUser().data.type;

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

  addInfo = function () {
    var first = this;
    first.http.fetch(first.user.type + '/' + first.user.id, {
        method: 'post',
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
    if (this.user.type !== 'freelancer') {
      this.user.skills = this.skills;
      this.user.timezone = this.timezone;
      this.user.isAvailable = this.available;
      this.user.hourlyRateFrom = this.rateFrom;
      this.user.hourlyRateTo = this.rateTo;
    } else {
      this.user.timezone = this.timezone;
      this.user.payment = this.payment;
      this.user.industry = this.industry;
    }
    return json(this.user);
  };

}
