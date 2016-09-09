var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [
        // commonsPlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    externals: {
        "jquery": "jQuery",
        "underscore": "_"
    },
    entry: './src/controller.js',

    output: {
        path: __dirname + '/build',
        filename: 'stock.js',
        publicPath: '.',
        library:"stock",
        libraryTarget: 'umd'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        }]
    }
}
