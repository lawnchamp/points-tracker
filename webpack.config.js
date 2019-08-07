const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin')
const PUBLIC_PATH = 'https://points.live/'
const webpackConfig = {
  entry: 'index',
  publicPath: PUBLIC_PATH,
  output: {
    path: 'dist',
    filename: 'index-[hash].js'
  },
  plugins: [new RollbarSourceMapPlugin({
    accessToken: '992f5159e1344288b41709f4d4910de4',
    version: '1.0',
    publicPath: PUBLIC_PATH
  })]
}