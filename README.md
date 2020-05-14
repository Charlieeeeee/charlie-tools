# charlie-tools

### 使用
> import { cookie } from 'charlie-tools'
>
> cookie.set(name,'charlie',{});

### tools API

1. cookie :
    - cookie.set(key, val, option)
    > option
    default value: { domain = '', path = '/', expires = 0, secure = false }

    - cookie.get(key)

    - cookie.clear(key, domain)

2. listener :
    - addListener(event, fn, dom [, option])
    > option
    default value: { capture = false, passive = false, once = false}

    - removeListener(event, fn, dom [, useCapture])
    > useCapture
    default value: false
