//排序

//确保每个位置都是从它开始往后的里面是最小的(或最大的)，则完成排序
//从开头开始，把每个位置的数字和后面的每一项进行比较，比它小则换个位置。
//从开头开始，把每个位置的数字和后面的每一项进行比较，比它大则换个位置。

/**
 *
 * @param {Array<number>} arr
 * @param {'toBigger' | 'toSmaller'} type
 */
const sort = (type) => {
    return (arr) => {
        const len = arr.length;
        for(let i = 0; i < len; i++){
            for(let j = i + 1; j < len; j++){
                var canSwitch = (type === 'toBigger' && arr[i] > arr[j]) || (type === 'toSmaller' && arr[i] < arr[j]);
                if(canSwitch){
                    const temp;
                    temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }

            }
        }
        return arr
    }

}

export const  toBigger = sort('toBigger');
export const  toSmaller = sort('toSmaller');
