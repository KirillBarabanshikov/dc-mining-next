import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand/index';
import { devtools } from 'zustand/middleware';

import { IAsic, IPackage } from '../types';

interface ICalculatorState {
  calculatorType: number;
  calculatorTypes: {
    id: number;
    title: string;
    onClick: () => void;
  }[];
  electricityCoast: number | string;
  readyBusinessAsics: IAsic[];
  setReadyBusinessAsics: (readyBusinessAsics: IAsic[]) => void;
  asics: IAsic[];
  selectedAsics: IAsic[];
  setAsics: (asics: IAsic[]) => void;
  setSelectedAsics: (selectedAsics: IAsic[]) => void;
  setCalculatorType: (type: number) => void;
  setElectricityCoast: (coast: number | string) => void;
  addSelectedAsics: (asic: IAsic) => void;
  removeSelectedAsics: (additionalId: string) => void;
  addReadyBusinessAsic: (asic: IAsic) => void;
  removeReadyBusinessAsic: (additionalId: string) => void;
  businessPackageAsics: IAsic[];
  setBusinessPackageAsics: (asics: IAsic[]) => void;
  addBusinessPackageAsic: () => void;
  removeBusinessPackageAsic: (additionalId: string) => void;
  businessPackages: IPackage[];
  setBusinessPackages: (packages: IPackage[]) => void;
  selectedPackageId: number | null;
  setSelectedPackageId: (id: number | null) => void;
  // changeBusinessPackages: (packages: IPackage) => void;
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
    readyBusinessAsics: [],
    businessPackageAsics: [],
    businessPackages: [],
    selectedPackageId: null,
    setSelectedPackageId: (id) => set({ selectedPackageId: id }),
    setBusinessPackages: (packages) => set({ businessPackages: packages }),
    // changeBusinessPackages: (packages) => {set({ businessPackages: packages }); },
    setBusinessPackageAsics: (asics) => set({ businessPackageAsics: asics }),
    addBusinessPackageAsic: () => {
      set((state) => {
        if (state.readyBusinessAsics.length > 0) {
          return {
            businessPackageAsics: [
              ...state.businessPackageAsics,
              {
                ...state.readyBusinessAsics[0],
                additionalId: uuidv4(),
                count: 1,
              },
            ],
          };
        }
        return state;
      });
    },
    removeBusinessPackageAsic: (additionalId) => {
      set((state) => ({
        businessPackageAsics: state.businessPackageAsics.filter(
          (asic) => asic.additionalId !== additionalId,
        ),
      }));
    },
    setAsics: (asics) => {
      return set({ asics });
    },
    setReadyBusinessAsics: (readyBusinessAsics) => {
      return set({ readyBusinessAsics });
    },
    addReadyBusinessAsic: (asic) => {
      set((state) => {
        if (state.selectedAsics.length === 0) {
          const newAsic = {
            ...asic,
            additionalId: uuidv4(),
          };
          return { selectedAsics: [newAsic] };
        }

        const updatedSelectedAsics = state.selectedAsics.map(
          (existingAsic) => ({
            ...existingAsic,
            additionalId: existingAsic.additionalId,
          }),
        );

        const newAsic = {
          ...asic,
          additionalId: uuidv4(),
          count: 1,
        };

        console.log(state.selectedAsics);

        return {
          selectedAsics: [...updatedSelectedAsics, newAsic],
        };
      });
    },
    removeReadyBusinessAsic: (additionalId) => {
      set((state) => ({
        selectedAsics: state.selectedAsics.filter(
          (asic) => asic.additionalId !== additionalId,
        ),
      }));
    },
    setCalculatorType: (calculatorType) => set({ calculatorType }),
    setSelectedAsics: (selectedAsics) => {
      return set({ selectedAsics });
    },
    addSelectedAsics: (asic: IAsic) => {
      const newSelectedAsic = {
        ...asic,
        additionalId: uuidv4(),
        count: 1,
      };

      set((state) => ({
        selectedAsics: [...state.selectedAsics, newSelectedAsic],
      }));
    },

    removeSelectedAsics: (additionalId: string) => {
      console.log('Removing ASIC with ID:', additionalId);
      set((state) => ({
        selectedAsics: state.selectedAsics.filter(
          (asic) => asic.additionalId !== additionalId,
        ),
      }));
    },
    setElectricityCoast: (electricityCoast) => {
      return set({ electricityCoast });
    },
  })),
);
