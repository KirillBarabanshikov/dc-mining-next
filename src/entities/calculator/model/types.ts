export type Coin = {
  title: string;
  value: number;
  profit: number;
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
  products: Product[];
};

export type Currency = 'dollar' | 'rub';

export type Filter = 'profitable' | 'fastPayback' | 'bestChoice' | '';
