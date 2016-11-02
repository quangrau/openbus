const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const postcss_cssnext = require('postcss-cssnext');

const DEBUG = process.env.NODE_ENV === 'development';
const TEST = process.env.NODE_ENV === 'test';

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: DEBUG,
    minimize: !DEBUG,
    options: {
      context: __dirname,
      // postcss: [
        // postcss_cssnext({
          // browsers: ['last 2 version', 'ie >= 11']
        // })
      // ]
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendors',
    filename: 'vendors.bundle.js',
    minChunks: Infinity,
  }),
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
} else if (!TEST) {
  plugins.push(
    new ExtractTextPlugin(cssBundle, {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.NoErrorsPlugin()
  );
}

plugins.push(
  new HtmlWebpackPlugin({
    template: 'index.html',
  })
);

module.exports = plugins;
