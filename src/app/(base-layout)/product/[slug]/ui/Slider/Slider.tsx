import Image from 'next/image';
import { FC, useState } from 'react';
import { Mousewheel, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/entities/product';

import styles from './Slider.module.scss';

interface ISliderProps {
  product: IProduct;
}

export const Slider: FC<ISliderProps> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className={styles.sliderWrap}>
      <div className={styles.mainSlider}>
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Thumbs, Mousewheel]}
          mousewheel
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          spaceBetween={20}
        >
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
        </Swiper>
      </div>
      <div className={styles.thumbs}>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs, Mousewheel]}
          mousewheel
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <Image
                src={image.image || ''}
                alt={`Изображение продукта ${index}`}
                width={100}
                height={100}
                itemProp={'image'}
                className={styles.thumb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
