const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = merge(require('./webpack.config.common'), {
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }]
        }]
    },
    plugins: [
        new LoadablePlugin()
    ]
});
