/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "**",
        }],
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
                filename: 'static/media/[name].[hash][ext]'
            }
        });

        return config;
    },
};

export default nextConfig;
