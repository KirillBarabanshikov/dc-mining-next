'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';

import { OrderCallModal } from '@/features/call';
import calculator from '@/shared/assets/images/managers/calculator.png';
import manager from '@/shared/assets/images/managers/manager.png';
import { MAX_WIDTH_LG } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './Managers.module.scss';

interface IManagersProps {
    className?: string;
}

export const Managers: FC<IManagersProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const matches = useMediaQuery(MAX_WIDTH_LG);

    return (
        <div className={clsx(styles.managers, className)}>
            <section className={styles.request}>
                <h3>Не знаете какое оборудование выбрать?</h3>
                <p>Направьте запрос нашим менеджерам </p>
                <Button size={!matches ? 'lg' : 'md'} onClick={() => setIsOpen(true)} className={styles.button}>
                    Оставить запрос
                </Button>
                <Image src={manager} alt={'Manager'} />
            </section>
            <section className={styles.calculator}>
                <h4>Либо воспользуйтесь калькулятором доходности</h4>
                <Button theme={'white'} size={!matches ? 'lg' : 'md'} className={styles.button}>
                    Скоро
                </Button>
                <Image src={calculator} alt={'Calculator'} />
            </section>

            <OrderCallModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={'Выбор оборудования'}
                subtitle={'Оставьте контактные данные и наши менеджеры помогут вам с выбором'}
            />
        </div>
    );
};
