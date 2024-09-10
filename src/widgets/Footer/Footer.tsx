import clsx from 'clsx';
import Link from 'next/link';

import { getCategories } from '@/entities/category';
import { getContacts } from '@/entities/contacts';
import Logo from '@/shared/assets/logo.svg';
import { BASE_URL } from '@/shared/consts';
import { formatPhoneNumber, intFormatPhoneNumber } from '@/shared/lib';

import styles from './Footer.module.scss';

export const Footer = async () => {
    const [contacts, categories] = await Promise.all([getContacts(), getCategories()]);

    return (
        <footer className={styles.footer}>
            <div className={clsx(styles.container, 'container')}>
                <div className={styles.logo}>
                    <Link href={'/'}>
                        <Logo />
                    </Link>
                </div>
                {contacts && (
                    <>
                        <section>
                            <h5>Услуги</h5>
                            <div className={styles.wrap}>
                                {categories &&
                                    categories
                                        .filter((category) => category.title === 'asicMiners')
                                        .map((category) => {
                                            return (
                                                <Link
                                                    key={category.id}
                                                    href={`/catalog/${category.id}/${category.slug}`}
                                                    className={styles.link}
                                                >
                                                    {category.name}
                                                </Link>
                                            );
                                        })}
                                <Link href={'/data-center'} className={styles.link}>
                                    Размещение в дата центре
                                </Link>
                                {categories &&
                                    categories
                                        .filter((category) => category.title === 'readyBusiness')
                                        .map((category) => {
                                            return (
                                                <Link
                                                    key={category.id}
                                                    href={`/catalog/${category.id}/${category.slug}`}
                                                    className={styles.link}
                                                >
                                                    Готовый бизнес под ключ
                                                </Link>
                                            );
                                        })}
                            </div>
                        </section>
                        <section>
                            <h5>Контакты</h5>
                            <div className={styles.wrap}>
                                <a href={`tel:${intFormatPhoneNumber(contacts.phone)}`} className={styles.contact}>
                                    {formatPhoneNumber(contacts.phone)}
                                </a>
                                <a href={`mailto:${contacts.email}`} className={styles.contact}>
                                    {contacts.email}
                                </a>
                            </div>
                        </section>
                        <section>
                            <h5>Офис</h5>
                            <div className={styles.wrap}>
                                <div
                                    className={clsx(styles.link, styles.address)}
                                    dangerouslySetInnerHTML={{ __html: contacts.office }}
                                />
                            </div>
                        </section>
                        <section>
                            <h5>О компании</h5>
                            <div className={styles.socials}>
                                {contacts.images.map((social) => {
                                    return (
                                        <a key={social.id} href={social.url} target={'_blank'}>
                                            <img src={BASE_URL + social.image} alt={'social'} />
                                        </a>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </footer>
    );
};
