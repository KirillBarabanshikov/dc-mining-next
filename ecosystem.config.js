module.exports = {
    apps: [
        {
            name: 'dc-mining-next',
            exec_mode: 'cluster',
            instances: 'max',
            script: './node_modules/next/dist/bin/next',
            args: 'start',
        },
    ],
};
