'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { ISlide } from '@/entities/mainSlider';
import { IMassMedia } from '@/entities/pageInfo';
import { IProduct } from '@/entities/product';
import Background from '@/shared/assets/backgrounds/main-bg.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Bestsellers, MainBanner, MainBannersList, Offers } from '@/widgets';
import { Managers } from '@/widgets/Managers';
import { NewsList } from '@/widgets/NewsList';

import styles from './MainPage.module.scss';

interface IMainPageProps {
    categories: ICategory[];
    products: IProduct[];
    slides: ISlide[];
    massMedia?: IMassMedia[];
}

export const MainPage: FC<IMainPageProps> = ({ categories, products, slides, massMedia }) => {
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const router = useRouter();

    return (
        <>
            <MainBanner categories={categories} slides={slides} />
            <div className={clsx(styles.sections, 'sections')}>
                <MainBannersList />
                <Offers categories={categories} />
                <div className={styles.bestsellersWrapper}>
                    <Bestsellers products={products} />
                    <Background className={styles.backgroundIcon} />
                </div>
            </div>
            <div className={styles.managers}>
                <Managers />
            </div>
            <section className={styles.news}>
                <div className={'container'}>
                    <div className={styles.titleWrap}>
                        <h2 className={'section-title'}>Новости и статьи</h2>
                        {!matches && (
                            <Button variant={'outline'} onClick={() => router.push('/news')}>
                                Все новости
                            </Button>
                        )}
                    </div>
                    <NewsList display={true} massMedia={massMedia} />
                    {matches && (
                        <Button size={'md'} isWide onClick={() => router.push('/news')} className={styles.button}>
                            Все новости
                        </Button>
                    )}
                </div>
            </section>
        </>
    );
};
