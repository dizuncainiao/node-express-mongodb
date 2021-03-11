// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : '/vue3-antdv2',
  outputDir: 'dist',
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 8888
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#f44336',
          'link-color': '#f44336',
          'border-radius-base': '6px'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
}
