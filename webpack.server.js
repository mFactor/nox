const { resolve } = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  // devtool: 'cheap-eval-source-map',
  entry: [
    './server.js',
  ],
  output: {
    filename: 'server.js',
    path: resolve(__dirname, './dist'),
    libraryTarget: 'commonjs2' // Important
  },
  // context: resolve(__dirname, './src'),
  resolve: {
    modules: [
      resolve('./src'),
    ],
    extensions: ['.js', '.jsx', '.json', '.node', '.less', '.scss'],
  },
  // watch: true,
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    noParse: /aws\-sdk/,
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        // include: [resolve(__dirname, './src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }], 'react', 'stage-0'],
              plugins: ['transform-decorators-legacy', 'transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include: [resolve(__dirname, './src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }], 'react', 'stage-0'],
              plugins: ['transform-decorators-legacy', 'transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.less$/,
        use: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
};
