'use client';

import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import {
  compareProducts,
  IProduct,
  ProductCompareCard,
  useCompareStore,
} from '@/entities/product';
import { Switch } from '@/shared/ui';

import styles from './CompareList.module.scss';

export const CompareList = () => {
  const [isOn, setIsOn] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [compareList, setCompareList] = useState<
    {
      category: string;
      count: number;
      products: IProduct[];
    }[]
  >([]);
  const { compare } = useCompareStore();
  const { mutateAsync: compareMutate } = useMutation({
    mutationFn: compareProducts,
  });

  useEffect(() => {
    setProducts();
  }, [compare]);

  const setProducts = async () => {
    if (compare.length) {
      await compareMutate(compare).then((data) =>
        setCompareList(data ? data : []),
      );
    } else {
      setCompareList([]);
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <span>Только отличия</span>
        <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} />
      </div>
      {!!compareList.length && (
        <div className={clsx(styles.container, 'container')}>
          <div className={styles.tabs}>
            {compareList.map((item, index) => {
              return (
                <div
                  key={item.category}
                  className={clsx(
                    styles.tab,
                    activeTab === index && styles.active,
                  )}
                  onClick={() => setActiveTab(index)}
                >
                  {item.category} {item.count}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <ScrollContainer className={styles.list} nativeMobileScroll>
        {compareList[activeTab]?.products.map((product) => {
          return (
            <ProductCompareCard
              key={product.id}
              product={product}
              onlyDifference={isOn}
            />
          );
        })}
      </ScrollContainer>
    </>
  );
};
