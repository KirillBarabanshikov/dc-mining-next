import './CalculatorTable.scss';

import clsx from 'clsx';
import { FC } from 'react';

const cells = {
  product: [
    { title: 'Название' },
    { title: 'Хэшрейт' },
    { title: 'Цена' },
    { title: 'Доход, руб.', subtitles: ['В монете в месяц', 'В руб. в месяц'] },
    { title: 'Доход, руб.', subtitles: ['без учета э/э', 'с учетом э/э'] },
    {
      title: 'Окупаемость, мес.',
      subtitles: ['без учета э/э', 'с учетом э/э'],
    },
  ],
  model: [
    { title: 'Название' },
    { title: 'Хэшрейт' },
    { title: 'Количество' },
    { title: 'Доход, руб.', subtitles: ['без учета э/э', 'с учетом э/э'] },
    { title: 'Цена за шт.' },
    { title: 'Общая стоимость' },
  ],
};

interface ICalculatorTableHeaderProps {
  variant: 'product' | 'model';
}

export const CalculatorTableHeader: FC<ICalculatorTableHeaderProps> = ({
  variant,
}) => {
  return (
    <div
      className={clsx(
        'calculator-table__header',
        `calculator-table__header--${variant}`,
      )}
    >
      {cells[variant].map((cell, index) => (
        <div
          key={index}
          className={clsx('calculator-table__header-cell', {
            'calculator-table__header-cell--subtitles': !!cell.subtitles,
          })}
        >
          <div className={'calculator-table__header-title'}>{cell.title}</div>
          <div className={'calculator-table__header-subtitle'}>
            {cell.subtitles?.map((subtitle, index) => (
              <span key={index}>{subtitle}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
