'use client';

import { SendRequestForm } from '@/features/service';

import styles from './ServicePage.module.scss';

const ServicePage = () => {
    return (
        <div className={styles.service}>
            <div className={'container-wide'}>
                <section className={styles.body}>
                    <h1 className={'section-title'}>Ремонт и сервис</h1>
                    <p className={styles.subtitle}>Опишите характер проблемы и наши специалисты помогут вам</p>
                    <SendRequestForm />
                </section>
                <div className={styles.background} />
            </div>
        </div>
    );
};

export default ServicePage;
