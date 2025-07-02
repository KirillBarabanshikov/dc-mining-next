import './CurrencySwitch.scss';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC } from 'react';

import { Currency } from '../../model/types';

const currencies: { symbol: string; value: Currency }[] = [
  {
    symbol: '₽',
    value: 'rub',
  },
  {
    symbol: '$',
    value: 'dollar',
  },
];

interface ICurrencySwitchProps {
  value: string;
  onChange: (currency: Currency) => void;
  className?: string;
}

export const CurrencySwitch: FC<ICurrencySwitchProps> = ({
  value,
  onChange,
  className,
}) => {
  const handleOnChange = (newValue: Currency) => {
    if (newValue === value) {
      const alternative = currencies.find((c) => c.value !== newValue);
      if (alternative) {
        onChange(alternative.value);
      }
    } else {
      onChange(newValue);
    }
  };

  return (
    <motion.div
      className={clsx('currency-switch', className)}
      layout
      layoutRoot
    >
      {currencies.map((currency) => (
        <button
          key={currency.value}
          onClick={() => handleOnChange(currency.value)}
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
    </motion.div>
  );
};
