'use client';

import { FC } from 'react';

import { ICatalogData, useCatalogStore } from '@/entities/catalog';
import { ICategory } from '@/entities/category';

import { ProductsList } from '../ProductsList';
import styles from './Catalog.module.scss';
import { CatalogPagination, CustomFilters, Filters, Sorting } from './ui';

interface ICatalogProps {
    category: ICategory;
    catalogData: ICatalogData;
}

export const Catalog: FC<ICatalogProps> = ({ category, catalogData }) => {
    const { viewMode, setViewMode } = useCatalogStore();

    return (
        <div className={styles.catalog}>
            <CustomFilters category={category} className={styles.customFilter} />
            <Filters category={category} catalogData={catalogData} className={styles.filters} />
            <Sorting category={category} viewMode={viewMode} setViewMode={setViewMode} className={styles.sorting} />
            <ProductsList products={catalogData.products} viewMode={viewMode} className={styles.productList} />
            <CatalogPagination countProducts={catalogData.count} category={category} />
        </div>
    );
};
