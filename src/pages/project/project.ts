import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

@inject('AppHttpClient', Router, User, Element)
export class Project {
  private router: Router;
  private user: any;
  private http: any;
  private auth: Object;
  private element: Element;
  private projectId: number;

  constructor(http, router, user, element) {
    this.user = user.getCurrentUser().data;
    this.router = router;
    this.http = http;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + user.token};
  }

  activate(params) {
    console.log(params);
  }

  private toggleMenu() {
    let selected = this.element.querySelector('.slide-active');

    $('#slidemenu').stop().animate({
      left: selected ? '-100%' : '0px'
    });

    $('#navbar-height-col').stop().animate({
      left: selected ? '-80%' : '0px'
    });

    $('#page-content').stop().animate({
      left: selected ? '0px' : '80%'
    });

    $('.navbar-header').stop().animate({
      left: selected ? '0px' : '80%'
    });

    $(this).toggleClass('slide-active', !selected);
    $('#slidemenu').toggleClass('slide-active');


    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');

  }
}