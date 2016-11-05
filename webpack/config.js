const path = require('path');
const rules = require('./rules');
const plugins = require('./plugins');

const DEBUG = process.env.NODE_ENV === 'development';

const buildDir = './dist';
const srcDir = './src';

const config = {
  target: 'web',
  cache: DEBUG,
  devtool: DEBUG ? 'inline-source-map' : false,
  context: path.resolve(srcDir),

  entry: {
    main: [
      //activate HMR for React
      'react-hot-loader/patch',

      //bundle the client for webpack dev server
      //and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:3000',

      //bundle the client for hot reloading
      //only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',

      //the entry point of our app
      './vendor.js',
      './main.js',
    ],

    vendors: [
      'react',
      'react-dom',
    ],
  },

  output: {
    publicPath: '',
    path: path.resolve(buildDir),
    filename: path.join('js', 'main.bundle.js'),
  },

  module: {
    rules,
  },

  plugins,

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(srcDir),
      'node_modules'
    ],
  },

  devServer: {
    contentBase: path.resolve(buildDir),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true,
    noInfo: true,
    inline: true,
    stats: {
      colors: true
    },
  },
};

module.exports = config;
