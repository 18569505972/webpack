const webpack = require('webpack')
const path = require('path')
const statsObj = require('./stats')
// 引入webpack配置文件
const prodConfig = require('./webpack.base.config');
// 生成编译器
webpack(prodConfig, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.toString(statsObj));
})