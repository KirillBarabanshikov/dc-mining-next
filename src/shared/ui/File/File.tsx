'use client';

import clsx from 'clsx';
import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';

import FileIcon from '@/shared/assets/icons/file.svg';

import styles from './File.module.scss';

interface IFileProps extends InputHTMLAttributes<HTMLInputElement> {
    reset?: boolean;
}

export const File = forwardRef<HTMLInputElement, IFileProps>(({ className, onChange, reset, ...props }, ref) => {
    const [file, setFile] = useState('');

    useEffect(() => {
        reset && setFile('Файл не выбран');
    }, [reset]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        if (!e.target.files) return;
        setFile(e.target.files.length ? e.target.files[0].name : 'Файл не выбран');
    };

    return (
        <label className={clsx(styles.file, className)}>
            <input type='file' onChange={handleChange} ref={ref} {...props} />
            <span className={styles.label}>{file ? truncate(file) : 'Файл не выбран'}</span>
            <div className={styles.icon}>
                <FileIcon />
            </div>
        </label>
    );
});

File.displayName = 'File';

function truncate(string: string) {
    if (string.length < 18) return string;

    return string.substring(0, 8) + '...' + string.substring(string.length - 10);
}
