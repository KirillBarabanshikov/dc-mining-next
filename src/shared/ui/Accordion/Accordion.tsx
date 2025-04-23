'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow-up.svg';

import styles from './Accordion.module.scss';

interface IAccordionProps {
  title: string;
  body: string;
  number?: number;
}

export const Accordion: FC<IAccordionProps> = ({ title, body, number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.accordion}>
      <div onClick={handleClick} className={styles.head}>
        <h2>
          {number && <div className={styles.accordionNum}>{number}</div>}
          {title}
        </h2>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ damping: 0 }}
        >
          <ArrowIcon />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.body}
          >
            <p dangerouslySetInnerHTML={{ __html: body }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
