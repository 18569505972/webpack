const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const config = require('../config/index')
module.exports = (mode) => {
    let devMode = mode !== 'production'?'dev':'build'
    return {
        context: path.resolve(__dirname, '..'),
        entry: config.build.bundleRootPath.index,
        output: {
            filename: '[name].[hash:8].js',
            chunkFilename: '[name].[hash:8].js',
            path: config.build.outputPath,
            publicPath: config[devMode].staticAssetsPath
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src')
            },
            // 解析模块时优先搜索src
            modules: [path.resolve(__dirname, '../src'), "node_modules"],
            // 自动解析扩展，导入时可不带扩展名
            extensions: ['*', '.vue', '.jsx']
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: /src/
            }, {
                test: /\.scss$/,
                use: [
                    //devMode=='dev' ? '' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
                        }
                    },
                    "sass-loader"
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 5120, //限制5k
                    name: 'images/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|TTF|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 500,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            })
        ]
    }
}