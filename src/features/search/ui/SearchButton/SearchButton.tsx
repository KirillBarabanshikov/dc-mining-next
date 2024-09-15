import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';

import SearchIcon from '@/shared/assets/icons/search.svg';
import SearchIcon2 from '@/shared/assets/icons/search2.svg';
import { MAX_WIDTH_MD } from '@/shared/consts';
import { useMediaQuery } from '@/shared/lib';

import { Search } from '../Search';
import styles from './SearchButton.module.scss';

interface ISearchButtonProps {
    className?: string;
}

export const SearchButton: FC<ISearchButtonProps> = ({ className }) => {
    const [isShown, setIsShown] = useState(false);

    const matchesMD = useMediaQuery(MAX_WIDTH_MD);

    return (
        <>
            <div onClick={() => setIsShown(true)} className={className}>
                {matchesMD ? <SearchIcon2 className={styles.icon} /> : <SearchIcon className={styles.icon} />}
                <span>Поиск</span>
            </div>
            <AnimatePresence>
                {isShown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.search}
                    >
                        <Search autoFocus={true} onClose={() => setIsShown(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
