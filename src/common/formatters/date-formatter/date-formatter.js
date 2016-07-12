export class DateFormatterValueConverter {
  toView(value) {
    let date = new Date(value);
    return date.getDay() + ' ' + date.toLocaleString('en-us', { month: "short" }) + ' ' + date.getFullYear();
  }
}