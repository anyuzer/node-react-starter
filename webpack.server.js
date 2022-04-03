const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: {
        server: ['@babel/polyfill', './src/Main.js']
    },
    target: 'node',
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/assets/"
    },
    module: {
        rules: [
            { test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['babel-plugin-styled-components']
                    }
                }
            }
        ]
    },
    externals: nodeExternals(),
    mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
    node: {
        __dirname: false,
        __filename: false
    }
};