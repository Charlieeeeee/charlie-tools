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
      return unescape(cookArr[2]);
    }

    return null;
  },
  clear (key, domain) {
    document.cookie = `${key}="";${domain ? `domain=${domain};` : ''}max-age=-1`;
    const res = handleStorage.cookie.get(key);

    return !res;
  }
}