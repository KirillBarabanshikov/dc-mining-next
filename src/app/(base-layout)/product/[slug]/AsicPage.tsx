'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Benefits } from '@/app/(base-layout)/data-center/ui';
import { getProductBySlug } from '@/entities/product';
import { useRecentStore } from '@/entities/product/model';
import { OrderCallModal } from '@/features/call';
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
import { calculatorApi } from '@/widgets/Calculator/api';
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
  const [dollar, setDollar] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCall, setIsOpenCall] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const targetRef = useRef<HTMLDivElement>(null);
  const { addToRecent } = useRecentStore();

  const { data: product } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  });

  const scrollTo = () => {
    if (targetRef.current) {
      const offset = 250;
      const elementPosition =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await calculatorApi.getAsics();
      if (data) {
        setDollar(data.dollar);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!product) return;
    addToRecent(product.id);
  }, [addToRecent, product]);

  const downloadPdf = async () => {
    if (!product) return;

    const totalPrice = product.price || 0;
    const course = dollar;

    const profitWithoutElectricity = (product.profitDayAll ?? 0) * 30;
    const totalConsumption = ((product.watt ?? 0) * 24 * 30) / 1000;

    const pdfData = {
      sumRuble: totalPrice.toLocaleString('ru-RU'),
      sumDollar: (totalPrice / course).toFixed(0),
      curs: course.toString(),
      sumIn: totalPrice.toLocaleString('ru-RU'),
      everyMonthWatt: totalConsumption.toLocaleString('ru-RU'),
      profitWithoutWatt: profitWithoutElectricity.toFixed(0),
      profitWithMonth: (totalPrice / profitWithoutElectricity).toFixed(0),
      asics: [
        {
          id: product.id,
          title: product.title,
          hashrate: `${product.hashrate} TH/s`,
          quantity: '1',
          priceOnePiece: product.price
            ? (product.price / course).toFixed(0)
            : '0',
          price: product.price ? (product.price / course).toFixed(0) : '0',
        },
      ],
      type: 'По моделям',
    };

    try {
      setIsLoading(true);
      const result = await calculatorApi.postPDF(pdfData);
      if (result) {
        const blob = new Blob([result.file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'фин_модель.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) return;

  const breadcrumbsPaths = [
    ...paths,
    {
      name: product?.category?.title ?? '',
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
      <div
        className={clsx('container', styles.container)}
        itemScope
        itemType={'https://schema.org/Product'}
      >
        <div className={styles.productInfoTop}>
          <Slider product={product} className={styles.slider} />
          <h1 itemProp={'name'} className={styles.productTitle}>
            {product.seoHOne ? product.seoHOne : product.title}
          </h1>
          <div className={styles.characteristics}>
            <div className={styles.characteristicsWrapTitle}>
              <h2>Характеристики</h2>
              <span onClick={scrollTo}>(Подробнее)</span>
            </div>
            <div className={styles.characteristicsList}>
              <div className={styles.characteristicItem}>
                <PowerIcon />
                <span className={styles.characteristicTitle}>Потребление</span>
                <span className={styles.characteristicValue}>
                  {product.watt} ± 10% Вт/ч
                </span>
              </div>
              <div className={styles.characteristicItem}>
                <ZapIcon />
                <span className={styles.characteristicTitle}>Хешрейт</span>
                <span className={styles.characteristicValue}>
                  {product.hashrate} TH/S
                </span>
              </div>
              <div className={styles.characteristicItem}>
                <CodeIcon />
                <span className={styles.characteristicTitle}>Алгоритм</span>
                <span className={styles.characteristicValue}>
                  {product.algorithm}
                </span>
              </div>
              <div className={styles.characteristicItem}>
                <CoinsIcon />
                <span className={styles.characteristicTitle}>Монета</span>
                <span
                  className={clsx(
                    styles.characteristicValue,
                    styles.characteristicValueCoins,
                  )}
                >
                  {product?.coins?.replace(/\//g, '/\u200B')}
                </span>
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
                  {((product.profitDayAll ?? 0) * 30).toLocaleString('ru-RU', {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className={styles.indicatorItem}>
                <span className={clsx(styles.indicatorTitle, styles.bold)}>
                  Окупаемость без учета э/э, мес.:
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
                  {(((product.watt ?? 0) * 24 * 30) / 1000).toLocaleString(
                    'ru-RU',
                    { maximumFractionDigits: 0 },
                  )}
                </span>
              </div>
              <div className={styles.indicatorItem}>
                <span className={styles.indicatorTitle}>
                  Дата актуализации:
                </span>
                <span className={styles.indicatorValue}>
                  {new Date(product?.firstCoinsTime || '').toLocaleDateString(
                    'ru-RU',
                  )}
                </span>
              </div>
            </div>
            <Button
              disabled={isLoading}
              variant={'outline'}
              size={'md'}
              onClick={downloadPdf}
              className={styles.indicatorButton}
            >
              Скачать фин модель
              <DownloadIcon />
            </Button>
          </div>
          <div
            itemProp={'offers'}
            itemScope
            itemType={'https://schema.org/Offer'}
            className={styles.priceWrap}
          >
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
                  itemProp={'price'}
                  className={styles.price}
                  style={{ display: 'none' }}
                >
                  {product.price}
                </span>
                <span
                  itemProp={'priceCurrency'}
                  content={'RUB'}
                  className={styles.price}
                  style={{ display: 'none' }}
                >
                  ₽
                </span>
              </>
            ) : (
              <>
                <meta itemProp={'priceCurrency'} content={'RUB'} />
                <meta itemProp={'price'} content={'0'} />
                <div itemProp={'description'} className={styles.price}>
                  Цена по запросу
                </div>
              </>
            )}
            {product.tags.map((tag) => {
              const tagTitle = tag.title.toLowerCase();

              if (tagTitle === 'в наличии') {
                return (
                  <link
                    key={tag.id}
                    itemProp={'availability'}
                    href={'https://schema.org/InStock'}
                  />
                );
              }

              if (tagTitle === 'новинка') {
                return (
                  <link
                    key={tag.id}
                    itemProp={'itemCondition'}
                    href={'https://schema.org/NewCondition'}
                  />
                );
              }

              return <Fragment key={tag.id} />;
            })}
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
            <Button
              variant={'outline'}
              size={'md'}
              onClick={() => setIsOpenCall(true)}
            >
              Сделать расчет
            </Button>
            <Image src={LeasingImage} alt={'Изображение для баннера'} />
          </div>
          {!!product.productSubCategory?.title && (
            <meta
              itemProp='brand'
              content={product.productSubCategory?.title}
            />
          )}
        </div>
        <Calculator variant={'product'} defaultAsicId={product.id} />
        <ProductsTabs
          product={product}
          ref={targetRef}
          className={styles.tabs}
        />
        <Benefits withContainer={false} page={'product'} />
        <RecentProductsList withContainer={false} />
        <CallMeBanner className={styles.banner} />
      </div>
      <OrderProductModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
      <OrderCallModal
        isOpen={isOpenCall}
        onClose={() => setIsOpenCall(false)}
        title={'Заказать звонок'}
        subtitle={'Оставьте свои контакты и мы вам перезвоним'}
      />
    </div>
  );
};
