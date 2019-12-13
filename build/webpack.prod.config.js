const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
        minimize: false,
        minimizer: [
            // 优化js文件
            new TerserPlugin({
                // 过滤已压缩的文件
                chunkFilter: (chunk) => {
                    if (/\.min\.js$/.test(chunk.name)) {
                        return false
                    }
                    return true
                },
                // 启用多进程压缩
                parallel: true,
                sourceMap: true
            }),
            // 用于优化css文件
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    // 避免 cssnano 重新计算 z-index
                    safe: true, 
                    // 禁止移除带前缀的样式
                    autoprefixer: { disable: true }, 
                    discardComments: {
                        // 移除注释
                        removeAll: true 
                    }
                },
                // 打印日志
                canPrint: false 
            })
        ],
        //在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)
        noEmitOnErrors: true, 
        // 移除空chunk
        removeEmptyChunks: true, 
        // 合并相同chunk
        mergeDuplicateChunks: true, 
        // 通过模块调用次数分配ids，常用的ids会分配更短的id，使ids可预测，减小文件大小
        occurrenceOrder: true, 
        splitChunks: {
            chunks: 'all',
            //chunk的大小得大于30kb，避免生成vendor过多，发起过多请求
            minSize: 30000, 
            maxSize: 0,
            // 在分割之前，这个代码块最小应该被引用的次数
            minChunks: 1, 
            //按需加载代码块最大并行chunk小于等于5，防止请求过多
            maxAsyncRequests: 5, 
            //初始html内代码块小于等于3，减少初始化请求
            maxInitialRequests: 3, 
            // 打包分隔符
            automaticNameDelimiter: '~', 
            // 根据切割之前的代码块和缓存组键值(key)自动分配命名
            name: true, 
            // 缓存组
            cacheGroups: { 
                // 提取node_modules模块到vendors
                vendors: {
                    test: /[\\/]node_modules[\\/]/, 
                    priority: -10 // 权重
                },
                // 提取所有css文件到styles
                styles: {
                    name: 'styles',
                    test: /\.s?css$/,
                    chunks: 'all',
                    enforce: true,
                    priority: -11,
                },
                default: { 
                    // 将至少有两个chunk引入的模块进行拆分
                    minChunks: 2,
                    priority: -20,
                    // 这个配置允许我们使用已经存在的代码块
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
        new BundleAnalyzerPlugin({
            // 分析模式，server、static、disabled
            // server开启本地服务、static生成html文件、disabled生成json文件
            analyzerMode: 'server',
            // server模式下服务ip
            analyzerHost: '127.0.0.1',
            // server模式下端口
            analyzerPort: 2266,
            // static模式下html生成路径，相对于output.path
            reportFilename: 'log/report.html',
            // 在默认浏览器自动打开报告
            openAnalyzer: true
        }),
        //打包前清理文件夹
        new cleanWebpackPlugin(),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new htmlWebpackPlugin({
            inject: 'body',
            hash: true,
            template: config.build.htmlTemplate,
            filename: 'index.html',
            chunksSortMode: 'dependency',
            minify: true
        })
    ]
})