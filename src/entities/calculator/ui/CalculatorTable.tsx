'use client';

import './CalculatorTable.scss';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { Currency } from '@/entities/calculator/model/types';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import { getCalculatorData } from '../api/calculatorApi';
import { CalculatorFilters } from './CalculatorFilters';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

export const CalculatorTable = () => {
  const [currency, setCurrency] = useState<Currency>('rub');

  const { data } = useQuery({
    queryKey: ['calculator'],
    queryFn: () => getCalculatorData(),
  });

  if (!data) return <></>;

  return (
    <div className={'calculator-table'}>
      <CalculatorFilters currency={currency} onChangeCurrency={setCurrency} />
      <CalculatorTableHeader variant={'product'} currency={currency} />
      <div className={'calculator-table__rows calculator-table__rows-products'}>
        {data.products.map((product) => {
          return (
            <CalculatorProductRow
              key={product.id}
              product={product}
              currency={currency}
            />
          );
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
      {/*<CalculatorTableHeader variant={'model'} />*/}
      {/*<div className={'calculator-table__rows calculator-table__rows-models'}>*/}
      {/*  {Array.from({ length: 10 }).map((_, index) => {*/}
      {/*    return <CalculatorModelRow key={index} />;*/}
      {/*  })}*/}
      {/*</div>*/}
      {/*<CalculatorFinModel />*/}
      <div className={'calculator-table__extra'}>
        <div>Не является публичной офертой</div>
        <div>
          BTC=101 000 $, DOGE=0.31 $, LTC=0.35 $,{' '}
          <span>Курс доллара = {data.dollar} ₽</span>
        </div>
      </div>
    </div>
  );
};
