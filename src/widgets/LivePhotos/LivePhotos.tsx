'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowPrev from '@/shared/assets/icons/arrow-left24.svg';
import ArrowNext from '@/shared/assets/icons/arrow-right24.svg';
import Close from '@/shared/assets/icons/close.svg';
import { BASE_URL } from '@/shared/consts';
import { useBodyScrollLock } from '@/shared/lib';
import { SwiperButton } from '@/shared/ui';

import styles from './LivePhotos.module.scss';

interface ILivePhotosProps {
  images: string[];
  className?: string;
}

export const LivePhotos: FC<ILivePhotosProps> = ({ images, className }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { setIsLocked } = useBodyScrollLock();

  useEffect(() => {
    setIsLocked(isOpen);
  }, [isOpen]);

  if (!images?.length) return <></>;

  return (
    <div className={clsx(styles.container, className)}>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        className={styles.slider}
      >
        <SwiperButton
          variant={'prev'}
          className={clsx(styles.swiperButton, styles.prev)}
        />
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.photo}>
                <Image
                  src={BASE_URL + image}
                  alt={'Photo'}
                  width={280}
                  height={280}
                  loading={'lazy'}
                  onClick={() => {
                    setSelectedImage(index);
                    setIsOpen(true);
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperButton
          variant={'next'}
          className={clsx(styles.swiperButton, styles.next)}
        />
      </Swiper>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.previewContainer}
          >
            <button
              title={'Предыдущее фото'}
              aria-label={'Предыдущее фото'}
              onClick={() => {
                if (selectedImage <= 0) return;
                setSelectedImage((prev) => prev - 1);
              }}
              className={clsx(styles.btn, styles.prev)}
            >
              <ArrowPrev />
            </button>
            <Image
              src={BASE_URL + images[selectedImage]}
              alt={'Preview Photo'}
              width={1280}
              height={720}
              className={styles.image}
            />
            <button
              title={'Следующее фото'}
              aria-label={'Следующее фото'}
              onClick={() => {
                if (selectedImage >= images.length - 1) return;
                setSelectedImage((prev) => prev + 1);
              }}
              className={clsx(styles.btn, styles.next)}
            >
              <ArrowNext />
            </button>
            <button
              title={'Закрыть'}
              aria-label={'Закрыть'}
              onClick={() => setIsOpen(false)}
              className={clsx(styles.btn, styles.close)}
            >
              <Close />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
