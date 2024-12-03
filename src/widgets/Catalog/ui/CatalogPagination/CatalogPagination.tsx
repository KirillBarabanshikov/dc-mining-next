'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { getCatalogData, getCustomFilterBySlug, useCatalogFilters } from '@/entities/catalog';
import { ICatalogData } from '@/entities/catalog/model';
import { getSubCategoryBySlug, ICategory } from '@/entities/category';
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
    const { getFilterBody } = useCatalogFilters();
    const { slug } = useParams<{ slug: string[] }>();

    const { data: subCategory } = useQuery({
        queryKey: ['subCategory', slug[1]],
        queryFn: () => getSubCategoryBySlug(slug[1]),
        enabled: !!slug[1],
    });

    const { data: customFilter } = useQuery({
        queryKey: ['customFilter', slug[1]],
        queryFn: () => getCustomFilterBySlug(slug[1]),
        enabled: !!slug[1],
    });

    const onSetPage = async (page: number, more: boolean) => {
        const catalogData = await getCatalogData({
            ...getFilterBody({
                type: category?.title ?? '',
                subCategory: subCategory ? slug[1] : undefined,
                customFilter: customFilter ? slug[1] : undefined,
            }),
            page,
        });

        if (!catalogData) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });

        if (more) {
            queryClient.setQueryData(
                ['catalog', category.title, subCategory, slug[1], customFilter],
                (oldData: ICatalogData): ICatalogData => ({
                    count: oldData.count,
                    products: [...oldData.products, ...catalogData.products],
                    maxPrice: oldData.maxPrice,
                    minPrice: oldData.minPrice,
                }),
            );
        } else {
            queryClient.setQueryData(
                ['catalog', category.title, subCategory, slug[1], customFilter],
                () => catalogData,
            );
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
