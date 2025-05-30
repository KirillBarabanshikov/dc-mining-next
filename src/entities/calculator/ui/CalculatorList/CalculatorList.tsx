import './CalculatorList.scss';

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
import { CalculatorItemCard } from '../CalculatorItemCard';
import { FinModel } from '@/entities/calculator/ui/FinModel';

interface ICalculatorListProps {
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

export const CalculatorList: FC<ICalculatorListProps> = ({
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
    <div className={clsx('calculator-list', className)}>
      <CalculatorFilters
        currency={filters.currency}
        onChangeCurrency={(v) => setFilterField('currency', v)}
        search={filters.search}
        onChangeSearch={(v) => setFilterField('search', v)}
        filter={filters.filter}
        onChangeFilter={(v) => setFilterField('filter', v)}
      />
      <div
        className={clsx('calculator-list__items', {
          'calculator-list__items--loading': isFetching,
        })}
      >
        {calculatorData.products.map((product) => (
          <CalculatorItemCard
            key={product.id}
            variant={'product'}
            product={product}
            currency={filters.currency}
            models={models}
            addModel={addModel}
            setModelCount={setModelCount}
          />
        ))}
      </div>
      <div className={'calculator-list__separator'} />
      <div className={'calculator-list__hint'}>
        <div className={'calculator-list__hint-title'}>
          Расчет финансовой модели
        </div>
        <div className={'calculator-list__hint-card'}>
          <div className={'calculator-list__hint-icon'}>
            <PlusIcon />
          </div>
          <div className={'calculator-list__hint-text'}>
            Для добавления товара в расчет нажмите на «+»
          </div>
        </div>
      </div>
      {!!models.length && (
        <>
          <div
            className={clsx('calculator-list__items', {
              'calculator-list__items--loading': isFetching,
            })}
          >
            {models.map((model) => (
              <CalculatorItemCard
                key={model.product.id}
                variant={'model'}
                model={model}
                currency={filters.currency}
                models={models}
                setModelCount={setModelCount}
                removeModel={removeModel}
              />
            ))}
          </div>
          <FinModel
            models={models}
            currency={filters.currency}
            dollar={calculatorData.dollar}
            electricityCoast={electricityCoast}
            onChangeElectricityCoast={setElectricityCoast}
          />
        </>
      )}
    </div>
  );
};
