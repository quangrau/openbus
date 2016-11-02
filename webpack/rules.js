const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'production';

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
    include: [
      path.resolve('./src')
    ],
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: [],
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          query: {
            modules: true
          }
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    })
  },
  {
    test: /\.(jpg|png|gif|svg)$/,
    loader: [
      {
        loader: 'url-loader',
        query: {
          limit: 2000,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.(ico|woff)$/,
    loader: [
      {
        loader: 'url-loader',
        query: {
          limit: 1,
          name: 'assets/[name].[ext]'
        }
      }
    ]
  }
];
module.exports = rules;
