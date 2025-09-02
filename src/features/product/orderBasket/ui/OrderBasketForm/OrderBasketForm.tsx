import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getCalculatorData } from '@/entities/calculator/api/calculatorApi';
import { useFinModel } from '@/entities/calculator/lib/useFinModel';
import { Model } from '@/entities/calculator/model/types';
import { getPersonalData } from '@/entities/personalData';
import { IProduct, useBasketStore } from '@/entities/product';
import {
  orderBasketFormScheme,
  TOrderBasketFormScheme,
} from '@/features/product/orderBasket/model';
import { sendBasketForm } from '@/features/product/orderBasket/ui/OrderBasketForm/api/basketFormApi';
import { CALLTOUCH_SITE_ID, MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Checkbox, Input } from '@/shared/ui';

import styles from './OrderBasketForm.module.scss';

interface IOrderBasketFormProps {
  products: IProduct[];
  onClose: () => void;
  setIsFinally: (value: boolean) => void;
  setIsError: (value: boolean) => void;
}

export const OrderBasketForm: FC<IOrderBasketFormProps> = ({
  onClose,
  products,
  setIsError,
  setIsFinally,
}) => {
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const { basket } = useBasketStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [dollar, setDollar] = useState(0);
  const [prods, setProds] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TOrderBasketFormScheme>({
    resolver: yupResolver(orderBasketFormScheme),
  });

  const { data: personalData } = useQuery({
    queryKey: ['personal-data'],
    queryFn: getPersonalData,
    staleTime: Infinity,
  });

  const { mutateAsync: sendRequest } = useMutation({
    mutationFn: sendBasketForm,
  });

  const { generatePdf } = useFinModel({
    models,
    dollar,
    electricityCoast: 5.5,
    currency: 'rub',
  });

  useEffect(() => {
    const loadModels = async () => {
      try {
        const results = await Promise.all(
          basket.map((item) =>
            getCalculatorData({ title: item.productName }).then((res) => {
              const product = res.products.find(
                (p) => p.title === item.productName,
              );
              if (!product) return null;

              return {
                dollar: res.dollar,
                model: {
                  product,
                  count: item.count,
                  currency: 'rub',
                  currentPrice: product.price,
                  currentProfitDayAll: product.profitDayAll,
                } as Model,
                description: [
                  `Продукт: ${product.title}`,
                  `Цена: ${
                    product.price
                      ? formatter.format(product.price)
                      : 'Цена по запросу'
                  }`,
                  `Кол-во: ${item.count}`,
                ].join('<br/>'),
              };
            }),
          ),
        );

        const validResults = results.filter(
          (item): item is NonNullable<typeof item> => !!item,
        );

        if (validResults.length) {
          setDollar(validResults[0].dollar);
          setModels(validResults.map((r) => r.model));
          setProds(validResults.map((r) => r.description));
        }
      } catch (e) {
        console.error('Ошибка загрузки моделей', e);
      }
    };

    loadModels();
  }, [basket]);

  const onSubmit = async (data: TOrderBasketFormScheme) => {
    const entryPoint = sessionStorage.getItem('entryPoint') || '/';

    try {
      setIsLoading(true);
      const result = await generatePdf();

      await sendRequest({
        title: 'basket',
        name: data.name,
        phone: data.phone,
        entryPoint,
        data: prods.join('<br/><br/>'),
        pdfId: result.pdfId,
      });

      await axios.post(
        `https://api.calltouch.ru/calls-service/RestAPI/requests/${CALLTOUCH_SITE_ID}/register`,
        {
          subject: 'Оформление заказа',
          fio: data.name,
          phoneNumber: data.phone,
          requestUrl: window.location.href,
        },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsFinally(true);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const checkboxLabel = useMemo(
    () => (
      <>
        Я согласен на обработку{' '}
        <a href={personalData?.image} target='_blank'>
          персональных данных
        </a>
      </>
    ),
    [personalData?.image],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputs}>
        <Input placeholder='Имя' {...register('name')} error={!!errors.name} />
        <Input
          placeholder='Телефон'
          error={!!errors.phone}
          defaultValue='+7'
          {...register('phone', {
            onChange: (e) => {
              setValue('phone', maskPhone(e.target.value));
            },
          })}
        />
      </div>

      <div className={styles.productsList}>
        {products.map((item) => (
          <div key={item.id} className={styles.productCard}>
            <Image
              src={item.images[0]?.image || ''}
              alt='Изображение товара'
              width={55}
              height={55}
              className={styles.image}
            />
            <div className={styles.productCardDescription}>
              <div className={styles.productCardDescriptionTitle}>
                {item.title}
              </div>
              <div className={styles.productCardDescriptionPrice}>
                {item.price ? formatter.format(item.price) : ''}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Checkbox
        label={checkboxLabel}
        {...register('checked')}
        error={!!errors.checked}
        className={styles.checkbox}
      />

      <div className={styles.wrap}>
        <Button
          variant='outline'
          onClick={handleClose}
          size={matches ? 'md' : 'lg'}
        >
          Отмена
        </Button>
        <Button type='submit' size={matches ? 'md' : 'lg'} disabled={isLoading}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
