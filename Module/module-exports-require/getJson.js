/**
 * json 不需要导出，直接使用
 */
const json = require('./package.json');

console.log(json);

// import 直接引入会报错
// import json2 from ('./package.json')
// console.log(json2);
