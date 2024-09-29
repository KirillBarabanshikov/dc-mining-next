'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ym) {
            window.ym(98130237, 'hit', pathname);
        }
    }, [pathname]);

    return <>{children}</>;
};
