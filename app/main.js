import greet from './Greeter.js';
import test from './Test.js';
import Alert from './alert/alert.js';
import $ from 'jquery'

let root=document.querySelector('#root')
root.appendChild(greet());
root.appendChild(test());
$('.a').css({color:'red'})

var alert=new Alert('asd')
