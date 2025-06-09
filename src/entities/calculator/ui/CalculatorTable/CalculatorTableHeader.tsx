import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { Currency } from '@/entities/calculator/model/types';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right2.svg';

const cells = {
  product: [
    { title: 'Название' },
    { title: 'Хэшрейт' },
    { title: 'Цена' },
    {
      title: 'Доход, ',
      currency: { rub: 'руб.', dollar: '$' },
      subtitles: (currency: Currency) => [
        'В монете в месяц',
        `В ${currency === 'rub' ? 'руб.' : '$'} в месяц`,
      ],
    },
    {
      title: 'Доход, ',
      currency: { rub: 'руб. в мес.', dollar: 'в мес. $' },
      subtitles: () => ['без учета э/э', 'с учетом э/э'],
    },
    {
      title: 'Окупаемость, мес.',
      subtitles: () => ['без учета э/э', 'с учетом э/э'],
    },
  ],
  model: [
    { title: 'Название' },
    { title: 'Хэшрейт' },
    { title: 'Количество' },
    {
      title: 'Доход, ',
      currency: { rub: 'руб. в мес.', dollar: 'в мес. $' },
      subtitles: () => ['без учета э/э', 'с учетом э/э'],
    },
    { title: 'Цена за шт.' },
    { title: 'Общая стоимость' },
  ],
};

interface ICalculatorTableHeaderProps {
  variant: 'product' | 'model';
  currency: Currency;
  isScrollable: boolean;
  atEnd: boolean;
  scrollRight: () => void;
}

export const CalculatorTableHeader: FC<ICalculatorTableHeaderProps> = ({
  variant,
  currency,
  isScrollable,
  atEnd,
  scrollRight,
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
          <div className={'calculator-table__header-title'}>
            {cell.title} {cell?.currency && cell.currency[currency]}
          </div>
          {typeof cell.subtitles === 'function' && (
            <div className={'calculator-table__header-subtitle'}>
              {cell.subtitles(currency).map((subtitle, index) => (
                <span key={index}>{subtitle}</span>
              ))}
            </div>
          )}
        </div>
      ))}
      <div
        className={clsx('calculator-table__header-button-wrap', {
          'calculator-table__header-button-wrap--visible':
            isScrollable && !atEnd,
        })}
      >
        <button
          className={'calculator-table__header-button'}
          onClick={scrollRight}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};
