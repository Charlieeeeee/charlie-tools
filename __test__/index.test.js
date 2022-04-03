const ct = require('../dist/bundle.js')

test('用getQueryObject解析url参数', () => {
  const { a, b } = ct.getQueryObject('https://www.baidu.com?a=1&b=2')
  expect(a).toBe('1')
  expect(b).toBe('2')
})
