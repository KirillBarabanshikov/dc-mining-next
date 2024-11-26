import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getPersonalData } from '@/entities/personalData';
import { IProduct, orderProduct } from '@/entities/product';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery, useMetrikaGoal } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Checkbox, Input, NumberInput } from '@/shared/ui';
import { IAsic, IPackage } from '@/widgets/Calculator/types';

import { orderProductFormScheme, TOrderProductFormScheme } from '../../model';
import styles from './OrderProductForm.module.scss';

interface IOrderProductFormProps {
  onClose: () => void;
  product: IProduct | IAsic | IPackage;
  isMultiple?: boolean;
  additionalProducts?: IAsic[];
  setIsFinally: (value: boolean) => void;
  setIsError: (value: boolean) => void;
}

export const OrderProductForm: FC<IOrderProductFormProps> = ({
  onClose,
  product,
  isMultiple,
  additionalProducts = [],
  setIsFinally,
  setIsError,
}) => {
  const [price, setPrice] = useState(product.price || 0);
  const [count, setCount] = useState(1);
  const [additionalCounts, setAdditionalCounts] = useState<number[]>([]);
  // const [captchaVerified, setCaptchaVerified] = useState(false);
  // const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { sendMetrikaGoal } = useMetrikaGoal();
  const matches = useMediaQuery(MAX_WIDTH_MD);

  useEffect(() => {
    setAdditionalCounts(additionalProducts.map(() => 1));
  }, [additionalProducts]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TOrderProductFormScheme>({
    resolver: yupResolver(orderProductFormScheme),
  });

  const { data: personalData } = useQuery({
    queryKey: ['personal-data'],
    queryFn: getPersonalData,
    staleTime: Infinity,
  });

  const { mutateAsync: order, isPending } = useMutation({
    mutationFn: orderProduct,
  });

  const onChangeProductCount = (value: number) => {
    product.price && setPrice(product.price * value);
    setCount(value);
  };

  const onChangeAdditionalCount = (index: number, value: number) => {
    const newCounts = [...additionalCounts];
    newCounts[index] = value;
    setAdditionalCounts(newCounts);
  };

  const onSubmit = async (data: TOrderProductFormScheme) => {
    // if (!captchaVerified) return;

    try {
      await order({ ...data, productId: product.id, price: price ?? 0, count });
      sendMetrikaGoal();
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsFinally(true);
    }
  };

  const handleClose = () => {
    reset();
    // setCaptchaVerified(false);
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrap}>
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
      <Input disabled value={product.title} className={styles.inputProduct} />
      <div className={styles.wrap}>
        <div className={styles.item}>
          <span className={styles.label}>Цена</span>
          <Input
            disabled
            value={price ? formatter.format(price) : 'Цена по запросу'}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Количество</span>
          <NumberInput
            min={1}
            defaultValue={product.count ? product.count : 1}
            onChange={onChangeProductCount}
          />
        </div>
      </div>
      {isMultiple && additionalProducts.length > 0 && (
        <div className={styles.additionalProducts}>
          {additionalProducts.map((additionalProduct, index) => (
            <div key={index} className={styles.additionalProductItem}>
              <span className={styles.label} style={{ marginTop: '20px' }}>
                Название
              </span>
              <Input
                disabled
                value={additionalProduct.title}
                className={styles.inputProduct}
              />
              <div className={styles.wrap}>
                <div className={styles.item}>
                  <span className={styles.label}>Цена</span>
                  <Input
                    disabled
                    value={
                      additionalProduct.price && additionalCounts[index]
                        ? formatter.format(
                            additionalProduct.price * additionalCounts[index],
                          )
                        : 'Цена по запросу'
                    }
                  />
                </div>
                <div className={styles.item}>
                  <span className={styles.label}>Количество</span>
                  <NumberInput
                    min={1}
                    defaultValue={
                      additionalCounts[index] ? additionalCounts[index] : 1
                    }
                    onChange={(value) => onChangeAdditionalCount(index, value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.buttonsWrap}>
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
        />
        {/*<Captcha*/}
        {/*    ref={recaptchaRef}*/}
        {/*    onCaptchaVerify={(verify) => setCaptchaVerified(verify)}*/}
        {/*    onExpired={() => setCaptchaVerified(false)}*/}
        {/*/>*/}
        <div className={styles.wrap}>
          <Button
            variant={'outline'}
            onClick={handleClose}
            size={matches ? 'md' : 'lg'}
            isWide
          >
            Отмена
          </Button>
          <Button
            type={'submit'}
            size={matches ? 'md' : 'lg'}
            isWide
            disabled={isPending}
          >
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
};
