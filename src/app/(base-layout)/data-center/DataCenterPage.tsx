'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getDataCenterInfo } from '@/entities/pageInfo';
import { OrderCallBanner } from '@/features/call';
import { Calculator } from '@/widgets/Calculator';

import styles from './DataCenterPage.module.scss';
import {
  Advantages,
  Benefits,
  DataCenterInfo,
  Photos,
  Tariffs,
  Useful,
} from './ui';

export const DataCenterPage = () => {
  const { data: dataCenterInfo } = useQuery({
    queryKey: ['data-center'],
    queryFn: getDataCenterInfo,
    staleTime: Infinity,
  });

  if (!dataCenterInfo) return <></>;

  return (
    <div className={styles.dataCenterPage}>
      <DataCenterInfo
        title={dataCenterInfo.title}
        description={dataCenterInfo.description}
      />
      <Advantages advantages={dataCenterInfo.top} className={styles.margin} />
      <Photos photos={dataCenterInfo.slider} className={styles.margin} />
      <Tariffs tariffs={dataCenterInfo.tariffPlans} className={styles.margin} />
      <div
        id={'calculator'}
        style={{ scrollMarginTop: '200px' }}
        className={clsx('container', styles.container, styles.margin)}
      >
        <Calculator singleType={3} />
      </div>
      <Benefits
        countDevices={dataCenterInfo.countDevices}
        className={styles.margin}
      />
      <Useful
        goodKnow={dataCenterInfo.goodKnow}
        info={dataCenterInfo.info}
        className={styles.useful}
      />
      <OrderCallBanner />
    </div>
  );
};
