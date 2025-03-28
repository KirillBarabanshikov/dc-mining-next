'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import ArrowPrev from '@/shared/assets/icons/arrow-left24.svg';
import ArrowNext from '@/shared/assets/icons/arrow-right24.svg';
import Close from '@/shared/assets/icons/close.svg';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import PlayIcon from '@/shared/assets/icons/play.svg';
import { BASE_URL } from '@/shared/consts';
import { useBodyScrollLock } from '@/shared/lib';
import { SwiperButton } from '@/shared/ui';

import styles from './LivePhotos.module.scss';

interface ILivePhotosProps {
  media: string[]; // Массив путей к файлам
  className?: string;
}

export const LivePhotos: FC<ILivePhotosProps> = ({ media, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { setIsLocked } = useBodyScrollLock();

  useEffect(() => {
    setIsLocked(isOpen);
  }, [isOpen]);

  if (!media?.length) return null;

  const getMediaType = (src: string): 'image' | 'video' => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(src) ? 'image' : 'video';
  };

  const selectedMedia = media[selectedIndex];
  const selectedType = getMediaType(selectedMedia);

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
        {media.map((src, index) => {
          const type = getMediaType(src);
          return (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.photo}>
                {type === 'image' ? (
                  <>
                    <Image
                      src={BASE_URL + src}
                      alt={'Photo'}
                      width={280}
                      height={280}
                      loading={'lazy'}
                      onClick={() => {
                        setSelectedIndex(index);
                        setIsOpen(true);
                      }}
                    />
                    <div className={styles.eyeIcon}>
                      <EyeIcon />
                    </div>
                  </>
                ) : (
                  <>
                    <video
                      src={BASE_URL + src}
                      width={280}
                      height={280}
                      controls={false}
                      autoPlay={false}
                      playsInline
                      onClick={() => {
                        setSelectedIndex(index);
                        setIsOpen(true);
                      }}
                    />
                    <div className={styles.videoIcon}>
                      <PlayIcon />
                    </div>
                  </>
                )}
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
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <button
              title={'Предыдущее'}
              aria-label={'Предыдущее'}
              onClick={() =>
                selectedIndex > 0 && setSelectedIndex((prev) => prev - 1)
              }
              className={clsx(styles.btn, styles.prev)}
            >
              <ArrowPrev />
            </button>
            {selectedType === 'image' ? (
              <Image
                src={BASE_URL + selectedMedia}
                alt={'Preview'}
                width={1280}
                height={720}
                className={styles.image}
              />
            ) : (
              <video
                src={BASE_URL + selectedMedia}
                controls
                autoPlay
                playsInline
                controlsList='nodownload'
                width={1280}
                height={720}
                className={styles.video}
              />
            )}
            <button
              title={'Следующее'}
              aria-label={'Следующее'}
              onClick={() =>
                selectedIndex < media.length - 1 &&
                setSelectedIndex((prev) => prev + 1)
              }
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
