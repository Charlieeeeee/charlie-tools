const ct = require('../dist/bundle.js')

test('用getQueryObject解析url参数', () => {
  const { a, b } = ct.getQueryObject('https://www.baidu.com?a=1&b=2')
  expect(a).toBe('1')
  expect(b).toBe('2')
})

test('用 formatTime 格式化时间', () => {
  const t1 = ct.formatTime(new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t2 = ct.formatTime(+new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t3 = ct.formatTime('2022/12/12 10:00:00', 'yyyy-MM-dd hh:mm:ss')
  expect(t1).toBe('2022-12-12 10:00:00')
  expect(t2).toBe('2022-12-12 10:00:00')
  expect(t3).toBe('2022-12-12 10:00:01')
})
