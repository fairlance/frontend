export class DaysLeftValueConverter {
  toView(value) {
    let date: Date = new Date(value);
    let today: Date = new Date();
    return Math.ceil(Math.abs(date.getTime() - today.getTime()) / (1000 * 3600 * 24));
  }
}