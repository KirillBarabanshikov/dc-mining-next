import clsx from 'clsx';
import { FC } from 'react';

import PlusIcon from '@/shared/assets/icons/plus.svg';

import { formatPriceByCurrency } from '../../lib/formatPriceByCurrency';
import { Currency, Model, Product } from '../../model/types';
import { CoinsList } from '../CoinsList';

interface ICalculatorProductRowProps {
  product: Product;
  currency: Currency;
  models: Model[];
  addModel: (product: Product) => void;
  className?: string;
}

export const CalculatorProductRow: FC<ICalculatorProductRowProps> = ({
  product,
  currency,
  models,
  addModel,
  className,
}) => {
  return (
    <div className={clsx('calculator-table__product-row', className)}>
      <div className={'calculator-table__product-row-cell'}>
        <div className={'calculator-table__product-row-title'}>
          {product.title}
        </div>
        <div className={'calculator-table__product-row-info'}>
          <div className={'calculator-table__product-row-info-wrap'}>
            <div className={'calculator-table__product-row-key'}>Алгоритм</div>
            <div className={'calculator-table__product-row-value'}>
              {product.algorithm}
            </div>
          </div>
          <div className={'calculator-table__product-row-info-wrap'}>
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
      <CoinsList coins={product.coinsArray} currency={currency} />
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
      <div className={'calculator-table__product-row-button-wrap'}>
        <button
          disabled={!!models.find((model) => model.product.id === product.id)}
          onClick={() => addModel(product)}
          className={'calculator-table__product-row-button'}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};
