var path = require('path') 
module.exports = {
    build: {
        // 当前运行环境
        mode: 'production',
        // html模板
        htmlTemplate: path.resolve(__dirname, '../src/index.html'),
        // 打包入口
        entryPath: {
            index: path.resolve(__dirname, '../src/singlePage/index.js')
        },
        // 生成包目录
        outputPath: path.resolve(__dirname, '../dist/bundle'),
        // 静态资源路径
        staticAssetsPath: './',
        // sourceMap模式
        devtool: 'source-map'
    },
    dev: {
        // 本地服务端口号
        port: 8888,
        // 当前运行环境
        mode: 'development',
        // 打包入口
        entryPath: {
            index: ['webpack-hot-middleware/client.js?path=/__what&timeout=20000', path.resolve(__dirname, '../src/singlePage/index.js')]
        },
        // 静态资源路径
        staticAssetsPath: '/',
        // sourceMap模式
        devtool: '#cheap-module-eval-source-map'
    },
    dll: {
        // 链接库manifest
        manifestPath: path.resolve(__dirname, '../dist/dll/vendor.manifest.json'),
        // 链接库列表
        dllList: ['lodash'],
        // 链接库包目录
        dllOutputPath: path.resolve(__dirname, '../dist/dll')
    }
}