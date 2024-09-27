import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

import { ICategory } from '@/entities/category';
import { IProduct } from '@/entities/product';

interface ICatalogState {
    viewMode: 'tile' | 'simple';
    countProducts: number;
    products: IProduct[];
    category?: ICategory | undefined;
    setViewMode: (viewMode: 'tile' | 'simple') => void;
    setCountProducts: (countProducts: number) => void;
    setProducts: (products: IProduct[]) => void;
    setCategory: (category: ICategory) => void;
}

export const useCatalogStore = create<ICatalogState>()(
    devtools(
        (set) => ({
            viewMode: 'tile',
            countProducts: 0,
            products: [],
            category: undefined,
            setViewMode: (viewMode) => set({ viewMode }),
            setCountProducts: (countProducts) => set({ countProducts }),
            setProducts: (products) => set({ products }),
            setCategory: (category) => set({ category }),
        }),
        {
            name: 'catalog',
        },
    ),
);
