const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    cache: true,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './build'),
        filename: '[name]-[fullhash:6].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
                use: [{ loader: 'file-loader' }],
            },
        ],
    },
    devServer: {
        port: 3001,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/static/index.html'),
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
};
