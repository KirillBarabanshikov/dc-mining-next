'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getContacts } from '@/entities/contacts';
import { formatPhoneNumber, intFormatPhoneNumber, useMangoStore } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';

import styles from './ContactsPage.module.scss';

const paths = [
    { name: 'Главная', path: '/' },
    { name: 'Контакты', path: '/contacts' },
];

export const ContactsPage = () => {
    const { number } = useMangoStore();

    const { data: contacts } = useSuspenseQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
    });

    if (!contacts) return <></>;

    return (
        <div className={styles.contactsPage}>
            <div className={'container'}>
                <Breadcrumbs paths={paths} />
            </div>
            <section>
                <div className={clsx(styles.container, 'container')}>
                    <h1 className={clsx(styles.title, 'section-title-secondary')}>Контакты</h1>
                    <div className={styles.wrap}>
                        <div className={styles.contacts}>
                            <div className={styles.contactWrap}>
                                <div className={styles.contactTitle}>Электронная почта</div>
                                <a href={`mailto:${contacts.email}`} className={styles.contact}>
                                    {contacts.email}
                                </a>
                            </div>
                            <div className={styles.contactWrap}>
                                <div className={styles.contactTitle}>Многоконтактный телефон</div>
                                <a
                                    href={`tel:${intFormatPhoneNumber(number ? number : contacts.phone)}`}
                                    className={styles.contact}
                                >
                                    {formatPhoneNumber(number ? number : contacts.phone)}
                                </a>
                            </div>
                            <div className={styles.contactWrap}>
                                <div className={styles.contactTitle}>Реквизиты</div>
                                <div className={styles.contact}>ООО «ДИСИ ИНТЕГРАТОР»</div>
                                <div className={styles.contact}>ИНН 9705234029, КПП 770501001, ОГРН 1247700722213</div>
                            </div>
                            <div className={styles.contactWrap}>
                                <div className={styles.contactTitle}>Социальные сети</div>
                            </div>
                        </div>
                        <div>1</div>
                        <div>2</div>
                    </div>
                </div>
            </section>
        </div>
    );
};
