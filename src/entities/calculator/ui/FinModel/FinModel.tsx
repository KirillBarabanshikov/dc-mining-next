import './FinModel.scss';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow-down2.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import { BASE_URL } from '@/shared/consts';
import { useOutsideClick } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Coin, Currency, Model } from '../../model/types';

interface IFinModelProps {
  models: Model[];
  currency: Currency;
}

const DAYS_IN_MONTH = 30;

export const FinModel: FC<IFinModelProps> = ({ models, currency }) => {
  const [showCoins, setShowCoins] = useState(false);

  const {
    countModels,
    kW,
    profitWithWatt,
    profitWithoutWatt,
    paybackWithWatt,
    paybackWithoutWatt,
    cost,
    coins,
  } = useMemo(() => {
    return models.reduce(
      (previousValue, currentValue) => {
        const countModels = previousValue.countModels + currentValue.count;
        const kW =
          previousValue.kW +
          (currentValue.product.watt * currentValue.count) / 1000;
        const profitWithWatt =
          previousValue.profitWithWatt +
          currentValue.product.paybackWithWatt * currentValue.count;
        const profitWithoutWatt =
          previousValue.profitWithoutWatt +
          currentValue.product.profitDayAll * currentValue.count;
        const paybackWithWatt =
          previousValue.paybackWithWatt +
          (currentValue.product.price * currentValue.count) /
            profitWithWatt /
            DAYS_IN_MONTH;
        const paybackWithoutWatt =
          previousValue.paybackWithoutWatt +
          (currentValue.product.price * currentValue.count) /
            profitWithoutWatt /
            DAYS_IN_MONTH;
        const cost =
          previousValue.cost + currentValue.product.price * currentValue.count;

        const newCoins = [...previousValue.coins];
        currentValue.product.coinsArray.forEach((coin) => {
          const existing = newCoins.find((c) => c.title === coin.title);
          const multipliedCoin = {
            ...coin,
            value: coin.value * currentValue.count,
            profit: coin.profit * currentValue.count,
          };

          if (existing) {
            existing.value += multipliedCoin.value;
            existing.profit += multipliedCoin.profit;
          } else {
            newCoins.push(multipliedCoin);
          }
        });

        return {
          countModels,
          kW,
          profitWithWatt,
          profitWithoutWatt,
          paybackWithWatt,
          paybackWithoutWatt,
          cost,
          coins: newCoins,
        };
      },
      {
        countModels: 0,
        kW: 0,
        profitWithWatt: 0,
        profitWithoutWatt: 0,
        paybackWithWatt: 0,
        paybackWithoutWatt: 0,
        cost: 0,
        coins: [] as Coin[],
      },
    );
  }, [models]);

  return (
    <div className={'fin-model'}>
      <div className={'fin-model__card fin-model__card--base'}>
        <div>Общее потребление, кВт.</div>
        <p>{kW.toFixed(1)}</p>
      </div>
      <div className={'fin-model__card fin-model__card--base'}>
        <div>
          Кол-во
          <br />
          устройств, шт.
        </div>
        <p>{countModels}</p>
      </div>
      <div className={'fin-model__column-wrap fin-model__max'}>
        <div className={'fin-model__card'}>
          <div className={'fin-model__card-label'}>
            Доход, {currency === 'rub' ? 'руб.' : 'долл.'}
          </div>
          <div className={'fin-model__row-wrap'}>
            <div className={'fin-model__item fin-model__item--column'}>
              <div className={'fin-model__item-title'}>с учетом э/э</div>
              <div
                className={'fin-model__item-value fin-model__item-value--dark'}
              >
                {formatPriceByCurrency(profitWithWatt, currency)}
              </div>
            </div>
            <div className={'fin-model__item fin-model__item--column'}>
              <div className={'fin-model__item-title'}>без учета э/э</div>
              <div
                className={'fin-model__item-value fin-model__item-value--light'}
              >
                {formatPriceByCurrency(profitWithoutWatt, currency)}
              </div>
            </div>
          </div>
        </div>
        <div className={'fin-model__coins-wrap'}>
          <button
            onClick={() => setShowCoins((prev) => !prev)}
            className={'fin-model__trigger'}
          >
            <ArrowDownIcon />
          </button>
          <Coins
            coins={coins}
            show={showCoins}
            onClose={() => setShowCoins(false)}
            currency={currency}
          />
        </div>
      </div>
      <div className={'fin-model__column-wrap'}>
        <div className={'fin-model__card fin-model__row-wrap'}>
          <div className={'fin-model__flex'}>
            <div className={'fin-model__card-label'}>Окупаемость, мес.</div>
            <div className={'fin-model__row-wrap'}>
              <div className={'fin-model__item fin-model__item--row'}>
                <div className={'fin-model__item-title'}>без учета э/э</div>
                <div
                  className={
                    'fin-model__item-value fin-model__item-value--light'
                  }
                >
                  {Math.round(paybackWithoutWatt)}
                </div>
              </div>
              <div className={'fin-model__item fin-model__item--row'}>
                <div className={'fin-model__item-title'}>с учетом э/э</div>
                <div
                  className={
                    'fin-model__item-value fin-model__item-value--light'
                  }
                >
                  {Math.round(paybackWithWatt)}
                </div>
              </div>
            </div>
          </div>
          <div className={'fin-model__price-wrap'}>
            <div>Общая стоимость, {currency === 'rub' ? 'руб.' : 'долл.'}</div>
            <p>{formatPriceByCurrency(cost, currency)}</p>
          </div>
        </div>
        <div className={'fin-model__row-wrap'}>
          <div className={'fin-model__card fin-model__cost'}>
            <div className={'fin-model__cost-label'}>Стоимость э/э, ₽</div>
            <Input
              value={'5,5 ₽'}
              readOnly
              disabled
              sizes={'md'}
              className={'fin-model__cost-input'}
            />
          </div>
          <Button className={'fin-model__download'}>
            Скачать фин модель <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Coins: FC<{
  coins: Coin[];
  show: boolean;
  onClose: () => void;
  currency: Currency;
}> = ({ coins, show, onClose, currency }) => {
  const containerRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={containerRef}
          className={'fin-model__coins'}
        >
          <div className={'fin-model__coins-list'}>
            {coins.map((coin, index) => (
              <div key={index} className={'fin-model__coins-item'}>
                <div className={'fin-model__coins-wrap'}>
                  {coin.image && (
                    <Image
                      src={`${BASE_URL}${coin.image}`}
                      alt={coin.title}
                      width={20}
                      height={20}
                      className={'fin-model__coins-image'}
                    />
                  )}
                  <div className={'fin-model__coins-title'}>{coin.title}</div>
                </div>
                <div className={'fin-model__coins-value'}>
                  {coin.value.toFixed(9)}
                </div>
                <div
                  className={'fin-model__coins-value fin-model__coins-profit'}
                >
                  {formatPriceByCurrency(coin.profit, currency)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
