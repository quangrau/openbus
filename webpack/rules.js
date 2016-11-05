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
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function() {
            return [
              require('autoprefixer')()
            ];
          }
        }
      }
    ]
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: 'css?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'
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
  },
  {
    test: /\.json$/,
    loader: [
      {
        loader: 'json-loader',
      }
    ]
  }
];
module.exports = rules;
