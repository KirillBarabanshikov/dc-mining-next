'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { getContacts } from '@/entities/contacts';
import PhoneIcon from '@/shared/assets/icons/phone.svg';
import { BASE_URL, MAX_WIDTH_MD } from '@/shared/consts';
import { intFormatPhoneNumber, useMediaQuery } from '@/shared/lib';
import { Portal } from '@/shared/ui';

import styles from './BottomLinks.module.scss';

export const BottomLinks = () => {
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const { data: contacts } = useQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
    });

    if (!matches || !contacts) return <></>;

    return (
        <Portal>
            <div className={styles.bottomLinks}>
                <div className={styles.bottomLinksContainer}>
                    {contacts.contactHeaders.map((contact) => {
                        return (
                            <a
                                key={contact.id}
                                href={contact.url}
                                target={'_blank'}
                                className={clsx(styles.option, styles[contact.title.toLowerCase()])}
                            >
                                <div className={styles.icon}>
                                    <img src={`${BASE_URL}/${contact.image}`} alt={contact.title} />
                                </div>
                            </a>
                        );
                    })}
                    <a
                        href={`tel:${intFormatPhoneNumber(typeof window !== 'undefined' && window.phone ? window.phone : contacts.phone)}`}
                        className={styles.option}
                    >
                        <div className={styles.icon}>
                            <PhoneIcon />
                        </div>
                    </a>
                </div>
            </div>
        </Portal>
    );
};
