import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { getProductById } from '@/entities/product';

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
  const router = useRouter();

  const { refetch, isLoading } = useQuery({
    queryKey: ['calculator-product', product.id],
    queryFn: () => getProductById(product.id),
    enabled: false,
  });

  const handleClickOnProduct = async () => {
    const { data } = await refetch();
    if (data) {
      router.push(`/product/${data.slug}`);
    }
  };

  return (
    <div className={clsx('calculator-table__product-row', className)}>
      <div className={'calculator-table__product-row-cell'}>
        <div
          onClick={handleClickOnProduct}
          className={'calculator-table__product-row-title'}
          style={{ pointerEvents: isLoading ? 'none' : 'initial' }}
        >
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
          {models.find((model) => model.product.id === product.id)
            ? 'Добавлено'
            : 'Добавить'}
        </button>
      </div>
    </div>
  );
};
