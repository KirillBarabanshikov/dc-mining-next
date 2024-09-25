'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { getCategories } from '@/entities/category';
import { getSlider } from '@/entities/mainSlider';
import { getAboutInfo } from '@/entities/pageInfo';
import { getProducts } from '@/entities/product';
import Background from '@/shared/assets/backgrounds/main-bg.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Bestsellers, MainBanner, MainBannersList, Managers, Offers } from '@/widgets';
import { NewsList } from '@/widgets/NewsList';

import styles from './MainPage.module.scss';

export const MainPage = () => {
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const router = useRouter();

    const { data: products } = useSuspenseQuery({
        queryKey: ['products'],
        queryFn: () => getProducts({ display: true }),
    });
    const { data: categories } = useSuspenseQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
    const { data: slides } = useQuery({
        queryKey: ['slider'],
        queryFn: getSlider,
        staleTime: Infinity,
    });
    const { data: info } = useQuery({
        queryKey: ['about'],
        queryFn: getAboutInfo,
        staleTime: Infinity,
    });

    return (
        <>
            <MainBanner categories={categories} slides={slides} />
            <div className={clsx(styles.sections, 'sections')}>
                <MainBannersList />
                {categories && <Offers categories={categories} />}
                <div className={styles.bestsellersWrapper}>
                    {products && <Bestsellers products={products} />}
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
                    <NewsList display={true} massMedia={info?.massMedia} />
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
