'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import DownloadIcon from '@/shared/assets/icons/download.svg';
import { Button } from '@/shared/ui';

import { ILink } from '../../model';
import styles from './LinkCard.module.scss';

interface ILinkCardProps {
    link: ILink;
}

export const LinkCard: FC<ILinkCardProps> = ({ link }) => {
    const router = useRouter();

    return (
        <article className={styles.card}>
            <div className={styles.imgArea}>
                <Image src={link.media} alt={link.title} fill sizes={'400px'} />
            </div>
            <div className={styles.body}>
                <h5 className={styles.title}>{link.title}</h5>
                <ul className={styles.info}>
                    {link.information.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
                <div className={styles.buttons}>
                    <Button size={'sm'} isWide onClick={() => router.push(`/links/${link.id}/${link.slug}`)}>
                        Подробнее
                    </Button>
                    <Button size={'sm'} variant={'outline'} isWide>
                        Скачать
                        <DownloadIcon />
                    </Button>
                </div>
            </div>
        </article>
    );
};
