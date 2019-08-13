const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new RollbarSourceMapPlugin({
        accessToken: 'd71e337e9631468e8564e79178e7883f',
        version: 'version-1',
        publicPath: 'https://points.live/'
      })
    ]
  },
  devServer: {
    port: '3000',
    public: '0.0.0.0',
    disableHostCheck: true,
  },
}
