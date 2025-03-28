'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { ICategory } from '@/entities/category';
import { IContacts } from '@/entities/contacts';
import Logo from '@/shared/assets/logo.svg';
import { BASE_URL } from '@/shared/consts';
import {
  formatPhoneNumber,
  intFormatPhoneNumber,
  useMangoStore,
} from '@/shared/lib';

import styles from './Footer.module.scss';

interface IFooterContentProps {
  contacts?: IContacts | null;
  categories?: ICategory[] | null;
}

export const FooterContent: FC<IFooterContentProps> = ({
  categories,
  contacts,
}) => {
  const { number } = useMangoStore();

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
                    .filter((category) => category.title === 'ASIC майнеры')
                    .map((category) => {
                      return (
                        <Link
                          key={category.id}
                          href={`/catalog/${category.slug}`}
                          className={styles.link}
                        >
                          {category.title}
                        </Link>
                      );
                    })}
                <Link href={'/data-center'} className={styles.link}>
                  Размещение в дата центре
                </Link>
                {categories &&
                  categories
                    .filter(
                      (category) =>
                        category.title ===
                        'Готовый бизнес для майнинга криптовалют',
                    )
                    .map((category) => {
                      return (
                        <Link
                          key={category.id}
                          href={`/catalog/${category.slug}`}
                          className={styles.link}
                        >
                          Готовый бизнес для майнинга криптовалют
                        </Link>
                      );
                    })}
              </div>
            </section>
            <section>
              <h5>
                <Link href={'/contacts'}>Контакты</Link>
              </h5>
              <div className={styles.wrap}>
                <a
                  href={`tel:${intFormatPhoneNumber(number ? number : contacts.phone)}`}
                  className={clsx(styles.contact, 'mgo-number')}
                >
                  {formatPhoneNumber(number ? number : contacts.phone)}
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
                      <Image
                        src={BASE_URL + social.image}
                        alt={'social'}
                        width={48}
                        height={48}
                      />
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
