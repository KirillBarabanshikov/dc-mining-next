'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Benefits } from '@/app/(base-layout)/data-center/ui';
import { getProductBySlug } from '@/entities/product';
import { OrderProductModal } from '@/features/product';
import CodeIcon from '@/shared/assets/icons/code.svg';
import CoinsIcon from '@/shared/assets/icons/coins.svg';
import DownloadIcon from '@/shared/assets/icons/download.svg';
import PowerIcon from '@/shared/assets/icons/power.svg';
import ZapIcon from '@/shared/assets/icons/zap.svg';
import LeasingImage from '@/shared/assets/images/leasing/leasing.png';
import { BASE_URL } from '@/shared/consts';
import { formatter } from '@/shared/lib';
import { Breadcrumbs, Button } from '@/shared/ui';
import { RecentProductsList } from '@/widgets';
import { Calculator } from '@/widgets/Calculator';
import { CallMeBanner } from '@/widgets/CallMeBanner';
import { ProductsTabs } from '@/widgets/ProductDetails/ui';

import styles from './ProductPage.module.scss';
import { Slider } from './ui';

const paths = [
  {
    name: 'Главная',
    path: '/',
  },
];

export const AsicPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  const { data: product } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  });

  if (!product) return;

  const breadcrumbsPaths = [
    ...paths,
    {
      name: product?.category?.name ?? '',
      path: product ? `/catalog/${product?.category?.slug}` : '',
    },
    { name: product?.title ?? '', path: `/product/${product?.slug}` },
  ];

  return (
    <div>
      <div className={clsx('container', styles.container)}>
        <Breadcrumbs
          paths={breadcrumbsPaths}
          className={styles.asicBreadcrumbs}
        />
      </div>
      <div className={clsx('container', styles.container)}>
        <div className={styles.productInfoTop}>
          <Slider product={product} className={styles.slider} />
          <h1 className={styles.productTitle}>
            {product.seoHOne ? product.seoHOne : product.title}
          </h1>
          <div className={styles.characteristics}>
            <div className={styles.characteristicsWrapTitle}>
              <h2>Характеристики</h2>
              <span>(Подробнее)</span>
            </div>
            <div className={styles.characteristicsList}>
              <div className={styles.characteristicItem}>
                <PowerIcon />
                <span>Потребление</span>
                <span>{product.watt} ± 10% Вт/ч</span>
              </div>
              <div className={styles.characteristicItem}>
                <ZapIcon />
                <span>Хешрейт</span>
                <span>{product.hashrate}</span>
              </div>
              <div className={styles.characteristicItem}>
                <CodeIcon />
                <span>Алгоритм</span>
                <span>{product.algorithm}</span>
              </div>
              <div className={styles.characteristicItem}>
                <CoinsIcon />
                <span>Монета</span>
                <span>{product.coins}</span>
              </div>
            </div>
            {!!product.productSubCategory?.image && (
              <Image
                src={BASE_URL + product.productSubCategory.image}
                alt={`Изображение бренда ${product?.productSubCategory?.title}`}
                width={175}
                height={48}
                className={styles.brandImage}
              />
            )}
          </div>
          <div className={styles.indicatorsWrap}>
            <h2 className={styles.indicatorsTitle}>Финансовые показатели</h2>
            <div className={styles.indicatorsList}>
              <div className={styles.indicatorItem}>
                <span className={clsx(styles.indicatorTitle, styles.bold)}>
                  Доход без учета э/э, руб.:
                </span>
                <span className={clsx(styles.indicatorValue, styles.accent)}>
                  {product?.profit}
                </span>
              </div>
              <div className={styles.indicatorItem}>
                <span className={clsx(styles.indicatorTitle, styles.bold)}>
                  Окупаемость, мес.:
                </span>
                <span className={clsx(styles.indicatorValue, styles.accent)}>
                  {product?.paybackPerMonth}
                </span>
              </div>
              <div className={styles.indicatorItem}>
                <span className={styles.indicatorTitle}>
                  Ежемесячное потребление э/э, кВт.:
                </span>
                <span className={styles.indicatorValue}>
                  {product?.profitDayAll?.toFixed(0)}
                </span>
              </div>
              <div className={styles.indicatorItem}>
                <span className={styles.indicatorTitle}>Монета</span>
                <span className={styles.indicatorValue}>{product?.coins}</span>
              </div>
            </div>
            <Button
              variant={'outline'}
              size={'md'}
              className={styles.indicatorButton}
            >
              Скачать фин модель
              <DownloadIcon />
            </Button>
          </div>
          <div className={styles.priceWrap}>
            {!!product.oldPrice && (
              <div className={styles.oldPrice}>
                {formatter.format(product.oldPrice)}
              </div>
            )}
            {product.price ? (
              <>
                <div className={styles.price}>
                  {formatter.format(product.price)}
                </div>
                <span
                  itemProp='price'
                  className={styles.price}
                  style={{ display: 'none' }}
                >
                  {product.price}
                </span>
                <span
                  itemProp='priceCurrency'
                  content='RUB'
                  className={styles.price}
                  style={{ display: 'none' }}
                >
                  ₽
                </span>
              </>
            ) : (
              <>
                <meta itemProp='priceCurrency' content='RUB' />
                <meta itemProp='price' content='0' />
                <div itemProp='description' className={styles.price}>
                  Цена по запросу
                </div>
              </>
            )}
            <p className={styles.priceHint}>
              Цена является предварительной и может быть изменена
            </p>
            <p className={styles.priceHint}>
              Возможна оплата от юридического лица с НДС
            </p>
            <Button
              size={'md'}
              isWide
              onClick={() => setIsOpen(true)}
              className={styles.priceButton}
            >
              Оставить запрос
            </Button>
          </div>
          <div className={styles.leasingWrap}>
            <h2>Лизинг</h2>
            <p>
              Начните зарабатывать на майнинге <span>сейчас</span> — и выкупите
              оборудование <span>позже</span>
            </p>
            <Button variant={'outline'} size={'md'}>
              Сделать расчет
            </Button>
            <Image src={LeasingImage} alt={'Изображение для баннера'} />
          </div>
        </div>
        <Calculator />
        <ProductsTabs product={product} className={styles.tabs} />
        <Benefits withContainer={false} />
        <RecentProductsList withContainer={false} />
        <CallMeBanner className={styles.banner} />
      </div>
      <OrderProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </div>
  );
};
