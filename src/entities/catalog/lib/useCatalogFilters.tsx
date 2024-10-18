'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ICatalogParams } from '@/entities/catalog/api/types';
import { CHARACTERISTICS_KEYS } from '@/shared/consts';

export const useCatalogFilters = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();

    const setSearchParams = () => {
        router.push(`?${params}`, { scroll: false });
    };

    const setParams = ({ key, value }: { key: string; value: string[] }) => {
        if (value.length) {
            params.set(key, value.join(','));
        } else {
            params.delete(key);
        }
    };

    const getFilterBody = (type: string, slug?: string[], brand?: string): ICatalogParams => {
        const body: ICatalogParams = {
            type: type,
        };

        if (slug) {
            body.type = slug.length === 1 ? type : 'slugCategory';
            body.brand = slug.length === 1 ? undefined : slug[slug.length - 1];
        }

        if (brand) {
            body.brand = brand;
        }

        const characteristics: string[] = [];

        if (params.get('offers')) {
            body.type = type;
            body.tags = params.get('offers') ?? '';
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

        if (params.get('brand')) {
            body.type = type;
            body.brand = params.get('brand') ?? '';
        }

        if (params.get('order')) {
            body.type = type;
            if (params.get('order') === '1') {
                body.sortBy = 'popularity';
            }

            if (params.get('order') === '2') {
                body.sortBy = 'discount';
            }

            if (params.get('order') === '3') {
                body.sortBy = 'price';
                body.sortOrder = 'ASC';
            }

            if (params.get('order') === '4') {
                body.sortBy = 'price';
                body.sortOrder = 'DESC';
            }
        } else {
            body.sortBy = 'popularity';
        }

        if (params.get('profitable')) {
            body.type = type;
            body.profitable = true;
        }

        if (params.get('powerful')) {
            body.type = type;
            body.powerful = true;
        }

        if (params.get('filter')) {
            body.type = type;
            body.customFilters = params.get('filter') ?? '';
        }

        if (params.get('page')) {
            body.type = type;
            body.page = params.get('page') ?? '1';
        }

        return body;
    };

    const resetFilters = () => {
        [...params.entries()].forEach(([key]) => {
            if (key === 'order' || key === 'filter') return;
            params.delete(key);
        });
    };

    return { setParams, getFilterBody, params, setSearchParams, resetFilters };
};
