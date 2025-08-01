import './CoinsList.scss';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';

import { formatPriceByCurrency } from '@/entities/calculator/lib/formatPriceByCurrency';
import { Coin, Currency } from '@/entities/calculator/model/types';
import ArrowDownIcon from '@/shared/assets/icons/arrow-down2.svg';
import { BASE_URL } from '@/shared/consts';

interface ICoinsListProps {
  coins: Coin[];
  currency: Currency;
}

export const CoinsList: FC<ICoinsListProps> = ({ coins, currency }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleCoins = coins.slice(0, 2);
  const hiddenCoins = coins.slice(2);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className={'coins-list'}>
      <div className={'coins-list__items'}>
        {visibleCoins.map((coin, index) => (
          <div key={index} className='coins-list__coin'>
            <div className='coins-list__coin-wrap'>
              {coin.image ? (
                <Image
                  src={`${BASE_URL}${coin.image}`}
                  alt={coin.title}
                  width={20}
                  height={20}
                  className={'coins-list__coin-image'}
                />
              ) : (
                <div className={'coins-list__coin-image'} />
              )}
              <div className='coins-list__coin-title'>{coin.title}</div>
            </div>
            <div className='coins-list__coin-value'>
              {(coin.value * 30).toFixed(9)}
            </div>
            <div className='coins-list__coin-value'>
              {formatPriceByCurrency(coin.profit, currency)}
            </div>
          </div>
        ))}

        <AnimatePresence>
          {isExpanded &&
            hiddenCoins.map((coin) => (
              <motion.div
                key={coin.title}
                className={'coins-list__coin'}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={'coins-list__coin-wrap'}>
                  {coin.image ? (
                    <Image
                      src={`${BASE_URL}${coin.image}`}
                      alt={coin.title}
                      width={20}
                      height={20}
                      className={'coins-list__coin-image'}
                    />
                  ) : (
                    <div className={'coins-list__coin-image'} />
                  )}
                  <div className={'coins-list__coin-title'}>{coin.title}</div>
                </div>
                <div className={'coins-list__coin-value'}>
                  {coin.value.toFixed(9)}
                </div>
                <div className={'coins-list__coin-value'}>
                  {formatPriceByCurrency(coin.profit, currency)}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {coins.length > 2 && (
        <button onClick={toggleExpanded} className={'coins-list-button'}>
          <motion.div
            animate={{ rotate: isExpanded ? '180deg' : 0 }}
            transition={{ duration: 0.3 }}
            className={'coins-list-button-icon'}
          >
            <ArrowDownIcon />
          </motion.div>
        </button>
      )}
    </div>
  );
};
