import { PropsWithChildren } from 'react';

import { Layout } from '@/shared/ui';
import { Footer, Header } from '@/widgets';

export default function BaseLayout({ children }: PropsWithChildren) {
    return (
        <Layout headerSlot={<Header />} footerSlot={<Footer />}>
            {children}
        </Layout>
    );
}
