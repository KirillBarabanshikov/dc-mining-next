'use client';

import './CalculatorDropdownItem.scss';

import { FC, useState } from 'react';

import {
  CalculatorData,
  Currency,
  Filter,
  Model,
  Product,
} from '@/entities/calculator/model/types';
import { CalculatorFilters } from '@/entities/calculator/ui/CalculatorFilters';
import ArrowIcon from '@/shared/assets/icons/arrow-up.svg';
import { Button, Modal, Radio } from '@/shared/ui';

interface ICalculatorDropdownItemProps {
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
  onAdd: () => void;
  className?: string;
}

export const CalculatorDropdownItem: FC<ICalculatorDropdownItemProps> = ({
  calculatorData,
  addModel,
  setFilterField,
  onAdd,
  filters,
}) => {
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={'calculator-dropdown-item'}
      >
        <div className={'calculator-dropdown-item__value'}>Выберите модель</div>
        <div className={'calculator-dropdown-item__icon'}>
          <ArrowIcon />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={'calculator-modal__title'}>Выбор модели</div>
        <CalculatorFilters
          currency={filters.currency}
          onChangeCurrency={(v) => setFilterField('currency', v)}
          search={filters.search}
          onChangeSearch={(v) => setFilterField('search', v)}
          filter={filters.filter}
          onChangeFilter={(v) => setFilterField('filter', v)}
        />
        <div className={'calculator-modal__list'}>
          <div className={'calculator-modal__item'}>
            <Radio
              label={'Не выбрано'}
              checked={selected === ''}
              value={''}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>

          {calculatorData.products.map((product) => (
            <div key={product.id} className={'calculator-modal__item'}>
              <Radio
                label={product.title}
                checked={selected === product.id.toString()}
                value={product.id}
                onChange={(e) => setSelected(e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button
          isWide
          onClick={() => {
            const product = calculatorData.products.find(
              (product) => product.id.toString() === selected,
            );

            if (!product) return;

            addModel(product);
            setIsOpen(false);
            document.body.style.overflowY = 'auto';
            document.body.style.paddingRight = '0px';
            setTimeout(() => onAdd(), 1);
          }}
        >
          Добавить
        </Button>
      </Modal>
    </>
  );
};
