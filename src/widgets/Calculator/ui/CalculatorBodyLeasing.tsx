import { useState } from 'react';

import { OrderCallModal } from '@/features/call';
import { Button } from '@/shared/ui';

const CalculatorBodyLeasing = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='leasing-info calculator-card leasing'>
      <div className='leasing-img'>
        <div className='leasing-content'>
          <h2 className='leasing-content-header'>
            Хотите получить <br /> оборудование <span>в лизинг?</span>
          </h2>
          <p className='leasing-content-description'>
            Оставьте заявку, мы подберем лучшее предложение
          </p>
          <Button variant='solid' size='lg' onClick={() => setIsOpen(true)}>
            Оставить заявку
          </Button>
        </div>
      </div>
      <OrderCallModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </div>
  );
};

export default CalculatorBodyLeasing;
