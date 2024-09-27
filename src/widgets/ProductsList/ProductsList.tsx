import clsx from 'clsx';
import { FC, memo } from 'react';

import { IProduct, ProductCard } from '@/entities/product';

import styles from './ProductsList.module.scss';

interface IProductsListProps {
    viewMode?: 'tile' | 'simple';
    products?: IProduct[];
    className?: string;
}

export const ProductsList: FC<IProductsListProps> = memo(({ viewMode = 'tile', products, className }) => {
    return (
        <div className={clsx(styles.list, styles[viewMode], className)}>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} viewMode={viewMode} />)}
        </div>
    );
});

ProductsList.displayName = 'ProductsList';
