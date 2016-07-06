/* eslint-disable */

const path = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'config'),
      path.join(__dirname, 'server'),
      path.join(__dirname, 'flow'),
    ],
    extensions: ['', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    noParse: /braintree/, // Braintree's API is precompiled ¯\_(ツ)_/¯
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.woff2?$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  sassLoader: {
    includePaths: [path.join(__dirname, 'style')]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}
