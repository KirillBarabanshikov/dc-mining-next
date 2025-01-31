'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getProductsByIds } from '@/entities/product';
import { useRecentStore } from '@/entities/product/model';
import { RecentProductCard } from '@/entities/product/ui';
import { SwiperButton } from '@/shared/ui';

import styles from './RecentProductsList.module.scss';

interface IRecentProductsListProps {
  withContainer?: boolean;
}

export const RecentProductsList: FC<IRecentProductsListProps> = ({
  withContainer = true,
}) => {
  const { recent } = useRecentStore();

  const { data: products } = useQuery({
    queryKey: ['recent', recent],
    queryFn: () => getProductsByIds(recent),
    placeholderData: keepPreviousData,
    enabled: !!recent.length,
  });

  if (!products) return <></>;

  return (
    <section
      className={clsx(styles.recent, withContainer && styles.withContainer)}
    >
      <div className={clsx(withContainer && 'container scrollable')}>
        <h2 className={'section-title-primary'}>Вы недавно смотрели</h2>
        <Swiper
          slidesPerView={'auto'}
          breakpoints={{ 0: { spaceBetween: 10 }, 769: { spaceBetween: 32 } }}
          className={styles.list}
        >
          {recent.length >= 4 && (
            <SwiperButton
              variant={'prev'}
              className={clsx(styles.swiperButton, styles.prev)}
            />
          )}
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id} className={styles.slide}>
                <RecentProductCard product={product} />
              </SwiperSlide>
            );
          })}
          {recent.length >= 4 && (
            <SwiperButton
              variant={'next'}
              className={clsx(styles.swiperButton, styles.next)}
            />
          )}
        </Swiper>
      </div>
    </section>
  );
};
