import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getPersonalData } from '@/entities/personalData';
import { IProduct, useBasketStore } from '@/entities/product';
import {
  orderBasketFormScheme,
  TOrderBasketFormScheme,
} from '@/features/product/orderBasket/model';
import {
  getAsics,
  sendBasketForm,
  sendBasketPDF,
} from '@/features/product/orderBasket/ui/OrderBasketForm/api/basketFormApi';
import { generatePDF } from '@/features/product/orderBasket/ui/OrderBasketForm/lib/generatePDF';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Checkbox, Input } from '@/shared/ui';
import { IPostPDFRequest } from '@/widgets/Calculator/types';

import styles from './OrderBasketForm.module.scss';

interface IOrderBasketFormProps {
  products: IProduct[];
  onClose: () => void;
  setIsFinally: (value: boolean) => void;
  setIsError: (value: boolean) => void;
}

export const OrderBasketForm: FC<IOrderBasketFormProps> = ({ onClose, products, setIsError, setIsFinally }) => {
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const { basket } = useBasketStore((state) => state)
  const [isLoading, setIsLoading] = useState(false);

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

  const { mutateAsync: basketPDF } = useMutation({
    mutationFn: sendBasketPDF,
  });

  const { mutateAsync: getCourse } = useMutation({
    mutationFn: getAsics,
  });

  const onSubmit = async (data: TOrderBasketFormScheme) => {
    const entryPoint = sessionStorage.getItem('entryPoint') || '/';

    try {
      setIsLoading(true)

      const dollarCourse = await getCourse()

      const course = dollarCourse.dollar

      const pdfData = generatePDF(basket, products, 5.5, course)

      const result = await basketPDF(pdfData as IPostPDFRequest)

      if (result) {
        const requestData = products
          .map((item) => {
              const productCount = basket.find((b) => b.productId === item.id)?.count || item.count;
              return (
                `Продукт: ${item.title}<br/>` +
                `Цена: ${item.price ? formatter.format(item.price) : 'Цена по запросу'}<br/>` +
                `Кол-во: ${productCount}`
              )
            }
          )
          .join('<br/><br/>');

        const title = 'basket';

        await sendRequest({
          ...data,
          data: requestData,
          title,
          entryPoint,
          pdfId: result!.pdfId,
        });
      }
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsFinally(true);
      setIsLoading(false);
    }

    // handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const price = (item: IProduct) => {
    // return item.price?.toLocaleString('ru-RU')
    return item.price ? formatter.format(item.price) : ''
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputs}>
        <Input
          placeholder={'Имя'}
          {...register('name')}
          error={!!errors.name}
        />
        <Input
          placeholder={'Телефон'}
          error={!!errors.phone}
          defaultValue={'+7'}
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
              src={item.images[0] ? item.images[0].image || '' : ''}
              alt={'Изображение товара'}
              width={55}
              height={55}
              className={styles.image}
            />
            <div className={styles.productCardDescription}>
              <div className={styles.productCardDescriptionTitle}>{item.title}</div>
              <div className={styles.productCardDescriptionPrice}>{price(item)}</div>
            </div>
          </div>
        ))}
      </div>
      <Checkbox
        label={
          <>
            Я согласен на обработку{' '}
            <a href={personalData?.image} target={'_blank'}>
              персональных данных
            </a>
          </>
        }
        {...register('checked')}
        error={!!errors.checked}
        className={styles.checkbox}
      />
      <div className={styles.wrap}>
        <Button
          variant={'outline'}
          onClick={handleClose}
          size={matches ? 'md' : 'lg'}
        >
          Отмена
        </Button>
        <Button type={'submit'} size={matches ? 'md' : 'lg'} disabled={isLoading}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
