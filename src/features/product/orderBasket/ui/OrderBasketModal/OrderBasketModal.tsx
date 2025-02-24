import { FC, useEffect, useState } from 'react';

import { IProduct } from '@/entities/product';
import { Modal, StateModal } from '@/shared/ui';

import { OrderBasketForm } from '../OrderBasketForm';

interface IOrderBasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: IProduct[];
}

export const OrderBasketModal: FC<IOrderBasketModalProps> = ({
  isOpen,
  onClose,
  products,
}) => {
  const [isFinally, setIsFinally] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsFinally(false);
    setIsError(false);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isFinally ? undefined : 'Оформление заказа'}
      subtitle={
        isFinally
          ? undefined
          : 'Оставьте контактные данные и мы свяжемся с вами'
      }
    >
      {isFinally ? <StateModal onClose={onClose} isError={isError} /> : <OrderBasketForm onClose={onClose} products={products} setIsError={(value) => setIsError(value)} setIsFinally={(value) => setIsFinally(value)} />}
    </Modal>
  );
};
