import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    FC,
    // useRef,
    // useState
} from 'react';
import { useForm } from 'react-hook-form';

import { orderCall } from '@/entities/call';
import { getPersonalData } from '@/entities/personalData';
import { orderCallFormScheme, TOrderCallFormScheme } from '@/features/call/orderCall';
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

import styles from './OrderCallModal.module.scss';

interface IOrderCallModalProps {
    title: string;
    subtitle: string;
    isOpen: boolean;
    onClose: () => void;
}

export const OrderCallModal: FC<IOrderCallModalProps> = ({ title, subtitle, isOpen, onClose }) => {
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
        try {
            // if (!captchaVerified) return;
            await order({ ...data, title });
            sendMetrikaGoal();
            // setCaptchaVerified(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        reset();
        resetOrder();
        onClose();
    };

    const isFinally = isSuccess || isError;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isFinally ? undefined : title}
            subtitle={isFinally ? undefined : subtitle}
        >
            {isFinally ? (
                <StateModal onClose={handleClose} isError={isError} />
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
                                Я согласен на обработку{' '}
                                <a href={personalData?.image} target={'_blank'}>
                                    персональных данных
                                </a>
                            </>
                        }
                        error={!!errors.checked}
                        {...register('checked')}
                    />
                    {/*<Captcha*/}
                    {/*    ref={recaptchaRef}*/}
                    {/*    onCaptchaVerify={(verify) => setCaptchaVerified(verify)}*/}
                    {/*    onExpired={() => setCaptchaVerified(false)}*/}
                    {/*/>*/}
                    <div className={styles.buttons}>
                        <Button variant={'outline'} onClick={handleClose} size={matches ? 'md' : 'lg'} isWide={matches}>
                            Отмена
                        </Button>
                        <Button type={'submit'} size={matches ? 'md' : 'lg'} isWide={matches} disabled={isPending}>
                            Отправить
                        </Button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
