'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useMangoStore } from '@/shared/lib';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setNumber } = useMangoStore();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.ym) {
            window.ym(98130237, 'hit');
        }
    }, [pathname, searchParams, setNumber]);

    useEffect(() => {
        if (!sessionStorage.getItem('entryPoint')) {
            sessionStorage.setItem('entryPoint', document.referrer);
        }
    }, []);

    return <>{children}</>;
};
