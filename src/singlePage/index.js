import './styles/common.scss'
import { arr } from './scripts/index.js'
import { testAlias } from '@/test.js'
console.log('已加载单页入口文件')
console.log(arr)
//let env = isDev?'开发环境':'线上环境'
//console.log(des)
testAlias()
if(module.hot){
  module.hot.accept();
}
