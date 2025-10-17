import './CalculatorList.scss';

import clsx from 'clsx';
import React, { FC, useState } from 'react';

import { CalculatorItemInput } from '@/entities/calculator/ui/CalculatorItemInput/CalculatorItemInput';
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
  addModel: (product: Product, model?: Model) => void;
  removeModel: (product: Product) => void;
  setModelCount: (product: Product, count: number) => void;
  electricityCoast: number;
  setElectricityCoast: (value: number) => void;
  onUpdateModel: (updatedModel: Model) => void;
  className?: string;
}

export const CalculatorList: FC<ICalculatorListProps> = ({
  filters,
  setFilterField,
  calculatorData,
  isFetching,
  models,
  removeModel,
  addModel,
  setModelCount,
  electricityCoast,
  setElectricityCoast,
  onUpdateModel,
  className,
}) => {
  const [showDropdown, setShowDropdown] = useState(true);

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
                addModel={addModel}
                models={models}
                onUpdateModel={onUpdateModel}
              />
            ))}
          </div>
        )}

        {(showDropdown || !models.length) && (
          <div className={'calculator-list__dropdown-wrap'}>
            <CalculatorItemInput
              currency={filters.currency}
              addModel={addModel}
              onAdd={() => setShowDropdown(false)}
              onClose={() => setShowDropdown(false)}
              showClose={!!models.length}
              models={models}
            />
          </div>
        )}

        <Button
          size={'sm'}
          isWide
          disabled={!models.length || showDropdown}
          onClick={() => setShowDropdown(true)}
          className={'calculator-list__add-btn'}
        >
          Добавить оборудование <PlusIcon />
        </Button>
      </div>
      <>
        <div className={'calculator-list__title'}>Расчет финансовой модели</div>
        <FinModel
          models={models}
          currency={filters.currency}
          dollar={calculatorData.dollar}
          electricityCoast={electricityCoast}
          onChangeElectricityCoast={setElectricityCoast}
          onChangeCurrency={(v) => setFilterField('currency', v)}
        />
      </>
    </div>
  );
};
