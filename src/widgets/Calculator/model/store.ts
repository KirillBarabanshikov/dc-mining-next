import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

import { IAsic } from '../types';

// const data: IAsic[] = [
//   {
//     id: 1,
//     title: 'Elphapex DG1 11G',
//     label: 'Elphapex DG1 11G',
//     value: '1',
//     price: 549328,
//     profitDayAll: 1402.21,
//     watt: 3247,
//     count: 1,
//     additionalId: '123',
//   },
//   {
//     id: 2,
//     title: 'Bitmain Antminer S21 188 Th/s',
//     label: 'Bitmain Antminer S21 188 Th/s',
//     value: '2',
//     price: 402164,
//     profitDayAll: 792.82,
//     watt: 3247,
//     count: 1,
//     additionalId: '1234',
//   },
// ];

interface ICalculatorState {
  calculatorType: number;
  calculatorTypes: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
  electricityCoast: number;
  asics: IAsic[];
  selectedAsics: IAsic[];
  setAsics: (asics: IAsic[]) => void;
  setSelectedAsics: (selectedAsics: IAsic[]) => void;
  setCalculatorType: (type: number) => void;
  setElectricityCoast: (coast: number) => void;
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
    electricityCoast: 5.5,
    asics: [],
    selectedAsics: [],
    setAsics: (asics) => {
      return set({ asics });
    },
    setCalculatorType: (calculatorType) => set({ calculatorType }),
    setSelectedAsics: (selectedAsics) => {
      return set({ selectedAsics });
    },
    setElectricityCoast: (electricityCoast) => {
      return set({ electricityCoast });
    },
  })),
);
