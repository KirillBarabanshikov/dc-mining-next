import { PropsWithChildren } from 'react';

import { Layout } from '@/shared/ui';
import { BottomLinks, Header } from '@/widgets';

export default function LayoutWithoutFooter({ children }: PropsWithChildren) {
    return (
        <Layout headerSlot={<Header />} bottomSlot={<BottomLinks />}>
            {children}
        </Layout>
    );
}
