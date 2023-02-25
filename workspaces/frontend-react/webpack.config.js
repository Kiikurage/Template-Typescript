const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    cache: true,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        index: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    devServer: {
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '/api': '' },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
};
