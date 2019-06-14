# webpack
webpack环境配置
# 基础概念
## context
定义entry入口和HtmlWebpackPlugin插件绝对路径。
## entry  
作用：指定一个或多个入口文件，作为打包的起始索引。  
默认：./src。  
### 单页配置（指定一个入口文件） 
```
// 单个文件打包成一个bundle.js
entry：{
	main：'./main.js'
}
// 多个文件打包成一个bundle.js
entry：{
	main：['./main.js','./lodash.js']
}
```
### 多页配置（多个入口文件）
```
// 多入口打包，生成多个html页面
entry:{
	'common/js/main':'./main.js', //生成目录并打包
	'main':'./main.js'
}
```
### 动态入口
```
entry: () => new Promise((resolve) => resolve(['./main.js', './common.js']))
```
## output
作用：规定打包文件输出目录，以及包文件名字的命名。  
默认：./dist。  
### output配置
```
output:{
	filename:'[name].[hash:8].js',  //输出包名,添加hash值
    chunkFilename: '[name].[hash:8].js', // 异步加载模块输出名配置
	path:resolve(__dirname,'dist'),  //打包目录
	publicPath:"http://static.com"  //静态资源域名，如图片url
}
```
## module
模块配置
### noParse
略过解析某类文件。
### 常用loader
作用：webpack只能解释编译js和json文件，所以需要配置loader去处理vue、jsx、css、img、字体、视频、语音等格式的文件，将其转换为JavaScript。  
#### 必须属性
test：匹配被转换文件的格式。  
use：进行转换时用到的loader。  
#### css-loader、style-loader
css-loader：允许在js中import一个css文件，会将css文件当成一个模块引入到js文件中。  
style-loader：使用style标签将css-loader内部样式注入到我们的HTML页面。  
#### postcss-loader
配合autoprefixer插件用于处理浏览器前缀。
#### sass-loader node-sass
node-sass把sass编译成css,sass-loader 是webpack的一个loader。webpack中二者结合实现对sass的转化。再配合css-loader将css样式转换为js模块。
```
{
    test: /\.scss$/,
    use: [
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                plugins: [
                    require("autoprefixer")
                ]
            }
        },
        "sass-loader"
    ]
}
```
#### less-loader
实现less到css转化，再配合css-loader将css样式转换为js模块。
#### url-loader、file-loader
name参数:将文件输入到指定地址，\[name\]代表文件名，\[hash:7\]代表7位hash，\[ext\]代表文件扩展名。     
limt:表示文件大小限制（单位byte），小于指定值的文件以file-loader进行base64转码打包。
```
rules:[
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,  // 匹配图片资源
        loader: 'url-loader',
        options: {
            limit: 500,
            name: 'img/[name].[hash:7].[ext]'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
           limit: 500,
           name: 'fonts/[name].[hash:7].[ext]'
        }
    }
]
```
#### babel-loader
转换js文件中的es6代码  
```
{
    test: /\.js$/,
    exclude: /node_modules/,   //排除转换node_modules
    loader: "babel-loader",
    include: /src/            // 只转化src目录下js文件
},
```
#### worker-loader
将js文件注册为Web Worker。
```
{
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader' }
}
```
## plugin
各种各样的插件主要配合webpack对打包项目进行打包优化、资源管理、注入环境变量。
### 常用插件
### HtmlWebpackPlugin
根据模板生成，含有包文件的html5文档。
```
new htmlWebpackPlugin({
    inject: 'body',                           // script引入位置
    hash: false,             // 为html引入的打包文件，添加请求参数hash，避免缓存
    template: config.build.entryTemplate,     // 模板文件
    filename: 'index.html',                   // 生成html文件名
    chunksSortMode: 'dependency',             // script包引入顺序
    minify: true                              // 线上环境对生成html文件进行压缩
})
```
### mini-css-extract-plugin
此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。可打包异步加载的css模块。（不支持开发环境HRM，建议用于线上环境）
```
{
    entry: {
       foo: path.resolve(__dirname, 'src/foo'),
        bar: path.resolve(__dirname, 'src/bar')
    },
    module: {
        rules:[
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]

            }
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                styles: {
                    name: 'styles',       // 提取所有css文件到styles
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                // 多入口时动态打包多个对应css文件
                fooStyles: {
                    name: 'foo',
                    test: (m,c,entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                barStyles: {
                    name: 'bar',
                    test: (m,c,entry = 'bar') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins:[
         new MiniCssExtractPlugin({
            filename: '[name].[hash].css',       // css块名
            chunkFilename: '[id].[hash].css'     // 异步加载的css块名
        })
    ]
}
```
### SplitChunksPlugin
自动拆分代码块代码，提取第三方插件以及重复使用的模块，优化按需加载和页面初始化请求数。
```
optimization: {
    splitChunks: {
        /* 
        all异步和同步都可以分离。
        async 表示对动态（异步）导入的模块进行分离。
        initial 表示对初始化值进行分离优化。
        */
        chunks: 'all',  
        minSize: 30000, //chunk的大小得大于30kb，避免生成vendor过多，发起过多请求
        maxSize: 0,
        minChunks: 1,  // 在分割之前，这个代码块最小应该被引用的次数
        maxAsyncRequests: 5, //按需加载代码块最大并行chunk小于等于5，防止请求过多
        maxInitialRequests: 3,  //初始html内代码块小于等于3，减少初始化请求
        automaticNameDelimiter: '~',  // 打包分隔符
        name: true,                   // 根据切割之前的代码块和缓存组键值(key)自动分配命名
        cacheGroups: {                // 缓存组
            vendors: {
                test: /[\\/]node_modules[\\/]/,     // 提取node_modules模块到vendors
                priority: -10                       // 权重
            },
            styles: {
                name: 'styles',                    // 提取所有css文件到styles
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
                priority: -11
            },
            default: {                 // 将至少有两个chunk引入的模块进行拆分
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
}
```
### runtimeChunkPlugin
配合SplitChunksPlugin分离出运行时文件。
```
/**
 * name: entrypoint => `runtime~${entrypoint.name}`|multiple|true为每个入口chunk，生成runtime
 * name: 'runtime'|single，多个入口chunk生成一个公共的runtime
 * name: false，不生成runtime，入口runtime直接打包进入口chunk
 */
runtimeChunk: {
    name: 'runtime'
}
```
### NamedModulesPlugin（webpack内置插件）
开发环境HRM热加载控制台显示修改模块相对路径及名称。
```
new webpack.NamedModulesPlugin()
```
### ProvidePlugin（webpack内置插件）
将模块绑定为全局模块，自动加载模块，而不必到处import或require。
```
new webpack.ProvidePlugin({
    _: 'lodash'
})
```
### DefinePlugin （webpack内置插件）
定义全局变量，项目内任何文件都可以访问到。
```
new webpack.DefinePlugin({
    'process.env': JSON.stringify('development')
}),
```
### webpack-manifest-plugin
用于生成源文件到打包文件的json映射文件的Webpack插件。
```
new ManifestPlugin()
```
### webpack-dev-middleware
创建本地express服务器，并且能够实时浏览器重新加载(live reloading)和热加载。
### CopyWebpackPlugin
复制文件或整个文件夹到某个目录。
```
new CopyWebpackPlugin([
    {
        from: "./static",     // 源文件或源目录
        to: "./static",        // 目标目录
        ignore: ['1.txt','2.md']  // 忽略文件
    }
])
```
## devTool
控制是否生成，以及如何生成 source map。
### 开发环境
推荐使用cheap-module-eval-source-map，平衡了eval-source-map初始化启动的耗时和cheap-eval-source-map不利于页面调试的特征。
### 生产环境
推荐设置为none，关闭source map，以避免源代码的泄露。
## mode 
作用：定义开发模式（开发模式还是线上模式），可选值none、development和production，默认production。  
### development
会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
### production
会将process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin。
## resolve
文件解析配置项。 
### alias
设置路径别名。
```
resolve: {
    alias: {
        '@': path.resolve(__dirname, '../src')
    }
}
```
### extensions
自动解析指定扩展名文件。（数组中指定格式文件导入时可不带扩展名）。
```
resolve: {
    extensions: ['*', '.vue', '.jsx']
}
```
### modules
解析模块时优先检索目录。
```
resolve: {
    modules: [path.resolve(__dirname, '../src'), "node_modules"]
}
```
## externals
配置全局变量，防止将某些 import 的包(package)打包到 bundle中，而是在运行时(runtime)再去从外部获取这些扩展依赖。
```
externals: {
  jquery: 'jQuery'
}
```
## performance
控制webpack「资源和入口起点超过指定文件限制如何通知开发者。
## 打包生成文件
1、项目源码  
2、引入第三方库（vendor）  
3、运行时代码（runtime），主要包含处理模块间的链接和解析的代码。   
4、文件映射（manifest），管理打包前和打包后文件之间的对应标识。
## 优化配置
### tree-shaking
#### 作用
剔除打包代码中的无用exports模块。（webpack4默认对ESmodel引入的json模块进行未使用字段的tree-shaking处理）
#### 副作用
在导入时会执行特殊行为的代码，而不是仅仅暴露一个export或多个export。举例说明，例如polyfill，它影响全局作用域，并且通常不提供export；再比如使用类似css-loader并import一个CSS文件。
#### package.json
```
// 所有代码无副作用
{
    sideEffects: "false"
}
// 部分代码有副作用，进行过滤不处理
{
    sideEffects: [
        "./src/some-side-effectful-file.js",
         "*.css"
    ]
}
```
### 生成统计数据文件
```
webpack --profile --json > compilation-stats.json
```
生成有关于模块的统计数据的JSON文件。生成文件可以通过webpack可视化工具生成统计图表。
## 依赖模快
```
// 本地安装
cnpm install --save-dev webpack    
// 安装webpack命令行  
cnpm install webpack-cli --save-dev     
cnpm install --save-dev webpack-dev-server 
cnpm install --save-dev webpack-manifest-plugin 
cnpm install --save-dev webpack-merge  合并公共配置  
cnpm install --save lodash     
cnpm install --save-dev style-loader css-loader sass-loader    
cnpm install --save-dev url-loader  
cnpm install --save-dev html-webpack-plugin   
cnpm install clean-webpack-plugin --save-dev   
cnpm install extract-text-webpack-plugin  --save-dev  
cnpm install --save-dev uglifyjs-webpack-plugin
cnpm install babel-loader babel-core --save-dev  
cnpm install babel-preset-env --save-dev
cnpm install --save babel-polyfill
cnpm install babel-plugin-transform-runtime --save-dev  
cnpm install --save babel-runtime  
```
## 配置步骤  
### 1. 创建项目目录
创建dist生成包目录和src开发目录，src下创建index.js入口文件
### 2. 代码打包
运行npx webpack或node_modules\.bin\webpack（npx仅支持node8.2+），dist生成打包文件main.js    
### 3. 配置文件
#### (1) 创建配置文件
主目录创建webpack.config.js，启用配置文件npx webpack --config webpack.config.js  
#### (2) css加载
配置rulers，使用css-loader和style-loader加载css（注意依赖顺序，style-loader需放在前面）,less-loader加载less，sass-loader加载sass     
#### (3) 打包生成css文件  
配置plugins，style-loader默认在打包文件中添加style标签导入样式，使用extract-text-webpack-plugin插件生成独立css文件    
#### (4) 图片、字体等资源加载
配置rulers，使用url-loader加载引用资源（url-loader会将引入的图片编码，生成dataURl）      
#### (5) 自动引入依赖包
配置plugins，配置html-webpack-plugin，生成新模板，自动在模板中添加对生成包的引用      
#### (6) 清空目标文件夹
配置plugins，配置clean-webpack-plugin，打包前清空包文件夹      
#### (7) 错误跟踪调试  
配置devtool，开发环境配置为‘cheap-source-map’（开发环境‘cheap-module-eval-source-map’模式为最优配置，但仍存在bug，生产环境配置为‘source-map’）          
#### (8) 创建本地服务    
配置devServer，配置webpack-dev-server本地开发服务器，实现代码自动编译，浏览器实时刷新      
#### (9)  babel语法转换器  
babel-loader  
babel-core  
babel-preset-env   
babel-polyfill：防止浏览器不支持 Promise/Object.assign/Array.from等还有性能问题  
babel-plugin-transform-runtime：配合babel-polyfill开发环境使用  
babel-runtime：配合babel-polyfill生产环境使用  
#### (10)  
#### (9) 生产与开发环境分离       




