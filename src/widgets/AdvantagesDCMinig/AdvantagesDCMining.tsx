import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

import { IAdvantage } from '@/entities/pageInfo/model';
import { BASE_URL } from '@/shared/consts';

import styles from './AdvantagesDCMinig.module.scss';

interface IAdvantagesDCMiningProps {
    advantages?: IAdvantage[];
}

export const AdvantagesDCMining: FC<IAdvantagesDCMiningProps> = ({ advantages }) => {
    return (
        <section className={styles.advantages}>
            <div className={'container'}>
                <h2 className={clsx(styles.advantagesTitle, 'section-title-primary')}>
                    Преимущества <span>DC Mining</span>
                </h2>
                <div className={styles.wrap}>
                    {advantages &&
                        advantages.map((advantage) => {
                            return (
                                <article key={advantage.id} className={styles.advantage}>
                                    <div className={styles.placeholder}>
                                        <Image
                                            src={BASE_URL + advantage.image}
                                            alt={advantage.title}
                                            width={160}
                                            height={160}
                                        />
                                    </div>
                                    <p className={styles.title}>{advantage.title}</p>
                                    <div
                                        className={styles.subtitle}
                                        dangerouslySetInnerHTML={{ __html: advantage.description }}
                                    />
                                </article>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};
