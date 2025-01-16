'use client';

import { Calculator } from '@/widgets/Calculator';

import styles from './ManagerPage.module.scss';

export const ManagerPage = () => {
  return (
    <div className={styles.managerPage}>
      <div className={'container'}>
        <Calculator type={'pro'} isManager />
      </div>
    </div>
  );
};
