import { getQueryObject,formatTime  } from '../src/index'

test('用getQueryObject解析url参数', () => {
  const { a, b } = getQueryObject('https://www.baidu.com?a=1&b=2')
  expect(a).toBe('1')
  expect(b).toBe('2')
})

test('用 formatTime 格式化时间', () => {
  const t1 = formatTime(new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t2 = formatTime(+new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t3 = formatTime('2022/12/12 10:00:00', 'yyyy-MM-dd hh:mm:ss')
  expect(t1).toBe('2022-12-12 10:00:00')
  expect(t2).toBe('2022-12-12 10:00:00')
  expect(t3).toBe('2022-12-12 10:00:00')
})
