/*!
 * router v0.1.0 (https://github.com/progrape/router)
 * Copyright 2016
 * Licensed under the  MIT license
 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Router", [], t) : "object" == typeof exports ? exports.Router = t() : e.Router = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r])return n[r].exports;
            var o = n[r] = {exports: {}, id: r, loaded: !1};
            return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        "use strict";
        function r(e) {
            if (e && e.__esModule)return e;
            var t = {};
            if (null != e)for (var n in e)Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            return t["default"] = e, t
        }

        function o(e, t) {
            if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {value: !0});
        var i = Object.assign || function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n)Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            }, a = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(), u = n(1), s = r(u), l = function () {
            function e(t) {
                o(this, e), this._options = {
                    container: "#container",
                    enter: "enter",
                    enterTimeout: 0,
                    leave: "leave",
                    leaveTimeout: 0
                }, this._index = 1, this._$container = null, this._routes = [], this._default = null, this._options = i({}, this._options, t), this._$container = document.querySelector(this._options.container)
            }

            return a(e, [{
                key: "init", value: function () {
                    var e = this;
                    window.addEventListener("hashchange", function (t) {
                        var n = s.getHash(t.newURL), r = history.state || {};
                        e.go(n, r._index <= e._index)
                    }, !1), history.state && history.state._index && (this._index = history.state._index), this._index--;
                    var t = s.getHash(location.href), n = s.getRoute(this._routes, t);
                    return this.go(n ? t : this._default), this
                }
            }, {
                key: "push", value: function (e) {
                    var t = this._routes.filter(function (t) {
                        return t.url === e.url
                    })[0];
                    if (t)throw new Error("route " + e.url + " is existed");
                    return e = i({}, {
                        url: "*",
                        className: "",
                        render: s.noop,
                        bind: s.noop
                    }, e), this._routes.push(e), this
                }
            }, {
                key: "setDefault", value: function (e) {
                    return this._default = e, this
                }
            }, {
                key: "go", value: function (e) {
                    var t = this, n = arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1], r = s.getRoute(this._routes, e);
                    if (!r)throw new Error("url " + e + " was not found");
                    return !function () {
                        var o = function (e) {
                            e && !function () {
                                var e = t._$container.children[0];
                                n && e.classList.add(t._options.leave), t._options.leaveTimeout > 0 ? setTimeout(function () {
                                    e.parentNode.removeChild(e)
                                }, t._options.leaveTimeout) : e.parentNode.removeChild(e)
                            }()
                        }, i = function (o, i) {
                            var a = document.createElement("div");
                            r.className && a.classList.add(r.className), a.innerHTML = i, t._$container.appendChild(a), !n && t._options.enter && o && a.classList.add(t._options.enter), t._options.enterTimeout > 0 ? setTimeout(function () {
                                a.classList.remove(t._options.enter)
                            }, t._options.enterTimeout) : a.classList.remove(t._options.enter), location.hash = "#" + e;
                            try {
                                n ? t._index-- : t._index++, history.replaceState && history.replaceState({_index: t._index}, "", location.href)
                            } catch (u) {
                            }
                            "function" == typeof r.bind && r.bind.call(a)
                        }, a = s.hasChildren(t._$container);
                        o(a);
                        var u = function (e) {
                            var t = arguments.length <= 1 || void 0 === arguments[1] ? "" : arguments[1];
                            if (e)throw e;
                            i(a, t)
                        }, l = r.render(u);
                        l && "function" == typeof l.then ? l.then(function (e) {
                            u(null, e)
                        }, u) : 0 === r.render.length && u(null, l)
                    }(), this
                }
            }]), e
        }();
        t["default"] = l, e.exports = t["default"]
    }, function (e, t, n) {
        "use strict";
        function r(e) {
            return e && e.__esModule ? e : {"default": e}
        }

        function o(e) {
            return -1 !== e.indexOf("#") ? e.substring(e.indexOf("#") + 1) : "/"
        }

        function i(e, t) {
            for (var n = 0, r = e.length; r > n; n++) {
                var o = e[n], i = [], a = (0, l["default"])(o.url, i), u = a.exec(t);
                if (u) {
                    o.params = {};
                    for (var s = 0, c = i.length; c > s; s++) {
                        var f = i[s], p = f.name;
                        o.params[p] = u[s + 1]
                    }
                    return o
                }
            }
            return null
        }

        function a(e) {
            var t = e.children;
            return t.length > 0
        }

        function u() {
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.getHash = o, t.getRoute = i, t.hasChildren = a, t.noop = u;
        var s = n(2), l = r(s)
    }, function (e, t, n) {
        function r(e) {
            for (var t, n = [], r = 0, o = 0, i = ""; null != (t = x.exec(e));) {
                var a = t[0], u = t[1], l = t.index;
                if (i += e.slice(o, l), o = l + a.length, u)i += u[1]; else {
                    var c = e[o], f = t[2], p = t[3], h = t[4], d = t[5], v = t[6], g = t[7];
                    null != f && null != c && c !== f && (i += f, f = null), i && (n.push(i), i = "");
                    var y = "+" === v || "*" === v, _ = "?" === v || "*" === v, m = t[2] || "/", w = h || d || (g ? ".*" : "[^" + m + "]+?");
                    n.push({name: p || r++, prefix: f || "", delimiter: m, optional: _, repeat: y, pattern: s(w)})
                }
            }
            return o < e.length && (i += e.substr(o)), i && n.push(i), n
        }

        function o(e) {
            return a(r(e))
        }

        function i(e) {
            return encodeURI(e).replace(/[\/?#'"]/g, function (e) {
                return "%" + e.charCodeAt(0).toString(16).toUpperCase()
            })
        }

        function a(e) {
            for (var t = new Array(e.length), n = 0; n < e.length; n++)"object" == typeof e[n] && (t[n] = new RegExp("^" + e[n].pattern + "$"));
            return function (n, r) {
                for (var o = "", a = n || {}, u = r || {}, s = u.pretty ? i : encodeURIComponent, l = 0; l < e.length; l++) {
                    var c = e[l];
                    if ("string" != typeof c) {
                        var f, p = a[c.name];
                        if (null == p) {
                            if (c.optional)continue;
                            throw new TypeError('Expected "' + c.name + '" to be defined')
                        }
                        if (g(p)) {
                            if (!c.repeat)throw new TypeError('Expected "' + c.name + '" to not repeat, but received "' + p + '"');
                            if (0 === p.length) {
                                if (c.optional)continue;
                                throw new TypeError('Expected "' + c.name + '" to not be empty')
                            }
                            for (var h = 0; h < p.length; h++) {
                                if (f = s(p[h]), !t[l].test(f))throw new TypeError('Expected all "' + c.name + '" to match "' + c.pattern + '", but received "' + f + '"');
                                o += (0 === h ? c.prefix : c.delimiter) + f
                            }
                        } else {
                            if (f = s(p), !t[l].test(f))throw new TypeError('Expected "' + c.name + '" to match "' + c.pattern + '", but received "' + f + '"');
                            o += c.prefix + f
                        }
                    } else o += c
                }
                return o
            }
        }

        function u(e) {
            return e.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1")
        }

        function s(e) {
            return e.replace(/([=!:$\/()])/g, "\\$1")
        }

        function l(e, t) {
            return e.keys = t, e
        }

        function c(e) {
            return e.sensitive ? "" : "i"
        }

        function f(e, t) {
            var n = e.source.match(/\((?!\?)/g);
            if (n)for (var r = 0; r < n.length; r++)t.push({
                name: r,
                prefix: null,
                delimiter: null,
                optional: !1,
                repeat: !1,
                pattern: null
            });
            return l(e, t)
        }

        function p(e, t, n) {
            for (var r = [], o = 0; o < e.length; o++)r.push(v(e[o], t, n).source);
            var i = new RegExp("(?:" + r.join("|") + ")", c(n));
            return l(i, t)
        }

        function h(e, t, n) {
            for (var o = r(e), i = d(o, n), a = 0; a < o.length; a++)"string" != typeof o[a] && t.push(o[a]);
            return l(i, t)
        }

        function d(e, t) {
            t = t || {};
            for (var n = t.strict, r = t.end !== !1, o = "", i = e[e.length - 1], a = "string" == typeof i && /\/$/.test(i), s = 0; s < e.length; s++) {
                var l = e[s];
                if ("string" == typeof l)o += u(l); else {
                    var f = u(l.prefix), p = l.pattern;
                    l.repeat && (p += "(?:" + f + p + ")*"), p = l.optional ? f ? "(?:" + f + "(" + p + "))?" : "(" + p + ")?" : f + "(" + p + ")", o += p
                }
            }
            return n || (o = (a ? o.slice(0, -2) : o) + "(?:\\/(?=$))?"), o += r ? "$" : n && a ? "" : "(?=\\/|$)", new RegExp("^" + o, c(t))
        }

        function v(e, t, n) {
            return t = t || [], g(t) ? n || (n = {}) : (n = t, t = []), e instanceof RegExp ? f(e, t) : g(e) ? p(e, t, n) : h(e, t, n)
        }

        var g = n(3);
        e.exports = v, e.exports.parse = r, e.exports.compile = o, e.exports.tokensToFunction = a, e.exports.tokensToRegExp = d;
        var x = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
    }, function (e, t) {
        e.exports = Array.isArray || function (e) {
                return "[object Array]" == Object.prototype.toString.call(e)
            }
    }])
});