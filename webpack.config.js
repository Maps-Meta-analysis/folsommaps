const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './index.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.jsx?$/, // Updated rule to handle JSX files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Added extension for JSX files
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Folsom Maps' }),
    new webpack.EnvironmentPlugin({ MapboxAccessToken: '' })
  ]
};