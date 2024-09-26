import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IProduct } from '../model';

interface IFavoritesState {
    favorites: IProduct[];
    addToFavorite: (product: IProduct) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<IFavoritesState>()(
    devtools(
        persist(
            (set, get) => ({
                favorites: [],
                addToFavorite: (product) => {
                    const currentFavorites = get().favorites;
                    set({ favorites: [...currentFavorites, product] });
                },
                removeFromFavorites: (productId) => {
                    const updatedFavorites = get().favorites.filter((item) => item.id !== productId);
                    set({ favorites: updatedFavorites });
                },
                isFavorite: (productId) => {
                    return get().favorites.some((item) => item.id === productId);
                },
                clearFavorites: () => set({ favorites: [] }),
            }),
            {
                name: 'favorites',
            },
        ),
    ),
);

interface ICompareState {
    compare: number[];
    addToCompare: (productId: number) => void;
    removeFromCompare: (productId: number) => void;
    isCompare: (productId: number) => boolean;
    clearCompare: () => void;
}

export const useCompareStore = create<ICompareState>()(
    devtools(
        persist(
            (set, get) => ({
                compare: [],
                addToCompare: (productId) => {
                    const currentCompare = get().compare;
                    set({ compare: [...currentCompare, productId] });
                },
                removeFromCompare: (productId) => {
                    const updatedCompare = get().compare.filter((id) => id !== productId);
                    set({ compare: updatedCompare });
                },
                isCompare: (productId) => {
                    return get().compare.some((id) => id === productId);
                },
                clearCompare: () => set({ compare: [] }),
            }),
            {
                name: 'compare',
            },
        ),
    ),
);

interface IRecentState {
    recent: IProduct[];
    addToRecent: (product: IProduct) => void;
}

export const useRecentStore = create<IRecentState>()(
    devtools(
        persist(
            (set, get) => ({
                recent: [],
                addToRecent: (product) => {
                    let recentProducts = get().recent;

                    if (recentProducts.find((item) => item.id === product.id)) {
                        recentProducts = recentProducts.filter((item) => item.id !== product.id);
                    }

                    if (recentProducts.length >= 10) {
                        recentProducts = recentProducts.slice(0, -1);
                    }

                    set({ recent: [product, ...recentProducts] });
                },
            }),
            {
                name: 'recent',
            },
        ),
    ),
);
