export { cookie } from './cookie';
export { addListener, removeListener } from './listener';
export { copy } from './copy';
export { timeFormat } from './timeFormat';
export { groupArray } from './groupArray';
export { getHash } from './getHash';
export { toBigger, toSmaller } from './sort';


export const qianfen = (numStr)=>{
    return numStr.replace(/(?!^)(?=(\d{3})+$)/g,',')
}
