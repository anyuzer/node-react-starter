var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};

fs.readdirSync('node_modules').filter(function(x) { return ['.bin'].indexOf(x) === -1; }).forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod; });

module.exports = {
    entry:{
        server:'./index.js',
    },
    target: 'node',
    output:{
        filename:'server.bundle.js',
        path:path.resolve(__dirname)
    },
    module:{
        loaders:[
            {
                test:/\.(js|jsx)$/,
                exclude:/(node_modules|bower_components)/,
                loaders:['babel']
            },
            {
                test: /\.css$/,
                loaders: [
                    'css?modules&importLoaders=1&localIdentName=[hash:base64:5]'
                ]
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: nodeModules,
    node:{
        __dirname:false,
        __filename:false
    }
};