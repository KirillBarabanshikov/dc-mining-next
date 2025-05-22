import clsx from 'clsx';
import React, { useState } from 'react';

import { CurrencySwitch } from '@/entities/calculator/ui/ui';
import styles from '@/features/search/ui/Search/Search.module.scss';
import CloseIcon from '@/shared/assets/icons/close.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Input } from '@/shared/ui';

const options = [
  'Все',
  'Самые прибыльные',
  'Быстрая окупаемость без учета э/э',
  'Лучший выбор',
];

export const CalculatorFilters = () => {
  const [activeOption, setActiveOption] = useState(options[0]);
  const [currency, setCurrency] = useState('RU');
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
      <CurrencySwitch value={currency} onChange={setCurrency} />
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
