'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import { BASE_URL } from '@/shared/consts';

import styles from './Advantages.module.scss';

interface IAdvantagesProps {
    advantages?: IAdvantageItem[];
}

export const Advantages: FC<IAdvantagesProps> = ({ advantages }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new ResizeObserver(() => {
            if (!ref.current) return;
            ref.current.style.height = 'initial';
            const rect = ref.current.getBoundingClientRect();
            ref.current.style.height = `${rect.height}px`;
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [advantages]);

    return (
        <div className={clsx(styles.advantages)}>
            <div ref={ref} className={clsx(styles.advantagesContainer, 'container-wide')}>
                {advantages &&
                    advantages.map((advantage) => {
                        return (
                            <AdvantageItem
                                key={advantage.id}
                                id={advantage.id}
                                description={advantage.description}
                                image={advantage.image}
                                title={advantage.title}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

interface IAdvantageItem {
    id: number;
    description: string;
    image: string;
    title: string;
}

const AdvantageItem: FC<IAdvantageItem> = (advantage) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={styles.item}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className={styles.image}>
                <img src={BASE_URL + advantage.image} alt={advantage.title} />
            </div>
            <p className={styles.title}>{advantage.title}</p>
            <AnimatePresence initial={false}>
                {isHovered && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className={styles.body}>
                            <p className={styles.desc} dangerouslySetInnerHTML={{ __html: advantage.description }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
