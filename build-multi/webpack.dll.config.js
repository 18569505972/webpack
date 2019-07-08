const path = require('path')
const webpack = require('webpack')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('../config/index-multi.js')
module.exports = {
	mode: 'development',
    entry: {
        // 第三方库
        vendor: config.dll.dllList
    },
    output: {
        // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
        filename: '[name].dll.js',
        path: config.dll.dllOutputPath,
        // library必须和后面dllplugin中的name一致
        library: '[name]_dll_[hash]'
    },
    plugins: [
        //打包前清理文件夹
    	new cleanWebpackPlugin(), 
        new webpack.DllPlugin({
        	// 定义manifest链接库name字段名
            name: '[name]_dll_[hash]',
            // 定义manifest输出文件
            path: path.resolve(__dirname, '../dist/multiDll', 'vendor.manifest.json')
        })
    ]
}