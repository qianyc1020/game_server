window.__require = function e(t, o, n) {
function r(s, a) {
if (!o[s]) {
if (!t[s]) {
var c = s.split("/");
c = c[c.length - 1];
if (!t[c]) {
var u = "function" == typeof __require && __require;
if (!a && u) return u(c, !0);
if (i) return i(c, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var l = o[s] = {
exports: {}
};
t[s][0].call(l.exports, function(e) {
return r(t[s][1][e] || e);
}, l, l.exports, e, t, o, n);
}
return o[s].exports;
}
for (var i = "function" == typeof __require && __require, s = 0; s < n.length; s++) r(n[s]);
return r;
}({
ArrayUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e2fe9mASqZNNoeAW4HSN2Hm", "ArrayUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.ArrayRemove = function(e, t) {
if (Array.isArray(e)) {
var o = e.indexOf(t);
if (o > -1) {
e.splice(o, 1);
return !0;
}
}
return !1;
};
e.ObjRemove = function(t, o) {
if (e.GetArrayLen(t) > 0 && t[o]) {
delete t[o];
return !0;
}
return !1;
};
e.GetArrayLen = function(e) {
var t = 0;
for (var o in e) t++;
return t;
};
e.ObjCat = function(t, o) {
var n = e.ObjClone(t);
for (var r in o) n[r] = o[r];
return n;
};
e.ObjClone = function(e) {
var t = {};
for (var o in e) t[o] = "object" == typeof e[o] ? this.ObjClone(e[o]) : e[o];
return t;
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
AudioManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b014QcardDTbQLTsx90GLZ", "AudioManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._musicVolume = 1;
this._effectVolume = 1;
this.init();
}
e.getInstance = function() {
e._instance || (e._instance = new e());
return this._instance;
};
e.prototype.init = function() {
var e = cc.sys.localStorage.getItem("musicVolume"), t = cc.sys.localStorage.getItem("effectVolume");
this.musicVolume = null == e ? this.musicVolume : parseFloat(e);
this.effectVolume = null == t ? this.effectVolume : parseFloat(t);
cc.game.on(cc.game.EVENT_HIDE, function() {
this.pauseAll();
}.bind(this));
cc.game.on(cc.game.EVENT_SHOW, function() {
this.resumeAll();
}.bind(this));
};
e.prototype.getAudioUrl = function(e) {
return cc.url.raw("resources/sounds/" + e);
};
e.prototype.playEffect = function(e) {
var t;
cc.AudioClip._loadByUrl(this.getAudioUrl(e), function(e, o) {
o && (t = cc.audioEngine.playEffect(o, !1));
});
return t;
};
e.prototype.playMusic = function(e) {
var t;
cc.AudioClip._loadByUrl(this.getAudioUrl(e), function(e, o) {
o && (t = cc.audioEngine.playMusic(o, !0));
});
return t;
};
e.prototype.pauseAll = function() {
cc.audioEngine.pauseAll();
};
e.prototype.resumeAll = function() {
cc.audioEngine.resumeAll();
};
Object.defineProperty(e.prototype, "musicVolume", {
get: function() {
return this._musicVolume;
},
set: function(e) {
this._musicVolume = e >= 0 || e <= 1 ? e : this._musicVolume;
cc.audioEngine.setMusicVolume(this._musicVolume);
cc.sys.localStorage.setItem("musicVolume", e);
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "effectVolume", {
get: function() {
return this._effectVolume;
},
set: function(e) {
this._effectVolume = e >= 0 || e <= 1 ? e : this.effectVolume;
cc.audioEngine.setEffectsVolume(this.effectVolume);
cc.sys.localStorage.setItem("effectVolume", e);
},
enumerable: !0,
configurable: !0
});
return e;
}();
o.AudioManager = n;
cc._RF.pop();
}, {} ],
AuthProto: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "99b015nJ1hNm5rAmQTfp1c+", "AuthProto");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
o.protoName = "AuthProto";
(function(e) {
e[e.INVALED = 0] = "INVALED";
e[e.eUnameLoginReq = 1] = "eUnameLoginReq";
e[e.eUnameLoginRes = 2] = "eUnameLoginRes";
e[e.eGuestLoginReq = 3] = "eGuestLoginReq";
e[e.eGuestLoginRes = 4] = "eGuestLoginRes";
e[e.eUnameRegistReq = 5] = "eUnameRegistReq";
e[e.eUnameRegistRes = 6] = "eUnameRegistRes";
e[e.ePhoneRegistReq = 7] = "ePhoneRegistReq";
e[e.ePhoneRegistRes = 8] = "ePhoneRegistRes";
e[e.eGetPhoneRegVerNumReq = 9] = "eGetPhoneRegVerNumReq";
e[e.eGetPhoneRegVerNumRes = 10] = "eGetPhoneRegVerNumRes";
e[e.eBindPhoneNumberReq = 11] = "eBindPhoneNumberReq";
e[e.eBindPhoneNumberRes = 12] = "eBindPhoneNumberRes";
e[e.eResetUserPwdReq = 13] = "eResetUserPwdReq";
e[e.eResetUserPwdRes = 14] = "eResetUserPwdRes";
e[e.eLoginOutReq = 15] = "eLoginOutReq";
e[e.eLoginOutRes = 16] = "eLoginOutRes";
e[e.eEditProfileReq = 17] = "eEditProfileReq";
e[e.eEditProfileRes = 18] = "eEditProfileRes";
e[e.eAccountUpgradeReq = 19] = "eAccountUpgradeReq";
e[e.eAccountUpgradeRes = 20] = "eAccountUpgradeRes";
e[e.eGetUserCenterInfoReq = 21] = "eGetUserCenterInfoReq";
e[e.eGetUserCenterInfoRes = 22] = "eGetUserCenterInfoRes";
e[e.eReloginRes = 23] = "eReloginRes";
})(o.Cmd || (o.Cmd = {}));
o.CmdName = ((n = {})[0] = "INVALED", n[1] = "UnameLoginReq", n[2] = "UnameLoginRes", 
n[3] = "GuestLoginReq", n[4] = "GuestLoginRes", n[5] = "UnameRegistReq", n[6] = "UnameRegistRes", 
n[7] = "PhoneRegistReq", n[8] = "PhoneRegistRes", n[9] = "GetPhoneRegVerNumReq", 
n[10] = "GetPhoneRegVerNumRes", n[11] = "BindPhoneNumberReq", n[12] = "BindPhoneNumberRes", 
n[13] = "ResetUserPwdReq", n[14] = "ResetUserPwdRes", n[15] = "LoginOutReq", n[16] = "LoginOutRes", 
n[17] = "EditProfileReq", n[18] = "EditProfileRes", n[19] = "AccountUpgradeReq", 
n[20] = "AccountUpgradeRes", n[21] = "GetUserCenterInfoReq", n[22] = "GetUserCenterInfoRes", 
n[23] = "ReloginRes", n);
cc._RF.pop();
}, {} ],
AutoComponent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9c1d8iH0kBORpc0xHy/Zqrh", "AutoComponent");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, a = (i.property, i.executeInEditMode), c = [], u = function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
o = t;
t.prototype.bindProperty = function(e) {
var t = this, n = o._members[e.name];
n && !this[e.name] && (cc.js.isChildClassOf(n, cc.Node) ? this[e.name] = e : this[e.name] = e.getComponent(n));
e.children.forEach(function(e) {
return t.bindProperty(e);
});
};
t.prototype.bindAssets = function() {
var e = this;
o._assets.forEach(function(t) {
var o = c.find(function(e) {
return e.url.endsWith(t.name + ".prefab");
});
o && cc.loader.load({
type: "uuid",
uuid: o.uuid
}, function(o, n) {
e[t.name] = n;
});
});
};
t.prototype.resetInEditor = function() {
this.bindProperty(this.node);
this.bindAssets();
};
var o;
t._members = {};
t._assets = [];
return t = o = r([ s, a ], t);
}(cc.Component);
o.default = u;
0;
cc._RF.pop();
}, {} ],
BallCenterDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1f227r15lFP6q7Qf78JoI/F", "BallCenterDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../../framework/manager/EventManager"), a = e("../../framework/protocol/GameHoodleProto"), c = e("../../framework/protocol/Response"), u = e("../scene/gameScene/sendMsg/GameSendGameHoodle"), l = e("../../framework/manager/ResourceManager"), f = e("../../framework/utils/ArrayUtil"), d = e("../../framework/manager/DialogManager"), p = e("../../framework/config/GameHoodleConfig"), h = cc._decorator, _ = h.ccclass, g = (h.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._ball_info_str = "";
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_event_dispatcher();
this.add_button_event_listener();
};
t.prototype.start = function() {
this.initUI();
u.default.send_get_player_ball_info();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.CmdName[a.Cmd.eUserBallInfoRes], this, this.on_event_user_ball_info);
s.default.on(a.CmdName[a.Cmd.eUpdateUserBallRes], this, this.on_event_update_user_ball_info);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_BTN_COMPOSE, this.on_click_compose.bind(this));
this.add_click_event(this.view.KW_BTN_UNDO, this.on_click_undo.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.initUI = function() {
this.clear_ball_layout();
};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.on_click_compose = function(e) {
var t = this.get_ball_compose_info();
if (t && t.length > 0) {
var o = t.length, n = t[0], r = this;
d.default.getInstance().show_common_dialog(2, function(e) {
if (e) {
var t = "确定将" + o + "个" + n + "级弹珠合成一个" + (Number(n) + 1) + "级弹珠吗?";
e.set_content_text(t);
e.set_btn_callback(function() {
u.default.send_ball_compose(Number(n));
}, function() {
r.show_user_ball_info(r._ball_info_str);
}, function() {});
}
});
}
};
t.prototype.on_click_undo = function(e) {
this.show_user_ball_info(this._ball_info_str);
};
t.prototype.onKeyDown = function(t) {
e.prototype.onKeyDown.call(this, t);
};
t.prototype.get_ball_compose_info = function() {
var e = this.view.KW_LAYOUT_COMPOSE;
if (e) {
var t = e.children, o = [];
for (var n in t) {
var r = t[n], i = this.seek_child_by_name(r, "KW_TEXT_LEVEL"), s = this.get_string(i).split("级");
if (f.default.GetArrayLen(s) > 0) {
var a = s[0];
o.push(a);
}
}
if (o.length == p.default.BALL_COMPOSE_COUNT) {
for (var c = {}, u = 0; u < o.length; u++) c[o[u]] = u;
if (1 == f.default.GetArrayLen(c)) return o;
d.default.getInstance().show_weak_hint("不能同时合成多种小球，只能放置一种!");
} else d.default.getInstance().show_weak_hint("小球合成需要3个，目前不足!");
}
};
t.prototype.get_ball_level = function(e) {
return e.split("_")[1];
};
t.prototype.on_event_user_ball_info = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == c.default.OK) {
this._ball_info_str = t.userballinfostring;
this.show_user_ball_info(t.userballinfostring);
}
}
};
t.prototype.on_event_update_user_ball_info = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == c.default.OK) {
this._ball_info_str = t.userballinfostring;
this.show_user_ball_info(t.userballinfostring);
d.default.getInstance().show_weak_hint("合成成功!");
} else d.default.getInstance().show_weak_hint("合成失败!");
}
};
t.prototype.clear_ball_layout = function() {
var e = this.view.KW_SCROLLVIEW_NEW;
if (e) {
var t = this.seek_child_by_name(e, "content"), o = this.seek_child_by_name(t, "KW_LAYOUT");
o && o.removeAllChildren();
}
var n = this.view.KW_LAYOUT_COMPOSE;
n && n.removeAllChildren();
this.set_visible(this.view.KW_TEXT_TITLE_UNDO, !1);
};
t.prototype.show_ball_test = function() {
var e = this.view.KW_SCROLLVIEW_NEW, t = this.seek_child_by_name(e, "KW_LAYOUT"), o = 0, n = null;
if (e) {
for (var r = 1; r <= 30; r++) {
var i = l.ResourceManager.getInstance().getRes("ui_prefabs/games/HoodleBallShow", cc.Prefab);
if (i) {
var s = this.add_to_node(t, i).getContentSize();
o++;
n = s;
}
}
var a = this.seek_child_by_name(e, "content"), c = this.seek_child_by_name(a, "KW_LAYOUT");
if (a && c && o > 30) {
var u = n.height * Math.ceil(o / 5) + 200;
a.setContentSize(a.getContentSize().width, u);
}
}
};
t.prototype.show_user_ball_info = function(e) {
this.clear_ball_layout();
var t = null;
try {
t = JSON.parse(e);
} catch (e) {
console.error(e);
return;
}
if (t) {
var o = this.view.KW_SCROLLVIEW_NEW, n = this.seek_child_by_name(o, "KW_LAYOUT"), r = 0, i = null;
if (o) {
cc.log("hcc>>ball_info_obj: ", t);
for (var s in t) {
var a = t[s], c = this.get_ball_level(s);
if (a && 0 != Number(a) && c) {
var u = l.ResourceManager.getInstance().getRes("ui_prefabs/games/HoodleBallShow", cc.Prefab);
if (u) {
var f = this.add_to_node(n, u);
if (f) {
f.info_obj = {
level: c,
count: a
};
this.set_string(this.seek_child_by_name(f, "KW_TEXT_COUNT"), a);
this.set_string(this.seek_child_by_name(f, "KW_TEXT_LEVEL"), String(c) + "级");
this.add_click_evenet_with_data(f, "on_click_ball_select", {
level: c,
count: a
});
}
var d = f.getContentSize();
r++;
i = d;
}
}
}
var p = this.seek_child_by_name(o, "content");
if (p && r > 30) {
var h = i.height * Math.ceil(r / 5) + 200;
p.setContentSize(p.getContentSize().width, h);
}
}
}
};
t.prototype.on_click_ball_select = function(e, t) {
var o = e.target.getComponent(cc.Button);
cc.log("hcc>>on_click_ball_select", o.node.name, t);
if (t) {
var n = Number(t.level), r = Number(t.count), i = this.view.KW_LAYOUT_COMPOSE, s = this.seek_child_by_name(o.node, "KW_TEXT_COUNT"), a = Number(this.get_string(s));
if (n && r && i && a && a > 0 && r > 0 && i.childrenCount < p.default.BALL_COMPOSE_COUNT) {
a -= 1;
this.set_string(this.seek_child_by_name(o.node, "KW_TEXT_COUNT"), String(a));
var c = cc.instantiate(e.target);
i.addChild(c);
c.y = 0;
this.set_string(this.seek_child_by_name(c, "KW_TEXT_COUNT"), "1");
this.add_click_evenet_with_data(c, "on_click_ball_unselect", t);
this.set_visible(this.view.KW_TEXT_TITLE_UNDO, !0);
}
}
};
t.prototype.on_click_ball_unselect = function(e, t) {
var o = e.target.getComponent(cc.Button);
cc.log("hcc>>on_click_ball_unselect", o.node.name, t);
if (t) {
var n = this.view.KW_SCROLLVIEW_NEW, r = this.seek_child_by_name(n, "KW_LAYOUT");
if (r) {
var i = r.children;
for (var s in i) {
var a = i[s], c = a.info_obj;
if (c && c.level == t.level && c.count == t.count) {
var u = this.get_string(this.seek_child_by_name(a, "KW_TEXT_COUNT")), l = Number(u) + 1;
this.set_string(this.seek_child_by_name(a, "KW_TEXT_COUNT"), String(l));
e.target.destroy();
break;
}
}
this.scheduleOnce(function(e) {
var t = this.view.KW_LAYOUT_COMPOSE;
if (t) {
var o = t.childrenCount;
this.set_visible(this.view.KW_TEXT_TITLE_UNDO, o > 0);
}
}, 0);
}
}
};
return t = r([ _ ], t);
}(i.default));
o.default = g;
cc._RF.pop();
}, {
"../../framework/config/GameHoodleConfig": "GameHoodleConfig",
"../../framework/manager/DialogManager": "DialogManager",
"../../framework/manager/EventManager": "EventManager",
"../../framework/manager/ResourceManager": "ResourceManager",
"../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../framework/protocol/Response": "Response",
"../../framework/uibase/UIDialog": "UIDialog",
"../../framework/utils/ArrayUtil": "ArrayUtil",
"../scene/gameScene/sendMsg/GameSendGameHoodle": "GameSendGameHoodle"
} ],
Base64: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4bde6ecE8pG14kZ3WcEDlFe", "Base64");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.encode = function(e) {
return this._utf8encode(e);
};
e.decode = function(e, t) {
void 0 === t && (t = !0);
return this._utf8decode(e, t);
};
e._utf8encode = function(e) {
try {
return window.btoa(e);
} catch (t) {
return window.btoa(unescape(encodeURIComponent(e)));
}
};
e._utf8decode = function(e, t) {
if (t) try {
return decodeURIComponent(escape(window.atob(e)));
} catch (t) {
return window.atob(unescape(e));
}
return window.atob(e);
};
return e;
}();
o.Base64 = n;
cc._RF.pop();
}, {} ],
BaseScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d9f441JZ3dN97sPSoNez+PL", "BaseScene");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../manager/ResourceManager"), r = e("../common/UIFunciton"), i = function() {
function e() {
this._prefab_name = "";
this._script_name = "";
this._canvas = null;
this._scene_ui = null;
this._scene_name = "BaseScene";
this._canvas = cc.find("Canvas");
}
e.prototype.preload = function(e, t) {
var o = this;
n.ResourceManager.getInstance().loadResAsyc(this._prefab_name, cc.Prefab, function(t, n) {
if (e) {
e(t, n);
o._scene_ui = r.default.getInstance().add_to_scene(n, o._script_name);
}
}, function(e, o, n) {
t && t(e, o, n);
});
};
e.prototype.destroy = function(e) {
this._scene_ui && this._scene_ui.destroy();
e && cc.loader.releaseRes(this._prefab_name);
};
e.prototype.get_name = function() {
return this._scene_name;
};
return e;
}();
o.default = i;
cc._RF.pop();
}, {
"../common/UIFunciton": "UIFunciton",
"../manager/ResourceManager": "ResourceManager"
} ],
BezierMaker: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "708e9SYJHFIv53Msf92uae7", "BezierMaker");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e(e) {
this._bezierArr = [];
this._bezierCtrlNodesArr = e || [];
}
e.prototype.bezier = function(e) {
var t = this, o = 0, n = 0, r = this._bezierCtrlNodesArr, i = r.length - 1;
r.forEach(function(r, s) {
if (s) {
o += t.factorial(i) / t.factorial(s) / t.factorial(i - s) * r.x * Math.pow(1 - e, i - s) * Math.pow(e, s);
n += t.factorial(i) / t.factorial(s) / t.factorial(i - s) * r.y * Math.pow(1 - e, i - s) * Math.pow(e, s);
} else {
o += r.x * Math.pow(1 - e, i - s) * Math.pow(e, s);
n += r.y * Math.pow(1 - e, i - s) * Math.pow(e, s);
}
});
return {
x: o,
y: n
};
};
e.prototype.getBezierArr = function(e) {
void 0 === e && (e = 100);
for (var t = [], o = 0; o < 1; o += 1 / e) t.push(this.bezier(o));
return t;
};
e.prototype.factorial = function(e) {
return e <= 1 ? 1 : e * this.factorial(e - 1);
};
Object.defineProperty(e.prototype, "bezierArr", {
get: function() {
this._bezierArr.length || (this._bezierArr = this.getBezierArr());
return this._bezierArr;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(e.prototype, "bezierCtrlNodesArr", {
get: function() {
return this._bezierCtrlNodesArr;
},
set: function(e) {
e.length < 2 && console.error("贝塞尔：至少传入两个点坐标");
this._bezierArr = [];
this._bezierCtrlNodesArr = e;
},
enumerable: !0,
configurable: !0
});
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
CommonDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4f29cb6/J5NNJnAHwgnf/MO", "CommonDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._btnNum = 1;
t._content = "";
t._leftBtnText = "取消";
t._rightBtnText = "确定";
t._leftBtnCallback = null;
t._rightBtnCallback = null;
t._closeBtnCallback = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.initUI();
this.add_button_event_listener();
};
t.prototype.set_content_text = function(e) {
this._content = e;
this.set_string(this.view.KW_UI_LABEL_CONTENT, this._content);
};
t.prototype.set_btn_num = function(e) {
void 0 === e && (e = 1);
this._btnNum = e;
this.initUI();
};
t.prototype.set_btn_text = function(e, t) {
void 0 === e && (e = null);
void 0 === t && (t = null);
this._leftBtnText = e;
this._rightBtnText = t;
};
t.prototype.set_btn_callback = function(e, t, o) {
this._rightBtnCallback = e;
this._leftBtnCallback = t;
this._closeBtnCallback = o;
};
t.prototype.initUI = function() {
if (1 == this._btnNum) {
this.view.KW_UI_BTN_LEFT.active = !1;
this.view.KW_UI_BTN_RIGHT && (this.view.KW_UI_BTN_RIGHT.x = 0);
}
this.set_string(this.view.KW_UI_LABEL_CONTENT, this._content);
this.set_string(this.view.KW_UI_LABEL_LEFTBTN, this._leftBtnText);
this.set_string(this.view.KW_UI_LABEL_RIGHTBTN, this._rightBtnText);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_UI_BTN_LEFT, this.on_click_left.bind(this));
this.add_click_event(this.view.KW_UI_BTN_RIGHT, this.on_click_right.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.on_click_close = function(e) {
this._closeBtnCallback && this._closeBtnCallback();
this.close();
};
t.prototype.on_click_left = function(e) {
this._leftBtnCallback && this._leftBtnCallback();
this.close();
};
t.prototype.on_click_right = function(e) {
this._rightBtnCallback && this._rightBtnCallback();
this.close();
};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../framework/uibase/UIDialog": "UIDialog"
} ],
CommonProto: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "20d9ch1BmVL4pns3yfwYmzv", "CommonProto");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.eUserLostConnectRes = 1e4;
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
DataViewUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "973e1LOxJJAZZ05Ib3oSXhF", "DataViewUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.write_utf8 = function(e, t, o) {
for (var n = t, r = 0; r < o.length; r++) {
var i = o.charCodeAt(r);
if (i < 128) {
e.setUint8(n, i);
n++;
} else if (i < 2048) {
e.setUint8(n, 192 | i >> 6);
n++;
e.setUint8(n, 128 | 63 & i);
n++;
} else if (i < 55296 || i >= 57344) {
e.setUint8(n, 224 | i >> 12);
n++;
e.setUint8(n, 128 | i >> 6 & 63);
n++;
e.setUint8(n, 128 | 63 & i);
n++;
} else {
r++;
i = 65536 + ((1023 & i) << 10 | 1023 & i);
e.setUint8(n, 240 | i >> 18);
n++;
e.setUint8(n, 128 | i >> 12 & 63);
n++;
e.setUint8(n, 128 | i >> 6 & 63);
n++;
e.setUint8(n, 128 | 63 & i);
n++;
}
}
};
e.read_utf8 = function(e, t, o) {
var n, r, i, s, a, c;
n = "";
i = t + o;
r = t;
for (;r < i; ) {
s = e.getUint8(r);
r++;
switch (s >> 4) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
n += String.fromCharCode(s);
break;

case 12:
case 13:
a = e.getUint8(r);
r++;
n += String.fromCharCode((31 & s) << 6 | 63 & a);
break;

case 14:
a = e.getUint8(r);
r++;
c = e.getUint8(r);
r++;
n += String.fromCharCode((15 & s) << 12 | (63 & a) << 6 | (63 & c) << 0);
}
}
return n;
};
e.write_uint8_array = function(e, t, o) {
for (var n = t, r = 0; r < o.length; r++) {
var i = o[r];
e.setUint8(n, i);
n++;
}
};
e.read_uint8_array = function(e, t, o) {
var n, r, i, s;
n = [];
i = t + o;
r = t;
for (;r < i; ) {
s = e.getUint8(r);
r++;
n.push(s);
}
return n;
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
DateUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b226UvNARG8qZrJBPC5hXR", "DateUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getSysDate = function() {
var e = new Date(), t = e.getFullYear(), o = e.getMonth() + 1, n = e.getDate(), r = (e.getDay(), 
e.getHours()), i = e.getMinutes();
e.getSeconds(), e.getMilliseconds();
return t + "-" + o + "-" + n + " " + r + ":" + i;
};
e.prototype.formatDate = function(e, t) {
var o = new Date();
o.setTime(1e3 * t);
var n = {
"M+": o.getMonth() + 1,
"d+": o.getDate(),
"h+": o.getHours(),
"m+": o.getMinutes(),
"s+": o.getSeconds(),
"q+": Math.floor((o.getMonth() + 3) / 3),
S: o.getMilliseconds()
};
/(y+)/.test(e) && (e = e.replace(RegExp.$1, (o.getFullYear() + "").substr(4 - RegExp.$1.length)));
for (var r in n) new RegExp("(" + r + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
return e;
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
DialogManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8f407coI5pCA7CWh4xtxBW4", "DialogManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n, r = e("../utils/Queue"), i = e("../common/UIFunciton");
(function(e) {
e[e.dialog = 10] = "dialog";
e[e.loading = 100] = "loading";
})(n || (n = {}));
var s = function() {
function e() {
this._popMap = {};
this._weakhint = new r.default();
}
e.getInstance = function() {
return e.instance;
};
e.prototype.show_dialog_asyc = function(e, t, o) {
var r = this;
i.default.getInstance().add_prefab_to_scene_async(e, t, function(e) {
o && o(e);
if (e) {
e.zIndex = n.dialog;
r._popMap[t] = e;
}
});
};
e.prototype.show_dialog = function(e, t) {
var o = i.default.getInstance().add_prefab_to_scene(e, t);
if (o) {
this._popMap[t] = o;
o.zIndex = n.dialog;
return o;
}
return null;
};
e.prototype.close_dialog = function(e) {
var t = this._popMap[e];
if (t && cc.isValid(t)) {
t.destroy();
delete this._popMap[e];
}
};
e.prototype.get_dialog = function(e) {
return this._popMap[e] || null;
};
e.prototype.clear_dialog = function() {
for (var e in this._popMap) cc.isValid(this._popMap[e]) && this._popMap[e].destroy();
this._popMap = {};
};
e.prototype.remove_dialog_from_map = function(e) {
var t = null;
for (var o in this._popMap) cc.isValid(this._popMap[o]) && e == this._popMap[o] && (t = this._popMap[o]);
t && delete this._popMap[t];
};
e.prototype.set_zorder = function(e, t) {
var o = this._popMap[e];
o && cc.isValid(o) && (o.zIndex = t);
};
e.prototype.dequeue_weakhint = function() {
this._weakhint.dequeue();
};
e.prototype.show_weak_hint = function(e) {
var t = this;
this.show_dialog_asyc("ui_prefabs/dialog/DialogWeakHint", "WeakHintDialog", function(o) {
var n = o;
if (n && cc.isValid(n)) {
var r = n.getComponent("WeakHintDialog");
r && cc.isValid(r) && r.show && r.show(e);
t._weakhint.forEach(function(e, t) {
var o = t;
if (cc.isValid(o)) {
var n = o.getComponent("WeakHintDialog");
n && cc.isValid(n) && n.move && n.move();
}
});
t._weakhint.enqueue(n);
}
});
};
e.prototype.show_common_dialog = function(e, t) {
e || (e = 1);
this.show_dialog_asyc("ui_prefabs/dialog/DialogCommon", "CommonDialog", function(o) {
if (o && cc.isValid(o)) {
var n = o.getComponent("CommonDialog");
if (n && cc.isValid(n)) {
n.set_btn_num(e);
t && t(n);
}
}
});
};
e.instance = new e();
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../common/UIFunciton": "UIFunciton",
"../utils/Queue": "Queue"
} ],
EnablePhysics: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "36ba3uquGFLYKy1grfu50lT", "EnablePhysics");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._is_debug = !1;
t._gravity = cc.v2(0, 0);
return t;
}
t.prototype.onLoad = function() {
cc.director.getPhysicsManager().enabled = !0;
if (this._is_debug) {
var e = cc.PhysicsManager.DrawBits;
cc.director.getPhysicsManager().debugDrawFlags = e.e_jointBit | e.e_shapeBit;
} else cc.director.getPhysicsManager().debugDrawFlags = 0;
cc.director.getPhysicsManager().gravity = this._gravity;
};
t.prototype.start = function() {};
t.prototype.onDestroy = function() {};
t.prototype.close_phy = function() {
cc.director.getPhysicsManager().enabled = !1;
cc.director.getPhysicsManager().debugDrawFlags = 0;
};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../../../framework/uibase/UIController": "UIController"
} ],
EventDefine: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7f5dfTno/1PbY8/wQEN3SOP", "EventDefine");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.EVENT_NET_CONNECTED = "event_net_connected";
e.EVENT_NET_ERROR = "event_net_error";
e.EVENT_NET_CLOSED = "event_net_closed";
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
EventManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "339c9p41QlDup8OQ18gar2X", "EventManager");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
n(t, e);
function t() {
return e.call(this) || this;
}
t.getInstance = function() {
return t.instance;
};
t.emit = function(e, o) {
t.getInstance()._emit(e, o);
};
t.on = function(e, o, n, r) {
t.getInstance()._on(e, n, o, r);
};
t.prototype._on = function(t, o, n, r) {
e.prototype.on.call(this, t, o, n, r);
};
t.prototype._emit = function(t, o) {
var n = new cc.Event.EventCustom(t, !0);
n.setUserData(o);
e.prototype.dispatchEvent.call(this, n);
};
t.instance = new t();
return t;
}(cc.EventTarget);
o.default = r;
cc._RF.pop();
}, {} ],
GameAppConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ac5a0em0upCxbl5hKCTqUlv", "GameAppConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../manager/ProtoManager"), r = function() {
function e() {}
e.IS_LOCAL_DEBUG = !0;
e.LOCAL_HOST = "192.168.0.105";
e.REMOTE_IP = "www.hccfun.com";
e.REMOTE_WECHAT_PORT = "6081";
e.NATIVE_PLATFORM_PORT = "6061";
e.PROTO_TYPE = n.default.PROTO_BUF;
e.REMORE_HTTP_PORT = "7000";
e.LOCAL_MANIFEST_PATH = "manifest/project";
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../manager/ProtoManager": "ProtoManager"
} ],
GameApp: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2259c0KoNREWIQJIJaOZws/", "GameApp");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../framework/utils/Log"), s = e("../framework/manager/SceneManager"), a = e("./scene/hotfixScene/HotFixScene"), c = e("../framework/manager/EventManager"), u = e("../framework/config/EventDefine"), l = e("../framework/network/NetWork"), f = e("../framework/manager/DialogManager"), d = e("../framework/config/PlatForm"), p = cc._decorator, h = p.ccclass, _ = (p.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.node.addComponent("EnablePhysics");
c.default.on(u.default.EVENT_NET_CONNECTED, this, this.on_net_connected.bind(this));
c.default.on(u.default.EVENT_NET_CLOSED, this, this.on_net_closed.bind(this));
c.default.on(u.default.EVENT_NET_ERROR, this, this.on_net_error.bind(this));
l.default.getInstance().connect();
cc.debug.setDisplayStats(!1);
};
t.prototype.start = function() {
var e = new a.default();
s.default.getInstance().enter_scene_asyc(e);
d.default.printPlatForm();
this.test_func();
};
t.prototype.on_net_connected = function(e) {
i.default.info("GameApp hcc>>>on_net_connected success");
f.default.getInstance().show_weak_hint("网络连接成功!");
};
t.prototype.on_net_closed = function(e) {
i.default.info("GameApp hcc>>>on_net_closed");
setTimeout(function() {
l.default.getInstance().reconnect();
}, 2e3);
f.default.getInstance().show_weak_hint("网络断开,正在连接中。。。");
};
t.prototype.on_net_error = function(e) {
i.default.info("GameApp hcc>>>on_net_error");
f.default.getInstance().show_weak_hint("网络断开!");
};
t.prototype.test_func = function() {};
return t = r([ h ], t);
}(cc.Component));
o.default = _;
cc._RF.pop();
}, {
"../framework/config/EventDefine": "EventDefine",
"../framework/config/PlatForm": "PlatForm",
"../framework/manager/DialogManager": "DialogManager",
"../framework/manager/EventManager": "EventManager",
"../framework/manager/SceneManager": "SceneManager",
"../framework/network/NetWork": "NetWork",
"../framework/utils/Log": "Log",
"./scene/hotfixScene/HotFixScene": "HotFixScene"
} ],
GameHoodleConfig: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "17cd2uMf4FBPYkfO9OOQu3o", "GameHoodleConfig");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.BOX_GAME_RULE = {
playerCount: 2,
playCount: 5
};
e.IS_TEST_BALL = !1;
e.BALL_COMPOSE_COUNT = 3;
e.BALL_UPDATE_TYPE = {
SELL_TYPE: 0,
COMPOSE_TYPE: 1,
GIVE_TYPE: 2
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
GameHoodleCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ad286lEI29B74S6mIyORRQc", "GameHoodleCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_script("GameHoodleTouchEvent");
this.add_script("GameHoodleRecvMsg");
this.add_script("GameHoodleShowUI");
};
t.prototype.start = function() {};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../../../framework/uibase/UIController": "UIController"
} ],
GameHoodleData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "10427iPnBlMb4B/KiJ0W5mN", "GameHoodleData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._player_power = {};
this._player_pos = {};
}
e.getInstance = function() {
return e.instance;
};
e.prototype.set_power = function(e, t) {
this._player_power[e] = t;
};
e.prototype.get_power = function(e) {
return this._player_power[e];
};
e.instance = new e();
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
GameHoodleProto: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5c98bOfH/JD0rknXOaJYRQQ", "GameHoodleProto");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
o.protoName = "GameHoodleProto";
(function(e) {
e[e.INVALED = 0] = "INVALED";
e[e.eCreateRoomReq = 1] = "eCreateRoomReq";
e[e.eCreateRoomRes = 2] = "eCreateRoomRes";
e[e.eJoinRoomReq = 3] = "eJoinRoomReq";
e[e.eJoinRoomRes = 4] = "eJoinRoomRes";
e[e.eExitRoomReq = 5] = "eExitRoomReq";
e[e.eExitRoomRes = 6] = "eExitRoomRes";
e[e.eDessolveReq = 7] = "eDessolveReq";
e[e.eDessolveRes = 8] = "eDessolveRes";
e[e.eGetRoomStatusReq = 9] = "eGetRoomStatusReq";
e[e.eGetRoomStatusRes = 10] = "eGetRoomStatusRes";
e[e.eBackRoomReq = 11] = "eBackRoomReq";
e[e.eBackRoomRes = 12] = "eBackRoomRes";
e[e.eCheckLinkGameReq = 13] = "eCheckLinkGameReq";
e[e.eCheckLinkGameRes = 14] = "eCheckLinkGameRes";
e[e.eUserInfoRes = 15] = "eUserInfoRes";
e[e.eGameRuleRes = 16] = "eGameRuleRes";
e[e.eRoomIdRes = 17] = "eRoomIdRes";
e[e.ePlayCountRes = 18] = "ePlayCountRes";
e[e.eUserReadyReq = 19] = "eUserReadyReq";
e[e.eUserReadyRes = 20] = "eUserReadyRes";
e[e.eGameStartRes = 21] = "eGameStartRes";
e[e.eGameEndRes = 22] = "eGameEndRes";
e[e.eLoginLogicReq = 23] = "eLoginLogicReq";
e[e.eLoginLogicRes = 24] = "eLoginLogicRes";
e[e.eUserOfflineRes = 25] = "eUserOfflineRes";
e[e.ePlayerFirstBallPosRes = 26] = "ePlayerFirstBallPosRes";
e[e.ePlayerPowerRes = 27] = "ePlayerPowerRes";
e[e.ePlayerShootReq = 28] = "ePlayerShootReq";
e[e.ePlayerShootRes = 29] = "ePlayerShootRes";
e[e.ePlayerBallPosReq = 30] = "ePlayerBallPosReq";
e[e.ePlayerBallPosRes = 31] = "ePlayerBallPosRes";
e[e.ePlayerIsShootedReq = 32] = "ePlayerIsShootedReq";
e[e.ePlayerIsShootedRes = 33] = "ePlayerIsShootedRes";
e[e.eGameResultRes = 34] = "eGameResultRes";
e[e.eTotalGameResultRes = 35] = "eTotalGameResultRes";
e[e.ePlayerScoreRes = 36] = "ePlayerScoreRes";
e[e.eUserMatchReq = 37] = "eUserMatchReq";
e[e.eUserMatchRes = 38] = "eUserMatchRes";
e[e.eUserStopMatchReq = 39] = "eUserStopMatchReq";
e[e.eUserStopMatchRes = 40] = "eUserStopMatchRes";
e[e.eUserGameInfoReq = 41] = "eUserGameInfoReq";
e[e.eUserGameInfoRes = 42] = "eUserGameInfoRes";
e[e.eUserBallInfoReq = 43] = "eUserBallInfoReq";
e[e.eUserBallInfoRes = 44] = "eUserBallInfoRes";
e[e.eUpdateUserBallReq = 45] = "eUpdateUserBallReq";
e[e.eUpdateUserBallRes = 46] = "eUpdateUserBallRes";
e[e.eStoreListReq = 47] = "eStoreListReq";
e[e.eStoreListRes = 48] = "eStoreListRes";
e[e.eBuyThingsReq = 49] = "eBuyThingsReq";
e[e.eBuyThingsRes = 50] = "eBuyThingsRes";
})(o.Cmd || (o.Cmd = {}));
o.CmdName = ((n = {})[0] = "INVALED", n[1] = "CreateRoomReq", n[2] = "CreateRoomRes", 
n[3] = "JoinRoomReq", n[4] = "JoinRoomRes", n[5] = "ExitRoomReq", n[6] = "ExitRoomRes", 
n[7] = "DessolveReq", n[8] = "DessolveRes", n[9] = "GetRoomStatusReq", n[10] = "GetRoomStatusRes", 
n[11] = "BackRoomReq", n[12] = "BackRoomRes", n[13] = "CheckLinkGameReq", n[14] = "CheckLinkGameRes", 
n[15] = "UserInfoRes", n[16] = "GameRuleRes", n[17] = "RoomIdRes", n[18] = "PlayCountRes", 
n[19] = "UserReadyReq", n[20] = "UserReadyRes", n[21] = "GameStartRes", n[22] = "GameEndRes", 
n[23] = "LoginLogicReq", n[24] = "LoginLogicRes", n[25] = "UserOfflineRes", n[26] = "PlayerFirstBallPosRes", 
n[27] = "PlayerPowerRes", n[28] = "PlayerShootReq", n[29] = "PlayerShootRes", n[30] = "PlayerBallPosReq", 
n[31] = "PlayerBallPosRes", n[32] = "PlayerIsShootedReq", n[33] = "PlayerIsShootedRes", 
n[34] = "GameResultRes", n[35] = "TotalGameResultRes", n[36] = "PlayerScoreRes", 
n[37] = "UserMatchReq", n[38] = "UserMatchRes", n[39] = "UserStopMatchReq", n[40] = "UserStopMatchRes", 
n[41] = "UserGameInfoReq", n[42] = "UserGameInfoRes", n[43] = "UserBallInfoReq", 
n[44] = "UserBallInfoRes", n[45] = "UpdateUserBallReq", n[46] = "UpdateUserBallRes", 
n[47] = "StoreListReq", n[48] = "StoreListRes", n[49] = "BuyThingsReq", n[50] = "BuyThingsRes", 
n);
cc._RF.pop();
}, {} ],
GameHoodleRecvMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f2fccd+p/RES6az8oNBnzD8", "GameHoodleRecvMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = e("../../../../framework/manager/EventManager"), a = e("../../../../framework/protocol/GameHoodleProto"), c = e("./GameHoodleData"), u = e("../../../../framework/protocol/Response"), l = e("../../../common/RoomData"), f = e("./HoodleBallManager"), d = e("../../../../framework/manager/DialogManager"), p = cc._decorator, h = p.ccclass, _ = (p.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.CmdName[a.Cmd.eGameStartRes], this, this.on_event_game_start);
s.default.on(a.CmdName[a.Cmd.ePlayerFirstBallPosRes], this, this.on_event_first_ball_pos);
s.default.on(a.CmdName[a.Cmd.ePlayerPowerRes], this, this.on_event_player_power);
s.default.on(a.CmdName[a.Cmd.ePlayerShootRes], this, this.on_event_player_shoot);
s.default.on(a.CmdName[a.Cmd.ePlayerBallPosRes], this, this.on_event_ball_pos);
s.default.on(a.CmdName[a.Cmd.ePlayerIsShootedRes], this, this.on_event_player_is_shooted);
s.default.on(a.CmdName[a.Cmd.eGameResultRes], this, this.on_event_game_result);
s.default.on(a.CmdName[a.Cmd.eTotalGameResultRes], this, this.on_event_game_total_result);
};
t.prototype.on_event_game_start = function(e) {
var t = this.get_script("GameHoodleShowUI");
if (t) {
t.set_power_percent_visible(!0);
t.clear_all_ball();
t.show_all_ball();
}
};
t.prototype.on_event_first_ball_pos = function(e) {
var t = e.getUserData();
if (t) {
var o = t.positions;
for (var n in o) {
var r = o[n], i = r.seatid, s = r.posx, a = r.posy;
this.get_script("GameHoodleShowUI").set_ball_pos(i, Number(s), Number(a));
}
}
};
t.prototype.on_event_player_power = function(e) {
var t = e.getUserData();
if (t) {
var o = t.powers;
for (var n in o) {
var r = o[n], i = r.seatid, s = r.power;
c.default.getInstance().set_power(i, s);
var a = f.default.getInstance().get_ball(i);
if (a) {
var u = a.getComponent("HoodleBallCtrl");
u && u.set_shoot_power_ui(s);
}
}
}
};
t.prototype.on_event_player_shoot = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == u.default.OK) {
var o = t.seatid, n = Number(t.posx), r = Number(t.posy), i = Number(t.shootpower), s = this.view.KW_GAME_TABLE;
if (!s) return;
var a = s.convertToWorldSpaceAR(cc.v2(n, r)), c = this.get_script("GameHoodleShowUI");
c && c.show_player_shoot(o, a.x, a.y, i);
}
}
};
t.prototype.on_event_ball_pos = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == u.default.OK) {
var o = t.positions;
for (var n in o) {
var r = o[n], i = r.seatid, s = Number(r.posx), a = Number(r.posy);
this.get_script("GameHoodleShowUI").set_ball_pos(i, s, a);
}
}
}
};
t.prototype.on_event_player_is_shooted = function(e) {
console.log("hcc>>on_event_player_is_shooted", e.getUserData());
var t = e.getUserData();
if (t) {
if (t.status == u.default.OK) {
t.srcseatid;
var o = t.desseatid;
this.get_script("GameHoodleShowUI").show_ball_shooted_animation(o);
}
}
};
t.prototype.on_event_game_result = function(e) {
var t = this.get_script("GameHoodleShowUI");
t && t.set_power_percent_visible(!1);
};
t.prototype.on_event_game_total_result = function(e) {
console.log("hcc>>on_event_game_total_result", e.getUserData());
var t = e.getUserData(), o = "";
if (t) for (var n = t.scores, r = t.golds, i = 0; i < n.length; i++) {
var s = n[i], a = r[i], c = s.seatid, u = Number(s.score), f = Number(a.gold), p = l.default.getInstance().get_player(c);
if (p) {
var h = p.get_uname();
o = o + h + ": 分数 " + (u > 0 ? "+" + u : u) + "   金币:" + (f > 0 ? "+" + f : f) + "\n";
}
}
var _ = this;
d.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogGameResult", "GameResultDialog", function(e) {
if (e) {
var t = e.getComponent("GameResultDialog");
if (t) {
t.set_title_text("结束");
t.set_reward_text("");
t.set_score_text(o);
}
e.active = !1;
_.scheduleOnce(function() {
e.active = !0;
}, 2.5);
}
});
};
return t = r([ h ], t);
}(i.default));
o.default = _;
cc._RF.pop();
}, {
"../../../../framework/manager/DialogManager": "DialogManager",
"../../../../framework/manager/EventManager": "EventManager",
"../../../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../../../framework/protocol/Response": "Response",
"../../../../framework/uibase/UIController": "UIController",
"../../../common/RoomData": "RoomData",
"./GameHoodleData": "GameHoodleData",
"./HoodleBallManager": "HoodleBallManager"
} ],
GameHoodleShowUI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3db9dWD31ZOLJKEu0XKoTFL", "GameHoodleShowUI");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = e("../../../../framework/common/UIFunciton"), a = e("../../../common/RoomData"), c = e("./HoodleBallManager"), u = e("../../../../framework/config/GameHoodleConfig"), l = cc._decorator, f = l.ccclass, d = (l.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._hoodleManager = c.default.getInstance();
t._percent_control = 1;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
u.default.IS_TEST_BALL && this.test_boarn_ball();
this.set_power_percent_visible(!1);
};
t.prototype.start = function() {};
t.prototype.show_all_ball = function() {
var e = a.default.getInstance().get_all_player();
for (var t in e) {
var o = e[t];
this.boarn_ball(o);
}
};
t.prototype.clear_all_ball = function() {
var e = a.default.getInstance().get_all_player();
for (var t in e) {
var o = e[t];
o && this._hoodleManager.delete_ball(o.get_seatid());
}
};
t.prototype.boarn_ball = function(e) {
var t = s.default.getInstance().add_prefab_to_node(this.view.KW_GAME_TABLE, "ui_prefabs/games/HoodleBall", "HoodleBallCtrl");
if (t) {
var o = t.getComponent("HoodleBallCtrl");
if (o) {
o.set_ball_id(e.get_uinfo().seatid);
o.set_name(e.get_uname());
o.set_img_face(e.get_uinfo().uface);
this._hoodleManager.set_ball(e.get_uinfo().seatid, t);
t.active = !1;
return !0;
}
}
return !1;
};
t.prototype.set_ball_pos = function(e, t, o) {
var n = this._hoodleManager.get_ball(e);
if (!n || !cc.isValid(n)) return !1;
n.setPosition(t, o);
n.active = !0;
return !0;
};
t.prototype.show_player_shoot = function(e, t, o, n) {
var r = this._hoodleManager.get_ball(e);
if (!r || !cc.isValid(r)) return !1;
var i = r.getComponent("HoodleBallCtrl");
if (i) {
i.shoot_at(cc.v2(t, o), n);
i.set_src_shoot_seatid(e);
}
return !0;
};
t.prototype.show_ball_shooted_animation = function(e) {
var t = this._hoodleManager.get_ball(e);
if (t && cc.isValid(t)) {
var o = cc.delayTime(.5), n = cc.blink(1, 3), r = cc.delayTime(.3), i = cc.callFunc(function() {
t.active = !1;
});
t.runAction(cc.sequence(o, n, r, i));
}
};
t.prototype.set_power_percent = function(e) {
var t = this.view.KW_POWER_PROGRESS;
if (t && cc.isValid(t)) {
var o = t.getComponent(cc.ProgressBar);
o && (o.progress = e);
}
var n = this.seek_child_by_name(this.view.KW_POWER_PROGRESS, "KW_TEXT_PERCENT"), r = Math.floor(100 * e);
this.set_string(n, "力量:" + String(r));
};
t.prototype.set_power_percent_visible = function(e) {
this.set_visible(this.view.KW_POWER_PROGRESS, e);
if (!e) {
var t = this.view.KW_POWER_PROGRESS;
if (t && cc.isValid(t)) {
var o = t.getComponent(cc.ProgressBar);
o && (o.progress = 0);
}
var n = this.seek_child_by_name(this.view.KW_POWER_PROGRESS, "KW_TEXT_PERCENT");
this.set_string(n, "力量:0");
}
};
t.prototype.get_power_percent_visible = function() {
return this.get_visible(this.view.KW_POWER_PROGRESS);
};
t.prototype.get_pwer_percent = function() {
var e = this.view.KW_POWER_PROGRESS;
if (e && cc.isValid(e)) {
var t = e.getComponent(cc.ProgressBar);
if (t) return t.progress;
}
return 0;
};
t.prototype.update = function(e) {
if (this.get_power_percent_visible()) {
var t = this.get_pwer_percent();
t >= 1 ? this._percent_control = -1 * this._percent_control : t <= 0 && (this._percent_control = -1 * this._percent_control);
(t += .02 * this._percent_control) >= 1 ? t = 1 : t <= 0 && (t = 0);
this.set_power_percent(t);
}
};
t.prototype.test_boarn_ball = function() {
var e = s.default.getInstance().add_prefab_to_node(this.view.KW_GAME_TABLE, "ui_prefabs/games/HoodleBall", "HoodleBallCtrl");
if (e) {
var t = cc.v2(-500, -900);
e.setPosition(t);
this._hoodleManager.set_ball(1, e);
(n = e.getComponent("HoodleBallCtrl")).set_ball_id(1);
n.set_name("ball1");
}
var o = s.default.getInstance().add_prefab_to_node(this.view.KW_GAME_TABLE, "ui_prefabs/games/HoodleBall", "HoodleBallCtrl");
if (o) {
var n;
t = cc.v2(0, 300);
o.setPosition(t);
this._hoodleManager.set_ball(2, o);
(n = o.getComponent("HoodleBallCtrl")).set_ball_id(2);
n.set_name("ball2");
}
};
return t = r([ f ], t);
}(i.default));
o.default = d;
cc._RF.pop();
}, {
"../../../../framework/common/UIFunciton": "UIFunciton",
"../../../../framework/config/GameHoodleConfig": "GameHoodleConfig",
"../../../../framework/uibase/UIController": "UIController",
"../../../common/RoomData": "RoomData",
"./HoodleBallManager": "HoodleBallManager"
} ],
GameHoodleTouchEvent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "63dd0gjjU5FdKuovinNCQNa", "GameHoodleTouchEvent");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = e("../../../common/RoomData"), a = e("./GameHoodleData"), c = e("../sendMsg/GameSendGameHoodle"), u = e("../../../common/State"), l = e("../../../../framework/manager/DialogManager"), f = e("./HoodleBallManager"), d = e("../../../../framework/config/GameHoodleConfig"), p = cc._decorator, h = p.ccclass, _ = (p.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._graphic_line = null;
t._cur_length = 0;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.view.GRAPHICS && (this._graphic_line = this.view.GRAPHICS.getComponent(cc.Graphics));
};
t.prototype.start = function() {
if (this._graphic_line) {
this._graphic_line.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
this._graphic_line.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
this._graphic_line.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this._graphic_line.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
}
};
t.prototype.can_shoot = function() {
if (d.default.IS_TEST_BALL) return !0;
if (a.default.getInstance().get_power(s.default.getInstance().get_self_seatid()) != u.PlayerPower.canPlay) return !1;
var e = f.default.getInstance().get_all_ball();
for (var t in e) {
var o = e[t];
if (!o || !cc.isValid(o)) return !1;
var n = o.getComponent("HoodleBallCtrl");
if (n) {
if (n.get_ball_state() != u.BallState.stop) return !1;
}
}
return !0;
};
t.prototype.onTouchStart = function(e) {
if (this._graphic_line) {
this._graphic_line.clear();
var t = this.get_self_ball_pos();
if (t && this.can_shoot()) {
var o = e.getLocation();
this.drawRayCast(t, o.subSelf(t).normalizeSelf());
this._graphic_line.stroke();
}
}
};
t.prototype.onTouchMove = function(e) {
if (this._graphic_line) {
this._graphic_line.clear();
this._cur_length = 0;
var t = this.get_self_ball_pos();
if (t && this.can_shoot()) {
var o = e.getLocation();
this.drawRayCast(t, o.subSelf(t).normalizeSelf());
this._graphic_line.stroke();
}
}
};
t.prototype.onTouchEnd = function(e) {
if (this._graphic_line) {
this._graphic_line.clear();
if (this.can_shoot()) {
var t = e.getLocation(), o = this.view.KW_GAME_TABLE;
if (o) {
var n = o.convertToNodeSpaceAR(t), r = this.get_self_ball();
if (r) {
var i = r.getComponent("HoodleBallCtrl");
if (i) {
var a = this.get_shoot_pwer();
i.shoot_at(t, a);
i.set_src_shoot_seatid(s.default.getInstance().get_self_seatid());
c.default.send_player_shoot(s.default.getInstance().get_self_seatid(), n.x, n.y, a);
}
}
}
} else l.default.getInstance().show_weak_hint("还未轮到你操作!");
}
};
t.prototype.drawRayCast = function(e, t) {
var o = 1440 - this._cur_length;
if (!(o <= 0)) {
var n = e.add(t.mul(o)), r = cc.director.getPhysicsManager().rayCast(e, n, cc.RayCastType.Closest);
if (r.length > 0) {
var i = r[0], s = i.point;
this.drawAimLine(e, s);
var a = s.sub(e).mag();
this._cur_length += a;
var c = i.normal, u = t, l = u.sub(c.mul(2 * u.dot(c)));
this.drawRayCast(s, l);
} else this.drawAimLine(e, n);
}
};
t.prototype.drawAimLine = function(e, t) {
var o = e.clone();
this._graphic_line && this._graphic_line.moveTo(o.x, o.y);
var n = t.sub(e), r = Math.round(n.mag() / 15);
n.normalizeSelf().mulSelf(15);
for (var i = 0; i < r; i++) {
o.addSelf(n);
this._graphic_line && this._graphic_line.circle(o.x, o.y, 2);
}
};
t.prototype.get_self_ball = function() {
return f.default.getInstance().get_self_ball();
};
t.prototype.get_self_ball_pos = function() {
var e = this.get_self_ball();
return e && cc.isValid(e) ? e.convertToWorldSpaceAR(cc.v2(0, 0)) : null;
};
t.prototype.get_shoot_pwer = function() {
var e = this.view.KW_POWER_PROGRESS;
if (e && cc.isValid(e)) {
var t = e.getComponent(cc.ProgressBar);
if (t) return Math.floor(100 * t.progress);
}
return 0;
};
return t = r([ h ], t);
}(i.default));
o.default = _;
cc._RF.pop();
}, {
"../../../../framework/config/GameHoodleConfig": "GameHoodleConfig",
"../../../../framework/manager/DialogManager": "DialogManager",
"../../../../framework/uibase/UIController": "UIController",
"../../../common/RoomData": "RoomData",
"../../../common/State": "State",
"../sendMsg/GameSendGameHoodle": "GameSendGameHoodle",
"./GameHoodleData": "GameHoodleData",
"./HoodleBallManager": "HoodleBallManager"
} ],
GameResultDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "26f4c3gjrZPh7OcYZMvTd/q", "GameResultDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_button_event_listener();
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_PANEL_MASK, this.on_click_continue.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.set_title_text = function(e) {
this.set_string(this.view.KW_TEXT_TITLE, e);
};
t.prototype.set_score_text = function(e) {
this.set_string(this.view.KW_UI_LABEL_SCORE, e);
};
t.prototype.set_reward_text = function(e) {
this.set_string(this.view.KW_UI_LABEL_REWARD, e);
};
t.prototype.set_reward_img = function(e) {
this.set_sprite(this.view.KW_UI_IMG_REWARD, e);
};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.on_click_continue = function(e) {
this.close();
};
t.prototype.onKeyDown = function(t) {
e.prototype.onKeyDown.call(this, t);
};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../framework/uibase/UIDialog": "UIDialog"
} ],
GameSceneCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0852cDHCRJO4JOVX4GgK/rP", "GameSceneCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_script("GameSceneShowUI");
this.add_script("GameSceneTouchEvent");
this.add_script("GameSceneRecvGameMsg");
this.add_script("GameSceneRecvAuthMsg");
this.add_script("GameSceneInit");
};
t.prototype.start = function() {};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../../framework/uibase/UIController": "UIController"
} ],
GameSceneInit: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a1e85wHEr1OMasMUoz5QeQg", "GameSceneInit");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("./sendMsg/GameSendGameHoodle"), a = cc._decorator, c = a.ccclass, u = (a.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
s.default.send_check_link_game();
};
return t = r([ c ], t);
}(i.default));
o.default = u;
cc._RF.pop();
}, {
"../../../framework/uibase/UIController": "UIController",
"./sendMsg/GameSendGameHoodle": "GameSendGameHoodle"
} ],
GameSceneRecvAuthMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2f977l7n51AnLBCHvhS2k1A", "GameSceneRecvAuthMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/EventManager"), a = e("../../../framework/protocol/AuthProto"), c = e("../../../framework/protocol/Response"), u = e("../../../framework/manager/SceneManager"), l = e("../LoginScene/LoginScene"), f = e("../../../framework/utils/Storage"), d = e("../../../framework/config/LSDefine"), p = e("../../../framework/manager/DialogManager"), h = e("../../../framework/config/EventDefine"), _ = e("../LoginScene/sendMsg/LoginSendAuthMsg"), g = e("../lobbyScene/sendMsg/LobbySendGameHoodle"), y = cc._decorator, m = y.ccclass, v = (y.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(h.default.EVENT_NET_CONNECTED, this, this.on_net_connected);
s.default.on(a.CmdName[a.Cmd.eUnameLoginRes], this, this.on_event_uname_login);
s.default.on(a.CmdName[a.Cmd.eGuestLoginRes], this, this.on_event_guest_login);
s.default.on(a.CmdName[a.Cmd.eReloginRes], this, this.on_event_relogin);
};
t.prototype.on_net_connected = function(e) {
var t = f.default.get(d.default.USER_LOGIN_TYPE);
if (t == d.default.LOGIN_TYPE_UNAME) {
var o = f.default.get(d.default.USER_LOGIN_MSG);
o && _.default.send_uname_login(o.uname, o.upwd);
} else if (t == d.default.LOGIN_TYPE_GUEST) {
var n = f.default.get(d.default.USER_LOGIN_GUEST_KEY);
n && _.default.send_guest_login(n);
}
};
t.prototype.on_event_guest_login = function(e) {
var t = e.getUserData();
cc.log("guestlogin udata: ", t);
if (t.status == c.default.OK) {
try {
var o = JSON.parse(t.userlogininfo);
f.default.set(d.default.USER_LOGIN_TYPE, d.default.LOGIN_TYPE_GUEST);
f.default.set(d.default.USER_LOGIN_GUEST_KEY, o.guest_key);
} catch (e) {
cc.error(e);
}
cc.log("on_event_guest_login: key: ", f.default.get(d.default.USER_LOGIN_GUEST_KEY));
g.default.send_login_logic();
p.default.getInstance().show_weak_hint("游客登录成功!");
} else p.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_uname_login = function(e) {
var t = e.getUserData();
cc.log("unamelogin udata: ", t);
if (t.status == c.default.OK) {
try {
var o = JSON.parse(t.userlogininfo);
f.default.set(d.default.USER_LOGIN_TYPE, d.default.LOGIN_TYPE_UNAME);
f.default.set(d.default.USER_LOGIN_MSG, {
uname: o.uname,
upwd: o.upwd
});
} catch (e) {
cc.error(e);
}
cc.log("on_event_uname_login: ", f.default.get(d.default.USER_LOGIN_MSG));
g.default.send_login_logic();
p.default.getInstance().show_weak_hint("登录成功!");
} else p.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_relogin = function(e) {
cc.log("on_event_relogin...");
u.default.getInstance().enter_scene_asyc(new l.default());
p.default.getInstance().show_weak_hint("您已经被挤号,自动退出!");
};
return t = r([ m ], t);
}(i.default));
o.default = v;
cc._RF.pop();
}, {
"../../../framework/config/EventDefine": "EventDefine",
"../../../framework/config/LSDefine": "LSDefine",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/EventManager": "EventManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/protocol/AuthProto": "AuthProto",
"../../../framework/protocol/Response": "Response",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/Storage": "Storage",
"../LoginScene/LoginScene": "LoginScene",
"../LoginScene/sendMsg/LoginSendAuthMsg": "LoginSendAuthMsg",
"../lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
GameSceneRecvGameMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "390caR0fgRCJbLb6kXq62I7", "GameSceneRecvGameMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/EventManager"), a = e("../../../framework/protocol/GameHoodleProto"), c = e("../../../framework/protocol/Response"), u = e("../../../framework/manager/SceneManager"), l = e("../../../framework/manager/DialogManager"), f = e("../lobbyScene/LobbyScene"), d = e("../../common/RoomData"), p = e("../../common/State"), h = cc._decorator, _ = h.ccclass, g = (h.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.CmdName[a.Cmd.eLoginLogicRes], this, this.on_event_login_logic);
s.default.on(a.CmdName[a.Cmd.eDessolveRes], this, this.on_event_dessolve);
s.default.on(a.CmdName[a.Cmd.eJoinRoomRes], this, this.on_event_exit_room);
s.default.on(a.CmdName[a.Cmd.eCheckLinkGameRes], this, this.on_event_check_link);
s.default.on(a.CmdName[a.Cmd.eUserInfoRes], this, this.on_event_user_info);
s.default.on(a.CmdName[a.Cmd.eGameRuleRes], this, this.on_event_game_rule);
s.default.on(a.CmdName[a.Cmd.eRoomIdRes], this, this.on_event_room_id);
s.default.on(a.CmdName[a.Cmd.ePlayCountRes], this, this.on_event_play_count);
s.default.on(a.CmdName[a.Cmd.eUserReadyRes], this, this.on_event_user_ready);
s.default.on(a.CmdName[a.Cmd.eGameStartRes], this, this.on_event_game_start);
s.default.on(a.CmdName[a.Cmd.eGameEndRes], this, this.on_event_game_end);
s.default.on(a.CmdName[a.Cmd.eUserOfflineRes], this, this.on_event_user_offline);
s.default.on(a.CmdName[a.Cmd.ePlayerScoreRes], this, this.on_event_play_score);
s.default.on(a.CmdName[a.Cmd.eGameResultRes], this, this.on_event_game_result);
s.default.on(a.CmdName[a.Cmd.eTotalGameResultRes], this, this.on_event_game_total_result);
};
t.prototype.on_event_login_logic = function(e) {
var t = e.getUserData();
cc.log("hcc>>on_event_login_logic>>udata: ", t);
};
t.prototype.on_event_dessolve = function(e) {
var t = e.getUserData();
if (t) if (t.status == c.default.OK) {
l.default.getInstance().show_weak_hint("房间已解散!");
u.default.getInstance().enter_scene_asyc(new f.default());
d.default.getInstance().clear_room_data();
} else l.default.getInstance().show_weak_hint("解散房间失败!");
};
t.prototype.on_event_exit_room = function(e) {
var t = e.getUserData();
if (t) {
t.status == c.default.OK ? l.default.getInstance().show_weak_hint("退出房间成功!") : l.default.getInstance().show_weak_hint("退出房间失败!");
}
};
t.prototype.on_event_check_link = function(e) {
var t = e.getUserData();
if (t) {
t.status == c.default.OK ? l.default.getInstance().show_weak_hint("进入游戏成功!") : l.default.getInstance().show_weak_hint("进入游戏失败!");
}
};
t.prototype.on_event_user_info = function(e) {
var t = e.getUserData();
if (t) {
cc.log("hcc>>userinfostr: ", t);
try {
t.userinfo && t.userinfo.forEach(function(e) {
var t = e.numberid, o = e.userinfostring, n = JSON.parse(o);
d.default.getInstance().add_player_by_uinfo(n);
cc.log("hcc>>userinfo numid: ", t, " ,info: ", o);
});
var o = this.get_script("GameSceneShowUI");
o && o.show_user_info(t);
} catch (e) {
cc.log("hcc>>error: ", e);
}
}
};
t.prototype.on_event_game_rule = function(e) {
var t = e.getUserData();
if (t) {
var o = t.gamerule;
o && this.set_string(this.view.KW_TEXT_RULE, String(o));
}
};
t.prototype.on_event_room_id = function(e) {
var t = e.getUserData();
if (t) {
var o = t.roomid;
o && this.set_string(this.view.KW_TEXT_ROOM_NUM, "房间号:" + String(o));
}
};
t.prototype.on_event_play_count = function(e) {
var t = e.getUserData();
if (t) {
var o = t.playcount, n = t.totalplaycount;
d.default.getInstance().set_play_count(Number(o));
d.default.getInstance().set_totl_play_count(Number(n));
o && n && this.set_string(this.view.KW_TEXT_PLAY_COUNT, "局数:" + String(o) + "/" + String(n));
}
};
t.prototype.on_event_play_score = function(e) {
var t = e.getUserData();
if (t) {
var o = t.scores, n = "";
for (var r in o) {
var i = o[r], s = i.score, a = d.default.getInstance().get_player(i.seatid);
if (a) {
n += a.get_uname() + ": " + s + "\n";
}
}
console.log("hcc>>score_str: ", n);
this.set_string(this.view.KW_TEXT_PLAY_SCORE, n);
}
};
t.prototype.on_event_user_offline = function(e) {
var t = e.getUserData();
cc.log("on_event_user_offline", t);
var o = t.seatid;
if (o) {
var n = d.default.getInstance().get_player(o);
n && n.set_offline(!0);
}
};
t.prototype.on_event_user_ready = function(e) {
var t = e.getUserData();
cc.log("on_event_user_ready", t);
if (t) {
var o = t.status, n = t.seatid;
t.userstate;
if (o == c.default.OK) {
var r = d.default.getInstance().get_player(n);
if (r) {
r.set_user_state(p.UserState.Ready);
var i = this.get_script("GameSceneShowUI");
i && i.show_user_ready(n, !0);
}
}
}
};
t.prototype.on_event_game_start = function(e) {
var t = e.getUserData();
cc.log("on_event_game_start", t);
l.default.getInstance().show_weak_hint("游戏开始!");
var o = this.get_script("GameSceneShowUI");
o && o.clear_table();
};
t.prototype.on_event_game_end = function(e) {
var t = e.getUserData();
cc.log("on_event_game_end", t);
};
t.prototype.on_event_game_result = function(e) {
this.set_visible(this.view.KW_BTN_READY, !1);
this.scheduleOnce(function() {
this.set_visible(this.view.KW_BTN_READY, !0);
}, 2);
};
t.prototype.on_event_game_total_result = function(e) {
this.scheduleOnce(function() {
this.set_visible(this.view.KW_BTN_READY, !1);
this.set_visible(this.view.KW_BTN_BACK_LOBBY, !0);
}, 2);
};
return t = r([ _ ], t);
}(i.default));
o.default = g;
cc._RF.pop();
}, {
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/EventManager": "EventManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../../framework/protocol/Response": "Response",
"../../../framework/uibase/UIController": "UIController",
"../../common/RoomData": "RoomData",
"../../common/State": "State",
"../lobbyScene/LobbyScene": "LobbyScene"
} ],
GameSceneShowUI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "016dcY5wNBJ+6emT1NwbLLl", "GameSceneShowUI");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../common/State"), a = e("../../common/RoomData"), c = e("../../../framework/common/UIFunciton"), u = e("../../../framework/manager/ResourceManager"), l = cc._decorator, f = l.ccclass, d = (l.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._gamehoodle = null;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.initUI();
};
t.prototype.start = function() {};
t.prototype.initUI = function() {
this.show_all_player_ready_visible(!1);
this.show_gamehoodle(!0);
};
t.prototype.show_user_info = function(e) {
var t = this;
if (e.userinfo) {
this.view.KW_LAYOUT_USER && this.view.KW_LAYOUT_USER.removeAllChildren();
e.userinfo.forEach(function(e) {
e.numberid;
var o = e.userinfostring, n = JSON.parse(o), r = n.seatid;
if (r) {
var i = u.ResourceManager.getInstance().getRes("ui_prefabs/games/PrefabUserInfo", cc.Prefab);
if (i && t.view.KW_LAYOUT_USER) {
var s = t.add_to_node(t.view.KW_LAYOUT_USER, i);
if (s) {
s.name = "KW_PANEL_USER_INFO_" + r;
t.show_one_user_info(s, n);
}
}
}
});
}
};
t.prototype.show_one_user_info = function(e, t) {
if (cc.isValid(e)) {
this.set_visible(e, !0);
this.set_string(e.getChildByName("KW_TEXT_NAME"), t.uname);
this.set_string(e.getChildByName("KW_TEXT_GOLD"), t.uchip);
var o = "lobby/rectheader/1" + t.uface;
this.set_sprite_asyc(e.getChildByName("KW_IMG_HEAD"), o);
console.log("hcc>>GameSceneShowUI>>show_one_user_info");
this.set_visible(e.getChildByName("KW_IMG_OFFINLE"), t.isoffline);
this.set_visible(e.getChildByName("KW_IMG_MASTER"), 1 == t.ishost);
this.set_visible(e.getChildByName("KW_IMG_READY"), t.userstate == s.UserState.Ready);
this.set_visible(e.getChildByName("KW_TEXT_GOLD"), !0);
if (Number(t.seatid) == Number(a.default.getInstance().get_self_seatid())) {
var n = Number(t.userstate);
n == s.UserState.Ready || n == s.UserState.Playing ? this.set_visible(this.view.KW_BTN_READY, !1) : this.set_visible(this.view.KW_BTN_READY, !0);
}
t.userstate == s.UserState.Playing && this.set_visible(e, !1);
}
};
t.prototype.show_all_player_ready_visible = function(e) {
if (this.view.KW_LAYOUT_USER) for (var t = 1; t <= 4; t++) this.show_user_ready(t, !1);
};
t.prototype.show_user_ready = function(e, t) {
var o = this.view.KW_LAYOUT_USER;
if (o) {
var n = "KW_PANEL_USER_INFO_" + e, r = o.getChildByName(n);
r && this.set_visible(r.getChildByName("KW_IMG_READY"), t);
}
e == a.default.getInstance().get_self_seatid() && this.set_visible(this.view.KW_BTN_READY, !1);
};
t.prototype.show_gamehoodle = function(e) {
if (this._gamehoodle) this._gamehoodle.active = e; else {
this._gamehoodle = c.default.getInstance().add_prefab_to_node(this.view.KW_GAME_NODE, "ui_prefabs/games/GameHoodle", "GameHoodleCtrl");
this._gamehoodle && (this._gamehoodle.active = e);
}
};
t.prototype.clear_table = function() {
this.show_all_player_ready_visible(!1);
this.set_visible(this.view.KW_BTN_READY, !1);
this.view.KW_LAYOUT_USER && this.view.KW_LAYOUT_USER.removeAllChildren();
};
return t = r([ f ], t);
}(i.default));
o.default = d;
cc._RF.pop();
}, {
"../../../framework/common/UIFunciton": "UIFunciton",
"../../../framework/manager/ResourceManager": "ResourceManager",
"../../../framework/uibase/UIController": "UIController",
"../../common/RoomData": "RoomData",
"../../common/State": "State"
} ],
GameSceneTouchEvent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2a951/3cYNAQ4Lf28pWSuGK", "GameSceneTouchEvent");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/DialogManager"), a = e("./sendMsg/GameSendGameHoodle"), c = e("../../../framework/manager/SceneManager"), u = e("../lobbyScene/LobbyScene"), l = cc._decorator, f = l.ccclass, d = (l.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_button_event_listener();
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.BTN_SETTING, this.on_click_setting);
this.add_click_event(this.view.BTN_SETTING_2, this.on_click_setting2);
this.add_click_event(this.view.KW_BTN_READY, this.on_click_ready);
this.add_click_event(this.view.KW_BTN_BACK_LOBBY, this.on_click_back_lobby);
};
t.prototype.on_click_setting = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogSetting", "SettingDialog");
};
t.prototype.on_click_setting2 = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogGameResult", "GameResultDialog", function(e) {
if (e) {
var t = e.getComponent("GameResultDialog");
if (t) {
t.set_title_text("恭喜恭喜");
t.set_reward_text("获得猪一头！");
t.set_score_text("text1111:+1\ntest2222:-1");
}
}
});
};
t.prototype.on_click_ready = function(e) {
a.default.send_user_ready();
};
t.prototype.on_click_back_lobby = function(e) {
c.default.getInstance().enter_scene_asyc(new u.default());
};
return t = r([ f ], t);
}(i.default));
o.default = d;
cc._RF.pop();
}, {
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/uibase/UIController": "UIController",
"../lobbyScene/LobbyScene": "LobbyScene",
"./sendMsg/GameSendGameHoodle": "GameSendGameHoodle"
} ],
GameScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cfd843BU6dHXYrbSMYq9hiJ", "GameScene");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
n(t, e);
function t() {
var t = e.call(this) || this;
t._prefab_name = "ui_prefabs/games/GameSceneUI";
t._script_name = "GameSceneCtrl";
t._scene_name = "GameScene";
return t;
}
t.prototype.destroy = function(t) {
e.prototype.destroy.call(this, t);
};
return t;
}(e("../../../framework/uibase/BaseScene").default);
o.default = r;
cc._RF.pop();
}, {
"../../../framework/uibase/BaseScene": "BaseScene"
} ],
GameSendGameHoodle: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2b503CZ0fNM965bUcLteNQu", "GameSendGameHoodle");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../../../framework/network/NetWork"), r = e("../../../../framework/protocol/Stype"), i = e("../../../../framework/protocol/GameHoodleProto"), s = e("../../../../framework/config/GameHoodleConfig"), a = e("../../../../framework/utils/ArrayUtil"), c = function() {
function e() {}
e.send = function(e, t) {
n.default.getInstance().send_msg(r.Stype.GameHoodle, e, t);
};
e.send_check_link_game = function() {
e.send(i.Cmd.eCheckLinkGameReq);
};
e.send_login_logic = function() {
e.send(i.Cmd.eLoginLogicReq);
};
e.send_exit_room = function() {
e.send(i.Cmd.eExitRoomReq);
};
e.send_dessolve_room = function() {
e.send(i.Cmd.eDessolveReq);
};
e.send_back_room = function() {
e.send(i.Cmd.eBackRoomReq);
};
e.send_user_ready = function() {
e.send(i.Cmd.eUserReadyReq);
};
e.send_get_player_ball_info = function() {
e.send(i.Cmd.eUserBallInfoReq);
};
e.send_ball_compose = function(t, o) {
o || (o = 1);
var n = {
updatetype: s.default.BALL_UPDATE_TYPE.COMPOSE_TYPE,
level: t,
count: o
};
e.send(i.Cmd.eUpdateUserBallReq, n);
};
e.send_store_list_req = function() {
e.send(i.Cmd.eStoreListReq);
};
e.send_buy_product = function(t) {
!t || a.default.GetArrayLen(t) <= 0 || e.send(i.Cmd.eBuyThingsReq, t);
};
e.send_player_shoot = function(t, o, n, r) {
var s = {
seatid: t,
posx: String(o),
posy: String(n),
shootpower: Number(r)
};
e.send(i.Cmd.ePlayerShootReq, s);
};
e.send_all_player_ball_pos = function(t) {
var o = {
positions: t
};
e.send(i.Cmd.ePlayerBallPosReq, o);
};
e.send_player_is_shooted = function(t, o) {
var n = {
srcseatid: t,
desseatid: o
};
e.send(i.Cmd.ePlayerIsShootedReq, n);
};
return e;
}();
o.default = c;
cc._RF.pop();
}, {
"../../../../framework/config/GameHoodleConfig": "GameHoodleConfig",
"../../../../framework/network/NetWork": "NetWork",
"../../../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../../../framework/protocol/Stype": "Stype",
"../../../../framework/utils/ArrayUtil": "ArrayUtil"
} ],
HoodleBallCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9794aB4lctPlapWq1agfAB7", "HoodleBallCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../../framework/uibase/UIController"), s = e("../../../common/State"), a = e("../sendMsg/GameSendGameHoodle"), c = e("./GameHoodleData"), u = e("../../../common/RoomData"), l = cc._decorator, f = l.ccclass, d = (l.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._rigid_body = null;
t._ball_name = "";
t._ball_id = -1;
t._src_shoot_seatid = -1;
t._ball_state = s.BallState.stop;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this._rigid_body = this.getComponent(cc.RigidBody);
};
t.prototype.start = function() {};
t.prototype.shoot_at = function(e, t) {
t || (t = 50);
var o = this.node.parent.convertToNodeSpaceAR(e), n = cc.v2(this.node.x, this.node.y), r = o.sub(n);
if (this._rigid_body) {
var i = r.normalizeSelf(), s = 380 * i.x * t, a = 380 * i.y * t;
console.log("hcc>>shoot_at: ", s, a, " ,power: ", t);
this._rigid_body.applyLinearImpulse(cc.v2(s, a), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), !0);
}
};
t.prototype.set_name = function(e) {
this.get_ball_id() == u.default.getInstance().get_self_seatid() && (e += "(我)");
this.set_string(this.view.KW_TEXT_NAME, e);
this._ball_name = e;
};
t.prototype.set_ball_id = function(e) {
this._ball_id = e;
};
t.prototype.get_ball_id = function() {
return this._ball_id;
};
t.prototype.set_src_shoot_seatid = function(e) {
this._src_shoot_seatid = e;
};
t.prototype.get_src_shoot_seatid = function() {
return this._src_shoot_seatid;
};
t.prototype.set_img_face = function(e) {};
t.prototype.set_shoot_power_ui = function(e) {
e == s.PlayerPower.canPlay ? this.view.KW_TEXT_NAME.color = cc.color(255, 0, 0) : this.view.KW_TEXT_NAME.color = cc.color(255, 255, 255);
};
t.prototype.set_ball_state = function(e) {
this._ball_state = e;
};
t.prototype.get_ball_state = function() {
return this._ball_state;
};
t.prototype.onBeginContact = function(e, t, o) {
var n = -1, r = -1, i = t.getComponent("HoodleBallCtrl"), l = o.getComponent("HoodleBallCtrl");
if (i && l && i.get_ball_id && l.get_ball_id) {
var f = i.get_ball_id(), d = l.get_ball_id();
console.log("hcc>>selfballid: ", f, " ,otherballid: ", d);
var p = c.default.getInstance().get_power(f), h = c.default.getInstance().get_power(d);
if (f == this.get_src_shoot_seatid()) {
n = f;
r = d;
} else {
n = d;
r = f;
}
var _ = u.default.getInstance().get_player(n), g = u.default.getInstance().get_player(r);
console.log("hcc>>src_player:", _.get_uname(), " ,des_player: ", g.get_uname());
-1 != n && -1 != r && a.default.send_player_is_shooted(n, r);
var y = t.getComponent(cc.MotionStreak), m = t.getComponent(cc.MotionStreak);
if (y && m) if (p == s.PlayerPower.canPlay) {
y.enabled = !0;
m.enabled = !1;
} else if (h == s.PlayerPower.canPlay) {
y.enabled = !1;
m.enabled = !0;
}
}
};
t.prototype.onEndContact = function(e, t, o) {};
t.prototype.onPreSolve = function(e, t, o) {};
t.prototype.onPostSolve = function(e, t, o) {};
t.prototype.update = function() {
if (this._rigid_body) {
var e = (n = this._rigid_body.linearVelocity).magSqr();
this.get_ball_state() == s.BallState.stop && e >= 100 && console.log("hcc>>start moving");
if (this.get_ball_state() == s.BallState.moving && Math.floor(e) <= 100) {
console.log("hcc>>start stop, position: ", this.node.position.x, this.node.position.y);
if (-1 == this.get_ball_id()) return;
var t = [], o = {
seatid: Number(this.get_ball_id()),
posx: String(this.node.getPosition().x),
posy: String(this.node.getPosition().y)
};
t.push(o);
a.default.send_all_player_ball_pos(t);
}
}
if (this._rigid_body) {
var n = this._rigid_body.linearVelocity;
(e = Math.floor(n.magSqr())) <= 100 ? this.set_ball_state(s.BallState.stop) : this.set_ball_state(s.BallState.moving);
}
};
return t = r([ f ], t);
}(i.default));
o.default = d;
cc._RF.pop();
}, {
"../../../../framework/uibase/UIController": "UIController",
"../../../common/RoomData": "RoomData",
"../../../common/State": "State",
"../sendMsg/GameSendGameHoodle": "GameSendGameHoodle",
"./GameHoodleData": "GameHoodleData"
} ],
HoodleBallManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "00ef1qnouVGPpRW5JkVPRxM", "HoodleBallManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../../common/RoomData"), r = function() {
function e() {
this._ball_set = {};
}
e.getInstance = function() {
return e.instance;
};
e.prototype.get_ball = function(e) {
return this._ball_set[e];
};
e.prototype.set_ball = function(e, t) {
this._ball_set[e] = t;
};
e.prototype.delete_ball = function(e) {
var t = this._ball_set[e];
if (t) {
t.destroy();
delete this._ball_set[e];
}
};
e.prototype.get_self_ball = function() {
return this._ball_set[n.default.getInstance().get_self_seatid()];
};
e.prototype.get_all_ball = function() {
return this._ball_set;
};
e.instance = new e();
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../../../common/RoomData": "RoomData"
} ],
HotFixSceneCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "4e12fQTpG5BjJbQ4m2k0rM0", "HotFixSceneCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/ResourceManager"), a = e("../../../framework/utils/StringUtil"), c = e("../../../framework/manager/SceneManager"), u = e("../LoginScene/LoginScene"), l = e("../../../framework/hotfix/HotUpdateNew"), f = cc._decorator, d = f.ccclass, p = (f.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._progressbar = null;
t._urlArray = [ "ui_prefabs/login/", "ui_prefabs/lobby/", "ui_prefabs/dialog/", "ui_prefabs/hotfix/", "ui_prefabs/games/", "textures/lobby/", "textures/dialog/", "mainfest/", "config/" ];
t._completedFlag = [];
t._tryTimes = 0;
t._resourceMap = [];
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.setProgress(0);
this.checkHotUpdate();
};
t.prototype.checkHotUpdate = function() {
var e = l.default.getInstance(), t = this;
e.checkUpdate(function(o) {
cc.log("hcc>>enter_login_scene>>is need hotupdate: ", o);
if (o) {
e.hotUpdateStart();
e.setUpdateCallback(function(e, o, n) {
console.log("hcc>>hotupdate: isSuccess: ", e, "  ,percent: ", o, "  ,tipstring: ", n);
o && t.setProgress(o);
n && t.set_string(t.view.KW_TEXT_PROGRESS_TIP, n);
if (e) {
t.set_string(t.view.KW_TEXT_PROGRESS_TIP, "热更新完成!");
t.startPreloadRes();
}
});
} else {
t.set_string(t.view.KW_TEXT_PROGRESS_TIP, "已是最新版本！");
t.setProgress(1);
t.startPreloadRes();
}
});
};
t.prototype.startPreloadRes = function() {
for (var e = 0; e < this._urlArray.length; e++) this.preloadRes(this._urlArray[e]);
};
t.prototype.setProgress = function(e) {
var t = this.view.KW_PROGRESS_BAR;
if (t) {
t.getComponent(cc.ProgressBar).progress = e;
}
};
t.prototype.preloadRes = function(e) {
var t = this, o = 0;
s.ResourceManager.getInstance().loadResDirAsyc(e, function(e, n, r) {
if (0 != n) {
o = e / n;
t.setProgress(o);
var i = Math.max(1, 100 * o), s = (a.default.format("%2d", i), "正在载入资源中... " + e + "/" + n);
t.set_string(t.view.KW_TEXT_PROGRESS_TIP, s);
}
}, function(o, n, r) {
if (o) {
console.warn(o);
if (t._tryTimes < 3) {
t._tryTimes++;
t.preloadRes(e);
} else console.warn("res load failed!");
} else {
t._completedFlag.push(!0);
if (t._completedFlag.length >= t._urlArray.length) {
t.set_string(t.view.KW_TEXT_PROGRESS_TIP, "资源加载完成!");
t.enter_login_scene();
}
}
});
};
t.prototype.enter_login_scene = function() {
c.default.getInstance().enter_scene_asyc(new u.default());
};
return t = r([ d ], t);
}(i.default));
o.default = p;
cc._RF.pop();
}, {
"../../../framework/hotfix/HotUpdateNew": "HotUpdateNew",
"../../../framework/manager/ResourceManager": "ResourceManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/StringUtil": "StringUtil",
"../LoginScene/LoginScene": "LoginScene"
} ],
HotFixScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "14a2bTJ3wVCtY3gzjFMKRJM", "HotFixScene");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
n(t, e);
function t() {
var t = e.call(this) || this;
t._prefab_name = "ui_prefabs/hotfix/HotFixUI";
t._script_name = "HotFixSceneCtrl";
t._scene_name = "HotFixScene";
return t;
}
t.prototype.destroy = function(t) {
e.prototype.destroy.call(this, t);
};
return t;
}(e("../../../framework/uibase/BaseScene").default);
o.default = r;
cc._RF.pop();
}, {
"../../../framework/uibase/BaseScene": "BaseScene"
} ],
HotUpdateNew: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f8f98XsfAdBPKYBs0qJCMd6", "HotUpdateNew");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../manager/ResourceManager"), r = e("../config/PlatForm"), i = e("../config/GameAppConfig"), s = JSON.stringify({
packageUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/",
remoteManifestUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/project.manifest",
remoteVersionUrl: "http://192.168.50.220:5555/tutorial-hot-update/remote-assets/version.manifest",
version: "1.10",
assets: {
"src/cocos2d-jsb.js": {
size: 3341465,
md5: "fafdde66bd0a81d1e096799fb8b7af95"
}
},
searchPaths: []
}), a = function() {
function e() {
this._assetsManager = null;
this._updating = !1;
this._canRetry = !1;
this._manifestUrl = null;
this._updateCallback = null;
this._localVersion = "";
this.init();
}
e.getInstance = function() {
return e.instance;
};
e.prototype.getLocalVersion = function() {
return this._localVersion;
};
e.prototype.init = function() {
var e = this;
n.ResourceManager.getInstance().loadResAsyc(i.default.LOCAL_MANIFEST_PATH, cc.Asset, function(t, o) {
if (t) cc.log("hcc>>manifest error: ", t); else {
e._manifestUrl = o;
cc.log("hcc>>manifest: ", o.nativeUrl);
if (e._manifestUrl) {
var n = e._manifestUrl.nativeUrl;
cc.log("hcc>>_manifestUrl.nativeUrl111>>init: ", n);
cc.loader.md5Pipe && (n = cc.loader.md5Pipe.transformURL(n));
cc.log("hcc>>_manifestUrl.nativeUrl222>>init:  ", n);
if (!e.checkPlatForm()) return;
var r = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "hotUpdateCache";
cc.log("hcc>>Storage path for remote asset : ", r);
e._assetsManager = new jsb.AssetsManager("", r, e.versionCompareCallback.bind(e));
e._assetsManager.setVerifyCallback(e.assetsVerifyCallback.bind(e));
cc.sys.os === cc.sys.OS_ANDROID && e._assetsManager.setMaxConcurrentTask(2);
e._assetsManager.loadLocalManifest(n);
var i = e._assetsManager.getLocalManifest();
if (i && i.getVersion) {
e._localVersion = i.getVersion();
cc.log("hcc>>localMani: ", i, " ,localversion:", i.getVersion());
}
}
}
});
};
e.prototype.setUpdateCallback = function(e) {
this._updateCallback = e;
};
e.prototype.checkPlatForm = function() {
if (!cc.sys.isNative) {
cc.warn("not native platform,can not hotupdate!");
return !1;
}
return !0;
};
e.prototype.checkUpdate = function(e) {
if (this.checkPlatForm()) if (this._manifestUrl) {
if (this._updating) e(!1); else if (this._assetsManager) {
if (this._assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
var t = this._manifestUrl.nativeUrl;
cc.log("hcc>>_manifestUrl.nativeUrl111: ", t);
cc.loader.md5Pipe && (t = cc.loader.md5Pipe.transformURL(t));
cc.log("hcc>>_manifestUrl.nativeUrl222: ", t);
this._assetsManager.loadLocalManifest(t);
}
if (this._assetsManager.getLocalManifest() && this._assetsManager.getLocalManifest().isLoaded()) {
cc.log("hcc>>checkUpdate: ", "");
this._assetsManager.setEventCallback(function(t) {
cc.log("hcc>>checkUpdateCallback,Code: " + t.getEventCode());
var o = "", n = t.getEventCode();
switch (n) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
o = "本地没有manifest文件!";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
o = "manifest下载失败!";
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
o = "已经更新到最新版本!";
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
o = "发现新版本，准备更新!";
break;

default:
return;
}
cc.log("hcc>>checkUpdateCallback: ", o);
this._assetsManager.setEventCallback(null);
this._updating = !1;
e(n == jsb.EventAssetsManager.NEW_VERSION_FOUND);
}.bind(this));
this._assetsManager.checkUpdate();
this._updating = !0;
} else {
cc.log("hcc>>checkUpdate: Failed to load local manifest ...");
e(!1);
}
} else e(!1);
} else e(!1); else e(!1);
};
e.prototype.hotUpdateStart = function() {
if (!this.checkPlatForm()) return !1;
if (!this._manifestUrl) return !1;
if (this._assetsManager && !this._updating) {
this._assetsManager.setEventCallback(this.updateCallback.bind(this));
if (this._assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
var e = this._manifestUrl.nativeUrl;
cc.loader.md5Pipe && (e = cc.loader.md5Pipe.transformURL(e));
this._assetsManager.loadLocalManifest(e);
}
this._assetsManager.update();
this._updating = !0;
}
return !0;
};
e.prototype.assetsVerifyCallback = function(e, t) {
t.compressed, t.md5, t.path, t.size;
var o = "";
o = "Verification passed : ";
console.log("hcc>>assetsVerifyCallback:", o);
return !0;
};
e.prototype.versionCompareCallback = function(e, t) {
cc.log("hcc>>JS Custom Version Compare: version A is " + e + ", version B is " + t);
for (var o = e.split("."), n = t.split("."), r = 0; r < o.length; ++r) {
var i = parseInt(o[r]), s = parseInt(String(n[r] || 0));
if (i !== s) return i - s;
}
return n.length > o.length ? -1 : 0;
};
e.prototype.checkUpdateCallback = function(e) {
cc.log("hcc>>checkUpdateCallback,Code: " + e.getEventCode());
var t = "";
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
t = "No local manifest file found, hot update skipped.";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
t = "Fail to download manifest file, hot update skipped.";
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
t = "Already up to date with the latest remote version.";
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
t = "New version found, please try to update.";
break;

default:
return;
}
if (this._assetsManager) {
this._assetsManager.setEventCallback(null);
this._updating = !1;
}
cc.log("hcc>>checkUpdateCallback: ", t);
};
e.prototype.updateCallback = function(e) {
if (this._assetsManager) {
cc.log("hcc>>updateCallback, code: ", e.getEventCode());
var t = !1, o = !1, n = null, i = null;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
n = "本地没有manifest文件，更新失败!";
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
i = Math.floor(100 * e.getPercentByFile()) / 100;
n = "更新进度: " + Math.floor(e.getDownloadedBytes() / 1024 / 1024 * 100) / 100 + "M / " + Math.floor(e.getTotalBytes() / 1024 / 1024 * 100) / 100 + "M";
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
n = "下载manifest文件失败!";
o = !0;
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
n = "已经更新到最新版本!";
o = !0;
break;

case jsb.EventAssetsManager.UPDATE_FINISHED:
n = "更新成功! " + e.getMessage();
t = !0;
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
n = "更新失败! " + e.getMessage();
this._updating = !1;
this._canRetry = !0;
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
n = "资源更新失败! " + e.getAssetId() + ", " + e.getMessage();
break;

case jsb.EventAssetsManager.ERROR_DECOMPRESS:
n = "资源解压失败! " + e.getMessage();
}
this._updateCallback && this._updateCallback.call(this, !1, i, n);
cc.log("hcc>>updateCallback: ", n);
if (o) {
this._assetsManager.setEventCallback(null);
this._updating = !1;
}
if (t) {
this._updateCallback && this._updateCallback.call(this, !0, i, n);
this._assetsManager.setEventCallback(null);
var s = jsb.fileUtils.getSearchPaths(), a = this._assetsManager.getLocalManifest();
if (a) {
var c = a.getSearchPaths();
console.log("hcc>>newPaths:", JSON.stringify(c));
Array.prototype.unshift.apply(s, c);
}
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(s));
jsb.fileUtils.setSearchPaths(s);
cc.audioEngine.stopAll();
(r.default.isAndroidNative() || r.default.isIOSNative()) && cc.game.restart();
}
}
};
e.prototype.loadCustomManifest = function() {
if (this._assetsManager && this._assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
var e = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "hotUpdateCache", t = new jsb.Manifest(s, e);
this._assetsManager.loadLocalManifest(t, e);
}
};
e.prototype.retry = function() {
if (!this._updating && this._canRetry && this._assetsManager) {
this._canRetry = !1;
this._assetsManager.downloadFailedAssets();
}
};
e.instance = new e();
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../config/GameAppConfig": "GameAppConfig",
"../config/PlatForm": "PlatForm",
"../manager/ResourceManager": "ResourceManager"
} ],
HttpUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "075fa9VyZVK0Y/tZbtG3fHx", "HttpUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.get = function(e, t, o, n) {
var r = cc.loader.getXMLHttpRequest();
r.timeout = 5e3;
var i = e + t;
o && (i = i + "?" + o);
r.open("GET", i, !0);
cc.sys.isNative && r.setRequestHeader("Accept-Encoding", "gzip,deflate");
r.onreadystatechange = function() {
if (4 === r.readyState && r.status >= 200 && r.status < 300) {
console.log("http res(" + r.responseText.length + "):" + r.responseText);
try {
var e = r.responseText;
null !== n && n(null, e);
return;
} catch (e) {
n(e, null);
}
} else n(r.readyState + ":" + r.status, null);
};
r.send();
return r;
};
e.post = function(e, t, o, n, r) {
var i = cc.loader.getXMLHttpRequest();
i.timeout = 5e3;
var s = e + t;
o && (s = s + "?" + o);
i.open("POST", s, !0);
cc.sys.isNative && i.setRequestHeader("Accept-Encoding", "gzip,deflate");
if (n) {
i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
i.setRequestHeader("Content-Length", n.length);
}
i.onreadystatechange = function() {
if (4 === i.readyState && i.status >= 200 && i.status < 300) try {
var e = i.responseText;
null !== r && r(null, e);
return;
} catch (e) {
r(e, null);
} else r(i.readyState + ":" + i.status, null);
};
n && i.send(n);
return i;
};
e.download = function(e, t, o, n) {
var r = cc.loader.getXMLHttpRequest();
r.timeout = 5e3;
var i = e + t;
o && (i = i + "?" + o);
r.responseType = "arraybuffer";
r.open("GET", i, !0);
cc.sys.isNative && r.setRequestHeader("Accept-Encoding", "gzip,deflate");
r.onreadystatechange = function() {
if (4 === r.readyState && r.status >= 200 && r.status < 300) {
for (var e = r.response, t = new DataView(e), o = new Uint8Array(e.byteLength), i = 0; i < o.length; i++) o[i] = t.getUint8(i);
n(null, o);
} else n(r.readyState + ":" + r.status, null);
};
r.send();
return r;
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
JoinRoomDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "048d5LMoSpOu4S0AJ9gEylb", "JoinRoomDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../../framework/utils/StringUtil"), a = e("../scene/lobbyScene/sendMsg/LobbySendGameHoodle"), c = e("../../framework/manager/EventManager"), u = e("../../framework/protocol/GameHoodleProto"), l = e("../../framework/protocol/Response"), f = cc._decorator, d = f.ccclass, p = (f.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._text_index = 1;
t.KW_TOTAL_ROOM_NUM_COUNT = 6;
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.initUI();
this.add_event_dispatcher();
this.add_button_event_listener();
};
t.prototype.add_event_dispatcher = function() {
c.default.on(u.CmdName[u.Cmd.eJoinRoomRes], this, this.on_event_join_room);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_BTN_DELETE, this.on_click_delete.bind(this));
this.add_click_event(this.view.KW_BTN_CLEAR, this.on_click_clear.bind(this));
for (var e = 0; e <= 9; e++) {
var t = "KW_BTN_NUM_" + e;
this.add_click_event(this.view[t], this.on_click_number.bind(this));
}
};
t.prototype.initUI = function() {
for (var e = 1; e <= this.KW_TOTAL_ROOM_NUM_COUNT; e++) {
var t = "KW_SHOW_NUM_" + e;
this.set_string(this.view[t], "");
}
};
t.prototype.onDestroy = function() {};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.on_click_delete = function(e) {
for (var t = this.KW_TOTAL_ROOM_NUM_COUNT; t >= 1; t--) {
var o = "KW_SHOW_NUM_" + t;
if ("" != this.get_string(this.view[o])) {
this.set_string(this.view[o], "");
this._text_index = t;
break;
}
}
};
t.prototype.on_click_clear = function(e) {
for (var t = 1; t <= this.KW_TOTAL_ROOM_NUM_COUNT; t++) {
var o = "KW_SHOW_NUM_" + t;
this.set_string(this.view[o], "");
}
this._text_index = 1;
};
t.prototype.on_click_number = function(e) {
var t = e.node.name, o = s.default.getNumberSuffixByString(t), n = "KW_SHOW_NUM_" + this._text_index;
this.set_string(this.view[n], String(o));
if (this._text_index == this.KW_TOTAL_ROOM_NUM_COUNT) {
for (var r = "", i = 1; i <= this.KW_TOTAL_ROOM_NUM_COUNT; i++) {
var c = "KW_SHOW_NUM_" + i;
r += this.get_string(this.view[c]);
}
cc.log("roomid: ", r);
a.default.send_join_room(r);
}
this._text_index++;
};
t.prototype.on_event_join_room = function(e) {
var t = e.getUserData();
if (t) {
t.status == l.default.OK && this.close();
}
};
return t = r([ d ], t);
}(i.default));
o.default = p;
cc._RF.pop();
}, {
"../../framework/manager/EventManager": "EventManager",
"../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../framework/protocol/Response": "Response",
"../../framework/uibase/UIDialog": "UIDialog",
"../../framework/utils/StringUtil": "StringUtil",
"../scene/lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
LSDefine: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1dfa98T8YpKVoB2sI5ZnBTJ", "LSDefine");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.USER_LOGIN_TYPE = "user_login_type";
e.USER_LOGIN_MSG = "user_login_msg";
e.USER_LOGIN_GUEST_KEY = "user_login_guest_key";
e.USER_INFO_SELF = "user_info_self";
e.LOGIN_TYPE_GUEST = "guest_login";
e.LOGIN_TYPE_UNAME = "uname_login";
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
LobbySceneCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "29abdeasHJOvbsu081bJcOW", "LobbySceneCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_script("LobbySceneInit");
this.add_script("LobbySceneTouchEvent");
this.add_script("LobbySceneRecvAuthMsg");
this.add_script("LobbySceneRecvGameHoodleMsg");
this.add_script("LobbySceneShowUI");
};
t.prototype.start = function() {};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../../framework/uibase/UIController": "UIController"
} ],
LobbySceneInit: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "21949LmYH9BWrL74W1Vtygs", "LobbySceneInit");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("./sendMsg/LobbySendAuthMsg"), a = e("./sendMsg/LobbySendGameHoodle"), c = cc._decorator, u = c.ccclass, l = (c.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
s.default.send_get_center_info();
a.default.send_get_ugame_info();
};
return t = r([ u ], t);
}(i.default));
o.default = l;
cc._RF.pop();
}, {
"../../../framework/uibase/UIController": "UIController",
"./sendMsg/LobbySendAuthMsg": "LobbySendAuthMsg",
"./sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
LobbySceneRecvAuthMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e178cSxopZKl6qA1QZ6X9jg", "LobbySceneRecvAuthMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/EventManager"), a = e("../../../framework/protocol/AuthProto"), c = e("../../../framework/protocol/Response"), u = e("../../../framework/manager/SceneManager"), l = e("../LoginScene/LoginScene"), f = e("../../../framework/utils/Storage"), d = e("../../../framework/config/LSDefine"), p = e("../../../framework/common/UserInfo"), h = e("../../../framework/manager/DialogManager"), _ = e("../../../framework/config/EventDefine"), g = e("./sendMsg/LobbySendAuthMsg"), y = e("./sendMsg/LobbySendGameHoodle"), m = e("../LoginScene/sendMsg/LoginSendAuthMsg"), v = cc._decorator, b = v.ccclass, w = (v.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(_.default.EVENT_NET_CONNECTED, this, this.on_net_connected);
s.default.on(a.CmdName[a.Cmd.eUnameLoginRes], this, this.on_event_uname_login);
s.default.on(a.CmdName[a.Cmd.eGuestLoginRes], this, this.on_event_guest_login);
s.default.on(a.CmdName[a.Cmd.eGetUserCenterInfoRes], this, this.on_event_center_info);
s.default.on(a.CmdName[a.Cmd.eLoginOutRes], this, this.on_event_login_out);
s.default.on(a.CmdName[a.Cmd.eReloginRes], this, this.on_event_relogin);
};
t.prototype.on_net_connected = function(e) {
var t = f.default.get(d.default.USER_LOGIN_TYPE);
if (t == d.default.LOGIN_TYPE_UNAME) {
var o = f.default.get(d.default.USER_LOGIN_MSG);
o && m.default.send_uname_login(o.uname, o.upwd);
} else if (t == d.default.LOGIN_TYPE_GUEST) {
var n = f.default.get(d.default.USER_LOGIN_GUEST_KEY);
n && m.default.send_guest_login(n);
}
};
t.prototype.on_event_guest_login = function(e) {
var t = e.getUserData();
cc.log("guestlogin udata: ", t);
if (t.status == c.default.OK) {
try {
var o = JSON.parse(t.userlogininfo);
f.default.set(d.default.USER_LOGIN_TYPE, d.default.LOGIN_TYPE_GUEST);
f.default.set(d.default.USER_LOGIN_GUEST_KEY, o.guest_key);
} catch (e) {
cc.error(e);
}
cc.log("on_event_guest_login: key: ", f.default.get(d.default.USER_LOGIN_GUEST_KEY));
y.default.send_login_logic();
g.default.send_get_center_info();
h.default.getInstance().show_weak_hint("游客登录成功!");
} else h.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_uname_login = function(e) {
var t = e.getUserData();
cc.log("unamelogin udata: ", t);
if (t.status == c.default.OK) {
try {
var o = JSON.parse(t.userlogininfo);
f.default.set(d.default.USER_LOGIN_TYPE, d.default.LOGIN_TYPE_UNAME);
f.default.set(d.default.USER_LOGIN_MSG, {
uname: o.uname,
upwd: o.upwd
});
} catch (e) {
cc.error(e);
}
cc.log("on_event_uname_login: ", f.default.get(d.default.USER_LOGIN_MSG));
y.default.send_login_logic();
g.default.send_get_center_info();
h.default.getInstance().show_weak_hint("登录成功!");
} else h.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_center_info = function(e) {
var t = e.getUserData();
if (t) {
var o = t.usercenterinfostring;
if (o) {
p.default.set_uinfo(o);
var n = this.get_script("LobbySceneShowUI");
n && n.show_user_info();
}
}
};
t.prototype.on_event_login_out = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == c.default.OK) {
cc.log("on_event_login_out");
u.default.getInstance().enter_scene_asyc(new l.default());
h.default.getInstance().show_weak_hint("退出成功!");
}
}
};
t.prototype.on_event_relogin = function(e) {
cc.log("on_event_relogin...");
u.default.getInstance().enter_scene_asyc(new l.default());
h.default.getInstance().show_weak_hint("您已经被挤号,自动退出!");
};
return t = r([ b ], t);
}(i.default));
o.default = w;
cc._RF.pop();
}, {
"../../../framework/common/UserInfo": "UserInfo",
"../../../framework/config/EventDefine": "EventDefine",
"../../../framework/config/LSDefine": "LSDefine",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/EventManager": "EventManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/protocol/AuthProto": "AuthProto",
"../../../framework/protocol/Response": "Response",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/Storage": "Storage",
"../LoginScene/LoginScene": "LoginScene",
"../LoginScene/sendMsg/LoginSendAuthMsg": "LoginSendAuthMsg",
"./sendMsg/LobbySendAuthMsg": "LobbySendAuthMsg",
"./sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
LobbySceneRecvGameHoodleMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f53726ANBdPmp6TnNgTdVLR", "LobbySceneRecvGameHoodleMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/EventManager"), a = e("../../../framework/protocol/GameHoodleProto"), c = e("../../../framework/protocol/Response"), u = e("../../../framework/manager/SceneManager"), l = e("../../../framework/common/UserInfo"), f = e("../gameScene/GameScene"), d = e("../../../framework/manager/DialogManager"), p = e("./LobbyScene"), h = e("./sendMsg/LobbySendGameHoodle"), _ = e("../../common/RoomData"), g = cc._decorator, y = g.ccclass, m = (g.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.CmdName[a.Cmd.eLoginLogicRes], this, this.on_event_login_logic);
s.default.on(a.CmdName[a.Cmd.eCreateRoomRes], this, this.on_event_create_room);
s.default.on(a.CmdName[a.Cmd.eJoinRoomRes], this, this.on_event_join_room);
s.default.on(a.CmdName[a.Cmd.eExitRoomRes], this, this.on_event_exit_room);
s.default.on(a.CmdName[a.Cmd.eDessolveRes], this, this.on_event_dessolve_room);
s.default.on(a.CmdName[a.Cmd.eGetRoomStatusReq], this, this.on_event_get_room_status);
s.default.on(a.CmdName[a.Cmd.eBackRoomRes], this, this.on_event_back_room);
s.default.on(a.CmdName[a.Cmd.eUserMatchRes], this, this.on_event_match);
s.default.on(a.CmdName[a.Cmd.eUserStopMatchRes], this, this.on_event_match_stop);
s.default.on(a.CmdName[a.Cmd.eUserGameInfoRes], this, this.on_event_ugame_info);
};
t.prototype.on_event_login_logic = function(e) {
var t = e.getUserData();
cc.log("on_event_login_logic", t);
if (t && t.status == c.default.OK) {
h.default.send_get_room_status();
h.default.send_get_ugame_info();
h.default.send_get_uball_info();
d.default.getInstance().show_weak_hint("登录游戏服务成功!");
}
};
t.prototype.on_event_create_room = function(e) {
var t = e.getUserData();
cc.log("on_event_create_room", t);
if (t) {
if (t.status == c.default.OK) {
u.default.getInstance().enter_scene_asyc(new f.default());
d.default.getInstance().show_weak_hint("房间创建成功!");
} else d.default.getInstance().show_weak_hint("房间创建失败!");
}
};
t.prototype.on_event_join_room = function(e) {
var t = e.getUserData();
cc.log("on_event_join_room", t);
if (t) {
if (t.status == c.default.OK) {
u.default.getInstance().enter_scene_asyc(new f.default());
d.default.getInstance().show_weak_hint("加入房间成功!");
} else d.default.getInstance().show_weak_hint("加入房间失败!");
}
};
t.prototype.on_event_exit_room = function(e) {
var t = e.getUserData();
cc.log("on_event_exit_room", t);
if (t) {
if (t.status == c.default.OK) {
u.default.getInstance().enter_scene_asyc(new p.default());
_.default.getInstance().clear_room_data();
d.default.getInstance().show_weak_hint("退出房间成功!");
} else d.default.getInstance().show_weak_hint("退出房间失败!");
}
};
t.prototype.on_event_dessolve_room = function(e) {
var t = e.getUserData();
cc.log("on_event_dessolve_room", t);
if (t) {
if (t.status == c.default.OK) {
u.default.getInstance().enter_scene_asyc(new p.default());
_.default.getInstance().clear_room_data();
d.default.getInstance().show_weak_hint("解散房间成功!");
} else d.default.getInstance().show_weak_hint("解散房间失败!");
}
};
t.prototype.on_event_get_room_status = function(e) {
var t = e.getUserData();
cc.log("on_event_get_room_status", t);
if (t) {
t.status;
c.default.OK;
}
};
t.prototype.on_event_back_room = function(e) {
var t = e.getUserData();
cc.log("on_event_back_room", t);
if (t) {
if (t.status == c.default.OK) {
u.default.getInstance().enter_scene_asyc(new f.default());
d.default.getInstance().show_weak_hint("返回房间成功!");
} else d.default.getInstance().show_weak_hint("返回房间失败!");
}
};
t.prototype.on_event_match = function(e) {
var t = e.getUserData();
cc.log("on_event_match", t);
if (t) {
var o = t.status;
if (o == c.default.OK) {
var n = t.matchsuccess;
if (1 == n) {
d.default.getInstance().show_weak_hint("匹配完成!");
this.scheduleOnce(function(e) {
d.default.getInstance().close_dialog("MatchDialog");
u.default.getInstance().enter_scene_asyc(new f.default());
}, 1);
}
var r = t.userinfo;
if (!n && r) {
d.default.getInstance().close_dialog("MatchDialog");
d.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogMatch", "MatchDialog", function(e) {
if (e && cc.isValid(e)) {
var t = e.getComponent("MatchDialog");
t && t.show_math_user_info(r);
}
});
}
} else o == c.default.NOT_YOUR_TURN ? d.default.getInstance().show_weak_hint("请稍等候，正在匹配中。。。。") : d.default.getInstance().show_weak_hint("匹配失败!");
}
};
t.prototype.on_event_match_stop = function(e) {
var t = e.getUserData();
cc.log("on_event_match_stop", t);
if (t) {
t.status == c.default.OK ? d.default.getInstance().show_weak_hint("取消匹配!") : d.default.getInstance().show_weak_hint("取消失败!");
}
};
t.prototype.on_event_ugame_info = function(e) {
var t = e.getUserData();
cc.log("on_event_ugame_info", t);
if (t) {
if (t.status == c.default.OK) {
var o = JSON.parse(t.userinfostring);
l.default.set_ugame_info(o);
var n = this.get_script("LobbySceneShowUI");
n && n.show_user_info();
}
}
};
return t = r([ y ], t);
}(i.default));
o.default = m;
cc._RF.pop();
}, {
"../../../framework/common/UserInfo": "UserInfo",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/EventManager": "EventManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../../framework/protocol/Response": "Response",
"../../../framework/uibase/UIController": "UIController",
"../../common/RoomData": "RoomData",
"../gameScene/GameScene": "GameScene",
"./LobbyScene": "LobbyScene",
"./sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
LobbySceneShowUI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "573551CFkJEXK08C+Au+wt8", "LobbySceneShowUI");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/common/UserInfo"), a = e("../../../framework/hotfix/HotUpdateNew"), c = cc._decorator, u = c.ccclass, l = (c.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.show_version();
};
t.prototype.show_user_info = function() {
if (this.view.IMG_USER_INFO_BG) {
this.set_string(this.view.TEXT_USER_NAME, s.default.get_uname());
this.set_string(this.view.TEXT_USER_ID, s.default.get_numberid());
var e = "lobby/rectheader/1" + s.default.get_uface();
this.set_sprite_asyc(this.view.IMG_HEAD, e);
this.set_string(this.view.TEXT_COIN, s.default.get_uchip());
console.log("hcc>>LobbySceneShowUI>>show_user_info ", e);
}
};
t.prototype.show_version = function() {
this.set_string(this.view.KW_TEXT_VERSION, a.default.getInstance().getLocalVersion());
};
return t = r([ u ], t);
}(i.default));
o.default = l;
cc._RF.pop();
}, {
"../../../framework/common/UserInfo": "UserInfo",
"../../../framework/hotfix/HotUpdateNew": "HotUpdateNew",
"../../../framework/uibase/UIController": "UIController"
} ],
LobbySceneTouchEvent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "29003iYd0RHDJcpp/MhXe5F", "LobbySceneTouchEvent");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/DialogManager"), a = e("./sendMsg/LobbySendGameHoodle"), c = e("../../../framework/config/GameHoodleConfig"), u = cc._decorator, l = u.ccclass, f = (u.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
console.log("LobbySceneTouchEvent>>start");
this.add_button_event_listener();
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_SET, this.on_click_set.bind(this));
this.add_click_event(this.view.BTN_CREATE_ROOM, this.on_click_create_room.bind(this));
this.add_click_event(this.view.KW_BTN_LOGIN_LOGIC, this.on_click_login_logic.bind(this));
this.add_click_event(this.view.BTN_JOIN_ROOM, this.on_click_join_room.bind(this));
this.add_click_event(this.view.BTN_BACK_ROOM, this.on_click_back_room.bind(this));
this.add_click_event(this.view.IMG_HEAD, this.on_click_head.bind(this));
this.add_click_event(this.view.BTN_MATCH_ROOM, this.on_click_match_room.bind(this));
this.add_click_event(this.view.BTN_MATCH_STOP, this.on_click_match_stop.bind(this));
this.add_click_event(this.view.KW_BTN_BALL_COMPOSE, this.on_click_ball_compose.bind(this));
this.add_click_event(this.view.KW_BTN_STORE, this.on_click_store.bind(this));
};
t.prototype.on_click_ball_dialog_data = function(e, t) {};
t.prototype.on_click_set = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogMyCenter", "MyCenterDialog");
};
t.prototype.on_click_create_room = function(e) {
var t = JSON.stringify(c.default.BOX_GAME_RULE);
a.default.send_create_room(t);
};
t.prototype.on_click_login_logic = function(e) {
s.default.getInstance().show_weak_hint("你好你好，在干啥呢？？？？啊啊大打发士大夫阿道夫");
s.default.getInstance().show_weak_hint("你好你好");
};
t.prototype.on_click_join_room = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogJoinRoom", "JoinRoomDialog");
};
t.prototype.on_click_head = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogMyCenter", "MyCenterDialog");
};
t.prototype.on_click_back_room = function(e) {
a.default.send_back_room();
};
t.prototype.on_click_match_room = function(e) {
a.default.send_user_match();
};
t.prototype.on_click_match_stop = function(e) {
a.default.send_user_stop_match();
};
t.prototype.on_click_ball_compose = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogBallCenter", "BallCenterDialog");
};
t.prototype.on_click_store = function(e) {
s.default.getInstance().show_dialog_asyc("ui_prefabs/dialog/DialogStore", "StoreDialog");
};
return t = r([ l ], t);
}(i.default));
o.default = f;
cc._RF.pop();
}, {
"../../../framework/config/GameHoodleConfig": "GameHoodleConfig",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/uibase/UIController": "UIController",
"./sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
LobbyScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "63c7deQIzVL3oQhFNp+pvpm", "LobbyScene");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
n(t, e);
function t() {
var t = e.call(this) || this;
t._prefab_name = "ui_prefabs/lobby/LobbyUI";
t._script_name = "LobbySceneCtrl";
t._scene_name = "LobbyScene";
return t;
}
t.prototype.destroy = function(t) {
e.prototype.destroy.call(this, t);
};
return t;
}(e("../../../framework/uibase/BaseScene").default);
o.default = r;
cc._RF.pop();
}, {
"../../../framework/uibase/BaseScene": "BaseScene"
} ],
LobbySendAuthMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d0bb6Y0SUVCO5edUAxGodQr", "LobbySendAuthMsg");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../../../framework/network/NetWork"), r = e("../../../../framework/protocol/Stype"), i = e("../../../../framework/protocol/AuthProto"), s = function() {
function e() {}
e.send = function(e, t) {
n.default.getInstance().send_msg(r.Stype.Auth, e, t);
};
e.send_get_center_info = function() {
e.send(i.Cmd.eGetUserCenterInfoReq);
};
e.send_login_out = function() {
e.send(i.Cmd.eLoginOutReq);
};
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../../../../framework/network/NetWork": "NetWork",
"../../../../framework/protocol/AuthProto": "AuthProto",
"../../../../framework/protocol/Stype": "Stype"
} ],
LobbySendGameHoodle: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bfbe73me15PUL8/xgZ/mwjv", "LobbySendGameHoodle");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../../../framework/network/NetWork"), r = e("../../../../framework/protocol/Stype"), i = e("../../../../framework/protocol/GameHoodleProto"), s = function() {
function e() {}
e.send = function(e, t) {
n.default.getInstance().send_msg(r.Stype.GameHoodle, e, t);
};
e.send_login_logic = function() {
e.send(i.Cmd.eLoginLogicReq);
};
e.send_create_room = function(t) {
null != t && "" != t && e.send(i.Cmd.eCreateRoomReq, {
gamerule: t
});
};
e.send_join_room = function(t) {
null != t && "" != t && e.send(i.Cmd.eJoinRoomReq, {
roomid: t
});
};
e.send_exit_room = function() {
e.send(i.Cmd.eExitRoomReq);
};
e.send_dessolve_room = function() {
e.send(i.Cmd.eDessolveReq);
};
e.send_get_room_status = function() {
e.send(i.Cmd.eGetRoomStatusReq);
};
e.send_get_ugame_info = function() {
e.send(i.Cmd.eUserGameInfoReq);
};
e.send_back_room = function() {
e.send(i.Cmd.eBackRoomReq);
};
e.send_user_match = function() {
e.send(i.Cmd.eUserMatchReq, {
zoomid: 0
});
};
e.send_user_stop_match = function() {
e.send(i.Cmd.eUserStopMatchReq);
};
e.send_get_uball_info = function() {
e.send(i.Cmd.eUserBallInfoReq);
};
e.send_update_uball_info = function(t, o, n) {
n || (n = 0);
var r = {
updatetype: t,
level: o,
count: n
};
e.send(i.Cmd.eUpdateUserBallReq, r);
};
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../../../../framework/network/NetWork": "NetWork",
"../../../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../../../framework/protocol/Stype": "Stype"
} ],
LoginSceneCtrl: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d67dfJhAhZHvaJPPGqWCnrH", "LoginSceneCtrl");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = cc._decorator, a = s.ccclass, c = (s.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_script("LoginSceneTouchEvent");
this.add_script("LoginSceneInit");
this.add_script("LoginSceneRecvMsg");
this.add_script("LoginSceneShowUI");
};
t.prototype.start = function() {};
return t = r([ a ], t);
}(i.default));
o.default = c;
cc._RF.pop();
}, {
"../../../framework/uibase/UIController": "UIController"
} ],
LoginSceneInit: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1dcf9vhEhBPuqO5xQ6HZpCm", "LoginSceneInit");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/utils/Storage"), a = e("../../../framework/config/LSDefine"), c = e("../../../framework/config/PlatForm"), u = cc._decorator, l = u.ccclass, f = (u.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.initUI();
};
t.prototype.initUI = function() {
var e = s.default.get(a.default.USER_LOGIN_MSG), t = s.default.get(a.default.USER_LOGIN_TYPE);
t == a.default.LOGIN_TYPE_GUEST ? cc.log("logintype guest,key: ", s.default.get(a.default.USER_LOGIN_GUEST_KEY)) : t == a.default.LOGIN_TYPE_UNAME && e && cc.log("logintype uname: ", e.uname, ", upwd: ", e.upwd);
if (e) {
var o = this.seek_child_by_name(this.view.KW_IMG_LOGIN_BG, "KW_INPUT_ACCOUNT"), n = this.seek_child_by_name(this.view.KW_IMG_LOGIN_BG, "KW_INPUT_PWD");
this.set_editbox_string(o, e.uname);
this.set_editbox_string(n, e.upwd);
}
var r = "platform: " + String(cc.sys.os) + " ,isNative:" + cc.sys.isNative + " ,isWechatGame:" + c.default.isWeChatGame() + " ,isBrows:" + cc.sys.isBrowser;
this.set_string(this.view.KW_TEXT_PLATFORM, r);
this.set_string(this.view.KW_TEXT_VERSION, "1.0.0");
};
return t = r([ l ], t);
}(i.default));
o.default = f;
cc._RF.pop();
}, {
"../../../framework/config/LSDefine": "LSDefine",
"../../../framework/config/PlatForm": "PlatForm",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/Storage": "Storage"
} ],
LoginSceneRecvMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "aaab53dDxBGeYH/e6MGX8oI", "LoginSceneRecvMsg");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/manager/EventManager"), a = e("../../../framework/config/EventDefine"), c = e("../../../framework/utils/Log"), u = e("./../../../framework/protocol/AuthProto"), l = e("../../../framework/protocol/Response"), f = e("../../../framework/manager/SceneManager"), d = e("../lobbyScene/LobbyScene"), p = e("../../../framework/utils/Storage"), h = e("../../../framework/config/LSDefine"), _ = e("../../../framework/manager/DialogManager"), g = e("../lobbyScene/sendMsg/LobbySendGameHoodle"), y = cc._decorator, m = y.ccclass, v = (y.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.default.EVENT_NET_CONNECTED, this, this.on_net_connected);
s.default.on(a.default.EVENT_NET_CLOSED, this, this.on_net_closed);
s.default.on(a.default.EVENT_NET_ERROR, this, this.on_net_error);
s.default.on(u.CmdName[u.Cmd.eUnameLoginRes], this, this.on_event_uname_login);
s.default.on(u.CmdName[u.Cmd.eGuestLoginRes], this, this.on_event_guest_login);
s.default.on(u.CmdName[u.Cmd.eUnameRegistRes], this, this.on_event_uname_regist);
s.default.on("LoginLogicRes", this, this.on_event_login_logic);
};
t.prototype.on_net_connected = function(e) {
c.default.info("LoginSceneRecvMsg hcc>>>on_net_connected");
};
t.prototype.on_net_closed = function(e) {
c.default.info("LoginSceneRecvMsg hcc>>>on_net_closed");
};
t.prototype.on_net_error = function(e) {
c.default.info("LoginSceneRecvMsg hcc>>>on_net_error");
};
t.prototype.on_event_guest_login = function(e) {
var t = e.getUserData();
cc.log("guestlogin udata: ", t);
if (t.status == l.default.OK) {
f.default.getInstance().enter_scene_asyc(new d.default());
try {
var o = JSON.parse(t.userlogininfo);
p.default.set(h.default.USER_LOGIN_TYPE, h.default.LOGIN_TYPE_GUEST);
p.default.set(h.default.USER_LOGIN_GUEST_KEY, o.guest_key);
} catch (e) {
cc.error(e);
}
cc.log("on_event_guest_login: key: ", p.default.get(h.default.USER_LOGIN_GUEST_KEY));
g.default.send_login_logic();
_.default.getInstance().show_weak_hint("游客登录成功!");
} else _.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_uname_login = function(e) {
var t = e.getUserData();
cc.log("unamelogin udata: ", t);
if (t.status == l.default.OK) {
f.default.getInstance().enter_scene_asyc(new d.default());
try {
var o = JSON.parse(t.userlogininfo);
p.default.set(h.default.USER_LOGIN_TYPE, h.default.LOGIN_TYPE_UNAME);
p.default.set(h.default.USER_LOGIN_MSG, {
uname: o.uname,
upwd: o.upwd
});
} catch (e) {
cc.error(e);
}
cc.log("on_event_uname_login: ", p.default.get(h.default.USER_LOGIN_MSG));
g.default.send_login_logic();
_.default.getInstance().show_weak_hint("登录成功!");
} else _.default.getInstance().show_weak_hint("登录失败! " + t.status);
};
t.prototype.on_event_uname_regist = function(e) {
var t = e.getUserData();
t.status == l.default.OK ? _.default.getInstance().show_weak_hint("注册成功!") : _.default.getInstance().show_weak_hint("注册失败! " + t.status);
};
t.prototype.on_event_login_logic = function(e) {
e.getUserData().status == l.default.OK && g.default.send_get_ugame_info();
};
return t = r([ m ], t);
}(i.default));
o.default = v;
cc._RF.pop();
}, {
"../../../framework/config/EventDefine": "EventDefine",
"../../../framework/config/LSDefine": "LSDefine",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/manager/EventManager": "EventManager",
"../../../framework/manager/SceneManager": "SceneManager",
"../../../framework/protocol/Response": "Response",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/Log": "Log",
"../../../framework/utils/Storage": "Storage",
"../lobbyScene/LobbyScene": "LobbyScene",
"../lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle",
"./../../../framework/protocol/AuthProto": "AuthProto"
} ],
LoginSceneShowUI: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5b0d9w1nY1H1qvq/S+fiVpT", "LoginSceneShowUI");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("../../../framework/hotfix/HotUpdateNew"), a = cc._decorator, c = a.ccclass, u = (a.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.show_version();
};
t.prototype.show_version = function() {
this.set_string(this.view.KW_TEXT_VERSION, s.default.getInstance().getLocalVersion());
};
return t = r([ c ], t);
}(i.default));
o.default = u;
cc._RF.pop();
}, {
"../../../framework/hotfix/HotUpdateNew": "HotUpdateNew",
"../../../framework/uibase/UIController": "UIController"
} ],
LoginSceneTouchEvent: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bb1f1VE1k1JAI2OrPG8qYv2", "LoginSceneTouchEvent");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../../framework/uibase/UIController"), s = e("./sendMsg/LoginSendAuthMsg"), a = e("../../../framework/utils/StringUtil"), c = e("../../../framework/utils/Storage"), u = e("../../../framework/config/LSDefine"), l = e("../../../framework/manager/DialogManager"), f = cc._decorator, d = f.ccclass, p = (f.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_button_event_listener();
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_GUEST_LOGIN, this.on_click_guest_login.bind(this));
this.add_click_event(this.view.KW_BTN_LOGIN, this.on_click_uname_login.bind(this));
this.add_click_event(this.view.KW_BTN_GOTO_REGIST, this.on_click_goto_regist.bind(this));
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_regist_close.bind(this));
this.add_click_event(this.view.KW_BTN_REGIST, this.on_click_regist.bind(this));
};
t.prototype.on_click_guest_login = function(e) {
var t = c.default.get(u.default.USER_LOGIN_GUEST_KEY);
if (!t) {
t = a.default.random_string(32);
cc.log("guest login reborn: " + t + " ,len: " + t.length);
}
32 == t.length ? s.default.send_guest_login(t) : l.default.getInstance().show_weak_hint("登陆失败，guestkey生成错误!");
};
t.prototype.on_click_uname_login = function(e) {
var t = this.seek_child_by_name(this.view.KW_IMG_LOGIN_BG, "KW_INPUT_ACCOUNT"), o = this.seek_child_by_name(this.view.KW_IMG_LOGIN_BG, "KW_INPUT_PWD"), n = this.get_editbox_string(t), r = this.get_editbox_string(o);
cc.log("uname: ", n, " ,upwd: ", r);
n.length < 6 || r.length < 6 ? l.default.getInstance().show_weak_hint("用户名或密码错误，不能少于六位!") : s.default.send_uname_login(n, r);
};
t.prototype.on_click_goto_regist = function(e) {
this.set_visible(this.view.KW_IMG_LOGIN_BG, !1);
this.set_visible(this.view.KW_IMG_REGIST_BG, !0);
};
t.prototype.on_click_regist_close = function(e) {
this.set_visible(this.view.KW_IMG_LOGIN_BG, !0);
this.set_visible(this.view.KW_IMG_REGIST_BG, !1);
};
t.prototype.on_click_regist = function(e) {
var t = this.seek_child_by_name(this.view.KW_IMG_REGIST_BG, "KW_INPUT_ACCOUNT"), o = this.seek_child_by_name(this.view.KW_IMG_REGIST_BG, "KW_INPUT_PWD"), n = this.seek_child_by_name(this.view.KW_IMG_REGIST_BG, "KW_INPUT_PWD_COF"), r = this.get_editbox_string(t), i = this.get_editbox_string(o), a = this.get_editbox_string(n);
cc.log(r, i, a);
if (r.length < 6 || i.length < 6 || a.length < 6 || i != a) {
cc.error("regist error!!!");
l.default.getInstance().show_weak_hint("账号或密码错误!(不能少于6位)");
} else {
s.default.send_uname_regist(r, i);
c.default.set(u.default.USER_LOGIN_TYPE, u.default.LOGIN_TYPE_UNAME);
c.default.set(u.default.USER_LOGIN_MSG, {
uname: r,
upwd: i
});
}
};
return t = r([ d ], t);
}(i.default));
o.default = p;
cc._RF.pop();
}, {
"../../../framework/config/LSDefine": "LSDefine",
"../../../framework/manager/DialogManager": "DialogManager",
"../../../framework/uibase/UIController": "UIController",
"../../../framework/utils/Storage": "Storage",
"../../../framework/utils/StringUtil": "StringUtil",
"./sendMsg/LoginSendAuthMsg": "LoginSendAuthMsg"
} ],
LoginScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2a0400C3SRDWqfVFhCwfg2v", "LoginScene");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = function(e) {
n(t, e);
function t() {
var t = e.call(this) || this;
t._prefab_name = "ui_prefabs/login/LoginUI";
t._script_name = "LoginSceneCtrl";
t._scene_name = "LoginScene";
return t;
}
t.prototype.destroy = function(t) {
e.prototype.destroy.call(this, t);
};
return t;
}(e("../../../framework/uibase/BaseScene").default);
o.default = r;
cc._RF.pop();
}, {
"../../../framework/uibase/BaseScene": "BaseScene"
} ],
LoginSendAuthMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fa36ajSmHtMALJ/IOWSClOX", "LoginSendAuthMsg");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../../../../framework/network/NetWork"), r = e("../../../../framework/protocol/Stype"), i = e("../../../../framework/protocol/AuthProto"), s = function() {
function e() {}
e.send = function(e, t) {
n.default.getInstance().send_msg(r.Stype.Auth, e, t);
};
e.send_guest_login = function(t) {
var o = {
guestkey: String(t)
};
e.send(i.Cmd.eGuestLoginReq, o);
};
e.send_uname_login = function(t, o) {
var n = {
uname: String(t),
upwd: String(o)
};
e.send(i.Cmd.eUnameLoginReq, n);
};
e.send_uname_regist = function(t, o) {
var n = {
uname: String(t),
upwdmd5: String(o)
};
e.send(i.Cmd.eUnameRegistReq, n);
};
return e;
}();
o.default = s;
cc._RF.pop();
}, {
"../../../../framework/network/NetWork": "NetWork",
"../../../../framework/protocol/AuthProto": "AuthProto",
"../../../../framework/protocol/Stype": "Stype"
} ],
Log: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e20616dDpJB5K+F0VxzCbWW", "Log");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.info = function(t) {
for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
this._logLevel > 1 || console.info.apply(console, [ e._stack(2), e._getDateString(), t ].concat(o));
};
e.debug = function(t) {
for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
this._logLevel > 0 || console.debug.apply(console, [ e._getDateString(), t ].concat(o));
};
e.error = function(t) {
for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
console.error.apply(console, [ e._getDateString(), t ].concat(o));
};
e.warn = function(t) {
for (var o = [], n = 1; n < arguments.length; n++) o[n - 1] = arguments[n];
console.warn(e._getDateString(), t, o);
};
e._getDateString = function() {
var e = new Date(), t = e.getHours() + "", o = "";
o += (1 == t.length ? "0" + t : t) + ":";
o += (1 == (t = e.getMinutes() + "").length ? "0" + t : t) + ":";
o += (1 == (t = e.getSeconds() + "").length ? "0" + t : t) + ".";
1 == (t = e.getMilliseconds() + "").length && (t = "00" + t);
2 == t.length && (t = "0" + t);
return o = "[" + (o += t) + "]";
};
e._stack = function(e) {
var t = new Error().stack.split("");
t.shift();
var o = [];
t.forEach(function(e) {
var t, n = (e = e.substring(7)).split(" ");
n.length < 2 ? o.push(n[0]) : o.push(((t = {})[n[0]] = n[1], t));
});
var n = [];
if (e <= o.length - 1) for (var r in o[e]) n.push(r);
if (n.length > 0) {
var i = n[0].split(".");
if (i.length >= 2) return "[" + i[0] + ".js->" + i[1] + "]";
}
return "";
};
e._logLevel = 0;
e._colors = {
green: "color:#00CD00;",
blue: "color:#0066FF;",
red: "color:#FF0000;",
black: "color:#000000;"
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
MatchDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b99d9gEAXhOu6dA+F6BjRLD", "MatchDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../scene/lobbyScene/sendMsg/LobbySendGameHoodle"), a = e("../../framework/manager/EventManager"), c = e("../../framework/protocol/GameHoodleProto"), u = e("../../framework/protocol/Response"), l = e("../../framework/manager/ResourceManager"), f = cc._decorator, d = f.ccclass, p = (f.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
this.add_button_event_listener();
};
t.prototype.add_event_dispatcher = function() {
a.default.on(c.CmdName[c.Cmd.eUserStopMatchRes], this, this.on_event_match_stop);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_UI_BTN_CANCEL, this.on_click_cancel.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.on_click_cancel = function(e) {
s.default.send_user_stop_match();
this.close();
};
t.prototype.show_math_user_info = function(e) {
var t = this;
e && e.forEach(function(e) {
e.numberid;
var o = e.userinfostring, n = l.ResourceManager.getInstance().getRes("ui_prefabs/games/PrefabUserInfo", cc.Prefab);
if (n) {
var r = t.add_to_node(t.view.KW_LAYOUT_MATCH_USER, n);
if (r) {
var i = 1, s = JSON.parse(o);
s && (i = s.uface);
var a = "lobby/rectheader/1" + i;
t.set_sprite(t.seek_child_by_name(r, "KW_IMG_HEAD"), a);
t.set_string(t.seek_child_by_name(r, "KW_TEXT_NAME"), s.uname);
t.set_string(t.seek_child_by_name(r, "KW_TEXT_GOLD"), s.uchip);
t.set_visible(t.seek_child_by_name(r, "KW_TEXT_GOLD"), !0);
}
}
});
};
t.prototype.on_event_match_stop = function(e) {
var t = e.getUserData();
cc.log("on_event_match_stop", t);
if (t) {
t.status == u.default.OK && this.close();
}
};
return t = r([ d ], t);
}(i.default));
o.default = p;
cc._RF.pop();
}, {
"../../framework/manager/EventManager": "EventManager",
"../../framework/manager/ResourceManager": "ResourceManager",
"../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../framework/protocol/Response": "Response",
"../../framework/uibase/UIDialog": "UIDialog",
"../scene/lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
MyCenterDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fd099NZSXBDpodGio5QBiG/", "MyCenterDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../scene/lobbyScene/sendMsg/LobbySendAuthMsg"), a = e("../../framework/manager/SceneManager"), c = e("../scene/LoginScene/LoginScene"), u = e("../../framework/common/UserInfo"), l = cc._decorator, f = l.ccclass, d = (l.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_button_event_listener();
this.initUI();
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_BTN_EXIT, this.on_click_exit.bind(this));
};
t.prototype.initUI = function() {
this.set_string(this.view.KW_TEXT_NAME, "昵称：" + u.default.get_unick());
this.set_string(this.view.KW_TEXT_ACCOUNT, "id: " + u.default.get_numberid());
};
t.prototype.onDestroy = function() {};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.on_click_exit = function(e) {
s.default.send_login_out();
a.default.getInstance().enter_scene_asyc(new c.default());
this.close();
};
return t = r([ f ], t);
}(i.default));
o.default = d;
cc._RF.pop();
}, {
"../../framework/common/UserInfo": "UserInfo",
"../../framework/manager/SceneManager": "SceneManager",
"../../framework/uibase/UIDialog": "UIDialog",
"../scene/LoginScene/LoginScene": "LoginScene",
"../scene/lobbyScene/sendMsg/LobbySendAuthMsg": "LobbySendAuthMsg"
} ],
NetWork: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3b6586cLI9ATqz3vpOPkgaM", "NetWork");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./SocketDelegate"), r = e("./Socket"), i = e("../config/GameAppConfig"), s = e("../config/PlatForm"), a = function() {
function e() {
this._socketDelegate = null;
this._url = null;
i.default.IS_LOCAL_DEBUG ? this._url = "ws://" + i.default.LOCAL_HOST + ":" + i.default.REMOTE_WECHAT_PORT + "/ws" : s.default.isWeChatGame() ? this._url = "wss://" + i.default.REMOTE_IP + ":" + i.default.REMOTE_WECHAT_PORT + "/wss" : this._url = "ws://" + i.default.REMOTE_IP + ":" + i.default.NATIVE_PLATFORM_PORT + "/ws";
this._socketDelegate = new n.SocketDelegate();
}
e.getInstance = function() {
return e.instance;
};
e.prototype.connect = function() {
this._url && this._socketDelegate && this._socketDelegate.connect(this._url);
};
e.prototype.reconnect = function() {
if (this._url && this._socketDelegate) {
var e = this._socketDelegate.get_socket_state();
e != r.SocketState.OPEN && e != r.SocketState.CONNECTING ? this._socketDelegate.connect(this._url) : cc.warn("socket is opend or connecting");
}
};
e.prototype.close = function() {
null != this._socketDelegate && this._socketDelegate.close_connect();
};
e.prototype.send_msg = function(e, t, o) {
null != this._socketDelegate && this._socketDelegate.send_msg(e, t, o);
};
e.instance = new e();
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../config/GameAppConfig": "GameAppConfig",
"../config/PlatForm": "PlatForm",
"./Socket": "Socket",
"./SocketDelegate": "SocketDelegate"
} ],
PlatForm: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cf383h3xntDSb+5McIYkLkP", "PlatForm");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getPlatForm = function() {
return cc.sys.os;
};
e.printPlatForm = function() {
cc.log("platform:" + e.getPlatForm());
};
e.isWin32 = function() {
return cc.sys.os == cc.sys.OS_WINDOWS;
};
e.isAndroid = function() {
return cc.sys.os == cc.sys.OS_ANDROID;
};
e.isIOS = function() {
return cc.sys.os == cc.sys.OS_IOS;
};
e.isNative = function() {
return cc.sys.isNative;
};
e.isAndroidNative = function() {
return e.isNative() && e.isAndroid();
};
e.isIOSNative = function() {
return e.isNative() && e.isIOS();
};
e.isAndroidWeChatGame = function() {
return 0 == e.isNative() && e.isAndroid() && e.isWeChatGame();
};
e.isIOSWeChatGame = function() {
return 0 == e.isNative() && e.isIOS() && e.isWeChatGame();
};
e.isWeChatGame = function() {
return cc.sys.platform == cc.sys.WECHAT_GAME;
};
e.getCurDomain = function() {
return window.location.protocol + "//" + window.location.hostname;
};
e.getUserIP = function(e) {
var t = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
if (t) {
var o = new t({
iceServers: []
}), n = function() {}, r = {}, i = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
o.createDataChannel("");
o.createOffer().then(function(e) {
e.sdp.split("\n").forEach(function(e) {
e.indexOf("candidate") < 0 || e.match(i).forEach(s);
});
o.setLocalDescription(e, n, n);
}).catch(function(e) {
console.log(e);
});
o.onicecandidate = function(e) {
e && e.candidate && e.candidate.candidate && e.candidate.candidate.match(i) && e.candidate.candidate.match(i).forEach(s);
};
}
function s(t) {
r[t] || e && e(t);
r[t] = !0;
}
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Player: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e5c3dqQMlVM9qTjM/wKWk1B", "Player");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._uinfo = {};
}
e.prototype.set_uinfo = function(e) {
this._uinfo = e;
};
e.prototype.get_uinfo = function() {
return this._uinfo;
};
e.prototype.get_numberid = function() {
return this._uinfo.numberid;
};
e.prototype.get_uname = function() {
return this._uinfo.uname;
};
e.prototype.get_unick = function() {
return this._uinfo.unick;
};
e.prototype.get_seatid = function() {
return this._uinfo.seatid;
};
e.prototype.set_offline = function(e) {
this._uinfo.isoffline = e;
};
e.prototype.get_offline = function() {
return this._uinfo.isoffline;
};
e.prototype.get_is_host = function() {
return this._uinfo.ishost;
};
e.prototype.set_user_state = function(e) {
this._uinfo.userstate = e;
};
e.prototype.get_user_state = function() {
return this._uinfo.userstate;
};
e.prototype.reset = function() {
this._uinfo = {};
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
ProtoCmd: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8cf35mceqpDNqxvib1LcN9A", "ProtoCmd");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n, r = e("./TalkProto"), i = e("./AuthProto"), s = e("./SystemProto"), a = e("./GameHoodleProto"), c = e("./Stype"), u = function() {
function e() {}
e.getProtoName = function(t) {
return e.StypeProtos[t] ? e.StypeProtos[t].protoName : null;
};
e.getCmdName = function(t, o) {
return e.StypeProtos[t] ? e.StypeProtos[t].CmdName[o] : null;
};
e.StypeProtos = ((n = {})[c.Stype.Auth] = i, n[c.Stype.GameSystem] = s, n[c.Stype.GameHoodle] = a, 
n[c.Stype.TalkRoom] = r, n);
return e;
}();
o.default = u;
cc._RF.pop();
}, {
"./AuthProto": "AuthProto",
"./GameHoodleProto": "GameHoodleProto",
"./Stype": "Stype",
"./SystemProto": "SystemProto",
"./TalkProto": "TalkProto"
} ],
ProtoManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "122f55hpUlK9ouVHq9gpJGD", "ProtoManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../network/ProtoTools"), r = function() {
function e() {}
e.encrypt_cmd = function(e) {
return e;
};
e.decrypt_cmd = function(e) {
return e;
};
e._protobuf_encode = function(e, t, o, r) {
return n.default.encode_protobuf_cmd(e, t, o, r);
};
e._protobuf_decode = function(e) {
var t = n.default.decode_protobuf_cmd(e, e.byteLength);
return t && "undefined" != typeof t.stype && "undefined" != typeof t.ctype ? t : null;
};
e._json_encode = function(e, t, o, r) {
var i = JSON.stringify(r);
return n.default.encode_json_cmd(e, t, o, i);
};
e._json_decode = function(e) {
var t = n.default.decode_json_cmd(e, e.byteLength), o = t.body;
if (null !== o) try {
t.body = JSON.parse(o);
} catch (e) {
console.log(e);
return null;
}
return t && "undefined" != typeof t.stype && "undefined" != typeof t.ctype ? t : null;
};
e.encode_cmd = function(t, o, n, r) {
var i = null, s = null;
if (!(s = n == e.PROTO_JSON ? e._json_encode(t, o, e.PROTO_JSON, r) : e._protobuf_encode(t, o, e.PROTO_BUF, r))) return null;
(i = s.buffer) && (i = e.encrypt_cmd(i));
return i;
};
e.decode_cmd = function(t, o) {
var r = e.decrypt_cmd(o), i = new DataView(r);
return i.byteLength < n.default.HEADER_SIZE ? null : t == e.PROTO_JSON ? e._json_decode(i) : e._protobuf_decode(i);
};
e.PROTO_JSON = 1;
e.PROTO_BUF = 2;
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../network/ProtoTools": "ProtoTools"
} ],
ProtoTools: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b3155Cqjo5Pq7uo9Q0MS+7s", "ProtoTools");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../utils/StringUtil"), r = e("../utils/DataViewUtil"), i = e("../protocol/ProtoCmd"), s = e("../protocol/protobufMsg"), a = function() {
function e() {}
e.alloc_buffer = function(e) {
var t = new ArrayBuffer(e);
return new DataView(t);
};
e.read_int8 = function(e, t) {
return e.getInt8(t);
};
e.write_int8 = function(e, t, o) {
e.setInt8(t, o);
};
e.read_uint8 = function(e, t) {
return e.getUint8(t);
};
e.write_uint8 = function(e, t, o) {
e.setUint8(t, o);
};
e.read_int16 = function(e, t) {
return e.getInt16(t, !0);
};
e.write_int16 = function(e, t, o) {
e.setInt16(t, o, !0);
};
e.read_int32 = function(e, t) {
return e.getInt32(t, !0);
};
e.write_int32 = function(e, t, o) {
e.setInt32(t, o, !0);
};
e.read_uint32 = function(e, t) {
return e.getUint32(t, !0);
};
e.write_uint32 = function(e, t, o) {
e.setUint32(t, o, !0);
};
e.read_str = function(e, t, o) {
return r.default.read_utf8(e, t, o);
};
e.write_str = function(e, t, o) {
r.default.write_utf8(e, t, o);
};
e.write_uint8_array = function(e, t, o) {
r.default.write_uint8_array(e, t, o);
};
e.read_uint8_array = function(e, t, o) {
return r.default.read_uint8_array(e, t, o);
};
e.read_float = function(e, t) {
return e.getFloat32(t, !0);
};
e.write_float = function(e, t, o) {
e.setFloat32(t, o, !0);
};
e.string_to_uint8_array = function(e) {
for (var t = e.length, o = new Uint8Array(t), n = 0; n < t; n++) o[n] = e.charCodeAt(n);
return o;
};
e.uint8_array_to_string = function(e) {
for (var t = new String(), o = 0; o < e.length; o++) t += String.fromCharCode(e[o]);
return t;
};
e.write_cmd_header_inbuf = function(t, o, n, r) {
e.write_int16(t, 0, o);
e.write_int16(t, 2, n);
e.write_uint32(t, 4, 0);
e.write_int16(t, 8, r);
return e.HEADER_SIZE;
};
e.encode_json_cmd = function(t, o, r, i) {
var s = n.default.utf8_byte_len(i), a = e.HEADER_SIZE + s, c = e.alloc_buffer(a), u = e.write_cmd_header_inbuf(c, t, o, r);
e.write_str(c, u, i);
return c;
};
e.decode_json_cmd = function(t, o) {
var n = {};
n.stype = e.read_int16(t, 0);
n.ctype = e.read_int16(t, 2);
n.utag = e.read_int32(t, 4);
n.proto_type = e.read_int16(t, 8);
o > e.HEADER_SIZE && (n.body = e.read_str(t, e.HEADER_SIZE, o - e.HEADER_SIZE));
return n;
};
e.decode_protobuf_cmd = function(t, o) {
var n = {};
n.stype = e.read_int16(t, 0);
n.ctype = e.read_int16(t, 2);
n.utag = e.read_int32(t, 4);
n.proto_type = e.read_int16(t, 8);
if (o > e.HEADER_SIZE) {
var r = e.read_uint8_array(t, e.HEADER_SIZE, o - e.HEADER_SIZE), a = i.default.getProtoName(n.stype), c = i.default.getCmdName(n.stype, n.ctype);
if (!a || !c) {
cc.error("decode_protobuf stype_name or cmd_name null");
return n;
}
if (!s[a]) {
cc.error("decode_protobuf stype_name null");
return n;
}
var u = s[a][c];
if (!u) {
cc.error("decode_protobuf msgType is null");
return n;
}
var l = null;
try {
l = u.decode(new Uint8Array(r));
} catch (e) {
cc.error(e);
return n;
}
n.body = l;
}
return n;
};
e.encode_protobuf_cmd = function(t, o, n, r) {
var a = i.default.getProtoName(t), c = i.default.getCmdName(t, o);
if (!a || !c) {
cc.error("encode_protobuf stype_name or cmd_name null");
return null;
}
if (!s[a]) {
cc.error("encode_protobuf stype_name null");
return null;
}
var u = s[a][c];
if (!u) {
cc.error("encode_protobuf msgType is null");
return null;
}
r || (r = {});
var l = u.verify(r);
if (l) {
cc.error("encode_protobuf error: ", l);
return null;
}
var f = u.create(r);
if (f) try {
var d = u.encode(f).finish(), p = d.byteLength, h = e.HEADER_SIZE + p, _ = e.alloc_buffer(h), g = e.write_cmd_header_inbuf(_, t, o, n);
e.write_uint8_array(_, g, d);
return _;
} catch (l) {
cc.error(l);
}
};
e.HEADER_SIZE = 10;
return e;
}();
o.default = a;
cc._RF.pop();
}, {
"../protocol/ProtoCmd": "ProtoCmd",
"../protocol/protobufMsg": "protobufMsg",
"../utils/DataViewUtil": "DataViewUtil",
"../utils/StringUtil": "StringUtil"
} ],
Queue: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d265eZvxhFMSp5zvfxiJ4MW", "Queue");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._dataStore = [];
}
e.prototype.enqueue = function(e) {
this._dataStore.push(e);
};
e.prototype.dequeue = function() {
this.empty() || this._dataStore.shift();
};
e.prototype.empty = function() {
return 0 === this._dataStore.length;
};
e.prototype.front = function() {
return this.empty() ? null : this._dataStore[0];
};
e.prototype.back = function() {
return this.empty() ? null : this._dataStore[this._dataStore.length - 1];
};
e.prototype.toString = function() {
return this._dataStore.join("\n");
};
e.prototype.clear = function() {
delete this._dataStore;
this._dataStore = [];
};
e.prototype.forEach = function(e, t) {
this._dataStore.forEach(function(t, o) {
e(o, t);
});
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
ResourceManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "affe0asF+1P24txmSV2T3Qb", "ResourceManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.getInstance = function() {
return e.instance;
};
e.prototype.loadResDirAsyc = function(e, t, o) {
cc.loader.loadResDir(e, function(e, o, n) {
t && t(e, o, n);
}, function(e, t, n) {
o && o(e, t, n);
});
};
e.prototype.releaseResDir = function(e, t) {
cc.loader.releaseResDir(e, t);
};
e.prototype.loadResAsyc = function(e, t, o, n) {
cc.loader.loadRes(e, t, function(e, t, o) {
n && n(e, t, o);
}, function(t, n) {
if (o) {
t && cc.warn("load res fail, path=" + e + ", err=" + t);
o(t, n);
}
});
};
e.prototype.releaseRes = function(e) {
cc.loader.releaseRes(e);
};
e.prototype.getRes = function(e, t) {
var o = cc.loader.getRes(e, t);
o || cc.warn("preload res path: " + e + " not exist");
return o;
};
e.instance = new e();
return e;
}();
o.ResourceManager = n;
cc._RF.pop();
}, {} ],
Response: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "087d5/Zm2NBJLvG1Y/EMixU", "Response");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.default = {
OK: 1,
INVALID_PARAMS: -100,
SYSTEM_ERR: -101,
ILLEGAL_ACCOUNT: -102,
INVALIDI_OPT: -103,
PHONE_IS_REG: -104,
PHONE_CODE_ERR: -105,
UNAME_OR_UPWD_ERR: -106,
PHONE_IS_NOT_REG: -107,
RANK_IS_EMPTY: -108,
INVALID_ZONE: -109,
CHIP_IS_NOT_ENOUGH: -110,
VIP_IS_NOT_ENOUGH: -111,
NOT_YOUR_TURN: -112
};
cc._RF.pop();
}, {} ],
RoomData: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "63199ymPE1CPZiPGB7Xizcv", "RoomData");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./Player"), r = e("../../framework/common/UserInfo"), i = function() {
function e() {
this._player_set = {};
this._game_rule = "";
this._room_id = "";
this._play_count = 0;
this._total_play_count = 0;
}
e.getInstance = function() {
return e.instance;
};
e.prototype.set_game_rule = function(e) {
this._game_rule = e;
};
e.prototype.get_game_rule = function() {
return this._game_rule;
};
e.prototype.set_room_id = function(e) {
this._room_id = e;
};
e.prototype.get_room_id = function() {
return this._room_id;
};
e.prototype.set_play_count = function(e) {
this._play_count = e;
};
e.prototype.get_play_count = function() {
return this._play_count;
};
e.prototype.set_totl_play_count = function(e) {
this._total_play_count = e;
};
e.prototype.get_total_play_count = function() {
return this._total_play_count;
};
e.prototype.add_player_by_uinfo = function(e) {
var t = e.seatid;
if (!t) return !1;
if (t) if (this._player_set[t]) this._player_set[t].set_uinfo(e); else {
var o = new n.default();
o.set_uinfo(e);
this._player_set[o.get_seatid()] = o;
}
return !0;
};
e.prototype.delete_player = function(e) {
this._player_set[e.get_seatid()] && delete this._player_set[e.get_seatid()];
};
e.prototype.clear_player = function() {
this._player_set = {};
};
e.prototype.get_player = function(e) {
return this._player_set[e];
};
e.prototype.get_all_player = function() {
return this._player_set;
};
e.prototype.get_self_seatid = function() {
for (var e in this._player_set) {
var t = this._player_set[e];
if (t.get_numberid() == r.default.get_numberid()) return t.get_seatid();
}
return -1;
};
e.prototype.clear_room_data = function() {
this.set_game_rule("");
this.set_play_count(0);
this.set_totl_play_count(0);
this.set_room_id("");
this.clear_player();
};
e.instance = new e();
return e;
}();
o.default = i;
cc._RF.pop();
}, {
"../../framework/common/UserInfo": "UserInfo",
"./Player": "Player"
} ],
SDKAdapter: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b496586NKxHA5WafcunblAI", "SDKAdapter");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.prototype.callJavaStaticFunc = function(e, t, o) {
for (var n, r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
if (cc.sys.isNative && cc.sys.platform == cc.sys.ANDROID) return (n = jsb.reflection).callStaticMethod.apply(n, [ e, t, o ].concat(r));
};
e.prototype.callOcStaticFunc = function(e, t) {
for (var o, n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
if (cc.sys.isNative && cc.sys.platform == cc.sys.IPHONE) return (o = jsb.reflection).callStaticMethod.apply(o, [ e, t ].concat(n));
};
return e;
}();
o.SDKAdapter = n;
cc._RF.pop();
}, {} ],
SceneManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d8bcfapRupGsqd1XJ9v9xZy", "SceneManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this._curScene = null;
this._curScene;
}
e.getInstance = function() {
return e.instance;
};
e.prototype.enter_scene_asyc = function(e) {
if (e && e.preload) {
var t = this;
e.preload(function(o, n) {
if (o) cc.error("enter_scene_asyc error: ", o); else {
if (t._curScene) {
var r = t._curScene.get_name() != e.get_name();
t._curScene.destroy(r);
}
t._curScene = e;
cc.log("enter scene:", t._curScene.get_name());
}
}, function(e, t, o) {
cc.log("preload scene: %" + e / t * 100);
});
}
};
e.instance = new e();
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
SettingDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6f2ea8cxHNCU7Wuyh+BArPU", "SettingDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../scene/lobbyScene/LobbyScene"), a = e("../../framework/manager/SceneManager"), c = e("../scene/lobbyScene/sendMsg/LobbySendGameHoodle"), u = e("../../framework/manager/EventManager"), l = e("../../framework/protocol/GameHoodleProto"), f = e("../../framework/protocol/Response"), d = e("../common/RoomData"), p = cc._decorator, h = p.ccclass, _ = (p.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
this.add_event_dispatcher();
this.add_button_event_listener();
};
t.prototype.add_event_dispatcher = function() {
u.default.on(l.CmdName[l.Cmd.eJoinRoomRes], this, this.on_event_exit_room);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
this.add_click_event(this.view.KW_BTN_EXIT, this.on_click_back.bind(this));
this.add_click_event(this.view.KW_BTN_DESSOLVE, this.on_click_dessolve.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.on_click_back = function(e) {
c.default.send_exit_room();
this.close();
a.default.getInstance().enter_scene_asyc(new s.default());
d.default.getInstance().clear_room_data();
};
t.prototype.on_click_dessolve = function(e) {
c.default.send_dessolve_room();
this.close();
};
t.prototype.on_event_exit_room = function(e) {
var t = e.getUserData();
if (t) {
t.status == f.default.OK && this.close();
}
};
return t = r([ h ], t);
}(i.default));
o.default = _;
cc._RF.pop();
}, {
"../../framework/manager/EventManager": "EventManager",
"../../framework/manager/SceneManager": "SceneManager",
"../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../framework/protocol/Response": "Response",
"../../framework/uibase/UIDialog": "UIDialog",
"../common/RoomData": "RoomData",
"../scene/lobbyScene/LobbyScene": "LobbyScene",
"../scene/lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
SocketDelegate: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8879fsbaW5DSpSBr7VqgJCJ", "SocketDelegate");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("./Socket"), r = e("../manager/ProtoManager"), i = e("../manager/EventManager"), s = e("../protocol/ProtoCmd"), a = e("../protocol/Stype"), c = e("../config/EventDefine"), u = e("../config/GameAppConfig"), l = function() {
function e() {}
e.prototype.on_socket_open = function() {
i.default.emit(c.default.EVENT_NET_CONNECTED);
};
e.prototype.on_socket_message = function(e) {
var t = r.default.decode_cmd(u.default.PROTO_TYPE, e);
if (t) {
var o = s.default.getCmdName(t.stype, t.ctype);
cc.log("\n\n###########################>>>recvstart");
if (o) {
cc.log("Svr:", a.StypeName[t.stype], ",xyname:", o, ",xyid:", t.ctype);
var n = "";
try {
n = JSON.stringify(t.body);
} catch (e) {}
cc.log(n);
}
cc.log("###########################>>>recvend\n\n");
o && i.default.emit(o, t.body);
}
};
e.prototype.on_socket_error = function(e) {
i.default.emit(c.default.EVENT_NET_ERROR);
};
e.prototype.on_socket_closed = function(e) {
this._socket && this._socket.close();
this._socket = null;
i.default.emit(c.default.EVENT_NET_CLOSED);
};
e.prototype.connect = function(e) {
cc.log("socket is connecting address:", e);
this._socket = new n.WSocket(e, this);
this._socket.connect();
};
e.prototype.close_connect = function() {
this._socket && this._socket.close();
};
e.prototype.get_socket_state = function() {
return this._socket ? this._socket.get_state() : n.SocketState.CLOSED;
};
e.prototype.send_msg = function(e, t, o) {
if (this._socket && this._socket.get_state() == n.SocketState.OPEN) {
var i = r.default.encode_cmd(e, t, u.default.PROTO_TYPE, o);
i && this._socket.send(i);
}
};
return e;
}();
o.SocketDelegate = l;
cc._RF.pop();
}, {
"../config/EventDefine": "EventDefine",
"../config/GameAppConfig": "GameAppConfig",
"../manager/EventManager": "EventManager",
"../manager/ProtoManager": "ProtoManager",
"../protocol/ProtoCmd": "ProtoCmd",
"../protocol/Stype": "Stype",
"./Socket": "Socket"
} ],
Socket: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d67cdeb+TpMv5AotsU65cH9", "Socket");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
(function(e) {
e[e.CONNECTING = 1] = "CONNECTING";
e[e.OPEN = 2] = "OPEN";
e[e.CLOSING = 3] = "CLOSING";
e[e.CLOSED = 4] = "CLOSED";
})(n = o.SocketState || (o.SocketState = {}));
var r = function() {
function e(e, t) {
this._url = "";
this._webSocket = null;
this._delegate = null;
this._url = e;
this._delegate = t;
}
e.prototype.connect = function() {
var e = this, t = this._webSocket = new WebSocket(this._url);
t.binaryType = "arraybuffer";
t.onopen = function(t) {
cc.log("WSocket websocket connect " + e._url + " success!!");
e._delegate.on_socket_open();
};
t.onmessage = function(t) {
e._delegate.on_socket_message(t.data);
};
t.onerror = function(t) {
e._delegate.on_socket_error(null);
cc.error("WSocket websocket connect " + e._url + " error");
};
t.onclose = function(t) {
e._delegate.on_socket_closed(t.reason);
cc.error("WSocket websocket connect " + e._url + " closed");
};
};
e.prototype.send = function(e) {
this._webSocket && this._webSocket.send(e);
};
e.prototype.close = function() {
if (this._webSocket) {
try {
this._webSocket.close();
} catch (e) {
cc.error("error while closing webSocket ", e.toString());
}
this._webSocket = null;
}
};
e.prototype.get_state = function() {
if (this._webSocket) switch (this._webSocket.readyState) {
case WebSocket.OPEN:
return n.OPEN;

case WebSocket.CONNECTING:
return n.CONNECTING;

case WebSocket.CLOSING:
return n.CLOSING;

case WebSocket.CLOSED:
return n.CLOSED;
}
return n.CLOSED;
};
return e;
}();
o.WSocket = r;
cc._RF.pop();
}, {} ],
State: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "dba3eHY0vVOmKNBGPH9dTZK", "State");
Object.defineProperty(o, "__esModule", {
value: !0
});
o.UserState = {
InView: 1,
Ready: 2,
Playing: 3,
CheckOut: 4
};
o.GameState = {
InView: 1,
Gameing: 2,
CheckOut: 3
};
o.PlayerPower = {
canNotPlay: 0,
canPlay: 1
};
o.BallState = {
stop: 0,
moving: 1
};
cc._RF.pop();
}, {} ],
Storage: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "53fd1RHcz1DC5LG2b2tgL+T", "Storage");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.set = function(e, t) {
cc.sys.localStorage.setItem(e, JSON.stringify(t));
};
e.get = function(e) {
var t = cc.sys.localStorage.getItem(e), o = null;
if (t && "undefined" != t && void 0 != t) try {
o = JSON.parse(t);
} catch (e) {
cc.error(e);
}
return o;
};
e.remove = function(e) {
cc.sys.localStorage.removeItem(e);
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
StoreDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1e6b7TfIBpHB56GgbNzH49u", "StoreDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/uibase/UIDialog"), s = e("../../framework/manager/EventManager"), a = e("../../framework/protocol/GameHoodleProto"), c = e("../../framework/protocol/Response"), u = e("../scene/gameScene/sendMsg/GameSendGameHoodle"), l = e("../../framework/manager/ResourceManager"), f = e("../../framework/utils/ArrayUtil"), d = e("../../framework/manager/DialogManager"), p = e("../scene/lobbyScene/sendMsg/LobbySendGameHoodle"), h = e("../../framework/common/UserInfo"), _ = cc._decorator, g = _.ccclass, y = (_.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
this.add_event_dispatcher();
this.add_button_event_listener();
};
t.prototype.start = function() {
this.initUI();
u.default.send_store_list_req();
};
t.prototype.add_event_dispatcher = function() {
s.default.on(a.CmdName[a.Cmd.eStoreListRes], this, this.on_event_store_list);
s.default.on(a.CmdName[a.Cmd.eBuyThingsRes], this, this.on_event_buy_things);
s.default.on(a.CmdName[a.Cmd.eUserGameInfoRes], this, this.on_event_ugame_info);
};
t.prototype.add_button_event_listener = function() {
this.add_click_event(this.view.KW_BTN_CLOSE, this.on_click_close.bind(this));
};
t.prototype.onDestroy = function() {};
t.prototype.initUI = function() {
this.clear_ball_layout();
this.set_string(this.view.KW_TEXT_MY_CHIP, "我的金币：" + h.default.get_uchip());
};
t.prototype.on_click_close = function(e) {
this.close();
};
t.prototype.onKeyDown = function(t) {
e.prototype.onKeyDown.call(this, t);
};
t.prototype.on_event_store_list = function(e) {
var t = e.getUserData();
if (t) {
t.status == c.default.OK && this.show_store_product_info(t.storeprops);
}
};
t.prototype.on_event_buy_things = function(e) {
var t = e.getUserData();
if (t) {
if (t.status == c.default.OK) {
p.default.send_get_ugame_info();
d.default.getInstance().show_weak_hint("购买成功!");
} else d.default.getInstance().show_weak_hint("购买失败,金币不足!");
}
};
t.prototype.on_event_ugame_info = function(e) {
var t = e.getUserData();
cc.log("on_event_ugame_info", t);
if (t) {
if (t.status == c.default.OK) {
var o = JSON.parse(t.userinfostring).uchip;
this.set_string(this.view.KW_TEXT_MY_CHIP, "我的金币：" + String(o));
}
}
};
t.prototype.clear_ball_layout = function() {
var e = this.view.KW_SCROLLVIEW_NEW;
if (e) {
var t = this.seek_child_by_name(e, "content"), o = this.seek_child_by_name(t, "KW_LAYOUT");
o && o.removeAllChildren();
}
};
t.prototype.show_store_product_info = function(e) {
this.clear_ball_layout();
cc.log("hcc>>storeprops_obj: ", e);
if (e && !(f.default.GetArrayLen(e) <= 0)) {
var t = this.view.KW_SCROLLVIEW_NEW, o = this.seek_child_by_name(t, "KW_LAYOUT"), n = 0, r = null;
if (t) {
for (var i in e) {
var s = e[i], a = JSON.parse(s.propinfo), c = l.ResourceManager.getInstance().getRes("ui_prefabs/games/StoreProduct", cc.Prefab);
if (c) {
var u = this.add_to_node(o, c);
if (u) {
this.set_string(this.seek_child_by_name(u, "KW_TEXT_PRICE"), s.propprice + "金币");
this.set_string(this.seek_child_by_name(u, "KW_TEXT_LEVEL"), a.level + "级");
this.add_click_evenet_with_data(u, "on_click_product", s);
}
var d = u.getContentSize();
n++;
r = d;
}
}
var p = this.seek_child_by_name(t, "content");
if (p && n > 30) {
var h = r.height * Math.ceil(n / 5) + 200;
p.setContentSize(p.getContentSize().width, h);
}
}
}
};
t.prototype.on_click_product = function(e, t) {
if (t) {
cc.log("hcc>>click: ", t);
var o = {
propsvrindex: t.propsvrindex,
propid: t.propid,
propcount: t.propcount,
propprice: t.propprice,
propinfo: t.propinfo
};
d.default.getInstance().show_common_dialog(2, function(e) {
if (e) {
var n = JSON.parse(t.propinfo), r = "确定将购买" + t.propcount + "个" + n.level + "级弹珠吗?需要" + t.propprice + "金币哦!";
e.set_content_text(r);
e.set_btn_callback(function() {
u.default.send_buy_product(o);
});
}
});
}
};
return t = r([ g ], t);
}(i.default));
o.default = y;
cc._RF.pop();
}, {
"../../framework/common/UserInfo": "UserInfo",
"../../framework/manager/DialogManager": "DialogManager",
"../../framework/manager/EventManager": "EventManager",
"../../framework/manager/ResourceManager": "ResourceManager",
"../../framework/protocol/GameHoodleProto": "GameHoodleProto",
"../../framework/protocol/Response": "Response",
"../../framework/uibase/UIDialog": "UIDialog",
"../../framework/utils/ArrayUtil": "ArrayUtil",
"../scene/gameScene/sendMsg/GameSendGameHoodle": "GameSendGameHoodle",
"../scene/lobbyScene/sendMsg/LobbySendGameHoodle": "LobbySendGameHoodle"
} ],
StringUtil: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "72e51JU+yVMHro+fnVo9EFs", "StringUtil");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.random_string = function(e) {
for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", o = t.length, n = "", r = 0; r < e; r++) n += t.charAt(Math.floor(Math.random() * o));
return n;
};
e.random_int_str = function(e) {
for (var t = "0123456789".length, o = "", n = 0; n < e; n++) o += "0123456789".charAt(Math.floor(Math.random() * t));
return o;
};
e.random_int = function(e, t) {
var o = e + Math.random() * (t - e + 1);
(o = Math.floor(o)) > t && (o = t);
return o;
};
e.utf8_byte_len = function(e) {
for (var t = 0, o = 0; o < e.length; o++) {
var n = e.charCodeAt(o);
n < 127 ? t += 1 : 128 <= n && n <= 2047 ? t += 2 : 2048 <= n && n <= 65535 && (t += 3);
}
return t;
};
e.str_repeat = function(e, t) {
for (var o = []; t > 0; o[--t] = e) ;
return o.join("");
};
e.format = function() {
for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
for (var o, n, r, i, s, a = 0, c = arguments[a++], u = []; c; ) {
if (n = /^[^\x25]+/.exec(c)) u.push(n[0]); else if (n = /^\x25{2}/.exec(c)) u.push("%"); else {
if (!(n = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(c))) throw "unkown error ?!";
if (null == (o = arguments[n[1] || a++]) || void 0 == o) throw "Too few arguments.";
if (/[^s]/.test(n[7]) && "number" != typeof o) throw "Expecting number but found " + typeof o;
switch (n[7]) {
case "b":
o = o.toString(2);
break;

case "c":
o = String.fromCharCode(o);
break;

case "d":
o = parseInt(o);
break;

case "e":
o = n[6] ? o.toExponential(n[6]) : o.toExponential();
break;

case "f":
o = n[6] ? parseFloat(o).toFixed(n[6]) : parseFloat(o);
break;

case "o":
o = o.toString(8);
break;

case "s":
o = (o = String(o)) && n[6] ? o.substring(0, n[6]) : o;
break;

case "u":
o = Math.abs(o);
break;

case "x":
o = o.toString(16);
break;

case "X":
o = o.toString(16).toUpperCase();
}
o = /[def]/.test(n[7]) && n[2] && o >= 0 ? "+" + o : o;
i = n[3] ? "0" == n[3] ? "0" : n[3].charAt(1) : " ";
s = n[5] - String(o).length - "".length;
r = n[5] ? this.str_repeat(i, s) : "";
u.push("" + (n[4] ? o + r : r + o));
}
c = c.substring(n[0].length);
}
return u.join("");
};
e.getNumberSuffixByString = function(e) {
for (var t = e.length, o = -1, n = 1; n < t; ++n) {
var r = Number(e.substr(-n));
if (!r && 0 != r) return o;
o = r;
}
return o;
};
e.uint8ArrayToString = function(e) {
for (var t = "", o = 0; o < e.length; o++) t += String.fromCharCode(e[o]);
return t;
};
e.stringToUint8Array = function(e) {
for (var t = [], o = 0, n = e.length; o < n; ++o) t.push(e.charCodeAt(o));
return new Uint8Array(t);
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
Stype: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0dca7qgPABC3IsspaQziixc", "Stype");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
o.Stype = {
Auth: 1,
GameSystem: 2,
GameHoodle: 3,
TalkRoom: 4
};
o.StypeName = ((n = {})[1] = "Auth", n[2] = "GameSystem", n[3] = "GameHoodle", n[4] = "TalkRoom", 
n);
cc._RF.pop();
}, {} ],
SystemProto: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "561b8B6G/FHPqOkni/HeNRv", "SystemProto");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
o.protoName = "SystemProto";
(function(e) {
e[e.INVALED = 0] = "INVALED";
})(o.Cmd || (o.Cmd = {}));
o.CmdName = ((n = {})[0] = "INVALED", n);
cc._RF.pop();
}, {} ],
TableViewCell: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ce4ac0jgjFPjJjwBfjllEGC", "TableViewCell");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, a = (i.property, function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.getSize = function(e, t) {
return 0;
};
t.prototype.init = function(e, t, o) {};
t.prototype.uninit = function() {};
t.prototype.reload = function(e) {};
return t = r([ s ], t);
}(e("../UIController").default));
o.default = a;
cc._RF.pop();
}, {
"../UIController": "UIController"
} ],
TableView: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0a31cG/+fNHy4+ktw8XqkXZ", "TableView");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = cc._decorator, s = i.ccclass, a = i.property, c = cc.Enum({
Horizontal: 0,
Vertical: 1
}), u = (cc.Enum({
Single: 0,
Multiple: 1
}), function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.horizontal = !1;
t.vertical = !0;
t.scrollEvents = [];
t._cell = null;
t.spacing = 0;
t.cellPool = new cc.NodePool("TableViewCell");
t.cellData = null;
t.cellCount = 0;
t.childCount = 0;
t.startIndex = 0;
t.maxStartIndex = 0;
t.endIndex = 0;
t.lowestIndex = 0;
t.anchorCenterX = 0;
t.anchorCenterY = 0;
t.anchorLeftX = 0;
t.anchorTopY = 0;
t.cellAnchorX = 0;
t.cellAnchorY = 0;
t.customSize = !1;
t.cellAccumSizes = [];
t.cellSizes = [];
t.cellSize = 0;
t.updateRefreshOnce = !1;
t.updateRefreshForce = !1;
t.updateCellsOn = !1;
t.updateCellsOnce = !1;
t._callback = null;
return t;
}
Object.defineProperty(t.prototype, "cell", {
get: function() {
return this._cell;
},
set: function(e) {
this.clear();
this.cellPool.clear();
this._cell = e;
},
enumerable: !0,
configurable: !0
});
Object.defineProperty(t.prototype, "scrollModel", {
get: function() {
return this.horizontal ? c.Horizontal : c.Vertical;
},
set: function(e) {
cc.error("[TableView] 不允许动态修改scrollModel");
},
enumerable: !0,
configurable: !0
});
t.prototype.reset = function() {
this.cellData = null;
this.cellCount = 0;
this.childCount = 0;
this.startIndex = 0;
this.maxStartIndex = 0;
this.endIndex = 0;
this.lowestIndex = 0;
this.anchorCenterX = 0;
this.anchorCenterY = 0;
this.anchorLeftX = 0;
this.anchorTopY = 0;
this.cellAnchorX = 0;
this.cellAnchorY = 0;
this.cellAccumSizes = [];
this.cellSizes = [];
this.cellSize = 0;
this.updateRefreshOnce = !1;
this.updateRefreshForce = !1;
this.updateCellsOn = !1;
this.updateCellsOnce = !1;
};
t.prototype.onDestroy = function() {
for (;this.cellPool.size(); ) this.cellPool.get().destroy();
};
t.prototype.onEnable = function() {
this.node.on("scroll-began", this.onScrollBegin, this);
this.node.on("scroll-ended", this.onScrollEnd, this);
e.prototype.onEnable && e.prototype.onEnable.call(this);
};
t.prototype.onDisable = function() {
this.node.off("scroll-began", this.onScrollBegin, this);
this.node.off("scroll-ended", this.onScrollEnd, this);
e.prototype.onDisable && e.prototype.onDisable.call(this);
};
t.prototype.onScrollBegin = function() {
this.updateCellsOn = !0;
};
t.prototype.onScrollEnd = function() {
this.updateCellsOn = !1;
this.updateCellsOnce = !0;
};
t.prototype.getCellCount = function() {
return this.cellCount;
};
t.prototype.setCellCount = function(e) {
"number" == typeof e && e >= 0 ? this.cellCount = e : cc.error("[TableView] setCellCount 参数错误");
};
t.prototype.getCellData = function() {
return this.cellData;
};
t.prototype.setCellData = function(e) {
"undefined" != typeof e && (this.cellData = e);
};
t.prototype.getCellRange = function() {
var e = this.content.children;
return 0 == e.length ? {
min: -1,
max: -1
} : {
min: e[0].tvIndex,
max: e[e.length - 1].tvIndex
};
};
t.prototype.refreshScrollBar = function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
};
t.prototype.refresh = function(e) {
void 0 === e && (e = !0);
this.updateRefreshOnce = !0;
e && (this.updateRefreshForce = !0);
};
t.prototype.refreshSync = function(e) {
void 0 === e && (e = !0);
this.stopRefresh();
this.initData();
this.updateCells(e);
};
t.prototype.stopRefresh = function() {
this.updateRefreshOnce = !1;
this.updateRefreshForce = !1;
};
t.prototype.init = function(e, t) {
0;
this.clear();
this.setCellData(t || null);
this.setCellCount(e);
this.initData();
this.stopAutoScroll();
this.scrollToOrigin();
this.updateCells(!0);
};
t.prototype.clear = function() {
this.cellCount = 0;
this.childCount = 0;
this.startIndex = 0;
this.endIndex = 0;
this.maxStartIndex = 0;
this.lowestIndex = 0;
this.content[this.horizontal ? "width" : "height"] = 0;
this.stopRefresh();
this.updateCellCount();
};
t.prototype.reload = function(e, t) {
var o = this;
void 0 === e && (e = 0);
if ("undefined" == typeof t) this.content.children.forEach(function(t) {
t.tvIndex >= e && o.reloadCell(t);
}); else {
if (t <= 0) return;
e < 0 && (e += this.cellCount);
if (e + t < 0) return;
this.content.children.forEach(function(n) {
n.tvIndex >= e && n.tvIndex < e + t && o.reloadCell(n);
});
}
};
t.prototype.insert = function(e, t, o) {
void 0 === e && (e = -1);
void 0 === t && (t = 1);
if (!(t <= 0)) {
e < 0 && (e = e + this.cellCount + 1);
e < 0 && (e = 0);
this.setCellData(o);
for (var n = this.content.children, r = n.length - 1; r >= 0; r--) {
var i = n[r];
i._tvIndex >= e && (i._tvIndex += t);
}
this.setCellCount(this.cellCount + t);
this.refresh();
}
};
t.prototype.remove = function(e, t, o) {
void 0 === e && (e = -1);
void 0 === t && (t = 1);
if (!(t <= 0)) {
e < 0 && (e += this.cellCount);
var n = e + t;
e < 0 && (e = 0);
n > this.cellCount && (n = this.cellCount);
t = n - e;
if (!(e >= this.cellCount || n <= 0 || t < 0 || e >= n)) {
this.setCellData(o);
for (var r = this.content.children, i = r.length - 1; i >= 0; i--) {
var s = r[i];
s._tvIndex >= e && (s._tvIndex < n ? s._tvIndex = -1 : s._tvIndex -= t);
}
this.setCellCount(this.cellCount - t);
this.refresh();
}
}
};
t.prototype.getCell = function() {
var e = null;
(e = this.cellPool.size() ? this.cellPool.get() : cc.instantiate(this.cell)).tvIndex = -1;
e._tvIndex = -1;
return e;
};
t.prototype.putCell = function(e) {
this.cellPool.put(e);
};
t.prototype.initCell = function(e, t) {
if (t >= 0) {
if (e.tvIndex != t || e.tvIndex != e._tvIndex) {
var o = e.getComponent("TableViewCell");
e.tvIndex >= 0 && o.uninit();
o.init(t, this.cellData, this);
}
e.tvIndex = t;
e._tvIndex = t;
}
};
t.prototype.uninitCell = function(e) {
if (e.tvIndex >= 0) {
e.getComponent("TableViewCell").uninit();
e.tvIndex = -1;
e._tvIndex = -1;
}
};
t.prototype.reloadCell = function(e) {
e.getComponent("TableViewCell").reload(this.cellData);
};
t.prototype.getViewCell = function() {
if (this.cell) {
var e = this.cell.data.getComponent("TableViewCell");
if (e) return e.constructor || cc.js.getClassByName(cc.js.getClassName(e));
}
return null;
};
t.prototype.getDefaultCellSize = function() {
if (this.cell) {
0;
return this.cell.data.getContentSize();
}
return cc.Size.ZERO;
};
t.prototype.getDefaultCellAnchor = function() {
return this.cell ? this.cell.data.getAnchorPoint() : cc.Vec2.ZERO;
};
t.prototype.getScrollLengh = function() {
var e = this.getScrollOffset(), t = this.horizontal ? -e.x : e.y;
return t < 0 ? 0 : t;
};
t.prototype.initData = function() {
this.getViewCell();
var e = this.getDefaultCellSize(), t = this.horizontal ? "width" : "height", o = this.content.parent[t];
this.cellSize = e[t];
this.cellAccumSizes.length = 0;
this.cellSizes.length = 0;
this.maxStartIndex = 0;
this.startIndex = 0;
this.endIndex = 0;
this.childCount = Math.min(Math.ceil(o / (this.cellSize + this.spacing * (this.cellCount - 1) / this.cellCount)) + 1, this.cellCount);
this.cellCount > this.childCount ? this.maxStartIndex = this.cellCount - this.childCount : this.maxStartIndex = 0;
this.content[t] = this.cellSize * this.cellCount + this.spacing * (this.cellCount - 1);
var n = this.getDefaultCellAnchor();
this.anchorCenterX = (.5 - this.content.anchorX) * this.content.width;
this.anchorCenterY = (.5 - this.content.anchorY) * this.content.height;
this.anchorLeftX = (0 - this.content.anchorX) * this.content.width;
this.anchorTopY = (1 - this.content.anchorY) * this.content.height;
this.cellAnchorX = n.x;
this.cellAnchorY = 1 - n.y;
};
t.prototype.updateCellCount = function() {
var e = this.content.children;
if (e.length != this.childCount) if (e.length > this.childCount) {
for (var t = null, o = e.length - 1; o >= this.childCount; o--) if ((t = e[o])._tvIndex < this.startIndex || t._tvIndex > this.endIndex) {
this.uninitCell(t);
this.putCell(t);
}
for (o = e.length - 1; o >= this.childCount; o--) {
t = e[o];
this.uninitCell(t);
this.putCell(t);
}
} else for (o = e.length; o < this.childCount; o++) this.content.addChild(this.getCell());
};
t.prototype.getStartIndex = function(e) {
var t = this.maxStartIndex, o = Math.floor(e / (this.cellSize + this.spacing * (this.cellCount - 1) / this.cellCount));
o < 0 ? o = 0 : o > t && (o = t);
return o;
};
t.prototype.updateCellRange = function() {
var e = this.getScrollLengh();
this.startIndex = this.getStartIndex(e);
this.endIndex = this.startIndex + this.childCount - 1;
};
t.prototype.updateCell = function(e, t) {
if ("number" == typeof t) this.initCell(e, t); else {
this.initCell(e, e._tvIndex);
t = e.tvIndex;
}
if (this.horizontal) {
e.x = this.anchorLeftX - this.cellSize * this.cellAnchorX + this.cellSize * (t + 1) + this.spacing * t;
e.y = this.anchorCenterY;
} else {
e.y = this.anchorTopY + this.cellSize * this.cellAnchorY - this.cellSize * (t + 1) - this.spacing * t;
e.x = this.anchorCenterX;
}
};
t.prototype.updateCells = function(e) {
var t = this;
void 0 === e && (e = !1);
this.updateCellsOnce = !1;
this.updateCellRange();
this.updateCellCount();
if (this.cellCount - 2 == this.endIndex && this.lowestIndex < this.endIndex) {
this.lowestIndex = this.endIndex;
this._callback && this._callback();
}
if (this.childCount) {
var o = this.startIndex, n = this.endIndex, r = this.content.children;
if (e || r[0]._tvIndex != o || r[r.length - 1]._tvIndex != n) {
var i = [], s = [];
r.forEach(function(e) {
if (e._tvIndex < o || e._tvIndex > n || e._tvIndex != e.tvIndex) {
t.uninitCell(e);
s.push(e);
} else i.push(e);
});
if (0 == s.length) e && r.forEach(function(e) {
return t.updateCell(e);
}); else if (0 == i.length) r.forEach(function(e, n) {
return t.updateCell(e, o + n);
}); else for (var a = o, c = 0, u = 0, l = 0; a <= n; a++, l++) c < i.length && a == i[c]._tvIndex ? this.updateCell(i[c++]) : this.updateCell(s[u++], a);
r.forEach(function(e) {
e.zIndex = e.tvIndex - o;
});
this.content.sortAllChildren();
}
}
};
t.prototype.scrollToIndex = function(e, t, o) {
console.log("[TableView] scrollToIndex");
};
t.prototype.getPerScrollOffset = function() {
return this.horizontal ? cc.v2(this.getScrollOffset().x / this.getMaxScrollOffset().x, 0) : cc.v2(0, this.getScrollOffset().y / this.getMaxScrollOffset().y);
};
t.prototype.scrollToPerOffset = function(e, t, o) {
this.horizontal ? e.x *= this.getMaxScrollOffset().x : e.y *= this.getMaxScrollOffset().y;
this.scrollToOffset(e, t, o);
};
t.prototype.scrollToOrigin = function(e, t) {
this.horizontal ? this.scrollToLeft(e, t) : this.scrollToTop(e, t);
};
t.prototype.stopAutoScroll = function() {
!this.updateCellsOnce && this.updateCellsOn && (this.updateCellsOnce = !0);
e.prototype.stopAutoScroll.call(this);
};
t.prototype.scrollToBottom = function(t, o) {
t ? this.updateCellsOn = !0 : this.updateCellsOnce = !0;
e.prototype.scrollToBottom.call(this, t, o);
};
t.prototype.scrollToTop = function(t, o) {
t ? this.updateCellsOn = !0 : this.updateCellsOnce = !0;
e.prototype.scrollToTop.call(this, t, o);
};
t.prototype.scrollToLeft = function(t, o) {
t ? this.updateCellsOn = !0 : this.updateCellsOnce = !0;
e.prototype.scrollToLeft.call(this, t, o);
};
t.prototype.scrollToRight = function(t, o) {
t ? this.updateCellsOn = !0 : this.updateCellsOnce = !0;
e.prototype.scrollToRight.call(this, t, o);
};
t.prototype.scrollToOffset = function(t, o, n) {
o ? this.updateCellsOn = !0 : this.updateCellsOnce = !0;
e.prototype.scrollToOffset.call(this, t, o, n);
};
t.prototype.update = function(t) {
e.prototype.update.call(this, t);
this.updateRefreshOnce && this.refreshSync(this.updateRefreshForce);
(this.updateCellsOn || this.updateCellsOnce) && this.updateCells();
};
t.prototype.addEventListener = function(e) {
void 0 === e && (e = null);
this._callback = e;
};
r([ a({
visible: !1,
override: !0
}) ], t.prototype, "horizontal", void 0);
r([ a({
visible: !1,
override: !0
}) ], t.prototype, "vertical", void 0);
r([ a({
type: cc.Component.EventHandler,
visible: !1,
override: !0
}) ], t.prototype, "scrollEvents", void 0);
r([ a(cc.Prefab) ], t.prototype, "_cell", void 0);
r([ a({
type: cc.Prefab,
tooltip: "渲染节点"
}) ], t.prototype, "cell", null);
r([ a({
type: c,
tooltip: "滑动方向"
}) ], t.prototype, "scrollModel", null);
r([ a({
tooltip: "item 间隔"
}) ], t.prototype, "spacing", void 0);
return t = r([ s ], t);
}(cc.ScrollView));
o.default = u;
cc._RF.pop();
}, {} ],
TalkProto: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fffaeJbHkRL55gkl4hVBarN", "TalkProto");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n;
o.protoName = "TalkProto";
(function(e) {
e[e.INVALED = 0] = "INVALED";
e[e.eLoginReq = 1] = "eLoginReq";
e[e.eLoginRes = 2] = "eLoginRes";
e[e.eExitReq = 3] = "eExitReq";
e[e.eExitRes = 4] = "eExitRes";
e[e.eSendMsgReq = 5] = "eSendMsgReq";
e[e.eSendMsgRes = 6] = "eSendMsgRes";
e[e.eOnUserLogin = 7] = "eOnUserLogin";
e[e.eOnUserExit = 8] = "eOnUserExit";
e[e.eOnSendMsg = 9] = "eOnSendMsg";
})(o.Cmd || (o.Cmd = {}));
o.CmdName = ((n = {})[0] = "INVALED", n[1] = "LoginReq", n[2] = "LoginRes", n[3] = "ExitReq", 
n[4] = "ExitRes", n[5] = "SendMsgReq", n[6] = "SendMsgRes", n[7] = "OnUserLogin", 
n[8] = "OnUserExit", n[9] = "OnSendMsg", n);
cc._RF.pop();
}, {} ],
TimerManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b7321LbEoNAGZtu9x/68KDY", "TimerManager");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {
this.init();
}
e.getInstance = function() {
e._instance || (e._instance = new e());
return this._instance;
};
e.prototype.init = function() {
this._id = "Scheduler" + e.__id++;
};
e.prototype.runTimer = function(e, t, o, n, r) {
return this.schedule(e, t, o, n, r);
};
e.prototype.runDelayTimer = function(e, t) {
void 0 === t && (t = .01);
return this.scheduleOnce(e, t);
};
e.prototype.runLoopTimer = function(e, t, o) {
void 0 === t && (t = .02);
return this.schedule(e, t || .02, cc.macro.REPEAT_FOREVER, o || 0, !1);
};
e.prototype.removeTimer = function(e) {
this.unschedule(e);
};
e.prototype.removeAllTimers = function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
};
e.prototype.pause = function() {
cc.director.getScheduler().pauseTarget(this);
};
e.prototype.resume = function() {
cc.director.getScheduler().resumeTarget(this);
};
e.prototype.scheduleOnce = function(e, t) {
this.schedule(e, 0, 0, t, !1);
return e;
};
e.prototype.schedule = function(e, t, o, n, r) {
cc.director.getScheduler().schedule(e, this, t, o, n, r);
return e;
};
e.prototype.unschedule = function(e) {
e && cc.director.getScheduler().unschedule(e, this);
};
e.__id = new Date().getTime();
return e;
}();
o.TimerManager = n;
cc._RF.pop();
}, {} ],
UIController: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "caa24agT1hBjJXlVowp1gEh", "UIController");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}();
Object.defineProperty(o, "__esModule", {
value: !0
});
var r = e("../common/UIFunciton"), i = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.view = {};
t._winSize = new cc.Size(1920, 1080);
return t;
}
t.prototype.load_all_object = function(e, t) {
for (var o = 0; o < e.childrenCount; o++) {
this.view[e.children[o].name] = e.children[o];
this.load_all_object(e.children[o], t + e.children[o].name + "/");
}
};
t.prototype.onLoad = function() {
r.default.getInstance().resize_screen();
this.load_all_object(this.node, "");
this.view[this.node.name] = this.node;
};
t.prototype.add_script = function(e) {
return this.node.addComponent(e);
};
t.prototype.get_script = function(e) {
return this.node.getComponent(e);
};
t.prototype.add_click_event = function(e, t) {
r.default.getInstance().add_click_event(e, t, this);
};
t.prototype.add_click_evenet_with_data = function(e, t, o) {
r.default.getInstance().add_click_evenet_with_data(e, t, this, o);
};
t.prototype.add_to_node = function(e, t, o) {
return r.default.getInstance().add_to_node(e, t, o);
};
t.prototype.set_string = function(e, t) {
r.default.getInstance().set_string(e, t);
};
t.prototype.get_string = function(e) {
return r.default.getInstance().get_string(e);
};
t.prototype.get_editbox_string = function(e) {
return r.default.getInstance().get_editbox_string(e);
};
t.prototype.set_editbox_string = function(e, t) {
r.default.getInstance().set_editbox_string(e, t);
};
t.prototype.set_sprite = function(e, t) {
var o = "textures/" + t;
r.default.getInstance().set_sprite(e, o);
};
t.prototype.set_sprite_asyc = function(e, t) {
var o = "textures/" + t;
r.default.getInstance().set_sprite_async(e, o);
};
t.prototype.set_sprite_from_atlas = function(e, t, o) {
var n = "textures/" + t;
r.default.getInstance().set_sprite_from_atlas(e, n, o);
};
t.prototype.set_visible = function(e, t) {
r.default.getInstance().set_visible(e, t);
};
t.prototype.get_visible = function(e) {
return r.default.getInstance().get_visible(e);
};
t.prototype.seek_child_by_name = function(e, t) {
return r.default.getInstance().seek_widget_by_name(e, t);
};
return t;
}(cc.Component);
o.default = i;
cc._RF.pop();
}, {
"../common/UIFunciton": "UIFunciton"
} ],
UIDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d2bd5aYUpBOvJKI0NO/IYwx", "UIDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("./UIController"), s = e("../manager/DialogManager"), a = cc._decorator, c = a.ccclass, u = (a.property, 
function(e) {
n(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
cc.sys.os === cc.sys.OS_WINDOWS && cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
};
t.prototype.start = function() {};
t.prototype.close = function() {
s.default.getInstance().remove_dialog_from_map(this.node);
this.node && this.node.destroy();
};
t.prototype.onKeyDown = function(e) {
var t = cc.macro;
console.log(e.keyCode);
switch (e.keyCode) {
case t.KEY.escape:
this.close();
}
};
return t = r([ c ], t);
}(i.default));
o.default = u;
cc._RF.pop();
}, {
"../manager/DialogManager": "DialogManager",
"./UIController": "UIController"
} ],
UIFunciton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8692a/gxpRGuZxduqvXoth0", "UIFunciton");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = e("../manager/ResourceManager"), r = function() {
function e() {
this._designResolution = null;
}
e.getInstance = function() {
return this.instance;
};
e.prototype.resize_screen = function() {
var e = cc.find("Canvas").getComponent(cc.Canvas);
this._designResolution || (this._designResolution = e.designResolution);
var t = this._designResolution, o = cc.view.getFrameSize(), n = o.width, r = o.height, i = n, s = r;
n / r > t.width / t.height ? i = (s = t.height) * n / r : s = r / n * (i = t.width);
e.designResolution = cc.size(i, s);
e.node.width = i;
e.node.height = s;
e.node.emit("resize");
};
e.prototype.node_exist = function(e) {
var t = e && cc.isValid(e);
0 == t && cc.error(e.name, "is null");
return t;
};
e.prototype.add_click_event = function(e, t, o) {
if (this.node_exist(e)) {
var n = e.getComponent(cc.Button);
if (n) {
o.isBtnClick = !1;
e.on("click", function() {
if (!o.isBtnClick) {
o.isBtnClick = !0;
setTimeout(function() {
o.isBtnClick = !1;
}, 1);
t.call(o, n);
}
}, o);
}
}
};
e.prototype.add_click_evenet_with_data = function(e, t, o, n) {
if (t && "string" == typeof t && "" != t) if (this.node_exist(e)) {
var r = e.getComponent(cc.Button);
if (r) {
this.clear_btn_click_event(e);
var i = o.name.match(/(?:<)(.*)(?:>)/i);
if (i[1]) {
var s = new cc.Component.EventHandler();
s.target = o.node;
s.component = i[1];
s.handler = t;
n && (s.customEventData = n);
r.clickEvents.push(s);
} else cc.error("add_click_evenet_with_data>> " + t + " , matchStr is not exist");
} else cc.error("add_click_evenet_with_data>>component is not exist");
} else cc.error("add_click_evenet_with_data>>target node is not exist"); else cc.error("add_click_evenet_with_data>>callbackName is not string");
};
e.prototype.clear_btn_click_event = function(e) {
if (this.node_exist(e)) {
var t = e.getComponent(cc.Button);
t && t.clickEvents.length > 0 && t.clickEvents.splice(0, t.clickEvents.length);
}
};
e.prototype.set_string = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.Label);
if (o) {
t = null == t ? "" : t;
o.string = String(t);
}
}
};
e.prototype.get_string = function(e) {
if (this.node_exist(e)) {
var t = e.getComponent(cc.Label);
if (t) return t.string;
}
};
e.prototype.set_editbox_string = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.EditBox);
if (o) {
t = null == t ? "" : t;
o.string = String(t);
}
}
};
e.prototype.get_editbox_string = function(e) {
if (this.node_exist(e)) {
var t = e.getComponent(cc.EditBox);
if (t) return t.string;
}
};
e.prototype.set_sprite = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.Sprite);
if (o) {
var r = n.ResourceManager.getInstance().getRes(t, cc.SpriteFrame);
if (r) try {
1 == r.isValid && (o.spriteFrame = r);
} catch (e) {
cc.error(e);
} else console.warn("load SpriteFrame " + t + " failed");
}
}
};
e.prototype.set_sprite_async = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.Sprite);
o && n.ResourceManager.getInstance().loadResAsyc(t, cc.SpriteFrame, function(e, n) {
if (n) try {
1 == n.isValid && (o.spriteFrame = n);
} catch (e) {
cc.error(e);
} else console.warn("load SpriteFrame " + t + " failed");
});
}
};
e.prototype.set_sprite_from_atlas = function(e, t, o) {
if (this.node_exist(e)) {
var r = e.getComponent(cc.Sprite);
if (r) {
var i = n.ResourceManager.getInstance().getRes(t, cc.SpriteAtlas);
if (i) {
var s = i.getSpriteFrame(o);
s ? r.spriteFrame = s : console.warn("SpriteAtlas " + t + " has no " + o + " SpriteFrame");
} else console.warn("load SpriteAtlas " + t + " failed");
}
}
};
e.prototype.set_sprite_from_atlas_async = function(e, t, o) {
if (this.node_exist(e)) {
var r = e.getComponent(cc.Sprite);
r && n.ResourceManager.getInstance().loadResAsyc(t, cc.SpriteAtlas, function(e, n) {
if (n) {
var i = n.getSpriteFrame(o);
i ? r.spriteFrame = i : console.warn("SpriteAtlas " + t + " has no " + o + " SpriteFrame");
} else console.warn("load SpriteAtlas " + t + " failed");
});
}
};
e.prototype.set_visible = function(e, t) {
this.node_exist(e) && (e.active = t);
};
e.prototype.get_visible = function(e) {
if (this.node_exist(e)) return e.active;
};
e.prototype.add_to_node = function(e, t, o) {
if (t) {
var n = cc.instantiate(t);
if (n) {
e.addChild(n);
n.position = cc.v2(0, 0);
o && n.addComponent(o);
return n;
}
}
return null;
};
e.prototype.add_to_scene = function(e, t) {
void 0 === t && (t = null);
if (e) {
var o = cc.instantiate(e);
if (o) {
var n = cc.director.getScene().getChildByName("Canvas");
if (n) {
n.addChild(o);
o.position = cc.v2(0, 0);
t && o.addComponent(t);
}
}
return o;
}
return null;
};
e.prototype.add_check_click = function(e, t, o) {
if (this.node_exist(e)) {
var n = e.getComponent(cc.Toggle);
if (n) {
e.on("toggle", function(e) {
0 != e.node.interactable && t.call(o, n.node);
}, o);
}
}
};
e.prototype.is_checked = function(e) {
if (!this.node_exist(e)) return !1;
var t = e.getComponent(cc.Toggle);
return !!t && t.isChecked;
};
e.prototype.set_checked = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.Toggle);
if (o) if (t) {
o._N$isChecked = !0;
o._updateCheckMark();
} else {
o._N$isChecked = !1;
o._updateCheckMark();
}
}
};
e.prototype.add_prefab_to_node_async = function(e, t, o, r) {
var i = this;
n.ResourceManager.getInstance().loadResAsyc(t, cc.Prefab, function(t, n) {
if (!t) {
var s = i.add_to_node(e, n, o);
r && r(s);
}
});
};
e.prototype.add_prefab_to_node = function(e, t, o) {
void 0 === o && (o = null);
var r = n.ResourceManager.getInstance().getRes(t, cc.Prefab);
if (r) return this.add_to_node(e, r, o);
};
e.prototype.add_prefab_to_scene_async = function(e, t, o) {
void 0 === t && (t = null);
var r = this;
n.ResourceManager.getInstance().loadResAsyc(e, cc.Prefab, function(e, n) {
if (!e) {
var i = r.add_to_scene(n, t);
o && o(i);
}
});
};
e.prototype.add_prefab_to_scene = function(e, t) {
void 0 === t && (t = null);
var o = n.ResourceManager.getInstance().getRes(e, cc.Prefab);
if (o) return this.add_to_scene(o, t);
};
e.prototype.is_pos_in_area = function(e, t) {
var o = e.getBoundingBox(), n = e.getParent().convertToNodeSpace(t);
return !!o.contains(n);
};
e.prototype.set_head_img_by_url = function(e, t) {
if (this.node_exist(e)) {
var o = e.getComponent(cc.Sprite);
o && cc.loader.load({
url: t,
type: "jpg"
}, function(e, t) {
o.spriteFrame = new cc.SpriteFrame(t);
});
}
};
e.prototype.seek_widget_by_name = function(e, t) {
if (!e) return null;
if (e.name == t) return e;
for (var o = 0, n = e.children; o < n.length; o++) {
var r = n[o];
if (r) {
var i = this.seek_widget_by_name(r, t);
if (null != i) return i;
}
}
return null;
};
e.instance = new e();
return e;
}();
o.default = r;
cc._RF.pop();
}, {
"../manager/ResourceManager": "ResourceManager"
} ],
UserInfo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "569d1Uh9GRE+a0uydPi6kUK", "UserInfo");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.set_uinfo = function(e) {
var t = null;
try {
t = JSON.parse(e);
cc.log("uinfo: ", t);
} catch (e) {
cc.error(e);
}
this._uinfo = t;
};
e.get_uinfo = function() {
return this._uinfo;
};
e.get_unick = function() {
return this._uinfo.unick;
};
e.get_numberid = function() {
return this._uinfo.numberid;
};
e.get_uface = function() {
return this._uinfo.uface;
};
e.get_usex = function() {
return this._uinfo.usex;
};
e.get_uname = function() {
return this._uinfo.uname;
};
e.set_ugame_info = function(e) {
this._ugame_info = e;
};
e.get_ugame_info = function() {
return this._ugame_info;
};
e.get_uchip = function() {
return this._ugame_info.uchip;
};
e._uinfo = {};
e._ugame_info = {};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
WeakHintDialog: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ad69cHLk61CyZoLaMj/ljpp", "WeakHintDialog");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var a = e.length - 1; a >= 0; a--) (r = e[a]) && (s = (i < 3 ? r(s) : i > 3 ? r(t, o, s) : r(t, o)) || s);
return i > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var i = e("../../framework/manager/DialogManager"), s = e("../../framework/uibase/UIController"), a = cc._decorator, c = a.ccclass, u = (a.property, 
function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t._data = "";
return t;
}
t.prototype.onLoad = function() {
e.prototype.onLoad.call(this);
};
t.prototype.start = function() {
var e = this.view.KW_UI_BACKGROUND.getContentSize();
this.view.KW_UI_BACKGROUND.setContentSize(e.width * (this._data.length / 5), e.height);
this.set_string(this.view.KW_TEXT_WEAK_HINT, this._data);
this.node.opacity = 0;
var t = this;
this.node.runAction(cc.sequence(cc.fadeIn(.1), cc.delayTime(1), cc.fadeOut(.5), cc.callFunc(function() {
t.close();
}.bind(this))));
};
t.prototype.show = function(e) {
this._data = e;
this.node.active = !0;
};
t.prototype.move = function() {
this.node.runAction(cc.moveBy(.1, new cc.Vec2(0, 100)));
};
t.prototype.onDestroy = function() {};
t.prototype.close = function() {
this.node.destroy();
i.default.getInstance().dequeue_weakhint();
};
return t = r([ c ], t);
}(s.default));
o.default = u;
cc._RF.pop();
}, {
"../../framework/manager/DialogManager": "DialogManager",
"../../framework/uibase/UIController": "UIController"
} ],
map_Level1: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "55c59SyrW5EGLGhzIhGHNQy", "map_Level1");
t.exports = {
data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
height: 40,
item_size: 16,
name: "Level1",
width: 60
};
cc._RF.pop();
}, {} ],
protobufMsg: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f3621CcljlP/Jh72Beg++DY", "protobufMsg");
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = e("protobuf"), i = r.Reader, s = r.Writer, a = r.util, c = r.roots.default || (r.roots.default = {});
c.AuthProto = function() {
var e = {};
e.Cmd = function() {
var e = {}, t = Object.create(e);
t[e[0] = "INVALED"] = 0;
t[e[1] = "eUnameLoginReq"] = 1;
t[e[2] = "eUnameLoginRes"] = 2;
t[e[3] = "eGuestLoginReq"] = 3;
t[e[4] = "eGuestLoginRes"] = 4;
t[e[5] = "eUnameRegistReq"] = 5;
t[e[6] = "eUnameRegistRes"] = 6;
t[e[7] = "ePhoneRegistReq"] = 7;
t[e[8] = "ePhoneRegistRes"] = 8;
t[e[9] = "eGetPhoneRegVerNumReq"] = 9;
t[e[10] = "eGetPhoneRegVerNumRes"] = 10;
t[e[11] = "eBindPhoneNumberReq"] = 11;
t[e[12] = "eBindPhoneNumberRes"] = 12;
t[e[13] = "eResetUserPwdReq"] = 13;
t[e[14] = "eResetUserPwdRes"] = 14;
t[e[15] = "eLoginOutReq"] = 15;
t[e[16] = "eLoginOutRes"] = 16;
t[e[17] = "eEditProfileReq"] = 17;
t[e[18] = "eEditProfileRes"] = 18;
t[e[19] = "eAccountUpgradeReq"] = 19;
t[e[20] = "eAccountUpgradeRes"] = 20;
t[e[21] = "eGetUserCenterInfoReq"] = 21;
t[e[22] = "eGetUserCenterInfoRes"] = 22;
t[e[23] = "eReloginRes"] = 23;
return t;
}();
e.UnameLoginReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.uname = "";
e.prototype.upwd = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.uname);
t.uint32(18).string(e.upwd);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.UnameLoginReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.uname = e.string();
break;

case 2:
n.upwd = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("uname")) throw a.ProtocolError("missing required 'uname'", {
instance: n
});
if (!n.hasOwnProperty("upwd")) throw a.ProtocolError("missing required 'upwd'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.uname) ? a.isString(e.upwd) ? null : "upwd: string expected" : "uname: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.UnameLoginReq) return e;
var t = new c.AuthProto.UnameLoginReq();
null != e.uname && (t.uname = String(e.uname));
null != e.upwd && (t.upwd = String(e.upwd));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.uname = "";
o.upwd = "";
}
null != e.uname && e.hasOwnProperty("uname") && (o.uname = e.uname);
null != e.upwd && e.hasOwnProperty("upwd") && (o.upwd = e.upwd);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UnameLoginRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.uid = 0;
e.prototype.userlogininfo = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
null != e.status && e.hasOwnProperty("status") && t.uint32(8).int32(e.status);
null != e.uid && e.hasOwnProperty("uid") && t.uint32(16).int32(e.uid);
null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && t.uint32(26).string(e.userlogininfo);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.UnameLoginRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

case 2:
n.uid = e.int32();
break;

case 3:
n.userlogininfo = e.string();
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null != e.status && e.hasOwnProperty("status") && !a.isInteger(e.status) ? "status: integer expected" : null != e.uid && e.hasOwnProperty("uid") && !a.isInteger(e.uid) ? "uid: integer expected" : null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && !a.isString(e.userlogininfo) ? "userlogininfo: string expected" : null;
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.UnameLoginRes) return e;
var t = new c.AuthProto.UnameLoginRes();
null != e.status && (t.status = 0 | e.status);
null != e.uid && (t.uid = 0 | e.uid);
null != e.userlogininfo && (t.userlogininfo = String(e.userlogininfo));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.uid = 0;
o.userlogininfo = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.uid && e.hasOwnProperty("uid") && (o.uid = e.uid);
null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && (o.userlogininfo = e.userlogininfo);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GuestLoginReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.guestkey = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.guestkey);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GuestLoginReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.guestkey = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("guestkey")) throw a.ProtocolError("missing required 'guestkey'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.guestkey) ? null : "guestkey: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.GuestLoginReq) return e;
var t = new c.AuthProto.GuestLoginReq();
null != e.guestkey && (t.guestkey = String(e.guestkey));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.guestkey = "");
null != e.guestkey && e.hasOwnProperty("guestkey") && (o.guestkey = e.guestkey);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GuestLoginRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.uid = 0;
e.prototype.userlogininfo = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
null != e.uid && e.hasOwnProperty("uid") && t.uint32(16).int32(e.uid);
null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && t.uint32(26).string(e.userlogininfo);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GuestLoginRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

case 2:
n.uid = e.int32();
break;

case 3:
n.userlogininfo = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.uid && e.hasOwnProperty("uid") && !a.isInteger(e.uid) ? "uid: integer expected" : null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && !a.isString(e.userlogininfo) ? "userlogininfo: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.GuestLoginRes) return e;
var t = new c.AuthProto.GuestLoginRes();
null != e.status && (t.status = 0 | e.status);
null != e.uid && (t.uid = 0 | e.uid);
null != e.userlogininfo && (t.userlogininfo = String(e.userlogininfo));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.uid = 0;
o.userlogininfo = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.uid && e.hasOwnProperty("uid") && (o.uid = e.uid);
null != e.userlogininfo && e.hasOwnProperty("userlogininfo") && (o.userlogininfo = e.userlogininfo);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UnameRegistReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.uname = "";
e.prototype.upwdmd5 = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.uname);
t.uint32(18).string(e.upwdmd5);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.UnameRegistReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.uname = e.string();
break;

case 2:
n.upwdmd5 = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("uname")) throw a.ProtocolError("missing required 'uname'", {
instance: n
});
if (!n.hasOwnProperty("upwdmd5")) throw a.ProtocolError("missing required 'upwdmd5'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.uname) ? a.isString(e.upwdmd5) ? null : "upwdmd5: string expected" : "uname: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.UnameRegistReq) return e;
var t = new c.AuthProto.UnameRegistReq();
null != e.uname && (t.uname = String(e.uname));
null != e.upwdmd5 && (t.upwdmd5 = String(e.upwdmd5));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.uname = "";
o.upwdmd5 = "";
}
null != e.uname && e.hasOwnProperty("uname") && (o.uname = e.uname);
null != e.upwdmd5 && e.hasOwnProperty("upwdmd5") && (o.upwdmd5 = e.upwdmd5);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UnameRegistRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.UnameRegistRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.UnameRegistRes) return e;
var t = new c.AuthProto.UnameRegistRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PhoneRegistReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.PhoneRegistReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.PhoneRegistReq ? e : new c.AuthProto.PhoneRegistReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PhoneRegistRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.PhoneRegistRes(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.PhoneRegistRes ? e : new c.AuthProto.PhoneRegistRes();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetPhoneRegVerNumReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GetPhoneRegVerNumReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.GetPhoneRegVerNumReq ? e : new c.AuthProto.GetPhoneRegVerNumReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetPhoneRegVerNumRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GetPhoneRegVerNumRes(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.GetPhoneRegVerNumRes ? e : new c.AuthProto.GetPhoneRegVerNumRes();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BindPhoneNumberReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.BindPhoneNumberReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.BindPhoneNumberReq ? e : new c.AuthProto.BindPhoneNumberReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BindPhoneNumberRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.BindPhoneNumberRes(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.BindPhoneNumberRes ? e : new c.AuthProto.BindPhoneNumberRes();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ResetUserPwdReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.ResetUserPwdReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.ResetUserPwdReq ? e : new c.AuthProto.ResetUserPwdReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ResetUserPwdRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.ResetUserPwdRes(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.ResetUserPwdRes ? e : new c.AuthProto.ResetUserPwdRes();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.LoginOutReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.LoginOutReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.LoginOutReq ? e : new c.AuthProto.LoginOutReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.LoginOutRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.LoginOutRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.LoginOutRes) return e;
var t = new c.AuthProto.LoginOutRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.EditProfileReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.unick = "";
e.prototype.uface = 0;
e.prototype.usex = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.unick);
t.uint32(16).int32(e.uface);
t.uint32(24).int32(e.usex);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.EditProfileReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.unick = e.string();
break;

case 2:
n.uface = e.int32();
break;

case 3:
n.usex = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("unick")) throw a.ProtocolError("missing required 'unick'", {
instance: n
});
if (!n.hasOwnProperty("uface")) throw a.ProtocolError("missing required 'uface'", {
instance: n
});
if (!n.hasOwnProperty("usex")) throw a.ProtocolError("missing required 'usex'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.unick) ? a.isInteger(e.uface) ? a.isInteger(e.usex) ? null : "usex: integer expected" : "uface: integer expected" : "unick: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.EditProfileReq) return e;
var t = new c.AuthProto.EditProfileReq();
null != e.unick && (t.unick = String(e.unick));
null != e.uface && (t.uface = 0 | e.uface);
null != e.usex && (t.usex = 0 | e.usex);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.unick = "";
o.uface = 0;
o.usex = 0;
}
null != e.unick && e.hasOwnProperty("unick") && (o.unick = e.unick);
null != e.uface && e.hasOwnProperty("uface") && (o.uface = e.uface);
null != e.usex && e.hasOwnProperty("usex") && (o.usex = e.usex);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.EditProfileRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.EditProfileRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.EditProfileRes) return e;
var t = new c.AuthProto.EditProfileRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.AccountUpgradeReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.uname = "";
e.prototype.upwdmd5 = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.uname);
t.uint32(18).string(e.upwdmd5);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.AccountUpgradeReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.uname = e.string();
break;

case 2:
n.upwdmd5 = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("uname")) throw a.ProtocolError("missing required 'uname'", {
instance: n
});
if (!n.hasOwnProperty("upwdmd5")) throw a.ProtocolError("missing required 'upwdmd5'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.uname) ? a.isString(e.upwdmd5) ? null : "upwdmd5: string expected" : "uname: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.AccountUpgradeReq) return e;
var t = new c.AuthProto.AccountUpgradeReq();
null != e.uname && (t.uname = String(e.uname));
null != e.upwdmd5 && (t.upwdmd5 = String(e.upwdmd5));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.uname = "";
o.upwdmd5 = "";
}
null != e.uname && e.hasOwnProperty("uname") && (o.uname = e.uname);
null != e.upwdmd5 && e.hasOwnProperty("upwdmd5") && (o.upwdmd5 = e.upwdmd5);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.AccountUpgradeRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.AccountUpgradeRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.AccountUpgradeRes) return e;
var t = new c.AuthProto.AccountUpgradeRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetUserCenterInfoReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GetUserCenterInfoReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.GetUserCenterInfoReq ? e : new c.AuthProto.GetUserCenterInfoReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetUserCenterInfoRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.usercenterinfostring = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
null != e.usercenterinfostring && e.hasOwnProperty("usercenterinfostring") && t.uint32(18).string(e.usercenterinfostring);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.GetUserCenterInfoRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

case 2:
n.usercenterinfostring = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.usercenterinfostring && e.hasOwnProperty("usercenterinfostring") && !a.isString(e.usercenterinfostring) ? "usercenterinfostring: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.AuthProto.GetUserCenterInfoRes) return e;
var t = new c.AuthProto.GetUserCenterInfoRes();
null != e.status && (t.status = 0 | e.status);
null != e.usercenterinfostring && (t.usercenterinfostring = String(e.usercenterinfostring));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.usercenterinfostring = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.usercenterinfostring && e.hasOwnProperty("usercenterinfostring") && (o.usercenterinfostring = e.usercenterinfostring);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ReloginRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.AuthProto.ReloginRes(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.AuthProto.ReloginRes ? e : new c.AuthProto.ReloginRes();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
return e;
}();
c.TalkProto = function() {
var e = {};
e.Cmd = function() {
var e = {}, t = Object.create(e);
t[e[0] = "INVALED"] = 0;
t[e[1] = "eLoginReq"] = 1;
t[e[2] = "eLoginRes"] = 2;
t[e[3] = "eExitReq"] = 3;
t[e[4] = "eExitRes"] = 4;
t[e[5] = "eSendMsgReq"] = 5;
t[e[6] = "eSendMsgRes"] = 6;
t[e[7] = "eOnUserLogin"] = 7;
t[e[8] = "eOnUserExit"] = 8;
t[e[9] = "eOnSendMsg"] = 9;
return t;
}();
e.LoginReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.LoginReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.TalkProto.LoginReq ? e : new c.TalkProto.LoginReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.LoginRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.LoginRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.LoginRes) return e;
var t = new c.TalkProto.LoginRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ExitReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.ExitReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.TalkProto.ExitReq ? e : new c.TalkProto.ExitReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ExitRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.ExitRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.ExitRes) return e;
var t = new c.TalkProto.ExitRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.SendMsgReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.content = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.content);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.SendMsgReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.content = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("content")) throw a.ProtocolError("missing required 'content'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.content) ? null : "content: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.SendMsgReq) return e;
var t = new c.TalkProto.SendMsgReq();
null != e.content && (t.content = String(e.content));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.content = "");
null != e.content && e.hasOwnProperty("content") && (o.content = e.content);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.SendMsgRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).int32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.SendMsgRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.SendMsgRes) return e;
var t = new c.TalkProto.SendMsgRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnUserLogin = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.ip = "";
e.prototype.port = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.ip);
t.uint32(16).int32(e.port);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.OnUserLogin(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.ip = e.string();
break;

case 2:
n.port = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("ip")) throw a.ProtocolError("missing required 'ip'", {
instance: n
});
if (!n.hasOwnProperty("port")) throw a.ProtocolError("missing required 'port'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.ip) ? a.isInteger(e.port) ? null : "port: integer expected" : "ip: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.OnUserLogin) return e;
var t = new c.TalkProto.OnUserLogin();
null != e.ip && (t.ip = String(e.ip));
null != e.port && (t.port = 0 | e.port);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.ip = "";
o.port = 0;
}
null != e.ip && e.hasOwnProperty("ip") && (o.ip = e.ip);
null != e.port && e.hasOwnProperty("port") && (o.port = e.port);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnUserExit = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.ip = "";
e.prototype.port = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.ip);
t.uint32(16).int32(e.port);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.OnUserExit(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.ip = e.string();
break;

case 2:
n.port = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("ip")) throw a.ProtocolError("missing required 'ip'", {
instance: n
});
if (!n.hasOwnProperty("port")) throw a.ProtocolError("missing required 'port'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.ip) ? a.isInteger(e.port) ? null : "port: integer expected" : "ip: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.OnUserExit) return e;
var t = new c.TalkProto.OnUserExit();
null != e.ip && (t.ip = String(e.ip));
null != e.port && (t.port = 0 | e.port);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.ip = "";
o.port = 0;
}
null != e.ip && e.hasOwnProperty("ip") && (o.ip = e.ip);
null != e.port && e.hasOwnProperty("port") && (o.port = e.port);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnSendMsg = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.ip = "";
e.prototype.port = 0;
e.prototype.content = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.ip);
t.uint32(16).int32(e.port);
t.uint32(26).string(e.content);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.TalkProto.OnSendMsg(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.ip = e.string();
break;

case 2:
n.port = e.int32();
break;

case 3:
n.content = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("ip")) throw a.ProtocolError("missing required 'ip'", {
instance: n
});
if (!n.hasOwnProperty("port")) throw a.ProtocolError("missing required 'port'", {
instance: n
});
if (!n.hasOwnProperty("content")) throw a.ProtocolError("missing required 'content'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.ip) ? a.isInteger(e.port) ? a.isString(e.content) ? null : "content: string expected" : "port: integer expected" : "ip: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.TalkProto.OnSendMsg) return e;
var t = new c.TalkProto.OnSendMsg();
null != e.ip && (t.ip = String(e.ip));
null != e.port && (t.port = 0 | e.port);
null != e.content && (t.content = String(e.content));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.ip = "";
o.port = 0;
o.content = "";
}
null != e.ip && e.hasOwnProperty("ip") && (o.ip = e.ip);
null != e.port && e.hasOwnProperty("port") && (o.port = e.port);
null != e.content && e.hasOwnProperty("content") && (o.content = e.content);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
return e;
}();
c.GameHoodleProto = function() {
var e = {};
e.Cmd = function() {
var e = {}, t = Object.create(e);
t[e[0] = "INVALED"] = 0;
t[e[1] = "eCreateRoomReq"] = 1;
t[e[2] = "eCreateRoomRes"] = 2;
t[e[3] = "eJoinRoomReq"] = 3;
t[e[4] = "eJoinRoomRes"] = 4;
t[e[5] = "eExitRoomReq"] = 5;
t[e[6] = "eExitRoomRes"] = 6;
t[e[7] = "eDessolveReq"] = 7;
t[e[8] = "eDessolveRes"] = 8;
t[e[9] = "eGetRoomStatusReq"] = 9;
t[e[10] = "eGetRoomStatusRes"] = 10;
t[e[11] = "eBackRoomReq"] = 11;
t[e[12] = "eBackRoomRes"] = 12;
t[e[13] = "eCheckLinkGameReq"] = 13;
t[e[14] = "eCheckLinkGameRes"] = 14;
t[e[15] = "eUserInfoRes"] = 15;
t[e[16] = "eGameRuleRes"] = 16;
t[e[17] = "eRoomIdRes"] = 17;
t[e[18] = "ePlayCountRes"] = 18;
t[e[19] = "eUserReadyReq"] = 19;
t[e[20] = "eUserReadyRes"] = 20;
t[e[21] = "eGameStartRes"] = 21;
t[e[22] = "eGameEndRes"] = 22;
t[e[23] = "eLoginLogicReq"] = 23;
t[e[24] = "eLoginLogicRes"] = 24;
t[e[25] = "eUserOfflineRes"] = 25;
t[e[26] = "ePlayerFirstBallPosRes"] = 26;
t[e[27] = "ePlayerPowerRes"] = 27;
t[e[28] = "ePlayerShootReq"] = 28;
t[e[29] = "ePlayerShootRes"] = 29;
t[e[30] = "ePlayerBallPosReq"] = 30;
t[e[31] = "ePlayerBallPosRes"] = 31;
t[e[32] = "ePlayerIsShootedReq"] = 32;
t[e[33] = "ePlayerIsShootedRes"] = 33;
t[e[34] = "eGameResultRes"] = 34;
t[e[35] = "eTotalGameResultRes"] = 35;
t[e[36] = "ePlayerScoreRes"] = 36;
t[e[37] = "eUserMatchReq"] = 37;
t[e[38] = "eUserMatchRes"] = 38;
t[e[39] = "eUserStopMatchReq"] = 39;
t[e[40] = "eUserStopMatchRes"] = 40;
t[e[41] = "eUserGameInfoReq"] = 41;
t[e[42] = "eUserGameInfoRes"] = 42;
t[e[43] = "eUserBallInfoReq"] = 43;
t[e[44] = "eUserBallInfoRes"] = 44;
t[e[45] = "eUpdateUserBallReq"] = 45;
t[e[46] = "eUpdateUserBallRes"] = 46;
t[e[47] = "eStoreListReq"] = 47;
t[e[48] = "eStoreListRes"] = 48;
t[e[49] = "eBuyThingsReq"] = 49;
t[e[50] = "eBuyThingsRes"] = 50;
return t;
}();
e.CreateRoomReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.gamerule = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.gamerule);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.CreateRoomReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.gamerule = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("gamerule")) throw a.ProtocolError("missing required 'gamerule'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.gamerule) ? null : "gamerule: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.CreateRoomReq) return e;
var t = new c.GameHoodleProto.CreateRoomReq();
null != e.gamerule && (t.gamerule = String(e.gamerule));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.gamerule = "");
null != e.gamerule && e.hasOwnProperty("gamerule") && (o.gamerule = e.gamerule);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.CreateRoomRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.CreateRoomRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.CreateRoomRes) return e;
var t = new c.GameHoodleProto.CreateRoomRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.JoinRoomReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.roomid = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.roomid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.JoinRoomReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.roomid = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("roomid")) throw a.ProtocolError("missing required 'roomid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.roomid) ? null : "roomid: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.JoinRoomReq) return e;
var t = new c.GameHoodleProto.JoinRoomReq();
null != e.roomid && (t.roomid = String(e.roomid));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.roomid = "");
null != e.roomid && e.hasOwnProperty("roomid") && (o.roomid = e.roomid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.JoinRoomRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.JoinRoomRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.JoinRoomRes) return e;
var t = new c.GameHoodleProto.JoinRoomRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ExitRoomReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.ExitRoomReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.ExitRoomReq ? e : new c.GameHoodleProto.ExitRoomReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.ExitRoomRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.numberid = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.numberid && e.hasOwnProperty("numberid") && t.uint32(16).sint32(e.numberid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.ExitRoomRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.numberid = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.numberid && e.hasOwnProperty("numberid") && !a.isInteger(e.numberid) ? "numberid: integer expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.ExitRoomRes) return e;
var t = new c.GameHoodleProto.ExitRoomRes();
null != e.status && (t.status = 0 | e.status);
null != e.numberid && (t.numberid = 0 | e.numberid);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.numberid = 0;
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.numberid && e.hasOwnProperty("numberid") && (o.numberid = e.numberid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.DessolveReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.DessolveReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.DessolveReq ? e : new c.GameHoodleProto.DessolveReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.DessolveRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.DessolveRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.DessolveRes) return e;
var t = new c.GameHoodleProto.DessolveRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetRoomStatusReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GetRoomStatusReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.GetRoomStatusReq ? e : new c.GameHoodleProto.GetRoomStatusReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GetRoomStatusRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GetRoomStatusRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.GetRoomStatusRes) return e;
var t = new c.GameHoodleProto.GetRoomStatusRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BackRoomReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.BackRoomReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.BackRoomReq ? e : new c.GameHoodleProto.BackRoomReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BackRoomRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.BackRoomRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.BackRoomRes) return e;
var t = new c.GameHoodleProto.BackRoomRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserInfo = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.numberid = "";
e.prototype.userinfostring = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.numberid);
t.uint32(18).string(e.userinfostring);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserInfo(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.numberid = e.string();
break;

case 2:
n.userinfostring = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("numberid")) throw a.ProtocolError("missing required 'numberid'", {
instance: n
});
if (!n.hasOwnProperty("userinfostring")) throw a.ProtocolError("missing required 'userinfostring'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.numberid) ? a.isString(e.userinfostring) ? null : "userinfostring: string expected" : "numberid: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserInfo) return e;
var t = new c.GameHoodleProto.UserInfo();
null != e.numberid && (t.numberid = String(e.numberid));
null != e.userinfostring && (t.userinfostring = String(e.userinfostring));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.numberid = "";
o.userinfostring = "";
}
null != e.numberid && e.hasOwnProperty("numberid") && (o.numberid = e.numberid);
null != e.userinfostring && e.hasOwnProperty("userinfostring") && (o.userinfostring = e.userinfostring);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.CheckLinkGameReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.CheckLinkGameReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.CheckLinkGameReq ? e : new c.GameHoodleProto.CheckLinkGameReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.CheckLinkGameRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.CheckLinkGameRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.CheckLinkGameRes) return e;
var t = new c.GameHoodleProto.CheckLinkGameRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserInfoRes = function() {
function e(e) {
this.userinfo = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.userinfo = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.userinfo && e.userinfo.length) for (var o = 0; o < e.userinfo.length; ++o) c.GameHoodleProto.UserInfo.encode(e.userinfo[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserInfoRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.userinfo && n.userinfo.length || (n.userinfo = []);
n.userinfo.push(c.GameHoodleProto.UserInfo.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.userinfo && e.hasOwnProperty("userinfo")) {
if (!Array.isArray(e.userinfo)) return "userinfo: array expected";
for (var t = 0; t < e.userinfo.length; ++t) {
var o = c.GameHoodleProto.UserInfo.verify(e.userinfo[t]);
if (o) return "userinfo." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserInfoRes) return e;
var t = new c.GameHoodleProto.UserInfoRes();
if (e.userinfo) {
if (!Array.isArray(e.userinfo)) throw TypeError(".GameHoodleProto.UserInfoRes.userinfo: array expected");
t.userinfo = [];
for (var o = 0; o < e.userinfo.length; ++o) {
if ("object" !== n(e.userinfo[o])) throw TypeError(".GameHoodleProto.UserInfoRes.userinfo: object expected");
t.userinfo[o] = c.GameHoodleProto.UserInfo.fromObject(e.userinfo[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.userinfo = []);
if (e.userinfo && e.userinfo.length) {
o.userinfo = [];
for (var n = 0; n < e.userinfo.length; ++n) o.userinfo[n] = c.GameHoodleProto.UserInfo.toObject(e.userinfo[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GameRuleRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.gamerule = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.gamerule);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GameRuleRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.gamerule = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("gamerule")) throw a.ProtocolError("missing required 'gamerule'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.gamerule) ? null : "gamerule: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.GameRuleRes) return e;
var t = new c.GameHoodleProto.GameRuleRes();
null != e.gamerule && (t.gamerule = String(e.gamerule));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.gamerule = "");
null != e.gamerule && e.hasOwnProperty("gamerule") && (o.gamerule = e.gamerule);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.RoomIdRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.roomid = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.roomid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.RoomIdRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.roomid = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("roomid")) throw a.ProtocolError("missing required 'roomid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.roomid) ? null : "roomid: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.RoomIdRes) return e;
var t = new c.GameHoodleProto.RoomIdRes();
null != e.roomid && (t.roomid = String(e.roomid));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.roomid = "");
null != e.roomid && e.hasOwnProperty("roomid") && (o.roomid = e.roomid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayCountRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.playcount = "";
e.prototype.totalplaycount = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(10).string(e.playcount);
t.uint32(18).string(e.totalplaycount);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayCountRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.playcount = e.string();
break;

case 2:
n.totalplaycount = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("playcount")) throw a.ProtocolError("missing required 'playcount'", {
instance: n
});
if (!n.hasOwnProperty("totalplaycount")) throw a.ProtocolError("missing required 'totalplaycount'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isString(e.playcount) ? a.isString(e.totalplaycount) ? null : "totalplaycount: string expected" : "playcount: string expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayCountRes) return e;
var t = new c.GameHoodleProto.PlayCountRes();
null != e.playcount && (t.playcount = String(e.playcount));
null != e.totalplaycount && (t.totalplaycount = String(e.totalplaycount));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.playcount = "";
o.totalplaycount = "";
}
null != e.playcount && e.hasOwnProperty("playcount") && (o.playcount = e.playcount);
null != e.totalplaycount && e.hasOwnProperty("totalplaycount") && (o.totalplaycount = e.totalplaycount);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserReadyReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserReadyReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.UserReadyReq ? e : new c.GameHoodleProto.UserReadyReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserReadyRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.seatid = 0;
e.prototype.userstate = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.seatid && e.hasOwnProperty("seatid") && t.uint32(16).sint32(e.seatid);
null != e.userstate && e.hasOwnProperty("userstate") && t.uint32(24).sint32(e.userstate);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserReadyRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.seatid = e.sint32();
break;

case 3:
n.userstate = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.seatid && e.hasOwnProperty("seatid") && !a.isInteger(e.seatid) ? "seatid: integer expected" : null != e.userstate && e.hasOwnProperty("userstate") && !a.isInteger(e.userstate) ? "userstate: integer expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserReadyRes) return e;
var t = new c.GameHoodleProto.UserReadyRes();
null != e.status && (t.status = 0 | e.status);
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.userstate && (t.userstate = 0 | e.userstate);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.seatid = 0;
o.userstate = 0;
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.userstate && e.hasOwnProperty("userstate") && (o.userstate = e.userstate);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GameStartRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GameStartRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.GameStartRes) return e;
var t = new c.GameHoodleProto.GameStartRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GameEndRes = function() {
function e(e) {
this.status = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.status && e.status.length) {
t.uint32(10).fork();
for (var o = 0; o < e.status.length; ++o) t.sint32(e.status[o]);
t.ldelim();
}
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GameEndRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status && n.status.length || (n.status = []);
if (2 == (7 & r)) for (var s = e.uint32() + e.pos; e.pos < s; ) n.status.push(e.sint32()); else n.status.push(e.sint32());
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.status && e.hasOwnProperty("status")) {
if (!Array.isArray(e.status)) return "status: array expected";
for (var t = 0; t < e.status.length; ++t) if (!a.isInteger(e.status[t])) return "status: integer[] expected";
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.GameEndRes) return e;
var t = new c.GameHoodleProto.GameEndRes();
if (e.status) {
if (!Array.isArray(e.status)) throw TypeError(".GameHoodleProto.GameEndRes.status: array expected");
t.status = [];
for (var o = 0; o < e.status.length; ++o) t.status[o] = 0 | e.status[o];
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.status = []);
if (e.status && e.status.length) {
o.status = [];
for (var n = 0; n < e.status.length; ++n) o.status[n] = e.status[n];
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserOfflineRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserOfflineRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? null : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserOfflineRes) return e;
var t = new c.GameHoodleProto.UserOfflineRes();
null != e.seatid && (t.seatid = 0 | e.seatid);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.seatid = 0);
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.LoginLogicReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.LoginLogicReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.LoginLogicReq ? e : new c.GameHoodleProto.LoginLogicReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.LoginLogicRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.LoginLogicRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.LoginLogicRes) return e;
var t = new c.GameHoodleProto.LoginLogicRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnePlayerPos = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.prototype.posx = "";
e.prototype.posy = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
t.uint32(18).string(e.posx);
t.uint32(26).string(e.posy);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.OnePlayerPos(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

case 2:
n.posx = e.string();
break;

case 3:
n.posy = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("posx")) throw a.ProtocolError("missing required 'posx'", {
instance: n
});
if (!n.hasOwnProperty("posy")) throw a.ProtocolError("missing required 'posy'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? a.isString(e.posx) ? a.isString(e.posy) ? null : "posy: string expected" : "posx: string expected" : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.OnePlayerPos) return e;
var t = new c.GameHoodleProto.OnePlayerPos();
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.posx && (t.posx = String(e.posx));
null != e.posy && (t.posy = String(e.posy));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.seatid = 0;
o.posx = "";
o.posy = "";
}
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.posx && e.hasOwnProperty("posx") && (o.posx = e.posx);
null != e.posy && e.hasOwnProperty("posy") && (o.posy = e.posy);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnePlayerPower = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.prototype.power = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
t.uint32(16).sint32(e.power);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.OnePlayerPower(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

case 2:
n.power = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("power")) throw a.ProtocolError("missing required 'power'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? a.isInteger(e.power) ? null : "power: integer expected" : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.OnePlayerPower) return e;
var t = new c.GameHoodleProto.OnePlayerPower();
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.power && (t.power = 0 | e.power);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.seatid = 0;
o.power = 0;
}
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.power && e.hasOwnProperty("power") && (o.power = e.power);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnePlayerScore = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.prototype.score = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
t.uint32(18).string(e.score);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.OnePlayerScore(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

case 2:
n.score = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("score")) throw a.ProtocolError("missing required 'score'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? a.isString(e.score) ? null : "score: string expected" : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.OnePlayerScore) return e;
var t = new c.GameHoodleProto.OnePlayerScore();
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.score && (t.score = String(e.score));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.seatid = 0;
o.score = "";
}
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.score && e.hasOwnProperty("score") && (o.score = e.score);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OnPlayerGolds = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.prototype.gold = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
t.uint32(18).string(e.gold);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.OnPlayerGolds(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

case 2:
n.gold = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("gold")) throw a.ProtocolError("missing required 'gold'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? a.isString(e.gold) ? null : "gold: string expected" : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.OnPlayerGolds) return e;
var t = new c.GameHoodleProto.OnPlayerGolds();
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.gold && (t.gold = String(e.gold));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.seatid = 0;
o.gold = "";
}
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.gold && e.hasOwnProperty("gold") && (o.gold = e.gold);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerFirstBallPosRes = function() {
function e(e) {
this.positions = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.positions = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.positions && e.positions.length) for (var o = 0; o < e.positions.length; ++o) c.GameHoodleProto.OnePlayerPos.encode(e.positions[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerFirstBallPosRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.positions && n.positions.length || (n.positions = []);
n.positions.push(c.GameHoodleProto.OnePlayerPos.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.positions && e.hasOwnProperty("positions")) {
if (!Array.isArray(e.positions)) return "positions: array expected";
for (var t = 0; t < e.positions.length; ++t) {
var o = c.GameHoodleProto.OnePlayerPos.verify(e.positions[t]);
if (o) return "positions." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerFirstBallPosRes) return e;
var t = new c.GameHoodleProto.PlayerFirstBallPosRes();
if (e.positions) {
if (!Array.isArray(e.positions)) throw TypeError(".GameHoodleProto.PlayerFirstBallPosRes.positions: array expected");
t.positions = [];
for (var o = 0; o < e.positions.length; ++o) {
if ("object" !== n(e.positions[o])) throw TypeError(".GameHoodleProto.PlayerFirstBallPosRes.positions: object expected");
t.positions[o] = c.GameHoodleProto.OnePlayerPos.fromObject(e.positions[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.positions = []);
if (e.positions && e.positions.length) {
o.positions = [];
for (var n = 0; n < e.positions.length; ++n) o.positions[n] = c.GameHoodleProto.OnePlayerPos.toObject(e.positions[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerPowerRes = function() {
function e(e) {
this.powers = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.powers = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.powers && e.powers.length) for (var o = 0; o < e.powers.length; ++o) c.GameHoodleProto.OnePlayerPower.encode(e.powers[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerPowerRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.powers && n.powers.length || (n.powers = []);
n.powers.push(c.GameHoodleProto.OnePlayerPower.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.powers && e.hasOwnProperty("powers")) {
if (!Array.isArray(e.powers)) return "powers: array expected";
for (var t = 0; t < e.powers.length; ++t) {
var o = c.GameHoodleProto.OnePlayerPower.verify(e.powers[t]);
if (o) return "powers." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerPowerRes) return e;
var t = new c.GameHoodleProto.PlayerPowerRes();
if (e.powers) {
if (!Array.isArray(e.powers)) throw TypeError(".GameHoodleProto.PlayerPowerRes.powers: array expected");
t.powers = [];
for (var o = 0; o < e.powers.length; ++o) {
if ("object" !== n(e.powers[o])) throw TypeError(".GameHoodleProto.PlayerPowerRes.powers: object expected");
t.powers[o] = c.GameHoodleProto.OnePlayerPower.fromObject(e.powers[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.powers = []);
if (e.powers && e.powers.length) {
o.powers = [];
for (var n = 0; n < e.powers.length; ++n) o.powers[n] = c.GameHoodleProto.OnePlayerPower.toObject(e.powers[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerShootReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.seatid = 0;
e.prototype.posx = "";
e.prototype.posy = "";
e.prototype.shootpower = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.seatid);
t.uint32(18).string(e.posx);
t.uint32(26).string(e.posy);
null != e.shootpower && e.hasOwnProperty("shootpower") && t.uint32(32).int32(e.shootpower);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerShootReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.seatid = e.sint32();
break;

case 2:
n.posx = e.string();
break;

case 3:
n.posy = e.string();
break;

case 4:
n.shootpower = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("posx")) throw a.ProtocolError("missing required 'posx'", {
instance: n
});
if (!n.hasOwnProperty("posy")) throw a.ProtocolError("missing required 'posy'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.seatid) ? a.isString(e.posx) ? a.isString(e.posy) ? null != e.shootpower && e.hasOwnProperty("shootpower") && !a.isInteger(e.shootpower) ? "shootpower: integer expected" : null : "posy: string expected" : "posx: string expected" : "seatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerShootReq) return e;
var t = new c.GameHoodleProto.PlayerShootReq();
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.posx && (t.posx = String(e.posx));
null != e.posy && (t.posy = String(e.posy));
null != e.shootpower && (t.shootpower = 0 | e.shootpower);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.seatid = 0;
o.posx = "";
o.posy = "";
o.shootpower = 0;
}
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.posx && e.hasOwnProperty("posx") && (o.posx = e.posx);
null != e.posy && e.hasOwnProperty("posy") && (o.posy = e.posy);
null != e.shootpower && e.hasOwnProperty("shootpower") && (o.shootpower = e.shootpower);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerShootRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.seatid = 0;
e.prototype.posx = "";
e.prototype.posy = "";
e.prototype.shootpower = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
t.uint32(16).sint32(e.seatid);
t.uint32(26).string(e.posx);
t.uint32(34).string(e.posy);
null != e.shootpower && e.hasOwnProperty("shootpower") && t.uint32(40).int32(e.shootpower);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerShootRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.seatid = e.sint32();
break;

case 3:
n.posx = e.string();
break;

case 4:
n.posy = e.string();
break;

case 5:
n.shootpower = e.int32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
if (!n.hasOwnProperty("seatid")) throw a.ProtocolError("missing required 'seatid'", {
instance: n
});
if (!n.hasOwnProperty("posx")) throw a.ProtocolError("missing required 'posx'", {
instance: n
});
if (!n.hasOwnProperty("posy")) throw a.ProtocolError("missing required 'posy'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? a.isInteger(e.seatid) ? a.isString(e.posx) ? a.isString(e.posy) ? null != e.shootpower && e.hasOwnProperty("shootpower") && !a.isInteger(e.shootpower) ? "shootpower: integer expected" : null : "posy: string expected" : "posx: string expected" : "seatid: integer expected" : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerShootRes) return e;
var t = new c.GameHoodleProto.PlayerShootRes();
null != e.status && (t.status = 0 | e.status);
null != e.seatid && (t.seatid = 0 | e.seatid);
null != e.posx && (t.posx = String(e.posx));
null != e.posy && (t.posy = String(e.posy));
null != e.shootpower && (t.shootpower = 0 | e.shootpower);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.seatid = 0;
o.posx = "";
o.posy = "";
o.shootpower = 0;
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.seatid && e.hasOwnProperty("seatid") && (o.seatid = e.seatid);
null != e.posx && e.hasOwnProperty("posx") && (o.posx = e.posx);
null != e.posy && e.hasOwnProperty("posy") && (o.posy = e.posy);
null != e.shootpower && e.hasOwnProperty("shootpower") && (o.shootpower = e.shootpower);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerBallPosReq = function() {
function e(e) {
this.positions = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.positions = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.positions && e.positions.length) for (var o = 0; o < e.positions.length; ++o) c.GameHoodleProto.OnePlayerPos.encode(e.positions[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerBallPosReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.positions && n.positions.length || (n.positions = []);
n.positions.push(c.GameHoodleProto.OnePlayerPos.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.positions && e.hasOwnProperty("positions")) {
if (!Array.isArray(e.positions)) return "positions: array expected";
for (var t = 0; t < e.positions.length; ++t) {
var o = c.GameHoodleProto.OnePlayerPos.verify(e.positions[t]);
if (o) return "positions." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerBallPosReq) return e;
var t = new c.GameHoodleProto.PlayerBallPosReq();
if (e.positions) {
if (!Array.isArray(e.positions)) throw TypeError(".GameHoodleProto.PlayerBallPosReq.positions: array expected");
t.positions = [];
for (var o = 0; o < e.positions.length; ++o) {
if ("object" !== n(e.positions[o])) throw TypeError(".GameHoodleProto.PlayerBallPosReq.positions: object expected");
t.positions[o] = c.GameHoodleProto.OnePlayerPos.fromObject(e.positions[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.positions = []);
if (e.positions && e.positions.length) {
o.positions = [];
for (var n = 0; n < e.positions.length; ++n) o.positions[n] = c.GameHoodleProto.OnePlayerPos.toObject(e.positions[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerBallPosRes = function() {
function e(e) {
this.positions = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.positions = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
if (null != e.positions && e.positions.length) for (var o = 0; o < e.positions.length; ++o) c.GameHoodleProto.OnePlayerPos.encode(e.positions[o], t.uint32(18).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerBallPosRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.positions && n.positions.length || (n.positions = []);
n.positions.push(c.GameHoodleProto.OnePlayerPos.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (!a.isInteger(e.status)) return "status: integer expected";
if (null != e.positions && e.hasOwnProperty("positions")) {
if (!Array.isArray(e.positions)) return "positions: array expected";
for (var t = 0; t < e.positions.length; ++t) {
var o = c.GameHoodleProto.OnePlayerPos.verify(e.positions[t]);
if (o) return "positions." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerBallPosRes) return e;
var t = new c.GameHoodleProto.PlayerBallPosRes();
null != e.status && (t.status = 0 | e.status);
if (e.positions) {
if (!Array.isArray(e.positions)) throw TypeError(".GameHoodleProto.PlayerBallPosRes.positions: array expected");
t.positions = [];
for (var o = 0; o < e.positions.length; ++o) {
if ("object" !== n(e.positions[o])) throw TypeError(".GameHoodleProto.PlayerBallPosRes.positions: object expected");
t.positions[o] = c.GameHoodleProto.OnePlayerPos.fromObject(e.positions[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.positions = []);
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
if (e.positions && e.positions.length) {
o.positions = [];
for (var n = 0; n < e.positions.length; ++n) o.positions[n] = c.GameHoodleProto.OnePlayerPos.toObject(e.positions[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerIsShootedReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.srcseatid = 0;
e.prototype.desseatid = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.srcseatid);
t.uint32(16).sint32(e.desseatid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerIsShootedReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.srcseatid = e.sint32();
break;

case 2:
n.desseatid = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("srcseatid")) throw a.ProtocolError("missing required 'srcseatid'", {
instance: n
});
if (!n.hasOwnProperty("desseatid")) throw a.ProtocolError("missing required 'desseatid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.srcseatid) ? a.isInteger(e.desseatid) ? null : "desseatid: integer expected" : "srcseatid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerIsShootedReq) return e;
var t = new c.GameHoodleProto.PlayerIsShootedReq();
null != e.srcseatid && (t.srcseatid = 0 | e.srcseatid);
null != e.desseatid && (t.desseatid = 0 | e.desseatid);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.srcseatid = 0;
o.desseatid = 0;
}
null != e.srcseatid && e.hasOwnProperty("srcseatid") && (o.srcseatid = e.srcseatid);
null != e.desseatid && e.hasOwnProperty("desseatid") && (o.desseatid = e.desseatid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerIsShootedRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.srcseatid = 0;
e.prototype.desseatid = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
t.uint32(16).sint32(e.srcseatid);
t.uint32(24).sint32(e.desseatid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerIsShootedRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.srcseatid = e.sint32();
break;

case 3:
n.desseatid = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
if (!n.hasOwnProperty("srcseatid")) throw a.ProtocolError("missing required 'srcseatid'", {
instance: n
});
if (!n.hasOwnProperty("desseatid")) throw a.ProtocolError("missing required 'desseatid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? a.isInteger(e.srcseatid) ? a.isInteger(e.desseatid) ? null : "desseatid: integer expected" : "srcseatid: integer expected" : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerIsShootedRes) return e;
var t = new c.GameHoodleProto.PlayerIsShootedRes();
null != e.status && (t.status = 0 | e.status);
null != e.srcseatid && (t.srcseatid = 0 | e.srcseatid);
null != e.desseatid && (t.desseatid = 0 | e.desseatid);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.srcseatid = 0;
o.desseatid = 0;
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.srcseatid && e.hasOwnProperty("srcseatid") && (o.srcseatid = e.srcseatid);
null != e.desseatid && e.hasOwnProperty("desseatid") && (o.desseatid = e.desseatid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.GameResultRes = function() {
function e(e) {
this.scores = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.scores = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.scores && e.scores.length) for (var o = 0; o < e.scores.length; ++o) c.GameHoodleProto.OnePlayerScore.encode(e.scores[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.GameResultRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.scores && n.scores.length || (n.scores = []);
n.scores.push(c.GameHoodleProto.OnePlayerScore.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.scores && e.hasOwnProperty("scores")) {
if (!Array.isArray(e.scores)) return "scores: array expected";
for (var t = 0; t < e.scores.length; ++t) {
var o = c.GameHoodleProto.OnePlayerScore.verify(e.scores[t]);
if (o) return "scores." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.GameResultRes) return e;
var t = new c.GameHoodleProto.GameResultRes();
if (e.scores) {
if (!Array.isArray(e.scores)) throw TypeError(".GameHoodleProto.GameResultRes.scores: array expected");
t.scores = [];
for (var o = 0; o < e.scores.length; ++o) {
if ("object" !== n(e.scores[o])) throw TypeError(".GameHoodleProto.GameResultRes.scores: object expected");
t.scores[o] = c.GameHoodleProto.OnePlayerScore.fromObject(e.scores[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.scores = []);
if (e.scores && e.scores.length) {
o.scores = [];
for (var n = 0; n < e.scores.length; ++n) o.scores[n] = c.GameHoodleProto.OnePlayerScore.toObject(e.scores[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.TotalGameResultRes = function() {
function e(e) {
this.scores = [];
this.golds = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.scores = a.emptyArray;
e.prototype.golds = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.scores && e.scores.length) for (var o = 0; o < e.scores.length; ++o) c.GameHoodleProto.OnePlayerScore.encode(e.scores[o], t.uint32(10).fork()).ldelim();
if (null != e.golds && e.golds.length) for (o = 0; o < e.golds.length; ++o) c.GameHoodleProto.OnPlayerGolds.encode(e.golds[o], t.uint32(18).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.TotalGameResultRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.scores && n.scores.length || (n.scores = []);
n.scores.push(c.GameHoodleProto.OnePlayerScore.decode(e, e.uint32()));
break;

case 2:
n.golds && n.golds.length || (n.golds = []);
n.golds.push(c.GameHoodleProto.OnPlayerGolds.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.scores && e.hasOwnProperty("scores")) {
if (!Array.isArray(e.scores)) return "scores: array expected";
for (var t = 0; t < e.scores.length; ++t) {
if (o = c.GameHoodleProto.OnePlayerScore.verify(e.scores[t])) return "scores." + o;
}
}
if (null != e.golds && e.hasOwnProperty("golds")) {
if (!Array.isArray(e.golds)) return "golds: array expected";
for (t = 0; t < e.golds.length; ++t) {
var o;
if (o = c.GameHoodleProto.OnPlayerGolds.verify(e.golds[t])) return "golds." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.TotalGameResultRes) return e;
var t = new c.GameHoodleProto.TotalGameResultRes();
if (e.scores) {
if (!Array.isArray(e.scores)) throw TypeError(".GameHoodleProto.TotalGameResultRes.scores: array expected");
t.scores = [];
for (var o = 0; o < e.scores.length; ++o) {
if ("object" !== n(e.scores[o])) throw TypeError(".GameHoodleProto.TotalGameResultRes.scores: object expected");
t.scores[o] = c.GameHoodleProto.OnePlayerScore.fromObject(e.scores[o]);
}
}
if (e.golds) {
if (!Array.isArray(e.golds)) throw TypeError(".GameHoodleProto.TotalGameResultRes.golds: array expected");
t.golds = [];
for (o = 0; o < e.golds.length; ++o) {
if ("object" !== n(e.golds[o])) throw TypeError(".GameHoodleProto.TotalGameResultRes.golds: object expected");
t.golds[o] = c.GameHoodleProto.OnPlayerGolds.fromObject(e.golds[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.arrays || t.defaults) {
o.scores = [];
o.golds = [];
}
if (e.scores && e.scores.length) {
o.scores = [];
for (var n = 0; n < e.scores.length; ++n) o.scores[n] = c.GameHoodleProto.OnePlayerScore.toObject(e.scores[n], t);
}
if (e.golds && e.golds.length) {
o.golds = [];
for (n = 0; n < e.golds.length; ++n) o.golds[n] = c.GameHoodleProto.OnPlayerGolds.toObject(e.golds[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.PlayerScoreRes = function() {
function e(e) {
this.scores = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.scores = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
if (null != e.scores && e.scores.length) for (var o = 0; o < e.scores.length; ++o) c.GameHoodleProto.OnePlayerScore.encode(e.scores[o], t.uint32(10).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.PlayerScoreRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.scores && n.scores.length || (n.scores = []);
n.scores.push(c.GameHoodleProto.OnePlayerScore.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (null != e.scores && e.hasOwnProperty("scores")) {
if (!Array.isArray(e.scores)) return "scores: array expected";
for (var t = 0; t < e.scores.length; ++t) {
var o = c.GameHoodleProto.OnePlayerScore.verify(e.scores[t]);
if (o) return "scores." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.PlayerScoreRes) return e;
var t = new c.GameHoodleProto.PlayerScoreRes();
if (e.scores) {
if (!Array.isArray(e.scores)) throw TypeError(".GameHoodleProto.PlayerScoreRes.scores: array expected");
t.scores = [];
for (var o = 0; o < e.scores.length; ++o) {
if ("object" !== n(e.scores[o])) throw TypeError(".GameHoodleProto.PlayerScoreRes.scores: object expected");
t.scores[o] = c.GameHoodleProto.OnePlayerScore.fromObject(e.scores[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.scores = []);
if (e.scores && e.scores.length) {
o.scores = [];
for (var n = 0; n < e.scores.length; ++n) o.scores[n] = c.GameHoodleProto.OnePlayerScore.toObject(e.scores[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserMatchReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.zoomid = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.zoomid);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserMatchReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.zoomid = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("zoomid")) throw a.ProtocolError("missing required 'zoomid'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.zoomid) ? null : "zoomid: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserMatchReq) return e;
var t = new c.GameHoodleProto.UserMatchReq();
null != e.zoomid && (t.zoomid = 0 | e.zoomid);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.zoomid = 0);
null != e.zoomid && e.hasOwnProperty("zoomid") && (o.zoomid = e.zoomid);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserMatchRes = function() {
function e(e) {
this.userinfo = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.matchsuccess = !1;
e.prototype.userinfo = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.matchsuccess && e.hasOwnProperty("matchsuccess") && t.uint32(16).bool(e.matchsuccess);
if (null != e.userinfo && e.userinfo.length) for (var o = 0; o < e.userinfo.length; ++o) c.GameHoodleProto.UserInfo.encode(e.userinfo[o], t.uint32(26).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserMatchRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.matchsuccess = e.bool();
break;

case 3:
n.userinfo && n.userinfo.length || (n.userinfo = []);
n.userinfo.push(c.GameHoodleProto.UserInfo.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (!a.isInteger(e.status)) return "status: integer expected";
if (null != e.matchsuccess && e.hasOwnProperty("matchsuccess") && "boolean" != typeof e.matchsuccess) return "matchsuccess: boolean expected";
if (null != e.userinfo && e.hasOwnProperty("userinfo")) {
if (!Array.isArray(e.userinfo)) return "userinfo: array expected";
for (var t = 0; t < e.userinfo.length; ++t) {
var o = c.GameHoodleProto.UserInfo.verify(e.userinfo[t]);
if (o) return "userinfo." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserMatchRes) return e;
var t = new c.GameHoodleProto.UserMatchRes();
null != e.status && (t.status = 0 | e.status);
null != e.matchsuccess && (t.matchsuccess = Boolean(e.matchsuccess));
if (e.userinfo) {
if (!Array.isArray(e.userinfo)) throw TypeError(".GameHoodleProto.UserMatchRes.userinfo: array expected");
t.userinfo = [];
for (var o = 0; o < e.userinfo.length; ++o) {
if ("object" !== n(e.userinfo[o])) throw TypeError(".GameHoodleProto.UserMatchRes.userinfo: object expected");
t.userinfo[o] = c.GameHoodleProto.UserInfo.fromObject(e.userinfo[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.userinfo = []);
if (t.defaults) {
o.status = 0;
o.matchsuccess = !1;
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.matchsuccess && e.hasOwnProperty("matchsuccess") && (o.matchsuccess = e.matchsuccess);
if (e.userinfo && e.userinfo.length) {
o.userinfo = [];
for (var n = 0; n < e.userinfo.length; ++n) o.userinfo[n] = c.GameHoodleProto.UserInfo.toObject(e.userinfo[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserStopMatchReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserStopMatchReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.UserStopMatchReq ? e : new c.GameHoodleProto.UserStopMatchReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserStopMatchRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserStopMatchRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserStopMatchRes) return e;
var t = new c.GameHoodleProto.UserStopMatchRes();
null != e.status && (t.status = 0 | e.status);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserGameInfoReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserGameInfoReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.UserGameInfoReq ? e : new c.GameHoodleProto.UserGameInfoReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserGameInfoRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.userinfostring = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.userinfostring && e.hasOwnProperty("userinfostring") && t.uint32(18).string(e.userinfostring);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserGameInfoRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.userinfostring = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.userinfostring && e.hasOwnProperty("userinfostring") && !a.isString(e.userinfostring) ? "userinfostring: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserGameInfoRes) return e;
var t = new c.GameHoodleProto.UserGameInfoRes();
null != e.status && (t.status = 0 | e.status);
null != e.userinfostring && (t.userinfostring = String(e.userinfostring));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.userinfostring = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.userinfostring && e.hasOwnProperty("userinfostring") && (o.userinfostring = e.userinfostring);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserBallInfoReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserBallInfoReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.UserBallInfoReq ? e : new c.GameHoodleProto.UserBallInfoReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UserBallInfoRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.userballinfostring = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && t.uint32(18).string(e.userballinfostring);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UserBallInfoRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.userballinfostring = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && !a.isString(e.userballinfostring) ? "userballinfostring: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UserBallInfoRes) return e;
var t = new c.GameHoodleProto.UserBallInfoRes();
null != e.status && (t.status = 0 | e.status);
null != e.userballinfostring && (t.userballinfostring = String(e.userballinfostring));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.userballinfostring = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && (o.userballinfostring = e.userballinfostring);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UpdateUserBallReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.updatetype = 0;
e.prototype.level = 0;
e.prototype.count = 0;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.updatetype);
t.uint32(16).sint32(e.level);
t.uint32(24).sint32(e.count);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UpdateUserBallReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.updatetype = e.sint32();
break;

case 2:
n.level = e.sint32();
break;

case 3:
n.count = e.sint32();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("updatetype")) throw a.ProtocolError("missing required 'updatetype'", {
instance: n
});
if (!n.hasOwnProperty("level")) throw a.ProtocolError("missing required 'level'", {
instance: n
});
if (!n.hasOwnProperty("count")) throw a.ProtocolError("missing required 'count'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.updatetype) ? a.isInteger(e.level) ? a.isInteger(e.count) ? null : "count: integer expected" : "level: integer expected" : "updatetype: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UpdateUserBallReq) return e;
var t = new c.GameHoodleProto.UpdateUserBallReq();
null != e.updatetype && (t.updatetype = 0 | e.updatetype);
null != e.level && (t.level = 0 | e.level);
null != e.count && (t.count = 0 | e.count);
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.updatetype = 0;
o.level = 0;
o.count = 0;
}
null != e.updatetype && e.hasOwnProperty("updatetype") && (o.updatetype = e.updatetype);
null != e.level && e.hasOwnProperty("level") && (o.level = e.level);
null != e.count && e.hasOwnProperty("count") && (o.count = e.count);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.UpdateUserBallRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.userballinfostring = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && t.uint32(18).string(e.userballinfostring);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.UpdateUserBallRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.userballinfostring = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && !a.isString(e.userballinfostring) ? "userballinfostring: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.UpdateUserBallRes) return e;
var t = new c.GameHoodleProto.UpdateUserBallRes();
null != e.status && (t.status = 0 | e.status);
null != e.userballinfostring && (t.userballinfostring = String(e.userballinfostring));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.userballinfostring = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.userballinfostring && e.hasOwnProperty("userballinfostring") && (o.userballinfostring = e.userballinfostring);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.OneStoreProp = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.propsvrindex = 0;
e.prototype.propid = 0;
e.prototype.propcount = 0;
e.prototype.propprice = 0;
e.prototype.propinfo = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.propsvrindex);
t.uint32(16).sint32(e.propid);
t.uint32(24).sint32(e.propcount);
t.uint32(32).sint32(e.propprice);
t.uint32(42).string(e.propinfo);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.OneStoreProp(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.propsvrindex = e.sint32();
break;

case 2:
n.propid = e.sint32();
break;

case 3:
n.propcount = e.sint32();
break;

case 4:
n.propprice = e.sint32();
break;

case 5:
n.propinfo = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("propsvrindex")) throw a.ProtocolError("missing required 'propsvrindex'", {
instance: n
});
if (!n.hasOwnProperty("propid")) throw a.ProtocolError("missing required 'propid'", {
instance: n
});
if (!n.hasOwnProperty("propcount")) throw a.ProtocolError("missing required 'propcount'", {
instance: n
});
if (!n.hasOwnProperty("propprice")) throw a.ProtocolError("missing required 'propprice'", {
instance: n
});
if (!n.hasOwnProperty("propinfo")) throw a.ProtocolError("missing required 'propinfo'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.propsvrindex) ? a.isInteger(e.propid) ? a.isInteger(e.propcount) ? a.isInteger(e.propprice) ? a.isString(e.propinfo) ? null : "propinfo: string expected" : "propprice: integer expected" : "propcount: integer expected" : "propid: integer expected" : "propsvrindex: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.OneStoreProp) return e;
var t = new c.GameHoodleProto.OneStoreProp();
null != e.propsvrindex && (t.propsvrindex = 0 | e.propsvrindex);
null != e.propid && (t.propid = 0 | e.propid);
null != e.propcount && (t.propcount = 0 | e.propcount);
null != e.propprice && (t.propprice = 0 | e.propprice);
null != e.propinfo && (t.propinfo = String(e.propinfo));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.propsvrindex = 0;
o.propid = 0;
o.propcount = 0;
o.propprice = 0;
o.propinfo = "";
}
null != e.propsvrindex && e.hasOwnProperty("propsvrindex") && (o.propsvrindex = e.propsvrindex);
null != e.propid && e.hasOwnProperty("propid") && (o.propid = e.propid);
null != e.propcount && e.hasOwnProperty("propcount") && (o.propcount = e.propcount);
null != e.propprice && e.hasOwnProperty("propprice") && (o.propprice = e.propprice);
null != e.propinfo && e.hasOwnProperty("propinfo") && (o.propinfo = e.propinfo);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.StoreListReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.StoreListReq(); e.pos < o; ) {
var r = e.uint32();
e.skipType(7 & r);
}
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : null;
};
e.fromObject = function(e) {
return e instanceof c.GameHoodleProto.StoreListReq ? e : new c.GameHoodleProto.StoreListReq();
};
e.toObject = function() {
return {};
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.StoreListRes = function() {
function e(e) {
this.storeprops = [];
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.storeprops = a.emptyArray;
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
if (null != e.storeprops && e.storeprops.length) for (var o = 0; o < e.storeprops.length; ++o) c.GameHoodleProto.OneStoreProp.encode(e.storeprops[o], t.uint32(18).fork()).ldelim();
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.StoreListRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.storeprops && n.storeprops.length || (n.storeprops = []);
n.storeprops.push(c.GameHoodleProto.OneStoreProp.decode(e, e.uint32()));
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
if ("object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e) return "object expected";
if (!a.isInteger(e.status)) return "status: integer expected";
if (null != e.storeprops && e.hasOwnProperty("storeprops")) {
if (!Array.isArray(e.storeprops)) return "storeprops: array expected";
for (var t = 0; t < e.storeprops.length; ++t) {
var o = c.GameHoodleProto.OneStoreProp.verify(e.storeprops[t]);
if (o) return "storeprops." + o;
}
}
return null;
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.StoreListRes) return e;
var t = new c.GameHoodleProto.StoreListRes();
null != e.status && (t.status = 0 | e.status);
if (e.storeprops) {
if (!Array.isArray(e.storeprops)) throw TypeError(".GameHoodleProto.StoreListRes.storeprops: array expected");
t.storeprops = [];
for (var o = 0; o < e.storeprops.length; ++o) {
if ("object" !== n(e.storeprops[o])) throw TypeError(".GameHoodleProto.StoreListRes.storeprops: object expected");
t.storeprops[o] = c.GameHoodleProto.OneStoreProp.fromObject(e.storeprops[o]);
}
}
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
(t.arrays || t.defaults) && (o.storeprops = []);
t.defaults && (o.status = 0);
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
if (e.storeprops && e.storeprops.length) {
o.storeprops = [];
for (var n = 0; n < e.storeprops.length; ++n) o.storeprops[n] = c.GameHoodleProto.OneStoreProp.toObject(e.storeprops[n], t);
}
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BuyThingsReq = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.propsvrindex = 0;
e.prototype.propid = 0;
e.prototype.propcount = 0;
e.prototype.propprice = 0;
e.prototype.propinfo = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.propsvrindex);
t.uint32(16).sint32(e.propid);
t.uint32(24).sint32(e.propcount);
t.uint32(32).sint32(e.propprice);
t.uint32(42).string(e.propinfo);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.BuyThingsReq(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.propsvrindex = e.sint32();
break;

case 2:
n.propid = e.sint32();
break;

case 3:
n.propcount = e.sint32();
break;

case 4:
n.propprice = e.sint32();
break;

case 5:
n.propinfo = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("propsvrindex")) throw a.ProtocolError("missing required 'propsvrindex'", {
instance: n
});
if (!n.hasOwnProperty("propid")) throw a.ProtocolError("missing required 'propid'", {
instance: n
});
if (!n.hasOwnProperty("propcount")) throw a.ProtocolError("missing required 'propcount'", {
instance: n
});
if (!n.hasOwnProperty("propprice")) throw a.ProtocolError("missing required 'propprice'", {
instance: n
});
if (!n.hasOwnProperty("propinfo")) throw a.ProtocolError("missing required 'propinfo'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.propsvrindex) ? a.isInteger(e.propid) ? a.isInteger(e.propcount) ? a.isInteger(e.propprice) ? a.isString(e.propinfo) ? null : "propinfo: string expected" : "propprice: integer expected" : "propcount: integer expected" : "propid: integer expected" : "propsvrindex: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.BuyThingsReq) return e;
var t = new c.GameHoodleProto.BuyThingsReq();
null != e.propsvrindex && (t.propsvrindex = 0 | e.propsvrindex);
null != e.propid && (t.propid = 0 | e.propid);
null != e.propcount && (t.propcount = 0 | e.propcount);
null != e.propprice && (t.propprice = 0 | e.propprice);
null != e.propinfo && (t.propinfo = String(e.propinfo));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.propsvrindex = 0;
o.propid = 0;
o.propcount = 0;
o.propprice = 0;
o.propinfo = "";
}
null != e.propsvrindex && e.hasOwnProperty("propsvrindex") && (o.propsvrindex = e.propsvrindex);
null != e.propid && e.hasOwnProperty("propid") && (o.propid = e.propid);
null != e.propcount && e.hasOwnProperty("propcount") && (o.propcount = e.propcount);
null != e.propprice && e.hasOwnProperty("propprice") && (o.propprice = e.propprice);
null != e.propinfo && e.hasOwnProperty("propinfo") && (o.propinfo = e.propinfo);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
e.BuyThingsRes = function() {
function e(e) {
if (e) for (var t = Object.keys(e), o = 0; o < t.length; ++o) null != e[t[o]] && (this[t[o]] = e[t[o]]);
}
e.prototype.status = 0;
e.prototype.propsvrindex = 0;
e.prototype.propid = 0;
e.prototype.propcount = 0;
e.prototype.propprice = 0;
e.prototype.propinfo = "";
e.create = function(t) {
return new e(t);
};
e.encode = function(e, t) {
t || (t = s.create());
t.uint32(8).sint32(e.status);
null != e.propsvrindex && e.hasOwnProperty("propsvrindex") && t.uint32(16).sint32(e.propsvrindex);
null != e.propid && e.hasOwnProperty("propid") && t.uint32(24).sint32(e.propid);
null != e.propcount && e.hasOwnProperty("propcount") && t.uint32(32).sint32(e.propcount);
null != e.propprice && e.hasOwnProperty("propprice") && t.uint32(40).sint32(e.propprice);
null != e.propinfo && e.hasOwnProperty("propinfo") && t.uint32(50).string(e.propinfo);
return t;
};
e.encodeDelimited = function(e, t) {
return this.encode(e, t).ldelim();
};
e.decode = function(e, t) {
e instanceof i || (e = i.create(e));
for (var o = void 0 === t ? e.len : e.pos + t, n = new c.GameHoodleProto.BuyThingsRes(); e.pos < o; ) {
var r = e.uint32();
switch (r >>> 3) {
case 1:
n.status = e.sint32();
break;

case 2:
n.propsvrindex = e.sint32();
break;

case 3:
n.propid = e.sint32();
break;

case 4:
n.propcount = e.sint32();
break;

case 5:
n.propprice = e.sint32();
break;

case 6:
n.propinfo = e.string();
break;

default:
e.skipType(7 & r);
}
}
if (!n.hasOwnProperty("status")) throw a.ProtocolError("missing required 'status'", {
instance: n
});
return n;
};
e.decodeDelimited = function(e) {
e instanceof i || (e = new i(e));
return this.decode(e, e.uint32());
};
e.verify = function(e) {
return "object" !== ("undefined" == typeof e ? "undefined" : n(e)) || null === e ? "object expected" : a.isInteger(e.status) ? null != e.propsvrindex && e.hasOwnProperty("propsvrindex") && !a.isInteger(e.propsvrindex) ? "propsvrindex: integer expected" : null != e.propid && e.hasOwnProperty("propid") && !a.isInteger(e.propid) ? "propid: integer expected" : null != e.propcount && e.hasOwnProperty("propcount") && !a.isInteger(e.propcount) ? "propcount: integer expected" : null != e.propprice && e.hasOwnProperty("propprice") && !a.isInteger(e.propprice) ? "propprice: integer expected" : null != e.propinfo && e.hasOwnProperty("propinfo") && !a.isString(e.propinfo) ? "propinfo: string expected" : null : "status: integer expected";
};
e.fromObject = function(e) {
if (e instanceof c.GameHoodleProto.BuyThingsRes) return e;
var t = new c.GameHoodleProto.BuyThingsRes();
null != e.status && (t.status = 0 | e.status);
null != e.propsvrindex && (t.propsvrindex = 0 | e.propsvrindex);
null != e.propid && (t.propid = 0 | e.propid);
null != e.propcount && (t.propcount = 0 | e.propcount);
null != e.propprice && (t.propprice = 0 | e.propprice);
null != e.propinfo && (t.propinfo = String(e.propinfo));
return t;
};
e.toObject = function(e, t) {
t || (t = {});
var o = {};
if (t.defaults) {
o.status = 0;
o.propsvrindex = 0;
o.propid = 0;
o.propcount = 0;
o.propprice = 0;
o.propinfo = "";
}
null != e.status && e.hasOwnProperty("status") && (o.status = e.status);
null != e.propsvrindex && e.hasOwnProperty("propsvrindex") && (o.propsvrindex = e.propsvrindex);
null != e.propid && e.hasOwnProperty("propid") && (o.propid = e.propid);
null != e.propcount && e.hasOwnProperty("propcount") && (o.propcount = e.propcount);
null != e.propprice && e.hasOwnProperty("propprice") && (o.propprice = e.propprice);
null != e.propinfo && e.hasOwnProperty("propinfo") && (o.propinfo = e.propinfo);
return o;
};
e.prototype.toJSON = function() {
return this.constructor.toObject(this, r.util.toJSONOptions);
};
return e;
}();
return e;
}();
t.exports = c;
cc._RF.pop();
}, {
protobuf: "protobuf"
} ],
protobuf: [ function(require, module, exports) {
(function(global) {
"use strict";
cc._RF.push(module, "39c49Hf3S5McaG1zTGiz99v", "protobuf");
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
(function(undefined) {
(function(e, t, o) {
var n = function o(n) {
var r = t[n];
r || e[n][0].call(r = t[n] = {
exports: {}
}, o, r, r.exports);
return r.exports;
}(o[0]);
n.util.global.protobuf = n;
"function" == typeof define && define.amd && define([ "long" ], function(e) {
if (e && e.isLong) {
n.util.Long = e;
n.configure();
}
return n;
});
"object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module && module.exports && (module.exports = n);
})({
1: [ function(e, t, o) {
t.exports = function(e, t) {
var o = new Array(arguments.length - 1), n = 0, r = 2, i = !0;
for (;r < arguments.length; ) o[n++] = arguments[r++];
return new Promise(function(r, s) {
o[n] = function(e) {
if (i) {
i = !1;
if (e) s(e); else {
for (var t = new Array(arguments.length - 1), o = 0; o < t.length; ) t[o++] = arguments[o];
r.apply(null, t);
}
}
};
try {
e.apply(t || null, o);
} catch (e) {
if (i) {
i = !1;
s(e);
}
}
});
};
}, {} ],
2: [ function(e, t, o) {
var n = o;
n.length = function(e) {
var t = e.length;
if (!t) return 0;
for (var o = 0; --t % 4 > 1 && "=" === e.charAt(t); ) ++o;
return Math.ceil(3 * e.length) / 4 - o;
};
for (var r = new Array(64), i = new Array(123), s = 0; s < 64; ) i[r[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;
n.encode = function(e, t, o) {
for (var n, i = null, s = [], a = 0, c = 0; t < o; ) {
var u = e[t++];
switch (c) {
case 0:
s[a++] = r[u >> 2];
n = (3 & u) << 4;
c = 1;
break;

case 1:
s[a++] = r[n | u >> 4];
n = (15 & u) << 2;
c = 2;
break;

case 2:
s[a++] = r[n | u >> 6];
s[a++] = r[63 & u];
c = 0;
}
if (a > 8191) {
(i || (i = [])).push(String.fromCharCode.apply(String, s));
a = 0;
}
}
if (c) {
s[a++] = r[n];
s[a++] = 61;
1 === c && (s[a++] = 61);
}
if (i) {
a && i.push(String.fromCharCode.apply(String, s.slice(0, a)));
return i.join("");
}
return String.fromCharCode.apply(String, s.slice(0, a));
};
n.decode = function(e, t, o) {
for (var n, r = o, s = 0, a = 0; a < e.length; ) {
var c = e.charCodeAt(a++);
if (61 === c && s > 1) break;
if ((c = i[c]) === undefined) throw Error("invalid encoding");
switch (s) {
case 0:
n = c;
s = 1;
break;

case 1:
t[o++] = n << 2 | (48 & c) >> 4;
n = c;
s = 2;
break;

case 2:
t[o++] = (15 & n) << 4 | (60 & c) >> 2;
n = c;
s = 3;
break;

case 3:
t[o++] = (3 & n) << 6 | c;
s = 0;
}
}
if (1 === s) throw Error("invalid encoding");
return o - r;
};
n.test = function(e) {
return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
};
}, {} ],
3: [ function(e, t, o) {
t.exports = n;
function n() {
this._listeners = {};
}
n.prototype.on = function(e, t, o) {
(this._listeners[e] || (this._listeners[e] = [])).push({
fn: t,
ctx: o || this
});
return this;
};
n.prototype.off = function(e, t) {
if (e === undefined) this._listeners = {}; else if (t === undefined) this._listeners[e] = []; else for (var o = this._listeners[e], n = 0; n < o.length; ) o[n].fn === t ? o.splice(n, 1) : ++n;
return this;
};
n.prototype.emit = function(e) {
var t = this._listeners[e];
if (t) {
for (var o = [], n = 1; n < arguments.length; ) o.push(arguments[n++]);
for (n = 0; n < t.length; ) t[n].fn.apply(t[n++].ctx, o);
}
return this;
};
}, {} ],
4: [ function(e, t, o) {
t.exports = n(n);
function n(e) {
"undefined" != typeof Float32Array ? function() {
var t = new Float32Array([ -0 ]), o = new Uint8Array(t.buffer), n = 128 === o[3];
function r(e, n, r) {
t[0] = e;
n[r] = o[0];
n[r + 1] = o[1];
n[r + 2] = o[2];
n[r + 3] = o[3];
}
function i(e, n, r) {
t[0] = e;
n[r] = o[3];
n[r + 1] = o[2];
n[r + 2] = o[1];
n[r + 3] = o[0];
}
e.writeFloatLE = n ? r : i;
e.writeFloatBE = n ? i : r;
function s(e, n) {
o[0] = e[n];
o[1] = e[n + 1];
o[2] = e[n + 2];
o[3] = e[n + 3];
return t[0];
}
function a(e, n) {
o[3] = e[n];
o[2] = e[n + 1];
o[1] = e[n + 2];
o[0] = e[n + 3];
return t[0];
}
e.readFloatLE = n ? s : a;
e.readFloatBE = n ? a : s;
}() : function() {
function t(e, t, o, n) {
var r = t < 0 ? 1 : 0;
r && (t = -t);
if (0 === t) e(1 / t > 0 ? 0 : 2147483648, o, n); else if (isNaN(t)) e(2143289344, o, n); else if (t > 3.4028234663852886e38) e((r << 31 | 2139095040) >>> 0, o, n); else if (t < 1.1754943508222875e-38) e((r << 31 | Math.round(t / 1.401298464324817e-45)) >>> 0, o, n); else {
var i = Math.floor(Math.log(t) / Math.LN2);
e((r << 31 | i + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -i) * 8388608)) >>> 0, o, n);
}
}
e.writeFloatLE = t.bind(null, r);
e.writeFloatBE = t.bind(null, i);
function o(e, t, o) {
var n = e(t, o), r = 2 * (n >> 31) + 1, i = n >>> 23 & 255, s = 8388607 & n;
return 255 === i ? s ? NaN : Infinity * r : 0 === i ? 1.401298464324817e-45 * r * s : r * Math.pow(2, i - 150) * (s + 8388608);
}
e.readFloatLE = o.bind(null, s);
e.readFloatBE = o.bind(null, a);
}();
"undefined" != typeof Float64Array ? function() {
var t = new Float64Array([ -0 ]), o = new Uint8Array(t.buffer), n = 128 === o[7];
function r(e, n, r) {
t[0] = e;
n[r] = o[0];
n[r + 1] = o[1];
n[r + 2] = o[2];
n[r + 3] = o[3];
n[r + 4] = o[4];
n[r + 5] = o[5];
n[r + 6] = o[6];
n[r + 7] = o[7];
}
function i(e, n, r) {
t[0] = e;
n[r] = o[7];
n[r + 1] = o[6];
n[r + 2] = o[5];
n[r + 3] = o[4];
n[r + 4] = o[3];
n[r + 5] = o[2];
n[r + 6] = o[1];
n[r + 7] = o[0];
}
e.writeDoubleLE = n ? r : i;
e.writeDoubleBE = n ? i : r;
function s(e, n) {
o[0] = e[n];
o[1] = e[n + 1];
o[2] = e[n + 2];
o[3] = e[n + 3];
o[4] = e[n + 4];
o[5] = e[n + 5];
o[6] = e[n + 6];
o[7] = e[n + 7];
return t[0];
}
function a(e, n) {
o[7] = e[n];
o[6] = e[n + 1];
o[5] = e[n + 2];
o[4] = e[n + 3];
o[3] = e[n + 4];
o[2] = e[n + 5];
o[1] = e[n + 6];
o[0] = e[n + 7];
return t[0];
}
e.readDoubleLE = n ? s : a;
e.readDoubleBE = n ? a : s;
}() : function() {
function t(e, t, o, n, r, i) {
var s = n < 0 ? 1 : 0;
s && (n = -n);
if (0 === n) {
e(0, r, i + t);
e(1 / n > 0 ? 0 : 2147483648, r, i + o);
} else if (isNaN(n)) {
e(0, r, i + t);
e(2146959360, r, i + o);
} else if (n > 1.7976931348623157e308) {
e(0, r, i + t);
e((s << 31 | 2146435072) >>> 0, r, i + o);
} else {
var a;
if (n < 2.2250738585072014e-308) {
e((a = n / 5e-324) >>> 0, r, i + t);
e((s << 31 | a / 4294967296) >>> 0, r, i + o);
} else {
var c = Math.floor(Math.log(n) / Math.LN2);
1024 === c && (c = 1023);
e(4503599627370496 * (a = n * Math.pow(2, -c)) >>> 0, r, i + t);
e((s << 31 | c + 1023 << 20 | 1048576 * a & 1048575) >>> 0, r, i + o);
}
}
}
e.writeDoubleLE = t.bind(null, r, 0, 4);
e.writeDoubleBE = t.bind(null, i, 4, 0);
function o(e, t, o, n, r) {
var i = e(n, r + t), s = e(n, r + o), a = 2 * (s >> 31) + 1, c = s >>> 20 & 2047, u = 4294967296 * (1048575 & s) + i;
return 2047 === c ? u ? NaN : Infinity * a : 0 === c ? 5e-324 * a * u : a * Math.pow(2, c - 1075) * (u + 4503599627370496);
}
e.readDoubleLE = o.bind(null, s, 0, 4);
e.readDoubleBE = o.bind(null, a, 4, 0);
}();
return e;
}
function r(e, t, o) {
t[o] = 255 & e;
t[o + 1] = e >>> 8 & 255;
t[o + 2] = e >>> 16 & 255;
t[o + 3] = e >>> 24;
}
function i(e, t, o) {
t[o] = e >>> 24;
t[o + 1] = e >>> 16 & 255;
t[o + 2] = e >>> 8 & 255;
t[o + 3] = 255 & e;
}
function s(e, t) {
return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
}
function a(e, t) {
return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
}, {} ],
5: [ function(require, module, exports) {
module.exports = inquire;
function inquire(moduleName) {
try {
var mod = eval("quire".replace(/^/, "re"))(moduleName);
if (mod && (mod.length || Object.keys(mod).length)) return mod;
} catch (e) {}
return null;
}
}, {} ],
6: [ function(e, t, o) {
t.exports = function(e, t, o) {
var n = o || 8192, r = n >>> 1, i = null, s = n;
return function(o) {
if (o < 1 || o > r) return e(o);
if (s + o > n) {
i = e(n);
s = 0;
}
var a = t.call(i, s, s += o);
7 & s && (s = 1 + (7 | s));
return a;
};
};
}, {} ],
7: [ function(e, t, o) {
var n = o;
n.length = function(e) {
for (var t = 0, o = 0, n = 0; n < e.length; ++n) if ((o = e.charCodeAt(n)) < 128) t += 1; else if (o < 2048) t += 2; else if (55296 == (64512 & o) && 56320 == (64512 & e.charCodeAt(n + 1))) {
++n;
t += 4;
} else t += 3;
return t;
};
n.read = function(e, t, o) {
if (o - t < 1) return "";
for (var n, r = null, i = [], s = 0; t < o; ) {
if ((n = e[t++]) < 128) i[s++] = n; else if (n > 191 && n < 224) i[s++] = (31 & n) << 6 | 63 & e[t++]; else if (n > 239 && n < 365) {
n = ((7 & n) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536;
i[s++] = 55296 + (n >> 10);
i[s++] = 56320 + (1023 & n);
} else i[s++] = (15 & n) << 12 | (63 & e[t++]) << 6 | 63 & e[t++];
if (s > 8191) {
(r || (r = [])).push(String.fromCharCode.apply(String, i));
s = 0;
}
}
if (r) {
s && r.push(String.fromCharCode.apply(String, i.slice(0, s)));
return r.join("");
}
return String.fromCharCode.apply(String, i.slice(0, s));
};
n.write = function(e, t, o) {
for (var n, r, i = o, s = 0; s < e.length; ++s) if ((n = e.charCodeAt(s)) < 128) t[o++] = n; else if (n < 2048) {
t[o++] = n >> 6 | 192;
t[o++] = 63 & n | 128;
} else if (55296 == (64512 & n) && 56320 == (64512 & (r = e.charCodeAt(s + 1)))) {
n = 65536 + ((1023 & n) << 10) + (1023 & r);
++s;
t[o++] = n >> 18 | 240;
t[o++] = n >> 12 & 63 | 128;
t[o++] = n >> 6 & 63 | 128;
t[o++] = 63 & n | 128;
} else {
t[o++] = n >> 12 | 224;
t[o++] = n >> 6 & 63 | 128;
t[o++] = 63 & n | 128;
}
return o - i;
};
}, {} ],
8: [ function(e, t, o) {
var n = o;
n.build = "minimal";
n.Writer = e(16);
n.BufferWriter = e(17);
n.Reader = e(9);
n.BufferReader = e(10);
n.util = e(15);
n.rpc = e(12);
n.roots = e(11);
n.configure = r;
function r() {
n.Reader._configure(n.BufferReader);
n.util._configure();
}
n.Writer._configure(n.BufferWriter);
r();
}, {
10: 10,
11: 11,
12: 12,
15: 15,
16: 16,
17: 17,
9: 9
} ],
9: [ function(e, t, o) {
t.exports = c;
var n, r = e(15), i = r.LongBits, s = r.utf8;
function a(e, t) {
return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);
}
function c(e) {
this.buf = e;
this.pos = 0;
this.len = e.length;
}
var u = "undefined" != typeof Uint8Array ? function(e) {
if (e instanceof Uint8Array || Array.isArray(e)) return new c(e);
throw Error("illegal buffer");
} : function(e) {
if (Array.isArray(e)) return new c(e);
throw Error("illegal buffer");
};
c.create = r.Buffer ? function(e) {
return (c.create = function(e) {
return r.Buffer.isBuffer(e) ? new n(e) : u(e);
})(e);
} : u;
c.prototype._slice = r.Array.prototype.subarray || r.Array.prototype.slice;
c.prototype.uint32 = function() {
var e = 4294967295;
return function() {
e = (127 & this.buf[this.pos]) >>> 0;
if (this.buf[this.pos++] < 128) return e;
e = (e | (127 & this.buf[this.pos]) << 7) >>> 0;
if (this.buf[this.pos++] < 128) return e;
e = (e | (127 & this.buf[this.pos]) << 14) >>> 0;
if (this.buf[this.pos++] < 128) return e;
e = (e | (127 & this.buf[this.pos]) << 21) >>> 0;
if (this.buf[this.pos++] < 128) return e;
e = (e | (15 & this.buf[this.pos]) << 28) >>> 0;
if (this.buf[this.pos++] < 128) return e;
if ((this.pos += 5) > this.len) {
this.pos = this.len;
throw a(this, 10);
}
return e;
};
}();
c.prototype.int32 = function() {
return 0 | this.uint32();
};
c.prototype.sint32 = function() {
var e = this.uint32();
return e >>> 1 ^ -(1 & e) | 0;
};
function l() {
var e = new i(0, 0), t = 0;
if (!(this.len - this.pos > 4)) {
for (;t < 3; ++t) {
if (this.pos >= this.len) throw a(this);
e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0;
return e;
}
for (;t < 4; ++t) {
e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0;
e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0;
if (this.buf[this.pos++] < 128) return e;
t = 0;
if (this.len - this.pos > 4) for (;t < 5; ++t) {
e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0;
if (this.buf[this.pos++] < 128) return e;
} else for (;t < 5; ++t) {
if (this.pos >= this.len) throw a(this);
e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0;
if (this.buf[this.pos++] < 128) return e;
}
throw Error("invalid varint encoding");
}
c.prototype.bool = function() {
return 0 !== this.uint32();
};
function f(e, t) {
return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
}
c.prototype.fixed32 = function() {
if (this.pos + 4 > this.len) throw a(this, 4);
return f(this.buf, this.pos += 4);
};
c.prototype.sfixed32 = function() {
if (this.pos + 4 > this.len) throw a(this, 4);
return 0 | f(this.buf, this.pos += 4);
};
function d() {
if (this.pos + 8 > this.len) throw a(this, 8);
return new i(f(this.buf, this.pos += 4), f(this.buf, this.pos += 4));
}
c.prototype.float = function() {
if (this.pos + 4 > this.len) throw a(this, 4);
var e = r.float.readFloatLE(this.buf, this.pos);
this.pos += 4;
return e;
};
c.prototype.double = function() {
if (this.pos + 8 > this.len) throw a(this, 4);
var e = r.float.readDoubleLE(this.buf, this.pos);
this.pos += 8;
return e;
};
c.prototype.bytes = function() {
var e = this.uint32(), t = this.pos, o = this.pos + e;
if (o > this.len) throw a(this, e);
this.pos += e;
return Array.isArray(this.buf) ? this.buf.slice(t, o) : t === o ? new this.buf.constructor(0) : this._slice.call(this.buf, t, o);
};
c.prototype.string = function() {
var e = this.bytes();
return s.read(e, 0, e.length);
};
c.prototype.skip = function(e) {
if ("number" == typeof e) {
if (this.pos + e > this.len) throw a(this, e);
this.pos += e;
} else do {
if (this.pos >= this.len) throw a(this);
} while (128 & this.buf[this.pos++]);
return this;
};
c.prototype.skipType = function(e) {
switch (e) {
case 0:
this.skip();
break;

case 1:
this.skip(8);
break;

case 2:
this.skip(this.uint32());
break;

case 3:
for (;4 != (e = 7 & this.uint32()); ) this.skipType(e);
break;

case 5:
this.skip(4);
break;

default:
throw Error("invalid wire type " + e + " at offset " + this.pos);
}
return this;
};
c._configure = function(e) {
n = e;
var t = r.Long ? "toLong" : "toNumber";
r.merge(c.prototype, {
int64: function() {
return l.call(this)[t](!1);
},
uint64: function() {
return l.call(this)[t](!0);
},
sint64: function() {
return l.call(this).zzDecode()[t](!1);
},
fixed64: function() {
return d.call(this)[t](!0);
},
sfixed64: function() {
return d.call(this)[t](!1);
}
});
};
}, {
15: 15
} ],
10: [ function(e, t, o) {
t.exports = i;
var n = e(9);
(i.prototype = Object.create(n.prototype)).constructor = i;
var r = e(15);
function i(e) {
n.call(this, e);
}
r.Buffer && (i.prototype._slice = r.Buffer.prototype.slice);
i.prototype.string = function() {
var e = this.uint32();
return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len));
};
}, {
15: 15,
9: 9
} ],
11: [ function(e, t, o) {
t.exports = {};
}, {} ],
12: [ function(e, t, o) {
o.Service = e(13);
}, {
13: 13
} ],
13: [ function(e, t, o) {
t.exports = r;
var n = e(15);
(r.prototype = Object.create(n.EventEmitter.prototype)).constructor = r;
function r(e, t, o) {
if ("function" != typeof e) throw TypeError("rpcImpl must be a function");
n.EventEmitter.call(this);
this.rpcImpl = e;
this.requestDelimited = Boolean(t);
this.responseDelimited = Boolean(o);
}
r.prototype.rpcCall = function e(t, o, r, i, s) {
if (!i) throw TypeError("request must be specified");
var a = this;
if (!s) return n.asPromise(e, a, t, o, r, i);
if (!a.rpcImpl) {
setTimeout(function() {
s(Error("already ended"));
}, 0);
return undefined;
}
try {
return a.rpcImpl(t, o[a.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function(e, o) {
if (e) {
a.emit("error", e, t);
return s(e);
}
if (null === o) {
a.end(!0);
return undefined;
}
if (!(o instanceof r)) try {
o = r[a.responseDelimited ? "decodeDelimited" : "decode"](o);
} catch (e) {
a.emit("error", e, t);
return s(e);
}
a.emit("data", o, t);
return s(null, o);
});
} catch (e) {
a.emit("error", e, t);
setTimeout(function() {
s(e);
}, 0);
return undefined;
}
};
r.prototype.end = function(e) {
if (this.rpcImpl) {
e || this.rpcImpl(null, null, null);
this.rpcImpl = null;
this.emit("end").off();
}
return this;
};
}, {
15: 15
} ],
14: [ function(e, t, o) {
t.exports = r;
var n = e(15);
function r(e, t) {
this.lo = e >>> 0;
this.hi = t >>> 0;
}
var i = r.zero = new r(0, 0);
i.toNumber = function() {
return 0;
};
i.zzEncode = i.zzDecode = function() {
return this;
};
i.length = function() {
return 1;
};
var s = r.zeroHash = "\0\0\0\0\0\0\0\0";
r.fromNumber = function(e) {
if (0 === e) return i;
var t = e < 0;
t && (e = -e);
var o = e >>> 0, n = (e - o) / 4294967296 >>> 0;
if (t) {
n = ~n >>> 0;
o = ~o >>> 0;
if (++o > 4294967295) {
o = 0;
++n > 4294967295 && (n = 0);
}
}
return new r(o, n);
};
r.from = function(e) {
if ("number" == typeof e) return r.fromNumber(e);
if (n.isString(e)) {
if (!n.Long) return r.fromNumber(parseInt(e, 10));
e = n.Long.fromString(e);
}
return e.low || e.high ? new r(e.low >>> 0, e.high >>> 0) : i;
};
r.prototype.toNumber = function(e) {
if (!e && this.hi >>> 31) {
var t = 1 + ~this.lo >>> 0, o = ~this.hi >>> 0;
t || (o = o + 1 >>> 0);
return -(t + 4294967296 * o);
}
return this.lo + 4294967296 * this.hi;
};
r.prototype.toLong = function(e) {
return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, Boolean(e)) : {
low: 0 | this.lo,
high: 0 | this.hi,
unsigned: Boolean(e)
};
};
var a = String.prototype.charCodeAt;
r.fromHash = function(e) {
return e === s ? i : new r((a.call(e, 0) | a.call(e, 1) << 8 | a.call(e, 2) << 16 | a.call(e, 3) << 24) >>> 0, (a.call(e, 4) | a.call(e, 5) << 8 | a.call(e, 6) << 16 | a.call(e, 7) << 24) >>> 0);
};
r.prototype.toHash = function() {
return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
};
r.prototype.zzEncode = function() {
var e = this.hi >> 31;
this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0;
this.lo = (this.lo << 1 ^ e) >>> 0;
return this;
};
r.prototype.zzDecode = function() {
var e = -(1 & this.lo);
this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0;
this.hi = (this.hi >>> 1 ^ e) >>> 0;
return this;
};
r.prototype.length = function() {
var e = this.lo, t = (this.lo >>> 28 | this.hi << 4) >>> 0, o = this.hi >>> 24;
return 0 === o ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : o < 128 ? 9 : 10;
};
}, {
15: 15
} ],
15: [ function(e, t, o) {
var n = o;
n.asPromise = e(1);
n.base64 = e(2);
n.EventEmitter = e(3);
n.float = e(4);
n.inquire = e(5);
n.utf8 = e(7);
n.pool = e(6);
n.LongBits = e(14);
n.global = "undefined" != typeof window && window || "undefined" != typeof global && global || "undefined" != typeof self && self || this;
n.emptyArray = Object.freeze ? Object.freeze([]) : [];
n.emptyObject = Object.freeze ? Object.freeze({}) : {};
n.isNode = Boolean(n.global.process && n.global.process.versions && n.global.process.versions.node);
n.isInteger = Number.isInteger || function(e) {
return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
};
n.isString = function(e) {
return "string" == typeof e || e instanceof String;
};
n.isObject = function(e) {
return e && "object" === ("undefined" == typeof e ? "undefined" : _typeof(e));
};
n.isset = n.isSet = function(e, t) {
var o = e[t];
return !(null == o || !e.hasOwnProperty(t)) && ("object" !== ("undefined" == typeof o ? "undefined" : _typeof(o)) || (Array.isArray(o) ? o.length : Object.keys(o).length) > 0);
};
n.Buffer = function() {
try {
var e = n.inquire("buffer").Buffer;
return e.prototype.utf8Write ? e : null;
} catch (e) {
return null;
}
}();
n._Buffer_from = null;
n._Buffer_allocUnsafe = null;
n.newBuffer = function(e) {
return "number" == typeof e ? n.Buffer ? n._Buffer_allocUnsafe(e) : new n.Array(e) : n.Buffer ? n._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e);
};
n.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array;
n.Long = n.global.dcodeIO && n.global.dcodeIO.Long || n.global.Long || n.inquire("long");
n.key2Re = /^true|false|0|1$/;
n.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
n.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
n.longToHash = function(e) {
return e ? n.LongBits.from(e).toHash() : n.LongBits.zeroHash;
};
n.longFromHash = function(e, t) {
var o = n.LongBits.fromHash(e);
return n.Long ? n.Long.fromBits(o.lo, o.hi, t) : o.toNumber(Boolean(t));
};
function r(e, t, o) {
for (var n = Object.keys(t), r = 0; r < n.length; ++r) e[n[r]] !== undefined && o || (e[n[r]] = t[n[r]]);
return e;
}
n.merge = r;
n.lcFirst = function(e) {
return e.charAt(0).toLowerCase() + e.substring(1);
};
function i(e) {
function t(e, o) {
if (!(this instanceof t)) return new t(e, o);
Object.defineProperty(this, "message", {
get: function() {
return e;
}
});
Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
value: new Error().stack || ""
});
o && r(this, o);
}
(t.prototype = Object.create(Error.prototype)).constructor = t;
Object.defineProperty(t.prototype, "name", {
get: function() {
return e;
}
});
t.prototype.toString = function() {
return this.name + ": " + this.message;
};
return t;
}
n.newError = i;
n.ProtocolError = i("ProtocolError");
n.oneOfGetter = function(e) {
for (var t = {}, o = 0; o < e.length; ++o) t[e[o]] = 1;
return function() {
for (var e = Object.keys(this), o = e.length - 1; o > -1; --o) if (1 === t[e[o]] && this[e[o]] !== undefined && null !== this[e[o]]) return e[o];
};
};
n.oneOfSetter = function(e) {
return function(t) {
for (var o = 0; o < e.length; ++o) e[o] !== t && delete this[e[o]];
};
};
n.toJSONOptions = {
longs: String,
enums: String,
bytes: String,
json: !0
};
n._configure = function() {
var e = n.Buffer;
if (e) {
n._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, o) {
return new e(t, o);
};
n._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
return new e(t);
};
} else n._Buffer_from = n._Buffer_allocUnsafe = null;
};
}, {
1: 1,
14: 14,
2: 2,
3: 3,
4: 4,
5: 5,
6: 6,
7: 7
} ],
16: [ function(e, t, o) {
t.exports = f;
var n, r = e(15), i = r.LongBits, s = r.base64, a = r.utf8;
function c(e, t, o) {
this.fn = e;
this.len = t;
this.next = undefined;
this.val = o;
}
function u() {}
function l(e) {
this.head = e.head;
this.tail = e.tail;
this.len = e.len;
this.next = e.states;
}
function f() {
this.len = 0;
this.head = new c(u, 0, 0);
this.tail = this.head;
this.states = null;
}
f.create = r.Buffer ? function() {
return (f.create = function() {
return new n();
})();
} : function() {
return new f();
};
f.alloc = function(e) {
return new r.Array(e);
};
r.Array !== Array && (f.alloc = r.pool(f.alloc, r.Array.prototype.subarray));
f.prototype._push = function(e, t, o) {
this.tail = this.tail.next = new c(e, t, o);
this.len += t;
return this;
};
function d(e, t, o) {
t[o] = 255 & e;
}
function p(e, t) {
this.len = e;
this.next = undefined;
this.val = t;
}
p.prototype = Object.create(c.prototype);
p.prototype.fn = function(e, t, o) {
for (;e > 127; ) {
t[o++] = 127 & e | 128;
e >>>= 7;
}
t[o] = e;
};
f.prototype.uint32 = function(e) {
this.len += (this.tail = this.tail.next = new p((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5, e)).len;
return this;
};
f.prototype.int32 = function(e) {
return e < 0 ? this._push(h, 10, i.fromNumber(e)) : this.uint32(e);
};
f.prototype.sint32 = function(e) {
return this.uint32((e << 1 ^ e >> 31) >>> 0);
};
function h(e, t, o) {
for (;e.hi; ) {
t[o++] = 127 & e.lo | 128;
e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0;
e.hi >>>= 7;
}
for (;e.lo > 127; ) {
t[o++] = 127 & e.lo | 128;
e.lo = e.lo >>> 7;
}
t[o++] = e.lo;
}
f.prototype.uint64 = function(e) {
var t = i.from(e);
return this._push(h, t.length(), t);
};
f.prototype.int64 = f.prototype.uint64;
f.prototype.sint64 = function(e) {
var t = i.from(e).zzEncode();
return this._push(h, t.length(), t);
};
f.prototype.bool = function(e) {
return this._push(d, 1, e ? 1 : 0);
};
function _(e, t, o) {
t[o] = 255 & e;
t[o + 1] = e >>> 8 & 255;
t[o + 2] = e >>> 16 & 255;
t[o + 3] = e >>> 24;
}
f.prototype.fixed32 = function(e) {
return this._push(_, 4, e >>> 0);
};
f.prototype.sfixed32 = f.prototype.fixed32;
f.prototype.fixed64 = function(e) {
var t = i.from(e);
return this._push(_, 4, t.lo)._push(_, 4, t.hi);
};
f.prototype.sfixed64 = f.prototype.fixed64;
f.prototype.float = function(e) {
return this._push(r.float.writeFloatLE, 4, e);
};
f.prototype.double = function(e) {
return this._push(r.float.writeDoubleLE, 8, e);
};
var g = r.Array.prototype.set ? function(e, t, o) {
t.set(e, o);
} : function(e, t, o) {
for (var n = 0; n < e.length; ++n) t[o + n] = e[n];
};
f.prototype.bytes = function(e) {
var t = e.length >>> 0;
if (!t) return this._push(d, 1, 0);
if (r.isString(e)) {
var o = f.alloc(t = s.length(e));
s.decode(e, o, 0);
e = o;
}
return this.uint32(t)._push(g, t, e);
};
f.prototype.string = function(e) {
var t = a.length(e);
return t ? this.uint32(t)._push(a.write, t, e) : this._push(d, 1, 0);
};
f.prototype.fork = function() {
this.states = new l(this);
this.head = this.tail = new c(u, 0, 0);
this.len = 0;
return this;
};
f.prototype.reset = function() {
if (this.states) {
this.head = this.states.head;
this.tail = this.states.tail;
this.len = this.states.len;
this.states = this.states.next;
} else {
this.head = this.tail = new c(u, 0, 0);
this.len = 0;
}
return this;
};
f.prototype.ldelim = function() {
var e = this.head, t = this.tail, o = this.len;
this.reset().uint32(o);
if (o) {
this.tail.next = e.next;
this.tail = t;
this.len += o;
}
return this;
};
f.prototype.finish = function() {
for (var e = this.head.next, t = this.constructor.alloc(this.len), o = 0; e; ) {
e.fn(e.val, t, o);
o += e.len;
e = e.next;
}
return t;
};
f._configure = function(e) {
n = e;
};
}, {
15: 15
} ],
17: [ function(e, t, o) {
t.exports = s;
var n = e(16);
(s.prototype = Object.create(n.prototype)).constructor = s;
var r = e(15), i = r.Buffer;
function s() {
n.call(this);
}
s.alloc = function(e) {
return (s.alloc = r._Buffer_allocUnsafe)(e);
};
var a = i && i.prototype instanceof Uint8Array && "set" === i.prototype.set.name ? function(e, t, o) {
t.set(e, o);
} : function(e, t, o) {
if (e.copy) e.copy(t, o, 0, e.length); else for (var n = 0; n < e.length; ) t[o++] = e[n++];
};
s.prototype.bytes = function(e) {
r.isString(e) && (e = r._Buffer_from(e, "base64"));
var t = e.length >>> 0;
this.uint32(t);
t && this._push(a, t, e);
return this;
};
function c(e, t, o) {
e.length < 40 ? r.utf8.write(e, t, o) : t.utf8Write(e, o);
}
s.prototype.string = function(e) {
var t = i.byteLength(e);
this.uint32(t);
t && this._push(c, t, e);
return this;
};
}, {
15: 15,
16: 16
} ]
}, {}, [ 8 ]);
})();
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {
1: void 0,
10: void 0,
11: void 0,
12: void 0,
13: void 0,
14: void 0,
15: void 0,
16: void 0,
17: void 0,
2: void 0,
3: void 0,
4: void 0,
5: void 0,
6: void 0,
7: void 0,
9: void 0
} ],
"use_v2.1.x_cc.Action": [ function(e, t, o) {
"use strict";
cc._RF.push(t, "838fecj9gRM9Y8tUCXSVhgM", "use_v2.1.x_cc.Action");
cc.macro.ROTATE_ACTION_CCW = !0;
cc._RF.pop();
}, {} ]
}, {}, [ "map_Level1", "use_v2.1.x_cc.Action", "protobuf", "UIFunciton", "UserInfo", "EventDefine", "GameAppConfig", "GameHoodleConfig", "LSDefine", "PlatForm", "HotUpdateNew", "AudioManager", "DialogManager", "EventManager", "ProtoManager", "ResourceManager", "SceneManager", "TimerManager", "NetWork", "ProtoTools", "Socket", "SocketDelegate", "AuthProto", "CommonProto", "GameHoodleProto", "ProtoCmd", "Response", "Stype", "SystemProto", "TalkProto", "protobufMsg", "AutoComponent", "BaseScene", "UIController", "UIDialog", "TableView", "TableViewCell", "ArrayUtil", "Base64", "BezierMaker", "DataViewUtil", "DateUtil", "HttpUtil", "Log", "Queue", "SDKAdapter", "Storage", "StringUtil", "BallCenterDialog", "CommonDialog", "GameResultDialog", "JoinRoomDialog", "MatchDialog", "MyCenterDialog", "SettingDialog", "StoreDialog", "WeakHintDialog", "GameApp", "Player", "RoomData", "State", "LoginScene", "LoginSceneCtrl", "LoginSceneInit", "LoginSceneRecvMsg", "LoginSceneShowUI", "LoginSceneTouchEvent", "LoginSendAuthMsg", "EnablePhysics", "GameHoodleCtrl", "GameHoodleData", "GameHoodleRecvMsg", "GameHoodleShowUI", "GameHoodleTouchEvent", "HoodleBallCtrl", "HoodleBallManager", "GameScene", "GameSceneCtrl", "GameSceneInit", "GameSceneRecvAuthMsg", "GameSceneRecvGameMsg", "GameSceneShowUI", "GameSceneTouchEvent", "GameSendGameHoodle", "HotFixScene", "HotFixSceneCtrl", "LobbyScene", "LobbySceneCtrl", "LobbySceneInit", "LobbySceneRecvAuthMsg", "LobbySceneRecvGameHoodleMsg", "LobbySceneShowUI", "LobbySceneTouchEvent", "LobbySendAuthMsg", "LobbySendGameHoodle" ]);