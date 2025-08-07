export type Coin = {
  title: string;
  value: number;
  profit: number;
  price: number;
  image: string | null;
};

export type Product = {
  id: number;
  title: string;
  profitDayAll: number;
  paybackPerMonth: number;
  price: number;
  watt: number;
  hashrate: number;
  algorithm: string;
  profitWithWatt: number;
  bestChoice: boolean;
  paybackWithWatt: number;
  dimension: string;
  coins: string;
  coinsArray: Coin[];
};

export type CalculatorData = {
  electricityCoast: number;
  dollar: number;
  totalTabs?: number;
  products: Product[];
};

export type Currency = 'dollar' | 'rub';

export type Filter = 'profitable' | 'fastPayback' | 'bestChoice' | '';

export type Model = { product: Product; count: number };

export type FinModelPdf = {
  sumRuble: string;
  sumDollar: string;
  curs: string;
  sumIn: string;
  everyMonthWatt: string;
  profitWithoutWatt: string;
  profitWithMonth: string;
  asics: {
    id: number;
    title: string;
    hashrate: string;
    quantity: number;
    priceOnePiece: string;
    price: string;
  }[];
  type: 'По моделям';
};
