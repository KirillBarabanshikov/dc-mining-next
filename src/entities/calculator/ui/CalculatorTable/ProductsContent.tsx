import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';

import Plus from '@/shared/assets/icons/plus.svg';
import { Button } from '@/shared/ui';

import {
  CalculatorData,
  Currency,
  Filter,
  Model,
  Product,
} from '../../model/types';
import { CalculatorProductRow } from './CalculatorProductRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

interface IProductsContentProps {
  filters: {
    currency: Currency;
    search: string;
    filter: Filter;
  };
  calculatorData: CalculatorData;
  isFetching?: boolean;
  models: Model[];
  productId?: number;
  addModel: (product: Product) => void;
  isBlock?: boolean;
  setIsBlock?: (isBlock: boolean) => void;
}

export const ProductsContent: FC<IProductsContentProps> = ({
  isFetching,
  calculatorData,
  filters,
  models,
  addModel,
  productId,
  isBlock,
  setIsBlock,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const checkScroll = () => {
      if (!container) return;
      const { scrollWidth, clientWidth, scrollLeft } = container;
      setIsScrollable(scrollWidth > clientWidth);
      setAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollRight = () => {
    ref.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div
      className={clsx('calculator-table__content', {
        'calculator-table__content__block': isBlock,
      })}
      ref={ref}
    >
      <div className={'calculator-table__header-wrap'}>
        <CalculatorTableHeader
          variant={'product'}
          currency={filters.currency}
          scrollRight={scrollRight}
          atEnd={atEnd}
          isScrollable={isScrollable}
        />
      </div>
      <div
        className={clsx(
          'calculator-table__rows calculator-table__rows-products',
          { 'calculator-table--loading': isFetching },
          { 'calculator-table--block': isBlock },
        )}
      >
        {calculatorData.products
          .slice()
          .sort((a, b) => {
            if (!productId) return 0;
            if (a.id === productId) return -1;
            if (b.id === productId) return 1;
            return 0;
          })
          .map((product) => (
            <CalculatorProductRow
              key={product.id}
              product={product}
              currency={filters.currency}
              models={models}
              addModel={addModel}
              className={clsx({
                'calculator-table__product-row--block':
                  isBlock && product.id !== productId,
              })}
            />
          ))}

        {isBlock && (
          <Button
            theme={'white'}
            size={'md'}
            onClick={() => setIsBlock?.(false)}
            className={'calculator-table--block-button'}
          >
            Добавить модель
            <Plus />
          </Button>
        )}
      </div>
    </div>
  );
};
