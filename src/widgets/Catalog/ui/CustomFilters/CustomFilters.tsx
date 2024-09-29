'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC } from 'react';

import { getCatalogData, getCustomFilters } from '@/entities/catalog';
import { useCatalogFilters } from '@/entities/catalog/lib';
import { ICategory } from '@/entities/category';

import styles from './CustomFilters.module.scss';

interface ICustomFiltersProps {
    category: ICategory;
    className?: string;
}

export const CustomFilters: FC<ICustomFiltersProps> = ({ category, className }) => {
    const { setParams, params, setSearchParams, getFilterBody } = useCatalogFilters();
    const queryClient = useQueryClient();

    const { data: customFilters } = useQuery({
        queryKey: ['custom-filters'],
        queryFn: getCustomFilters,
        staleTime: Infinity,
    });

    const handleSelect = async (value: string) => {
        if (params.get('filter') === value) {
            setParams({ key: 'filter', value: [] });
        } else {
            setParams({ key: 'filter', value: [value] });
        }
        params.delete('page');
        setSearchParams();
        const catalogData = await getCatalogData({ ...getFilterBody(category.title) });
        queryClient.setQueryData(['catalog', category.title], () => catalogData);
    };

    return (
        <div className={clsx(styles.receipts, 'scrollbar-hide', className)}>
            {customFilters &&
                customFilters
                    .filter((filter) => filter.productCategoryTitle === category?.title)
                    .map((filter) => (
                        <div
                            key={filter.id}
                            onClick={() => handleSelect(filter.title)}
                            className={clsx(styles.receipt, params.get('filter') === filter.title && styles.active)}
                        >
                            {filter.title}
                        </div>
                    ))}
        </div>
    );
};
