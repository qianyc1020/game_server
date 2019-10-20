var Stype = {
	Broadcast: 0, // 广播服务
	TalkRoom: 1,
	Auth: 2,
	GameSystem: 3, // 系统服务, 个人和系统，不会存在多个玩家进行交互;
};

Stype.name = {
	[0] : "Broadcast",
	[1] : "TalkRoom",
	[2] : "Auth",
	[3] : "GameSystem",
}

module.exports = Stype;
