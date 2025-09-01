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

export type Model = {
  product: Product;
  count: number;
  currency: Currency;
  currentPrice: number;
  currentProfitDayAll: number;
};

export type FinModelPdf = {
  cu: string;
  ro: string;
  ta: string;
  allwaro: string;
  allwa: string;
  wmio: string;
  rm: string;
  allprice: string;
  curs: string;
  coins: {
    title: string;
    currency: string;
  }[];
  asics: {
    id: number;
    title: string;
    hash: string;
    quantity: number;
    wawi: string;
    waro: string;
    algorithm: string;
    watt: string;
    prone: string;
    prall: string;
  }[];
  id?: number;
  type: string;
};
