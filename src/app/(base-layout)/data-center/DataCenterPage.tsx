'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useState } from 'react';

import { getDataCenterInfo } from '@/entities/pageInfo';
import { OrderCallBanner, OrderCallModal } from '@/features/call';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Accordion, Button } from '@/shared/ui';
import { Advantages, Benefits, LivePhotos, Tariffs } from '@/widgets';
import { Calculator } from '@/widgets/Calculator';

import styles from './DataCenterPage.module.scss';

export const DataCenterPage: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(MAX_WIDTH_MD);

  const { data: info } = useSuspenseQuery({
    queryKey: ['data-center'],
    queryFn: getDataCenterInfo,
    staleTime: Infinity,
  });

  return (
    <>
      <section className={styles.dataCenterBanner}>
        <video autoPlay loop muted playsInline className={styles.animation}>
          <source src={'/animations/data_center-animation.webm'} />
          Ваш браузер не поддерживает тег video.
        </video>
        <div className={clsx(styles.dataCenterContainer, 'container')}>
          <h1 dangerouslySetInnerHTML={{ __html: info?.title ?? '' }} />
          <div
            className={clsx(styles.description, 'list')}
            dangerouslySetInnerHTML={{ __html: info?.description ?? '' }}
          />
          <Button
            size={matches ? 'md' : 'lg'}
            isWide={matches}
            onClick={() => setIsOpen(true)}
          >
            Оставить заявку
          </Button>
        </div>
        <div className={styles.background}></div>
      </section>
      <div className={clsx(styles.content, 'sections')}>
        {info && (
          <>
            <Advantages
              advantages={info.top}
              className={styles.advantagesTop}
            />
            <div className={styles.livePhotos}>
              <div className={'container'}>
                <div className={clsx(styles.livePhotosTabs)}>
                  {info.slider.map((slider, index) => {
                    return (
                      <div
                        key={slider.id}
                        className={clsx(
                          styles.livePhotosTab,
                          activeTab === index && styles.active,
                        )}
                        onClick={() => setActiveTab(index)}
                      >
                        {slider.title}
                      </div>
                    );
                  })}
                </div>
              </div>

              <LivePhotos
                images={info.slider[activeTab].images.map(
                  (image) => image.image,
                )}
              />
            </div>
            <Tariffs tariffs={info.tariffPlans} />
            <div
              id='calculator'
              className={'container'}
              style={{ scrollMarginTop: '200px' }}
            >
              <Calculator />
            </div>
            <Benefits />
            <div className={styles.goodKnow}>
              <h2 className={'section-title-primary'}>Полезно знать</h2>
              <div className={styles.goodKnowList}>
                {info.goodKnow.map((know) => {
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
            <OrderCallBanner />
          </>
        )}
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
