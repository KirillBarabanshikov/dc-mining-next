'use client';

import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRecentStore } from '@/entities/product/model';
import { RecentProductCard } from '@/entities/product/ui';
import { useStore } from '@/shared/lib';
import { SwiperButton } from '@/shared/ui';

import styles from './RecentProductsList.module.scss';

export const RecentProductsList = () => {
    const store = useStore(useRecentStore, (state) => state);
    const recentLength = store?.recent.length ?? 0;

    if (!recentLength) return <></>;

    return (
        <section className={styles.recent}>
            <div className={'container scrollable'}>
                <h2 className={'section-title-primary'}>Вы недавно смотрели</h2>
                <Swiper
                    slidesPerView={'auto'}
                    breakpoints={{ 0: { spaceBetween: 10 }, 769: { spaceBetween: 32 } }}
                    className={styles.list}
                >
                    {recentLength >= 4 && (
                        <SwiperButton variant={'prev'} className={clsx(styles.swiperButton, styles.prev)} />
                    )}
                    {store?.recent.map((product) => {
                        return (
                            <SwiperSlide key={product.id} className={styles.slide}>
                                <RecentProductCard product={product} />
                            </SwiperSlide>
                        );
                    })}
                    {recentLength >= 4 && (
                        <SwiperButton variant={'next'} className={clsx(styles.swiperButton, styles.next)} />
                    )}
                </Swiper>
            </div>
        </section>
    );
};
