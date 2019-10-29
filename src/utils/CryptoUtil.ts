import crypto = require("crypto"); //导入其他库

class CryptoUtil {

    static base64_encode(content: any): string {
        var buf: Buffer = Buffer.from(content);
        var base64: string = buf.toString("base64");
        return base64;
    };

    static base64_decode(content: any): Buffer {
        var buf: Buffer = Buffer.from(content, "base64");
        return buf;
    }

    static md5(data: any): string{
        var md5: crypto.Hash = crypto.createHash("md5");
        md5.update(data);
        return md5.digest('hex'); 
    }

    static sha1(data: any): string {
        var sha1: crypto.Hash = crypto.createHash("sha1");
        sha1.update(data);
        return sha1.digest('hex'); 
    }
}

export default CryptoUtil;