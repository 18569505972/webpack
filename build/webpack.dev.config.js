const merge = require('webpack-merge')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
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
        // 实现热重载刷新浏览器
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: `http://localhost:${config.dev.port}` }),  // 自动打开浏览器
        new htmlWebpackPlugin({
            template: config.build.entryTemplate,
            filename: 'index.html',
            hash: false,
            inject: true
        })
    ]
})