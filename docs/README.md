# charlie-tools

## 简介

charlie-tools 是一个实用工具库。[文档](https://charlieeeeee.github.io/charlie-tools/)
> 遵循 MIT 开源协议发布，并且支持最新的运行环境。 查看各个构件版本的区别并选择一个适合你的版本。


## 安装
```shell
npm i charlie-tools
```

## 使用
```js
import { getQueryObject } from 'charlie-tools'
getQueryObject('https://www.baidu.com?a=1&b=2')
// { a: 1, b: 2 }
```

## 方法

### getQueryObject
> 获取链接中的query object

|  参数   | 类型  | 默认值 |
|  ----  | ----  | ----  |
| url ?  | string | location.href |

```js
import { getQueryObject } from 'charlie-tools'
getQueryObject('https://www.baidu.com?a=1&b=2')
// { a: 1, b: 2 }
```

### copyTexts
> 复制文案

|  参数   | 类型  |
|  ----  | ----  |
| texts   | string |
```js
import { copyTexts } from 'charlie-tools'
(() => {
  copyTexts('copy content')
    .then(() => {
      // 复制成功
    }).catch(() => {
      // 复制失败
    })
})()
```

### formatTime
> 格式化时间

|  参数   | 类型  |
|  ----  | ----  |
| date   | Date、string、number |
| fmt   | string|

```js
import { formatTime } from 'charlie-tools'
formatTime(new Date('2022/12/12 10:00:00').getTime(), 'yyyy-MM-dd hh:mm:ss')
// 2022-12-12 10:00:00
```

### getTypeOf
> 获取类型

|  参数   | 类型  |
|  ----  | ----  |
| val   | unknown |

```js
import { getTypeOf } from 'charlie-tools'
getTypeOf('hello')
// String
getTypeOf(10)
// Number
getTypeOf(() => {})
// Function
```

### debounce
> 防抖

|  参数   | 类型  |  默认值  |
|  ----  | ----  | ----  |
| fn   | (...params: unknown[]) => unknown | 无 |
| timeout?   | number | 1000 |

```vue
<template>
  <button @click="handleClick">click</button>
</template>

<script>
import { debounce } from 'charlie-tools'
export default {
  methods: {
    handleClick: debounce(() => {
      console.log('handleClick')
    })
  }
}
</script>
```

### throttle
> 节流

|  参数   | 类型  |  默认值  |
|  ----  | ----  | ----  |
| fn   | (...params: unknown[]) => unknown | 无 |
| timeout?   | number | 1000 |

```vue
<template>
  <button @click="handleClick">click</button>
</template>

<script>
import { throttle } from 'charlie-tools'
export default {
  methods: {
    handleClick: throttle(() => {
      console.log('handleClick')
    })
  }
}
</script>
```

### hexToRgb
> 将十六进制颜色转换为具有RGB

|  参数   | 类型  |
|  ----  | ----  |
| hex | string  |

```js
import { hexToRgb } from 'charlie-tools'
hexToRgb('#27ae60')
// 'rgb(39, 174, 96)'
```

### onVisibilityChange
> 当页面可见性发生改变（兼容写法）

|  参数   | 类型  |
|  ----  | ----  |
| cb | (isHidden: boolean) => unknown  |

```js
import { onVisibilityChange } from 'charlie-tools'
const cancel = onVisibilityChange(isHidden => {
  if (isHidden) {
    console.log('页面隐藏')
  } else {
    console.log('页面显示')
  }
})
// 取消监听
cancel()
```

### cMath
> 提供了加、减、乘、除方法, (解决了精度丢失问题)。add, subtract, multiply, divide。

|  参数   |  类型  |
|  ----  |  ----  |
|  num1  | number |
|  num2  | number |

```js
import { cMath } from 'charlie-tools'
cMath.add(0.1, 0.2)
// 0.3
cMath.subtract(0.32, 0.2)
// 0.12
cMath.multiply(0.1, 0.12)
// 0.012
cMath.divide(0.3, 0.2)
// 1.5
```

### linkMath 
> 提供了可链式调用的加、减、乘、除方法, (解决了精度丢失问题)。

|  参数   |  类型  |
|  ----  |  ----  |
|  num1  | number |
```js
import { linkMath } from 'charlie-tools'
linkMath.input(1).add(7).subtract(2).multiply(3).divide(9).getResult()
// 2
```

### deleteUrlParam
> 移除链接上不需要的参数

|  参数   |  类型  |
|  ----  |  ---- |
|  url  | key |

```js
import { deleteUrlParam } from 'charlie-tools'

deleteUrlParam('https://www.baidu.com?a=1', 'a')
// 'https://www.baidu.com'
```

### concatUrlParam
> 可以给链接添加参数，或者说给链接拼接额外参数

|  参数   |  类型  |
|  ----  |  ---- |
|  url  | params |
```js
import { concatUrlParam } from 'charlie-tools'
concatUrlParam('https://www.baidu.com?a=1', {
  b: '2'
})
// https://www.baidu.com?a=1&b=2
concatUrlParam('https://www.baidu.com', {
  b: '2'
})
// https://www.baidu.com?b=2
```