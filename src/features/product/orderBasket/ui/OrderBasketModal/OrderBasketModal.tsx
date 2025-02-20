import { FC } from 'react';

import { IProduct } from '@/entities/product';
import { Modal } from '@/shared/ui';

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'Оформление заказа'}
      subtitle={'Оставьте контактные данные и мы свяжемся с вами'}
    >
      <OrderBasketForm onClose={onClose} products={products} />
    </Modal>
  );
};
