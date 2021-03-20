const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require("../package.json");

const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8082/"
  },
  devServer: {
    port: 8082,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthBootstrap': './src/bootstrap',
      },
      shared: packageJSON.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: "index.html",
      inject: "body"
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);