import { 
  getQueryObject,
  formatTime, 
  getTypeOf, 
  debounce, 
  throttle,
  hexToRgb,
  cMath
} from '../index'

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

test('用 debounce 防抖', () => {
  expect(getTypeOf(debounce(() => {}))).toBe('Function')
})

test('用 throttle 节流', () => {
  expect(getTypeOf(throttle(() => {}))).toBe('Function')
})

test('用 hexToRgb 将16进制颜色转为rgb', () => {
  expect(hexToRgb('#27ae60')).toBe('rgb(39, 174, 96)')
})

test('加减乘除', () => {
  const { add, subtract, multiply, divide } = cMath
  expect(add(0.1, 0.2)).toBe(0.3)
  expect(subtract(0.32, 0.2)).toBe(0.12)
  expect(multiply(0.1, 0.12)).toBe(0.012)
  expect(divide(0.3, 0.2)).toBe(1.5)
})
