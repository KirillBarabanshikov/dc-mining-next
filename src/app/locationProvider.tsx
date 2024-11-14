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

        if (!localStorage.getItem('entryPoint')) {
            const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
            localStorage.setItem('entryPoint', fullUrl);
        }

        if (window.ym) {
            window.ym(98130237, 'hit');
        }
    }, [pathname, searchParams, setNumber]);

    return <>{children}</>;
};
