const path = require('path');
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './lib/index.js',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'vue-json-viewer.js',
        libraryTarget: 'umd',
        library: 'JsonView'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            'node_modules'
        ]
    },
    externals: {
      vue: 'vue'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'autoprefixer-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                comments: false
            }
        }),
        // new BundleAnalyzerPlugin()
    ]
}
