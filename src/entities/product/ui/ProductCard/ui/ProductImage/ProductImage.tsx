import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import styles from './ProductImage.module.scss';

interface IProductImageProps {
    images: { id: number; image?: string }[];
    className?: string;
}

export const ProductImage: FC<IProductImageProps> = ({ images, className }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className={clsx(styles.image, className)} onMouseLeave={() => setCurrentSlide(0)}>
            <Image
                src={images[currentSlide]?.image || ''}
                alt={`Product Image ${currentSlide}`}
                width={252}
                height={252}
                loading={'lazy'}
            />
            <div className={styles.slides}>
                {images.length >= 2 &&
                    images.slice(0, 4).map((image, index) => {
                        return (
                            <span key={image.id} onMouseEnter={() => setCurrentSlide(index)} className={styles.slide} />
                        );
                    })}
            </div>
            <div className={styles.pagination}>
                {images.length >= 2 &&
                    images.slice(0, 4).map((image, index) => {
                        return (
                            <span
                                key={image.id}
                                className={clsx(styles.bullet, index === currentSlide && styles.active)}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
