'use client';

import { useCompareStore } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { CompareList } from '@/widgets';

import styles from './ComparePage.module.scss';

const ComparePage = () => {
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { clearCompare } = useCompareStore();

    return (
        <div className={'sections'}>
            <section className={styles.compare}>
                <div className={'container'}>
                    <div className={styles.head}>
                        <h1 className={'section-title-secondary'}>Сравнение</h1>
                        <Button variant={'outline'} size={matches ? 'sm' : 'md'} onClick={() => clearCompare()}>
                            Очистить
                        </Button>
                    </div>
                </div>
                <div className={'container scrollable'}>{<CompareList />}</div>
            </section>
            {/*<RecentProductsList />*/}
        </div>
    );
};

export default ComparePage;
