import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Mousewheel, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { IProduct } from '@/entities/product';
import ArrowPrev from '@/shared/assets/icons/arrow-left24.svg';
import ArrowNext from '@/shared/assets/icons/arrow-right24.svg';
import { Badge } from '@/shared/ui';

import styles from './Slider.module.scss';

interface ISliderProps {
  product: IProduct;
  className?: string;
}

export const Slider: FC<ISliderProps> = ({ product, className }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={clsx(styles.sliderWrap, className)}>
      <div className={styles.mainSlider}>
        <div className={styles.tags}>
          {product.tags.map((tag) => (
            <Badge key={tag.id} text={tag.title} color={tag.color} />
          ))}
        </div>
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs, Pagination]}
          pagination
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          spaceBetween={20}
          className={'asic-slider'}
        >
          <SwipeButton variant={'prev'} />

          {product.images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image.image || ''}
                alt={`Изображение продукта ${index}`}
                width={592}
                height={592}
                itemProp={'image'}
                className={styles.currentImage}
              />
            </SwiperSlide>
          ))}
          <SwipeButton variant={'next'} />
        </Swiper>
      </div>
      <div className={styles.thumbs}>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs, Mousewheel]}
          mousewheel
          slidesPerView={'auto'}
          spaceBetween={8}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={image.id} className={styles.thumbSlide}>
              <Image
                src={image.image || ''}
                alt={`Изображение продукта ${index}`}
                width={100}
                height={100}
                itemProp={'image'}
                className={clsx(
                  styles.thumb,
                  index === currentSlide && styles.active,
                )}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

interface ISwipeButton {
  variant: 'next' | 'prev';
}

const SwipeButton: FC<ISwipeButton> = ({ variant }) => {
  const swiper = useSwiper();

  const handleClick = () => {
    variant === 'next' ? swiper.slideNext() : swiper.slidePrev();
  };

  return (
    <button onClick={handleClick} className={clsx(styles.btn, styles[variant])}>
      {variant === 'prev' ? <ArrowPrev /> : <ArrowNext />}
    </button>
  );
};
