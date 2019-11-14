const path = require('path');

console.log(path.resolve('./node_modules/styled-components'));

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/App/Client.js']
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
                exclude: /node_modules/,
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
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(`${__dirname}/dist/app`),
        publicPath: "/assets/"
    },
    mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production')
};