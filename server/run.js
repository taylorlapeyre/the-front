/* eslint-disable */

const webpack          = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config           = require('../webpack.config')

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: '.',
  hot: true,
  historyApiFallback: true,
  progress: true,
})

server.listen(8080, 'localhost', err =>
  console.log(err || 'Listening at http://localhost:8080/')
)
