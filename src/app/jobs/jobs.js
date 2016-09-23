import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from 'user';
import {json} from 'aurelia-fetch-client';
import 'fetch';

@inject('AppHttpClient', 'SearchHttpClient', Router, User, Element)
export class Jobs {
  jobs = [];
  filters = '';
  selectedTags = [];
  allTags = [];
  visibleTags = [];
  visibleSearch = false;
  period;
  periodOptions = [
    {value: 1, name: '24h'},
    {value: 2, name: '48h'},
    {value: 3, name: '3 days'},
    {value: 7, name: 'a week'}
  ];
  priceFrom;
  priceTo;


  constructor(app, search, router, user, element) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + user.token};

    this.getJobs();
    this.getAllTags();

    this.typeAhead = e => this.filterTags();

  }

  attached() {
    this.tagInput = this.element.querySelector('#add_tag');

    this.tagInput.addEventListener('keyup', this.typeAhead);
  }

  detached() {
    this.tagInput.removeEventListener('keyup', this.typeAhead);
  }

  addTag(name) {
    if (this.selectedTags.length < 5) {
      this.selectedTags.push({
        name: name
      });
      this.newTag = '';
    }
  };

  filterTags() {
    let first = this;
    this.visibleTags = first.allTags.filter(function (value) {
      return value.includes(first.newTag);
    }).slice(0, 5);
  };

  deleteTag(index) {
    this.selectedTags.splice(index, 1);
  };

  toggleSearch() {
    this.visibleSearch = !this.visibleSearch;
  };

  applyFilters() {
    let first = this;
    first.filters = '?period=' + this.period.value;
    if (first.selectedTags.length) {
      first.selectedTags.forEach(function (tag) {
        first.filters += '&tags=' + tag.name;
      });
    }
    if (first.priceTo) {
      first.filters += '&price_from=' + first.priceTo;
    }
    if (first.priceFrom) {
      first.filters += '&price_from=' + first.priceFrom;
    }
    this.getJobs();
    this.toggleSearch();
  }

  getAllTags() {
    let first = this;
    first.search
      .fetch('jobs/tags', {
        method: 'get',
        headers: this.auth
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.allTags = data.tags;
          first.visibleTags = first.allTags.slice(0, 5);
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  getJobs() {
    let first = this;
    first.search
      .fetch('jobs' + this.filters, {
        method: 'get',
        headers: this.auth
      })
      .then(function (response) {
        response.json().then(function (data) {
          first.jobs = data.items;
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }
}