'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal: FC<PropsWithChildren> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted ? createPortal(children, document.getElementById('portal') as HTMLDivElement) : null;
};
