export class TimestampFormatterValueConverter {
  toView(value) {
    let date = new Date(parseInt(value));
    return date.getHours() + ':' + date.getMinutes();
  }
}