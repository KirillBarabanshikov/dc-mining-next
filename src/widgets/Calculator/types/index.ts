export interface IProductAdd {
  hashrate: string;
  dimension: string;
  id: number;
  count: number;
  productAsics: IAsic;
}

export interface IProduct extends IAsic {
  productAdd: IProductAdd[];
}

export interface IPackage {
  id: number;
  title: string;
  productAdd: IAsic[];
  price: number;
  count: number;
}

export interface ICalculatorApi {
  dollar: number;
  electricityCoast: number;
  products: IProduct[];
}

export interface IBusinessProduct {
  id: number;
  title: string;
  productAdd: {
    id: number;
    productAsics: IAsic;
  }[];
}

export interface IAsic {
  productAsics: any;
  id: number;
  title: string;
  price: number;
  profitDayAll: number;
  watt: number;
  label: string;
  value: string;
  count: number;
  additionalId: string;
  hashrate: string;
  dimension: string;
  isInitial?: boolean;
  initialCount?: number;
}

export interface IAsicPDF {
  id: number;
  title: string;
  hashrate: string;
  quantity: string;
  priceOnePiece: string;
  price: string;
}

export interface IPostPDFRequest {
  sumRuble: string;
  sumDollar: string;
  curs: string;
  sumIn: string;
  everyMonthWatt: string;
  profitWithoutWatt: string;
  profitWithMonth: string;
  asics: IAsicPDF[];
}
