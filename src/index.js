import _ from 'lodash'
import './common.css'
import btnClick from './print.js'
function component() {
    var element = document.createElement('div');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    let btn= document.createElement("button");
    btn.innerHTML='click';
    btn.onclick=btnClick;
    element.appendChild(btn);
    return element;
 }
 document.body.appendChild(component());