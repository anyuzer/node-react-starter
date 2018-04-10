const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/Components/AppClient.js']
  },
  plugins: [],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(`${__dirname}/dist/app`)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
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
  mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production')
};