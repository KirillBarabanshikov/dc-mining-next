'use client';

import axios from 'axios';
import clsx from 'clsx';

import LogoutIcon from '@/shared/assets/icons/logout.svg';

import styles from './ManagerPage.module.scss';

export const ManagerPage = () => {
  const handleLogout = async () => {
    await axios.post('/api/logout');
    window.location.href = '/';
  };

  return (
    <div className={styles.managerPage}>
      <div className={clsx('container', styles.container)}>
        <button onClick={handleLogout} className={styles.btn}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};
