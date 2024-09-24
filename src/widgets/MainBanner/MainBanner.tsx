import clsx from 'clsx';
import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { ISlide, MainSlider } from '@/entities/mainSlider';
import Background from '@/shared/assets/backgrounds/main-banner-bg.svg';

import styles from './MainBanner.module.scss';

interface IMainBannerProps {
    slides?: ISlide[];
    categories?: ICategory[];
}

export const MainBanner: FC<IMainBannerProps> = ({ slides, categories }) => {
    return (
        <>
            <div className={clsx(styles.banner, 'main-banner')}>
                <MainSlider slides={slides} categories={categories} />
                <div className='swiper-pagination'></div>
            </div>
            <Background className={styles.bg} />
        </>
    );
};
