import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FC, Fragment, useState } from 'react';

import { ICategory } from '@/entities/category';
import { IContacts } from '@/entities/contacts';
import ArrowDown from '@/shared/assets/icons/arrow-down2.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { ABOUT_LINKS, BASE_URL, SERVICES_LINKS } from '@/shared/consts';
import { formatPhoneNumber, intFormatPhoneNumber } from '@/shared/lib';
import { Portal } from '@/shared/ui';

import styles from './SideMenu.module.scss';

interface ISideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    categories?: ICategory[] | null;
    contacts?: IContacts | null;
}

export const SideMenu: FC<ISideMenuProps> = ({ isOpen, onClose, categories, contacts }) => {
    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className={clsx(styles.menu, 'scrollbar-hide')}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <section>
                                <h4 className={clsx(styles.title, styles.mainTitle)}>
                                    Оборудование
                                    <CloseIcon onClick={onClose} />
                                </h4>
                                <CollapseItemsList categories={categories} />
                            </section>
                            <section>
                                <h4 className={styles.title}>Услуги</h4>
                                <div>
                                    {categories &&
                                        SERVICES_LINKS.map((link) => {
                                            if (link.path === '/readyBusiness') {
                                                return categories
                                                    .filter((category) => category.title === 'readyBusiness')
                                                    .map((category) => (
                                                        <Link
                                                            key={link.path}
                                                            href={`catalog/${category.id}/${category.slug}`}
                                                            className={styles.link}
                                                        >
                                                            {link.title}
                                                        </Link>
                                                    ));
                                            }

                                            return (
                                                <Link key={link.path} href={link.path} className={styles.link}>
                                                    {link.title}
                                                </Link>
                                            );
                                        })}
                                </div>
                            </section>
                            <section>
                                <h4 className={styles.title}>О нас</h4>
                                <div>
                                    {ABOUT_LINKS.map((link) => (
                                        <Link key={link.path} href={link.path} className={styles.link}>
                                            {link.title}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                            <section>
                                <h4 className={styles.title}>Контакты</h4>
                                {contacts && (
                                    <div className={styles.contacts}>
                                        <div>
                                            <div className={styles.subtitle}>Многоконтактный телефон</div>
                                            <a
                                                href={`tel:${intFormatPhoneNumber(typeof window !== 'undefined' && window.phone ? window.phone : contacts.phone)}`}
                                                className='mgo-number'
                                            >
                                                {formatPhoneNumber(
                                                    typeof window !== 'undefined' && window.phone
                                                        ? window.phone
                                                        : contacts.phone,
                                                )}
                                            </a>
                                        </div>
                                        <div>
                                            <div className={styles.subtitle}>Электронная почта</div>
                                            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                                        </div>
                                        <div className={styles.socials}>
                                            {contacts.images.map((social) => {
                                                return (
                                                    <a key={social.id} href={social.url} target={'_blank'}>
                                                        <img
                                                            key={social.id}
                                                            src={BASE_URL + social.image}
                                                            alt={'social'}
                                                        />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </section>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.overlay}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </Portal>
    );
};

const CollapseItemsList = ({ categories }: { categories?: ICategory[] | null }) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleClick = (index: number) => {
        if (selectedItems.includes(index)) {
            return setSelectedItems(selectedItems.filter((item) => item !== index));
        }
        setSelectedItems([...selectedItems, index]);
    };

    return (
        <div className={styles.collapseItems}>
            {categories &&
                categories.map((item, index) => {
                    if (item.link || item.title === 'readyBusiness') return <Fragment key={item.id} />;

                    return (
                        <div key={item.id}>
                            <div onClick={() => handleClick(index)} className={styles.collapseItem}>
                                <span>{item.name}</span>
                                <motion.span
                                    animate={{ rotate: selectedItems.includes(index) ? 180 : 0 }}
                                    transition={{ damping: 0 }}
                                    className={styles.icon}
                                >
                                    <ArrowDown />
                                </motion.span>
                            </div>
                            <AnimatePresence initial={false}>
                                {selectedItems.includes(index) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className={styles.collapseWrap}
                                    >
                                        <div className={styles.collapseBody}>
                                            {item.subCategory.map((child) => {
                                                let href = `/catalog/${item.id}/${item.slug}`;
                                                if (item.title === 'asicMiners' || item.title === 'firmware') {
                                                    href += `?brand=${child.title}`;
                                                }
                                                if (item.title === 'accessories' || item.title === 'containersMining') {
                                                    href += `?filter=${child.title}`;
                                                }

                                                return (
                                                    <Link key={child.id} href={href} className={styles.link}>
                                                        {child.title}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
        </div>
    );
};
