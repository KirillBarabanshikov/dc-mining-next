import Image from 'next/image';
import { useState } from 'react';

import { OrderCallModal } from '@/features/call';
import { OrderProductModal } from '@/features/product';
import sale from '@/shared/assets/images/calculator/sale-side.png';
import { Button } from '@/shared/ui';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';

interface Props {
  totalConsumption: string | number;
  electricityConsumption: string | number;
  profitWithoutElectricity: string | number;
  profitWithElectricity: string | number;
  paybackWithElectricity: string | number;
  paybackWithoutElectricity: string | number;
  totalConsumptonGuests: string | number;
  totalPriceGuests: string | number;
  totalConsumptionDataCenter: string;
}

export const CalculatorTotal: React.FC<Props> = ({
  totalConsumption,
  electricityConsumption,
  profitWithoutElectricity,
  profitWithElectricity,
  paybackWithElectricity,
  paybackWithoutElectricity,
  totalPriceGuests,
}) => {
  const {
    calculatorType,
    selectedAsics,
    electricityCoast,
    businessPackages,
    selectedPackageId,
    readyBusinessTotalPrice
  } = useCalculatorStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const getProductForModal = () => {
    if (calculatorType !== 2) {
      return selectedAsics[0];
    } else {
      const selectedPackage = businessPackages.find(
        (pkg) => pkg.id === selectedPackageId,
      );

      // let selectedPackageCopy;

      // if (businessPackageAsics.slice(1).length > 0) {
        // selectedPackageCopy = structuredClone(selectedPackage)
        // selectedPackageCopy?.productAdd[0].productAsics.push(businessPackageAsics[1])
      // }

      if (selectedPackage) {
        selectedPackage.price = readyBusinessTotalPrice
      }

      return selectedPackage || businessPackages[0];
    }
  };

  const getAdditionalProducts = () => {
    if (calculatorType === 3) {
      return selectedAsics.slice(1);
    }
    return [];
  };

  const handleOpenOrderModal = () => {
    const product = getProductForModal();
    if (product) {
      setIsOrderModalOpen(true);
    }
  };

  return (
    <div className='calculator-card calculatorTotal'>
      {calculatorType !== 4 && calculatorType !== 3 && (
        <>
          <div className='calculatorTotal-subtitle'>Характеристики</div>
          <div className='calculatorTotal-list'>
            <div className='calculatorTotal-item'>
              <span>Общее потребление, кВт в месяц</span>
              <span>{totalConsumption}</span>
            </div>
            <div className='calculatorTotal-item'>
              <span>Расход на э/э в месяц, ₽</span>
              <span>{electricityConsumption}</span>
            </div>
            <div className='calculatorTotal-item'>
              <span>Прибыль без учета э/э, мес</span>
              <span>{profitWithoutElectricity}</span>
            </div>
            <div className='calculatorTotal-item'>
              <span>Прибыль с учетом э/э, мес</span>
              <span>{profitWithElectricity}</span>
            </div>
          </div>
          <div className='calculatorTotal-subtitle'>Окупаемость</div>
          <div className='calculatorTotal-list'>
            <div className='calculatorTotal-item'>
              <span>Без учета э/э, мес</span>
              <span>{paybackWithoutElectricity}</span>
            </div>
            <div className='calculatorTotal-item'>
              <span>С учетом э/э, мес</span>
              <span>{paybackWithElectricity}</span>
            </div>
          </div>
          <div className='calculatorTotal-btns'>
            <Button
              disabled={calculatorType === 2 && !selectedPackageId}
              theme='pink'
              isWide
              onClick={handleOpenOrderModal}
            >
              Оставить заявку
            </Button>
          </div>
        </>
      )}
      {calculatorType === 4 && (
        <>
          <div className='calculatorTotal-list'>
            <div className='calculatorTotal-item calculatorTotal-item-leasing'>
              <span>Срок</span>
              <span>От 1 до 2 лет</span>
            </div>
            <div className='calculatorTotal-item calculatorTotal-item-leasing'>
              <span> Сумма</span>
              <span>от 600 000 ₽</span>
            </div>
            <div className='calculatorTotal-item calculatorTotal-item-leasing'>
              <span>Первоначальный взнос</span>
              <span>от 20%</span>
            </div>
            <div className='calculatorTotal-item calculatorTotal-item-leasing'>
              <span>Для кого</span>
              <span>Юридические лица</span>
            </div>
          </div>
        </>
      )}
      {calculatorType === 3 && (
        <>
          <div className='calculatorTotal-subtitle'>Наше предложение</div>
          <div className='calculatorTotal-subtitle-dataCenter'>
            <span>То, что важно</span>
            <span>Всем клиентам</span>
            <span>Для DC Mining</span>
          </div>
          <div className='calculatorTotal-list'>
            <div className='calculatorTotal-item calculatorTotal-item-dataCenter'>
              <span>Тариф, ₽ кВт/час</span>
              <span>{(+electricityCoast + +electricityCoast * 0.1).toFixed(2)}</span>
              <span>
                <span className='calculatorTotal-item-dataCenter-old'>
                  {(+electricityCoast + +electricityCoast * 0.1).toFixed(2)}
                </span>{' '}
                <span className='calculatorTotal-item-dataCenter-new'>
                  {electricityCoast}
                </span>
              </span>
              <div className='sale-image'>
                <span className='sale-badge'>
                  <span className='sale-badge-discount'>Скидка</span> <br />{' '}
                  <span className='sale-badge-percent'>-10%</span>
                </span>
                <Image src={sale} alt='sale image' />
              </div>
            </div>
            <div className='calculatorTotal-item calculatorTotal-item-dataCenter'>
              <span>
                Общее потребление в <br /> месяц, кВт
              </span>
              <span>{totalConsumption}</span>
              <span style={{fontWeight: 700}}>{totalConsumption}</span>
            </div>
            <div className='calculatorTotal-item calculatorTotal-item-dataCenter'>
              <span>Ежемесячные расходы, ₽</span>
              <span>{totalPriceGuests}</span>
              <span>
                <span className='calculatorTotal-item-dataCenter-old'>
                  {totalPriceGuests}
                </span>{' '}
                <span className='calculatorTotal-item-dataCenter-new'>
                  {electricityConsumption}
                </span>
              </span>
              <div className='sale-image'>
                <span className='sale-badge'>
                  <span className='sale-badge-discount'>Скидка</span> <br />{' '}
                  <span className='sale-badge-percent'>-10%</span>
                </span>
                <Image src={sale} alt='sale image' />
              </div>
            </div>
          </div>
          <div className='calculatorTotal-btns'>
            <Button theme='pink' isWide onClick={handleOpenOrderModal}>
              Получить скидку
            </Button>
          </div>
        </>
      )}
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
      <OrderProductModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={getProductForModal()}
        isMultiple={calculatorType === 3}
        additionalProducts={getAdditionalProducts()}
      />
    </div>
  );
};
