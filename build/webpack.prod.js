const commonConfig = require('./webpack.common.js')
const merge = require('webpack-merge')
const path = require('path')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  }
}

module.exports = merge(commonConfig, prodConfig)
