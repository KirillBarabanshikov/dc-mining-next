'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import calculatorMini from '@/shared/assets/images/calculator/calculator-mini.png';

import styles from './CalculatorToast.module.scss';

interface ICalculatorToastProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorToast: FC<ICalculatorToastProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen) return <></>;

  return (
    <div className={styles.calculatorToastOverlay}>
      <div
        onClick={() => router.push('/calculator')}
        className={styles.calculatorToast}
      >
        <Image src={calculatorMini} alt={''} width={90} height={90} />
        <div className={styles.calculatorToastBody}>
          <div className={styles.calculatorToastTitle}>
            Калькулятор <span>доходности</span> оборудования
          </div>
          <div className={styles.calculatorToastSubtitle}>
            <DownloadIcon />
            <span>Скачать финансовую модель</span>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={styles.calculatorToastCloseOverlay}
        >
          <button className={styles.calculatorToastClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
