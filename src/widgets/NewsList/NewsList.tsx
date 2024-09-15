import { FC } from 'react';

import { NewsCard } from '@/entities/news';
import { IMassMedia } from '@/entities/pageInfo';

import styles from './NewsList.module.scss';

interface INewsListProps {
    display?: boolean;
    massMedia?: IMassMedia[];
}

export const NewsList: FC<INewsListProps> = ({ display = false, massMedia }) => {
    return (
        <div className={styles.newsList}>
            {massMedia &&
                massMedia
                    .filter((media) => (display ? media.display : media))
                    .map((media) => {
                        return <NewsCard key={media.id} media={media} />;
                    })}
        </div>
    );
};
