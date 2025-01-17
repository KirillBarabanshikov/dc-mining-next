'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { BASE_URL } from '@/shared/consts';

import styles from './Advantages.module.scss';

interface IAdvantagesProps {
  advantages?: IAdvantageItem[];
  className?: string;
}

export const Advantages: FC<IAdvantagesProps> = ({ advantages, className }) => {
  return (
    <div className={clsx(styles.advantages, className)}>
      <div className={clsx(styles.advantagesContainer, 'container')}>
        {advantages &&
          advantages.map((advantage) => {
            return (
              <AdvantageItem
                key={advantage.id}
                id={advantage.id}
                description={advantage.description}
                image={advantage.image}
                title={advantage.title}
                link={advantage.link}
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
  link?: string;
}

const AdvantageItem: FC<IAdvantageItem> = (advantage) => {
  return (
    <Link href={advantage.link || ''} className={styles.item}>
      <div className={styles.image}>
        <Image
          src={BASE_URL + advantage.image}
          alt={advantage.title}
          width={160}
          height={160}
        />
      </div>
      <p className={styles.title}>{advantage.title}</p>
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: advantage.description }}
      />
    </Link>
  );
};
