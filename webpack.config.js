const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.join(__dirname, '/react');
const BUILD_DIR = path.join(__dirname, '/public/js');

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-app']
          }
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: ['url-loader?limit=100000']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ]
  },
  /*plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]*/
};
