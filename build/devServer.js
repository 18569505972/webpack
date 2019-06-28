const express = require('express')
const webpack = require('webpack')
const path = require('path')
const config = require('../config/index.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
// express初始化
const app = express();
// 引入webpack配置文件
const devConfig = require('./webpack.dev.config.js');
// 生成编译器
const compiler = webpack(devConfig);
// 中间件配置
app.use(webpackDevMiddleware(compiler, {
    stats: {
        // 添加资源信息
        assets: true,
        // 对资源按指定的字段进行排序
        // 你可以使用 `!field` 来反转排序。
        assetsSort: "field",
        // 添加构建日期和构建时间信息
        builtAt: true,
        // 添加缓存（但未构建）模块的信息
        cached: false,
        // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        cachedAssets: false,
        // 添加 children 信息
        children: false,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: false,
        // 将构建模块信息添加到 chunk 信息
        chunkModules: false,
        // 添加 chunk 和 chunk merge 来源的信息
        chunkOrigins: false,
        // `webpack --colors` 等同于
        colors: true,
        // 显示每个模块到入口起点的距离(distance)
        depth: false,
        // 通过对应的 bundle 显示入口起点
        entrypoints: false,
        // 添加 --env information
        env: false,
        // 添加错误信息
        errors: true,
        // 添加错误的详细信息（就像解析日志一样）
        errorDetails: true,
        // 添加构建模块信息
  		modules: false
    },
    publicPath: devConfig.output.publicPath, // 使用打包输出配置
}));
// 热重载
app.use(require("webpack-hot-middleware")(compiler, {
    log: false,
    path: "/__what",
    reload: true,
    heartbeat: 2000
}));
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../dist"));
})
// 服务端口 8888.
app.listen(config.dev.port, function() {
    console.log(`项目启动：http://localhost:${config.dev.port}\n`);
});