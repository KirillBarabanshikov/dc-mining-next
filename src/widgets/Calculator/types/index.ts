export interface IProductAdd {
  id: number;
  count: number;
  productAsics: IAsic;
}

export interface IProduct {
  price: number;
  id: number;
  title: string;
  count: number;
  profitDayAll: number | null;
  watt: number | null;
  productAdd: IProductAdd[];
}

export interface ICalculatorApi {
  electricityCoast: number;
  products: IProduct[];
}

export interface IAsic {
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