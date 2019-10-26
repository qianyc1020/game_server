class StringUtil{
    static random_string(len: number): string{
        var $chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
        var maxPos: number = $chars.length;
    　　var str: string = '';
    　　for (let i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    }
    
    static random_int_str(len: number): string {
        var $chars: string = '0123456789'; 
        var maxPos: number = $chars.length;
    　　var str: string = '';
    　　for (let i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    }
    
    // 随机的生成[begin, end] 范围内的数据
    static random_int(begin: number, end: number): number {
        var num: number = begin + Math.random() * (end - begin + 1);
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    }
}

export default StringUtil;