'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ICategory } from '@/entities/category';
import { ISlide } from '@/entities/mainSlider';
import { MAX_WIDTH_XL } from '@/shared/consts';
import { useIsSafari, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './MainSlider.module.scss';

interface IMainSliderProps {
  slides?: ISlide[] | null;
  categories?: ICategory[] | null;
}

export const MainSlider: FC<IMainSliderProps> = ({ slides, categories }) => {
  const matches = useMediaQuery(MAX_WIDTH_XL);
  const { isSafari } = useIsSafari();
  const router = useRouter();

  const handleNavigate = (link: string) => {
    if (!categories) return;

    let path = '/';

    if (link === 'dataCenters') {
      path = '/data-center';
    } else if (link === 'products') {
      const category = categories.find(
        (category) => category.title === 'ASIC майнеры',
      );
      path = category ? `/catalog/${category.slug}` : '/';
    } else if (link === 'containers') {
      const category = categories.find(
        (category) => category.title === 'Контейнеры для майнинг ферм',
      );
      path = category ? `/catalog/${category.slug}` : '/';
    }

    router.push(path);
  };

  return (
    <Swiper
      effect={'fade'}
      modules={[EffectFade, Autoplay, Pagination]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={!!slides && slides.length > 1}
    >
      {slides &&
        slides.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <section className={styles.slide}>
                <div className={styles.slideContent}>
                  <h2 dangerouslySetInnerHTML={{ __html: slide.title }} />
                  <div
                    className={clsx(styles.description, 'list')}
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  />
                  <Button
                    className={styles.button}
                    size={matches ? 'md' : 'lg'}
                    onClick={() => handleNavigate(slide.links)}
                  >
                    {slide.links === 'cloudMining' ? 'Скоро' : 'Подробнее'}
                  </Button>
                </div>
                <div className={styles.imageWrap}>
                  {isSafari ? (
                    <Image
                      src={`${slide.image}`}
                      alt={slide.title}
                      width={904}
                      height={580}
                    />
                  ) : slide.media.includes('.webm') ||
                    slide.media.includes('.mp4') ? (
                    <video autoPlay loop muted playsInline>
                      <source src={slide.media} />
                    </video>
                  ) : (
                    <Image
                      src={`${slide.image}`}
                      alt={slide.title}
                      width={904}
                      height={580}
                    />
                  )}
                </div>
              </section>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
