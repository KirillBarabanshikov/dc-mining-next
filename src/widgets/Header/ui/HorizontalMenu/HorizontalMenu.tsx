'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, Fragment, useEffect, useRef, useState } from 'react';

import { ICategory } from '@/entities/category';
import { Portal } from '@/shared/ui';

import styles from './HorizontalMenu.module.scss';

interface IHorizontalMenuProps {
  categories?: ICategory[] | null;
}

export const HorizontalMenu: FC<IHorizontalMenuProps> = ({ categories }) => {
  return (
    <nav className={styles.horizontalMenu}>
      <ul className={styles.horizontalMenuList}>
        {categories &&
          categories.map((item) => {
            if (!item.displayHeader) return <Fragment key={item.id} />;

            if (item.link || item.subCategory.length === 0) {
              return (
                <li key={item.id} className={styles.horizontalMenuItem}>
                  <Link
                    href={item.link ?? `/catalog/${item.slug}`}
                    className={styles.horizontalMenuLink}
                  >
                    {item.title === 'Готовый бизнес для майнинга криптовалют'
                      ? 'Готовый бизнес'
                      : item.title}
                  </Link>
                </li>
              );
            }

            return <MenuItemDropdown key={item.id} item={item} />;
          })}
      </ul>
    </nav>
  );
};

const MenuItemDropdown: FC<{ item: ICategory }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLLIElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!triggerRef.current || !dropdownRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();

    dropdownRef.current.style.top = `${triggerRect.top + triggerRect.height}px`;
    dropdownRef.current.style.left = `${triggerRect.left}px`;
    dropdownRef.current.style.width = `${triggerRect.width}px`;
  }, [dropdownRef, triggerRef, isOpen]);

  const handleHoverStart = () => {
    setIsOpen(true);
  };

  const handleHoverEnd = () => {
    setIsOpen(false);
  };

  const handleNavigate = (child: {
    id: number;
    slug: string;
    title: string;
  }) => {
    let path = `/catalog/${item.slug}`;

    if (
      item.title === 'ASIC майнеры' ||
      item.title === 'Комплектующие' ||
      item.title === 'Контейнеры для майнинг ферм'
    ) {
      path += `/${child.slug}`;
    }

    if (item.title === 'Прошивки для оборудования') {
      path += `?${new URLSearchParams(`brand=${child.title}`)}`;
    }

    router.push(path);
  };

  return (
    <>
      <motion.li
        ref={triggerRef}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className={clsx(styles.horizontalMenuItem, isOpen && styles.open)}
      >
        <Link
          href={`/catalog/${item.slug}`}
          className={clsx(styles.horizontalMenuLink, styles.dropdownLink)}
        >
          {item.title}
        </Link>
      </motion.li>
      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0.5 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0.5 }}
              ref={dropdownRef}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              className={styles.dropdown}
            >
              <div className={styles.dropdownList}>
                {item.subCategory.map((child) => {
                  return (
                    <div
                      key={child.id}
                      onClick={() => handleNavigate(child)}
                      className={styles.dropdownItem}
                    >
                      <span>{child.title}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};
