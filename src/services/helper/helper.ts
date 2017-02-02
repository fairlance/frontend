interface IProduct {
  data: Array<IData>
}
interface IMedia {
  url?: string;
  tag?: string
}
interface IData {
  icon?: IMedia;
  featuredImage?: IMedia,
  media?: Array<IMedia>,
  iata?: string
}
export class Helper {
  private counter: number = 0;

  public sortArray(unsorted: IProduct, muster: Array<string>, property: string): Array<any> {
    let sorted: Array<IData> = [];
    muster.forEach(function (iata) {
      let temp = unsorted.data.filter(item => item[property].toUpperCase() === iata)[0];
      if (temp) {
        sorted.push(temp);
      }
    });
    return sorted;
  }

  public uniqueArrayForParams(params: Array<string>, array: Array<any>): Array<any> {
    let restructuredArray: Array<any> = [];
    let uniqueKeys: Object = {};
    let key: string = "";
    array.forEach(function (item: any) {
      key = "";
      params.forEach(function (k: string) {
        key += item[k];
      });
      if (!uniqueKeys[key]) {
        uniqueKeys[key] = true;
        restructuredArray.push(item);
      }
    });
    return restructuredArray;
  }

}