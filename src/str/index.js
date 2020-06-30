export const Str = {
    qianfen(numStr){
        return numStr.replace(/(?!^)(?=(\d{3})+$)/g,',')
    },
    pascal(str){
        return str.replace(/[A-Z]/g,(m)=>'_'+m.toLowerCase()).replace('-','_')
    },
    camel(str){
        return str.replace(/_([a-z])/g,(m,$1)=>$1.toUpperCase()).replace(/-([a-z])/g,(m,$1)=>$1.toUpperCase())
    },
    keBab(str){
        return str.replace(/[A-Z]/g,(m)=>'-'+m.toLowerCase()).replace('_','-')
    }
}
