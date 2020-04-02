import os from "os"

class Platform{
	static isWin32(){
		return os.platform() == "win32"
	}

	static isLinux(){
		return os.platform() == "linux"	
	}

	static getLocalIP():string{
		let interfaces:any = os.networkInterfaces();
		for (let devName in interfaces) {
			let iface = interfaces[devName];
			for (let i = 0; i < iface.length; i++) {
				var alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					return alias.address;
				}
			}
		}
		return "";
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


