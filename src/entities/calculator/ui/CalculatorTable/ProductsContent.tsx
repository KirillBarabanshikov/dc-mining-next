import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';

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
  addModel: (product: Product) => void;
}

export const ProductsContent: FC<IProductsContentProps> = ({
  isFetching,
  calculatorData,
  filters,
  models,
  addModel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [atStart, setAtStart] = useState(true);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const checkScroll = () => {
      if (!container) return;
      const { scrollWidth, clientWidth, scrollLeft } = container;
      setIsScrollable(scrollWidth > clientWidth);
      setAtStart(scrollLeft === 0);
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
    <div className={'calculator-table__content'} ref={ref}>
      <div className={'calculator-table__header-wrap'}>
        <CalculatorTableHeader
          variant={'product'}
          currency={filters.currency}
          scrollRight={scrollRight}
          atStart={atStart}
          isScrollable={isScrollable}
        />
      </div>
      <div
        className={clsx(
          'calculator-table__rows calculator-table__rows-products',
          { 'calculator-table--loading': isFetching },
        )}
      >
        {calculatorData.products.map((product) => {
          return (
            <CalculatorProductRow
              key={product.id}
              product={product}
              currency={filters.currency}
              models={models}
              addModel={addModel}
            />
          );
        })}
      </div>
    </div>
  );
};
