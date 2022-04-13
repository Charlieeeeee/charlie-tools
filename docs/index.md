# charlie-tools

## 简介

charlie-tools 是一个实用工具库。
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
- 参数
  - url ? : string
> 默认返回location.href的query object
```js
import { getQueryObject } from 'charlie-tools'
getQueryObject('https://www.baidu.com?a=1&b=2')
// { a: 1, b: 2 }
```

### copyTexts
- 参数
  - texts: string
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

### 