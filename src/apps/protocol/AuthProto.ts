export let protoName: string = "AuthProto"

export enum Cmd {
	INVALED = 0,
	eLoginReq = 1,
	eLoginRes = 2,
	eEmptyReq = 3,
	eEmptyRes = 4
}

export let CmdName = {
	[0] : "INVALED",
	[1] : "LoginReq",
	[2] : "LoginRes",
	[3] : "EmptyReq",
	[4] : "EmptyRes",
}