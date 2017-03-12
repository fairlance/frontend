
interface IPeriod {
  value: number,
  name: string
}

interface IReference {
  selected: boolean,
  id: string
}

interface IWebExample {
  link: string,
  description: string
}

interface IAttachmnet {
  name: string,
  url: string
}

interface ITag {
  name: string
}

interface IOptions {
  secure?: boolean,
  domain?: string,
  path?: string,
  expires?: number,
  expiry?: number
}

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

interface IUser {
  id?: string,
  type?: string,
  token?: string,
  skills?: Array<ISkills>,
  isAvailable?: boolean,
  hourlyRateFrom?: number,
  hourlyRateTo?: number,
  payment?: string,
  industry?: string,
  timezone?: string
}

interface ISkills {
  name: string
}