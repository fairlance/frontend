interface IOptions {
  secure?: boolean,
  domain?: string,
  path?: string,
  expires?: number,
  expiry?: number
}

export class Cookie {

  /**
   * Set a cookie
   */
  public set(name: string, value: any, options: IOptions = {}) {
    let str = `${this.encode(name)}=${this.encode(value)}`;

    if (value == null) {
      options.expiry = -1;
    }

    /**
     * Expiry date in hours
     */
    if (options.expiry) {
      let today = new Date();
      options.expires = today.setHours(today.getHours() + options.expiry);
    }

    if (options.path) {
      str += `; path=${options.path}`;
    }

    if (options.domain) {
      str += `; domain=${options.domain}`;
    }

    if (options.expires) {
      let date: number = Date.now();

      str += `; expires=${date.toString()}`;
    }

    if (options.secure) {
      str += '; secure';
    }

    document.cookie = str;
  }

  private encode(value: Object): string | null {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return null;
    }
  }

  private decode(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  public all() {
    return this.parse(document.cookie);
  }

  private parse(str): Object {
    let obj: Object = {};
    let pairs: Array<string> = str.split(/ *; */);
    let pair: Array<string>;

    if ('' === pairs[0]) {
      return obj;
    }

    for (let i: number = 0; i < pairs.length; ++i) {
      pair = pairs[i].split('=');
      obj[this.decode(pair[0])] = this.decode(pair[1]);
    }

    return obj;
  }

  public get(name) {
    let cookies = this.all();

    if (cookies && cookies[name]) {
      return cookies[name];
    }

    return null;
  }
}