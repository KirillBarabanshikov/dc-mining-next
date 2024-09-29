// import { useRef, useState } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { orderCall } from '@/entities/call';
import { getPersonalData } from '@/entities/personalData';
import { orderCallFormScheme, TOrderCallFormScheme } from '@/features/call/orderCall';
import { useMetrikaGoal } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import {
    Button,
    // Captcha,
    Checkbox,
    Input,
    Modal,
    StateModal,
} from '@/shared/ui';

import styles from './OrderCallHelpBanner.module.scss';

export const OrderCallHelpBanner = () => {
    // const [captchaVerified, setCaptchaVerified] = useState(false);
    // const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const { sendMetrikaGoal } = useMetrikaGoal();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TOrderCallFormScheme>({ resolver: yupResolver(orderCallFormScheme) });

    const { data: personalData } = useQuery({
        queryKey: ['personal-data'],
        queryFn: getPersonalData,
        staleTime: Infinity,
    });

    const {
        mutateAsync: order,
        isError,
        isSuccess,
        isPending,
        reset: resetOrder,
    } = useMutation({ mutationFn: orderCall });

    const onSubmit = async (data: TOrderCallFormScheme) => {
        try {
            // if (!captchaVerified) return;
            await order({ ...data, title: 'Помочь с выбором' });
            sendMetrikaGoal();
            reset();
            // setCaptchaVerified(false);
            // if (recaptchaRef.current) recaptchaRef.current.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.banner}>
            <h3>Помочь с выбором?</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder={'Телефон'}
                    theme={'dark'}
                    error={!!errors.phone}
                    className={styles.input}
                    defaultValue={'+7'}
                    {...register('phone', {
                        onChange: (e) => {
                            setValue('phone', maskPhone(e.target.value));
                        },
                    })}
                />
                <Input placeholder={'Имя'} theme={'dark'} error={!!errors.name} {...register('name')} />
                <Checkbox
                    label={
                        <>
                            Я согласен на обработку{' '}
                            <a href={personalData?.image} target={'_blank'}>
                                персональных данных
                            </a>
                        </>
                    }
                    theme={'white'}
                    error={!!errors.checked}
                    className={styles.checkbox}
                    {...register('checked')}
                />
                {/*<Captcha*/}
                {/*    ref={recaptchaRef}*/}
                {/*    onCaptchaVerify={(verify) => setCaptchaVerified(verify)}*/}
                {/*    onExpired={() => setCaptchaVerified(false)}*/}
                {/*    className={styles.captcha}*/}
                {/*/>*/}
                <Button type={'submit'} size={'md'} disabled={isPending}>
                    Отправить
                </Button>
            </form>
            <Modal isOpen={isSuccess || isError} onClose={resetOrder}>
                <StateModal onClose={resetOrder} isError={isError} />
            </Modal>
        </div>
    );
};
