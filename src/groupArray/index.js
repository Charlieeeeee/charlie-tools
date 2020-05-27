export const groupArray = (arr,len)=>{
    const array = [];
    arr.forEach((it,ind)=>{
        const index = Math.floor(ind / len)
        if(ind % len === 0){
            array[index] = [];
        }
        array[index].push(it)
    })
    return array;
}