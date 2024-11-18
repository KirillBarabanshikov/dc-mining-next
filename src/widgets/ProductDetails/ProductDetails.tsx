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
            <div itemScope itemType='https://schema.org/Product' className={styles.info}>
                <ProductSlider images={product.images} />
                <ProductInfo product={product} />
                <meta itemProp='brand' content={product.productSubCategory.title} />
            </div>
            <ProductsTabs product={product} />
        </div>
    );
};
