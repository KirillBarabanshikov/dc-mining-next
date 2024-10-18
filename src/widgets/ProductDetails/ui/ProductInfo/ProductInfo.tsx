import { FC, useState } from 'react';

import { IProduct } from '@/entities/product';
import { AddToCompareButton, AddToFavoritesButton, OrderProductModal } from '@/features/product';
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
        <section className={styles.info} itemScope itemType='https://schema.org/Offer'>
            <meta itemProp='priceCurrency' content='RUB' />
            <meta itemProp='price' content={String(product.price) || 'Цена по запросу'} />
            <link itemProp='availability' href='https://schema.org/InStock' />
            <meta itemProp='itemCondition' content='https://schema.org/NewCondition' />
            <meta itemProp='url' content={`https://dc-mining.ru/product/${product?.id}/${product?.slug}`} />

            {!!product.tags.length && (
                <div className={styles.tags}>
                    {product.tags.map((tag) => {
                        return <Badge key={tag.id} text={tag.title} color={tag.color} />;
                    })}
                </div>
            )}
            <div className={styles.content}>
                <h1>{product.seoHOne ? product.seoHOne : product.title}</h1>
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
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
                <div>
                    {!!product.oldPrice && (
                        <span className={styles.oldPrice}>{formatter.format(product.oldPrice)}</span>
                    )}
                    <p className={styles.price}>
                        {product.price ? formatter.format(product.price) : 'Цена по запросу'}
                    </p>
                </div>
                <div className={styles.buttons}>
                    <Button size={'sm'} className={styles.button} onClick={() => setIsOpen(true)}>
                        Заказать
                    </Button>
                    <AddToFavoritesButton product={product} className={styles.iconButton} />
                    <AddToCompareButton productId={product.id} className={styles.iconButton} />
                    <IconButton icon={<ShareIcon />} className={styles.iconButton} />
                </div>
            </div>
            <OrderProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} product={product} />
        </section>
    );
};
