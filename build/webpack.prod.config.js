const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.config.js')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const htmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config/index.js')
module.exports = merge(base('production'), {
    mode: 'production',
    devtool: config.build.devtool,
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
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
        minimize: true, // mode:production下默认压缩包
        noEmitOnErrors: true, //在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)
        splitChunks: {
            chunks: 'all',
            minSize: 30000, //chunk的大小得大于30kb，避免生成vendor过多，发起过多请求
            maxSize: 0,
            minChunks: 1,  // 在分割之前，这个代码块最小应该被引用的次数
            maxAsyncRequests: 5, //按需加载代码块最大并行chunk小于等于5，防止请求过多
            maxInitialRequests: 3,  //初始html内代码块小于等于3，减少初始化请求
            automaticNameDelimiter: '~',  // 打包分隔符
            name: true,                   // 根据切割之前的代码块和缓存组键值(key)自动分配命名
            cacheGroups: {                // 缓存组
                vendors: {
                    test: /[\\/]node_modules[\\/]/,     // 提取node_modules模块到vendors
                    priority: -10                       // 权重
                },
                styles: {
                    name: 'styles',                    // 提取所有css文件到styles
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: -11
                },
                default: {                 // 将至少有两个chunk引入的模块进行拆分
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        // name: entrypoint => `runtime~${entrypoint.name}`|multiple|true为每个入口chunk，生成runtime
        // name: 'runtime'|single，多个入口chunk生成一个公共的runtime
        // name: false，不生成runtime，入口runtime直接打包进入口chunk
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new cleanWebpackPlugin(), //打包前清理文件夹
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('production')
        }),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        new htmlWebpackPlugin({
            inject: 'body',
            hash: true,
            template: config.build.entryTemplate,
            filename: 'index.html',
            chunksSortMode: 'dependency',
            minify: true
        })
    ]
})