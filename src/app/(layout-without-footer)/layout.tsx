import { PropsWithChildren } from 'react';

import { Layout } from '@/shared/ui';
import { Header } from '@/widgets';

export default function LayoutWithoutFooter({ children }: PropsWithChildren) {
    return <Layout headerSlot={<Header />}>{children}</Layout>;
}
