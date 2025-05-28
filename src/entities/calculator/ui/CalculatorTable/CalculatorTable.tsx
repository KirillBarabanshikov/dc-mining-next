import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import PlusIcon from '@/shared/assets/icons/plus.svg';

import {
  CalculatorData,
  Currency,
  Filter,
  Model,
  Product,
} from '../../model/types';
import { CalculatorFilters } from '../CalculatorFilters';
import { FinModel } from '../FinModel';
import { CalculatorModelRow } from './CalculatorModelRow';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

interface ICalculatorTableProps {
  filters: {
    currency: Currency;
    search: string;
    filter: Filter;
  };
  setFilterField: (
    key: 'search' | 'currency' | 'filter',
    value: string,
  ) => void;
  calculatorData: CalculatorData;
  isFetching?: boolean;
  models: Model[];
  addModel: (product: Product) => void;
  removeModel: (product: Product) => void;
  setModelCount: (product: Product, count: number) => void;
  className?: string;
}

export const CalculatorTable: FC<ICalculatorTableProps> = ({
  filters,
  setFilterField,
  calculatorData,
  isFetching,
  models,
  addModel,
  removeModel,
  setModelCount,
  className,
}) => {
  return (
    <div className={clsx('calculator-table', className)}>
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
          { 'calculator-table--loading': isFetching },
        )}
      >
        {calculatorData.products.map((product) => {
          return (
            <CalculatorProductRow
              key={product.id}
              product={product}
              currency={filters.currency}
              models={models}
              addModel={addModel}
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
      {!!models.length && (
        <>
          <CalculatorTableHeader
            variant={'model'}
            currency={filters.currency}
          />
          <div
            className={clsx(
              'calculator-table__rows calculator-table__rows-models',
              { 'calculator-table--loading': isFetching },
            )}
          >
            {models.map((model) => {
              return (
                <CalculatorModelRow
                  key={model.product.id}
                  currency={filters.currency}
                  model={model}
                  removeModel={removeModel}
                  setModelCount={setModelCount}
                />
              );
            })}
          </div>
          <FinModel models={models} currency={filters.currency} />
        </>
      )}
      <div className={'calculator-table__extra'}>
        <div>Не является публичной офертой</div>
        <div>
          BTC=101 000 $, DOGE=0.31 $, LTC=0.35 $,{' '}
          <span>Курс доллара = {calculatorData.dollar} ₽</span>
        </div>
      </div>
    </div>
  );
};
