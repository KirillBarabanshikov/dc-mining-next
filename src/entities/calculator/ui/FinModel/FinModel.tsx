import './FinModel.scss';

import { FC, useMemo } from 'react';

import ArrowDownIcon from '@/shared/assets/icons/arrow-down2.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import { Button, Input } from '@/shared/ui';

import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Currency, Model } from '../../model/types';

interface IFinModelProps {
  models: Model[];
  currency: Currency;
}

export const FinModel: FC<IFinModelProps> = ({ models, currency }) => {
  const {
    countModels,
    kW,
    profitWithWatt,
    profitWithoutWatt,
    paybackWithWatt,
    paybackWithoutWatt,
    cost,
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
          currentValue.product.profitWithWatt * currentValue.count;
        const paybackWithoutWatt =
          previousValue.paybackWithoutWatt +
          currentValue.product.paybackPerMonth * currentValue.count;
        const cost =
          previousValue.cost + currentValue.product.price * currentValue.count;

        return {
          countModels,
          kW,
          profitWithWatt,
          profitWithoutWatt,
          paybackWithWatt,
          paybackWithoutWatt,
          cost,
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
        <button className={'fin-model__trigger'}>
          <ArrowDownIcon />
        </button>
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
                  {paybackWithoutWatt}
                </div>
              </div>
              <div className={'fin-model__item fin-model__item--row'}>
                <div className={'fin-model__item-title'}>с учетом э/э</div>
                <div
                  className={
                    'fin-model__item-value fin-model__item-value--light'
                  }
                >
                  {paybackWithWatt}
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
