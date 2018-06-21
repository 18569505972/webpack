# webpack
webpack环境配置   
## 依赖模快
cnpm install --save -dev webpack      
cnpm install webpack-cli --save-dev     
cnpm install --save-dev lodash     
cnpm install --save-dev style-loader css-loader    
cnpm install --save-dev url-loader  
cnpm install --save-dev html-webpack-plugin   
cnpm install clean-webpack-plugin --save-dev   
cnpm install extract-text-webpack-plugin  --save-dev  
cnpm install --save-dev webpack-dev-server
## 配置步骤  
### 1. 创建项目目录
创建dist生成包目录和src开发目录，src下创建index.js入口文件
### 2. 代码打包
运行npx webpack或node_modules\.bin\webpack（npx金支持node8.2+），dist生成打包文件main.js    
### 3. 配置文件
#### (1) 创建配置文件
主目录创建webpack.config.js，启用配置文件npx webpack --config webpack.config.js  
#### (2) css加载
配置rulers，使用css-loader和style-loader加载css（注意依赖顺序，style-loader需放在前面）  
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




