const path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('node_modules').filter((x) => { return ['.bin'].indexOf(x) === -1; }).forEach((mod) => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
  entry: {
    server: ['babel-polyfill', './index.js']
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
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'react']
        }
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
  mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
  node: {
    __dirname: false,
    __filename: false
  }
};