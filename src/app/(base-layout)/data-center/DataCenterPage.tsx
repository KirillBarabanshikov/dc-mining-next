'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { getCategories } from '@/entities/category';
import { getDataCenterInfo } from '@/entities/pageInfo';
import { OrderCallBanner, OrderCallModal } from '@/features/call';
import dottedLine from '@/shared/assets/images/data-center/dotted-line.png';
import dottedLineMd from '@/shared/assets/images/data-center/dotted-line-md.png';
import dottedLineMd2 from '@/shared/assets/images/data-center/dotted-line-md2.png';
import dottedLineSm from '@/shared/assets/images/data-center/dotted-line-sm.png';
import dottedLineSm2 from '@/shared/assets/images/data-center/dotted-line-sm2.png';
import dottedLine2 from '@/shared/assets/images/data-center/dotted-line2.png';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { Advantages, LivePhotos } from '@/widgets';

import styles from './DataCenterPage.module.scss';

export const DataCenterPage: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const matchesMd = useMediaQuery('(max-width: 959px)');
    const matchesLg = useMediaQuery('(max-width: 1438px)');
    const router = useRouter();

    const { data: info } = useSuspenseQuery({
        queryKey: ['data-center'],
        queryFn: getDataCenterInfo,
        staleTime: Infinity,
    });
    const { refetch: refetchCategorites } = useQuery({
        queryKey: ['date-center-categories'],
        queryFn: getCategories,
        staleTime: Infinity,
        enabled: false,
    });

    const handleNavigate = () => {
        refetchCategorites().then((data) => {
            const category = data.data?.filter((category) => category.title === 'containersMining');
            if (category) router.push(`/catalog/${category[0].slug}`);
        });
    };

    const currentLine = matchesMd ? dottedLineSm : matchesLg ? dottedLineMd : dottedLine;
    const currentLine2 = matchesMd ? dottedLineSm2 : matchesLg ? dottedLineMd2 : dottedLine2;

    return (
        <>
            <section className={styles.dataCenterBanner}>
                <div className={clsx(styles.dataCenterContainer, 'container')}>
                    <h1 dangerouslySetInnerHTML={{ __html: info?.title ?? '' }} />
                    <div
                        className={clsx(styles.description, 'list')}
                        dangerouslySetInnerHTML={{ __html: info?.description ?? '' }}
                    />
                    <Button size={matches ? 'md' : 'lg'} isWide={matches} onClick={() => setIsOpen(true)}>
                        Разместить оборудование
                    </Button>
                </div>
                <div className={styles.background}></div>
            </section>
            <div className={clsx(styles.content, 'sections')}>
                {info && <Advantages advantages={info.top} />}
                <div className={styles.benefits}>
                    <div className={'container'}>
                        <div className={styles.wrap}>
                            {info &&
                                info.information.map((item) => {
                                    return (
                                        <div key={item.id} className={styles.item}>
                                            <p className={styles.title}>{item.title}</p>
                                            <div
                                                className={styles.subtitle}
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                {info && <LivePhotos images={info.images.map(({ image }) => image)} />}
                <section className={styles.howItWork}>
                    <div className={'container'}>
                        <h2 className={clsx(styles.title, 'section-title-primary')}>Как это работает</h2>
                        <div className={styles.wrap}>
                            {info &&
                                info.steps.map((item, index) => {
                                    return (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.number}>
                                                {index + 1}
                                                {index < 3 && (
                                                    <img
                                                        src={`${index === 1 ? currentLine2.src : currentLine.src}`}
                                                        alt={'Line'}
                                                        className={
                                                            index === 1 ? styles.dottedLineLarge : styles.dottedLine
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className={styles.description}
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
                <section className={styles.containers}>
                    <div className={'container'}>
                        <div className={styles.wrap}>
                            <div className={styles.containersContent}>
                                <h2 className={'section-title'}>{info?.containerTitle}</h2>
                                {matches && info && <img src={BASE_URL + info.containerImage} alt={'Container'} />}
                                {info && (
                                    <div
                                        className={styles.description}
                                        dangerouslySetInnerHTML={{ __html: info.containerDescription }}
                                    />
                                )}
                                <div className={styles.advantages}>
                                    <div className={styles.advantage}>
                                        <div>Срок производства от</div>
                                        <span>{info?.containerTerm}</span>
                                    </div>
                                    <div className={styles.advantage}>
                                        <div>Стоимость от</div>
                                        <span>{info && formatter.format(info.containerPrice)}</span>
                                    </div>
                                </div>
                                <div className={styles.advantage}>
                                    <div>Вместимость</div>
                                    <span>{info?.containerCapacity}</span>
                                </div>
                                <Button
                                    size={matches ? 'md' : 'lg'}
                                    isWide={matches}
                                    className={styles.button}
                                    onClick={handleNavigate}
                                >
                                    Выбрать контейнер
                                </Button>
                            </div>
                            {!matches && info && <img src={BASE_URL + info.containerImage} alt={'Container'} />}
                        </div>
                    </div>
                </section>
                <OrderCallBanner />
            </div>
            <OrderCallModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={'Заказать звонок'}
                subtitle={'Оставьте свои контакты и мы вам перезвоним'}
            />
        </>
    );
};
