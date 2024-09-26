import { useSuspenseQuery } from '@tanstack/react-query';

import { getContacts } from '@/entities/contacts';
import img from '@/shared/assets/images/call/call-me.png';
import { formatPhoneNumber, intFormatPhoneNumber } from '@/shared/lib';

import styles from './CallMeBanner.module.scss';

export const CallMeBanner = () => {
    const { data: contacts } = useSuspenseQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
    });

    return (
        <section className={styles.banner}>
            <div className={styles.content}>
                <h3>Проблемы с выбором оборудования?</h3>
                <p>Свяжитесь с нами, мы поможем подобрать оптимальное решение</p>
                {contacts && (
                    <div className={styles.links}>
                        <a
                            href={`tel:${intFormatPhoneNumber(typeof window !== 'undefined' && window.phone ? window.phone : contacts.phone)}`}
                            className='mgo-number'
                        >
                            {formatPhoneNumber(
                                typeof window !== 'undefined' && window.phone ? window.phone : contacts.phone,
                            )}
                        </a>
                        <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                    </div>
                )}
            </div>
            <img src={img.src} alt={'Call'} />
        </section>
    );
};
