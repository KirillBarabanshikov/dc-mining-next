import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IProduct } from '../model';

interface IProductsState {
    favorites: IProduct[];
    addToFavorite: (product: IProduct) => void;
    removeFromFavorites: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
}

export const useProductsStore = create<IProductsState>()(
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
            }),
            {
                name: 'products-store',
            },
        ),
    ),
);
