import clsx from 'clsx';
import { FC, useState } from 'react';

import { IProduct } from '@/entities/product';
import { Delivery, Payments } from '@/widgets';

import styles from './ProductsTabs.module.scss';

interface IProductTabsProps {
  product: IProduct;
  className?: string;
}

const tabs = ['Описание', 'Характеристики', 'Доставка', 'Оплата'];

export const ProductsTabs: FC<IProductTabsProps> = ({ product, className }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={clsx(styles.productTabs, className)}>
      <div className={clsx(styles.tabs, 'scrollbar-hide')}>
        {tabs.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentTab(index)}
              className={clsx(
                styles.tab,
                currentTab === index && styles.active,
              )}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div>
        {
          [
            <ProductDescription key={'description'} product={product} />,
            <ProductSpecifications key={'specifications'} product={product} />,
            <Delivery key={'delivery'} variant={'productInfo'} />,
            <Payments key={'payments'} variant={'productInfo'} />,
          ][currentTab]
        }
      </div>
    </div>
  );
};

const ProductDescription: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div
      className={styles.productDescription}
      dangerouslySetInnerHTML={{ __html: product.shortDescription }}
    />
  );
};

const ProductSpecifications: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className={styles.productSpecifications}>
      {product.watt && (
        <div className={styles.specification}>
          <div className={styles.name}>Потребление</div>
          <div className={styles.value}>{product.watt} ± 10% Вт/ч</div>
        </div>
      )}
      {product.hashrate && (
        <div className={styles.specification}>
          <div className={styles.name}>Хешрейт</div>
          <div className={styles.value}>{product.hashrate} TH/S</div>
        </div>
      )}
      {product.algorithm && (
        <div className={styles.specification}>
          <div className={styles.name}>Алгоритм</div>
          <div className={styles.value}>{product.algorithm}</div>
        </div>
      )}
      {product.coins && (
        <div className={styles.specification}>
          <div className={styles.name}>Монета</div>
          <div className={styles.value}>{product.coins}</div>
        </div>
      )}
      {product.value.map((value) => {
        return (
          <div key={value.id} className={styles.specification}>
            <div className={styles.name}>{value.valueInKey}</div>
            <div className={styles.value}>
              {value.title} {value.unit}
            </div>
          </div>
        );
      })}
    </div>
  );
};
