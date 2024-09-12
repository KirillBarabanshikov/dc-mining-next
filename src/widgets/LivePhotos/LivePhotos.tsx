'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BASE_URL } from '@/shared/consts';
import { SwiperButton } from '@/shared/ui';

import styles from './LivePhotos.module.scss';

interface ILivePhotosProps {
    images: string[];
    className?: string;
}

export const LivePhotos: FC<ILivePhotosProps> = ({ images, className }) => {
    if (!images.length) return <></>;

    return (
        <div className={clsx(styles.container, className)}>
            <Swiper slidesPerView={'auto'} spaceBetween={16} className={styles.slider}>
                <SwiperButton variant={'prev'} className={clsx(styles.swiperButton, styles.prev)} />
                {images.map((image, index) => {
                    return (
                        <SwiperSlide key={index} className={styles.slide}>
                            <div className={styles.photo}>
                                <img src={BASE_URL + image} alt={'Photo'} />
                            </div>
                        </SwiperSlide>
                    );
                })}
                <SwiperButton variant={'next'} className={clsx(styles.swiperButton, styles.next)} />
            </Swiper>
        </div>
    );
};
