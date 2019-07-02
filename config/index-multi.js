var path = require('path')
var hotMiddlewareScript = 'webpack-hot-middleware/client'
module.exports = {
    build: {
        mode: 'production',
        entryTemplate: './src/index.html',
        bundleRootPath: {
            index: './src/singlePage/index.js'
        },
        outputPath: path.resolve(__dirname, '../dist'),
        staticAssetsPath: 'http:localhost:8888/',
        devtool: 'none'
    },
    dev: {
        port: 8888,
        mode: 'development',
        bundleRootPath: {
            index: ['webpack-hot-middleware/client.js?path=/__what&timeout=20000', './src/singlePage/index.js']
        },
        staticAssetsPath: '/',
        devtool: '#cheap-module-eval-source-map'
    }
}