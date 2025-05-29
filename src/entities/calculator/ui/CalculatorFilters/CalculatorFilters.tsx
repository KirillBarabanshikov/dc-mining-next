import './CalculatorFilters.scss';

import clsx from 'clsx';
import React, { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
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
}

export const CalculatorFilters: FC<ICalculatorFiltersProps> = ({
  currency,
  onChangeCurrency,
  search,
  onChangeSearch,
  filter,
  onChangeFilter,
}) => {
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
        <CurrencySwitch value={currency} onChange={onChangeCurrency} />
      </div>
      <Input
        className={'calculator-filters__search'}
        placeholder={'Поиск по модели'}
        sizes={'sm'}
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        icon={
          search ? (
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
  );
};
