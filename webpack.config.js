const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const config = require('./config.json')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: config.mode,
  entry: {
    error: './error/error.js',
    index: './index/index.js',
    game: './game.js',
    sapper: './sapper/sapperconnect.js'
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      chunks: ['index'],
      template: './index/index.html',
      filename: 'index.html'
    }),
    new HTMLWebpackPlugin({
      chunks: ['game'],
      template: './game.html',
      filename: 'game.html'
    }),
    new HTMLWebpackPlugin({
      chunks: ['sapper'],
      template: './sapper/sapper.html',
      filename: 'sapper.html'
    }),
    new HTMLWebpackPlugin({
      chunks: ['error'],
      template: './error/error.html',
      filename: 'error.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
}
