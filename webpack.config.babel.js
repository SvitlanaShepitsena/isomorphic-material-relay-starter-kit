import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OpenBrowserPlugin  from 'extract-text-webpack-plugin';

var version = require('./package.json').version;

let config = {
  entry: {
    app: path.resolve('webapp/app.js')
  },
  output: {
    path: path.resolve(`public/assets/${version}`),
    filename: '[name].js',
    publicPath: `http://localhost:8080/${version}/`
  },
  module: {
    loaders: [
      {test: /\.js(x)?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
      {test: /\.json$/, loaders: ['json']},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-color-rebeccapurple')
  ],

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(process.env)),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        process: {
            env: {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }
    }),
  ],
    watchOptions: {
        aggregateTimeout: 5,
        poll: 50
    },
  devtool: 'source-map'
};

export default config;
