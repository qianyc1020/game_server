class TcpPkg {
    static read_pkg_size(pkg_data: Buffer, offset: number) {
        if (offset > pkg_data.length - 2) {
            return -1; 
        }
        return pkg_data.readUInt16LE(offset); //小尾
    }

    static package_data(data: Buffer) {
        var buf = Buffer.allocUnsafe(2 + data.length);
        buf.writeInt16LE(2 + data.length, 0);
        buf.fill(data, 2);
        return buf;
    }
}

export default TcpPkg;