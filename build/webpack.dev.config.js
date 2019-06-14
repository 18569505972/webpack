const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.config.js')
const config = require('../config/index.js')
module.exports = merge(base('development'), {
    mode: 'development',
    devtool: config.dev.devtool,
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
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
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(), //HRM热加载控制台显示修改模块相对路径及名称
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
        }),
        // 实现热重载刷新浏览器
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: config.build.entryTemplate,
            filename: 'index.html',
            hash: false,
            inject: true
        })
    ]
})