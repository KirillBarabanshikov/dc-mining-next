'use client';

import clsx from 'clsx';
import { FC } from 'react';

import { useCatalogFilters, useCatalogStore } from '@/entities/catalog';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button, Pagination } from '@/shared/ui';

import styles from './CatalogPagination.module.scss';
import { getCatalogProducts } from '@/entities/catalog/api';

interface ICatalogPaginationProps {
    countProducts: number;
    className?: string;
    setEnabled: (enabled: boolean) => void;
}

export const CatalogPagination: FC<ICatalogPaginationProps> = ({ countProducts, className }) => {
    const { category, products, setProducts } = useCatalogStore();
    const { params, getFilterBody, setSearchParams, getCurrentPage } = useCatalogFilters();
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const currentPage = +(params.get('page') ?? 1);
    const length = Math.ceil(countProducts / 12);

    const onSetPage = async (page: number, more: boolean) => {
        if (!category) return;
        params.set('page', `${page}`);
        setSearchParams();
        if (more) {
            const data = await getCatalogProducts(getFilterBody(category.title), currentPage);
            setProducts([...products, ...(data?.items ?? [])]);
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }
    };

    if (length < 2) {
        return <></>;
    }

    return (
        <div className={clsx(styles.pagination, className)}>
            {currentPage < length && (
                <Button
                    variant={'outline'}
                    isWide
                    size={matches ? 'md' : 'lg'}
                    onClick={() => onSetPage(currentPage + 1, true)}
                >
                    Показать ещё
                </Button>
            )}
            {!matches && (
                <Pagination currentPage={currentPage} length={length} onChange={(page) => onSetPage(page, false)} />
            )}
        </div>
    );
};
