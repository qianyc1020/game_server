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

// 字符串 你好, 长度是2，不代表字节数,buf协议，写入我们的字符串的字节数，String扩充一个接口 
    static utf8_byte_len(str: string) {
        var totalLength = 0;
        var i;
        var charCode;
        for (i = 0; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength = totalLength + 1;
            } 
            else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                totalLength += 2;
            } 
            else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                totalLength += 3;
            }
        }
        return totalLength; 
    }
}

export default StringUtil;