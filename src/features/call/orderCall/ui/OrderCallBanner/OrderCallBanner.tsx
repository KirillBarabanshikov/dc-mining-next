// import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { orderCall } from '@/entities/call';
import { getPersonalData } from '@/entities/personalData';
import { orderCallFormScheme, TOrderCallFormScheme } from '@/features/call/orderCall';
import miner from '@/shared/assets/images/data-center/miner.png';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery, useMetrikaGoal } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
// import ReCAPTCHA from 'react-google-recaptcha';
import {
    Button,
    // Captcha,
    Checkbox,
    Input,
    Modal,
    StateModal,
} from '@/shared/ui';

import styles from './OrderCallBanner.module.scss';

export const OrderCallBanner = () => {
    // const [captchaVerified, setCaptchaVerified] = useState(false);
    // const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { sendMetrikaGoal } = useMetrikaGoal();

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

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TOrderCallFormScheme>({ resolver: yupResolver(orderCallFormScheme) });

    const onSubmit = async (data: TOrderCallFormScheme) => {
        // if (!captchaVerified) return;
        const entryPoint = sessionStorage.getItem('entryPoint') || '';
        try {
            await order({ ...data, title: 'Заказать обратный звонок', entryPoint });
            sendMetrikaGoal();
            reset();
            // setCaptchaVerified(false);

            // if (recaptchaRef.current) {
            //     recaptchaRef.current.reset();
            // }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className={styles.banner}>
                <div className={'container'}>
                    <div className={styles.wrap}>
                        <img src={miner.src} alt={'Miner'} />
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <h2>Заказать обратный звонок</h2>
                            <p>Оставьте свои контакты и мы вам перезвоним</p>
                            <div className={styles.formFields}>
                                <Input
                                    placeholder={'Имя'}
                                    error={!!errors.name}
                                    className={styles.input}
                                    {...register('name')}
                                />
                                <Input
                                    placeholder={'Телефон'}
                                    error={!!errors.phone}
                                    className={styles.input}
                                    defaultValue={'+7'}
                                    {...register('phone', {
                                        onChange: (e) => {
                                            setValue('phone', maskPhone(e.target.value));
                                        },
                                    })}
                                />
                            </div>
                            <Checkbox
                                theme={'white'}
                                label={
                                    <>
                                        Я согласен на обработку{' '}
                                        <a href={personalData?.image} target={'_blank'}>
                                            персональных данных
                                        </a>
                                    </>
                                }
                                error={!!errors.checked}
                                className={styles.checkbox}
                                {...register('checked')}
                            />
                            <div className={styles.buttons}>
                                {/*<Captcha*/}
                                {/*    ref={recaptchaRef}*/}
                                {/*    onCaptchaVerify={(verify) => setCaptchaVerified(verify)}*/}
                                {/*    onExpired={() => setCaptchaVerified(false)}*/}
                                {/*/>*/}
                                <Button
                                    type={'submit'}
                                    size={matches ? 'md' : 'lg'}
                                    isWide={matches}
                                    disabled={isPending}
                                >
                                    Отправить
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Modal isOpen={isSuccess || isError} onClose={resetOrder}>
                <StateModal onClose={resetOrder} isError={isError} />
            </Modal>
        </>
    );
};
