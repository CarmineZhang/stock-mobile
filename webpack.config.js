var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    plugins: [
        commonsPlugin,
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    externals: {
        "jquery": "jQuery",
        "underscore": "_"
    },
    entry: './src/index.js',

    output: {
        path: __dirname + '/build',
        filename: 'index.js',
        publicPath: '.'
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
