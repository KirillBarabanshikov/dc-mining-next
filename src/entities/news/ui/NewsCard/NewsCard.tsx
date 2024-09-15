import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import { IMassMedia } from '@/entities/pageInfo/model';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { createSlug, formatDate, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './NewsCard.module.scss';

interface INewsCardProps {
    media: IMassMedia;
    className?: string;
}

export const NewsCard: FC<INewsCardProps> = ({ media, className }) => {
    const matches = useMediaQuery(MAX_WIDTH_MD);

    const currentLink = media.link ? media.link : `/news/${media.id}/${createSlug(media.title)}`;

    return (
        <article className={clsx(styles.newsCard, className)}>
            <img src={BASE_URL + media.image} alt={media.title} />
            <div className={styles.cardBody}>
                <time dateTime={media.dateAt}>{formatDate(media.dateAt)}</time>
                <h5 className={styles.title}>{media.title}</h5>
                <div className={styles.subtitle} dangerouslySetInnerHTML={{ __html: media.description }} />
                <Link href={currentLink} target={media.link ? '_blank' : ''}>
                    <Button size={matches ? 'md' : 'lg'} className={styles.button}>
                        Подробнее
                    </Button>
                </Link>
            </div>
        </article>
    );
};
