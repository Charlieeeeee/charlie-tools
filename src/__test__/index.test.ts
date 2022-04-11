import { getQueryObject,formatTime, getTypeOf } from '../index'

test('用getQueryObject解析url参数', () => {
  const query = getQueryObject('https://www.baidu.com?a=1&b=2')
  // toBe使用 Object.is来进行精准匹配的测试。 如果您想要检查对象的值，请使用 toEqual 代替
  expect(query).toEqual({
    a: '1',
    b: '2'
  })
})

test('用 formatTime 格式化时间', () => {
  const t1 = formatTime(new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t2 = formatTime(+new Date('2022/12/12 10:00:00'), 'yyyy-MM-dd hh:mm:ss')
  const t3 = formatTime('2022/12/12 10:00:00', 'yyyy-MM-dd hh:mm:ss')
  expect(t1).toBe('2022-12-12 10:00:00')
  expect(t2).toBe('2022-12-12 10:00:00')
  expect(t3).toBe('2022-12-12 10:00:00')
})

test('用 getTypeOf 获取类型', () => {
  expect(getTypeOf('a')).toBe('String')
  expect(getTypeOf(1)).toBe('Number')
  expect(getTypeOf((/s/))).toBe('RegExp')
  expect(getTypeOf([])).toBe('Array')
})