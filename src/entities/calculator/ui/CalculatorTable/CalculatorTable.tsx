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
import { ModelsContent } from './ModelsContent';
import { ProductsContent } from './ProductsContent';

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
  electricityCoast: number;
  setElectricityCoast: (value: number) => void;
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
  electricityCoast,
  setElectricityCoast,
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
      <ProductsContent
        filters={filters}
        calculatorData={calculatorData}
        models={models}
        addModel={addModel}
        isFetching={isFetching}
      />
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
          <ModelsContent
            filters={filters}
            models={models}
            removeModel={removeModel}
            setModelCount={setModelCount}
            isFetching={isFetching}
          />
          <FinModel
            models={models}
            currency={filters.currency}
            dollar={calculatorData.dollar}
            electricityCoast={electricityCoast}
            onChangeElectricityCoast={setElectricityCoast}
          />
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
