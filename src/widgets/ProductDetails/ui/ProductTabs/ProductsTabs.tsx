import clsx from 'clsx';
import { FC, forwardRef, useState } from 'react';

import { IProduct } from '@/entities/product';
import { Delivery, Payments } from '@/widgets';

import styles from './ProductsTabs.module.scss';

interface IProductTabsProps {
  product: IProduct;
  className?: string;
}

const tabs = ['Характеристики', 'Доставка и Оплата'];

export const ProductsTabs = forwardRef<HTMLDivElement, IProductTabsProps>(
  ({ product, className }, ref) => {
    const [currentTab, setCurrentTab] = useState(0);
    const isAsic = product.category?.title === 'ASIC майнеры';
    const currentTabs = isAsic ? ['Описание', ...tabs] : tabs;

    const renderTabs = () => {
      let tabs = [
        <ProductSpecifications key={'specifications'} product={product} />,
        <div key={'deliveryAndPayments'} className={styles.deliveryAndPayments}>
          <Payments variant={'productInfo'} />
          <Delivery variant={'productInfo'} />
        </div>,
      ];

      if (isAsic) {
        tabs = [
          <ProductDescription key={'description'} product={product} />,
          ...tabs,
        ];
      }

      return tabs;
    };

    return (
      <div ref={ref} className={clsx(styles.productTabs, className)}>
        <div className={clsx(styles.tabs, 'scrollbar-hide')}>
          {currentTabs.map((tab, index) => {
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
        <div>{renderTabs()[currentTab]}</div>
      </div>
    );
  },
);

ProductsTabs.displayName = 'ProductsTabs';

const ProductDescription: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div
      itemProp={'description'}
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
          <div className={styles.value}>
            {product.coins.replace(/\//g, '/\u200B')}
          </div>
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
