'use client';

import './CalculatorTable.scss';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Currency, Filter } from '@/entities/calculator/model/types';
import PlusIcon from '@/shared/assets/icons/plus.svg';

import { getCalculatorData } from '../api/calculatorApi';
import { CalculatorFilters } from './CalculatorFilters';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

export const CalculatorTable = () => {
  const [filters, setFilters] = useState({
    currency: 'rub' as Currency,
    search: '',
    filter: '' as Filter,
  });
  const [debouncedSearch] = useDebounce(filters.search, 300);

  const { data, isFetching } = useQuery({
    queryKey: ['calculator', filters.currency, filters.filter, debouncedSearch],
    queryFn: () =>
      getCalculatorData({
        currency: filters.currency,
        filter: filters.filter,
        title: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const setFilterField = <T extends keyof typeof filters>(
    key: T,
    value: (typeof filters)[T],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (!data) return <></>;

  return (
    <div className={'calculator-table'}>
      <CalculatorFilters
        currency={filters.currency}
        onChangeCurrency={(v) => setFilterField('currency', v)}
        search={filters.search}
        onChangeSearch={(v) => setFilterField('search', v)}
        filter={filters.filter}
        onChangeFilter={(v) => setFilterField('filter', v)}
      />
      <CalculatorTableHeader variant={'product'} currency={filters.currency} />
      <div
        className={clsx(
          'calculator-table__rows calculator-table__rows-products',
          { 'calculator-loading': isFetching },
        )}
      >
        {data.products.map((product) => {
          return (
            <CalculatorProductRow
              key={product.id}
              product={product}
              currency={filters.currency}
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
