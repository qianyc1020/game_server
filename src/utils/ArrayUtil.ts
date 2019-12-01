class ArrayUtil {
    static ArrayRemove(array:any,obj:any):boolean{
        var idx = array.indexOf(obj)
        if (idx > -1){
            array.splice(idx,1)
            return true;
        }
        return false;
    }

    static GetArrayLen(array:any){
        let count = 0;
        for (const key in array) {
            count++;
        }
        return count;
    }
}

export default ArrayUtil;