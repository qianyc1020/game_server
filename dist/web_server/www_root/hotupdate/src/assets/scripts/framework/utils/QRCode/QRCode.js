var QRCode = function() {
for (var r = [ null, [ [ 10, 7, 17, 13 ], [ 1, 1, 1, 1 ], [] ], [ [ 16, 10, 28, 22 ], [ 1, 1, 1, 1 ], [ 4, 16 ] ], [ [ 26, 15, 22, 18 ], [ 1, 1, 2, 2 ], [ 4, 20 ] ], [ [ 18, 20, 16, 26 ], [ 2, 1, 4, 2 ], [ 4, 24 ] ], [ [ 24, 26, 22, 18 ], [ 2, 1, 4, 4 ], [ 4, 28 ] ], [ [ 16, 18, 28, 24 ], [ 4, 2, 4, 4 ], [ 4, 32 ] ], [ [ 18, 20, 26, 18 ], [ 4, 2, 5, 6 ], [ 4, 20, 36 ] ], [ [ 22, 24, 26, 22 ], [ 4, 2, 6, 6 ], [ 4, 22, 40 ] ], [ [ 22, 30, 24, 20 ], [ 5, 2, 8, 8 ], [ 4, 24, 44 ] ], [ [ 26, 18, 28, 24 ], [ 5, 4, 8, 8 ], [ 4, 26, 48 ] ], [ [ 30, 20, 24, 28 ], [ 5, 4, 11, 8 ], [ 4, 28, 52 ] ], [ [ 22, 24, 28, 26 ], [ 8, 4, 11, 10 ], [ 4, 30, 56 ] ], [ [ 22, 26, 22, 24 ], [ 9, 4, 16, 12 ], [ 4, 32, 60 ] ], [ [ 24, 30, 24, 20 ], [ 9, 4, 16, 16 ], [ 4, 24, 44, 64 ] ], [ [ 24, 22, 24, 30 ], [ 10, 6, 18, 12 ], [ 4, 24, 46, 68 ] ], [ [ 28, 24, 30, 24 ], [ 10, 6, 16, 17 ], [ 4, 24, 48, 72 ] ], [ [ 28, 28, 28, 28 ], [ 11, 6, 19, 16 ], [ 4, 28, 52, 76 ] ], [ [ 26, 30, 28, 28 ], [ 13, 6, 21, 18 ], [ 4, 28, 54, 80 ] ], [ [ 26, 28, 26, 26 ], [ 14, 7, 25, 21 ], [ 4, 28, 56, 84 ] ], [ [ 26, 28, 28, 30 ], [ 16, 8, 25, 20 ], [ 4, 32, 60, 88 ] ], [ [ 26, 28, 30, 28 ], [ 17, 8, 25, 23 ], [ 4, 26, 48, 70, 92 ] ], [ [ 28, 28, 24, 30 ], [ 17, 9, 34, 23 ], [ 4, 24, 48, 72, 96 ] ], [ [ 28, 30, 30, 30 ], [ 18, 9, 30, 25 ], [ 4, 28, 52, 76, 100 ] ], [ [ 28, 30, 30, 30 ], [ 20, 10, 32, 27 ], [ 4, 26, 52, 78, 104 ] ], [ [ 28, 26, 30, 30 ], [ 21, 12, 35, 29 ], [ 4, 30, 56, 82, 108 ] ], [ [ 28, 28, 30, 28 ], [ 23, 12, 37, 34 ], [ 4, 28, 56, 84, 112 ] ], [ [ 28, 30, 30, 30 ], [ 25, 12, 40, 34 ], [ 4, 32, 60, 88, 116 ] ], [ [ 28, 30, 30, 30 ], [ 26, 13, 42, 35 ], [ 4, 24, 48, 72, 96, 120 ] ], [ [ 28, 30, 30, 30 ], [ 28, 14, 45, 38 ], [ 4, 28, 52, 76, 100, 124 ] ], [ [ 28, 30, 30, 30 ], [ 29, 15, 48, 40 ], [ 4, 24, 50, 76, 102, 128 ] ], [ [ 28, 30, 30, 30 ], [ 31, 16, 51, 43 ], [ 4, 28, 54, 80, 106, 132 ] ], [ [ 28, 30, 30, 30 ], [ 33, 17, 54, 45 ], [ 4, 32, 58, 84, 110, 136 ] ], [ [ 28, 30, 30, 30 ], [ 35, 18, 57, 48 ], [ 4, 28, 56, 84, 112, 140 ] ], [ [ 28, 30, 30, 30 ], [ 37, 19, 60, 51 ], [ 4, 32, 60, 88, 116, 144 ] ], [ [ 28, 30, 30, 30 ], [ 38, 19, 63, 53 ], [ 4, 28, 52, 76, 100, 124, 148 ] ], [ [ 28, 30, 30, 30 ], [ 40, 20, 66, 56 ], [ 4, 22, 48, 74, 100, 126, 152 ] ], [ [ 28, 30, 30, 30 ], [ 43, 21, 70, 59 ], [ 4, 26, 52, 78, 104, 130, 156 ] ], [ [ 28, 30, 30, 30 ], [ 45, 22, 74, 62 ], [ 4, 30, 56, 82, 108, 134, 160 ] ], [ [ 28, 30, 30, 30 ], [ 47, 24, 77, 65 ], [ 4, 24, 52, 80, 108, 136, 164 ] ], [ [ 28, 30, 30, 30 ], [ 49, 25, 81, 68 ], [ 4, 28, 56, 84, 112, 140, 168 ] ] ], t = /^\d*$/, n = /^[A-Za-z0-9 $%*+\-./:]*$/, e = /^[A-Z0-9 $%*+\-./:]*$/, a = [], o = [ -1 ], f = 0, u = 1; f < 255; ++f) {
a.push(u);
o[u] = f;
u = 2 * u ^ (u >= 128 ? 285 : 0);
}
var i = [ [] ];
for (f = 0; f < 30; ++f) {
for (var h = i[f], c = [], s = 0; s <= f; ++s) {
var l = s < f ? a[h[s]] : 0, v = a[(f + (h[s - 1] || 0)) % 255];
c.push(o[l ^ v]);
}
i.push(c);
}
var p = {};
for (f = 0; f < 45; ++f) p["0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".charAt(f)] = f;
var g = [ function(r, t) {
return (r + t) % 2 == 0;
}, function(r, t) {
return r % 2 == 0;
}, function(r, t) {
return t % 3 == 0;
}, function(r, t) {
return (r + t) % 3 == 0;
}, function(r, t) {
return ((r / 2 | 0) + (t / 3 | 0)) % 2 == 0;
}, function(r, t) {
return r * t % 2 + r * t % 3 == 0;
}, function(r, t) {
return (r * t % 2 + r * t % 3) % 2 == 0;
}, function(r, t) {
return ((r + t) % 2 + r * t % 3) % 2 == 0;
} ], d = function(r) {
return r > 6;
}, m = function(r) {
return 4 * r + 17;
}, w = function(t) {
var n = r[t], e = 16 * t * t + 128 * t + 64;
d(t) && (e -= 36);
n[2].length && (e -= 25 * n[2].length * n[2].length - 10 * n[2].length - 55);
return e;
}, b = function(t, n) {
var e = -8 & w(t), a = r[t];
return e -= 8 * a[0][n] * a[1][n];
}, x = function(r, t) {
switch (t) {
case 1:
return r < 10 ? 10 : r < 27 ? 12 : 14;

case 2:
return r < 10 ? 9 : r < 27 ? 11 : 13;

case 4:
return r < 10 ? 8 : 16;

case 8:
return r < 10 ? 8 : r < 27 ? 10 : 12;
}
}, M = function(r, t, n) {
var e = b(r, n) - 4 - x(r, t);
switch (t) {
case 1:
return 3 * (e / 10 | 0) + (e % 10 < 4 ? 0 : e % 10 < 7 ? 1 : 2);

case 2:
return 2 * (e / 11 | 0) + (e % 11 < 6 ? 0 : 1);

case 4:
return e / 8 | 0;

case 8:
return e / 13 | 0;
}
}, A = function(r, e) {
switch (r) {
case 1:
return e.match(t) ? e : null;

case 2:
return e.match(n) ? e.toUpperCase() : null;

case 4:
if ("string" == typeof e) {
for (var a = [], o = 0; o < e.length; ++o) {
var f = e.charCodeAt(o);
f < 128 ? a.push(f) : f < 2048 ? a.push(192 | f >> 6, 128 | 63 & f) : f < 65536 ? a.push(224 | f >> 12, 128 | f >> 6 & 63, 128 | 63 & f) : a.push(240 | f >> 18, 128 | f >> 12 & 63, 128 | f >> 6 & 63, 128 | 63 & f);
}
return a;
}
return e;
}
}, k = function(r, t, n, e) {
var a = [], o = 0, f = 8, u = n.length, i = function(r, t) {
if (t >= f) {
a.push(o | r >> (t -= f));
for (;t >= 8; ) a.push(r >> (t -= 8) & 255);
o = 0;
f = 8;
}
t > 0 && (o |= (r & (1 << t) - 1) << (f -= t));
}, h = x(r, t);
i(t, 4);
i(u, h);
switch (t) {
case 1:
for (var c = 2; c < u; c += 3) i(parseInt(n.substring(c - 2, c + 1), 10), 10);
i(parseInt(n.substring(c - 2), 10), [ 0, 4, 7 ][u % 3]);
break;

case 2:
for (c = 1; c < u; c += 2) i(45 * p[n.charAt(c - 1)] + p[n.charAt(c)], 11);
u % 2 == 1 && i(p[n.charAt(c - 1)], 6);
break;

case 4:
for (c = 0; c < u; ++c) i(n[c], 8);
}
i(0, 4);
f < 8 && a.push(o);
for (;a.length + 1 < e; ) a.push(236, 17);
a.length < e && a.push(236);
return a;
}, C = function(r, t) {
for (var n = r.slice(0), e = r.length, f = t.length, u = 0; u < f; ++u) n.push(0);
for (u = 0; u < e; ) {
var i = o[n[u++]];
if (i >= 0) for (var h = 0; h < f; ++h) n[u + h] ^= a[(i + t[h]) % 255];
}
return n.slice(e);
}, L = function(r, t, n) {
for (var e = [], a = r.length / t | 0, o = 0, f = t - r.length % t, u = 0; u < f; ++u) {
e.push(o);
o += a;
}
for (u = f; u < t; ++u) {
e.push(o);
o += a + 1;
}
e.push(o);
var i = [];
for (u = 0; u < t; ++u) i.push(C(r.slice(e[u], e[u + 1]), n));
var h = [], c = r.length / t | 0;
for (u = 0; u < c; ++u) for (var s = 0; s < t; ++s) h.push(r[e[s] + u]);
for (s = f; s < t; ++s) h.push(r[e[s + 1] - 1]);
for (u = 0; u < n.length; ++u) for (s = 0; s < t; ++s) h.push(i[s][u]);
return h;
}, y = function(r, t, n, e) {
for (var a = r << e, o = t - 1; o >= 0; --o) a >> e + o & 1 && (a ^= n << o);
return r << e | a;
}, $ = function(t) {
for (var n = r[t], e = m(t), a = [], o = [], f = 0; f < e; ++f) {
a.push([]);
o.push([]);
}
var u = function(r, t, n, e, f) {
for (var u = 0; u < n; ++u) for (var i = 0; i < e; ++i) {
a[r + u][t + i] = f[u] >> i & 1;
o[r + u][t + i] = 1;
}
};
u(0, 0, 9, 9, [ 127, 65, 93, 93, 93, 65, 383, 0, 64 ]);
u(e - 8, 0, 8, 9, [ 256, 127, 65, 93, 93, 93, 65, 127 ]);
u(0, e - 8, 9, 8, [ 254, 130, 186, 186, 186, 130, 254, 0, 0 ]);
for (f = 9; f < e - 8; ++f) {
a[6][f] = a[f][6] = 1 & ~f;
o[6][f] = o[f][6] = 1;
}
var i = n[2], h = i.length;
for (f = 0; f < h; ++f) for (var c = 0 == f ? h - 1 : h, s = 0 == f || f == h - 1 ? 1 : 0; s < c; ++s) u(i[f], i[s], 5, 5, [ 31, 17, 21, 17, 31 ]);
if (d(t)) {
var l = y(t, 6, 7973, 12), v = 0;
for (f = 0; f < 6; ++f) for (s = 0; s < 3; ++s) {
a[f][e - 11 + s] = a[e - 11 + s][f] = l >> v++ & 1;
o[f][e - 11 + s] = o[e - 11 + s][f] = 1;
}
}
return {
matrix: a,
reserved: o
};
}, R = function(r, t, n) {
for (var e = r.length, a = 0, o = -1, f = e - 1; f >= 0; f -= 2) {
6 == f && --f;
for (var u = o < 0 ? e - 1 : 0, i = 0; i < e; ++i) {
for (var h = f; h > f - 2; --h) if (!t[u][h]) {
r[u][h] = n[a >> 3] >> (7 & ~a) & 1;
++a;
}
u += o;
}
o = -o;
}
return r;
}, H = function(r, t, n) {
for (var e = g[n], a = r.length, o = 0; o < a; ++o) for (var f = 0; f < a; ++f) t[o][f] || (r[o][f] ^= e(o, f));
return r;
}, U = function(r, t, n, e) {
for (var a = r.length, o = 21522 ^ y(n << 3 | e, 5, 1335, 10), f = 0; f < 15; ++f) {
var u = [ a - 1, a - 2, a - 3, a - 4, a - 5, a - 6, a - 7, a - 8, 7, 5, 4, 3, 2, 1, 0 ][f];
r[[ 0, 1, 2, 3, 4, 5, 7, 8, a - 7, a - 6, a - 5, a - 4, a - 3, a - 2, a - 1 ][f]][8] = r[8][u] = o >> f & 1;
}
return r;
}, z = function(r) {
for (var t = function(r) {
for (var t = 0, n = 0; n < r.length; ++n) r[n] >= 5 && (t += r[n] - 5 + 3);
for (n = 5; n < r.length; n += 2) {
var e = r[n];
r[n - 1] == e && r[n - 2] == 3 * e && r[n - 3] == e && r[n - 4] == e && (r[n - 5] >= 4 * e || r[n + 1] >= 4 * e) && (t += 40);
}
return t;
}, n = r.length, e = 0, a = 0, o = 0; o < n; ++o) {
var f, u = r[o];
f = [ 0 ];
for (var i = 0; i < n; ) {
for (h = 0; i < n && u[i]; ++h) ++i;
f.push(h);
for (h = 0; i < n && !u[i]; ++h) ++i;
f.push(h);
}
e += t(f);
f = [ 0 ];
for (i = 0; i < n; ) {
var h;
for (h = 0; i < n && r[i][o]; ++h) ++i;
f.push(h);
for (h = 0; i < n && !r[i][o]; ++h) ++i;
f.push(h);
}
e += t(f);
var c = r[o + 1] || [];
a += u[0];
for (i = 1; i < n; ++i) {
var s = u[i];
a += s;
u[i - 1] == s && c[i] === s && c[i - 1] === s && (e += 3);
}
}
return e += 10 * (Math.abs(a / n / n - .5) / .05 | 0);
}, E = function(t, n, e, a, o) {
var f = r[n], u = k(n, e, t, b(n, a) >> 3);
u = L(u, f[1][a], i[f[0][a]]);
var h = $(n), c = h.matrix, s = h.reserved;
R(c, s, u);
if (o < 0) {
H(c, s, 0);
U(c, 0, a, 0);
var l = 0, v = z(c);
H(c, s, 0);
for (o = 1; o < 8; ++o) {
H(c, s, o);
U(c, 0, a, o);
var p = z(c);
if (v > p) {
v = p;
l = o;
}
H(c, s, o);
}
o = l;
}
H(c, s, o);
U(c, 0, a, o);
return c;
}, I = {
generate: function(r, n) {
var a = {
numeric: 1,
alphanumeric: 2,
octet: 4
}, o = {
L: 1,
M: 0,
Q: 3,
H: 2
}, f = (n = n || {}).version || -1, u = o[(n.ecclevel || "L").toUpperCase()], i = n.mode ? a[n.mode.toLowerCase()] : -1, h = "mask" in n ? n.mask : -1;
if (i < 0) i = "string" == typeof r ? r.match(t) ? 1 : r.match(e) ? 2 : 4 : 4; else if (1 != i && 2 != i && 4 != i) throw "暂时不支持你所输入的内容格式";
if (null === (r = A(i, r))) throw "请输入内容";
if (u < 0 || u > 3) throw "ecc错误纠正级别有误";
if (f < 0) {
for (f = 1; f <= 40 && !(r.length <= M(f, i, u)); ++f) ;
if (f > 40) throw "数据太大";
} else if (f < 1 || f > 40) throw "invalid version";
if (-1 != h && (h < 0 || h > 8)) throw "invalid mask";
return E(r, f, i, u, h);
},
generateHTML: function(r, t) {
t = t || {};
for (var n = I.generate(r, t), e = Math.max(t.modulesize || 5, .5), a = Math.max(t.margin || 4, 0), o = document.createElement("div"), f = n.length, u = [ '<table border="0" cellspacing="0" cellpadding="0" style="border:' + e * a + 'px solid #fff;background:#fff">' ], i = 0; i < f; ++i) {
u.push("<tr>");
for (var h = 0; h < f; ++h) u.push('<td style="width:' + e + "px;height:" + e + "px" + (n[i][h] ? ";background:#000" : "") + '"></td>');
u.push("</tr>");
}
o.className = "qrcode";
o.innerHTML = u.join("") + "</table>";
return o;
},
generatePNG: function(r, t) {
t = t || {};
var n, e = I.generate(r, t), a = Math.max(t.modulesize || 5, .5), o = Math.max(t.margin || 4, 0), f = e.length, u = a * (f + 2 * o), i = document.createElement("canvas");
i.width = i.height = u;
if (!(n = i.getContext("2d"))) throw "不支持canvas无法生成图片";
n.fillStyle = "#fff";
n.fillRect(0, 0, u, u);
n.fillStyle = "#000";
for (var h = 0; h < f; ++h) for (var c = 0; c < f; ++c) e[h][c] && n.fillRect(a * (o + c), a * (o + h), a, a);
return i.toDataURL();
}
};
return I;
}();

0;