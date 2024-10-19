'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { getCategories } from '@/entities/category';
import { getSlider } from '@/entities/mainSlider';
import { getMassMedia } from '@/entities/pageInfo';
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
    const { data: news } = useQuery({
        queryKey: ['news'],
        queryFn: getMassMedia,
    });

    return (
        <>
            <div itemScope itemType='https://schema.org/WebSite'>
                <meta itemProp='name' content='DC-MINING' />
                <meta itemProp='url' content='https://dc-mining.ru/' />
                <meta
                    itemProp='description'
                    content='Современное оборудование для майнинга криптовалют. Актуальные цены 2024 года, доставка по всей России. Широкий выбор ASIC и комплектующих для майнинга. Купите оборудование для майнинга выгодно!'
                />

                <div itemScope itemType='https://schema.org/Organization'>
                    <meta itemProp='name' content='DC-MINING' />
                    <meta itemProp='url' content='https://dc-mining.ru/' />
                    <meta itemProp='logo' content='https://dc-mining.ru/apple-touch-icon.png' />
                    <meta itemProp='sameAs' content='https://t.me/dcmining_1' />
                    <meta
                        itemProp='sameAs'
                        content='https://api.whatsapp.com/send/?phone=79858963003&text&type=phone_number&app_absent=0'
                    />
                    <meta itemProp='contactPoint' content='+74955131211' />
                    <meta itemProp='email' content='info@dc-mining.ru' />
                    <meta itemProp='address' content='г. Москва, ул. Николоямская д.40/22с4' />
                </div>
            </div>
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
                    {news && <NewsList display={true} massMedia={news} />}
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
