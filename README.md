# charlie-tools

## 使用

> import { cookie } from 'charlie-tools'
>
> cookie.set(name,'charlie',{});

### tools API

1. cookie :
    - cookie.set(key, val [, option])
    > __key__
    type : string
    __val__
    type : string
    __option__
    type : object
    default: { domain = '', path = '/', expires = 0, secure = false }

    - cookie.get(key)
    > __key__
    type : string

    - cookie.clear(key)
    > __key__
    type : string

2. listener :
    - addListener(event, fn, dom [, option])
    > __event__
    type : string
    __fn__
    type : function
    __dom__
    type : DOM
    __option__
    type : object
    default: { capture = false, passive = false, once = false}

    - removeListener(event, fn, dom [, useCapture])
    > __event__
    type : string
    __fn__
    type : function
    __dom__
    type : DOM
    __useCapture__
    default: false

3. copy :
    - copy(text,cb)
    > __text__
    type : string
    __cb__
    type : function
4. timeFormat :
    - timeFormat(pattern,time);
    > __pattern__
    type : string
    example: 'YY-MM-DD hh:mm:ss'
    __time__
    type : Date
    example: new Date()
5. groupArray :
    - groupArray(arr,len);
    > __arr__
    type : array
    example: [1,2,3,4]
    __len__
    type : number
    example: 2
