import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

interface ICalculatorState {
  calculatorType: number;
  setCalculatorType: (type: number) => void;
  calculatorTypes: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
  electricityValue: number;
}

export const useCalculatorStore = create<ICalculatorState>()(
  devtools((set) => ({
    calculatorType: 1,
    calculatorTypes: [
      {
        id: 1,
        title: 'По моделям',
        onClick: () => {
          set({ calculatorType: 1 });
        },
      },
      {
        id: 2,
        title: 'Готовый бизнес',
        onClick: () => {
          set({ calculatorType: 2 });
        },
      },
      {
        id: 3,
        title: 'Дата центр',
        onClick: () => {
          set({ calculatorType: 3 });
        },
      },
      {
        id: 4,
        title: 'Лизинг',
        onClick: () => {
          set({ calculatorType: 4 });
        },
      },
    ],
    electricityValue: 5.5,
    setCalculatorType: (calculatorType) => set({ calculatorType }),
  })),
);
