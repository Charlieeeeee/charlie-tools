export const storage = (()=>{
    if(typeof window === 'undefined') return {
      get: () => null,
      set: () => false,
      clear: () => false
    };

    const handleStorage = {
      sessionStorage: {
        set (key, val) {
          let res;
          try {
            if (!window.sessionStorage) throw false;
            window.sessionStorage.setItem(key, val);
            res = true;
          } catch (err) {
            res = false;
          }

          return res;
        },
        get (key) {
          let res;
          try {
            if (!window.sessionStorage) throw false;
            res = window.sessionStorage.getItem(key);
          } catch (err) {
            res = null;
          }

          return res;
        },
        clear (key) {
          let res;
          try {
            if (!window.sessionStorage) throw false;
            window.sessionStorage.removeItem(key);
            res = true;
          } catch (err) {
            res = false;
          }

          return res;
        }
      },
      localStorage: {
        set (key, val) {
          let res;
          try {
            if (!window.localStorage) throw false;
            window.localStorage.setItem(key, val);
            res = true;
          } catch (err) {
            res = false;
          }

          return res;
        },
        get (key) {
          let res;
          try {
            if (!window.localStorage) throw false;
            res = window.localStorage.getItem(key);
          } catch (err) {
            res = null;
          }

          return res;
        },
        clear (key) {
          let res;
          try {
            if (!window.localStorage) throw false;
            window.localStorage.removeItem(key);
            res = true;
          } catch (err) {
            res = false;
          }

          return res;
        }
      },
      cookie: {
        set (key, val, option) {
          let res;
          try {
            let { domain = '', path = '/', expires = 0, secure = false } = option || {};
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
      },
      get (key, storeType) {
        try {
          if (typeof storeType === 'string' && handleStorage[storeType]) {
            return handleStorage[storeType].get(key);
          }
          return this.cookie.get(key) || this.localStorage.get(key) || this.sessionStorage.get(key);
        } catch (e) {
          return null;
        }
      },
      set (key, val, storeType, option) {
        let res;

        try {
          if (typeof storeType === 'string' && handleStorage[storeType]) {
            res = handleStorage[storeType].set(key, val, option);
          } else if (option) {
            res = handleStorage.cookie.set(key, val, option);
          } else {
            res = handleStorage.localStorage.set(key, val);
          }
        } catch (e) {
          res = false;
        }

        return res;
      },
      clear (key, storeType, domain) {
        let res;

        try {
          if (typeof storeType === 'string' && handleStorage[storeType]) {
            res = handleStorage[storeType].clear(key, domain);
          } else if (domain) {
            res = handleStorage.cookie.clear(key, domain);
          } else {
            res = handleStorage.localStorage.clear(key) && handleStorage.sessionStorage.clear(key);
          }
        } catch (e) {
          res = false;
        }

        return res;
      }
    }
    return handleStorage;
})();