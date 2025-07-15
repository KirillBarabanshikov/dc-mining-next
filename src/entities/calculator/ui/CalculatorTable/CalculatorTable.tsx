import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import PlusIcon from '@/shared/assets/icons/plus.svg';

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
  coinRates: Coin[];
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
  className,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [isFixedTop, setIsFixedTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!tableRef.current) return;
      const top = tableRef.current.getBoundingClientRect().top;
      setIsFixedTop(top <= 250);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={tableRef}
      className={clsx(
        'calculator-table',
        { 'calculator-table--is-fixed-top': isFixedTop },
        className,
      )}
    >
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
        <div className={'calculator-table__extra-wrap'}>
          {coinRates.map((coin) => (
            <div key={coin.title}>
              {coin.title}={formatPriceByCurrency(coin.price, filters.currency)}
              ,
            </div>
          ))}
          <span>Курс доллара = {calculatorData.dollar} ₽</span>
        </div>
      </div>
    </div>
  );
};
