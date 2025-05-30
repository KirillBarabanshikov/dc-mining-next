import './CalculatorTable.scss';

import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';

import { Currency, Filter, Model, Product } from '../../model/types';
import { CalculatorModelRow } from './CalculatorModelRow';
import { CalculatorTableHeader } from './CalculatorTableHeader';

interface IProductsContentProps {
  filters: {
    currency: Currency;
    search: string;
    filter: Filter;
  };
  isFetching?: boolean;
  models: Model[];
  removeModel: (product: Product) => void;
  setModelCount: (product: Product, count: number) => void;
}

export const ModelsContent: FC<IProductsContentProps> = ({
  filters,
  isFetching,
  models,
  removeModel,
  setModelCount,
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
    <div className={'calculator-table__content'}>
      <div className={'calculator-table__header-wrap'}>
        <CalculatorTableHeader
          variant={'model'}
          currency={filters.currency}
          scrollRight={scrollRight}
          atStart={atStart}
          isScrollable={isScrollable}
        />
      </div>

      <div
        className={clsx(
          'calculator-table__rows calculator-table__rows-models',
          { 'calculator-table--loading': isFetching },
        )}
      >
        {models.map((model) => {
          return (
            <CalculatorModelRow
              key={model.product.id}
              currency={filters.currency}
              model={model}
              removeModel={removeModel}
              setModelCount={setModelCount}
            />
          );
        })}
      </div>
    </div>
  );
};
