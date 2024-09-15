'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import Banner1 from '@/shared/assets/images/main/banner1.jpg';
import Banner2 from '@/shared/assets/images/main/banner2.jpeg';
import Banner3 from '@/shared/assets/images/main/banner3.png';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './MainBannersList.module.scss';

interface IMainBannersListProps {
    className?: string;
}

export const MainBannersList: FC<IMainBannersListProps> = ({ className }) => {
    return (
        <div>
            <div className={'container-wide'}>
                <div className={clsx(styles.mainBannersList, className)}>
                    {data.map((item, index) => {
                        return (
                            <BannerCard
                                key={index}
                                title={item.title}
                                subtitle={item.subtitle}
                                image={item.image}
                                link={item.link}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

interface IBannerCardProps {
    title: string;
    subtitle: string;
    link: string;
    image: StaticImageData;
}

const BannerCard: FC<IBannerCardProps> = ({ title, subtitle, link, image }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    const matches = useMediaQuery(MAX_WIDTH_MD);

    return (
        <motion.div
            className={styles.bannerCard}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className={styles.wrap}>
                <h3>{title}</h3>
                <AnimatePresence initial={false}>
                    {(isHovered || matches) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className={styles.content}
                        >
                            <p>{subtitle}</p>
                            <Button onClick={() => router.push(link)} className={styles.button}>
                                Подробнее
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Image width={580} height={300} src={image} alt={`Background Image`} className={styles.background} />
        </motion.div>
    );
};

const data = [
    {
        title: 'О компании',
        subtitle: 'Ведущий поставщик майнингового оборудования в России',
        link: '/about',
        image: Banner1,
    },
    {
        title: 'О дата-центре',
        subtitle: 'Ведущий поставщик майнингового оборудования в России',
        link: '/data-center',
        image: Banner2,
    },
    {
        title: 'СМИ о нас',
        subtitle: 'Ведущий поставщик майнингового оборудования в России',
        link: '/news',
        image: Banner3,
    },
];
