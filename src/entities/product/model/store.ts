import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IFavoritesState {
    favorites: number[];
    addToFavorite: (productId: number) => void;
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
                    set({ favorites: [product, ...currentFavorites] });
                },
                removeFromFavorites: (productId) => {
                    const updatedFavorites = get().favorites.filter((id) => id !== productId);
                    set({ favorites: updatedFavorites });
                },
                isFavorite: (productId) => {
                    return get().favorites.some((id) => id === productId);
                },
                clearFavorites: () => set({ favorites: [] }),
            }),
            {
                name: 'favorites-products',
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
                    set({ compare: [productId, ...currentCompare] });
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
    recent: number[];
    addToRecent: (productId: number) => void;
}

export const useRecentStore = create<IRecentState>()(
    devtools(
        persist(
            (set, get) => ({
                recent: [],
                addToRecent: (productId) => {
                    let recentProducts = get().recent;

                    if (recentProducts.find((id) => id === productId)) {
                        recentProducts = recentProducts.filter((id) => id !== productId);
                    }

                    if (recentProducts.length >= 10) {
                        recentProducts = recentProducts.slice(0, -1);
                    }

                    set({ recent: [productId, ...recentProducts] });
                },
            }),
            {
                name: 'recent-products',
            },
        ),
    ),
);
