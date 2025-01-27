import { useState } from 'react';

import MinusIcon from '@/shared/assets/icons/minus.svg';
import PlusIcon from '@/shared/assets/icons/plus.svg';
import TrashIcon from '@/shared/assets/icons/trash.svg';
import { formatter } from '@/shared/lib';
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
  isManager?: boolean;
}

const CalculatorBusinessIsEditing: React.FC<Props> = ({
  matches,
  onAsicChange,
  setAsicsCount,
  businessInitialItems,
  isManager,
}) => {
  const [isFocus, setIsFocus] = useState(-1);

  const {
    removeBusinessPackageAsic,
    businessPackageAsics,
    setReadyBusinessTotalPrice,
    readyBusinessTotalPrice,
    isNewPackage,
    selectedPackageId,
    setBusinessPackageAsics,
  } = useCalculatorStore();

  const getTotalPowerConsumptionPerMonth = (asic: IAsic) => {
    const hoursInMonth = 24 * 30;
    return ((asic.watt * hoursInMonth) / 1000).toFixed(0);
  };

  const handleChange = (prevAsic: IAsic, newValue: string[], index: number) => {
    if (prevAsic.isInitial === undefined && selectedPackageId !== 12345) {
      return;
    }

    const newAsic = businessInitialItems.find(
      (item) => item.id.toString() === newValue[0],
    );

    if (newAsic) {
      const updatedAsic = {
        ...newAsic,
        count: prevAsic.count,
        isInitial: true,
      };

      const updatedBusinessPackageAsics = [...businessPackageAsics];
      updatedBusinessPackageAsics[index] = updatedAsic;

      const priceDifference = prevAsic.count * prevAsic.price;
      const newPrice = updatedAsic.count * updatedAsic.price;

      if (readyBusinessTotalPrice !== 'по запросу') {
        setReadyBusinessTotalPrice(
          +readyBusinessTotalPrice - priceDifference + newPrice,
        );
      }

      onAsicChange([updatedAsic.id.toString()], index);
    }
  };

  const changeAsicPrice = (price: string, index: number) => {
    if (isNaN(+price)) return;
    const changedAsic = businessPackageAsics[index];
    const updatedAsic = { ...changedAsic, count: 1, price: +price };
    const newSelectedAsics = businessPackageAsics.map((asic, i) =>
      i === index ? updatedAsic : asic,
    );
    setBusinessPackageAsics(newSelectedAsics);
    const totalPrice = newSelectedAsics.reduce((prev, cur) => {
      return prev + cur.price * cur.count;
    }, 0);
    setReadyBusinessTotalPrice(totalPrice);
  };

  const changeAsicCount = (count: number, index: number) => {
    const changedAsic = businessPackageAsics[index];
    const updatedAsic = { ...changedAsic, count };
    const newSelectedAsics = businessPackageAsics.map((asic, i) =>
      i === index ? updatedAsic : asic,
    );
    setBusinessPackageAsics(newSelectedAsics);
    const totalPrice = newSelectedAsics.reduce((prev, cur) => {
      return prev + cur.price * cur.count;
    }, 0);
    setReadyBusinessTotalPrice(totalPrice);
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
          <span className='calculatorFeature-description'>
            {isManager ? 'Цена' : 'Расход кВт/мес.'}
          </span>
        )}
      </div>
      {businessPackageAsics.map((asic, index) => {
        const isInitialItem = asic.isInitial === undefined || asic.isInitial;

        return (
          <div
            key={asic.additionalId}
            className='calculatorFeature-row calculatorFeature-change-row'
          >
            <div className='calculatorFeature-col'>
              <Dropdown
                defaultValue={[
                  asic
                    ? businessInitialItems.some((item) => item.id === asic.id)
                      ? asic.id.toString()
                      : asic.title
                    : '29',
                ]}
                label={asic.title}
                items={businessInitialItems}
                hasIcon={false}
                searchable={true}
                onChange={(value) => handleChange(asic, value, index)}
                disabled={!isNewPackage}
              />
            </div>

            <div className='calculatorFeature-col'>
              {matches && (
                <span className='calculatorFeature-description'>
                  Количество
                </span>
              )}
              <div
                className={`${(isNewPackage && selectedPackageId === 12345) || isManager ? 'calculatorFeature-counts' : 'calculatorFeature-counts-none'} `}
              >
                {((isNewPackage && selectedPackageId === 12345) ||
                  isManager) && (
                  <IconButton
                    onClick={() => {
                      if (asic.count > 1) {
                        changeAsicCount(asic.count - 1, index);
                        setAsicsCount(asic.count - 1, index);
                        if (readyBusinessTotalPrice !== 'по запросу') {
                          setReadyBusinessTotalPrice(
                            +readyBusinessTotalPrice - asic.price,
                          );
                        }
                      }
                    }}
                    icon={<MinusIcon />}
                    variant='outline'
                    rounded
                    disabled={asic.count === 1}
                  />
                )}
                <Input
                  disabled
                  value={asic.count}
                  onChange={(e) => {
                    setAsicsCount(Math.max(1, +e.target.value), index);
                  }}
                  onBlur={() =>
                    setReadyBusinessTotalPrice(
                      +readyBusinessTotalPrice + asic.price * asic.count,
                    )
                  }
                  className='calculatorFeature-count'
                  sizes='md'
                  type='number'
                />
                {((isNewPackage && selectedPackageId === 12345) ||
                  isManager) && (
                  <IconButton
                    onClick={() => {
                      changeAsicCount(asic.count + 1, index);
                      setAsicsCount(asic.count + 1, index);
                      if (readyBusinessTotalPrice !== 'по запросу') {
                        setReadyBusinessTotalPrice(
                          +readyBusinessTotalPrice + asic.price,
                        );
                      }
                    }}
                    icon={<PlusIcon />}
                    variant='outline'
                    rounded
                  />
                )}
              </div>
            </div>

            <div className='calculatorFeature-col'>
              {matches && (
                <span className='calculatorFeature-description'>
                  {isManager ? 'Цена' : 'Расход кВт/мес.'}
                </span>
              )}
              <div className='calculatorFeature-trash'>
                <div className='calculatorFeature-price'>
                  {isManager ? (
                    <Input
                      value={
                        isFocus === index
                          ? asic.price * asic.count
                          : formatter.format(asic.price * asic.count)
                      }
                      onChange={(e) => changeAsicPrice(e.target.value, index)}
                      className='calculatorFeature-price-input'
                      sizes='md'
                      onFocus={() => setIsFocus(index)}
                      onBlur={() => setIsFocus(-1)}
                    />
                  ) : (
                    <Input
                      value={getTotalPowerConsumptionPerMonth(asic)}
                      className='calculatorFeature-price-input'
                      sizes='md'
                      disabled
                    />
                  )}
                </div>
                {!isInitialItem && isNewPackage && (
                  <IconButton
                    icon={<TrashIcon />}
                    onClick={() => {
                      removeBusinessPackageAsic(asic.additionalId);
                      if (readyBusinessTotalPrice !== 'по запросу') {
                        setReadyBusinessTotalPrice(
                          +readyBusinessTotalPrice - asic.price * asic.count,
                        );
                      }
                    }}
                    variant='outline'
                    rounded
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CalculatorBusinessIsEditing;
