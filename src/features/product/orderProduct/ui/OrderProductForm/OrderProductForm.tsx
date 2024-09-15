import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { getPersonalData, IPersonalData } from '@/entities/personalData';
import { IProduct } from '@/entities/product';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { formatter, useMediaQuery, useMetrikaGoal } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Captcha, Checkbox, Input, NumberInput } from '@/shared/ui';

import { orderProductFormScheme, TOrderProductFormScheme } from '../../model';
import styles from './OrderProductForm.module.scss';

interface IOrderProductFormProps {
    onClose: () => void;
    product: IProduct;
    setIsFinally: (value: boolean) => void;
    setIsError: (value: boolean) => void;
}

export const OrderProductForm: FC<IOrderProductFormProps> = ({ onClose, product, setIsFinally, setIsError }) => {
    const [price, setPrice] = useState(product.price);
    const [count, setCount] = useState(1);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [personalData, setPersonalData] = useState<IPersonalData | undefined>();
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const { sendMetrikaGoal } = useMetrikaGoal();
    const matches = useMediaQuery(MAX_WIDTH_MD);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TOrderProductFormScheme>({
        resolver: yupResolver(orderProductFormScheme),
    });

    useEffect(() => {
        const fetchPersonalData = async () => {
            const data = await getPersonalData();
            setPersonalData(data);
        };
        fetchPersonalData();
    }, []);

    const onChangeProductCount = (value: number) => {
        product.price && setPrice(product.price * value);
        setCount(value);
    };

    const onSubmit = async (data: TOrderProductFormScheme) => {
        if (!captchaVerified) return;

        try {
            setIsLoading(true);
            await fetch(BASE_URL + '/api/buy', {
                method: 'POST',
                body: JSON.stringify({ ...data, productId: product.id, price: price ?? 0, count }),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            sendMetrikaGoal();
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsFinally(true);
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        reset();
        setCaptchaVerified(false);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrap}>
                <Input placeholder={'Имя'} {...register('name')} error={!!errors.name} />
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
                    <Input disabled value={price ? formatter.format(price) : 'Цена по запросу'} />
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Количество</span>
                    <NumberInput min={1} defaultValue={1} onChange={onChangeProductCount} />
                </div>
            </div>
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
                <Captcha
                    ref={recaptchaRef}
                    onCaptchaVerify={(verify) => setCaptchaVerified(verify)}
                    onExpired={() => setCaptchaVerified(false)}
                />
                <div className={styles.wrap}>
                    <Button variant={'outline'} onClick={handleClose} size={matches ? 'md' : 'lg'} isWide>
                        Отмена
                    </Button>
                    <Button type={'submit'} size={matches ? 'md' : 'lg'} isWide disabled={isLoading}>
                        Отправить
                    </Button>
                </div>
            </div>
        </form>
    );
};
