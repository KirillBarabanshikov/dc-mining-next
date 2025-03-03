import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { IMassMedia } from '@/entities/pageInfo/model';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { formatDate, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './NewsCard.module.scss';

interface INewsCardProps {
  media: IMassMedia;
  className?: string;
}

export const NewsCard: FC<INewsCardProps> = ({ media, className }) => {
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const router = useRouter();

  const currentLink = media.link ? media.link : `/news/${media.slug}`;

  return (
    <article
      className={clsx(styles.newsCard, className)}
      onClick={() => router.push(currentLink)}
    >
      <Image
        src={BASE_URL + media.image}
        alt={media.title}
        width={488}
        height={240}
      />
      <div className={styles.cardBody}>
        <time dateTime={media.dateAt}>{formatDate(media.dateAt)}</time>
        <h5 className={styles.title}>{media.title}</h5>
        <div
          className={styles.subtitle}
          dangerouslySetInnerHTML={{ __html: media.description }}
        />
        <Button size={matches ? 'md' : 'lg'} className={styles.button}>
          Подробнее
        </Button>
      </div>
    </article>
  );
};
