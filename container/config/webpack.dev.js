const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJSON = require("../package.json");

const devConfig = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8080/"
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketingApp: 'marketing@http://localhost:8081/remoteEntry.js',
        authApp: 'auth@http://localhost:8082/remoteEntry.js'
      },
      shared: packageJSON.dependencies
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
