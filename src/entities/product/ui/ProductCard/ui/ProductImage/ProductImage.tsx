import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import { IProduct } from '@/entities/product';
import { AddToCompareButton, AddToFavoritesButton } from '@/features/product';

import styles from './ProductImage.module.scss';

interface IProductImageProps {
  product: IProduct;
  className?: string;
}

export const ProductImage: FC<IProductImageProps> = ({
  product,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div
      className={clsx(styles.image, className)}
      onMouseLeave={() => setCurrentSlide(0)}
    >
      <Image
        src={product.images[currentSlide]?.image || ''}
        alt={`Product Image ${currentSlide}`}
        width={252}
        height={252}
        loading={'lazy'}
      />
      <div className={styles.slides}>
        {product.images.length >= 2 &&
          product.images.slice(0, 4).map((image, index) => {
            return (
              <span
                key={image.id}
                onMouseEnter={() => setCurrentSlide(index)}
                className={styles.slide}
              />
            );
          })}
      </div>
      <div className={styles.pagination}>
        {product.images.length >= 2 &&
          product.images.slice(0, 4).map((image, index) => {
            return (
              <span
                key={image.id}
                className={clsx(
                  styles.bullet,
                  index === currentSlide && styles.active,
                )}
              />
            );
          })}
      </div>
      <div className={styles.actions}>
        <AddToFavoritesButton product={product} />
        <AddToCompareButton productId={product.id} />
      </div>
    </div>
  );
};
