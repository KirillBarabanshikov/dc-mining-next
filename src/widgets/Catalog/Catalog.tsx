'use client';

import { FC } from 'react';

import { ICatalogData, useCatalogStore } from '@/entities/catalog';
import { ICategory } from '@/entities/category';
import { ProductsList } from '@/widgets';

import styles from './Catalog.module.scss';
import { CatalogPagination } from './ui';

interface ICatalogProps {
  category: ICategory;
  catalogData: ICatalogData;
}

export const Catalog: FC<ICatalogProps> = ({ catalogData }) => {
  const { viewMode } = useCatalogStore();

  return (
    <div className={styles.catalog}>
      <ProductsList
        products={catalogData.products}
        viewMode={viewMode}
        className={styles.productList}
      />
      <CatalogPagination
        countProducts={catalogData.count}
        className={styles.pagination}
      />
    </div>
  );
};
