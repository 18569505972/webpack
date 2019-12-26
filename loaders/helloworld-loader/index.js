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
    return "console.log(123456);" + content
}