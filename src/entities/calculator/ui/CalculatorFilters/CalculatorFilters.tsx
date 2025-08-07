import './CalculatorFilters.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Input } from '@/shared/ui';

import { Currency, Filter } from '../../model/types';
import { CurrencySwitch } from '../../ui/CurrencySwitch';

const options: { title: string; filter: Filter }[] = [
  { title: 'Все', filter: '' },
  { title: 'Самые прибыльные', filter: 'profitable' },
  { title: 'Быстрая окупаемость без учета э/э', filter: 'fastPayback' },
  { title: 'Лучший выбор', filter: 'bestChoice' },
];

interface ICalculatorFiltersProps {
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
  search: string;
  onChangeSearch: (search: string) => void;
  filter: Filter;
  onChangeFilter: (filter: Filter) => void;
  isBlock?: boolean;
  productName?: string;
}

export const CalculatorFilters: FC<ICalculatorFiltersProps> = ({
  currency,
  onChangeCurrency,
  search,
  onChangeSearch,
  filter,
  onChangeFilter,
  isBlock,
  productName,
}) => {
  const match = useMediaQuery(MAX_WIDTH_MD);

  return (
    <div className={'calculator-filters'}>
      <div className={'calculator-filters__title'}>Модели оборудования</div>
      <div className={'calculator-filters__wrap'}>
        <div className={'calculator-filters__options-list'}>
          {options.map((option) => (
            <button
              key={option.filter}
              onClick={() => onChangeFilter(option.filter)}
              className={clsx('calculator-filters__options-item', {
                'calculator-filters__options-item--active':
                  filter === option.filter,
              })}
            >
              {option.title}
            </button>
          ))}
        </div>
        {!match && (
          <CurrencySwitch
            value={currency}
            onChange={onChangeCurrency}
            className={'calculator-filters__mobile-hidden'}
          />
        )}
      </div>
      <div className={'calculator-filters__wrap'}>
        <Input
          className={'calculator-filters__search'}
          placeholder={isBlock ? `${productName}` : 'Поиск по модели'}
          sizes={'sm'}
          value={isBlock ? undefined : search}
          readOnly={isBlock}
          onChange={(e) => onChangeSearch(e.target.value)}
          icon={
            search && !isBlock ? (
              <CloseIcon
                onClick={() => onChangeSearch('')}
                className={'calculator-filters__search-clear'}
              />
            ) : (
              <SearchIcon />
            )
          }
        />
      </div>
    </div>
  );
};
