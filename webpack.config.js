const path = require('path')
const webpack=require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractPlugin = require("extract-text-webpack-plugin")
module.exports = {
    entry: {
        index: './src/index.js',
        alert: './src/print.js'
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: './dist',
        port:3000,
        inline:true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: ['url-loader']
        }, {
            test: /\.(ttf|woff|eot|otf|TTF)$/,
            use: ['url-loader']
        }]
    },
    plugins: [
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            inject: 'body',
            hash: true,
            chunks: ['index', 'alert']
        }),
        new ExtractPlugin('main.css')
    ]
}