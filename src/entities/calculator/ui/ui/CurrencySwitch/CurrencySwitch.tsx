import './CurrencySwitch.scss';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

const currencies = [
  {
    symbol: '₽',
    value: 'RU',
  },
  {
    symbol: '$',
    value: 'EN',
  },
];

interface ICurrencySwitchProps {
  value: string;
  onChange: (currency: string) => void;
}

export const CurrencySwitch: FC<ICurrencySwitchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={'currency-switch'}>
      {currencies.map((currency) => (
        <button
          key={currency.value}
          onClick={() => onChange(currency.value)}
          className={clsx('currency-switch__item', {
            'currency-switch__item--active': value === currency.value,
          })}
        >
          <span className='currency-switch__item-title'>{currency.symbol}</span>
          {value === currency.value && (
            <motion.span
              layoutId='bubble'
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6,
              }}
              className='currency-switch__handle'
            />
          )}
        </button>
      ))}
    </div>
  );
};
