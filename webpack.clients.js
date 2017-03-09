var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:{
        app:'./src/Components/AppClient.js'
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname+'/dist/app')
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
                loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[hash:base64:5]')
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
    }
};