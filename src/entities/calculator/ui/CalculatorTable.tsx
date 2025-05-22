'use client';

import './CalculatorTable.scss';

import { CalculatorTableHeader } from '@/entities/calculator/ui/CalculatorTableHeader';

import { CalculatorFilters } from './CalculatorFilters';

const modelHeaderCells = [
  { title: 'Название' },
  { title: 'Хэшрейт' },
  { title: 'Цена' },
  { title: 'Доход, руб.', subtitles: ['В монете в месяц', 'В руб. в месяц'] },
  { title: 'Доход, руб.', subtitles: ['без учета э/э', 'с учетом э/э'] },
  { title: 'Окупаемость, мес.', subtitles: ['без учета э/э', 'с учетом э/э'] },
];

export const CalculatorTable = () => {
  return (
    <div className={'calculator-table'}>
      <CalculatorFilters />
      <CalculatorTableHeader cells={modelHeaderCells} />
    </div>
  );
};
