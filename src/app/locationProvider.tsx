'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useMangoStore } from '@/shared/lib';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const { setNumber } = useMangoStore();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.ym) {
            window.ym(98130237, 'hit', pathname);
        }

        if (window.mgo) {
            window.mgo(function (mg: any) {
                mg?.getNumber('', function (result: any) {
                    setNumber(result.number.toString());
                    window.phone = result.number;
                });
            });
        }
    }, [pathname, setNumber]);

    return <>{children}</>;
};
