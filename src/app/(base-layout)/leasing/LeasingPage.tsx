'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useState } from 'react';

import { getContacts } from '@/entities/contacts';
import { getLeasingInfo } from '@/entities/pageInfo';
import { OrderCallModal } from '@/features/call';
import dottedLine from '@/shared/assets/images/leasing/dotted-line.png';
import dottedLineMd from '@/shared/assets/images/leasing/dotted-line-md.png';
import dottedLineMd2 from '@/shared/assets/images/leasing/dotted-line-md2.png';
import dottedLineSm from '@/shared/assets/images/leasing/dotted-line-sm.png';
import dottedLineSm2 from '@/shared/assets/images/leasing/dotted-line-sm2.png';
import dottedLine2 from '@/shared/assets/images/leasing/dotted-line2.png';
import { MAX_WIDTH_LG, MAX_WIDTH_MD } from '@/shared/consts';
import { formatPhoneNumber, intFormatPhoneNumber, useMediaQuery } from '@/shared/lib';
import { Button } from '@/shared/ui';

import styles from './Leasing.module.scss';

const LeasingPage: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const matches = useMediaQuery(MAX_WIDTH_MD);
    const matchesMd = useMediaQuery('(max-width: 854px)');
    const matchesLg = useMediaQuery(MAX_WIDTH_LG);

    const { data: info } = useQuery({
        queryKey: ['leasing'],
        queryFn: getLeasingInfo,
        staleTime: Infinity,
    });
    const { data: contacts } = useQuery({
        queryKey: ['contacts'],
        queryFn: getContacts,
        staleTime: Infinity,
    });

    const currentLine = matchesMd ? dottedLineSm : matchesLg ? dottedLineMd : dottedLine;
    const currentLine2 = matchesMd ? dottedLineSm2 : matchesLg ? dottedLineMd2 : dottedLine2;

    return (
        <div className={styles.leasing}>
            <div className={'sections'}>
                <section className={styles.leasingBanner}>
                    <div className={clsx(styles.leasingContainer, 'container')}>
                        <h1>Лизинг</h1>
                        {info && (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: info.description }}
                            />
                        )}
                        <Button size={matches ? 'md' : 'lg'} isWide={matches} onClick={() => setIsOpen(true)}>
                            Получить консультацию
                        </Button>
                    </div>
                    <div className={styles.background}></div>
                </section>
                <div className={styles.leasingInfo}>
                    <div className={'container'}>
                        <div className={styles.wrap}>
                            {info &&
                                info.information.map((item) => {
                                    return (
                                        <div key={item.id} className={styles.infoItem}>
                                            <p className={styles.title}>{item.title}</p>
                                            <div
                                                className={styles.subtitle}
                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <section className={styles.leasingDesc}>
                    <div className={'container'}>
                        <h2
                            className={clsx(styles.title, 'section-title-primary')}
                            dangerouslySetInnerHTML={{ __html: info?.informationTitle ?? '' }}
                        ></h2>
                        <div className={styles.wrap}>
                            {info &&
                                info.steps.map((step, index) => {
                                    return (
                                        <div key={step.id} className={styles.item}>
                                            <div className={styles.number}>{++index}</div>
                                            <div
                                                className={styles.desc}
                                                dangerouslySetInnerHTML={{ __html: step.description }}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </section>
                <section className={styles.leasingHowItWork}>
                    <div className={'container'}>
                        <h2 className={clsx(styles.title, 'section-title-primary')}>Как работает лизинг</h2>
                        <div className={styles.wrap}>
                            <div className={styles.item}>
                                <div className={styles.number}>1</div>
                                <p>Мы подбираем оборудование и высылаем вам коммерческое предложение.</p>
                                <img src={currentLine.src} alt={'Line'} className={styles.dottedLine} />
                            </div>
                            <div className={styles.item}>
                                <div className={styles.number}>2</div>
                                <p>Собираем документы: менеджер подскажет, что входит в комплект.</p>
                                <img
                                    src={currentLine.src}
                                    alt={'Line'}
                                    className={clsx(styles.dottedLine, styles.bottom)}
                                />
                            </div>
                            <div className={styles.item}>
                                <div className={styles.number}>3</div>
                                <p>Согласовываем условия финансирования, страхования и доставки.</p>
                                <img src={currentLine.src} alt={'Line'} className={styles.dottedLine} />
                            </div>
                            <div className={styles.item}>
                                <div className={styles.number}>4</div>
                                <p>Заключаем договор, после чего вы вносите аванс</p>
                                <img
                                    src={currentLine2.src}
                                    alt={'Line'}
                                    className={clsx(styles.dottedLine, styles.dottedLineFinal)}
                                />
                            </div>
                            <div className={clsx(styles.item, styles.finalItem)}>
                                <div className={styles.number}>5</div>
                                <p>
                                    Поставляем оборудование — а вы начинаете получать доход 65% годовых и вносить
                                    комфортные платежи по графику
                                </p>
                                <Button isWide={matches} onClick={() => setIsOpen(true)}>
                                    Получить консультацию
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={clsx(styles.contactsBanner)}>
                    <div className={'container'}>
                        <div className={clsx(styles.wrap)}>
                            <div className={styles.content}>
                                <h2>Хотите узнать, подойдёт ли лизинг вашей компании?</h2>
                                <p>
                                    <span>Свяжитесь с нами </span> — мы индивидуально обсудим условия сотрудничества
                                </p>
                                <div className={styles.links}>
                                    {contacts && (
                                        <>
                                            <a
                                                className='mgo-number'
                                                href={`tel:${intFormatPhoneNumber(typeof window !== 'undefined' && window.phone ? window.phone : contacts.phone)}`}
                                            >
                                                {formatPhoneNumber(
                                                    typeof window !== 'undefined' && window.phone
                                                        ? window.phone
                                                        : contacts.phone,
                                                )}
                                            </a>
                                        </>
                                    )}
                                    {contacts && <a href={`mailto:${contacts.email}`}>{contacts.email}</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <OrderCallModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={'Заказать звонок'}
                subtitle={'Оставьте свои контакты и мы вам перезвоним'}
            />
        </div>
    );
};

export default LeasingPage;
