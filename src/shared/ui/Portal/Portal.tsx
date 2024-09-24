'use client';

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps extends PropsWithChildren {
    elementId?: string;
}

export const Portal: FC<IPortalProps> = ({ elementId = 'portal', children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted ? createPortal(children, document.getElementById(elementId) as HTMLDivElement) : null;
};
