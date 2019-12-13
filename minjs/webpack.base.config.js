const path = require('path')
const webpack = require('webpack')
const config = require('../config/minjs')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, '..'),
    mode: config.build.mode,
    devtool: config.build.devtool,
    entry: config.build.entryPath,
    output: {
        filename: '[name].min.js',
        path: config.build.outputPath
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
        }]
    },
    optimization: {
        minimizer: [
            // 优化js文件
            new TerserPlugin({
                terserOptions: {
                    compress: false,
                    mangle: false
                }
            })
        ]
    },
    plugins: [
        //打包前清理文件夹
        new cleanWebpackPlugin()
    ]
}