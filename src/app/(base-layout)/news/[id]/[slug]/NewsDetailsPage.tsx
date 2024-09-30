'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC } from 'react';

import { getMassMediaById } from '@/entities/pageInfo';
import { BASE_URL } from '@/shared/consts';
import { Breadcrumbs } from '@/shared/ui';

import styles from './NewsDetailsPage.module.scss';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'СМИ о нас', path: '/news' },
];

const NewsDetailsPage: FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: massMedia } = useSuspenseQuery({
        queryKey: ['news', id],
        queryFn: () => getMassMediaById(id),
        staleTime: Infinity,
    });

    if (!massMedia) return <></>;

    return (
        <div className={styles.newsPage}>
            <div className={'container'}>
                <Breadcrumbs paths={[...paths, { name: massMedia.title }]} />
            </div>
            <section>
                <div className={clsx(styles.container, 'container')}>
                    <h1 className={styles.title}>{massMedia.title}</h1>
                    <Image
                        src={BASE_URL + massMedia.image}
                        alt={massMedia.title}
                        width={904}
                        height={508}
                        className={styles.image}
                    />
                    <div dangerouslySetInnerHTML={{ __html: massMedia.description }} className={styles.description} />
                </div>
            </section>
        </div>
    );
};

export default NewsDetailsPage;
