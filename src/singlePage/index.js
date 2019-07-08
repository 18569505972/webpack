// css打包测试
import './styles/common.scss'
// es6扩展表达式打包测试
import { arr } from './scripts/index.js'
// 别名测试
import test from '@/singlePage/scripts/test.js'
// 第三方插件打包测试
import lodash from 'lodash'
// hash缓存测试
import hashTest from './scripts/hashTest.js'
// 获取webpack全局变量
let env = process.env.NODE_ENV === 'development' ? '开发环境' : '线上环境'
let fragment = document.createDocumentFragment()
// 当前环境
let dom = document.createElement('h3')
let text = document.createTextNode(`当前环境：${env}`)
dom.appendChild(text)
fragment.appendChild(dom)
// 别名测试
dom = test()
fragment.appendChild(dom)
// css前缀测试
dom = document.createElement('div')
dom.className = 'block'
fragment.appendChild(dom)
// css图片测试
dom = document.createElement('div')
dom.className = 'continue'
fragment.appendChild(dom)
// es6 promise测试
new Promise((resolve, reject) => {
    // img图片测试
    dom = new Image()
    dom.onload = () => {
        fragment.appendChild(dom)
        resolve()
    }
    dom.setAttribute('src', require('./images/2.jpg'))
}).then(() => {
    dom = document.createElement('h5')
    dom.innerHTML = 'promise加载完成'
    fragment.appendChild(dom)
    document.querySelector("#app").appendChild(fragment)
})
// 热加载
if (module.hot) {
    module.hot.accept();
}