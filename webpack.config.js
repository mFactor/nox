const { resolve } = require('path');
const webpack = require('webpack');

const devUrl = 'http://localhost:3002';

/**
 * Client-side webpack for development. Runs in-memory compilation.
 *
 * There has been continous issues with react-hot-loader, until they are
 * resolved react-hmre is a better canidate.
 */
const dev = {
  target: 'web',
  // devtool: 'cheap-eval-source-map',
  entry: [
    `webpack-dev-server/client?${devUrl}`,
    'webpack/hot/only-dev-server',
    './render.jsx',
  ],
  output: {
    filename: 'render.bundle.js',
    path: resolve(__dirname, './dist/static'),
    publicPath: `${devUrl}/`,
  },
  context: resolve(__dirname, './src'),
  resolve: {
    modules: [
      resolve('./src'),
      resolve('./node_modules'),
    ],
    extensions: ['.jsx', '.js', '.json', '.less'], // '.css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: [
          {
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
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
        test: /\.less$/,
        use: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader',
        ],
      },
      /*
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          'postcss-loader',
        ],
      },
      */
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?emitFile=false&&publicPath=static/&name=fonts/[name].[ext]',
      },
      {
        test: /\.(png|jpg|jpeg)/,
        exclude: /node_modules/,
        loader: "file-loader?emitFile=false&publicPath=static/&name=img/[name].[ext]",
      },
    ],
  },
};

const prod = {
  target: 'web',
  entry: [
    './render.jsx',
  ],
  output: {
    filename: 'render.bundle.js',
    path: resolve(__dirname, './dist/static'),
    publicPath: `${devUrl}/`,
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
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: [
          {
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
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

module.exports = {
  dev,
  prod,
};
