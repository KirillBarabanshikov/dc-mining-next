'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCatalogFilters, useCatalogStore } from '@/entities/catalog';
import { getCatalogProducts } from '@/entities/catalog/api';
import { ProductsList } from '@/widgets';

import styles from './Catalog.module.scss';
import { CatalogPagination } from './ui';

export const Catalog = () => {
    const { viewMode, products, countProducts, category, setProducts, setCountProducts } = useCatalogStore();
    const { params, getFilterBody } = useCatalogFilters();
    const currentPage = +(params.get('page') ?? 1);

    const { data } = useQuery({
        queryKey: ['catalog', category?.title, currentPage],
        queryFn: () => getCatalogProducts(getFilterBody(category?.title ?? ''), currentPage),
    });

    useEffect(() => {
        if (!data) return;
        setProducts(data.items);
        setCountProducts(data.total_items);
    }, [data]);

    return (
        <div className={styles.catalog}>
            {/*<CustomFilters className={styles.customFilter} />*/}
            {/*<Filters className={styles.filters} />*/}
            {/*<Sorting className={styles.sorting} />*/}
            <ProductsList products={products} viewMode={viewMode} className={styles.productList} />
            <CatalogPagination countProducts={countProducts} />
        </div>
    );
};
