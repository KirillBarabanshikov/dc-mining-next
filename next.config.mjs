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
        ];
    },

};

export default nextConfig;
