export class Cookie {
  private static instance: Cookie;

  static getInstance() {
    if (!Cookie.instance) {
      Cookie.instance = new Cookie();
    }
    return Cookie.instance;
  }

  public set(name: string, value: any, days: number): void {
    let expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
  }

  public remove(name: string) {
    this.set(name,"",-1);
  }

  public get(name): any {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length,c.length));
    }
    return null;
  }
}