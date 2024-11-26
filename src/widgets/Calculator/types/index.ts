export interface IProductAdd {
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
}
