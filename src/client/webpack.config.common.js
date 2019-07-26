const path = require('path');

module.exports = {
    cache: true,
    entry: {
        main: path.resolve(__dirname, './index.tsx')
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../../build/static'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            '../../node_modules',
            './'
        ]
    },
    module: {
        rules: [{
            test: /\.(png|jpg|jpeg|gif|ico)$/,
            use: [{loader: 'file-loader'}]
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all'
                }
            }
        }
    }
};
