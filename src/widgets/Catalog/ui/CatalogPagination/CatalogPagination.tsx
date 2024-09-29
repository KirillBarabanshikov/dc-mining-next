'use client';

import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { getCatalogData } from '@/entities/catalog';
import { ICatalogData } from '@/entities/catalog/model';
import { ICategory } from '@/entities/category';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button, Pagination } from '@/shared/ui';

import styles from './CatalogPagination.module.scss';

interface ICatalogPaginationProps {
    countProducts: number;
    category: ICategory;
    className?: string;
}

export const CatalogPagination: FC<ICatalogPaginationProps> = ({ countProducts, category, className }) => {
    const searchParams = useSearchParams();
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const currentPage = +(searchParams.get('page') ?? 1);
    const length = Math.ceil(countProducts / 12);
    const router = useRouter();
    const queryClient = useQueryClient();

    const onSetPage = async (page: number, more: boolean) => {
        const catalogData = await getCatalogData({ type: category.title, page });

        if (!catalogData) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });

        if (more) {
            queryClient.setQueryData(
                ['catalog', category.title],
                (oldData: ICatalogData): ICatalogData => ({
                    count: oldData.count,
                    products: [...oldData.products, ...catalogData.products],
                }),
            );
        } else {
            queryClient.setQueryData(['catalog', category.title], () => catalogData);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (length < 2) return <></>;

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
