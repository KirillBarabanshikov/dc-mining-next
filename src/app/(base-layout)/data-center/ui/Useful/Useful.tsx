import clsx from 'clsx';
import { FC, useState } from 'react';

import { Accordion } from '@/shared/ui';

import styles from './Useful.module.scss';

interface IUsefulProps {
  goodKnow: any;
  info: any;
  className?: string;
}

export const Useful: FC<IUsefulProps> = ({ goodKnow, info, className }) => {
  return (
    <div className={className}>
      <section className={styles.goodKnow}>
        <div className={'container'}>
          <h2 className={'section-title-primary'}>Полезно знать</h2>
          <div className={styles.goodKnowList}>
            {goodKnow.map((know: any) => {
              return (
                <Accordion
                  key={know.id}
                  title={know.title}
                  body={know.description}
                />
              );
            })}
          </div>
        </div>
      </section>
      <WhatDataCenter info={info} />
    </div>
  );
};

const WhatDataCenter = ({ info }: { info: string }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className={styles.whatDataCenter}>
      <div className={clsx(styles.container, 'container')}>
        <h3 className={styles.whatDataCenterTitle}>Майнинг-отель</h3>
        <div
          dangerouslySetInnerHTML={{ __html: info }}
          className={clsx(
            styles.whatDataCenterText,
            'list',
            showMore && styles.more,
          )}
          style={showMore ? { maxHeight: 'unset' } : {}}
        />
        {info.length > 1000 && (
          <div
            onClick={() => setShowMore((prev) => !prev)}
            className={styles.whatDataCenterMore}
          >
            {showMore ? 'Меньше' : 'Подробнее'}
          </div>
        )}
      </div>
    </section>
  );
};
