import { FC } from 'react';

import { IProduct } from '@/entities/product';

import styles from './ProductDetails.module.scss';
import { ProductInfo, ProductSlider, ProductsTabs } from './ui';

interface IProductDetailsProps {
    product?: IProduct | null;
}

export const ProductDetails: FC<IProductDetailsProps> = ({ product }) => {
    if (!product) return <></>;

    return (
        <div className={styles.details}>
            <div className={styles.info}>
                <ProductSlider images={product.images} />
                <ProductInfo product={product} />
            </div>
            <ProductsTabs product={product} />
        </div>
    );
};
