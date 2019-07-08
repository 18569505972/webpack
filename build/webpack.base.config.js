const path = require('path')
const webpack = require('webpack')
const config = require('../config/index')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const fs = require('fs')
// fs.exists('', function(exists) {
//   console.log(exists ? "目录存在" : "目录不存在");
// });
module.exports = (mode) => {
    let devMode = mode !== 'production' ? 'dev' : 'build'
    return {
        context: path.resolve(__dirname, '..'),
        entry: config[devMode].entryPath,
        output: {
            // dev模式下无需生成hash，优化开发模式下编译效率
            filename: devMode === 'dev' ? '[name].js' : '[name].[chunkhash:8].js',
            chunkFilename: devMode === 'dev' ? '[name].js' : '[name].[chunkhash:8].js',
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
            extensions: ['.vue', '.jsx', '.js', '.css']
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: /src/
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    //限制5k
                    limit: 5120,
                    name: `images/[name].${devMode === 'build' ? '[hash:7].':''}[ext]`
                }
            }, {
                test: /\.(woff2?|eot|TTF|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 500,
                    name: `fonts/[name].${devMode === 'build' ? '[hash:7].':''}[ext]`
                }
            }]
        },
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            }),
            new CopyWebpackPlugin([{
                from: './src/static',
                to: './static'
            }])
        ]
    }
}