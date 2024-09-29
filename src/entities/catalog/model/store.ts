import { create } from 'zustand/index';
import { devtools, persist } from 'zustand/middleware';

interface ICatalogState {
    viewMode: 'tile' | 'simple';
    setViewMode: (viewMode: 'tile' | 'simple') => void;
}

export const useCatalogStore = create<ICatalogState>()(
    devtools(
        persist(
            (set) => ({
                viewMode: 'tile',
                setViewMode: (viewMode) => set({ viewMode }),
            }),
            {
                name: 'catalog',
            },
        ),
    ),
);
