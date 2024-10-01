'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NewsCard } from '@/entities/news';
import { getAboutInfo } from '@/entities/pageInfo';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { AdvantagesDCMining, LogoAnimationBanner } from '@/widgets';

import styles from './AboutPage.module.scss';

const AboutPage = () => {
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const router = useRouter();

    const { data: info } = useSuspenseQuery({
        queryKey: ['about'],
        queryFn: getAboutInfo,
        staleTime: Infinity,
    });

    return (
        <>
            <LogoAnimationBanner />
            <div className={'sections'}>
                <section className={styles.about}>
                    <div className={clsx(styles.abouts, 'container')}>
                        {info &&
                            info.main
                                .sort((a, b) => a.id - b.id)
                                .map((element) => {
                                    return (
                                        <div key={element.id} className={styles.wrap}>
                                            <div className={styles.image}>
                                                <Image
                                                    src={BASE_URL + element.image}
                                                    alt={element.title}
                                                    width={500}
                                                    height={300}
                                                />
                                            </div>
                                            <div className={styles.description}>
                                                <h2 className={'section-title-primary'}>{element.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: element.description }} />
                                            </div>
                                        </div>
                                    );
                                })}
                    </div>
                </section>
                <AdvantagesDCMining advantages={info?.advantages} />
                <section className={styles.news}>
                    <div className={'container'}>
                        <div className={styles.newsTitle}>
                            <h2 className={'section-title-primary'}>СМИ о нас</h2>
                            {!matches && <Button onClick={() => router.push('/news')}>Больше новостей</Button>}
                        </div>
                        <div className={styles.wrap}>
                            {info &&
                                info.massMedia
                                    .filter((media) => media.display)
                                    .map((media) => {
                                        return <NewsCard key={media.id} media={media} />;
                                    })}
                        </div>
                        {matches && (
                            <Button size={'md'} isWide onClick={() => router.push('/news')} className={styles.button}>
                                Больше новостей
                            </Button>
                        )}
                    </div>
                </section>
                <section className={styles.partners}>
                    <div className={'container scrollable'}>
                        <h2 className={clsx(styles.title, 'section-title-primary')}>Партнеры</h2>

                        <Swiper slidesPerView={'auto'} spaceBetween={32} className={styles.partnersList}>
                            {info &&
                                info.partners.map((partner) => {
                                    return (
                                        <SwiperSlide key={partner.id} className={styles.slide}>
                                            <div className={styles.partner}>
                                                <Image
                                                    src={BASE_URL + partner.image}
                                                    alt={'image'}
                                                    width={280}
                                                    height={100}
                                                    className={styles.image}
                                                />
                                                <Image
                                                    src={BASE_URL + partner.preview}
                                                    alt={'preview'}
                                                    width={280}
                                                    height={100}
                                                    className={styles.preview}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                        </Swiper>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AboutPage;
