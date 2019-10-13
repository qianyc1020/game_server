var TcpPkg = {
	read_pkg_size: function(pkg_data, offset) {
		if (offset > pkg_data.length - 2) {
			return -1; 
		}
		return pkg_data.readUInt16LE(offset); //小尾
	},

	package_data: function(data) {
		var buf = Buffer.allocUnsafe(2 + data.length);
		buf.writeInt16LE(2 + data.length, 0);
		buf.fill(data, 2);
		return buf;
	},
};

module.exports = TcpPkg;