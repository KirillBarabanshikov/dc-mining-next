import { useEffect, useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { Dropdown, IconButton, Input } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';
import { IAsic } from '@/widgets/Calculator/types';

interface Props {
  className?: string;
  isEditBusinessDetails: boolean;
  matches: boolean;
  onAsicChange: (value: string[], index: number) => void;
  setAsicsCount: (count: number, index: number) => void;
  isEditingTouched: boolean;
  businessTotalPrice: number;
  businessInitialItems: IAsic[];
}

const CalculatorBusinessIsEditing: React.FC<Props> = ({
  matches,
  onAsicChange,
  setAsicsCount,
  businessInitialItems,
}) => {
  const { removeBusinessPackageAsic, businessPackageAsics, setReadyBusinessTotalPrice, readyBusinessTotalPrice } =
    useCalculatorStore();

  const [initialBusinessAsics, setInitialBusinessAsics] = useState<IAsic[]>([])

  const getTotalPowerConsumptionPerMonth = (asic: IAsic) => {
    const hoursInMonth = 24 * 30;
    return ((asic.watt * hoursInMonth) / 1000).toFixed(0);
  };

  useEffect(() => {
    const initialAsics = businessPackageAsics.map((asic) => ({
      ...asic,
      isInitial: true,
      initialCount: asic.count,
    }));
    setInitialBusinessAsics(initialAsics);
  }, []);

  useEffect(() => {
    console.log(businessPackageAsics)
  }, [])

  useEffect(() => {
    console.log(businessPackageAsics)
    console.log(initialBusinessAsics)
  }, [businessPackageAsics])

  const handleChange = (prevAsic: IAsic, newValue: string[], index: number) => {
    if (prevAsic.isInitial === undefined) {
      return
    }

    const newAsic = businessInitialItems.find((item) => item.id.toString() === newValue[0]);

    if (newAsic) {
      const updatedAsic = {
        ...newAsic,
        count: prevAsic.count,
        isInitial: false,
      };

      const updatedBusinessPackageAsics = [...businessPackageAsics];
      updatedBusinessPackageAsics[index] = updatedAsic;

      const priceDifference = prevAsic.count * prevAsic.price;
      const newPrice = updatedAsic.count * updatedAsic.price;

      setReadyBusinessTotalPrice(+readyBusinessTotalPrice - priceDifference + newPrice);

      onAsicChange([updatedAsic.id.toString()], index);
    }
  };

  return (
    <>
      <span className='calculatorFeature-packages-title'>Состав пакета</span>
      <div className='calculatorFeature-row'>
        <span className='calculatorFeature-description'>Модель</span>
        {!matches && (
          <span className='calculatorFeature-description'>Количество</span>
        )}
        {!matches && (
          <span className='calculatorFeature-description'>Расход кВт/мес.</span>
        )}
      </div>
      {businessPackageAsics.map((asic, index) => {
        const isInitialItem = asic.isInitial === undefined;
        const initialAsic = initialBusinessAsics.find(item => item.id === asic.id);

        return (<div
          key={asic.additionalId}
          className='calculatorFeature-row calculatorFeature-change-row'
        >
          <div className='calculatorFeature-col'>
            <Dropdown
              defaultValue={[asic ? businessInitialItems.some(item => item.id === asic.id) ? asic.id.toString() : asic.title : '29']}
              label={asic.title}
              items={businessInitialItems}
              hasIcon={false}
              searchable={!isInitialItem}
              onChange={(value) => handleChange(asic, value, index)}
            />
          </div>

          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>Количество</span>
            )}
            <div className='calculatorFeature-counts'>
              <IconButton
                  onClick={() => {
                    if (asic.count > 1 && (!asic.isInitial || (initialAsic && initialAsic.initialCount && asic.count > initialAsic.initialCount))) {
                      setAsicsCount(asic.count - 1, index);
                      setReadyBusinessTotalPrice(+readyBusinessTotalPrice - asic.price);
                    }
                  }}
                icon={<MinusIcon />}
                variant='outline'
                rounded
                disabled={asic.count === 1 || isInitialItem ? !(initialAsic && initialAsic.initialCount && asic.count > initialAsic.initialCount) : false }
              ></IconButton>
              <Input
                value={asic.count}
                onChange={(e) => {
                  setAsicsCount(Math.max(1, +e.target.value), index)
                  }
                }
                onBlur={() => setReadyBusinessTotalPrice(+readyBusinessTotalPrice + asic.price * asic.count)}
                className='calculatorFeature-count'
                sizes='md'
                type='number'
              />
              <IconButton
                onClick={() => {
                  setAsicsCount(asic.count + 1, index)
                  setReadyBusinessTotalPrice(+readyBusinessTotalPrice + asic.price)
                  }
                }
                icon={<PlusIcon />}
                variant='outline'
                rounded
              ></IconButton>
            </div>
          </div>

          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>Расход кВт/мес.</span>
            )}
            <div className='calculatorFeature-trash'>
              <div className='calculatorFeature-price'>
                <Input
                  value={getTotalPowerConsumptionPerMonth(asic)}
                  className='calculatorFeature-price-input'
                  sizes='md'
                  disabled
                />
              </div>
              {!isInitialItem && (
                  <IconButton
                      icon={<TrashIcon />}
                      onClick={() => {
                        removeBusinessPackageAsic(asic.additionalId)
                        setReadyBusinessTotalPrice(+readyBusinessTotalPrice - asic.price * asic.count)
                      }}
                      variant='outline'
                      rounded
                  />
              )}
            </div>
          </div>
        </div>
        )})}
    </>
  );
};

export default CalculatorBusinessIsEditing;
