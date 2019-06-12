const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
// express初始化
const app = express();
// 引入webpack配置文件
const devConfig = require('./webpack.dev.config.js');
// 生成编译器
const compiler = webpack(devConfig);
// 中间件配置
app.use(webpackDevMiddleware(compiler, {
    quiet: true,  //向控制台显示任何内容 
    publicPath: devConfig.output.publicPath, // 使用打包输出配置
}));
// 热重载
app.use(require("webpack-hot-middleware")(compiler));
app.get("*", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "../dist"));
})
// 服务端口 8888.
app.listen(8888, function() {
    console.log('项目启动：http://localhost:8888\n');
});