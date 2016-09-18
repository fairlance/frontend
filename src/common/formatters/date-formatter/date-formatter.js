export class DateFormatterValueConverter {
  toView(value) {
    let date = new Date(value);
    return date.getDate() + ' ' + date.toLocaleString('en-us', { month: "short" }) + ' ' + date.getFullYear();
  }
}