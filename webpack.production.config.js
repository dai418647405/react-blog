var webpack = require('webpack');

var config = require('./webpack.config.js');
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
);
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
            warnings: false
        }
    })
);
module.exports = config;
