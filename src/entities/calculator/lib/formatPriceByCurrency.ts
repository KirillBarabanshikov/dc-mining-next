import { Currency } from '../model/types';

export function formatPriceByCurrency(
  value: number,
  currency: Currency,
): string {
  const isDollar = currency === 'dollar';
  const roundedValue = Math.round(value); // Округляем до целого числа

  if (isDollar) {
    return `${roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} $`;
  }

  return roundedValue.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
