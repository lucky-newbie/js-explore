const path = require('path');
const webpack = require('webpack');

const devServerConfig = require('./webpack.devServer.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode: 'development',
  // devtool: 'cheap-modules-eval-source-map',
  entry: {
    main: './src/index'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules', path.resolve(__dirname, '../src')
    ],
    extensions: ['.js']
  },
  devServer: devServerConfig,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ["@babel/plugin-proposal-class-properties"],
              presets: [
                ["@babel/preset-env", {
                  "useBuiltIns": "usage",
                  "corejs": 3
                }],
                "@babel/preset-react"
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}