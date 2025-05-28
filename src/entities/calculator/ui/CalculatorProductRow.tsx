import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow-down2.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import { BASE_URL } from '@/shared/consts';

import { formatPriceByCurrency } from '../lib/formatPriceByCurrency';
import { Coin, Currency, Product } from '../model/types';

interface ICalculatorProductRowProps {
  product: Product;
  currency: Currency;
}

export const CalculatorProductRow: FC<ICalculatorProductRowProps> = ({
  product,
  currency,
}) => {
  return (
    <div className={'calculator-table__product-row'}>
      <div className={'calculator-table__product-row-cell'}>
        <div className={'calculator-table__product-row-title'}>
          {product.title}
        </div>
        <div className={'calculator-table__product-row-info'}>
          <div>
            <div className={'calculator-table__product-row-key'}>Алгоритм</div>
            <div className={'calculator-table__product-row-value'}>
              <>{product.algorithm}</>
            </div>
          </div>
          <div>
            <div className={'calculator-table__product-row-key'}>
              Потребление, Вт.
            </div>
            <div className={'calculator-table__product-row-value'}>
              {product.watt}
            </div>
          </div>
        </div>
      </div>
      <div className={'calculator-table__product-row-value'}>
        {product.hashrate}
      </div>
      <div className={'calculator-table__product-row-value'}>
        {formatPriceByCurrency(product.price, currency)}
      </div>
      <CalculatorProductCoins coins={product.coinsArray} currency={currency} />
      <div className={'calculator-table__product-row-values'}>
        <div className={'calculator-table__product-row-value'}>
          {formatPriceByCurrency(product.profitDayAll, currency)}
        </div>
        <div className={'calculator-table__product-row-value'}>
          {formatPriceByCurrency(product.paybackWithWatt, currency)}
        </div>
        <div className={'calculator-table__product-row-value'}>
          {product.paybackPerMonth}
        </div>
        <div className={'calculator-table__product-row-value'}>
          {product.profitWithWatt}
        </div>
      </div>
      <button className={'calculator-table__product-row-button'}>
        <PlusIcon />
      </button>
    </div>
  );
};

interface ICalculatorProductCoinsProps {
  coins: Coin[];
  currency: Currency;
}

const CalculatorProductCoins: FC<ICalculatorProductCoinsProps> = ({
  coins,
  currency,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCoins = isExpanded ? coins : coins.slice(0, 2);
  const hiddenCoins = coins.slice(2);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className='calculator-table__coins'>
      {visibleCoins.map((coin, index) => (
        <div key={index} className='calculator-table__coin'>
          <div className='calculator-table__coin-wrap'>
            {coin.image && (
              <Image
                src={`${BASE_URL}${coin.image}`}
                alt={coin.title}
                width={20}
                height={20}
                className='calculator-table__coin-image'
              />
            )}
            <div className='calculator-table__coin-title'>{coin.title}</div>
          </div>
          <div className='calculator-table__coin-value'>
            {coin.value.toFixed(9)}
          </div>
          <div className='calculator-table__coin-value'>
            {formatPriceByCurrency(coin.profit, currency)}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {isExpanded &&
          hiddenCoins.map((coin) => (
            <motion.div
              key={coin.title}
              className='calculator-table__coin'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className='calculator-table__coin-wrap'>
                {coin.image && (
                  <Image
                    src={`${BASE_URL}${coin.image}`}
                    alt={coin.title}
                    width={20}
                    height={20}
                    className='calculator-table__coin-image'
                  />
                )}
                <div className='calculator-table__coin-title'>{coin.title}</div>
              </div>
              <div className='calculator-table__coin-value'>
                {coin.value.toFixed(9)}
              </div>
              <div className='calculator-table__coin-value'>
                {formatPriceByCurrency(coin.profit, currency)}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {coins.length > 2 && (
        <button
          onClick={toggleExpanded}
          className='calculator-table__coins-button'
        >
          <motion.div
            animate={{ rotate: isExpanded ? '180deg' : 0 }}
            transition={{ duration: 0.3 }}
            className={'calculator-table__coins-button-icon'}
          >
            <ArrowDownIcon />
          </motion.div>
        </button>
      )}
    </div>
  );
};
