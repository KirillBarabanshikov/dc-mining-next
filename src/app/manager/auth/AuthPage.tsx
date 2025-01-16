'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button, Input } from '@/shared/ui';

import styles from './AuthPage.module.scss';

const authFormScheme = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type TAuthFormScheme = yup.InferType<typeof authFormScheme>;

export const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthFormScheme>({
    resolver: yupResolver(authFormScheme),
  });

  const { mutateAsync, isError, isPending } = useMutation({
    mutationFn: (data: any) => axios.post('/api/auth', data),
  });

  const onSubmit = async (data: TAuthFormScheme) => {
    await mutateAsync(data);
    window.location.reload();
  };

  return (
    <div className={styles.authPage}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Вход для менеджеров</h1>
        {isError && (
          <div className={styles.error}>Неверные данные для входа</div>
        )}
        <div className={styles.inputsWrap}>
          <Input
            type={'email'}
            placeholder={'Электронная почта'}
            error={!!errors.email}
            {...register('email')}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            error={!!errors.password}
            {...register('password')}
          />
        </div>
        <Button type={'submit'} className={styles.button} disabled={isPending}>
          Войти
        </Button>
      </form>
    </div>
  );
};
