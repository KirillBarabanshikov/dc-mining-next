import Image from 'next/image';

import PlusIcon from '@/shared/assets/icons/plus.svg';

export const CalculatorProductRow = () => {
  return (
    <div className={'calculator-table__product-row'}>
      <div className={'calculator-table__product-row-cell'}>
        <div className={'calculator-table__product-row-title'}>
          Bitmain Antminer S21 Pro 234 Th/s
        </div>
        <div className={'calculator-table__product-row-info'}>
          <div>
            <div className={'calculator-table__product-row-key'}>Алгоритм</div>
            <div className={'calculator-table__product-row-value'}>SHA-256</div>
          </div>
          <div>
            <div className={'calculator-table__product-row-key'}>
              Потребление, Вт.
            </div>
            <div className={'calculator-table__product-row-value'}>3520</div>
          </div>
        </div>
      </div>
      <div className={'calculator-table__product-row-value'}>234</div>
      <div className={'calculator-table__product-row-value'}>439 805, 00 ₽</div>
      <CalculatorProductCoins />
      <div className={'calculator-table__product-row-values'}>
        <div className={'calculator-table__product-row-value'}>25 300,65 ₽</div>
        <div className={'calculator-table__product-row-value'}>11 361,45 ₽</div>
        <div className={'calculator-table__product-row-value'}>17</div>
        <div className={'calculator-table__product-row-value'}>39</div>
      </div>
      <button className={'calculator-table__product-row-button'}>
        <PlusIcon />
      </button>
    </div>
  );
};

const CalculatorProductCoins = () => {
  return (
    <div className={'calculator-table__coins'}>
      <div className={'calculator-table__coin'}>
        <div className={'calculator-table__coin-wrap'}>
          <Image
            src={'/btc.png'}
            alt={''}
            width={20}
            height={20}
            className={'calculator-table__coin-image'}
          />
          <div className={'calculator-table__coin-title'}>BTC</div>
        </div>
        <div className={'calculator-table__coin-value'}>0,003631925</div>
        <div className={'calculator-table__coin-value'}>25 285,05 ₽</div>
      </div>
      <div className={'calculator-table__coin'}>
        <div className={'calculator-table__coin-wrap'}>
          <Image
            src={'/btc.png'}
            alt={''}
            width={20}
            height={20}
            className={'calculator-table__coin-image'}
          />
          <div className={'calculator-table__coin-title'}>BTC</div>
        </div>
        <div className={'calculator-table__coin-value'}>0,003631925</div>
        <div className={'calculator-table__coin-value'}>25 285,05 ₽</div>
      </div>
    </div>
  );
};
