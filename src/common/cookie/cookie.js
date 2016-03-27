export class Cookie {

  /**
   * Set a cookie
   */
  set(name, value, options = {}) {
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
      var date = Date.now();
      console.log(date, options.expires);
      date = new Date(date);

      str += `; expires=${date.toString()}`;
    }

    if (options.secure) {
      str += '; secure';
    }

    document.cookie = str;
  }

  encode(value) {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return null;
    }
  }

  decode(value) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  all() {
    return this.parse(document.cookie);
  }

  parse(str) {
    var obj = {};
    var pairs = str.split(/ *; */);
    var pair;

    if ('' == pairs[0]) {
      return obj;
    }

    for (let i = 0; i < pairs.length; ++i) {
      pair = pairs[i].split('=');
      obj[this.decode(pair[0])] = this.decode(pair[1]);
    }

    return obj;
  }

  get(name) {
    let cookies = this.all();

    if (cookies && cookies[name]) {
      return cookies[name];
    }

    return null;
  }
}