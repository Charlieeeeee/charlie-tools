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