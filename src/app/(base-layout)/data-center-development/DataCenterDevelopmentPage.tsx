'use client';

import './DataCenterDevelopmentPage.scss';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { getFaq } from '@/entities/faq';
import { getDataCenterDevelopmentInfo } from '@/entities/pageInfo';
import { OrderCallModal } from '@/features/call';
import operatorSrc from '@/shared/assets/images/data-center/operator.png';
import fromWhomSrc1 from '@/shared/assets/images/for-whom/1.png';
import fromWhomSrc2 from '@/shared/assets/images/for-whom/2.png';
import fromWhomSrc3 from '@/shared/assets/images/for-whom/3.png';
import fromWhomSrc4 from '@/shared/assets/images/for-whom/4.png';
import { Accordion, Button } from '@/shared/ui';
import { LivePhotos } from '@/widgets';
import { CallMeBanner } from '@/widgets/CallMeBanner';

import { About, Infrastructure, Variants } from './ui';

export const DataCenterDevelopmentPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: info } = useQuery({
    queryKey: ['data-center-development'],
    queryFn: getDataCenterDevelopmentInfo,
  });

  const { data: faq } = useQuery({
    queryKey: ['faq'],
    queryFn: () => getFaq(),
  });

  if (!info) return <></>;

  return (
    <div className={'data-center-development'}>
      <div className={'data-center-development__hero'}>
        <div className={'data-center-development__video-overlay'}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className={'data-center-development__video'}
          >
            <source src={'/animations/data-center-development.webm'} />
            Ваш браузер не поддерживает тег video.
          </video>
        </div>
        <section className={'development'}>
          <div className={'development__inner _container-second'}>
            <div className={'development__body'}>
              <p className={'development__extra'}>{info.section}</p>
              <h1 className={'development__title h1'}>{info.title}</h1>
              <div
                className={'development__subtitle'}
                dangerouslySetInnerHTML={{ __html: info.description }}
              />
            </div>
            <div className={'development__list'}>
              <div className={'development__item'}>
                <div className={'development__item-title'}>
                  {info.titleBlockFirst}
                </div>
                <div
                  className={'development__item-value'}
                  dangerouslySetInnerHTML={{
                    __html: info.descriptionBlockFirst,
                  }}
                />
              </div>
              <div className={'development__item'}>
                <div className={'development__item-title'}>
                  {info.titleBlockSecond}
                </div>
                <div
                  className={'development__item-value'}
                  dangerouslySetInnerHTML={{
                    __html: info.descriptionBlockSecond,
                  }}
                />
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                className={'development__button'}
              >
                Оставить заявку
              </Button>
            </div>
            <div className={'development__resource'}>
              <motion.div
                animate={{ scale: [1, 0.85, 1] }}
                transition={{
                  duration: 0.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
              >
                <Image
                  src={operatorSrc}
                  alt={'Resource'}
                  width={72}
                  height={72}
                  className={'development__resource-image'}
                />
              </motion.div>
              <div className={'development__resource-body'}>
                <div className={'development__resource-title'}>
                  ООО «Диси Телеком»
                </div>
                <div className={'development__resource-subtitle'}>
                  Оператор майнинговой инфраструктуры
                </div>
              </div>
              <a
                href={info.link}
                target={'_blank'}
                className={'development__resource-link'}
              >
                <Button theme={'white'} size={'md'}>
                  Rusprofile
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
      <section className={'for-whom'}>
        <div className={'for-whom__inner _container-second'}>
          <h2 className={'for-whom__title h2'}>
            <span className={'mark'}>Для кого</span> предназначено это решение?
          </h2>
          <div className={'for-whom__list'}>
            <div className={'for-whom__item'}>
              <Image
                src={fromWhomSrc1}
                alt={''}
                width={100}
                height={100}
                className={'for-whom__item-image'}
              />
              <div className={'for-whom__item-title'}>Промышленные объекты</div>
            </div>
            <div className={'for-whom__item'}>
              <Image
                src={fromWhomSrc2}
                alt={''}
                width={100}
                height={100}
                className={'for-whom__item-image'}
              />
              <div className={'for-whom__item-title'}>
                Земельные участки с эл. мощностью
              </div>
            </div>
            <div className={'for-whom__item'}>
              <Image
                src={fromWhomSrc3}
                alt={''}
                width={100}
                height={100}
                className={'for-whom__item-image'}
              />
              <div className={'for-whom__item-title'}>
                Газовые месторождения
              </div>
            </div>
            <div className={'for-whom__item'}>
              <Image
                src={fromWhomSrc4}
                alt={''}
                width={100}
                height={100}
                className={'for-whom__item-image'}
              />
              <div className={'for-whom__item-title'}>Майнерам</div>
            </div>
          </div>
        </div>
      </section>
      <Infrastructure
        title={info.centerTitle}
        subtitle={info.centerDescription}
        offers={info.centerProposal}
      />
      <Variants variants={info.variables} />
      <section className={'gallery'}>
        <div className={'gallery__inner _container'}>
          <h2 className={'gallery__title h2'}>Галерея</h2>
        </div>
        <LivePhotos
          media={info.gallery.map((item) => item.media || '')}
          className={'gallery__list'}
        />
      </section>
      <section className={'stages'}>
        <div className={'stages__inner _container'}>
          <h2 className={'stages__title h3'}>
            <span className={'mark'}>Стадии реализации</span> проекта
            строительства дата-центров DC Mining
          </h2>
          <div className={'stages__list'}>
            {info.stages.map((stage, index) => {
              return (
                <Accordion
                  key={stage.id}
                  title={stage.title}
                  body={stage.description}
                  number={index + 1}
                />
              );
            })}
          </div>
        </div>
      </section>
      <About info={info} />
      <section className={'questions'}>
        <div className={'questions__inner _container'}>
          <h2 className={'questions__title h2'}>Вопросы и ответы</h2>
          <div className={'questions__list'}>
            {faq?.map((item) => {
              return (
                <Accordion
                  key={item.id}
                  title={item.title}
                  body={item.description}
                />
              );
            })}
          </div>
        </div>
      </section>
      <div className={'call-me _container'}>
        <CallMeBanner
          title={'Получите персональный план строительства дата-центра'}
          subtitle={
            'Свяжитесь с нами, мы поможем подобрать оптимальное решение'
          }
        />
      </div>
      <OrderCallModal
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};
