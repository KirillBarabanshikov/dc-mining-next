'use client';

import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

export const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (window.ym) {
            window.ym(98130237, 'hit', pathname);
        }

        if (window.mgo) {
            window.mgo(function (mg: any) {
                mg?.getNumber('', function (result: any) {
                    window.phone = result.number;
                });
            });
        }
    }, [pathname]);

    return <>{children}</>;
};
