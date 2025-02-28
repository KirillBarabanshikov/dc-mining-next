'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  getProductsByIds,
  ProductBasketCard,
  useBasketStore,
} from '@/entities/product';
import { OrderBasketModal } from '@/features/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './BasketPage.module.scss';
import { Placeholder } from './Placeholder';

interface BasketPageProps {
  isHeader?: boolean;
}

const BasketPage: React.FC<BasketPageProps> = ({ isHeader }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { basket, clearBasket } = useBasketStore((state) => state);
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const basketIds = basket.map((item) => item.productId);
  const router = useRouter();

  const { data: products = [] } = useQuery({
    queryKey: ['basket', basketIds],
    queryFn: () => getProductsByIds(basketIds),
    placeholderData: keepPreviousData,
    enabled: basketIds.length > 0,
  });

  const { totalQuantity, totalPrice, productMap } = useMemo(() => {
    const map = new Map(products?.map((p) => [p.id, p]));

    const total = basket.reduce(
      (acc, item) => {
        const product = map.get(item.productId);
        acc.totalQuantity += item.count;
        acc.totalPrice += (product?.price || 0) * item.count;
        return acc;
      },
      { totalQuantity: 0, totalPrice: 0 },
    );

    return { ...total, productMap: map };
  }, [basket, products]);

  return (
    <div className='sections'>
      <section className={isHeader ? styles.basketHeader : styles.basket}>
        <div className='container'>
          {!isHeader && (
            <div className={styles.head}>
              <h1 className='section-title-secondary'>Корзина</h1>
              <Button
                variant='outline'
                size={matches ? 'sm' : 'md'}
                disabled={basket.length === 0}
                onClick={clearBasket}
              >
                Очистить
              </Button>
            </div>
          )}

          {basket.length > 0 && products ? (
            <div className={styles.basketInner}>
              <div className={styles.basketList}>
                {basket.map((item) => {
                  const product = productMap.get(item.productId);
                  return (
                    product && (
                      <ProductBasketCard
                        key={product.id}
                        product={product}
                        count={item.count}
                        isHeader={isHeader}
                      />
                    )
                  );
                })}
              </div>

              <div
                className={isHeader ? styles.orderWrapHeader : styles.orderWrap}
              >
                <div className={styles.orderInfo}>
                  <div className={styles.orderItem}>
                    <div className={styles.orderLabel}>Количество:</div>
                    <div className={styles.orderValue}>{totalQuantity} шт.</div>
                  </div>
                  <div className={styles.orderItem}>
                    <div className={styles.orderLabel}>Сумма:</div>
                    <div className={styles.orderValue}>
                      {formatter.format(totalPrice)}
                    </div>
                  </div>
                </div>
                {isHeader && (
                  <Button
                    variant='outline'
                    size='md'
                    isWide
                    onClick={() => router.push('/basket')}
                    style={{ marginBottom: '8px' }}
                  >
                    В корзину
                  </Button>
                )}
                <Button size='md' isWide onClick={() => setIsOpen(true)}>
                  Оформить заказ
                </Button>
              </div>
            </div>
          ) : (
            <Placeholder />
          )}
        </div>
      </section>
      <OrderBasketModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        products={products || []}
      />
    </div>
  );
};

export default BasketPage;
