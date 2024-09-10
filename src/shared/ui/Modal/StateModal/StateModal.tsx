import { motion } from 'framer-motion';
import { FC } from 'react';

import ErrorIcon from '@/shared/assets/icons/error.svg';
import SuccessIcon from '@/shared/assets/icons/success.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import modalStyles from '../Modal.module.scss';
import styles from './StateModal.module.scss';

interface IStateModal {
    isError?: boolean;
    onClose: () => void;
}

export const StateModal: FC<IStateModal> = ({ isError, onClose }) => {
    const matches = useMediaQuery(MAX_WIDTH_MD);

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className={styles.state}
        >
            {isError ? <ErrorIcon /> : <SuccessIcon />}
            <h2 className={modalStyles.title}>{isError ? 'Ошибка' : 'Успех'}</h2>
            <p className={modalStyles.subtitle}>
                {isError
                    ? 'Что-то пошло не так, попробуйте снова'
                    : 'Данные успешно отправлены, мы свяжемся с вами в ближайшее время'}
            </p>
            <Button size={matches ? 'md' : 'lg'} onClick={onClose} className={styles.button}>
                Ок
            </Button>
        </motion.div>
    );
};
