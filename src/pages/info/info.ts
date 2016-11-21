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
  available = true;

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
          console.log(data.error);
        });
      });
  };

  addSkill = function () {
    this.skills.push({
      name: this.newSkill
    });
    this.newSkill = '';
  };

  gatherInfo = function () {
    let user = {
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
