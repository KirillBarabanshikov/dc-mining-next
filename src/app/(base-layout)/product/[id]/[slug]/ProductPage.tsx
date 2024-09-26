'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getAboutInfo } from '@/entities/pageInfo';
import { getProductById } from '@/entities/product';
// import { MAX_WIDTH_MD } from '@/shared/consts';
// import { useMediaQuery } from '@/shared/lib';
import { Breadcrumbs } from '@/shared/ui';
import { AdvantagesDCMining } from '@/widgets';
import { CallMeBanner } from '@/widgets/CallMeBanner';
import { ProductDetails } from '@/widgets/ProductDetails';

import styles from './ProductPage.module.scss';

const paths = [{ name: 'Главная', path: '/' }];

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: product } = useSuspenseQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    });
    const { data: info } = useQuery({
        queryKey: ['about'],
        queryFn: getAboutInfo,
        staleTime: Infinity,
    });
    // const matches = useMediaQuery(MAX_WIDTH_MD);

    const breadcrumbsPaths = [
        ...paths,
        {
            name: product?.category?.name ?? '',
            path: product ? `/catalog/${product?.category?.id}/${product?.category?.slug}` : '',
        },
        { name: product?.title ?? '' },
    ];

    return (
        <div className={'container'}>
            {<Breadcrumbs paths={breadcrumbsPaths} className={styles.breadcrumbs} />}
            <div className={'sections'}>
                <ProductDetails product={product} />
                {info && <AdvantagesDCMining advantages={info.advantages} />}
                {/*{!matches && <RecentProductsList />}*/}
                <CallMeBanner />
            </div>
        </div>
    );
};

export default ProductPage;
