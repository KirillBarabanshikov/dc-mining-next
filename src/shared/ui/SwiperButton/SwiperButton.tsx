'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { useSwiper } from 'swiper/react';

import Arrow from '@/shared/assets/icons/arrow-down2.svg';

import styles from './SwiperButton.module.scss';

interface ISwiperButtonProps {
    variant: 'next' | 'prev';
    disabled?: boolean;
    className?: string;
}

export const SwiperButton: FC<ISwiperButtonProps> = ({ variant, disabled, className }) => {
    const swiper = useSwiper();

    const handleClick = () => {
        variant === 'next' ? swiper.slideNext() : swiper.slidePrev();
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={clsx(styles.swiperButton, styles[variant], className)}
        >
            <Arrow />
        </button>
    );
};
