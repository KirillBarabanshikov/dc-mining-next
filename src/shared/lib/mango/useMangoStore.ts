import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

interface IMangoState {
    number?: string;
    setNumber: (number: string) => void;
}

export const useMangoStore = create<IMangoState>()(
    devtools((set) => ({
        setNumber: (number) => {
            set({ number });
        },
    })),
);
