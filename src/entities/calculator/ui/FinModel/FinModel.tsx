import './FinModel.scss';

import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useMemo, useState } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow-down2.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import { BASE_URL } from '@/shared/consts';
import { useOutsideClick } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import { generateFinModelPdf } from '../../api/calculatorApi';
import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Coin, Currency, Model } from '../../model/types';

interface IFinModelProps {
  models: Model[];
  currency: Currency;
  dollar: number;
  electricityCoast: number;
  onChangeElectricityCoast: (value: number) => void;
}

const DAYS_IN_MONTH = 30;

export const FinModel: FC<IFinModelProps> = ({
  models,
  currency,
  dollar,
  electricityCoast,
  onChangeElectricityCoast,
}) => {
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

        const cost =
          previousValue.cost + currentValue.product.price * currentValue.count;

        const paybackWithWatt = cost / (profitWithWatt * DAYS_IN_MONTH);

        const paybackWithoutWatt = cost / (profitWithoutWatt * DAYS_IN_MONTH);

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

  const { mutateAsync: generatePdf, isPending } = useMutation({
    mutationFn: generateFinModelPdf,
  });

  const handleDownload = async () => {
    const result = await generatePdf({
      curs: dollar.toFixed(1),
      everyMonthWatt: kW.toString(),
      profitWithMonth: profitWithoutWatt.toString(),
      profitWithoutWatt: profitWithoutWatt.toString(),
      sumDollar:
        currency === 'dollar' ? cost.toString() : (cost * dollar).toString(),
      sumIn: currency === 'rub' ? cost.toString() : (cost / dollar).toString(),
      sumRuble:
        currency === 'rub' ? cost.toString() : (cost / dollar).toString(),
      type: 'По моделям',
      asics: models.map((model) => ({
        id: model.product.id,
        title: model.product.title,
        hashrate: model.product.hashrate.toString(),
        quantity: model.count,
        priceOnePiece: model.product.price.toString(),
        price: (model.product.price * model.count).toString(),
      })),
    });

    if (result) {
      const blob = new Blob([result.file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'фин_модель.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

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
      <div className={'fin-model__column-wrap fin-model__column-cost'}>
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
              value={electricityCoast}
              onChange={(e) => onChangeElectricityCoast(+e.target.value)}
              type={'number'}
              sizes={'md'}
              className={'fin-model__cost-input'}
            />
          </div>
          <Button
            onClick={handleDownload}
            disabled={isPending}
            className={'fin-model__download'}
          >
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
