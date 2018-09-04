const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules').filter((x) => { return ['.bin'].indexOf(x) === -1; }).forEach((mod) => { nodeModules[mod] = `commonjs ${mod}`; });

const nodeModulesTransform = function (context, request, callback) {
    // search for a '/' indicating a nested module
    const slashIndex = request.indexOf('/');
    let rootModuleName;

    if (slashIndex === -1) {
        rootModuleName = request;
    } else {
        rootModuleName = request.substr(0, slashIndex);
    }

    // Match for root modules that are in our node_modules
    if (nodeModules.hasOwnProperty(rootModuleName)) {
        callback(null, `commonjs ${request}`);
    } else {
        callback();
    }
};

module.exports = {
    entry: {
        server: ['@babel/polyfill', './index.js']
    },
    target: 'node',
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: nodeModulesTransform,
    mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
    node: {
        __dirname: false,
        __filename: false
    }
};