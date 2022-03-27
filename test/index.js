const ct = require('./../dist/bundle-cjs')

console.log(ct.getQueryObject('https://www.baidu.com?a=x&b=y'))
