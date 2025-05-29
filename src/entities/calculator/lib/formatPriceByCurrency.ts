import { Currency } from '../model/types';

export function formatPriceByCurrency(
  value: number,
  currency: Currency,
): string {
  const isDollar = currency === 'dollar';

  return value.toLocaleString(isDollar ? 'en-EN' : 'ru-RU', {
    style: 'currency',
    currency: isDollar ? 'USD' : 'RUB',
  });
}
