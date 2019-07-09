var path = require('path') 
module.exports = {
    build: {
        // 当前运行环境
        mode: 'production',
        // html模板
        htmlTemplate: {
            page1: path.resolve(__dirname, '../src/page1.html'),
            page2: path.resolve(__dirname, '../src/page2.html')
        },
        // 模板引入chunk
        chunkList: {
            page1:['page1', 'runtime~page1', 'vendors~page1~page2', 'vendors~page1', 'common'],
            page2:['page2', 'runtime~page2', 'vendors~page1~page2', 'vendors~page2', 'common']
        },
        // 打包入口
        entryPath: {
            page1: path.resolve(__dirname, '../src/multiPage/page1/index.js'),
            page2: path.resolve(__dirname, '../src/multiPage/page2/index.js')
        },
        // 生成包目录
        outputPath: path.resolve(__dirname, '../dist/multiBundle'),
        // 静态资源路径
        staticAssetsPath: 'http:localhost:8888/',
        // sourceMap模式
        devtool: 'none'
    },
    dev: {
        // 本地服务端口号
        port: 8888,
        // 当前运行环境
        mode: 'development',
        // 打包入口
        entryPath: {
            page1: ['webpack-hot-middleware/client.js?path=/__what&timeout=20000', path.resolve(__dirname, '../src/multiPage/page1/index.js')],
            page2: ['webpack-hot-middleware/client.js?path=/__what&timeout=20000', path.resolve(__dirname, '../src/multiPage/page2/index.js')]
        },
        // 模板引入chunk
        chunkList: {
            page1:['page1'],
            page2:['page2']
        },
        // 静态资源路径
        staticAssetsPath: '',
        // sourceMap模式
        devtool: '#cheap-module-eval-source-map'
    },
    dll: {
        // 链接库manifest
        manifestPath: path.resolve(__dirname, '../dist/multiDll/vendor.manifest.json'),
        // 链接库列表
        dllList: ['lodash'],
        // 链接库包目录
        dllOutputPath: path.resolve(__dirname, '../dist/multiDll')
    }
}