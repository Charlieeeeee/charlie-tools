/**
 * @param {string} pattern
 * @param {Date} time
 * @return {string}
 */
export const timeFormat = (pattern,time)=>{
    const opts = {
        "Y+": time.getFullYear(),
        "M+": time.getMonth()+1,
        "D+": time.getDate(),
        "h+": time.getHours(),
        "m+": time.getMinutes(),
        "s+": time.getSeconds()
    }
    for(let key in opts){
        const reg = new RegExp(key,'g');
        pattern = pattern.replace(reg,(m)=>{
            const timeStr = opts[key] < 10 ? `${opts[key]}`.padStart(2,'0') : `${opts[key]}`
            return timeStr.slice(-m.length)
        })
    }
    return pattern;
}