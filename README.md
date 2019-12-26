# webpack
webpack4+前端自动化部署环境搭建
# 项目启动
```
// 拉取远程库
git clone git@github.com:18569505972/webpack.git

// 下载依赖包
cnpm install

// 启动单页本地服务
npm run dev

// 创建单页链接库
npm run dll

// 单页打包
npm run build

// 启动多页本地服务
npm run muldev

// 创建多页链接库
npm run muldll

// 多页打包
npm run mulbuild

// 生成chunk统计json文件
npm run statistics

```
# 项目目录
```
│  .babelrc                 // babel转换规则
│  .gitignore
│  compilation-stats.json   // 打包模块统计文件
│  package.json      // 依赖包
│
├─build   // 单页webpack打包配置目录
│      build.js  // 单页线上打包入口
│      devServer.js  // 单页开发环境打包入口
│      stats.js  // 单页日志管理
│      webpack.base.config.js  // webpack基础编译配置
│      webpack.dev.config.js   // 单页webpack开发编译配置
│      webpack.dll.config.js   // 单页第三方链接库打包配置
│      webpack.prod.config.js  // 单页线上打包配置
│
├─build-multi  // 多页webpack打包配置目录
│      build.js  // 多页线上打包入口
│      devServer.js  // 多页开发环境打包入口
│      stats.js  // 多页日志管理
│      webpack.base.config.js  // webpack基础编译配置
│      webpack.dev.config.js   // 多页webpack开发编译配置
│      webpack.dll.config.js   // 多页第三方链接库打包配置
│      webpack.prod.config.js  // 多页线上打包配置
│
├─config
│      index-multi.js   // 多页webpack配置参数
│      index.js         // 单页页webpack配置参数
│
├─dist  // 项目打包输出目录
│  ├─bundle  // 单页chunk打包目录
│  │  │  index.52e66ea1.js  // 单页项目业务代码
│  │  │  index.html  // 单页html模板
│  │  │  manifest.json  // 单页文件映射
│  │  │  runtime.8dc32637.js  // 单页运行时文件
│  │  │  styles.63c8dfef.css  // 单页样式文件
│  │  │  styles.6b8cf864.js   // 样式chunk
│  │  │  vendors~index.cf4a9a5d.js  // 第三方插件chunk
│  │  │
│  │  ├─fonts  // 单页字体打包目录
│  │  │      V100020.76ffc9b.TTF
│  │  │
│  │  ├─images  // 单页图片打包目录
│  │  │      1.144b9ca.jpg
│  │  │
│  │  └─static  // 单页无需编译的静态资源打包目录
│  │          icon.ico
│  │
│  ├─dll  // 单页dll打包目录
│  │      vendor.dll.js  // 分离第三方链接库代码
│  │      vendor.manifest.json  // 第三方链接库映射文件
│  │
│  ├─multiBundle
│  │  │  manifest.json  // 多页打包文件映射
│  │  │  page1.html  // 多页page1页面
│  │  │  page2.html  // 多页page2页面
│  │  │
│  │  ├─css  // 多页css打包目录
│  │  │      common.d2e99091.css
│  │  │      page1.80dbf81a.css
│  │  │      page2.8f4d8020.css
│  │  │
│  │  ├─fonts  // 多页字体打包目录
│  │  │      1.c9f5865.TTF
│  │  │      V100020.76ffc9b.TTF
│  │  │
│  │  ├─images  // 多页图片打包目录
│  │  │      1.cf00228.jpg
│  │  │      1.db3c078.png
│  │  │      2.95bc5c7.jpg
│  │  │      2.a88854a.jpg
│  │  │      basketball.0b073ad.png
│  │  │      football.f0c70dd.png
│  │  │
│  │  ├─js   // 多页chunk打包目录
│  │  │      common.d132d118.js
│  │  │      page1.780c814f.js
│  │  │      page2.3cb1ec7a.js
│  │  │      runtime~page1.0dc435c8.js
│  │  │      runtime~page2.ea945d36.js
│  │  │      vendors~page1~page2.67a3f97f.js
│  │  │      vendors~page2.fb327e50.js
│  │  │
│  │  └─static  // 多页无需编译的静态资源打包目录
│  │          icon.ico
│  │
│  └─multiDll   // 多页dll打包目录
│          vendor.dll.js
│          vendor.manifest.json
│
└─src
    │  index.html  // 单页html模板
    │  page1.html  // 多页page1模板
    │  page2.html  // 多页page2模板
    │
    ├─multiPage
    │  │  common.scss  // 多页公共样式
    │  │
    │  ├─page1  // 多页page1页面
    │  │  │  index.js  // 多页page1入口文件
    │  │  │
    │  │  ├─fonts
    │  │  │      V100020.TTF
    │  │  │
    │  │  ├─images
    │  │  │      1.jpg
    │  │  │      2.jpg
    │  │  │      basketball.png
    │  │  │      football.png
    │  │  │      tennis.png
    │  │  │      volleyball.png
    │  │  │
    │  │  └─styles
    │  │          common.scss
    │  │
    │  └─page2   // 多页page2页面
    │      │  index.js  // page2入口文件
    │      │
    │      ├─fonts
    │      │      1.ttf
    │      │      V100020.TTF
    │      │
    │      ├─images
    │      │      1.png
    │      │      2.jpg
    │      │      basketball.png
    │      │      football.png
    │      │      tennis.png
    │      │      volleyball.png
    │      │
    │      └─styles
    │              common.scss
    │
    ├─singlePage    // 单页项目目录
    │  │  index.js  // 单页入口js
    │  │
    │  ├─fonts  // 单页字体文件
    │  │      V100020.TTF
    │  │
    │  ├─images   // 单页图片文件
    │  │      1.jpg
    │  │      2.jpg
    │  │
    │  ├─scripts  // 单页脚本文件
    │  │      hashTest.js
    │  │      index.js
    │  │      test.js
    │  │
    │  └─styles  // 单页样式文件
    │          common.scss
    │
    └─static   // 无需编译的静态资源文件
```
# 基础概念
## context
定义entry入口和HtmlWebpackPlugin插件绝对路径，默认为根目录。
## entry  
作用：指定一个或多个入口文件，作为打包的起始索引。  
默认打包目录：./src。  
### 单页配置（指定一个入口文件） 
```
// 数组、字符串形式定义入口，默认生成入口chunkname为main
entry：'./main.js'
entry：['./main.js','./lodash.js']
// 单个文件打包成一个app.js
entry：{
	app：'./main.js'
}
// 多个文件打包成一个app.js
entry：{
	app：['./main.js','./lodash.js']
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
    /*
        [hash]：webpack打包所有资源生成的hash；
        [chunkhash]：指代当前chunk内容的hash，chunkhash只与自身内容有关，便于客户端缓存；
        [id]：指代当前chunk的id；
        [query]：指代filename配置项中的query；
    */
    // 入口输出包名,添加hash值
	filename:'[name].[chunkhash:8].js',
    // 按需加载模块输出名配置
    chunkFilename: '[name].[chunkhash:8].js',
    // 打包目录，必须为绝对路径
	path:resolve(__dirname,'dist'), 
    // 请求静态资源域名，如异步加载的js、css，css中的图片、字体等
	publicPath:"http://static.com"
}
```
## module
模块配置
### noParse
略过解析某类文件。
### loader
作用：webpack只能解释编译js和json文件，所以需要配置loader去预处理vue、jsx、css、img、字体、视频、语音等格式的文件，将其转换为JavaScript。  
#### 必须属性
test：匹配被转换文件的格式。  
use：进行转换时用到的loader。  
include：loader只对指定目录下的模块生效，值为字符串或正则表达式。
exclude：loader排除指定目录下的模块，优先级高于include，值为字符串或正则表达式。 
```
// 只处理src目录下的非lib子目录内的css文件
rules:[
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: /src/,
        exclude: /src\/lib/
    }
]
``` 
resource：被加载者，上面的loader基本配置规则都是针对resource的。  
issuer：加载者。
```
// index.js为issuer，style.css为resource
// index.js
import './style.css'

// 只有src/pages下的js文件引用的css，这条规则才会启用。  
rules:[
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: /src/,
        exclude: /src\/lib/,
        issuer: {
            test: /\.js/,
            include: /src/pages
        }
    }
]
```
enforce：强制指定某一loader执行顺序，默认为normal，值为pre表示当前loader在所有loader之前执行，值为post表示值在所有loader之后执行。  
#### css-loader、style-loader
css-loader：允许在js中import一个css文件，会将css文件当成一个模块引入到js文件中。  
style-loader：使用style标签将css-loader内部样式注入到我们的HTML页面。  
#### postcss-loader
接收样式源码，交给样式插件处理样式，配合autoprefixer插件用于处理浏览器前缀。
#### sass-loader node-sass
node-sass把sass编译成css,sass-loader 是webpack的一个loader。webpack中二者结合实现对sass的转化。再配合css-loader将css样式转换为js模块。  
sourceMap：开启css的sourceMap。  
```
rules:[
    {
        test: /\.scss$/,
        use: [
            {
                loader:"css-loader",
                options: {
                    sourceMap: true
                } 
            },
            {
                loader: "postcss-loader",
                options: {
                    sourceMap: true,
                    plugins: [
                        require("autoprefixer")
                    ]
                }
            },
            {
                loader:"sass-loader",
                options: {
                    sourceMap: true
                } 
            }
        ]
    }
]
```
#### less-loader
实现less到css转化，再配合css-loader将css样式转换为js模块。
#### url-loader、file-loader
name参数:将文件输入到指定地址，\[name\]代表文件名，\[hash:7\]代表7位hash，\[ext\]代表文件扩展名。     
limt:表示文件大小限制（单位byte），小于指定值的文件以file-loader进行base64转码打包。  
publicPath: 覆盖output.publicPath。  
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
rules:[
    {
        test: /\.js$/,
        //排除转换node_modules
        exclude: /node_modules/,   
        // 只转化src目录下js文件
        include: /src/,            
        loader: "babel-loader",
        options: {
            // 开启编译缓存，防止二次编译重复打包未改变过的模块，加快打包速度
            cacheDirectory: true,
            presets: [
             [
                 "@babel/preset-env", {
                    // 禁用babel模块转化语句，防止babel将ES6 Module转化为CommonJS，以便于webpack做tree-shaking
                    modules: false,
                    // useBuiltIns须开启corejs3.x+版本
                    corejs: 3,
                    // 使用polyfill向低版本注入不支持的新特性时，按需注入
                    useBuiltIns: 'usage'
                 },
             ]
         ],
        }
    }
]
```
#### html-loader
将html文件转换为字符串并格式化，使得html片段可通过js加载进来。  
```
rules:[
    {
        test: /\.html$/,
        use: { loader: 'html-loader' }
    }
]
```
#### worker-loader
将js文件注册为Web Worker。
```
rules:[
    {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
    }
]
```
#### 自定义loader
```
loaders/helloworld-loader/index.js
var loaderUtils = require('loader-utils')
// content文件内容
module.exports = function(content) {
    // 启用缓存，加快打包速度
    if(this.cacheable) {
        this.cacheable()
    }
    // 获取loader配置项
    var options = loaderUtils.getOptions(this) || {};
    console.log(options.console)
    return "/\/\ hello world \n" + content
}

webpack.base.conf.js
// 配置自定义loader加载目录
resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, '../loaders')]
},
rules:[
    {
        test: /\.js$/,
        use: [{ 
            loader: 'helloworld-loader',
            options: {
                console: 'Hello World!!!'
            }
        }]
    }
]
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
此插件将CSS提取到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。可打包按需加载的css模块。（不支持开发环境HRM，建议用于线上环境）,webpack4以前为extract-text-webpack-plugin。  
#### 配置项
publicPath：指定按需加载的link路径。  
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
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            // 指定按需加载的link路径
                            publicPath: './'
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]

            }
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                // 提取所有css文件到styles
                styles: {
                    name: 'styles',
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
            chunkFilename: '[name].[chunkhash].css'     // 按需加载的css块名
        })
    ]
}
```
### optimize-css-assets-webpack-plugin
优化css文件的输出，默认使用cssnano，其优化策略主要包括：摈弃重复的样式定义、砍掉样式规则中多余的参数、移除不需要的浏览器前缀等。[优化配置](#chunkBetter)
### terser-webpack-plugin（webpack内置）
优化压缩js（用terser-webpack-plugin替换掉uglifyjs-webpack-plugin解决uglifyjs不支持es6语法问题。）[自定义优化配置](#chunkBetter)
### SplitChunksPlugin
自动拆分代码块代码，提取第三方插件以及重复使用的模块，优化按需加载和页面初始化请求数。
```
optimization: {
    splitChunks: {
        chunks: 'all',
        minSize: 30000, //chunk的大小得大于30kb，避免生成vendor过多，发起过多请求
        maxSize: 0,
        minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数
        maxAsyncRequests: 5, //按需加载代码块最大并行chunk小于等于5，防止请求过多
        maxInitialRequests: 3, //初始html内代码块小于等于3，减少初始化请求
        automaticNameDelimiter: '~', // 打包分隔符
        name: true, // 根据切割之前的代码块和缓存组键值(key)自动分配命名
        cacheGroups: { // 缓存组
            vendors: {
                test: /[\\/]node_modules[\\/]/, // 提取node_modules模块到vendors
                priority: -10 // 权重
            },
            styles: {
                name: 'styles', // 提取所有css文件到styles
                test: /\.s?css$/,
                chunks: 'all',
                enforce: true,
                priority: -11,
            },
            default: { // 将至少有两个chunk引入的模块进行拆分
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true  // 这个配置允许我们使用已经存在的代码块
            }
        }
    },
    // name: entrypoint => `runtime~${entrypoint.name}`|multiple|true为每个入口chunk，生成runtime
    // name: 'runtime'|single，多个入口chunk生成一个公共的runtime
    // name: false，不生成runtime，入口runtime直接打包进入口chunk
    runtimeChunk: {
        name: 'runtime'
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
### DllPlugin和DllReferencePlugin
分离第三方库，在每次打包时只打包业务代码，不重新打包第三方库。提高构建、编译速度。（webpack4.0中用了splitPlugin进行线上打包的话，建议DllPlugin仅用于开发环境，两者同时使用会导致第三方库重复打包的问题）。    
具体配置见：[dllPlugin编译优化](#dllPlugin)
### NamedModulesPlugin（webpack内置插件）
开发环境HRM热加载控制台显示修改模块相对路径及名称。（mode为development默认开启）
```
new webpack.NamedModulesPlugin()
// 或者
optimization: {
    namedModules: true
}
```
### NamedChunksPlugin（webpack内置插件）
将webpack入口文件的入口执行模块ID改为文件名。（mode为development默认开启）
```
new webpack.NamedChunksPlugin()
// 或者
optimization: {
    namedChunks: true
}
```
### HashedModuleIdsPlugin（webpack内置插件）
根据模块的相对路径生成一个四位数的hash作为模块id。  
作用：[线上缓存优化](#cache)
### ProvidePlugin（webpack内置插件）
将模块绑定为全局模块，自动加载模块，而不必到处import或require，实现[全局模块内方法按需加载](#provide)。
```
new webpack.ProvidePlugin({
    _: 'lodash'
})
```
### DefinePlugin （webpack内置插件）
定义全局变量，项目内任何文件都可以访问到。（在mode为production或development的状态下，为了兼顾两个状态下的程序运行，webpack默认创建了一个全局变量process.env.NODE_ENV，值默认为mode值）。
```
new webpack.DefinePlugin({
    'process.env.NODE_ENV）': JSON.stringify('development')
}),
```
### webpack-manifest-plugin
用于生成源文件到打包文件的json映射文件的Webpack插件。
```
new ManifestPlugin()
```
### webpack-dev-middleware
主要实现对文件的监控和编译，配合express创建本地服务器，与HotModuleReplacementPlugin、webpack-hot-middleware实现实时浏览器[热加载](#hotLoad)。
### HotModuleReplacementPlugin（webpack内置插件）
### open-browser-webpack-plugin
启动本地服务后自动打开浏览器。
```
new OpenBrowserPlugin({ url: 'http://localhost:3000' })
```
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
### NoEmitOnErrorsPlugin（webpack内置插件）
编译碰到错误、warning，但是不停止编译。
```
new webpack.NoEmitOnErrorsPlugin()
// 或者
optimization: {
    noEmitOnErrors: true
}
```
### OccurrenceOrderPlugin（webpack内置插件，默认启用）
根据出现次数为每一个模块或者chunk设置id,经常使用的模块则会获取到较短的id(和前缀树类似)，这可以使id可预测并有效减少文件大小，建议使用在生产环境中。
```
optimization: {
    occurrenceOrder: true
}
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
[参考链接](https://webpack.docschina.org/configuration/resolve/#resolve-alias)
### extensions
自动解析指定扩展名文件。使数组中指定格式文件导入时可不带扩展名。（因为会覆盖默认数组，所以得添加js、css否则导入模块可能无法解析，导致报错。）
```
resolve: {
    extensions: ['.vue', '.jsx', '.js', '.css']
}
```
[参考链接](https://webpack.docschina.org/configuration/resolve/#resolve-extensions)
### modules
解析模块时优先检索目录。
```
resolve: {
    modules: [path.resolve(__dirname, '../src'), "node_modules"]
}
```
[参考链接](https://webpack.docschina.org/configuration/resolve/#resolve-modules)
## externals
配置全局变量，防止将某些 import 的包(package)打包到 bundle中，而是在运行时(runtime)再去从外部获取这些扩展依赖。
```
externals: {
  jquery: 'jQuery'
}
```
[参考链接](https://webpack.docschina.org/configuration/externals/)
## performance
控制webpack资源和入口起点超过指定文件限制如何通知开发者。  
[参考资料](https://webpack.docschina.org/configuration/performance/)
## 打包生成文件
1、项目源码  
2、引入第三方库（vendor）  
3、运行时代码（runtime），主要包含处理模块间的链接和解析的代码。   
4、文件映射（manifest），管理打包前和打包后文件之间的对应标识。
## 优化配置
### optimization
[参考资料](https://webpack.docschina.org/configuration/optimization/)
#### optimization.minimize
开启包压缩。（mode为production 模式下，这里默认是 true）
```
optimization: {
    minimize: true
}
```
#### <h5 id="chunkBetter">自定义配置</h5>  
```
optimization: {
    minimizer: [
        // 优化js文件
        new TerserPlugin({
            // 过滤已压缩的文件
            chunkFilter: (chunk) => {
                if (/\.min\.js$/.test(chunk.name)) {
                    return false
                }
                return true
            },
            // 启用多进程压缩
            parallel: true
        }),
        // 用于优化css文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true, // 避免 cssnano 重新计算 z-index
                autoprefixer: { disable: true }, // 禁止移除带前缀的样式
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: false // 禁止打印log
        })
    ],
}
```
#### optimization.noEmitOnErrors 
报错时跳过生成，防止打出问题包。
```
optimization: {
    noEmitOnErrors: true
}
```
#### optimization.removeEmptyChunks
打包chunk为空则删除chunk。
```
optimization: {
    removeEmptyChunks: true
}
```
#### optimization.mergeDuplicateChunks 
合并相同chunk。
```
optimization: {
    mergeDuplicateChunks: true
}
```
### tree-shaking
#### 作用
剔除打包代码中的无用exports模块。（webpack4默认对ESmodel引入的json模块进行未使用字段的tree-shaking处理）
#### 副作用
在导入时会执行特殊行为的代码，而不是仅仅暴露一个export或多个export。举例说明，例如polyfill，它影响全局作用域，并且通常不提供export；再比如使用类似css-loader并import一个CSS文件。   
会受到resolve.alias影响。  
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
### <div id="dllPlugin">编译优化</div>
dll第三方链接库打包配置 

webpack.dll.config.js  

```
module.exports = {
    mode: 'development',
    entry: {
        // 第三方库
        vendor: ['vue','vuex','vue-router','axios']
    },
    output: {
        // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
        filename: '[name].dll.js',
        // 生成库目录
        path: path.resolve(__dirname, '../dist/dll'),
        // library必须和后面dllplugin中的name一致
        library: '[name]_dll_[hash]'
    },
    plugins: [
        new cleanWebpackPlugin(), //打包前清理文件夹
        new webpack.DllPlugin({
            // 定义manifest链接库name字段名
            name: '[name]_dll_[hash]',
            // 定义manifest输出文件
            path: path.resolve(__dirname, '../dist/dll', 'vendor.manifest.json')
        })
    ]
}
```
添加dll文件映射，并以标签形式插入到生成的html文件中。  

webpack.dev.config.js  

```
plugins:[
    // 映射dll文件夹下的vendor.manifest.json
    new webpack.DllReferencePlugin({
        manifest: require(path.resolve(__dirname, '../dist/dll/vendor.manifest.json'))
    }),
    // 生成html页面
    new htmlWebpackPlugin({
        filename: 'index.html',
        inject: true
    }),
    // 将文件插入htmlWebpackPlugin文件注入列表中
    new AddAssetHtmlPlugin({
        // html插入文件路径
        filepath: require.resolve('../dist/dll/vendor.dll.js')
    })
]
```
### <div id="hotLoad">热重载、热替换</div>
文件改动后，以最小的代价改变页面被改变的区域。尽可能保留改动文件前的页面状态。
#### 本地服务与文件编译、监控
主要通过express与webpack-dev-middleware实现。  
```
server.js  
const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
// express初始化
const app = express();
// 引入webpack开发配置文件
const devConfig = require('./webpack.dev.config.js');
// 生成编译器
const compiler = webpack(devConfig);
// 中间件配置
app.use(webpackDevMiddleware(compiler, {
    quiet: true,  //向控制台显示任何内容 
    // 开发环境静态资源服务器路径
    publicPath: path.resolve(__dirname, '../dist')
}));
// 返回请求页面
app.get("*", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "../dist"));
})
// 服务端口 8888.
app.listen(config.dev.port, function() {

```
#### 热重载、热替换
主要通过webpack-hot-middleware、HotModuleReplacementPlugin插件实现。  

server.js  

```
const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
// express初始化
const app = express();
// 引入webpack开发配置文件
const devConfig = require('./webpack.dev.config.js');
// 生成编译器
const compiler = webpack(devConfig);
// 中间件配置
app.use(webpackDevMiddleware(compiler, {
    quiet: true,  //向控制台显示任何内容 
    // 开发环境静态资源服务器路径
    publicPath: path.resolve(__dirname, '../dist'),
}));
// 热重载
app.use(require("webpack-hot-middleware")(compiler,{
    log: false,
    path: "/__what",
    heartbeat: 2000
}));
// 返回请求页面
app.get("*", (req, res, next) =>{
    res.sendFile(path.join(__dirname, "../dist"));
})
// 服务端口 8888.
app.listen(config.dev.port, function() {
    console.log(`项目启动：http://localhost:${config.dev.port}\n`);
});
```
entry中client.js的参数为webpack-hot-middleware的配置项。也可直接在server.js的webpack-hot-middleware配置项中配置。  

webpack.dev.config.js   

```
{
    entry: ['webpack-hot-middleware/client.js?path=/__what&timeout=20000&reload=true', './src/index.js'],

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}
```
### <div id="cache">缓存优化</div>
线上环境通过配置HashedModuleIdsPlugin插件，实现修改业务代码不影响第三方库（vendor）hash值的变化，实现浏览器缓存复用。

webpack.prod.config.js   

```
plugins: [
    new webpack.HashedModuleIdsPlugin()
]
```
#### cache-loader
缓存无需经常编译打包的体积大的loader。
### shimming（全局变量模块化）
#### <div id="provide">全局模块方法按需加载</div>
配合tree-shaking实现只加载lodash的join方法，其他方法剔除出打包代码。
```
plugins: [
  new webpack.ProvidePlugin({
    join: ['lodash', 'join']
  })
]

```
#### 模块this指向问题
某些模块this指向window，但在commonJS中this指向module.exports，因此打包时需要将this重新绑定回window。
```
module: {
 rules: [
   {
     test: require.resolve('module.js'),
     use: 'imports-loader?this=>window'
   }
 ]
},
```
#### 全局变量作为模块导出 

模块 module.js  

```
var file = 'blah.txt';
var helpers = {
  test: function() { console.log('test something'); },
  parse: function() { console.log('parse something'); }
}
```

webpack.config.js  

```
modules: {
    rules: [
        {
         test: require.resolve('globals.js'),
         use: 'exports-loader?file,parse=helpers.parse'
        }
    ]
}
```

引用src/index.js  

```
import { file, parse } from './module.js'
```

[参考链接](https://www.webpackjs.com/guides/shimming/#shimming-%E5%85%A8%E5%B1%80%E5%8F%98%E9%87%8F)  

### 生成统计数据文件
```
webpack --profile --json > compilation-stats.json
```
生成有关于模块的统计数据的JSON文件。生成文件可以通过webpack可视化工具生成统计图表。  
[参考链接](https://webpack.docschina.org/api/stats/)  
#### webpack-bundle-analyzer 
通过此插件对chunk实现可视化结构，分析chunk组成部分，优化代码。
```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            // 分析模式，server、static、disabled
            // server开启本地服务、static生成html文件、disabled生成json文件
            analyzerMode: 'server',
            // server模式下服务ip
            analyzerHost: '127.0.0.1',
            // server模式下端口
            analyzerPort: 2266,
            // static模式下html生成路径，相对于output.path
            reportFilename: 'log/report.html',
            // 在默认浏览器自动打开报告
            openAnalyzer: true
        })
    ]
}
```
### 日志管理
[参考资料](https://webpack.docschina.org/configuration/stats/)
```
// webpackConfig为webpack配置项，stats参数包含构建信息
// 通过回调函数和stats参数可以对控制台打印信息颗粒化控制
webpack(webpackConfig, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(stats.toString({
        // 添加资源信息
        assets: true,
        // 对资源按指定的字段进行排序
        // 你可以使用 `!field` 来反转排序。
        assetsSort: "field",
        // 添加构建日期和构建时间信息
        builtAt: true,
        // 添加缓存（但未构建）模块的信息
        cached: false,
        // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
        cachedAssets: false,
        // 添加 children 信息
        children: false,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: false,
        // 将构建模块信息添加到 chunk 信息
        chunkModules: false,
        // 添加 chunk 和 chunk merge 来源的信息
        chunkOrigins: false,
        // `webpack --colors` 等同于
        colors: true,
        // 显示每个模块到入口起点的距离(distance)
        depth: false,
        // 通过对应的 bundle 显示入口起点
        entrypoints: false,
        // 添加 --env information
        env: false,
        // 添加错误信息
        errors: true,
        // 添加错误的详细信息（就像解析日志一样）
        errorDetails: true,
        // 添加构建模块信息
        modules: false
    }));
})
```

