var path = require('path')

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
    	mode: 'development',
        staticAssetsPath: '/',
        devtool: '#cheap-module-eval-source-map'
    }
}