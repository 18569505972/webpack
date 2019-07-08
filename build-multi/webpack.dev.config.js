const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const base = require('./webpack.base.config.js')
const config = require('../config/index-multi.js')
let htmlTemplateList = config['build'].entryPath
let createHtmlList = Object.keys(htmlTemplateList).map((key, index, arr) => {
    return new htmlWebpackPlugin({
        template: config.build.htmlTemplate[key],
        filename: `${key}.html`,
        hash: false,
        inject: true
    })
})
let webpackConfig = {
    mode: 'development',
    devtool: config.dev.devtool,
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
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
    optimization: {
        namedModules: true,
        namedChunks: true
    },
    plugins: [
        // 实现热重载刷新浏览器
        new webpack.HotModuleReplacementPlugin(),
        // 自动打开浏览器
        new OpenBrowserPlugin({ url: `http://localhost:${config.dev.port}` }), 
        // 映射
        new webpack.DllReferencePlugin({
            manifest: require(config.dll.manifestPath)
        })
    ]
}
webpackConfig.plugins = webpackConfig.plugins.concat(createHtmlList)
// 将文件插入htmlWebpackPlugin文件注入列表中
webpackConfig.plugins.push(
    new AddAssetHtmlPlugin({
        // html插入文件路径
        filepath: require.resolve('../dist/dll/vendor.dll.js')
    })
)
module.exports = merge(base('development'), webpackConfig)