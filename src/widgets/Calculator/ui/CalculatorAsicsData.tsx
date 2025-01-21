import { useEffect, useState } from 'react';

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
  asics: IAsic[];
  onAsicChange: (value: string[], index: number) => void;
  setAsicsCount: (count: number, index: number) => void;
  isEditingTouched: boolean;
  businessTotalPrice: number;
  isManager: boolean;
}

const CalculatorAsicsData: React.FC<Props> = ({
  matches,
  onAsicChange,
  setAsicsCount,
  isManager,
}) => {
  const {
    calculatorType,
    asics,
    selectedAsics,
    removeSelectedAsics,
    businessPackages,
    setBusinessPackageAsics,
    setSelectedPackageId,
    setReadyBusinessTotalPrice,
    readyBusinessTotalPrice,
    isNewPackage,
    setSelectedAsics,
  } = useCalculatorStore();
  const [isFocus, setIsFocus] = useState(false);

  const getTotalPowerConsumptionPerMonth = (asic: IAsic) => {
    const hoursInMonth = 24 * 30;
    return ((asic.watt * asic.count * hoursInMonth) / 1000).toFixed(0);
  };

  const handlePackageChange = (packageId: number) => {
    const selectedPackage = businessPackages.find(
      (pkg) => pkg.id === packageId,
    );
    console.log(businessPackages);
    setSelectedPackageId(packageId);
    // if (packageId !== 12345) {
    //   setIsNewPackage(false)
    // }
    if (selectedPackage) {
      const packageAsics = selectedPackage.productAdd.map((item) => ({
        ...item.productAsics,
        count: item.productAsics.count,
        additionalId: item.productAsics.id.toString(),
      }));

      const hasNullPrice = packageAsics.some((asic) => asic.price === null);

      if (hasNullPrice) {
        setReadyBusinessTotalPrice('по запросу');
      } else {
        console.log(selectedPackage);
        setReadyBusinessTotalPrice(selectedPackage.price);
      }

      if (selectedPackage.id === 12345) {
        setReadyBusinessTotalPrice(selectedAsics[0].price);
      }

      setBusinessPackageAsics(packageAsics);
    }
  };

  const onAsicPriceChange = (price: string, index: number) => {
    const changedAsic = selectedAsics[index];
    const updatedAsic = { ...changedAsic, count: 1, price: +price };
    const newSelectedAsics = selectedAsics.map((asic, i) =>
      i === index ? updatedAsic : asic,
    );
    setSelectedAsics(newSelectedAsics);
  };

  useEffect(() => {
    console.log(readyBusinessTotalPrice);
  }, [readyBusinessTotalPrice]);

  return selectedAsics.map((asic, index) => (
    <div key={asic.additionalId}>
      <div key={asic.additionalId} className='calculatorFeature-row'>
        {calculatorType === 2 && (
          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>Пакет</span>
            )}
            <div className='calculatorFeature-models'>
              {!isNewPackage && (
                <Dropdown
                  searchable={true}
                  items={[
                    { label: 'Не выбрано', value: '' },
                    ...businessPackages.map((pkg) => ({
                      label: pkg.title,
                      value: pkg.id.toString(),
                    })),
                  ]}
                  defaultValue={['']}
                  hasIcon={false}
                  onChange={(value) => handlePackageChange(Number(value[0]))}
                />
              )}
              {isNewPackage && (
                <Dropdown
                  searchable={true}
                  items={[
                    ...businessPackages.map((pkg) => ({
                      label: pkg.title,
                      value: pkg.id.toString(),
                    })),
                  ]}
                  defaultValue={['12345']}
                  hasIcon={false}
                  onChange={(value) => handlePackageChange(Number(value[0]))}
                />
              )}
            </div>
          </div>
        )}

        {calculatorType !== 2 && (
          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>
                {calculatorType === 2 ? 'Оборудование' : 'Модель'}
              </span>
            )}

            <div className='calculatorFeature-models'>
              <Dropdown
                searchable={true}
                defaultValue={[asic.value]}
                items={asics}
                hasIcon={false}
                onChange={(value) => onAsicChange(value, index)}
              />
            </div>
          </div>
        )}

        {calculatorType !== 2 && (
          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>Количество</span>
            )}
            <div className='calculatorFeature-counts'>
              <IconButton
                onClick={() => setAsicsCount(--asic.count, index)}
                icon={<MinusIcon />}
                variant='outline'
                rounded
                disabled={asic.count === 1}
              />
              <Input
                value={asic.count}
                onChange={(e) => setAsicsCount(+e.target.value, index)}
                className='calculatorFeature-count'
                sizes='md'
                type='number'
              />
              <IconButton
                onClick={() => setAsicsCount(++asic.count, index)}
                icon={<PlusIcon />}
                variant='outline'
                rounded
              />
            </div>
          </div>
        )}

        {calculatorType === 3 && (
          <div className='calculatorFeature-col'>
            {matches && (
              <span className='calculatorFeature-description'>
                Расход кВт/мес.
              </span>
            )}
            <div className='calculatorFeature-trash'>
              <span>{getTotalPowerConsumptionPerMonth(asic)}</span>
              <IconButton
                icon={<TrashIcon />}
                onClick={() => removeSelectedAsics(asic.additionalId)}
                variant='outline'
                rounded
              />
            </div>
          </div>
        )}

        <div className='calculatorFeature-col'>
          {matches && (
            <>
              {calculatorType !== 3 && (
                <span className='calculatorFeature-description'>Цена</span>
              )}
            </>
          )}
          {calculatorType !== 3 && (
            <div className='calculatorFeature-price'>
              <Input
                value={
                  calculatorType === 2
                    ? readyBusinessTotalPrice !== 'по запросу'
                      ? formatter.format(+readyBusinessTotalPrice)
                      : 'По запросу'
                    : isFocus
                      ? asic.price * asic.count
                      : formatter.format(asic.price * asic.count)
                }
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                className='calculatorFeature-price-input'
                sizes='md'
                disabled={!isManager}
                onChange={(e) => onAsicPriceChange(e.target.value, index)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ));
};

export default CalculatorAsicsData;
