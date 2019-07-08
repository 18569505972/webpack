import './styles/common.scss'
import '../common.scss'
import lodash from 'lodash'
// 获取webpack全局变量
let env = process.env.NODE_ENV === 'development' ? '开发环境' : '线上环境'
let dom = document.createElement('div')
dom.innerHTML = `<h3>当前环境：${env}</h3>`
document.body.appendChild(dom)
// 热加载
if (module.hot) {
    module.hot.accept();
}