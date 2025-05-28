import clsx from 'clsx';
import React, { FC, useState } from 'react';

import { CurrencySwitch } from '@/entities/calculator/ui/ui';
import styles from '@/features/search/ui/Search/Search.module.scss';
import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Input } from '@/shared/ui';

import { Currency } from '../model/types';

const options = [
  'Все',
  'Самые прибыльные',
  'Быстрая окупаемость без учета э/э',
  'Лучший выбор',
];

interface ICalculatorFiltersProps {
  currency: Currency;
  onChangeCurrency: (currency: Currency) => void;
}

export const CalculatorFilters: FC<ICalculatorFiltersProps> = ({
  currency,
  onChangeCurrency,
}) => {
  const [activeOption, setActiveOption] = useState(options[0]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={'calculator-table__filters'}>
      <div className={'calculator-table__title'}>Модели оборудования</div>
      <div className={'calculator-table__options-list'}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActiveOption(option)}
            className={clsx('calculator-table__options-item', {
              'calculator-table__options-item--active': activeOption === option,
            })}
          >
            {option}
          </button>
        ))}
      </div>
      <CurrencySwitch value={currency} onChange={onChangeCurrency} />
      <Input
        className={'calculator-table__search'}
        placeholder={'Поиск по модели'}
        sizes={'sm'}
        icon={
          searchValue ? (
            <CloseIcon
              onClick={() => setSearchValue('')}
              className={styles.icon}
            />
          ) : (
            <SearchIcon className={styles.icon} />
          )
        }
      />
    </div>
  );
};
