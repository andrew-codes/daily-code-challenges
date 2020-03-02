const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
                require.resolve('babel-loader'),
                require.resolve('react-docgen-typescript-loader'),
            ],
        })
        config.resolve.extensions.push('*', '.ts', '.tsx', '.mdx')
        return config
    },
    addons: [
        {
            name: '@storybook/addon-docs',
        },
    ],
}
