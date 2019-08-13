const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin')
const PUBLIC_PATH = 'https://points.live/'
const path = require('path');

module.exports = {
  configureWebpack: {
    entry: 'index',
    output: { path: path.resolve(__dirname + '/dist'), filename: '[name].js' },
    plugins: [new RollbarSourceMapPlugin({
      accessToken: 'c28199817cb14361b39b960f5b69df86',
      ignoreErrors: false,
      publicPath: PUBLIC_PATH,
      silent: false,
      version: 'version 1',
    })],
  },
  devServer: {
    port: '3000',
    public: '0.0.0.0',
    disableHostCheck: true,
  },
}
