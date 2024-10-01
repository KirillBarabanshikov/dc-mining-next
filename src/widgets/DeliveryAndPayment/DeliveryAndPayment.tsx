'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { getDeliveryInfo, getPaymentInfo, IDeliveryAndPaymentInfo } from '@/entities/pageInfo';
import { BASE_URL } from '@/shared/consts';

import styles from './DeliveryAndPayment.module.scss';

interface IDeliveryAndPaymentProps {
    variant?: 'page' | 'productInfo';
}

export const Delivery: FC<IDeliveryAndPaymentProps> = ({ variant = 'page' }) => {
    const { data: deliveries } = useSuspenseQuery({
        queryKey: ['delivery'],
        queryFn: getDeliveryInfo,
        staleTime: Infinity,
    });

    return (
        <div className={clsx(styles.delivery, styles[variant])}>
            {deliveries && (
                <section>
                    {variant === 'page' ? <h1>Доставка</h1> : <h2>Доставка</h2>}
                    <div className={styles.wrap}>
                        {deliveries.map((data) => {
                            return <DeliveryAndPaymentCard key={data.id} data={data} />;
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export const Payments: FC<IDeliveryAndPaymentProps> = ({ variant = 'page' }) => {
    const { data: payments } = useSuspenseQuery({
        queryKey: ['payment'],
        queryFn: getPaymentInfo,
        staleTime: Infinity,
    });

    return (
        <div className={clsx(styles.delivery, styles[variant])}>
            {payments && (
                <section>
                    {variant === 'page' ? <h1>Оплата</h1> : <h2>Оплата</h2>}
                    <div className={styles.wrap}>
                        {payments.map((data) => {
                            return <DeliveryAndPaymentCard key={data.id} data={data} />;
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

interface IDeliveryCardProps {
    data: IDeliveryAndPaymentInfo;
}

const DeliveryAndPaymentCard: FC<IDeliveryCardProps> = ({ data }) => {
    return (
        <div className={styles.card}>
            <div className={styles.title}>
                <Image src={BASE_URL + data.image} alt={data.title} width={24} height={24} />
                <p>{data.title}</p>
            </div>
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
    );
};
