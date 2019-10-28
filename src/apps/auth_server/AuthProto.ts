export let protoName: string = "AuthProto"

export enum Cmd {
	INVALED = 0,
	eLoginReq = 1,
	eLoginRes = 2,
}

export let CmdName = {
	[0] : "INVALED",
	[1] : "LoginReq",
	[2] : "LoginRes",
}