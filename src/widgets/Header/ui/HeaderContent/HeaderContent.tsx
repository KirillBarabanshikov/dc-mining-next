'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { ICategory } from '@/entities/category';
import { IContacts } from '@/entities/contacts';
import { useCompareStore, useFavoritesStore } from '@/entities/product';
import { OrderCallModal } from '@/features/call';
import { Search, SearchButton } from '@/features/search';
import HeartIcon from '@/shared/assets/icons/heart.svg';
import HeartIcon2 from '@/shared/assets/icons/heart2.svg';
import PhoneIcon from '@/shared/assets/icons/phone.svg';
import StatisticIcon from '@/shared/assets/icons/statistic.svg';
import StatisticIcon2 from '@/shared/assets/icons/statistic2.svg';
import Logo from '@/shared/assets/logo.svg';
import { BASE_URL, MAX_WIDTH_MD, MAX_WIDTH_XL } from '@/shared/consts';
import { formatPhoneNumber, intFormatPhoneNumber, useBodyScrollLock, useMediaQuery, useStore } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

import { Burger } from '../Burger';
import { HorizontalMenu } from '../HorizontalMenu';
import { SideMenu } from '../SideMenu';
import styles from './HeaderContent.module.scss';

interface IHeaderContentProps {
    categories?: ICategory[];
    contacts?: IContacts;
}

export const HeaderContent: FC<IHeaderContentProps> = ({ contacts, categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isLocked, setIsLocked } = useBodyScrollLock();
    const pathname = usePathname();
    const matchesLG = useMediaQuery(MAX_WIDTH_XL);
    const matchesMD = useMediaQuery(MAX_WIDTH_MD);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        setIsOpen(false);
        setIsLocked(false);
    }, [pathname, setIsLocked]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsSticky(scrollTop > 0);
    };

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
        setIsLocked(!isLocked);
    };

    return (
        <>
            <header className={clsx(styles.header, isSticky && styles.sticky)}>
                <div className={styles.headerContainer}>
                    <div className={styles.mainMenu}>
                        <IconButton
                            icon={<Burger />}
                            onClick={toggleMenu}
                            className={styles.menuIcon}
                            aria-label={'burger-menu'}
                        />
                        <Link href={'/'} aria-label={'Logo'} className={styles.logo}>
                            <Logo />
                        </Link>
                        {!matchesLG && <Search className={styles.search} />}
                        <div className={styles.options}>
                            {matchesLG && <SearchButton className={clsx(styles.option, styles.searchOption)} />}
                            <FavoritesOption />
                            <CompareOption />
                            <div className={styles.contacts}>
                                {contacts &&
                                    contacts.contactHeaders.map((contact) => {
                                        return (
                                            <a
                                                key={contact.id}
                                                href={contact.url}
                                                target={'_blank'}
                                                className={styles.option}
                                            >
                                                <div className={styles.icon}>
                                                    <img
                                                        src={`${BASE_URL}/${contact.image}`}
                                                        alt={`social ${contact.title}`}
                                                        loading={'lazy'}
                                                    />
                                                </div>
                                                <span>{contact.title}</span>
                                            </a>
                                        );
                                    })}
                                <OrderCallOption />
                            </div>
                        </div>
                    </div>
                    <div className={styles.horizontalMenu}>
                        {!matchesMD && <HorizontalMenu categories={categories} />}
                        {contacts && (
                            <div className={styles.horizontalMenuContacts}>
                                <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                                <a href={`tel:${intFormatPhoneNumber(contacts.phone)}`}>
                                    {formatPhoneNumber(contacts.phone)}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <SideMenu isOpen={isOpen} onClose={toggleMenu} categories={categories} contacts={contacts} />
        </>
    );
};

const FavoritesOption = () => {
    const matchesMD = useMediaQuery(MAX_WIDTH_MD);
    const store = useStore(useFavoritesStore, (state) => state);
    const pathname = usePathname();

    return (
        <Link href={'/favorites'} className={clsx(styles.option, pathname === '/favorites' && styles.active)}>
            <div className={styles.icon}>
                {matchesMD ? <HeartIcon2 /> : <HeartIcon />}
                {!!store?.favorites.length && <div className={styles.count}>{store?.favorites.length}</div>}
            </div>
            <span>Избранное</span>
        </Link>
    );
};

const CompareOption = () => {
    const matchesMD = useMediaQuery(MAX_WIDTH_MD);
    const store = useStore(useCompareStore, (state) => state);
    const pathname = usePathname();

    return (
        <Link href={'/compare'} className={clsx(styles.option, pathname === '/compare' && styles.active)}>
            <div className={styles.icon}>
                {matchesMD ? <StatisticIcon2 /> : <StatisticIcon />}
                {!!store?.compare.length && <div className={styles.count}>{store?.compare.length}</div>}
            </div>
            <span>Сравнить</span>
        </Link>
    );
};

const OrderCallOption = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles.option} onClick={() => setIsOpen(true)}>
                <div className={styles.icon}>
                    <PhoneIcon />
                </div>
                <span>Заказать звонок</span>
            </div>
            <OrderCallModal
                title={'Заказать звонок'}
                subtitle={'Оставьте свои контакты и мы вам перезвоним'}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
};
