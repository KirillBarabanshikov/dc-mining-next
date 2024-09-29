'use client';

import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { IProduct } from '@/entities/product';

import { ProductsList } from '../ProductsList';
import styles from './Catalog.module.scss';
import { CatalogPagination, CustomFilters, Sorting } from './ui';
import { useCatalogStore } from '@/entities/catalog';

interface ICatalogProps {
    category: ICategory;
    products: IProduct[];
    countProducts: number;
}

export const Catalog: FC<ICatalogProps> = ({ products, countProducts, category }) => {
    const { viewMode, setViewMode } = useCatalogStore();

    return (
        <div className={styles.catalog}>
            <CustomFilters category={category} className={styles.customFilter} />
            {/*<Filters className={styles.filters} />*/}
            <div className={styles.filters} />
            <Sorting category={category} viewMode={viewMode} setViewMode={setViewMode} className={styles.sorting} />
            <ProductsList products={products} viewMode={viewMode} className={styles.productList} />
            <CatalogPagination countProducts={countProducts} category={category} />
        </div>
    );
};
