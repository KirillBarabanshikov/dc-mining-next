import { FC } from 'react';

import { IProduct } from '@/entities/product';

import styles from './ProductDetails.module.scss';
import { ProductInfo, ProductSlider, ProductsTabs } from './ui';

interface IProductDetailsProps {
    product?: IProduct | null;
}

export const ProductDetails: FC<IProductDetailsProps> = ({ product }) => {
    if (!product) return <></>;
    console.log(product);

    return (
        <div className={styles.details} itemScope itemType='https://schema.org/Product'>
            <meta itemProp='name' content={product.seoTitle} />
            <meta itemProp='description' content={product.seoDescription || ''} />
            <meta itemProp='image' content={product.images[0].image} />
            <meta itemProp='url' content={`https://dc-mining.ru/product/${product?.id}/${product?.slug}`} />

            <div className={styles.info}>
                <ProductSlider images={product.images} />
                <ProductInfo product={product} />
            </div>
            <ProductsTabs product={product} />
        </div>
    );
};
