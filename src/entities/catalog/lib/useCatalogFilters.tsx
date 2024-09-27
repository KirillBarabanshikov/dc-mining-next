'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { CHARACTERISTICS_KEYS } from '@/shared/consts';

import { IFilterParams } from '../model';

export const useCatalogFilters = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();

    useEffect(() => {
        const params = searchParams.toString();

        console.log('Search params changed:', params);

        const myParam = searchParams.get('profitable');
        console.log('profitable:', myParam);
    }, [searchParams]);

    const setSearchParams = () => {
        router.replace(`?${params}`, { scroll: false });
    };

    const setParams = ({ key, value }: { key: string; value: string[] }) => {
        if (value.length) {
            params.set(key, value.join(','));
        } else {
            params.delete(key);
        }
    };

    const getFilterBody = (type: string): IFilterParams => {
        const body: IFilterParams = {
            type,
        };
        const characteristics: string[] = [];

        if (searchParams.get('offers')) {
            body.tags = searchParams.get('offers') ?? '';
        }

        for (const [key, value] of params.entries()) {
            if (key === 'brand') continue;

            if (key in CHARACTERISTICS_KEYS) {
                characteristics.push(`${CHARACTERISTICS_KEYS[key]}=${value}`);
            }
        }

        if (characteristics.length) {
            body.characteristics = characteristics.join(';');
        }

        if (searchParams.get('brand')) {
            body.brand = searchParams.get('brand') ?? '';
        }

        if (searchParams.get('order')) {
            if (searchParams.get('order') === '1') {
                body.sortBy = 'popularity';
            }

            if (searchParams.get('order') === '2') {
                body.sortBy = 'discount';
            }

            if (searchParams.get('order') === '3') {
                body.sortBy = 'price';
                body.sortOrder = 'ASC';
            }

            if (searchParams.get('order') === '4') {
                body.sortBy = 'price';
                body.sortOrder = 'DESC';
            }
        } else {
            body.sortBy = 'popularity';
        }

        if (searchParams.get('profitable')) {
            body.profitable = true;
        }

        if (searchParams.get('powerful')) {
            body.powerful = true;
        }

        if (searchParams.get('filter')) {
            body.customFilters = searchParams.get('filter') ?? '';
        }

        return body;
    };

    const getCurrentPage = (): string => {
        return searchParams.get('page') ?? '1';
    };

    const resetFilters = () => {
        [...params.entries()].forEach(([key]) => {
            params.delete(key);
        });
        // const order = searchParams.get('order');
        // const filter = searchParams.get('filter');
        // setSearchParams({ ...(order && { order }), ...(filter && { filter }) });
        setSearchParams();
    };

    return { getCurrentPage, setParams, getFilterBody, params, setSearchParams, resetFilters };
};
