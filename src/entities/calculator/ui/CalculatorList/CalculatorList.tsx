import './CalculatorList.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import { FinModel } from '@/entities/calculator/ui/FinModel';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { Button } from '@/shared/ui';

import {
  CalculatorData,
  Currency,
  Filter,
  Model,
  Product,
} from '../../model/types';
import { CalculatorDropdownItem } from '../CalculatorDropdownItem';
import { CalculatorItemCard } from '../CalculatorItemCard';

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
      <div className={'calculator-list__wrap'}>
        {!!models.length && (
          <div
            className={clsx('calculator-list__items', {
              'calculator-list__items--loading': isFetching,
            })}
          >
            {models.map((model) => (
              <CalculatorItemCard
                key={model.product.id}
                model={model}
                currency={filters.currency}
                setModelCount={setModelCount}
                removeModel={removeModel}
              />
            ))}
          </div>
        )}

        <CalculatorDropdownItem
          filters={filters}
          setFilterField={setFilterField}
          calculatorData={calculatorData}
          isFetching={isFetching}
          models={models}
          addModel={addModel}
          removeModel={removeModel}
          setModelCount={setModelCount}
          electricityCoast={electricityCoast}
          setElectricityCoast={setElectricityCoast}
        />

        <Button size={'sm'} isWide>
          Добавить оборудование <PlusIcon />
        </Button>
      </div>
      {!!models.length && (
        <>
          <div className={'calculator-list__title'}>
            Расчет финансовой модели
          </div>
          <FinModel
            models={models}
            currency={filters.currency}
            dollar={calculatorData.dollar}
            electricityCoast={electricityCoast}
            onChangeElectricityCoast={setElectricityCoast}
            onChangeCurrency={(v) => setFilterField('currency', v)}
          />
        </>
      )}
    </div>
  );
};
