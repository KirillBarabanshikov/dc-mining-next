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
import { calculatorApi } from '@/widgets/Calculator/api';
import { useCalculatorStore } from '@/widgets/Calculator/model/store';
import { IAsic, IPackage } from '@/widgets/Calculator/types';

import { orderProductFormScheme, TOrderProductFormScheme } from '../../model';
import styles from './OrderProductForm.module.scss';
import { usePathname } from 'next/navigation';

interface IOrderProductFormProps {
  onClose: () => void;
  product: IProduct | IAsic | IPackage;
  isMultiple?: boolean;
  additionalProducts?: IAsic[];
  setIsFinally: (value: boolean) => void;
  setIsError: (value: boolean) => void;
  variant?: 'product' | 'calculator';
  generatePdfData?: () => any;
}

export const OrderProductForm: FC<IOrderProductFormProps> = ({
  onClose,
  product,
  isMultiple,
  additionalProducts,
  setIsFinally,
  setIsError,
  variant = 'product',
  generatePdfData,
}) => {
  const [price, setPrice] = useState(product.price || 0);
  const [count, setCount] = useState(1);
  const [additionalCounts, setAdditionalCounts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { sendMetrikaGoal } = useMetrikaGoal();
  const matches = useMediaQuery(MAX_WIDTH_MD);
  const pathname = usePathname();

  const { calculatorType, calculatorTypes } = useCalculatorStore();

  useEffect(() => {
    if (!additionalProducts) return;

    setAdditionalCounts(additionalProducts.map((asic) => asic.count));
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

  const { mutateAsync: order } = useMutation({
    mutationFn: orderProduct,
  });

  const { mutateAsync: sendRequest } = useMutation({
    mutationFn: calculatorApi.sendFormRequest,
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
    const entryPoint = sessionStorage.getItem('entryPoint') || '/';
    try {
      setIsLoading(true);
      if (variant === 'product') {
        await order({
          ...data,
          productId: product.id,
          price: price ?? 0,
          count,
          entryPoint,
        });
      } else {
        if (generatePdfData) {
          const result = await calculatorApi.postPDF(generatePdfData());
          const title =
            calculatorTypes.find((type) => type.id === calculatorType)?.title ||
            '';

          let requestData = `Продукт: ${product.title}<br/>Цена: ${price ? formatter.format(price) : 'Цена по запросу'}<br/>Кол-во: ${count}`;

          if (additionalProducts?.length) {
            requestData += '<br/>';
            additionalProducts.forEach((asic, index) => {
              requestData += `Продукт: ${asic.title}<br/>Цена: ${asic.price ? formatter.format(asic.price) : 'Цена по запросу'}<br/>Кол-во: ${additionalCounts[index]}${additionalProducts.length - 1 !== index ? '<br />' : ''}`;
            });
          }

          await sendRequest({
            ...data,
            data: requestData,
            title,
            entryPoint,
            pdfId: result!.pdfId,
          });
        }
      }

      sendMetrikaGoal();
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
      {!matches && (
        <>
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
                defaultValue={
                  variant === 'product' ? 1 : product.count ? product.count : 1
                }
                onChange={onChangeProductCount}
              />
            </div>
          </div>
        </>
      )}
      {isMultiple && !!additionalProducts?.length && !matches && (
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
                    defaultValue={additionalProduct.count}
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
            disabled={isLoading}
          >
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
};
