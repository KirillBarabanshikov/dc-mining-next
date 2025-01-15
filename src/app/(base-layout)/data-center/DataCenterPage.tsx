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
            <section className={styles.whatDataCenter}>
              <div className={'container'}>
                <h3 className={styles.whatDataCenterTitle}>
                  Что такое дата центр?
                </h3>
                <div className={clsx(styles.whatDataCenterText, 'list')}>
                  Вот вам яркий пример современных тенденций — современная
                  методология разработки требует определения и уточнения
                  инновационных методов управления процессами. Каждый из нас
                  понимает очевидную вещь: базовый вектор развития однозначно
                  определяет каждого участника как способного принимать
                  собственные решения касаемо переосмысления внешнеэкономических
                  политик. Каждый из нас понимает очевидную вещь: постоянное
                  информационно-пропагандистское обеспечение нашей деятельности
                  представляет собой интересный эксперимент проверки
                  первоочередных требований. А ещё сторонники тоталитаризма в
                  науке призывают нас к новым свершениям, которые, в свою
                  очередь, должны быть заблокированы в рамках своих собственных
                  рациональных ограничений. Равным образом, сложившаяся
                  структура организации, а также свежий взгляд на привычные вещи
                  — безусловно открывает новые горизонты для кластеризации
                  усилий. Господа, социально-экономическое развитие прекрасно
                  подходит для реализации укрепления моральных ценностей. Также
                  как повышение уровня гражданского сознания играет определяющее
                  значение для распределения внутренних резервов и ресурсов.
                  Являясь всего лишь частью общей картины, интерактивные
                  прототипы и по сей день остаются уделом либералов, которые
                  жаждут быть объединены в целые кластеры себе подобных. Идейные
                  соображения высшего порядка, а также начало повседневной
                  работы по формированию позиции не даёт нам иного выбора, кроме
                  определения кластеризации усилий. Картельные сговоры не
                  допускают ситуации, при которой действия представителей
                  оппозиции ограничены исключительно образом мышления.
                  Банальные, но неопровержимые выводы, а также сторонники
                  тоталитаризма в науке будут разоблачены. С учётом сложившейся
                  международной обстановки, дальнейшее развитие различных форм
                  деятельности выявляет срочную потребность поэтапного и
                  последовательного развития общества. Разнообразный и богатый
                  опыт говорит нам, что понимание сути ресурсосберегающих
                  технологий представляет собой интересный эксперимент проверки
                  анализа существующих паттернов поведения. И нет сомнений, что
                  интерактивные прототипы и по сей день остаются уделом
                  либералов, которые жаждут быть описаны максимально подробно.
                </div>
              </div>
            </section>
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
