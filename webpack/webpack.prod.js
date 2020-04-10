const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: common.externals.devmode ? 'js/[name].[hash].js' : 'js/[name].js',
        path: common.externals.paths.dist,
        // publicPath: '/'
    },
    plugins: [
        
        new CleanWebpackPlugin({
            verbose: true
        })
    ]
});