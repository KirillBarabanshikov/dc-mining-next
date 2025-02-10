'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import calculatorMini from '@/shared/assets/images/calculator/calculator-mini.png';
import { useIsSafari } from '@/shared/lib';

import styles from './CalculatorToast.module.scss';

interface ICalculatorToastProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorToast: FC<ICalculatorToastProps> = ({
  isOpen,
  onClose,
}) => {
  const { isSafari } = useIsSafari();
  const router = useRouter();

  if (!isOpen) return <></>;

  return (
    <div className={styles.calculatorToastOverlay}>
      <div
        onClick={() => router.push('/calculator')}
        className={styles.calculatorToast}
      >
        {isSafari ? (
          <Image src={calculatorMini} alt={''} width={90} height={90} />
        ) : (
          <video autoPlay loop muted playsInline width={90} height={90}>
            <source src={'/animations/calculator.webm'} />
          </video>
        )}
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
