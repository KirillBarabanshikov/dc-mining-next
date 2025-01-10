import { FC, useEffect, useState } from 'react';

import { IProduct } from '@/entities/product';
import { Modal, StateModal } from '@/shared/ui';
import { IAsic, IPackage } from '@/widgets/Calculator/types';

import { OrderProductForm } from '../OrderProductForm';

interface IOrderProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: IProduct | IAsic | IPackage;
  isMultiple?: boolean;
  additionalProducts?: IAsic[];
  variant?: 'product' | 'calculator';
  generatePdfData?: () => any;
}

export const OrderProductModal: FC<IOrderProductModalProps> = ({
  isOpen,
  onClose,
  product,
  isMultiple,
  additionalProducts,
  variant = 'product',
  generatePdfData,
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
      title={isFinally ? undefined : 'Заказать продукт'}
      subtitle={
        isFinally
          ? undefined
          : 'Оставьте контактные данные и укажите количество устройств'
      }
    >
      {isFinally ? (
        <StateModal onClose={onClose} isError={isError} />
      ) : (
        <OrderProductForm
          onClose={onClose}
          product={product}
          isMultiple={isMultiple}
          additionalProducts={additionalProducts}
          setIsFinally={(value) => setIsFinally(value)}
          setIsError={(value) => setIsError(value)}
          variant={variant}
          generatePdfData={generatePdfData}
        />
      )}
    </Modal>
  );
};
