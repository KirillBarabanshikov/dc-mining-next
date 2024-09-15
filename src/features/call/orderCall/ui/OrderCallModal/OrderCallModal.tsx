import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { maskPhone } from '@/shared/lib/phone';
import { Button, Captcha, Checkbox, Input, Modal, StateModal } from '@/shared/ui';

import { orderCallFormScheme, TOrderCallFormScheme } from '../../model';
// import { useOrderCallMutation } from '@/entities/call';
// import { useGetPersonalDataQuery } from '@/entities/personalData';
import styles from './OrderCallModal.module.scss';

interface IOrderCallModalProps {
    title: string;
    subtitle: string;
    isOpen: boolean;
    onClose: () => void;
}

export const OrderCallModal: FC<IOrderCallModalProps> = ({ title, subtitle, isOpen, onClose }) => {
    // const { data: personalData } = useGetPersonalDataQuery();
    // const [orderCall, { isLoading, isError, isSuccess, reset: resetOrderCall }] = useOrderCallMutation();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        setValue,
    } = useForm<TOrderCallFormScheme>({ resolver: yupResolver(orderCallFormScheme) });
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    // const { sendMetrikaGoal } = useMetrikaGoal();

    const onSubmit = async (data: TOrderCallFormScheme) => {
        console.log(data);
        if (!captchaVerified) return;
        // await orderCall({ ...data, title }).unwrap();
        // sendMetrikaGoal();
        setCaptchaVerified(false);
    };

    const handleClose = () => {
        reset();
        // resetOrderCall();
        onClose();
    };

    // const isFinally = isSuccess || isError;
    const isFinally = false;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isFinally ? undefined : title}
            subtitle={isFinally ? undefined : subtitle}
        >
            {isFinally ? (
                <StateModal
                    onClose={handleClose}
                    // isError={isError}
                />
            ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder={'Имя'} error={!!errors.name} className={styles.input} {...register('name')} />
                    <Input
                        placeholder={'Телефон'}
                        defaultValue={'+7'}
                        error={!!errors.phone}
                        className={styles.input}
                        {...register('phone', {
                            onChange: (e) => {
                                setValue('phone', maskPhone(e.target.value));
                            },
                        })}
                    />
                    <Checkbox
                        className={styles.checkbox}
                        label={
                            <>
                                Я согласен на обработку {/*<a href={personalData?.image} target={'_blank'}>*/}
                                {/*    персональных данных*/}
                                {/*</a>*/}
                            </>
                        }
                        error={!!errors.checked}
                        {...register('checked')}
                    />
                    <Captcha
                        ref={recaptchaRef}
                        onCaptchaVerify={(verify) => setCaptchaVerified(verify)}
                        onExpired={() => setCaptchaVerified(false)}
                    />
                    <div className={styles.buttons}>
                        <Button variant={'outline'} onClick={handleClose} size={matches ? 'md' : 'lg'} isWide={matches}>
                            Отмена
                        </Button>
                        <Button
                            type={'submit'}
                            size={matches ? 'md' : 'lg'}
                            isWide={matches}
                            // disabled={isLoading}
                        >
                            Отправить
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
