export class TimestampFormatterValueConverter {
  toView(value) {
    let date = new Date(parseInt(value));
    console.log(date);
    return date.getHours() + ':' + date.getMinutes();
  }
}