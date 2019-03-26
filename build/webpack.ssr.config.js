const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: './lib/index.js',
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
              compress: {
                warnings: false
              },
              comments: false
            }
          }),
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { safe: true, sourceMap: false}
          })
        ],
    },
    output: {
        path: path.join(__dirname, '../'),
        filename: 'ssr.js',
        libraryTarget: 'umd',
        library: 'JsonView',
        globalObject: 'this'
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
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: 'style.css',
          allChunks: true,
        })
    ]
}

if (process.argv.some(a => a === '--report')) {
    module.exports.plugins.push(new BundleAnalyzerPlugin());
}