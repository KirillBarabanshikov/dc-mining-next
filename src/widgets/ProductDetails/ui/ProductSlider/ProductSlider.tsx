import clsx from 'clsx';
import { FC, useState } from 'react';
import { Mousewheel,Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MAX_WIDTH_XL } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { SwiperButton } from '@/shared/ui';

import styles from './ProductSlider.module.scss';

interface IProductSliderProps {
    images: { id: number; image?: string }[];
}

export const ProductSlider: FC<IProductSliderProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const matches = useMediaQuery(MAX_WIDTH_XL);
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className={clsx(styles.slider, 'product-slider')}>
            <div className={styles.thumbs}>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs, Mousewheel]}
                    mousewheel
                    direction={matches ? 'horizontal' : 'vertical'}
                    breakpoints={{
                        '0': {
                            slidesPerView: 'auto',
                            spaceBetween: 8,
                        },
                    }}
                    className={styles.swiper}
                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id} className={styles.slide}>
                            <div className={styles.image}>
                                <img src={image.image} alt={'image'} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.main}>
                <Swiper
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[Thumbs]}
                    onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                >
                    {images.length >= 2 && (
                        <SwiperButton
                            variant={'prev'}
                            disabled={currentSlide === 0}
                            className={clsx(styles.swiperButton, styles.prev)}
                        />
                    )}
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <div className={styles.mainImage}>
                                <img src={image.image} alt={'image'} />
                            </div>
                        </SwiperSlide>
                    ))}
                    {images.length >= 2 && (
                        <SwiperButton
                            variant={'next'}
                            disabled={currentSlide === images.length - 1}
                            className={clsx(styles.swiperButton, styles.next)}
                        />
                    )}
                </Swiper>
            </div>
        </div>
    );
};
