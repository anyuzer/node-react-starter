var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry:{
        app:'./src/Components/AppClient.js'
    },
    plugins: [],
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