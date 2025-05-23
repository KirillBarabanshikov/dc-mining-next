'use client';

import './CalculatorTable.scss';

import { CalculatorFilters } from './CalculatorFilters';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

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
      <div className={'calculator-table__rows'}>
        {Array.from({ length: 10 }).map((_, index) => {
          return <CalculatorProductRow key={index} />;
        })}
      </div>
    </div>
  );
};
