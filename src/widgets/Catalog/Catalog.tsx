'use client';

import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { IProduct } from '@/entities/product';

import { ProductsList } from '../ProductsList';
import styles from './Catalog.module.scss';
import { CatalogPagination, CustomFilters } from './ui';

interface ICatalogProps {
    category: ICategory;
    products: IProduct[];
    countProducts: number;
}

export const Catalog: FC<ICatalogProps> = ({ products, countProducts, category }) => {
    return (
        <div className={styles.catalog}>
            <CustomFilters category={category} className={styles.customFilter} />
            {/*<Filters className={styles.filters} />*/}
            {/*<Sorting className={styles.sorting} />*/}
            <ProductsList products={products} viewMode={'tile'} className={styles.productList} />
            <CatalogPagination countProducts={countProducts} category={category} />
        </div>
    );
};
