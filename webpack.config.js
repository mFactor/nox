const { resolve, join } = require('path');
const webpack = require('webpack');

const devUrl = 'http://localhost:3001';

/**
 * Client-side webpack for development. Runs in-memory compilation.
 *
 * There has been continous issues with react-hot-loader, until they are
 * resolved react-hmre is a better canidate.
 */
module.exports = {
  target: 'web',
  // devtool: 'cheap-eval-source-map',
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-hot-middleware/client?dynamicPublicPath=true&' + devUrl,
    'webpack-dev-server/client?' + devUrl,
    'webpack/hot/only-dev-server',
    './render.jsx',
  ],
  output: {
    filename: 'render.bundle.js',
    path: resolve(__dirname, './dist/static'),
    publicPath: devUrl + '/',
  },
  context: resolve(__dirname, './src'),
  resolve: {
    modules: [
      resolve('./src'),
      resolve('./node_modules'),
    ],
    extensions: ['.jsx', '.js', '.json', '.less', '.scss'],
  },
  plugins: [
    //new webpack.ContextReplacementPlugin(/load-runner/, /^\.\//),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        // include: [resolve(__dirname, '../src')],
        use: [
          {
            // enforce: 'pre',
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
              plugins: ['transform-decorators-legacy', 'transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        // include: [resolve(__dirname, '../src')],
        use: [
          {
            // enforce: 'pre',
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
              plugins: ['transform-decorators-legacy', 'transform-runtime', ['import', { libraryName: 'antd', style: 'css' }]],
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
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
        test: /\.css$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
};
