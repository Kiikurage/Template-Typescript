const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

module.exports = merge(require('./webpack.config.common'), {
    mode: 'development',
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.(j|t)sx?$/,
            use: [
                {
                    loader: 'eslint-loader',
                    options: {
                        fix: true
                    }
                }
            ]
        }, {
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({before: [createStyledComponentsTransformer()]})
                }
            }]
        }]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './build/static',
        historyApiFallback: true,
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './static/index.html')
        }),
        new ForkTsCheckerWebpackPlugin()
    ]
});
