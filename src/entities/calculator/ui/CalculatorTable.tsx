'use client';

import './CalculatorTable.scss';

import React from 'react';

import PlusIcon from '@/shared/assets/icons/plus.svg';

import { CalculatorFilters } from './CalculatorFilters';
import { CalculatorModelRow } from './CalculatorModelRow';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

export const CalculatorTable = () => {
  return (
    <div className={'calculator-table'}>
      <CalculatorFilters />
      <CalculatorTableHeader variant={'product'} />
      <div className={'calculator-table__rows calculator-table__rows-products'}>
        {Array.from({ length: 10 }).map((_, index) => {
          return <CalculatorProductRow key={index} />;
        })}
      </div>
      <div className={'calculator-table__title'}>Расчет финансовой модели</div>
      <div className={'calculator-table__hint'}>
        Для добавления товара в расчет нажмите на{' '}
        <div className={'calculator-table__hint-icon'}>
          <PlusIcon />
        </div>{' '}
        справа от модели оборудования
      </div>
      <CalculatorTableHeader variant={'model'} />
      <div className={'calculator-table__rows calculator-table__rows-models'}>
        {Array.from({ length: 10 }).map((_, index) => {
          return <CalculatorModelRow key={index} />;
        })}
      </div>
    </div>
  );
};
