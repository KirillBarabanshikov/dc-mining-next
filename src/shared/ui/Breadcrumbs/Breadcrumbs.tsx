import clsx from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow-right.svg';

import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsPath {
    name: string;
    path?: string;
}

interface IBreadcrumbsProps {
    paths: IBreadcrumbsPath[];
    className?: string;
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ paths, className }) => {
    return (
        <ul className={clsx(styles.breadcrumbs, className)} itemScope itemType='https://schema.org/BreadcrumbList'>
            {paths.map((path, index) => {
                return (
                    <li key={index} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        {index > 0 && <ArrowIcon />}
                        {path.path ? (
                            <Link href={path.path} className={styles.link} title={path.name} itemProp='item'>
                                <span itemProp='name'>{path.name}</span>
                                <meta itemProp='position' content={String(index)} />
                            </Link>
                        ) : (
                            <span className={styles.link}>{path.name}</span>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
