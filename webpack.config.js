const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const NODE_ENV = (process.env.NODE_ENV || 'development')

const config = {
    devtool: NODE_ENV === 'production' ? 'source-map' : 'source-map',
    entry: [
        '@babel/polyfill',
        path.resolve(__dirname, 'src', 'main.js'),
    ],
    target: 'web',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
        inline: true,
        historyApiFallback: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    { loader: 'babel-loader' },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: NODE_ENV === 'production'
                    ? ExtractTextPlugin.extract({
                        fallback: [{
                            loader: 'style-loader',
                        }],
                        use: [
                            { loader: 'css-loader', options: { minimize: true } },
                            { loader: 'postcss-loader' },
                            { loader: 'sass-loader' },
                        ],
                    })
                    : [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' },
                    ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Simple autocomplete',
            filename: 'index.html',
            template: 'index.ejs',
            inject: 'body',
            hash: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('bundle.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
    ],
}

if (NODE_ENV === 'production') {
    config.plugins.push(
        new CompressionPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
            minimize: true,
        }),
    )

    // Remove logging in production
    config.module.rules.push({
        test: /\.jsx?$/,
        use: ['strip-loader?strip[]=console.log'],
        exclude: /node_modules/,
    })
} else {
    config.entry.unshift(
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:9000',
        'webpack/hot/only-dev-server',
    )
    config.plugins.push(
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}

module.exports = config
