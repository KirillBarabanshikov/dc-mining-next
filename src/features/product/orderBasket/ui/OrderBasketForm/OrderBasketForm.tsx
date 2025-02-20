import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { getPersonalData } from '@/entities/personalData';
import { IProduct } from '@/entities/product';
import {
  orderBasketFormScheme,
  TOrderBasketFormScheme,
} from '@/features/product/orderBasket/model';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Checkbox, Input } from '@/shared/ui';

import styles from './OrderBasketForm.module.scss';

interface IOrderBasketFormProps {
  products: IProduct[];
  onClose: () => void;
}

export const OrderBasketForm: FC<IOrderBasketFormProps> = ({ onClose }) => {
  const matches = useMediaQuery(MAX_WIDTH_MD);

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

  const onSubmit = async (data: TOrderBasketFormScheme) => {
    console.log(data);
    // const entryPoint = sessionStorage.getItem('entryPoint') || '/';
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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
        <div className={styles.productItem}></div>
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
        <Button type={'submit'} size={matches ? 'md' : 'lg'}>
          Отправить
        </Button>
      </div>
    </form>
  );
};
