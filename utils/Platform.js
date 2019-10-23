var os = require("os")

function isWin32(){
	return os.platform() == "win32"
}

function isLinux(){
	return os.platform() == "linux"	
}

var Platform = {
	isWin32 : isWin32,
	isLinux: isLinux,
};

module.exports = Platform;
