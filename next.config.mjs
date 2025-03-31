/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.(mp4|webm|ogg|swf|mov)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]',
            },
        });

        return config;
    },
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/product/30/elphapex-dg1-13,6g',
                destination: '/product/elphapex-dg1plus-13,6g',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/31/elphapex-dg1-14g',
                destination: '/product/elphapex-dg1plus-14g',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/32/elphapex-dg1-14,4g',
                destination: '/product/elphapex-dg1plus-14,4g',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg1plus-13,6g',
                destination: '/product/elphapex-dg1plus-13-6g',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg1plus-14,4g',
                destination: '/product/elphapex-dg1plus-14-4g',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg1-home',
                destination: '/product/elphapex-dg-home-1',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l9-16000',
                destination: '/product/bitmain-antminer-l9-16-ghs',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l9-15000',
                destination: '/product/bitmain-antminer-l9-15-ghs',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l9-17000',
                destination: '/product/bitmain-antminer-l9-17-ghs',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/:id/:slug',
                destination: '/product/:slug',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/catalog/:id(\\d{1,})/:slug',
                destination: '/catalog/:slug',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/news/:id/:slug',
                destination: '/news/:slug',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/links/:id/:slug',
                destination: '/links/:slug',
                permanent: true,
                statusCode: 301,
            },

            ///
            {
                source: '/product/jasminer-x16-q-1950mhs',
                destination: '/product/jasminer-x16-q-1950-mhs',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/innosilicon-t4plus-175t-btc-miner',
                destination: '/product/innosilicon-t4-plus',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/ice-river-ks5m-15t',
                destination: '/product/iceriver-ks5m',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/ibelink-bm-s319t',
                destination: '/product/ibelink-bm-s3',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/goldshell-ka-box-pro-16ths',
                destination: '/product/goldshell-ka-box-pro-1-6-th-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/goldshell-al-box-ii-720g',
                destination: '/product/goldshell-al-box-ii',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg1plus-13-6g',
                destination: '/product/elphapex-dg1-13600-mh-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg-home-1',
                destination: '/product/elphapex-dg1-home-2-1-gh-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/elphapex-dg1-11g',
                destination: '/product/elphapex-dg1-11000',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bombax-miner-bombax-ez100-pro',
                destination: '/product/bombax-ez100-pro-15500-mh-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bombax-miner-ez100-c-3800-mhs',
                destination: '/product/bombax-ez100-c-3800-mh-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bombax-miner-ez100-c-3200-mhs',
                destination: '/product/bombax-ez100-c-3200-mh-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l7-9500m',
                destination: '/product/bitmain-antminer-l7-9500',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l7-9300m',
                destination: '/product/bitmain-antminer-l7-9300',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l7-8800m',
                destination: '/product/bitmain-antminer-l7-8800',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-l7-8550m',
                destination: '/product/bitmain-antminer-l7-8550',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-ks5-pro-21t',
                destination: '/product/bitmain-antminer-ks5-pro',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/canaan-avalon-miner-a1566-185t',
                destination: '/product/avalon-a1566-185th-s',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/canaan-avalon-miner-a1466-150t',
                destination: '/product/avalon-a1466-150th',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/canaan-avalon-miner-a1446-130t',
                destination: '/product/avalon-a1446-130th',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/canaan-avalon-miner-a1346-126t',
                destination: '/product/avalon-a1346-126',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/canaan-avalon-miner-a1346-123t',
                destination: '/product/avalon-a1346-123',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-z15pro',
                destination: '/product/antminer-z15-pro',
                permanent: true,
                statusCode: 301,
            },
            {
                source: '/product/bitmain-antminer-e11-9-ghs',
                destination: '/product/antminer-e11-9000-mh-s',
                permanent: true,
                statusCode: 301,
            },
        ];
    },

};

export default nextConfig;
