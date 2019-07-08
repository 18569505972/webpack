const express = require('express')
const webpack = require('webpack')
const path = require('path')
const config = require('../config/index-multi')
const statsObj = require('./stats')
const webpackDevMiddleware = require('webpack-dev-middleware')
// express初始化
const app = express();
// 引入webpack配置文件
const devConfig = require('./webpack.dev.config.js');
// 生成编译器
const compiler = webpack(devConfig);
// 中间件配置
app.use(webpackDevMiddleware(compiler, {
    stats: statsObj,
    lazy: false,
    watchOptions: {
        // 忽略监听
    	ignored: /node_modules/,    
        // 轮询模式下，没2秒检查一次是否更新
        poll: 2000    
    },
    // 使用打包输出配置
    publicPath: devConfig.output.publicPath, 
}));
// 热重载
app.use(require("webpack-hot-middleware")(compiler, {
    log: false,
    path: "/__what",
    reload: true,
    heartbeat: 2000
}));
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../dist/multiBundle/page1.html"));
})
// 服务端口 8888.
app.listen(config.dev.port, function() {
    console.log(`项目启动：http://localhost:${config.dev.port}\n`);
});