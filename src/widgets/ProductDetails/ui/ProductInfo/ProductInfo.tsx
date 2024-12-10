import { FC, Fragment, useState } from 'react';

import { IProduct } from '@/entities/product';
import {
  AddToCompareButton,
  AddToFavoritesButton,
  OrderProductModal,
} from '@/features/product';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { formatter } from '@/shared/lib';
import { Badge, Button, IconButton } from '@/shared/ui';

import styles from './ProductInfo.module.scss';

interface IProductInfoProps {
  product: IProduct;
}

export const ProductInfo: FC<IProductInfoProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.info}>
      {!!product.tags.length && (
        <div className={styles.tags}>
          {product.tags.map((tag) => {
            return <Badge key={tag.id} text={tag.title} color={tag.color} />;
          })}
        </div>
      )}
      <div className={styles.content}>
        <h1 itemProp='name'>
          {product.seoHOne ? product.seoHOne : product.title}
        </h1>
        <div className={styles.specifications}>
          {product.value
            .filter((value) => value.display)
            .map((value) => {
              return (
                <div key={value.id} className={styles.specification}>
                  <p className={styles.name}>{value.valueInKey}</p>
                  <p className={styles.value}>
                    {value.title} {value.unit}
                  </p>
                </div>
              );
            })}
        </div>
        <div
          itemProp='description'
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.shortDescription }}
        />

        <div itemProp='offers' itemScope itemType='https://schema.org/Offer'>
          {!!product.oldPrice && (
            <span className={styles.oldPrice}>
              {formatter.format(product.oldPrice)}
            </span>
          )}
          <span itemProp='price' className={styles.price}>
            {product.price
              ? new Intl.NumberFormat('ru-RU', {
                  currency: 'RUB',
                  maximumFractionDigits: 0,
                  useGrouping: false,
                }).format(product.price)
              : 'Цена по запросу'}
          </span>
          <span> </span>
          {!!product.price && (
            <span
              itemProp='priceCurrency'
              content='RUB'
              className={styles.price}
            >
              ₽
            </span>
          )}
          {product.tags.map((tag) => {
            const tagTitle = tag.title.toLowerCase();

            if (tagTitle === 'в наличии') {
              return (
                <link
                  key={tag.id}
                  itemProp='availability'
                  href='https://schema.org/InStock'
                />
              );
            }

            if (tagTitle === 'новинка') {
              return (
                <link
                  key={tag.id}
                  itemProp='itemCondition'
                  href='https://schema.org/NewCondition'
                />
              );
            }

            return <Fragment key={tag.id} />;
          })}
        </div>
        <div className={styles.buttons}>
          <Button
            size={'sm'}
            className={styles.button}
            onClick={() => setIsOpen(true)}
          >
            Заказать
          </Button>
          <AddToFavoritesButton
            product={product}
            className={styles.iconButton}
          />
          <AddToCompareButton
            productId={product.id}
            className={styles.iconButton}
          />
          <IconButton icon={<ShareIcon />} className={styles.iconButton} />
        </div>
      </div>
      <OrderProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </section>
  );
};
