export const getHash = (len) => {
    len = (typeof len === 'number' && len <= 40 && len >= 0) ? len : 40;
    const str = 'qwe0r1t2y3u4i5o6p7a8s9dfghjklzxcvbnm';
    let hash = '';
    for(let i = 0; i < len ; i++){
        const randomNum = Math.floor(Math.random()*36);
        hash = hash + str.charAt(randomNum);
    }
    return hash;
}