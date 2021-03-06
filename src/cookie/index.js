export const cookie = {
  set (key, val, { domain = '', path = '/', expires = 0, secure = false }) {
    let res;
    try {
      let ts;
      if(expires >= 0){
        ts = new Date();
        ts.setTime(ts.getTime() + expires * 1000);
      }
      document.cookie = `${key}=${val};${domain ? `domain=${domain};` : ''}${path ? `path=${path};` : ''}${expires ? `expires=${ts ? ts.toUTCString() : ''};` : ''}${secure ? 'secure' : ''}`;
      res = true;
    } catch (err) {
      res = false;
    }

    return res;
  },
  get (key) {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    const cookArr = document.cookie.match(reg);
    if (cookArr && cookArr[2]) {
      return decodeURI(cookArr[2]);
    }

    return null;
  },
  delete (key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    const res = this.get(key);
    return !res;
  },
  clear() {
      var date=new Date();
      date.setTime(date.getTime()-10000);
      var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
          for (var i =  keys.length; i--;)
            document.cookie = `${keys[i]}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            document.cookie = `${keys[i]}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
      }
   }
}