'use client';

import './DataCenterDevelopmentPage.scss';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getContacts } from '@/entities/contacts';
import fromWhomSrc1 from '@/shared/assets/images/for-whom/1.png';
import fromWhomSrc2 from '@/shared/assets/images/for-whom/2.png';
import fromWhomSrc3 from '@/shared/assets/images/for-whom/3.png';
import fromWhomSrc4 from '@/shared/assets/images/for-whom/4.png';
import { Accordion, Button } from '@/shared/ui';
import { LivePhotos } from '@/widgets';
import { CallMeBanner } from '@/widgets/CallMeBanner';

import { Infrastructure, Variants } from './ui';

export const DataCenterDevelopmentPage = () => {
  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return (
    <div className={'data-center-development'}>
      <div className={'data-center-development__hero'}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={'data-center-development__video'}
        >
          <source src={'/animations/data_center-animation.webm'} />
          Ваш браузер не поддерживает тег video.
        </video>
        <section className={'development'}>
          <div className={'development__inner _container-second'}>
            <div className={'development__body'}>
              <p className={'development__extra'}>Инвестиции в майнинг</p>
              <h1 className={'development__title h1'}>
                Строительство дата-центров для майнинга <span>под ключ</span>
              </h1>
              <div className={'development__subtitle'}>
                DC Mining — ведущая компания в области строительства и
                эксплуатации майнинг центров. Мы разрабатываем энергоэффективные
                решения для размещения оборудования и обеспечиваем бесперебойную
                работу дата-центров
              </div>
            </div>
            <div className={'development__list'}>
              <div className={'development__item'}>
                <div className={'development__item-title'}>
                  окупаемость проекта
                </div>
                <div className={'development__item-value'}>от 20 месяцев</div>
              </div>
              <div className={'development__item'}>
                <div className={'development__item-title'}>
                  размер инвестиций
                </div>
                <div className={'development__item-value'}>от 15 млн ₽</div>
              </div>
              <Button className={'development__button'}>Оставить заявку</Button>
            </div>
            <div className={'development__resource'}>
              <Image
                src={
                  'https://s3-alpha-sig.figma.com/img/0330/5abc/ab868053e4021072cc0d8b23323064d0?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s~Fw6zuh5zr3LbjrgtKZ8XzvIePbQIEr1Iy~NiCVnhmMcj~VAMHW4KeBdtGIwz5jbv5qGiMY9zdGzP27fTf~dlsQ3LCwIf4qED9NnBFf-v005ISmOmItIJu7ti2PUbSmbuHKvI5KpO8MbfxWCui1PgBoWSAbMggxWWzuaUMtFxXUbJA5xOo5GT5kq~4XIsLnS8KJq4TdgL2b7gkU-5t5ZGbwWVvXzwqRHE38IRtlpVKlO5TV60Zaj~hXbFGK5e6AKnLwlbd~8t6NFqlOZyJrSsQnSJt5pv9MqlOtMBiHf81xEXHBqgBaANcVnbYSUbb9s7McngxhFevmGCXN1JKHBg__'
                }
                alt={'Resource'}
                width={'72'}
                height={'72'}
                className={'development__resource-image'}
              />
              <div className={'development__resource-body'}>
                <div className={'development__resource-title'}>
                  ООО «Диси Телеком»
                </div>
                <div className={'development__resource-subtitle'}>
                  Оператор майнинговой инфраструктуры
                </div>
              </div>
              <Button theme={'white'} size={'md'}>
                Rusprofile
              </Button>
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
      <Infrastructure />
      <Variants />
      <section className={'stages'}>
        <div className={'stages__inner _container'}>
          <h3 className={'stages__title h3'}>
            <span className={'mark'}>Стадии реализации</span> проекта
            строительства дата-центров DC Mining
          </h3>
          <div className={'stages__list'}>
            {Array.from({ length: 6 }).map((_, index) => {
              return (
                <Accordion
                  key={index}
                  title={
                    'Консультация и анализ потребностей – определяем масштаб и цели проекта'
                  }
                  body={
                    'Консультация и анализ потребностей – определяем масштаб и цели проекта'
                  }
                  number={index + 1}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className={'gallery'}>
        <div className={'gallery__inner _container'}>
          <h3 className={'gallery__title h3'}>Галлерея</h3>
        </div>
        <LivePhotos
          media={[
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
            '/images/data_center_top/11-678a5f46262ff441270328.png',
          ]}
          className={'gallery__list'}
        />
      </section>
      <section className={'questions'}>
        <div className={'questions__inner _container'}>
          <h3 className={'questions__title h3'}>Вопросы и ответы</h3>
          <div className={'questions__list'}>
            {Array.from({ length: 6 }).map((_, index) => {
              return (
                <Accordion
                  key={index}
                  title={'Как подключить асик-майнер?'}
                  body={'Как подключить асик-майнер?'}
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
          variant={'contacts'}
          contacts={contacts}
        />
      </div>
    </div>
  );
};
