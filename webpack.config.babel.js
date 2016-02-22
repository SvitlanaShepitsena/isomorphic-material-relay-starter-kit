import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin =
    new Webpack_isomorphic_tools_plugin(require('./webpack/webpack-isomorphic-tools-configuration.js'))
        .development()

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
            {
                test: /\.css$/,
                loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
            },
        ]
    },
    postcss: [
        require('autoprefixer-core'),
        require('postcss-color-rebeccapurple')
    ],

    plugins: [
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new webpack.NoErrorsPlugin(),
        new webpack.EnvironmentPlugin(Object.keys(process.env)),
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    BROWSER: JSON.stringify(true)
                }
            }
        }),
        webpack_isomorphic_tools_plugin
    ],
    watchOptions: {
        aggregateTimeout: 5,
        poll: 50
    },
    devtool: 'source-map'
};

export default config;
