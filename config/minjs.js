var path = require('path') 
module.exports = {
    build: {
        // 当前运行环境
        mode: 'production',
        // 打包入口
        entryPath: {
            adjuzSdk: path.resolve(__dirname, '../src/minjs/adjuzSdk.js')
        },
        // 生成包目录
        outputPath: path.resolve(__dirname, '../dist/minjs'),
        // sourceMap模式
        devtool: 'none'
    }
}