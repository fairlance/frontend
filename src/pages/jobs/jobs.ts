import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {json} from 'aurelia-fetch-client';
import {User} from "../../services/user/user";

interface IPeriod {
  value: number,
  name: string
}

interface ITag {
  name: string
}

@inject('AppHttpClient', 'SearchHttpClient', Router, User, Element)
export class Jobs {
  private jobs = [];
  private filters = '';
  private router: Router;
  private user: any;
  private app: any;
  private search: any;
  private element: Element;
  private auth: Object;
  private selectedTags: Array<ITag> = [];
  private allTags: Array<ITag> = [];
  private visibleTags: Array<ITag> = [];
  private visibleSearch: boolean = false;
  private periodOptions: Array<IPeriod> = [
    {value: 1, name: '24h'},
    {value: 2, name: '48h'},
    {value: 3, name: '3 days'},
    {value: 7, name: 'a week'}
  ];
  private period: IPeriod = this.periodOptions[3];
  private priceFrom: number;
  private priceTo: number;
  private typeAhead: any;
  private tagInput: any;
  private newTag: string;


  constructor(app, search, router, user, element) {

    this.user = user.getCurrentUser().data;
    this.router = router;
    this.app = app;
    this.search = search;
    this.element = element;
    this.auth = {'Authorization': 'Bearer ' + this.user.token};

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

  private addTag(name: string): void {
    if (this.selectedTags.length < 5) {
      this.selectedTags.push({
        name: name
      });
      this.newTag = '';
    }
  };

  private filterTags(): void {
    let first = this;
    this.visibleTags = first.allTags.filter(function (value: any) {
      return value.includes(first.newTag);
    }).slice(0, 5);
  };

  private deleteTag(index): void {
    this.selectedTags.splice(index, 1);
  };

  private toggleSearch(): void {
    this.visibleSearch = !this.visibleSearch;
  };

  private applyFilters(): void {
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

  async getAllTags(): Promise<void> {
    let first = this;
    const response = await first.search.fetch('job/tags', {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.allTags = data.data.tags;
    first.visibleTags = first.allTags.slice(0, 5);
  }

  async getJobs(): Promise<void>  {
    let first = this;
    const response = await first.search.fetch('job' + this.filters, {
      method: 'get',
      headers: this.auth
    });
    let data = await response.json();
    first.jobs = data.data.items;
  }
}