const webpack = require('webpack')
const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')
const IP = require('ip').address()

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    overlay: true,
    contentBase: './dist',
    open: false,
    port: 3000,
    host: IP,
    hot: true,
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = merge(commonConfig, devConfig)