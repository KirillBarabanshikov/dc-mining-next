import { Currency, Filter } from '../model/types';

export type CalculatorDataParams = {
  type?: string;
  title?: string;
  filter?: Filter;
  currency?: Currency;
  display?: boolean;
};
