import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC, useState } from 'react';

import { Pagination } from '@/shared/ui';

import {
  CalculatorData,
  Coin,
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
    page: string;
  };
  setFilterField: (
    key: 'search' | 'currency' | 'filter' | 'page',
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
  coinRates: Coin[];
  productName?: string;
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
  coinRates,
  productName,
  className,
}) => {
  const [isBlock, setIsBlock] = useState(!!productName);

  return (
    <div className={clsx('calculator-table', className)}>
      <CalculatorFilters
        currency={filters.currency}
        onChangeCurrency={(v) => setFilterField('currency', v)}
        search={filters.search}
        onChangeSearch={(v) => setFilterField('search', v)}
        filter={filters.filter}
        onChangeFilter={(v) => setFilterField('filter', v)}
        isBlock={isBlock}
        productName={productName}
      />
      <ProductsContent
        filters={filters}
        calculatorData={calculatorData}
        models={models}
        addModel={addModel}
        isFetching={isFetching}
        isBlock={isBlock}
        setIsBlock={setIsBlock}
        onBlock={() => setFilterField('search', '')}
      />

      {calculatorData.totalTabs && !isBlock && (
        <Pagination
          currentPage={+filters.page}
          length={calculatorData.totalTabs}
          onChange={(page) => setFilterField('page', page.toString())}
          className={'calculator-table__pagination'}
        />
      )}

      <div className={'calculator-table__title'}>Бизнес план майнинга</div>
      <div className={'calculator-table__hint'}>
        Для добавления товара в расчет нажмите на{' '}
        <div className={'calculator-table__hint-icon'}>Добавить</div> справа от
        модели оборудования
      </div>
      {!!models.length && (
        <>
          <ModelsContent
            filters={filters}
            models={models}
            removeModel={removeModel}
            setModelCount={setModelCount}
            isFetching={isFetching}
            isBlock={isBlock}
          />
          <FinModel
            models={models}
            currency={filters.currency}
            dollar={calculatorData.dollar}
            electricityCoast={electricityCoast}
            onChangeElectricityCoast={setElectricityCoast}
            coinRates={coinRates}
          />
        </>
      )}
    </div>
  );
};
