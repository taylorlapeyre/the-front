/* eslint-disable */
const webpackConfig = require('./webpack.config')
const path = require('path')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine-ajax', 'jasmine'],
    files: [
      'test/tests.webpack.js'
    ],
    preprocessors: {
      'test/tests.webpack.js': ['webpack']
    },
    exclude: [],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['jsdom'],
    singleRun: process.env.CI,
    concurrency: Infinity,
    webpack: {
      devtool: 'cheap-module-source-map',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      externals: {
        'react/addons': true, // important!!
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    }

  })
}
