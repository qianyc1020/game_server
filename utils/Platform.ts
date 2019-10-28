var os = require("os")

class Platform{
	static isWin32(){
		return os.platform() == "win32"
	}

	static isLinux(){
		return os.platform() == "linux"	
	}
}

export default Platform;

//////////
// export default Platform;
// 这么写， import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default

///////////
// export default class Platform{}
//这么写  import Platform from "../utils/Platform" 不带default
// 这么写， var Platform = require("../utils/Platform") 带default


