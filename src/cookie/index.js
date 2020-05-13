
export const getCookie = (key)=> {
    const strcookie = document.cookie;//获取cookie字符串
    const arrcookie = strcookie.split('; ');//分割
    //遍历匹配
    for ( let i = 0; i < arrcookie.length; i++) {
        const arr = arrcookie[i].split('=');
        if (arr[0] == key){
            return arr[1];
        }
    }
    return '';
}
export const setCookie = (key, val, time) => {
    let i = time || 0;
    let o = '';
    if (i !== 0) {
        let a = new Date();
        a.setTime(a.getTime() + (1e3 * time));
        o = `; expires=${a.toGMTString()}`;
    }
    document.cookie = `${key}=${escape(val)}${o};`;
};

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
};

export default {
    getCookie,
    setCookie,
    deleteCookie
}