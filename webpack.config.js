'use strict';

const webpack = require("webpack");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const path = require("path");

module.exports = {
  context: __dirname + "/src",
  entry: {
    app: "./app.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist/assets",
    publicPath: "/assets",
  },
  devServer: {
    contentBase: __dirname + "/src",
    watchContentBase: true,
    ignored: /node_modules/
  },
  // resolve: {
  //   modules: [path.resolve(__dirname, "src"), "node_modules"]
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },
      {
        test: /\.css$/,
        use: [
          ExtractTextPlugin.extract("css"), 
          {
            loader: 'css-loader',
            // options: { importLoaders: 1 } 
          },
          {
            loader: 'postcss-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        // proxy: 'http://localhost:3100/'
        proxy: 'http://localhost:8080/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      allChunks: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer'),
        ]
      }
    }),
  ]
};