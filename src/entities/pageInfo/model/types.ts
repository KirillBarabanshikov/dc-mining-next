export interface IAboutInfo {
  id: number;
  advantages: IAdvantage[];
  partners: {
    id: number;
    image: string;
    preview: string;
  }[];
  main: { id: number; title: string; description: string; image: string }[];
}

export interface IAdvantage {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface IMassMedia {
  id: number;
  image?: string;
  dateAt: string;
  title: string;
  description: string;
  display: boolean;
  link?: string;
  slug: string;
}

export interface ILeasingInfo {
  id: number;
  description: string;
  information: {
    id: number;
    title: string;
    description: string;
  }[];
  steps: {
    id: number;
    number: number;
    description: string;
  }[];
  informationTitle: string;
}

export interface IDataCenterInfo {
  id: number;
  title: string;
  description: string;
  top: {
    id: number;
    image: string;
    title: string;
    description: string;
    sequence: number;
    link?: string;
  }[];
  tariffPlans: ITariff[];
  goodKnow: {
    id: number;
    title: string;
    description: string;
    sequence: number;
  }[];
  slider: {
    id: number;
    title: string;
    images: {
      id: number;
      image: string;
    }[];
    sequence: number;
  }[];
  countDevices: number;
  info: string;
}

export interface ITariff {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  imageHover: string;
  sequence: number;
}

export interface IDeliveryAndPaymentInfo {
  id: number;
  image: string;
  title: string;
  description: string;
}
