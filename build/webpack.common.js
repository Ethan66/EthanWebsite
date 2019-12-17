const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    home: './src/main.js',
    index2: './src/page/index2/js/index.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      include: [path.resolve(__dirname, '../src')],
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }]
    }, {
      test: /\.tsx?$/,
      exclude: /node-modules/,
      use: ['ts-loader']
    }, {
      test: /\.(jpg|png|mp4)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name]_[hash:7].[ext]',
          outputPath: 'img',
          limit: 10240
        }
      }
    }, {
      test: /\.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          importLoaders: 2
        }
      }, 'postcss-loader', 'less-loader']
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src', 'source:src', 'video:poster'],
          minimize: false,
          removeComments: true,
          collapseWhitespace: false
        }
      }
    }]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/page/home/index.html',
    filename: 'home.html',
    chunks: ['home']
  }), new HtmlWebpackPlugin({
    template: './src/page/index2/index.html',
    filename: 'index2.html',
    chunks: ['index2']
  }), new CleanWebpackPlugin()],
  output: {
    filename: '[name]_[hash].js',
    path: path.resolve(__dirname, '../dist')
  }
}
