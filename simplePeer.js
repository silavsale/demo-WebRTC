(function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(); else if ("function" == typeof define && define.amd) define([], e); else {
        var t;
        t = "undefined" == typeof window ? "undefined" == typeof global ? "undefined" == typeof self ? this : self : global : window, t.SimplePeer = e()
    }
})(function () {
    var t = Math.floor, n = Math.abs, r = Math.pow;
    return function () {
        function d(c, e, t) {
            function r(i, o) {
                if (!e[i]) {
                    if (!c[i]) {
                        var s = "function" == typeof require && require;
                        if (!o && s) return s(i, !0);
                        if (n) return n(i, !0);
                        var a = new Error("Cannot find module '" + i + "'");
                        throw a.code = "MODULE_NOT_FOUND", a
                    }
                    var p = e[i] = {exports: {}};
                    c[i][0].call(p.exports, function (t) {
                        var e = c[i][1][t];
                        return r(e ? e : t)
                    }, p, p.exports, d, c, e, t)
                }
                return e[i].exports
            }

            for (var n = "function" == typeof require && require, a = 0; a < t.length; a++) r(t[a]);
            return r
        }

        return d
    }()({
        1: [function (e, t, n) {
            "use strict";

            function r(e) {
                var t = e.length;
                if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
            }

            function a(e) {
                var t, n, a, o, s, d = e.length;
                o = r(e), s = new p(3 * d / 4 - o), n = 0 < o ? d - 4 : d;
                var u = 0;
                for (t = 0; t < n; t += 4) a = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)], s[u++] = 255 & a >> 16, s[u++] = 255 & a >> 8, s[u++] = 255 & a;
                return 2 === o ? (a = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4, s[u++] = 255 & a) : 1 === o && (a = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2, s[u++] = 255 & a >> 8, s[u++] = 255 & a), s
            }

            function o(e) {
                return l[63 & e >> 18] + l[63 & e >> 12] + l[63 & e >> 6] + l[63 & e]
            }

            function s(e, t, n) {
                for (var r, a = [], s = t; s < n; s += 3) r = (16711680 & e[s] << 16) + (65280 & e[s + 1] << 8) + (255 & e[s + 2]), a.push(o(r));
                return a.join("")
            }

            function d(e) {
                for (var t, n = e.length, r = n % 3, a = "", o = [], d = 16383, c = 0, p = n - r; c < p; c += d) o.push(s(e, c, c + d > p ? p : c + d));
                return 1 === r ? (t = e[n - 1], a += l[t >> 2], a += l[63 & t << 4], a += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], a += l[t >> 10], a += l[63 & t >> 4], a += l[63 & t << 2], a += "="), o.push(a), o.join("")
            }

            n.byteLength = function (e) {
                return 3 * e.length / 4 - r(e)
            }, n.toByteArray = a, n.fromByteArray = d;
            for (var l = [], c = [], p = "undefined" == typeof Uint8Array ? Array : Uint8Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", f = 0, g = u.length; f < g; ++f) l[f] = u[f], c[u.charCodeAt(f)] = f;
            c[45] = 62, c[95] = 63
        }, {}], 2: [function () {
        }, {}], 3: [function (e, t, n) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
            "use strict";
            var V = String.fromCharCode, K = Math.min;

            function a(e) {
                if (2147483647 < e) throw new RangeError("Invalid typed array length");
                var t = new Uint8Array(e);
                return t.__proto__ = o.prototype, t
            }

            function o(e, t, n) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return l(e)
                }
                return i(e, t, n)
            }

            function i(e, t, n) {
                if ("number" == typeof e) throw new TypeError("\"value\" argument must not be a number");
                return Y(e) || e && Y(e.buffer) ? u(e, t, n) : "string" == typeof e ? c(e, t) : f(e)
            }

            function s(e) {
                if ("number" != typeof e) throw new TypeError("\"size\" argument must be of type number"); else if (0 > e) throw new RangeError("\"size\" argument must not be negative")
            }

            function d(e, t, n) {
                return s(e), 0 >= e ? a(e) : void 0 === t ? a(e) : "string" == typeof n ? a(e).fill(t, n) : a(e).fill(t)
            }

            function l(e) {
                return s(e), a(0 > e ? 0 : 0 | g(e))
            }

            function c(e, t) {
                if (("string" != typeof t || "" === t) && (t = "utf8"), !o.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                var n = 0 | h(e, t), r = a(n), i = r.write(e, t);
                return i !== n && (r = r.slice(0, i)), r
            }

            function p(e) {
                for (var t = 0 > e.length ? 0 : 0 | g(e.length), n = a(t), r = 0; r < t; r += 1) n[r] = 255 & e[r];
                return n
            }

            function u(e, t, n) {
                if (0 > t || e.byteLength < t) throw new RangeError("\"offset\" is outside of buffer bounds");
                if (e.byteLength < t + (n || 0)) throw new RangeError("\"length\" is outside of buffer bounds");
                var r;
                return r = void 0 === t && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, t) : new Uint8Array(e, t, n), r.__proto__ = o.prototype, r
            }

            function f(e) {
                if (o.isBuffer(e)) {
                    var t = 0 | g(e.length), n = a(t);
                    return 0 === n.length ? n : (e.copy(n, 0, 0, t), n)
                }
                if (e) {
                    if (ArrayBuffer.isView(e) || "length" in e) return "number" != typeof e.length || G(e.length) ? a(0) : p(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return p(e.data)
                }
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.")
            }

            function g(e) {
                if (e >= 2147483647) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + 2147483647.toString(16) + " bytes");
                return 0 | e
            }

            function h(e, t) {
                if (o.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || Y(e)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var n = e.length;
                if (0 === n) return 0;
                for (var r = !1; ;) switch (t) {
                    case"ascii":
                    case"latin1":
                    case"binary":
                        return n;
                    case"utf8":
                    case"utf-8":
                    case void 0:
                        return U(e).length;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return 2 * n;
                    case"hex":
                        return n >>> 1;
                    case"base64":
                        return H(e).length;
                    default:
                        if (r) return U(e).length;
                        t = ("" + t).toLowerCase(), r = !0;
                }
            }

            function _(e, t, n) {
                var r = !1;
                if ((void 0 === t || 0 > t) && (t = 0), t > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), 0 >= n) return "";
                if (n >>>= 0, t >>>= 0, n <= t) return "";
                for (e || (e = "utf8"); ;) switch (e) {
                    case"hex":
                        return N(this, t, n);
                    case"utf8":
                    case"utf-8":
                        return x(this, t, n);
                    case"ascii":
                        return A(this, t, n);
                    case"latin1":
                    case"binary":
                        return L(this, t, n);
                    case"base64":
                        return k(this, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return F(this, t, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = !0;
                }
            }

            function m(e, t, n) {
                var r = e[t];
                e[t] = e[n], e[n] = r
            }

            function b(e, t, n, r, a) {
                if (0 === e.length) return -1;
                if ("string" == typeof n ? (r = n, n = 0) : 2147483647 < n ? n = 2147483647 : -2147483648 > n && (n = -2147483648), n = +n, G(n) && (n = a ? 0 : e.length - 1), 0 > n && (n = e.length + n), n >= e.length) {
                    if (a) return -1;
                    n = e.length - 1
                } else if (0 > n) if (a) n = 0; else return -1;
                if ("string" == typeof t && (t = o.from(t, r)), o.isBuffer(t)) return 0 === t.length ? -1 : y(e, t, n, r, a);
                if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? a ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : y(e, [t], n, r, a);
                throw new TypeError("val must be string, number or Buffer")
            }

            function y(e, t, n, r, a) {
                function o(e, t) {
                    return 1 === s ? e[t] : e.readUInt16BE(t * s)
                }

                var s = 1, d = e.length, l = t.length;
                if (void 0 !== r && (r = (r + "").toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (2 > e.length || 2 > t.length) return -1;
                    s = 2, d /= 2, l /= 2, n /= 2
                }
                var c;
                if (a) {
                    var p = -1;
                    for (c = n; c < d; c++) if (o(e, c) !== o(t, -1 === p ? 0 : c - p)) -1 !== p && (c -= c - p), p = -1; else if (-1 === p && (p = c), c - p + 1 === l) return p * s
                } else for (n + l > d && (n = d - l), c = n; 0 <= c; c--) {
                    for (var u = !0, f = 0; f < l; f++) if (o(e, c + f) !== o(t, f)) {
                        u = !1;
                        break
                    }
                    if (u) return c
                }
                return -1
            }

            function C(e, t, n, r) {
                n = +n || 0;
                var a = e.length - n;
                r ? (r = +r, r > a && (r = a)) : r = a;
                var o = t.length;
                r > o / 2 && (r = o / 2);
                for (var s, d = 0; d < r; ++d) {
                    if (s = parseInt(t.substr(2 * d, 2), 16), G(s)) return d;
                    e[n + d] = s
                }
                return d
            }

            function w(e, t, n, r) {
                return z(U(t, e.length - n), e, n, r)
            }

            function S(e, t, n, r) {
                return z(q(t), e, n, r)
            }

            function v(e, t, n, r) {
                return S(e, t, n, r)
            }

            function R(e, t, n, r) {
                return z(H(t), e, n, r)
            }

            function E(e, t, n, r) {
                return z(W(t, e.length - n), e, n, r)
            }

            function k(e, t, n) {
                return 0 === t && n === e.length ? X.fromByteArray(e) : X.fromByteArray(e.slice(t, n))
            }

            function x(e, t, n) {
                n = K(e.length, n);
                for (var r = [], a = t; a < n;) {
                    var o = e[a], s = null, d = 239 < o ? 4 : 223 < o ? 3 : 191 < o ? 2 : 1;
                    if (a + d <= n) {
                        var l, c, p, u;
                        1 === d ? 128 > o && (s = o) : 2 === d ? (l = e[a + 1], 128 == (192 & l) && (u = (31 & o) << 6 | 63 & l, 127 < u && (s = u))) : 3 === d ? (l = e[a + 1], c = e[a + 2], 128 == (192 & l) && 128 == (192 & c) && (u = (15 & o) << 12 | (63 & l) << 6 | 63 & c, 2047 < u && (55296 > u || 57343 < u) && (s = u))) : 4 === d ? (l = e[a + 1], c = e[a + 2], p = e[a + 3], 128 == (192 & l) && 128 == (192 & c) && 128 == (192 & p) && (u = (15 & o) << 18 | (63 & l) << 12 | (63 & c) << 6 | 63 & p, 65535 < u && 1114112 > u && (s = u))) : void 0
                    }
                    null === s ? (s = 65533, d = 1) : 65535 < s && (s -= 65536, r.push(55296 | 1023 & s >>> 10), s = 56320 | 1023 & s), r.push(s), a += d
                }
                return T(r)
            }

            function T(e) {
                var t = e.length;
                if (t <= 4096) return V.apply(String, e);
                for (var n = "", r = 0; r < t;) n += V.apply(String, e.slice(r, r += 4096));
                return n
            }

            function A(e, t, n) {
                var r = "";
                n = K(e.length, n);
                for (var a = t; a < n; ++a) r += V(127 & e[a]);
                return r
            }

            function L(e, t, n) {
                var r = "";
                n = K(e.length, n);
                for (var a = t; a < n; ++a) r += V(e[a]);
                return r
            }

            function N(e, t, n) {
                var r = e.length;
                (!t || 0 > t) && (t = 0), (!n || 0 > n || n > r) && (n = r);
                for (var a = "", o = t; o < n; ++o) a += j(e[o]);
                return a
            }

            function F(e, t, n) {
                for (var r = e.slice(t, n), a = "", o = 0; o < r.length; o += 2) a += V(r[o] + 256 * r[o + 1]);
                return a
            }

            function I(e, t, n) {
                if (0 != e % 1 || 0 > e) throw new RangeError("offset is not uint");
                if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function B(e, t, n, r, a, i) {
                if (!o.isBuffer(e)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
                if (t > a || t < i) throw new RangeError("\"value\" argument is out of bounds");
                if (n + r > e.length) throw new RangeError("Index out of range")
            }

            function D(e, t, n, r) {
                if (n + r > e.length) throw new RangeError("Index out of range");
                if (0 > n) throw new RangeError("Index out of range")
            }

            function M(e, t, n, r, a) {
                return t = +t, n >>>= 0, a || D(e, t, n, 4, 34028234663852886e22, -34028234663852886e22), J.write(e, t, n, r, 23, 4), n + 4
            }

            function P(e, t, n, r, a) {
                return t = +t, n >>>= 0, a || D(e, t, n, 8, 17976931348623157e292, -17976931348623157e292), J.write(e, t, n, r, 52, 8), n + 8
            }

            function O(e) {
                if (e = e.split("=")[0], e = e.trim().replace($, ""), 2 > e.length) return "";
                for (; 0 != e.length % 4;) e += "=";
                return e
            }

            function j(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function U(e, t) {
                t = t || 1 / 0;
                for (var n, r = e.length, a = null, o = [], s = 0; s < r; ++s) {
                    if (n = e.charCodeAt(s), 55295 < n && 57344 > n) {
                        if (!a) {
                            if (56319 < n) {
                                -1 < (t -= 3) && o.push(239, 191, 189);
                                continue
                            } else if (s + 1 === r) {
                                -1 < (t -= 3) && o.push(239, 191, 189);
                                continue
                            }
                            a = n;
                            continue
                        }
                        if (56320 > n) {
                            -1 < (t -= 3) && o.push(239, 191, 189), a = n;
                            continue
                        }
                        n = (a - 55296 << 10 | n - 56320) + 65536
                    } else a && -1 < (t -= 3) && o.push(239, 191, 189);
                    if (a = null, 128 > n) {
                        if (0 > (t -= 1)) break;
                        o.push(n)
                    } else if (2048 > n) {
                        if (0 > (t -= 2)) break;
                        o.push(192 | n >> 6, 128 | 63 & n)
                    } else if (65536 > n) {
                        if (0 > (t -= 3)) break;
                        o.push(224 | n >> 12, 128 | 63 & n >> 6, 128 | 63 & n)
                    } else if (1114112 > n) {
                        if (0 > (t -= 4)) break;
                        o.push(240 | n >> 18, 128 | 63 & n >> 12, 128 | 63 & n >> 6, 128 | 63 & n)
                    } else throw new Error("Invalid code point")
                }
                return o
            }

            function q(e) {
                for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                return t
            }

            function W(e, t) {
                for (var n, r, a, o = [], s = 0; s < e.length && !(0 > (t -= 2)); ++s) n = e.charCodeAt(s), r = n >> 8, a = n % 256, o.push(a), o.push(r);
                return o
            }

            function H(e) {
                return X.toByteArray(O(e))
            }

            function z(e, t, n, r) {
                for (var a = 0; a < r && !(a + n >= t.length || a >= e.length); ++a) t[a + n] = e[a];
                return a
            }

            function Y(e) {
                return e instanceof ArrayBuffer || null != e && null != e.constructor && "ArrayBuffer" === e.constructor.name && "number" == typeof e.byteLength
            }

            function G(e) {
                return e !== e
            }

            var X = e("base64-js"), J = e("ieee754");
            n.Buffer = o, n.SlowBuffer = function (e) {
                return +e != e && (e = 0), o.alloc(+e)
            }, n.INSPECT_MAX_BYTES = 50;
            n.kMaxLength = 2147483647, o.TYPED_ARRAY_SUPPORT = function () {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype, foo: function () {
                            return 42
                        }
                    }, 42 === e.foo()
                } catch (t) {
                    return !1
                }
            }(), o.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(o.prototype, "parent", {
                get: function () {
                    return this instanceof o ? this.buffer : void 0
                }
            }), Object.defineProperty(o.prototype, "offset", {
                get: function () {
                    return this instanceof o ? this.byteOffset : void 0
                }
            }), "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), o.poolSize = 8192, o.from = function (e, t, n) {
                return i(e, t, n)
            }, o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, o.alloc = function (e, t, n) {
                return d(e, t, n)
            }, o.allocUnsafe = function (e) {
                return l(e)
            }, o.allocUnsafeSlow = function (e) {
                return l(e)
            }, o.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer
            }, o.compare = function (e, t) {
                if (!o.isBuffer(e) || !o.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var n = e.length, r = t.length, a = 0, s = K(n, r); a < s; ++a) if (e[a] !== t[a]) {
                    n = e[a], r = t[a];
                    break
                }
                return n < r ? -1 : r < n ? 1 : 0
            }, o.isEncoding = function (e) {
                switch ((e + "").toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"latin1":
                    case"binary":
                    case"base64":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return !0;
                    default:
                        return !1;
                }
            }, o.concat = function (e, t) {
                if (!Array.isArray(e)) throw new TypeError("\"list\" argument must be an Array of Buffers");
                if (0 === e.length) return o.alloc(0);
                var n;
                if (t === void 0) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                var r = o.allocUnsafe(t), a = 0;
                for (n = 0; n < e.length; ++n) {
                    var s = e[n];
                    if (ArrayBuffer.isView(s) && (s = o.from(s)), !o.isBuffer(s)) throw new TypeError("\"list\" argument must be an Array of Buffers");
                    s.copy(r, a), a += s.length
                }
                return r
            }, o.byteLength = h, o.prototype._isBuffer = !0, o.prototype.swap16 = function () {
                var e = this.length;
                if (0 != e % 2) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) m(this, t, t + 1);
                return this
            }, o.prototype.swap32 = function () {
                var e = this.length;
                if (0 != e % 4) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
                return this
            }, o.prototype.swap64 = function () {
                var e = this.length;
                if (0 != e % 8) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4);
                return this
            }, o.prototype.toString = function () {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? x(this, 0, e) : _.apply(this, arguments)
            }, o.prototype.toLocaleString = o.prototype.toString, o.prototype.equals = function (e) {
                if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === o.compare(this, e)
            }, o.prototype.inspect = function () {
                var e = "", t = n.INSPECT_MAX_BYTES;
                return 0 < this.length && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">"
            }, o.prototype.compare = function (e, t, n, r, a) {
                if (!o.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === a && (a = this.length), 0 > t || n > e.length || 0 > r || a > this.length) throw new RangeError("out of range index");
                if (r >= a && t >= n) return 0;
                if (r >= a) return -1;
                if (t >= n) return 1;
                if (t >>>= 0, n >>>= 0, r >>>= 0, a >>>= 0, this === e) return 0;
                for (var s = a - r, d = n - t, l = K(s, d), c = this.slice(r, a), p = e.slice(t, n), u = 0; u < l; ++u) if (c[u] !== p[u]) {
                    s = c[u], d = p[u];
                    break
                }
                return s < d ? -1 : d < s ? 1 : 0
            }, o.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n)
            }, o.prototype.indexOf = function (e, t, n) {
                return b(this, e, t, n, !0)
            }, o.prototype.lastIndexOf = function (e, t, n) {
                return b(this, e, t, n, !1)
            }, o.prototype.write = function (e, t, n, r) {
                if (void 0 === t) r = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0; else if (isFinite(t)) t >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0); else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                var a = this.length - t;
                if ((void 0 === n || n > a) && (n = a), 0 < e.length && (0 > n || 0 > t) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var o = !1; ;) switch (r) {
                    case"hex":
                        return C(this, e, t, n);
                    case"utf8":
                    case"utf-8":
                        return w(this, e, t, n);
                    case"ascii":
                        return S(this, e, t, n);
                    case"latin1":
                    case"binary":
                        return v(this, e, t, n);
                    case"base64":
                        return R(this, e, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return E(this, e, t, n);
                    default:
                        if (o) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), o = !0;
                }
            }, o.prototype.toJSON = function () {
                return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
            };
            o.prototype.slice = function (e, t) {
                var n = this.length;
                e = ~~e, t = void 0 === t ? n : ~~t, 0 > e ? (e += n, 0 > e && (e = 0)) : e > n && (e = n), 0 > t ? (t += n, 0 > t && (t = 0)) : t > n && (t = n), t < e && (t = e);
                var r = this.subarray(e, t);
                return r.__proto__ = o.prototype, r
            }, o.prototype.readUIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || I(e, t, this.length);
                for (var r = this[e], a = 1, o = 0; ++o < t && (a *= 256);) r += this[e + o] * a;
                return r
            }, o.prototype.readUIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || I(e, t, this.length);
                for (var r = this[e + --t], a = 1; 0 < t && (a *= 256);) r += this[e + --t] * a;
                return r
            }, o.prototype.readUInt8 = function (e, t) {
                return e >>>= 0, t || I(e, 1, this.length), this[e]
            }, o.prototype.readUInt16LE = function (e, t) {
                return e >>>= 0, t || I(e, 2, this.length), this[e] | this[e + 1] << 8
            }, o.prototype.readUInt16BE = function (e, t) {
                return e >>>= 0, t || I(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, o.prototype.readUInt32LE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, o.prototype.readUInt32BE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, o.prototype.readIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || I(e, t, this.length);
                for (var a = this[e], o = 1, s = 0; ++s < t && (o *= 256);) a += this[e + s] * o;
                return o *= 128, a >= o && (a -= r(2, 8 * t)), a
            }, o.prototype.readIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || I(e, t, this.length);
                for (var a = t, o = 1, s = this[e + --a]; 0 < a && (o *= 256);) s += this[e + --a] * o;
                return o *= 128, s >= o && (s -= r(2, 8 * t)), s
            }, o.prototype.readInt8 = function (e, t) {
                return e >>>= 0, t || I(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, o.prototype.readInt16LE = function (e, t) {
                e >>>= 0, t || I(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, o.prototype.readInt16BE = function (e, t) {
                e >>>= 0, t || I(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, o.prototype.readInt32LE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, o.prototype.readInt32BE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, o.prototype.readFloatLE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), J.read(this, e, !0, 23, 4)
            }, o.prototype.readFloatBE = function (e, t) {
                return e >>>= 0, t || I(e, 4, this.length), J.read(this, e, !1, 23, 4)
            }, o.prototype.readDoubleLE = function (e, t) {
                return e >>>= 0, t || I(e, 8, this.length), J.read(this, e, !0, 52, 8)
            }, o.prototype.readDoubleBE = function (e, t) {
                return e >>>= 0, t || I(e, 8, this.length), J.read(this, e, !1, 52, 8)
            }, o.prototype.writeUIntLE = function (e, t, n, a) {
                if (e = +e, t >>>= 0, n >>>= 0, !a) {
                    var o = r(2, 8 * n) - 1;
                    B(this, e, t, n, o, 0)
                }
                var s = 1, d = 0;
                for (this[t] = 255 & e; ++d < n && (s *= 256);) this[t + d] = 255 & e / s;
                return t + n
            }, o.prototype.writeUIntBE = function (e, t, n, a) {
                if (e = +e, t >>>= 0, n >>>= 0, !a) {
                    var o = r(2, 8 * n) - 1;
                    B(this, e, t, n, o, 0)
                }
                var s = n - 1, d = 1;
                for (this[t + s] = 255 & e; 0 <= --s && (d *= 256);) this[t + s] = 255 & e / d;
                return t + n
            }, o.prototype.writeUInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, o.prototype.writeUInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, o.prototype.writeUInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, o.prototype.writeUInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, o.prototype.writeUInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, o.prototype.writeIntLE = function (e, t, n, a) {
                if (e = +e, t >>>= 0, !a) {
                    var o = r(2, 8 * n - 1);
                    B(this, e, t, n, o - 1, -o)
                }
                var s = 0, d = 1, l = 0;
                for (this[t] = 255 & e; ++s < n && (d *= 256);) 0 > e && 0 === l && 0 !== this[t + s - 1] && (l = 1), this[t + s] = 255 & (e / d >> 0) - l;
                return t + n
            }, o.prototype.writeIntBE = function (e, t, n, a) {
                if (e = +e, t >>>= 0, !a) {
                    var o = r(2, 8 * n - 1);
                    B(this, e, t, n, o - 1, -o)
                }
                var s = n - 1, d = 1, l = 0;
                for (this[t + s] = 255 & e; 0 <= --s && (d *= 256);) 0 > e && 0 === l && 0 !== this[t + s + 1] && (l = 1), this[t + s] = 255 & (e / d >> 0) - l;
                return t + n
            }, o.prototype.writeInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 1, 127, -128), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, o.prototype.writeInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, o.prototype.writeInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, o.prototype.writeInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, o.prototype.writeInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || B(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, o.prototype.writeFloatLE = function (e, t, n) {
                return M(this, e, t, !0, n)
            }, o.prototype.writeFloatBE = function (e, t, n) {
                return M(this, e, t, !1, n)
            }, o.prototype.writeDoubleLE = function (e, t, n) {
                return P(this, e, t, !0, n)
            }, o.prototype.writeDoubleBE = function (e, t, n) {
                return P(this, e, t, !1, n)
            }, o.prototype.copy = function (e, t, n, r) {
                if (!o.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), 0 < r && r < n && (r = n), r === n) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (0 > t) throw new RangeError("targetStart out of bounds");
                if (0 > n || n >= this.length) throw new RangeError("Index out of range");
                if (0 > r) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
                var a = r - n;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, n, r); else if (this === e && n < t && t < r) for (var s = a - 1; 0 <= s; --s) e[s + t] = this[s + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, r), t);
                return a
            }, o.prototype.fill = function (e, t, n, r) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !o.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                    if (1 === e.length) {
                        var a = e.charCodeAt(0);
                        ("utf8" === r && 128 > a || "latin1" === r) && (e = a)
                    }
                } else "number" == typeof e && (e &= 255);
                if (0 > t || this.length < t || this.length < n) throw new RangeError("Out of range index");
                if (n <= t) return this;
                t >>>= 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
                var s;
                if ("number" == typeof e) for (s = t; s < n; ++s) this[s] = e; else {
                    var d = o.isBuffer(e) ? e : new o(e, r), l = d.length;
                    if (0 === l) throw new TypeError("The value \"" + e + "\" is invalid for argument \"value\"");
                    for (s = 0; s < n - t; ++s) this[s + t] = d[s % l]
                }
                return this
            };
            var $ = /[^+/0-9A-Za-z-_]/g
        }, {"base64-js": 1, ieee754: 10}], 4: [function (e, t) {
            function n() {
                this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = b(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
            }

            function r(e) {
                return void 0 === e._maxListeners ? n.defaultMaxListeners : e._maxListeners
            }

            function a(e, t, n) {
                if (t) e.call(n); else for (var r = e.length, a = _(e, r), o = 0; o < r; ++o) a[o].call(n)
            }

            function s(e, t, n, r) {
                if (t) e.call(n, r); else for (var a = e.length, o = _(e, a), s = 0; s < a; ++s) o[s].call(n, r)
            }

            function d(e, t, n, r, a) {
                if (t) e.call(n, r, a); else for (var o = e.length, s = _(e, o), d = 0; d < o; ++d) s[d].call(n, r, a)
            }

            function l(e, t, n, r, a, o) {
                if (t) e.call(n, r, a, o); else for (var s = e.length, d = _(e, s), l = 0; l < s; ++l) d[l].call(n, r, a, o)
            }

            function c(e, t, n, r) {
                if (t) e.apply(n, r); else for (var a = e.length, o = _(e, a), s = 0; s < a; ++s) o[s].apply(n, r)
            }

            function p(e, t, n, a) {
                var o, i, s;
                if ("function" != typeof n) throw new TypeError("\"listener\" argument must be a function");
                if (i = e._events, i ? (i.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), i = e._events), s = i[t]) : (i = e._events = b(null), e._eventsCount = 0), !s) s = i[t] = n, ++e._eventsCount; else if ("function" == typeof s ? s = i[t] = a ? [n, s] : [s, n] : a ? s.unshift(n) : s.push(n), !s.warned && (o = r(e), o && 0 < o && s.length > o)) {
                    s.warned = !0;
                    var d = new Error("Possible EventEmitter memory leak detected. " + s.length + " \"" + (t + "\" listeners added. Use emitter.setMaxListeners() to increase limit."));
                    d.name = "MaxListenersExceededWarning", d.emitter = e, d.type = t, d.count = s.length, "object" == typeof console && console.warn && console.warn("%s: %s", d.name, d.message)
                }
                return e
            }

            function u() {
                if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
                    case 0:
                        return this.listener.call(this.target);
                    case 1:
                        return this.listener.call(this.target, arguments[0]);
                    case 2:
                        return this.listener.call(this.target, arguments[0], arguments[1]);
                    case 3:
                        return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                    default:
                        for (var e = Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                        this.listener.apply(this.target, e);
                }
            }

            function f(e, t, n) {
                var r = {fired: !1, wrapFn: void 0, target: e, type: t, listener: n}, a = C.call(u, r);
                return a.listener = n, r.wrapFn = a, a
            }

            function g(e) {
                var t = this._events;
                if (t) {
                    var n = t[e];
                    if ("function" == typeof n) return 1;
                    if (n) return n.length
                }
                return 0
            }

            function h(e, t) {
                for (var r = t, a = r + 1, o = e.length; a < o; r += 1, a += 1) e[r] = e[a];
                e.pop()
            }

            function _(e, t) {
                for (var n = Array(t), r = 0; r < t; ++r) n[r] = e[r];
                return n
            }

            function m(e) {
                for (var t = Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
                return t
            }

            var b = Object.create || function (e) {
                var t = function () {
                };
                return t.prototype = e, new t
            }, y = Object.keys || function (e) {
                var t = [];
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
                return n
            }, C = Function.prototype.bind || function (e) {
                var t = this;
                return function () {
                    return t.apply(e, arguments)
                }
            };
            t.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0;
            var w, S = 10;
            try {
                var v = {};
                Object.defineProperty && Object.defineProperty(v, "x", {value: 0}), w = 0 === v.x
            } catch (e) {
                w = !1
            }
            w ? Object.defineProperty(n, "defaultMaxListeners", {
                enumerable: !0, get: function () {
                    return S
                }, set: function (e) {
                    if ("number" != typeof e || 0 > e || e !== e) throw new TypeError("\"defaultMaxListeners\" must be a positive number");
                    S = e
                }
            }) : n.defaultMaxListeners = S, n.prototype.setMaxListeners = function (e) {
                if ("number" != typeof e || 0 > e || isNaN(e)) throw new TypeError("\"n\" argument must be a positive number");
                return this._maxListeners = e, this
            }, n.prototype.getMaxListeners = function () {
                return r(this)
            }, n.prototype.emit = function (e) {
                var t, n, r, o, p, u, f = "error" === e;
                if (u = this._events, u) f = f && null == u.error; else if (!f) return !1;
                if (f) {
                    if (1 < arguments.length && (t = arguments[1]), t instanceof Error) throw t; else {
                        var g = new Error("Unhandled \"error\" event. (" + t + ")");
                        throw g.context = t, g
                    }
                    return !1
                }
                if (n = u[e], !n) return !1;
                var h = "function" == typeof n;
                switch (r = arguments.length, r) {
                    case 1:
                        a(n, h, this);
                        break;
                    case 2:
                        s(n, h, this, arguments[1]);
                        break;
                    case 3:
                        d(n, h, this, arguments[1], arguments[2]);
                        break;
                    case 4:
                        l(n, h, this, arguments[1], arguments[2], arguments[3]);
                        break;
                    default:
                        for (o = Array(r - 1), p = 1; p < r; p++) o[p - 1] = arguments[p];
                        c(n, h, this, o);
                }
                return !0
            }, n.prototype.addListener = function (e, t) {
                return p(this, e, t, !1)
            }, n.prototype.on = n.prototype.addListener, n.prototype.prependListener = function (e, t) {
                return p(this, e, t, !0)
            }, n.prototype.once = function (e, t) {
                if ("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
                return this.on(e, f(this, e, t)), this
            }, n.prototype.prependOnceListener = function (e, t) {
                if ("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
                return this.prependListener(e, f(this, e, t)), this
            }, n.prototype.removeListener = function (e, t) {
                var n, r, a, o, s;
                if ("function" != typeof t) throw new TypeError("\"listener\" argument must be a function");
                if (r = this._events, !r) return this;
                if (n = r[e], !n) return this;
                if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = b(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t)); else if ("function" != typeof n) {
                    for (a = -1, o = n.length - 1; 0 <= o; o--) if (n[o] === t || n[o].listener === t) {
                        s = n[o].listener, a = o;
                        break
                    }
                    if (0 > a) return this;
                    0 === a ? n.shift() : h(n, a), 1 === n.length && (r[e] = n[0]), r.removeListener && this.emit("removeListener", e, s || t)
                }
                return this
            }, n.prototype.removeAllListeners = function (e) {
                var t, n, r;
                if (n = this._events, !n) return this;
                if (!n.removeListener) return 0 === arguments.length ? (this._events = b(null), this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = b(null) : delete n[e]), this;
                if (0 === arguments.length) {
                    var a, o = y(n);
                    for (r = 0; r < o.length; ++r) a = o[r], "removeListener" === a || this.removeAllListeners(a);
                    return this.removeAllListeners("removeListener"), this._events = b(null), this._eventsCount = 0, this
                }
                if (t = n[e], "function" == typeof t) this.removeListener(e, t); else if (t) for (r = t.length - 1; 0 <= r; r--) this.removeListener(e, t[r]);
                return this
            }, n.prototype.listeners = function (e) {
                var t, n, r = this._events;
                return r ? (t = r[e], n = t ? "function" == typeof t ? [t.listener || t] : m(t) : []) : n = [], n
            }, n.listenerCount = function (e, t) {
                return "function" == typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t)
            }, n.prototype.listenerCount = g, n.prototype.eventNames = function () {
                return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : []
            }
        }, {}], 5: [function (e, t, n) {
            (function (e) {
                function t(e) {
                    return Object.prototype.toString.call(e)
                }

                n.isArray = function (e) {
                    return Array.isArray ? Array.isArray(e) : "[object Array]" === t(e)
                }, n.isBoolean = function (e) {
                    return "boolean" == typeof e
                }, n.isNull = function (e) {
                    return null === e
                }, n.isNullOrUndefined = function (e) {
                    return null == e
                }, n.isNumber = function (e) {
                    return "number" == typeof e
                }, n.isString = function (e) {
                    return "string" == typeof e
                }, n.isSymbol = function (e) {
                    return "symbol" == typeof e
                }, n.isUndefined = function (e) {
                    return void 0 === e
                }, n.isRegExp = function (e) {
                    return "[object RegExp]" === t(e)
                }, n.isObject = function (e) {
                    return "object" == typeof e && null !== e
                }, n.isDate = function (e) {
                    return "[object Date]" === t(e)
                }, n.isError = function (n) {
                    return "[object Error]" === t(n) || n instanceof Error
                }, n.isFunction = function (e) {
                    return "function" == typeof e
                }, n.isPrimitive = function (e) {
                    return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
                }, n.isBuffer = e.isBuffer
            }).call(this, {isBuffer: e("../../is-buffer/index.js")})
        }, {"../../is-buffer/index.js": 12}], 6: [function (e, t) {
            var s = Math.round;

            function r(e) {
                if (e += "", !(100 < e.length)) {
                    var t = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                    if (t) {
                        var r = parseFloat(t[1]), n = (t[2] || "ms").toLowerCase();
                        return "years" === n || "year" === n || "yrs" === n || "yr" === n || "y" === n ? 31557600000 * r : "weeks" === n || "week" === n || "w" === n ? 604800000 * r : "days" === n || "day" === n || "d" === n ? 86400000 * r : "hours" === n || "hour" === n || "hrs" === n || "hr" === n || "h" === n ? 3600000 * r : "minutes" === n || "minute" === n || "mins" === n || "min" === n || "m" === n ? 60000 * r : "seconds" === n || "second" === n || "secs" === n || "sec" === n || "s" === n ? 1000 * r : "milliseconds" === n || "millisecond" === n || "msecs" === n || "msec" === n || "ms" === n ? r : void 0
                    }
                }
            }

            function a(e) {
                var t = n(e);
                return 86400000 <= t ? s(e / 86400000) + "d" : 3600000 <= t ? s(e / 3600000) + "h" : 60000 <= t ? s(e / 60000) + "m" : 1000 <= t ? s(e / 1000) + "s" : e + "ms"
            }

            function o(e) {
                var t = n(e);
                return 86400000 <= t ? i(e, t, 86400000, "day") : 3600000 <= t ? i(e, t, 3600000, "hour") : 60000 <= t ? i(e, t, 60000, "minute") : 1000 <= t ? i(e, t, 1000, "second") : e + " ms"
            }

            function i(e, t, r, n) {
                return s(e / r) + " " + n + (t >= 1.5 * r ? "s" : "")
            }

            var l = 24 * (60 * 60000);
            t.exports = function (e, t) {
                t = t || {};
                var n = typeof e;
                if ("string" == n && 0 < e.length) return r(e);
                if ("number" == n && !1 === isNaN(e)) return t.long ? o(e) : a(e);
                throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
            }
        }, {}], 7: [function (e, t, n) {
            (function (a) {
                function o() {
                    let e;
                    try {
                        e = n.storage.getItem("debug")
                    } catch (e) {
                    }
                    return !e && "undefined" != typeof a && "env" in a && (e = a.env.DEBUG), e
                }

                n.log = function (...e) {
                    return "object" == typeof console && console.log && console.log(...e)
                }, n.formatArgs = function (e) {
                    if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                    const n = "color: " + this.color;
                    e.splice(1, 0, n, "color: inherit");
                    let r = 0, a = 0;
                    e[0].replace(/%[a-zA-Z%]/g, e => {
                        "%%" === e || (r++, "%c" === e && (a = r))
                    }), e.splice(a, 0, n)
                }, n.save = function (e) {
                    try {
                        e ? n.storage.setItem("debug", e) : n.storage.removeItem("debug")
                    } catch (e) {
                    }
                }, n.load = o, n.useColors = function () {
                    return !!("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) || !("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
                }, n.storage = function () {
                    try {
                        return localStorage
                    } catch (e) {
                    }
                }(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.exports = e("./common")(n);
                const {formatters: i} = t.exports;
                i.j = function (e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return "[UnexpectedJSONParseError]: " + e.message
                    }
                }
            }).call(this, e("_process"))
        }, {"./common": 8, _process: 15}], 8: [function (e, t) {
            t.exports = function (t) {
                function r(e) {
                    let t = 0;
                    for (let n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
                    return a.colors[n(t) % a.colors.length]
                }

                function a(e) {
                    function t(...e) {
                        if (!t.enabled) return;
                        const r = t, o = +new Date, i = o - (n || o);
                        r.diff = i, r.prev = n, r.curr = o, n = o, e[0] = a.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                        let s = 0;
                        e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, n) => {
                            if ("%%" === t) return t;
                            s++;
                            const o = a.formatters[n];
                            if ("function" == typeof o) {
                                const n = e[s];
                                t = o.call(r, n), e.splice(s, 1), s--
                            }
                            return t
                        }), a.formatArgs.call(r, e);
                        const d = r.log || a.log;
                        d.apply(r, e)
                    }

                    let n;
                    return t.namespace = e, t.enabled = a.enabled(e), t.useColors = a.useColors(), t.color = r(e), t.destroy = o, t.extend = i, "function" == typeof a.init && a.init(t), a.instances.push(t), t
                }

                function o() {
                    const e = a.instances.indexOf(this);
                    return -1 !== e && (a.instances.splice(e, 1), !0)
                }

                function i(e, t) {
                    return a(this.namespace + ("undefined" == typeof t ? ":" : t) + e)
                }

                function s(e) {
                    return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
                }

                return a.debug = a, a.default = a, a.coerce = function (e) {
                    return e instanceof Error ? e.stack || e.message : e
                }, a.disable = function () {
                    const e = [...a.names.map(s), ...a.skips.map(s).map(e => "-" + e)].join(",");
                    return a.enable(""), e
                }, a.enable = function (e) {
                    a.save(e), a.names = [], a.skips = [];
                    let t;
                    const n = ("string" == typeof e ? e : "").split(/[\s,]+/), r = n.length;
                    for (t = 0; t < r; t++) n[t] && (e = n[t].replace(/\*/g, ".*?"), "-" === e[0] ? a.skips.push(new RegExp("^" + e.substr(1) + "$")) : a.names.push(new RegExp("^" + e + "$")));
                    for (t = 0; t < a.instances.length; t++) {
                        const e = a.instances[t];
                        e.enabled = a.enabled(e.namespace)
                    }
                }, a.enabled = function (e) {
                    if ("*" === e[e.length - 1]) return !0;
                    let t, n;
                    for (t = 0, n = a.skips.length; t < n; t++) if (a.skips[t].test(e)) return !1;
                    for (t = 0, n = a.names.length; t < n; t++) if (a.names[t].test(e)) return !0;
                    return !1
                }, a.humanize = e("ms"), Object.keys(t).forEach(e => {
                    a[e] = t[e]
                }), a.instances = [], a.names = [], a.skips = [], a.formatters = {}, a.selectColor = r, a.enable(a.load()), a
            }
        }, {ms: 6}], 9: [function (e, t) {
            t.exports = function () {
                if ("undefined" == typeof window) return null;
                var e = {
                    RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                    RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                    RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
                };
                return e.RTCPeerConnection ? e : null
            }
        }, {}], 10: [function (e, a, o) {
            o.read = function (t, n, a, o, l) {
                var c, p, u = 8 * l - o - 1, f = (1 << u) - 1, g = f >> 1, h = -7, _ = a ? l - 1 : 0, b = a ? -1 : 1,
                    d = t[n + _];
                for (_ += b, c = d & (1 << -h) - 1, d >>= -h, h += u; 0 < h; c = 256 * c + t[n + _], _ += b, h -= 8) ;
                for (p = c & (1 << -h) - 1, c >>= -h, h += o; 0 < h; p = 256 * p + t[n + _], _ += b, h -= 8) ;
                if (0 === c) c = 1 - g; else {
                    if (c === f) return p ? NaN : (d ? -1 : 1) * (1 / 0);
                    p += r(2, o), c -= g
                }
                return (d ? -1 : 1) * p * r(2, c - o)
            }, o.write = function (a, o, l, p, u, f) {
                var _, b, y, g = Math.LN2, h = Math.log, C = 8 * f - u - 1, w = (1 << C) - 1, S = w >> 1,
                    v = 23 === u ? r(2, -24) - r(2, -77) : 0, R = p ? 0 : f - 1, E = p ? 1 : -1,
                    d = 0 > o || 0 === o && 0 > 1 / o ? 1 : 0;
                for (o = n(o), isNaN(o) || o === 1 / 0 ? (b = isNaN(o) ? 1 : 0, _ = w) : (_ = t(h(o) / g), 1 > o * (y = r(2, -_)) && (_--, y *= 2), o += 1 <= _ + S ? v / y : v * r(2, 1 - S), 2 <= o * y && (_++, y /= 2), _ + S >= w ? (b = 0, _ = w) : 1 <= _ + S ? (b = (o * y - 1) * r(2, u), _ += S) : (b = o * r(2, S - 1) * r(2, u), _ = 0)); 8 <= u; a[l + R] = 255 & b, R += E, b /= 256, u -= 8) ;
                for (_ = _ << u | b, C += u; 0 < C; a[l + R] = 255 & _, R += E, _ /= 256, C -= 8) ;
                a[l + R - E] |= 128 * d
            }
        }, {}], 11: [function (e, t) {
            t.exports = "function" == typeof Object.create ? function (e, t) {
                e.super_ = t, e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                })
            } : function (e, t) {
                e.super_ = t;
                var n = function () {
                };
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
            }
        }, {}], 12: [function (e, t) {
            function n(e) {
                return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
            }

            function r(e) {
                return "function" == typeof e.readFloatLE && "function" == typeof e.slice && n(e.slice(0, 0))
            }/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
            t.exports = function (e) {
                return null != e && (n(e) || r(e) || !!e._isBuffer)
            }
        }, {}], 13: [function (e, t) {
            var n = {}.toString;
            t.exports = Array.isArray || function (e) {
                return "[object Array]" == n.call(e)
            }
        }, {}], 14: [function (e, t) {
            (function (e) {
                "use strict";
                t.exports = e.version && 0 !== e.version.indexOf("v0.") && (0 !== e.version.indexOf("v1.") || 0 === e.version.indexOf("v1.8.")) ? e : {
                    nextTick: function (t, n, r, a) {
                        if ("function" != typeof t) throw new TypeError("\"callback\" argument must be a function");
                        var o, s, d = arguments.length;
                        switch (d) {
                            case 0:
                            case 1:
                                return e.nextTick(t);
                            case 2:
                                return e.nextTick(function () {
                                    t.call(null, n)
                                });
                            case 3:
                                return e.nextTick(function () {
                                    t.call(null, n, r)
                                });
                            case 4:
                                return e.nextTick(function () {
                                    t.call(null, n, r, a)
                                });
                            default:
                                for (o = Array(d - 1), s = 0; s < o.length;) o[s++] = arguments[s];
                                return e.nextTick(function () {
                                    t.apply(null, o)
                                });
                        }
                    }
                }
            }).call(this, e("_process"))
        }, {_process: 15}], 15: [function (e, t) {
            function n() {
                throw new Error("setTimeout has not been defined")
            }

            function r() {
                throw new Error("clearTimeout has not been defined")
            }

            function a(t) {
                if (c === setTimeout) return setTimeout(t, 0);
                if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
                try {
                    return c(t, 0)
                } catch (n) {
                    try {
                        return c.call(null, t, 0)
                    } catch (n) {
                        return c.call(this, t, 0)
                    }
                }
            }

            function o(t) {
                if (p === clearTimeout) return clearTimeout(t);
                if ((p === r || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
                try {
                    return p(t)
                } catch (n) {
                    try {
                        return p.call(null, t)
                    } catch (n) {
                        return p.call(this, t)
                    }
                }
            }

            function i() {
                h && f && (h = !1, f.length ? g = f.concat(g) : _ = -1, g.length && s())
            }

            function s() {
                if (!h) {
                    var e = a(i);
                    h = !0;
                    for (var t = g.length; t;) {
                        for (f = g, g = []; ++_ < t;) f && f[_].run();
                        _ = -1, t = g.length
                    }
                    f = null, h = !1, o(e)
                }
            }

            function d(e, t) {
                this.fun = e, this.array = t
            }

            function l() {
            }

            var c, p, u = t.exports = {};
            (function () {
                try {
                    c = "function" == typeof setTimeout ? setTimeout : n
                } catch (t) {
                    c = n
                }
                try {
                    p = "function" == typeof clearTimeout ? clearTimeout : r
                } catch (t) {
                    p = r
                }
            })();
            var f, g = [], h = !1, _ = -1;
            u.nextTick = function (e) {
                var t = Array(arguments.length - 1);
                if (1 < arguments.length) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                g.push(new d(e, t)), 1 !== g.length || h || a(s)
            }, d.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = l, u.addListener = l, u.once = l, u.off = l, u.removeListener = l, u.removeAllListeners = l, u.emit = l, u.prependListener = l, u.prependOnceListener = l, u.listeners = function () {
                return []
            }, u.binding = function () {
                throw new Error("process.binding is not supported")
            }, u.cwd = function () {
                return "/"
            }, u.chdir = function () {
                throw new Error("process.chdir is not supported")
            }, u.umask = function () {
                return 0
            }
        }, {}], 16: [function (e, t) {
            (function (n, r) {
                "use strict";
                var a = e("safe-buffer").Buffer, o = r.crypto || r.msCrypto;
                t.exports = o && o.getRandomValues ? function (e, t) {
                    if (65536 < e) throw new Error("requested too many random bytes");
                    var i = new r.Uint8Array(e);
                    0 < e && o.getRandomValues(i);
                    var s = a.from(i.buffer);
                    return "function" == typeof t ? n.nextTick(function () {
                        t(null, s)
                    }) : s
                } : function () {
                    throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
                }
            }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
        }, {_process: 15, "safe-buffer": 26}], 17: [function (e, t) {
            "use strict";

            function n(e) {
                return this instanceof n ? void (d.call(this, e), l.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", r)) : new n(e)
            }

            function r() {
                this.allowHalfOpen || this._writableState.ended || o(a, this)
            }

            function a(e) {
                e.end()
            }

            var o = e("process-nextick-args").nextTick, i = Object.keys || function (e) {
                var t = [];
                for (var n in e) t.push(n);
                return t
            };
            t.exports = n;
            var s = e("core-util-is");
            s.inherits = e("inherits");
            var d = e("./_stream_readable"), l = e("./_stream_writable");
            s.inherits(n, d);
            for (var c, p = i(l.prototype), u = 0; u < p.length; u++) c = p[u], n.prototype[c] || (n.prototype[c] = l.prototype[c]);
            Object.defineProperty(n.prototype, "destroyed", {
                get: function () {
                    return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed
                }, set: function (e) {
                    void 0 === this._readableState || void 0 === this._writableState || (this._readableState.destroyed = e, this._writableState.destroyed = e)
                }
            }), n.prototype._destroy = function (e, t) {
                this.push(null), this.end(), o(t, e)
            }
        }, {
            "./_stream_readable": 19,
            "./_stream_writable": 21,
            "core-util-is": 5,
            inherits: 11,
            "process-nextick-args": 14
        }], 18: [function (e, t) {
            "use strict";

            function n(e) {
                return this instanceof n ? void r.call(this, e) : new n(e)
            }

            t.exports = n;
            var r = e("./_stream_transform"), a = e("core-util-is");
            a.inherits = e("inherits"), a.inherits(n, r), n.prototype._transform = function (e, t, n) {
                n(null, e)
            }
        }, {"./_stream_transform": 20, "core-util-is": 5, inherits: 11}], 19: [function (e, n) {
            (function (r, a) {
                "use strict";

                function o(e) {
                    return j.from(e)
                }

                function i(e) {
                    return j.isBuffer(e) || e instanceof U
                }

                function s(e, t, n) {
                    return "function" == typeof e.prependListener ? e.prependListener(t, n) : void (e._events && e._events[t] ? D(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n))
                }

                function d(n, r) {
                    B = B || e("./_stream_duplex"), n = n || {};
                    var a = r instanceof B;
                    this.objectMode = !!n.objectMode, a && (this.objectMode = this.objectMode || !!n.readableObjectMode);
                    var o = n.highWaterMark, i = n.readableHighWaterMark, s = this.objectMode ? 16 : 16384;
                    this.highWaterMark = o || 0 === o ? o : a && (i || 0 === i) ? i : s, this.highWaterMark = t(this.highWaterMark), this.buffer = new Y, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = n.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, n.encoding && (!z && (z = e("string_decoder/").StringDecoder), this.decoder = new z(n.encoding), this.encoding = n.encoding)
                }

                function l(t) {
                    return B = B || e("./_stream_duplex"), this instanceof l ? void (this._readableState = new d(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), O.call(this)) : new l(t)
                }

                function c(e, t, n, r, a) {
                    var i = e._readableState;
                    if (null === t) i.reading = !1, _(e, i); else {
                        var s;
                        a || (s = u(i, t)), s ? e.emit("error", s) : i.objectMode || t && 0 < t.length ? ("string" != typeof t && !i.objectMode && Object.getPrototypeOf(t) !== j.prototype && (t = o(t)), r ? i.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : p(e, i, t, !0) : i.ended ? e.emit("error", new Error("stream.push() after EOF")) : (i.reading = !1, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || 0 !== t.length ? p(e, i, t, !1) : y(e, i)) : p(e, i, t, !1))) : !r && (i.reading = !1)
                    }
                    return f(i)
                }

                function p(e, t, n, r) {
                    t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && m(e)), y(e, t)
                }

                function u(e, t) {
                    var n;
                    return i(t) || "string" == typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n
                }

                function f(e) {
                    return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
                }

                function g(e) {
                    return 8388608 <= e ? e = 8388608 : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                }

                function h(e, t) {
                    return 0 >= e || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = g(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length
                }

                function _(e, t) {
                    if (!t.ended) {
                        if (t.decoder) {
                            var n = t.decoder.end();
                            n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
                        }
                        t.ended = !0, m(e)
                    }
                }

                function m(e) {
                    var t = e._readableState;
                    t.needReadable = !1, t.emittedReadable || (H("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? I(b, e) : b(e))
                }

                function b(e) {
                    H("emit readable"), e.emit("readable"), E(e)
                }

                function y(e, t) {
                    t.readingMore || (t.readingMore = !0, I(C, e, t))
                }

                function C(e, t) {
                    for (var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (H("maybeReadMore read 0"), e.read(0), n !== t.length);) n = t.length;
                    t.readingMore = !1
                }

                function w(e) {
                    return function () {
                        var t = e._readableState;
                        H("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && P(e, "data") && (t.flowing = !0, E(e))
                    }
                }

                function S(e) {
                    H("readable nexttick read 0"), e.read(0)
                }

                function v(e, t) {
                    t.resumeScheduled || (t.resumeScheduled = !0, I(R, e, t))
                }

                function R(e, t) {
                    t.reading || (H("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), E(e), t.flowing && !t.reading && e.read(0)
                }

                function E(e) {
                    var t = e._readableState;
                    for (H("flow", t.flowing); t.flowing && null !== e.read();) ;
                }

                function k(e, t) {
                    if (0 === t.length) return null;
                    var n;
                    return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : n = x(e, t.buffer, t.decoder), n
                }

                function x(e, t, n) {
                    var r;
                    return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : e === t.head.data.length ? r = t.shift() : r = n ? T(e, t) : A(e, t), r
                }

                function T(e, t) {
                    var r = t.head, a = 1, o = r.data;
                    for (e -= o.length; r = r.next;) {
                        var i = r.data, s = e > i.length ? i.length : e;
                        if (o += s === i.length ? i : i.slice(0, e), e -= s, 0 === e) {
                            s === i.length ? (++a, t.head = r.next ? r.next : t.tail = null) : (t.head = r, r.data = i.slice(s));
                            break
                        }
                        ++a
                    }
                    return t.length -= a, o
                }

                function A(e, t) {
                    var r = j.allocUnsafe(e), a = t.head, o = 1;
                    for (a.data.copy(r), e -= a.data.length; a = a.next;) {
                        var i = a.data, s = e > i.length ? i.length : e;
                        if (i.copy(r, r.length - e, 0, s), e -= s, 0 === e) {
                            s === i.length ? (++o, t.head = a.next ? a.next : t.tail = null) : (t.head = a, a.data = i.slice(s));
                            break
                        }
                        ++o
                    }
                    return t.length -= o, r
                }

                function L(e) {
                    var t = e._readableState;
                    if (0 < t.length) throw new Error("\"endReadable()\" called on non-empty stream");
                    t.endEmitted || (t.ended = !0, I(N, t, e))
                }

                function N(e, t) {
                    e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
                }

                function F(e, t) {
                    for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                    return -1
                }

                var I = e("process-nextick-args").nextTick;
                n.exports = l;
                var B, D = e("isarray");
                l.ReadableState = d;
                var M = e("events").EventEmitter, P = function (e, t) {
                    return e.listeners(t).length
                }, O = e("./internal/streams/stream"), j = e("safe-buffer").Buffer, U = a.Uint8Array || function () {
                }, q = e("core-util-is");
                q.inherits = e("inherits");
                var W = e("util"), H = void 0;
                H = W && W.debuglog ? W.debuglog("stream") : function () {
                };
                var z, Y = e("./internal/streams/BufferList"), G = e("./internal/streams/destroy");
                q.inherits(l, O);
                var V = ["error", "close", "destroy", "pause", "resume"];
                Object.defineProperty(l.prototype, "destroyed", {
                    get: function () {
                        return void 0 !== this._readableState && this._readableState.destroyed
                    }, set: function (e) {
                        this._readableState && (this._readableState.destroyed = e)
                    }
                }), l.prototype.destroy = G.destroy, l.prototype._undestroy = G.undestroy, l.prototype._destroy = function (e, t) {
                    this.push(null), t(e)
                }, l.prototype.push = function (e, t) {
                    var n, r = this._readableState;
                    return r.objectMode ? n = !0 : "string" == typeof e && (t = t || r.defaultEncoding, t !== r.encoding && (e = j.from(e, t), t = ""), n = !0), c(this, e, t, !1, n)
                }, l.prototype.unshift = function (e) {
                    return c(this, e, null, !0, !1)
                }, l.prototype.isPaused = function () {
                    return !1 === this._readableState.flowing
                }, l.prototype.setEncoding = function (t) {
                    return z || (z = e("string_decoder/").StringDecoder), this._readableState.decoder = new z(t), this._readableState.encoding = t, this
                };
                l.prototype.read = function (e) {
                    H("read", e), e = parseInt(e, 10);
                    var t = this._readableState, r = e;
                    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return H("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? L(this) : m(this), null;
                    if (e = h(e, t), 0 === e && t.ended) return 0 === t.length && L(this), null;
                    var a = t.needReadable;
                    H("need readable", a), (0 === t.length || t.length - e < t.highWaterMark) && (a = !0, H("length less than watermark", a)), t.ended || t.reading ? (a = !1, H("reading or ended", a)) : a && (H("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, !t.reading && (e = h(r, t)));
                    var o;
                    return o = 0 < e ? k(e, t) : null, null === o ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (!t.ended && (t.needReadable = !0), r !== e && t.ended && L(this)), null !== o && this.emit("data", o), o
                }, l.prototype._read = function () {
                    this.emit("error", new Error("_read() is not implemented"))
                }, l.prototype.pipe = function (e, t) {
                    function n(e, t) {
                        H("onunpipe"), e === u && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, o())
                    }

                    function a() {
                        H("onend"), e.end()
                    }

                    function o() {
                        H("cleanup"), e.removeListener("close", l), e.removeListener("finish", c), e.removeListener("drain", _), e.removeListener("error", d), e.removeListener("unpipe", n), u.removeListener("end", a), u.removeListener("end", p), u.removeListener("data", i), m = !0, f.awaitDrain && (!e._writableState || e._writableState.needDrain) && _()
                    }

                    function i(t) {
                        H("ondata"), b = !1;
                        var n = e.write(t);
                        !1 !== n || b || ((1 === f.pipesCount && f.pipes === e || 1 < f.pipesCount && -1 !== F(f.pipes, e)) && !m && (H("false write response, pause", u._readableState.awaitDrain), u._readableState.awaitDrain++, b = !0), u.pause())
                    }

                    function d(t) {
                        H("onerror", t), p(), e.removeListener("error", d), 0 === P(e, "error") && e.emit("error", t)
                    }

                    function l() {
                        e.removeListener("finish", c), p()
                    }

                    function c() {
                        H("onfinish"), e.removeListener("close", l), p()
                    }

                    function p() {
                        H("unpipe"), u.unpipe(e)
                    }

                    var u = this, f = this._readableState;
                    switch (f.pipesCount) {
                        case 0:
                            f.pipes = e;
                            break;
                        case 1:
                            f.pipes = [f.pipes, e];
                            break;
                        default:
                            f.pipes.push(e);
                    }
                    f.pipesCount += 1, H("pipe count=%d opts=%j", f.pipesCount, t);
                    var g = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr, h = g ? a : p;
                    f.endEmitted ? I(h) : u.once("end", h), e.on("unpipe", n);
                    var _ = w(u);
                    e.on("drain", _);
                    var m = !1, b = !1;
                    return u.on("data", i), s(e, "error", d), e.once("close", l), e.once("finish", c), e.emit("pipe", u), f.flowing || (H("pipe resume"), u.resume()), e
                }, l.prototype.unpipe = function (e) {
                    var t = this._readableState, n = {hasUnpiped: !1};
                    if (0 === t.pipesCount) return this;
                    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
                    if (!e) {
                        var r = t.pipes, a = t.pipesCount;
                        t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                        for (var o = 0; o < a; o++) r[o].emit("unpipe", this, n);
                        return this
                    }
                    var s = F(t.pipes, e);
                    return -1 === s ? this : (t.pipes.splice(s, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this)
                }, l.prototype.on = function (e, t) {
                    var n = O.prototype.on.call(this, e, t);
                    if ("data" === e) !1 !== this._readableState.flowing && this.resume(); else if ("readable" === e) {
                        var r = this._readableState;
                        r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && m(this) : I(S, this))
                    }
                    return n
                }, l.prototype.addListener = l.prototype.on, l.prototype.resume = function () {
                    var e = this._readableState;
                    return e.flowing || (H("resume"), e.flowing = !0, v(this, e)), this
                }, l.prototype.pause = function () {
                    return H("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (H("pause"), this._readableState.flowing = !1, this.emit("pause")), this
                }, l.prototype.wrap = function (e) {
                    var t = this, r = this._readableState, a = !1;
                    for (var o in e.on("end", function () {
                        if (H("wrapped end"), r.decoder && !r.ended) {
                            var e = r.decoder.end();
                            e && e.length && t.push(e)
                        }
                        t.push(null)
                    }), e.on("data", function (n) {
                        if ((H("wrapped data"), r.decoder && (n = r.decoder.write(n)), !(r.objectMode && (null === n || void 0 === n))) && (r.objectMode || n && n.length)) {
                            var o = t.push(n);
                            o || (a = !0, e.pause())
                        }
                    }), e) void 0 === this[o] && "function" == typeof e[o] && (this[o] = function (t) {
                        return function () {
                            return e[t].apply(e, arguments)
                        }
                    }(o));
                    for (var i = 0; i < V.length; i++) e.on(V[i], this.emit.bind(this, V[i]));
                    return this._read = function (t) {
                        H("wrapped _read", t), a && (a = !1, e.resume())
                    }, this
                }, l._fromList = k
            }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
        }, {
            "./_stream_duplex": 17,
            "./internal/streams/BufferList": 22,
            "./internal/streams/destroy": 23,
            "./internal/streams/stream": 24,
            _process: 15,
            "core-util-is": 5,
            events: 4,
            inherits: 11,
            isarray: 13,
            "process-nextick-args": 14,
            "safe-buffer": 26,
            "string_decoder/": 27,
            util: 2
        }], 20: [function (e, t) {
            "use strict";

            function n(e, t) {
                var n = this._transformState;
                n.transforming = !1;
                var r = n.writecb;
                if (!r) return this.emit("error", new Error("write callback called multiple times"));
                n.writechunk = null, n.writecb = null, null != t && this.push(t), r(e);
                var a = this._readableState;
                a.reading = !1, (a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
            }

            function r(e) {
                return this instanceof r ? void (i.call(this, e), this._transformState = {
                    afterTransform: n.bind(this),
                    needTransform: !1,
                    transforming: !1,
                    writecb: null,
                    writechunk: null,
                    writeencoding: null
                }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", a)) : new r(e)
            }

            function a() {
                var e = this;
                "function" == typeof this._flush ? this._flush(function (t, n) {
                    o(e, t, n)
                }) : o(this, null, null)
            }

            function o(e, t, n) {
                if (t) return e.emit("error", t);
                if (null != n && e.push(n), e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
                if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
                return e.push(null)
            }

            t.exports = r;
            var i = e("./_stream_duplex"), s = e("core-util-is");
            s.inherits = e("inherits"), s.inherits(r, i), r.prototype.push = function (e, t) {
                return this._transformState.needTransform = !1, i.prototype.push.call(this, e, t)
            }, r.prototype._transform = function () {
                throw new Error("_transform() is not implemented")
            }, r.prototype._write = function (e, t, n) {
                var r = this._transformState;
                if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
                    var a = this._readableState;
                    (r.needTransform || a.needReadable || a.length < a.highWaterMark) && this._read(a.highWaterMark)
                }
            }, r.prototype._read = function () {
                var e = this._transformState;
                null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
            }, r.prototype._destroy = function (e, t) {
                var n = this;
                i.prototype._destroy.call(this, e, function (e) {
                    t(e), n.emit("close")
                })
            }
        }, {"./_stream_duplex": 17, "core-util-is": 5, inherits: 11}], 21: [function (e, n) {
            (function (r, a) {
                "use strict";

                function o(e) {
                    var t = this;
                    this.next = null, this.entry = null, this.finish = function () {
                        x(t, e)
                    }
                }

                function i(e) {
                    return B.from(e)
                }

                function s(e) {
                    return B.isBuffer(e) || e instanceof D
                }

                function d() {
                }

                function l(n, r) {
                    A = A || e("./_stream_duplex"), n = n || {};
                    var a = r instanceof A;
                    this.objectMode = !!n.objectMode, a && (this.objectMode = this.objectMode || !!n.writableObjectMode);
                    var i = n.highWaterMark, s = n.writableHighWaterMark, d = this.objectMode ? 16 : 16384;
                    this.highWaterMark = i || 0 === i ? i : a && (s || 0 === s) ? s : d, this.highWaterMark = t(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                    var l = !1 === n.decodeStrings;
                    this.decodeStrings = !l, this.defaultEncoding = n.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                        b(r, e)
                    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this)
                }

                function c(t) {
                    return A = A || e("./_stream_duplex"), P.call(c, this) || this instanceof A ? void (this._writableState = new l(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), I.call(this)) : new c(t)
                }

                function p(e, t) {
                    var n = new Error("write after end");
                    e.emit("error", n), T(t, n)
                }

                function u(e, t, n, r) {
                    var a = !0, o = !1;
                    return null === n ? o = new TypeError("May not write null values to stream") : "string" != typeof n && void 0 !== n && !t.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), T(r, o), a = !1), a
                }

                function f(e, t, n) {
                    return e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = B.from(t, n)), t
                }

                function g(e, t, n, r, a, o) {
                    if (!n) {
                        var i = f(t, r, a);
                        r !== i && (n = !0, a = "buffer", r = i)
                    }
                    var s = t.objectMode ? 1 : r.length;
                    t.length += s;
                    var d = t.length < t.highWaterMark;
                    if (d || (t.needDrain = !0), t.writing || t.corked) {
                        var l = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: r,
                            encoding: a,
                            isBuf: n,
                            callback: o,
                            next: null
                        }, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                    } else h(e, t, !1, s, r, a, o);
                    return d
                }

                function h(e, t, n, r, a, o, i) {
                    t.writelen = r, t.writecb = i, t.writing = !0, t.sync = !0, n ? e._writev(a, t.onwrite) : e._write(a, o, t.onwrite), t.sync = !1
                }

                function _(e, t, n, r, a) {
                    --t.pendingcb, n ? (T(a, r), T(E, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (a(r), e._writableState.errorEmitted = !0, e.emit("error", r), E(e, t))
                }

                function m(e) {
                    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                }

                function b(e, t) {
                    var n = e._writableState, r = n.sync, a = n.writecb;
                    if (m(n), t) _(e, n, r, t, a); else {
                        var o = S(n);
                        o || n.corked || n.bufferProcessing || !n.bufferedRequest || w(e, n), r ? L(y, e, n, o, a) : y(e, n, o, a)
                    }
                }

                function y(e, t, n, r) {
                    n || C(e, t), t.pendingcb--, r(), E(e, t)
                }

                function C(e, t) {
                    0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                }

                function w(e, t) {
                    t.bufferProcessing = !0;
                    var n = t.bufferedRequest;
                    if (e._writev && n && n.next) {
                        var r = t.bufferedRequestCount, a = Array(r), i = t.corkedRequestsFree;
                        i.entry = n;
                        for (var s = 0, d = !0; n;) a[s] = n, n.isBuf || (d = !1), n = n.next, s += 1;
                        a.allBuffers = d, h(e, t, !0, t.length, a, "", i.finish), t.pendingcb++, t.lastBufferedRequest = null, i.next ? (t.corkedRequestsFree = i.next, i.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0
                    } else {
                        for (; n;) {
                            var l = n.chunk, c = n.encoding, p = n.callback, u = t.objectMode ? 1 : l.length;
                            if (h(e, t, !1, u, l, c, p), n = n.next, t.bufferedRequestCount--, t.writing) break
                        }
                        null === n && (t.lastBufferedRequest = null)
                    }
                    t.bufferedRequest = n, t.bufferProcessing = !1
                }

                function S(e) {
                    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
                }

                function v(e, t) {
                    e._final(function (n) {
                        t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), E(e, t)
                    })
                }

                function R(e, t) {
                    t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, T(v, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
                }

                function E(e, t) {
                    var n = S(t);
                    return n && (R(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), n
                }

                function k(e, t, n) {
                    t.ending = !0, E(e, t), n && (t.finished ? T(n) : e.once("finish", n)), t.ended = !0, e.writable = !1
                }

                function x(e, t, n) {
                    var r = e.entry;
                    for (e.entry = null; r;) {
                        var a = r.callback;
                        t.pendingcb--, a(n), r = r.next
                    }
                    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                }

                var T = e("process-nextick-args").nextTick;
                n.exports = c;
                var A, L = !r.browser && -1 < ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) ? setImmediate : T;
                c.WritableState = l;
                var N = e("core-util-is");
                N.inherits = e("inherits");
                var F = {deprecate: e("util-deprecate")}, I = e("./internal/streams/stream"),
                    B = e("safe-buffer").Buffer, D = a.Uint8Array || function () {
                    }, M = e("./internal/streams/destroy");
                N.inherits(c, I), l.prototype.getBuffer = function () {
                    for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                    return t
                }, function () {
                    try {
                        Object.defineProperty(l.prototype, "buffer", {
                            get: F.deprecate(function () {
                                return this.getBuffer()
                            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                        })
                    } catch (e) {
                    }
                }();
                var P;
                "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (P = Function.prototype[Symbol.hasInstance], Object.defineProperty(c, Symbol.hasInstance, {
                    value: function (e) {
                        return !!P.call(this, e) || !(this !== c) && e && e._writableState instanceof l
                    }
                })) : P = function (e) {
                    return e instanceof this
                }, c.prototype.pipe = function () {
                    this.emit("error", new Error("Cannot pipe, not readable"))
                }, c.prototype.write = function (e, t, n) {
                    var r = this._writableState, a = !1, o = !r.objectMode && s(e);
                    return o && !B.isBuffer(e) && (e = i(e)), "function" == typeof t && (n = t, t = null), o ? t = "buffer" : !t && (t = r.defaultEncoding), "function" != typeof n && (n = d), r.ended ? p(this, n) : (o || u(this, r, e, n)) && (r.pendingcb++, a = g(this, r, o, e, t, n)), a
                }, c.prototype.cork = function () {
                    var e = this._writableState;
                    e.corked++
                }, c.prototype.uncork = function () {
                    var e = this._writableState;
                    e.corked && (e.corked--, !e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest && w(this, e))
                }, c.prototype.setDefaultEncoding = function (e) {
                    if ("string" == typeof e && (e = e.toLowerCase()), !(-1 < ["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()))) throw new TypeError("Unknown encoding: " + e);
                    return this._writableState.defaultEncoding = e, this
                }, c.prototype._write = function (e, t, n) {
                    n(new Error("_write() is not implemented"))
                }, c.prototype._writev = null, c.prototype.end = function (e, t, n) {
                    var r = this._writableState;
                    "function" == typeof e ? (n = e, e = null, t = null) : "function" == typeof t && (n = t, t = null), null !== e && e !== void 0 && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || k(this, r, n)
                }, Object.defineProperty(c.prototype, "destroyed", {
                    get: function () {
                        return void 0 !== this._writableState && this._writableState.destroyed
                    }, set: function (e) {
                        this._writableState && (this._writableState.destroyed = e)
                    }
                }), c.prototype.destroy = M.destroy, c.prototype._undestroy = M.undestroy, c.prototype._destroy = function (e, t) {
                    this.end(), t(e)
                }
            }).call(this, e("_process"), "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
        }, {
            "./_stream_duplex": 17,
            "./internal/streams/destroy": 23,
            "./internal/streams/stream": 24,
            _process: 15,
            "core-util-is": 5,
            inherits: 11,
            "process-nextick-args": 14,
            "safe-buffer": 26,
            "util-deprecate": 28
        }], 22: [function (e, t) {
            "use strict";

            function n(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function r(e, t, n) {
                e.copy(t, n)
            }

            var a = e("safe-buffer").Buffer, o = e("util");
            t.exports = function () {
                function e() {
                    n(this, e), this.head = null, this.tail = null, this.length = 0
                }

                return e.prototype.push = function (e) {
                    var t = {data: e, next: null};
                    0 < this.length ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
                }, e.prototype.unshift = function (e) {
                    var t = {data: e, next: this.head};
                    0 === this.length && (this.tail = t), this.head = t, ++this.length
                }, e.prototype.shift = function () {
                    if (0 !== this.length) {
                        var e = this.head.data;
                        return this.head = 1 === this.length ? this.tail = null : this.head.next, --this.length, e
                    }
                }, e.prototype.clear = function () {
                    this.head = this.tail = null, this.length = 0
                }, e.prototype.join = function (e) {
                    if (0 === this.length) return "";
                    for (var t = this.head, n = "" + t.data; t = t.next;) n += e + t.data;
                    return n
                }, e.prototype.concat = function (e) {
                    if (0 === this.length) return a.alloc(0);
                    if (1 === this.length) return this.head.data;
                    for (var t = a.allocUnsafe(e >>> 0), n = this.head, o = 0; n;) r(n.data, t, o), o += n.data.length, n = n.next;
                    return t
                }, e
            }(), o && o.inspect && o.inspect.custom && (t.exports.prototype[o.inspect.custom] = function () {
                var e = o.inspect({length: this.length});
                return this.constructor.name + " " + e
            })
        }, {"safe-buffer": 26, util: 2}], 23: [function (e, t) {
            "use strict";

            function n(e, t) {
                e.emit("error", t)
            }

            var r = e("process-nextick-args").nextTick;
            t.exports = {
                destroy: function (e, t) {
                    var a = this, o = this._readableState && this._readableState.destroyed,
                        i = this._writableState && this._writableState.destroyed;
                    return o || i ? (t ? t(e) : e && (!this._writableState || !this._writableState.errorEmitted) && r(n, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function (e) {
                        !t && e ? (r(n, a, e), a._writableState && (a._writableState.errorEmitted = !0)) : t && t(e)
                    }), this)
                }, undestroy: function () {
                    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                }
            }
        }, {"process-nextick-args": 14}], 24: [function (e, t) {
            t.exports = e("events").EventEmitter
        }, {events: 4}], 25: [function (e, t, n) {
            n = t.exports = e("./lib/_stream_readable.js"), n.Stream = n, n.Readable = n, n.Writable = e("./lib/_stream_writable.js"), n.Duplex = e("./lib/_stream_duplex.js"), n.Transform = e("./lib/_stream_transform.js"), n.PassThrough = e("./lib/_stream_passthrough.js")
        }, {
            "./lib/_stream_duplex.js": 17,
            "./lib/_stream_passthrough.js": 18,
            "./lib/_stream_readable.js": 19,
            "./lib/_stream_transform.js": 20,
            "./lib/_stream_writable.js": 21
        }], 26: [function (e, t, n) {
            function r(e, t) {
                for (var n in e) t[n] = e[n]
            }

            function a(e, t, n) {
                return i(e, t, n)
            }

            var o = e("buffer"), i = o.Buffer;
            i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = o : (r(o, n), n.Buffer = a), r(i, a), a.from = function (e, t, n) {
                if ("number" == typeof e) throw new TypeError("Argument must not be a number");
                return i(e, t, n)
            }, a.alloc = function (e, t, n) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                var r = i(e);
                return void 0 === t ? r.fill(0) : "string" == typeof n ? r.fill(t, n) : r.fill(t), r
            }, a.allocUnsafe = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return i(e)
            }, a.allocUnsafeSlow = function (e) {
                if ("number" != typeof e) throw new TypeError("Argument must be a number");
                return o.SlowBuffer(e)
            }
        }, {buffer: 3}], 27: [function (e, t, n) {
            "use strict";

            function r(e) {
                if (!e) return "utf8";
                for (var t; ;) switch (e) {
                    case"utf8":
                    case"utf-8":
                        return "utf8";
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return "utf16le";
                    case"latin1":
                    case"binary":
                        return "latin1";
                    case"base64":
                    case"ascii":
                    case"hex":
                        return e;
                    default:
                        if (t) return;
                        e = ("" + e).toLowerCase(), t = !0;
                }
            }

            function a(e) {
                var t = r(e);
                if ("string" != typeof t && (m.isEncoding === b || !b(e))) throw new Error("Unknown encoding: " + e);
                return t || e
            }

            function o(e) {
                this.encoding = a(e);
                var t;
                switch (this.encoding) {
                    case"utf16le":
                        this.text = p, this.end = u, t = 4;
                        break;
                    case"utf8":
                        this.fillLast = c, t = 4;
                        break;
                    case"base64":
                        this.text = f, this.end = g, t = 3;
                        break;
                    default:
                        return this.write = h, void (this.end = _);
                }
                this.lastNeed = 0, this.lastTotal = 0, this.lastChar = m.allocUnsafe(t)
            }

            function s(e) {
                if (127 >= e) return 0;
                return 6 == e >> 5 ? 2 : 14 == e >> 4 ? 3 : 30 == e >> 3 ? 4 : -1
            }

            function d(e, t, n) {
                var r = t.length - 1;
                if (r < n) return 0;
                var a = s(t[r]);
                return 0 <= a ? (0 < a && (e.lastNeed = a - 1), a) : --r < n ? 0 : (a = s(t[r]), 0 <= a) ? (0 < a && (e.lastNeed = a - 2), a) : --r < n ? 0 : (a = s(t[r]), 0 <= a ? (0 < a && (2 === a ? a = 0 : e.lastNeed = a - 3), a) : 0)
            }

            function l(e, t, n) {
                if (128 != (192 & t[0])) return e.lastNeed = 0, "\uFFFD".repeat(n);
                if (1 < e.lastNeed && 1 < t.length) {
                    if (128 != (192 & t[1])) return e.lastNeed = 1, "\uFFFD".repeat(n + 1);
                    if (2 < e.lastNeed && 2 < t.length && 128 != (192 & t[2])) return e.lastNeed = 2, "\uFFFD".repeat(n + 2)
                }
            }

            function c(e) {
                var t = this.lastTotal - this.lastNeed, n = l(this, e, t);
                return void 0 === n ? this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length) : n
            }

            function p(e, t) {
                if (0 == (e.length - t) % 2) {
                    var n = e.toString("utf16le", t);
                    if (n) {
                        var r = n.charCodeAt(n.length - 1);
                        if (55296 <= r && 56319 >= r) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1)
                    }
                    return n
                }
                return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
            }

            function u(e) {
                var t = e && e.length ? this.write(e) : "";
                if (this.lastNeed) {
                    var n = this.lastTotal - this.lastNeed;
                    return t + this.lastChar.toString("utf16le", 0, n)
                }
                return t
            }

            function f(e, t) {
                var r = (e.length - t) % 3;
                return 0 == r ? e.toString("base64", t) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 == r ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - r))
            }

            function g(e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
            }

            function h(e) {
                return e.toString(this.encoding)
            }

            function _(e) {
                return e && e.length ? this.write(e) : ""
            }

            var m = e("safe-buffer").Buffer, b = m.isEncoding || function (e) {
                switch (e = "" + e, e && e.toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"binary":
                    case"base64":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                    case"raw":
                        return !0;
                    default:
                        return !1;
                }
            };
            n.StringDecoder = o, o.prototype.write = function (e) {
                if (0 === e.length) return "";
                var t, n;
                if (this.lastNeed) {
                    if (t = this.fillLast(e), void 0 === t) return "";
                    n = this.lastNeed, this.lastNeed = 0
                } else n = 0;
                return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || ""
            }, o.prototype.end = function (e) {
                var t = e && e.length ? this.write(e) : "";
                return this.lastNeed ? t + "\uFFFD".repeat(this.lastTotal - this.lastNeed) : t
            }, o.prototype.text = function (e, t) {
                var n = d(this, e, t);
                if (!this.lastNeed) return e.toString("utf8", t);
                this.lastTotal = n;
                var r = e.length - (n - this.lastNeed);
                return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r)
            }, o.prototype.fillLast = function (e) {
                return this.lastNeed <= e.length ? (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : void (e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length)
            }
        }, {"safe-buffer": 26}], 28: [function (e, t) {
            (function (e) {
                function n(t) {
                    try {
                        if (!e.localStorage) return !1
                    } catch (e) {
                        return !1
                    }
                    var n = e.localStorage[t];
                    return null != n && "true" === (n + "").toLowerCase()
                }

                t.exports = function (e, t) {
                    function r() {
                        if (!a) {
                            if (n("throwDeprecation")) throw new Error(t); else n("traceDeprecation") ? console.trace(t) : console.warn(t);
                            a = !0
                        }
                        return e.apply(this, arguments)
                    }

                    if (n("noDeprecation")) return e;
                    var a = !1;
                    return r
                }
            }).call(this, "undefined" == typeof global ? "undefined" == typeof self ? "undefined" == typeof window ? {} : window : self : global)
        }, {}], "/": [function (e, t) {
            (function (n) {
                function r(e) {
                    var t = this;
                    if (!(t instanceof r)) return new r(e);
                    if (t._id = l(4).toString("hex").slice(0, 7), t._debug("new peer %o", e), e = Object.assign({allowHalfOpen: !1}, e), c.Duplex.call(t, e), t.channelName = e.initiator ? e.channelName || l(20).toString("hex") : null, t.initiator = e.initiator || !1, t.channelConfig = e.channelConfig || r.channelConfig, t.config = Object.assign({}, r.config, e.config), t.offerOptions = e.offerOptions || {}, t.answerOptions = e.answerOptions || {}, t.sdpTransform = e.sdpTransform || function (e) {
                        return e
                    }, t.streams = e.streams || (e.stream ? [e.stream] : []), t.trickle = void 0 === e.trickle || e.trickle, t.allowHalfTrickle = void 0 !== e.allowHalfTrickle && e.allowHalfTrickle, t.iceCompleteTimeout = e.iceCompleteTimeout || 5000, t.destroyed = !1, t.connected = !1, t.remoteAddress = void 0, t.remoteFamily = void 0, t.remotePort = void 0, t.localAddress = void 0, t.localFamily = void 0, t.localPort = void 0, t._wrtc = e.wrtc && "object" == typeof e.wrtc ? e.wrtc : s(), !t._wrtc) if ("undefined" == typeof window) throw o("No WebRTC support: Specify `opts.wrtc` option in this environment", "ERR_WEBRTC_SUPPORT"); else throw o("No WebRTC support: Not a supported browser", "ERR_WEBRTC_SUPPORT");
                    t._pcReady = !1, t._channelReady = !1, t._iceComplete = !1, t._iceCompleteTimer = null, t._channel = null, t._pendingCandidates = [], t._isNegotiating = !t.initiator, t._batchedNegotiation = !1, t._queuedNegotiation = !1, t._sendersAwaitingStable = [], t._senderMap = new Map, t._firstStable = !0, t._closingInterval = null, t._remoteTracks = [], t._remoteStreams = [], t._chunk = null, t._cb = null, t._interval = null;
                    try {
                        t._pc = new t._wrtc.RTCPeerConnection(t.config)
                    } catch (e) {
                        t.destroy(e)
                    }
                    t._isReactNativeWebrtc = "number" == typeof t._pc._peerConnectionId, t._pc.oniceconnectionstatechange = function () {
                        t._onIceStateChange()
                    }, t._pc.onicegatheringstatechange = function () {
                        t._onIceStateChange()
                    }, t._pc.onsignalingstatechange = function () {
                        t._onSignalingStateChange()
                    }, t._pc.onicecandidate = function (e) {
                        t._onIceCandidate(e)
                    }, t.initiator ? t._setupData({channel: t._pc.createDataChannel(t.channelName, t.channelConfig)}) : t._pc.ondatachannel = function (e) {
                        t._setupData(e)
                    }, t.streams && t.streams.forEach(function (e) {
                        t.addStream(e)
                    }), t._pc.ontrack = function (e) {
                        t._onTrack(e)
                    }, t.initiator && t._needsNegotiation(), t._onFinishBound = function () {
                        t._onFinish()
                    }, t.once("finish", t._onFinishBound)
                }

                function a(e) {
                    return e.replace(/a=ice-options:trickle\s\n/g, "")
                }

                function o(e, t) {
                    var n = new Error(e);
                    return n.code = t, n
                }

                t.exports = r;
                var i = e("debug")("simple-peer"), s = e("get-browser-rtc"), d = e("inherits"), l = e("randombytes"),
                    c = e("readable-stream"), p = 65536;
                d(r, c.Duplex), r.WEBRTC_SUPPORT = !!s(), r.config = {
                    iceServers: [{urls: "stun:stun.l.google.com:19302"}, {urls: "stun:global.stun.twilio.com:3478?transport=udp"}],
                    sdpSemantics: "unified-plan"
                }, r.channelConfig = {}, Object.defineProperty(r.prototype, "bufferSize", {
                    get: function () {
                        var e = this;
                        return e._channel && e._channel.bufferedAmount || 0
                    }
                }), r.prototype.address = function () {
                    var e = this;
                    return {port: e.localPort, family: e.localFamily, address: e.localAddress}
                }, r.prototype.signal = function (e) {
                    var t = this;
                    if (t.destroyed) throw o("cannot signal after peer is destroyed", "ERR_SIGNALING");
                    if ("string" == typeof e) try {
                        e = JSON.parse(e)
                    } catch (t) {
                        e = {}
                    }
                    t._debug("signal()"), e.renegotiate && t.initiator && (t._debug("got request to renegotiate"), t._needsNegotiation()), e.transceiverRequest && t.initiator && (t._debug("got request for transceiver"), t.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)), e.candidate && (t._pc.localDescription && t._pc.localDescription.type && t._pc.remoteDescription && t._pc.remoteDescription.type ? t._addIceCandidate(e.candidate) : t._pendingCandidates.push(e.candidate)), e.sdp && t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e)).then(function () {
                        t.destroyed || (t._pendingCandidates.forEach(function (e) {
                            t._addIceCandidate(e)
                        }), t._pendingCandidates = [], "offer" === t._pc.remoteDescription.type && t._createAnswer())
                    }).catch(function (e) {
                        t.destroy(o(e, "ERR_SET_REMOTE_DESCRIPTION"))
                    }), e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || t.destroy(o("signal() called with invalid signal data", "ERR_SIGNALING"))
                }, r.prototype._addIceCandidate = function (e) {
                    var t = this;
                    t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e)).catch(function (e) {
                        return "closed" !== t._pc.signalingState && "Failed to set ICE candidate; RTCPeerConnection is closed." === e.message ? t._debug("ignoring incorrect wrtc error") : void t.destroy(o(e, "ERR_ADD_ICE_CANDIDATE"))
                    })
                }, r.prototype.send = function (e) {
                    var t = this;
                    t._channel.send(e)
                }, r.prototype.addTransceiver = function (e, t) {
                    var n = this;
                    if (n._debug("addTransceiver()"), n.initiator) try {
                        n._pc.addTransceiver(e, t), n._needsNegotiation()
                    } catch (e) {
                        n.destroy(e)
                    } else n.emit("signal", {transceiverRequest: {kind: e, init: t}})
                }, r.prototype.addStream = function (e) {
                    var t = this;
                    t._debug("addStream()"), e.getTracks().forEach(function (n) {
                        t.addTrack(n, e)
                    })
                }, r.prototype.addTrack = function (e, t) {
                    var n = this;
                    n._debug("addTrack()");
                    var r = n._senderMap.get(e) || new Map, a = r.get(t);
                    a ? a.removed ? n.destroy(o("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED") : n.destroy(o("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED") : (a = n._pc.addTrack(e, t), r.set(t, a), n._senderMap.set(e, r), n._needsNegotiation())
                }, r.prototype.replaceTrack = function (e, t, n) {
                    var r = this;
                    r._debug("replaceTrack()");
                    var a = r._senderMap.get(e), i = a ? a.get(n) : null;
                    i || r.destroy(o("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED"), t && r._senderMap.set(t, a), null == i.replaceTrack ? r.destroy(o("replaceTrack is not supported in this browser", "ERR_UNSUPPORTED_REPLACETRACK")) : i.replaceTrack(t)
                }, r.prototype.removeTrack = function (e, t) {
                    var n = this;
                    n._debug("removeSender()");
                    var r = n._senderMap.get(e), a = r ? r.get(t) : null;
                    a || n.destroy(o("Cannot remove track that was never added.", "ERR_TRACK_NOT_ADDED"));
                    try {
                        a.removed = !0, n._pc.removeTrack(a)
                    } catch (e) {
                        "NS_ERROR_UNEXPECTED" === e.name ? n._sendersAwaitingStable.push(a) : n.destroy(e)
                    }
                    n._needsNegotiation()
                }, r.prototype.removeStream = function (e) {
                    var t = this;
                    t._debug("removeSenders()"), e.getTracks().forEach(function (n) {
                        t.removeTrack(n, e)
                    })
                }, r.prototype._needsNegotiation = function () {
                    var e = this;
                    e._debug("_needsNegotiation"), e._batchedNegotiation || (e._batchedNegotiation = !0, setTimeout(function () {
                        e._batchedNegotiation = !1, e._debug("starting batched negotiation"), e.negotiate()
                    }, 0))
                }, r.prototype.negotiate = function () {
                    var e = this;
                    e.initiator ? e._isNegotiating ? (e._queuedNegotiation = !0, e._debug("already negotiating, queueing")) : (e._debug("start negotiation"), setTimeout(() => {
                        e._createOffer()
                    }, 0)) : !e._isNegotiating && (e._debug("requesting negotiation from initiator"), e.emit("signal", {renegotiate: !0})), e._isNegotiating = !0
                }, r.prototype.destroy = function (e) {
                    var t = this;
                    t._destroy(e, function () {
                    })
                }, r.prototype._destroy = function (e, t) {
                    var n = this;
                    if (!n.destroyed) {
                        if (n._debug("destroy (error: %s)", e && (e.message || e)), n.readable = n.writable = !1, n._readableState.ended || n.push(null), n._writableState.finished || n.end(), n.destroyed = !0, n.connected = !1, n._pcReady = !1, n._channelReady = !1, n._remoteTracks = null, n._remoteStreams = null, n._senderMap = null, clearInterval(n._closingInterval), n._closingInterval = null, clearInterval(n._interval), n._interval = null, n._chunk = null, n._cb = null, n._onFinishBound && n.removeListener("finish", n._onFinishBound), n._onFinishBound = null, n._channel) {
                            try {
                                n._channel.close()
                            } catch (e) {
                            }
                            n._channel.onmessage = null, n._channel.onopen = null, n._channel.onclose = null, n._channel.onerror = null
                        }
                        if (n._pc) {
                            try {
                                n._pc.close()
                            } catch (e) {
                            }
                            n._pc.oniceconnectionstatechange = null, n._pc.onicegatheringstatechange = null, n._pc.onsignalingstatechange = null, n._pc.onicecandidate = null, n._pc.ontrack = null, n._pc.ondatachannel = null
                        }
                        n._pc = null, n._channel = null, e && n.emit("error", e), n.emit("close"), t()
                    }
                }, r.prototype._setupData = function (e) {
                    var t = this;
                    if (!e.channel) return t.destroy(o("Data channel event is missing `channel` property", "ERR_DATA_CHANNEL"));
                    t._channel = e.channel, t._channel.binaryType = "arraybuffer", "number" == typeof t._channel.bufferedAmountLowThreshold && (t._channel.bufferedAmountLowThreshold = p), t.channelName = t._channel.label, t._channel.onmessage = function (e) {
                        t._onChannelMessage(e)
                    }, t._channel.onbufferedamountlow = function () {
                        t._onChannelBufferedAmountLow()
                    }, t._channel.onopen = function () {
                        t._onChannelOpen()
                    }, t._channel.onclose = function () {
                        t._onChannelClose()
                    }, t._channel.onerror = function (e) {
                        t.destroy(o(e, "ERR_DATA_CHANNEL"))
                    };
                    var n = !1;
                    t._closingInterval = setInterval(function () {
                        t._channel && "closing" === t._channel.readyState ? (n && t._onChannelClose(), n = !0) : n = !1
                    }, 5000)
                }, r.prototype._read = function () {
                }, r.prototype._write = function (e, t, n) {
                    var r = this;
                    if (r.destroyed) return n(o("cannot write after peer is destroyed", "ERR_DATA_CHANNEL"));
                    if (r.connected) {
                        try {
                            r.send(e)
                        } catch (e) {
                            return r.destroy(o(e, "ERR_DATA_CHANNEL"))
                        }
                        r._channel.bufferedAmount > p ? (r._debug("start backpressure: bufferedAmount %d", r._channel.bufferedAmount), r._cb = n) : n(null)
                    } else r._debug("write before connect"), r._chunk = e, r._cb = n
                }, r.prototype._onFinish = function () {
                    function e() {
                        setTimeout(function () {
                            t.destroy()
                        }, 1e3)
                    }

                    var t = this;
                    t.destroyed || (t.connected ? e() : t.once("connect", e))
                }, r.prototype._startIceCompleteTimeout = function () {
                    var e = this;
                    e.destroyed || e._iceCompleteTimer || (e._debug("started iceComplete timeout"), e._iceCompleteTimer = setTimeout(function () {
                        e._iceComplete || (e._iceComplete = !0, e._debug("iceComplete timeout completed"), e.emit("iceTimeout"), e.emit("_iceComplete"))
                    }, e.iceCompleteTimeout))
                }, r.prototype._createOffer = function () {
                    var e = this;
                    e.destroyed || e._pc.createOffer(e.offerOptions).then(function (t) {
                        function n() {
                            if (!e.destroyed) {
                                var n = e._pc.localDescription || t;
                                e._debug("signal"), e.emit("signal", {type: n.type, sdp: n.sdp})
                            }
                        }

                        e.destroyed || (!e.trickle && !e.allowHalfTrickle && (t.sdp = a(t.sdp)), t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t).then(function () {
                            e._debug("createOffer success"), e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n))
                        }).catch(function (t) {
                            e.destroy(o(t, "ERR_SET_LOCAL_DESCRIPTION"))
                        }))
                    }).catch(function (t) {
                        e.destroy(o(t, "ERR_CREATE_OFFER"))
                    })
                }, r.prototype._requestMissingTransceivers = function () {
                    var e = this;
                    e._pc.getTransceivers && e._pc.getTransceivers().forEach(t => {
                        !t.mid && t.sender.track && e.addTransceiver(t.sender.track.kind)
                    })
                }, r.prototype._createAnswer = function () {
                    var e = this;
                    e.destroyed || e._pc.createAnswer(e.answerOptions).then(function (t) {
                        function n() {
                            if (!e.destroyed) {
                                var n = e._pc.localDescription || t;
                                e._debug("signal"), e.emit("signal", {
                                    type: n.type,
                                    sdp: n.sdp
                                }), e.initiator || e._requestMissingTransceivers()
                            }
                        }

                        e.destroyed || (!e.trickle && !e.allowHalfTrickle && (t.sdp = a(t.sdp)), t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t).then(function () {
                            e.destroyed || (e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n))
                        }).catch(function (t) {
                            e.destroy(o(t, "ERR_SET_LOCAL_DESCRIPTION"))
                        }))
                    }).catch(function (t) {
                        e.destroy(o(t, "ERR_CREATE_ANSWER"))
                    })
                }, r.prototype._onIceStateChange = function () {
                    var e = this;
                    if (!e.destroyed) {
                        var t = e._pc.iceConnectionState, n = e._pc.iceGatheringState;
                        e._debug("iceStateChange (connection: %s) (gathering: %s)", t, n), e.emit("iceStateChange", t, n), ("connected" === t || "completed" === t) && (e._pcReady = !0, e._maybeReady()), "failed" === t && e.destroy(o("Ice connection failed.", "ERR_ICE_CONNECTION_FAILURE")), "closed" === t && e.destroy(o("Ice connection closed.", "ERR_ICE_CONNECTION_CLOSED"))
                    }
                }, r.prototype.getStats = function (e) {
                    function t(e) {
                        return "[object Array]" === Object.prototype.toString.call(e.values) && e.values.forEach(function (t) {
                            Object.assign(e, t)
                        }), e
                    }

                    var n = this;
                    0 === n._pc.getStats.length ? n._pc.getStats().then(function (n) {
                        var r = [];
                        n.forEach(function (e) {
                            r.push(t(e))
                        }), e(null, r)
                    }, function (t) {
                        e(t)
                    }) : n._isReactNativeWebrtc ? n._pc.getStats(null, function (n) {
                        var r = [];
                        n.forEach(function (e) {
                            r.push(t(e))
                        }), e(null, r)
                    }, function (t) {
                        e(t)
                    }) : 0 < n._pc.getStats.length ? n._pc.getStats(function (r) {
                        if (!n.destroyed) {
                            var a = [];
                            r.result().forEach(function (e) {
                                var n = {};
                                e.names().forEach(function (t) {
                                    n[t] = e.stat(t)
                                }), n.id = e.id, n.type = e.type, n.timestamp = e.timestamp, a.push(t(n))
                            }), e(null, a)
                        }
                    }, function (t) {
                        e(t)
                    }) : e(null, [])
                }, r.prototype._maybeReady = function () {
                    function e() {
                        t.destroyed || t.getStats(function (n, r) {
                            function a(e) {
                                l = !0;
                                var n = s[e.localCandidateId];
                                n && (n.ip || n.address) ? (t.localAddress = n.ip || n.address, t.localPort = +n.port) : n && n.ipAddress ? (t.localAddress = n.ipAddress, t.localPort = +n.portNumber) : "string" == typeof e.googLocalAddress && (n = e.googLocalAddress.split(":"), t.localAddress = n[0], t.localPort = +n[1]), t.localAddress && (t.localFamily = t.localAddress.includes(":") ? "IPv6" : "IPv4");
                                var r = i[e.remoteCandidateId];
                                r && (r.ip || r.address) ? (t.remoteAddress = r.ip || r.address, t.remotePort = +r.port) : r && r.ipAddress ? (t.remoteAddress = r.ipAddress, t.remotePort = +r.portNumber) : "string" == typeof e.googRemoteAddress && (r = e.googRemoteAddress.split(":"), t.remoteAddress = r[0], t.remotePort = +r[1]), t.remoteAddress && (t.remoteFamily = t.remoteAddress.includes(":") ? "IPv6" : "IPv4"), t._debug("connect local: %s:%s remote: %s:%s", t.localAddress, t.localPort, t.remoteAddress, t.remotePort)
                            }

                            if (!t.destroyed) {
                                n && (r = []);
                                var i = {}, s = {}, d = {}, l = !1;
                                if (r.forEach(function (e) {
                                    ("remotecandidate" === e.type || "remote-candidate" === e.type) && (i[e.id] = e), ("localcandidate" === e.type || "local-candidate" === e.type) && (s[e.id] = e), ("candidatepair" === e.type || "candidate-pair" === e.type) && (d[e.id] = e)
                                }), r.forEach(function (e) {
                                    "transport" === e.type && e.selectedCandidatePairId && a(d[e.selectedCandidatePairId]), ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && a(e)
                                }), !l && (!Object.keys(d).length || Object.keys(s).length)) return void setTimeout(e, 100);
                                if (t._connecting = !1, t.connected = !0, t._chunk) {
                                    try {
                                        t.send(t._chunk)
                                    } catch (e) {
                                        return t.destroy(o(e, "ERR_DATA_CHANNEL"))
                                    }
                                    t._chunk = null, t._debug("sent chunk from \"write before connect\"");
                                    var c = t._cb;
                                    t._cb = null, c(null)
                                }
                                "number" != typeof t._channel.bufferedAmountLowThreshold && (t._interval = setInterval(function () {
                                    t._onInterval()
                                }, 150), t._interval.unref && t._interval.unref()), t._debug("connect"), t.emit("connect")
                            }
                        })
                    }

                    var t = this;
                    t._debug("maybeReady pc %s channel %s", t._pcReady, t._channelReady), t.connected || t._connecting || !t._pcReady || !t._channelReady || (t._connecting = !0, e())
                }, r.prototype._onInterval = function () {
                    var e = this;
                    e._cb && e._channel && !(e._channel.bufferedAmount > p) && e._onChannelBufferedAmountLow()
                }, r.prototype._onSignalingStateChange = function () {
                    var e = this;
                    e.destroyed || ("stable" === e._pc.signalingState && !e._firstStable && (e._isNegotiating = !1, e._debug("flushing sender queue", e._sendersAwaitingStable), e._sendersAwaitingStable.forEach(function (t) {
                        e._pc.removeTrack(t), e._queuedNegotiation = !0
                    }), e._sendersAwaitingStable = [], e._queuedNegotiation && (e._debug("flushing negotiation queue"), e._queuedNegotiation = !1, e._needsNegotiation()), e._debug("negotiate"), e.emit("negotiate")), e._firstStable = !1, e._debug("signalingStateChange %s", e._pc.signalingState), e.emit("signalingStateChange", e._pc.signalingState))
                }, r.prototype._onIceCandidate = function (e) {
                    var t = this;
                    t.destroyed || (e.candidate && t.trickle ? t.emit("signal", {
                        candidate: {
                            candidate: e.candidate.candidate,
                            sdpMLineIndex: e.candidate.sdpMLineIndex,
                            sdpMid: e.candidate.sdpMid
                        }
                    }) : !e.candidate && !t._iceComplete && (t._iceComplete = !0, t.emit("_iceComplete")), e.candidate && t._startIceCompleteTimeout())
                }, r.prototype._onChannelMessage = function (e) {
                    var t = this;
                    if (!t.destroyed) {
                        var r = e.data;
                        r instanceof ArrayBuffer && (r = n.from(r)), t.push(r)
                    }
                }, r.prototype._onChannelBufferedAmountLow = function () {
                    var e = this;
                    if (!e.destroyed && e._cb) {
                        e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);
                        var t = e._cb;
                        e._cb = null, t(null)
                    }
                }, r.prototype._onChannelOpen = function () {
                    var e = this;
                    e.connected || e.destroyed || (e._debug("on channel open"), e._channelReady = !0, e._maybeReady())
                }, r.prototype._onChannelClose = function () {
                    var e = this;
                    e.destroyed || (e._debug("on channel close"), e.destroy())
                }, r.prototype._onTrack = function (e) {
                    var t = this;
                    t.destroyed || e.streams.forEach(function (n) {
                        t._debug("on track"), t.emit("track", e.track, n), t._remoteTracks.push({
                            track: e.track,
                            stream: n
                        }), t._remoteStreams.some(function (e) {
                            return e.id === n.id
                        }) || (t._remoteStreams.push(n), setTimeout(function () {
                            t.emit("stream", n)
                        }, 0))
                    })
                }, r.prototype._debug = function () {
                    var e = this, t = [].slice.call(arguments);
                    t[0] = "[" + e._id + "] " + t[0], i.apply(null, t)
                }
            }).call(this, e("buffer").Buffer)
        }, {buffer: 3, debug: 7, "get-browser-rtc": 9, inherits: 11, randombytes: 16, "readable-stream": 25}]
    }, {}, [])("/")
});
