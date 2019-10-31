class ArrayUtil {
    static ArrayRemove(array:any,obj:any):boolean{
        var idx = array.indexOf(obj)
        if (idx > -1){
            array.splice(idx,1)
            return true;
        }
        return false;
    }
}

export default ArrayUtil;