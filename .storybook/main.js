const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')
const path = require('path')

module.exports = {
    stories: ['../src/**/*.stories.mdx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
                require.resolve('babel-loader'),
                {
                    loader: require.resolve('react-docgen-typescript-loader'),
                    options: {
                        tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
                    },
                },
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
