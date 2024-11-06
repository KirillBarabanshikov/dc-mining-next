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

export interface ICalculatorApi {
  electricityCoast: number;
  products: IAsic[];
}
