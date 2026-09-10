/*! @itslil/unified 11.0.6 | LilScript reimplementation of unified | MIT */

var unified = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // unified.esm.js
  var unified_esm_exports = {};
  __export(unified_esm_exports, {
    unified: () => de
  });
  function te(e2) {
    return null == e2 ? false : "object" != typeof e2 && "function" != typeof e2 ? false : !!Error.prototype.isPrototypeOf(e2);
  }
  function re(e2) {
    return "string" == typeof e2 ? true : _(e2);
  }
  function _(e2) {
    return !e2 ? false : "object" != typeof e2 ? false : "byteLength" in e2 && "byteOffset" in e2;
  }
  function v(e2) {
    throw new Error(e2);
  }
  function n(e2) {
    throw new TypeError(e2);
  }
  function k(e2) {
    if (e2) throw e2;
  }
  function d(e2) {
    if ("object" != typeof e2 || null == e2) return false;
    var r2 = Object.getPrototypeOf(e2), t2 = null == r2 || r2 === Object.prototype || null == Object.getPrototypeOf(r2);
    return !t2 ? false : Symbol.toStringTag in e2 ? false : !(Symbol.iterator in e2);
  }
  function z(e2) {
    if (!e2) return false;
    if ("[object Object]" != M.call(e2) + "") return false;
    var t2 = !!o.call(e2, "constructor"), r2 = e2.constructor, i2 = r2 && r2.prototype && o.call(r2.prototype, "isPrototypeOf");
    if (r2 && !t2 && !i2) return false;
    i2 = "", t2 = false;
    for (r2 in e2) i2 = r2, t2 = true;
    return !t2 ? true : !!o.call(e2, i2);
  }
  function S(e2, r2, t2) {
    if ("__proto__" == r2) {
      Object.defineProperty(e2, "__proto__", { enumerable: true, configurable: true, writable: true, value: t2 });
      return;
    }
    e2[r2] = t2;
  }
  function T(e2, r2) {
    return "__proto__" == r2 ? !o.call(e2, r2) ? void 0 : Object.getOwnPropertyDescriptor(e2, r2).value : e2[r2];
  }
  function f(e2, r2) {
    (null == e2 || "object" != typeof e2 && "function" != typeof e2) && (e2 = {});
    if (null == r2) return e2;
    for (var n2 in r2) {
      var i2 = T(e2, n2), t2 = T(r2, n2);
      e2 === t2 || (t2 && (z(t2) || Array.isArray(t2)) ? (Array.isArray(t2) ? i2 && Array.isArray(i2) || (i2 = []) : i2 && z(i2) || (i2 = {}), S(e2, n2, f(i2, t2))) : "undefined" != typeof t2 && S(e2, n2, t2));
    }
    return e2;
  }
  function ne(e2, r2) {
    var n2 = false;
    let i2 = function() {
      if (!n2) n2 = true, r2.apply(void 0, arguments);
    }, a2 = function(e3) {
      i2(g, e3);
    };
    return function() {
      var o2 = t.call(arguments), s2 = +e2.length > o2.length;
      s2 && o2.push(i2);
      var r3;
      try {
        r3 = e2.apply(this, o2);
      } catch (e3) {
        if (s2 && n2) throw e3;
        i2(e3);
        return;
      }
      !s2 && (r3 && r3.then && "function" == typeof r3.then ? r3.then(a2, i2) : te(r3) ? i2(r3) : a2(r3));
    };
  }
  function R(e2) {
    return null != e2 && "object" == typeof e2 && "href" in e2 && e2.href && "protocol" in e2 && e2.protocol && e2.auth === void 0;
  }
  function ie() {
    var e2 = globalThis.process;
    return e2 && "function" == typeof e2.cwd ? e2.cwd() + "" : "/";
  }
  function L(e2, r2) {
    var i2, n2, o2, a2, t2 = e2.length;
    if (0 == r2.length || r2.length > e2.length) {
      for (r2 = -1, i2 = false; ; ) {
        if (t2 <= 0) {
          t2 = 0;
          break;
        }
        t2--;
        if ("/" == e2.charAt(t2)) {
          if (i2) {
            t2++;
            break;
          }
        } else r2 < 0 && (r2 = t2 + 1, i2 = true);
      }
      return r2 < 0 ? "" : e2.slice(t2, r2);
    }
    if (r2 == e2) return "";
    for (i2 = -1, o2 = false, a2 = -1, n2 = r2.length - 1; ; ) {
      if (t2 <= 0) {
        r2 = 0;
        break;
      }
      t2--;
      if ("/" == e2.charAt(t2)) {
        if (o2) {
          r2 = t2 + 1;
          break;
        }
      } else a2 < 0 && (o2 = true, a2 = t2 + 1), n2 > -1 && (e2.charAt(t2) == r2.charAt(n2) ? (n2--, n2 < 0 && (i2 = t2)) : (i2 = a2, n2 = -1));
    }
    r2 == i2 ? i2 = a2 : i2 < 0 && (i2 = e2.length);
    return e2.slice(r2, i2);
  }
  function oe(e2) {
    if (0 == e2.length) return ".";
    for (var r2 = e2.length, t2 = false; ; ) {
      if (r2 <= 1) {
        r2 = -1;
        break;
      }
      r2--;
      if ("/" == e2.charAt(r2)) {
        if (t2) break;
      } else t2 = t2 || true;
    }
    return r2 < 0 ? "/" == e2.charAt(0) ? "/" : "." : 1 == r2 && "/" == e2.charAt(0) ? "//" : e2.slice(0, r2);
  }
  function ae(e2) {
    for (var o2, t2 = e2.length, i2 = -1, r2 = -1, n2 = 0, a2 = false; ; ) {
      if (t2 <= 0) {
        a2 = 0;
        break;
      }
      t2--, o2 = e2.charAt(t2);
      if ("/" == o2) {
        if (a2) {
          a2 = t2 + 1;
          break;
        }
      } else i2 < 0 && (i2 = t2 + 1, a2 = true), "." == o2 ? r2 < 0 ? r2 = t2 : 1 != n2 && (n2 = 1) : r2 > -1 && (n2 = -1);
    }
    return r2 < 0 || i2 < 0 || 0 == n2 || 1 == n2 && r2 == (i2 - 1 | 0) && r2 == (a2 + 1 | 0) ? "" : e2.slice(r2, i2);
  }
  function se(e2, n2) {
    for (var s2, t2 = "", a2 = 0, r2 = -1, o2 = 0, i2 = 0; i2 <= e2.length; ) {
      s2 = i2 < e2.length ? e2.charAt(i2) : "/";
      if ("/" == s2) {
        if (!(r2 == i2 - 1 || 1 == o2)) if (r2 != i2 - 1 && 2 == o2) {
          if (t2.length < 2 || 2 != a2 || "." != t2.charAt(t2.length - 1) || "." != t2.charAt(t2.length - 2)) {
            if (t2.length > 2) {
              r2 = t2.lastIndexOf("/");
              if (r2 != t2.length - 1) {
                r2 < 0 ? (t2 = "", a2 = 0) : (t2 = t2.slice(0, r2), a2 = t2.length - 1 - t2.lastIndexOf("/") | 0), r2 = i2, o2 = 0, i2++;
                continue;
              }
            } else if (t2.length > 0) {
              t2 = "", a2 = 0, r2 = i2, o2 = 0, i2++;
              continue;
            }
          }
          n2 && (t2 = t2.length > 0 ? t2 + "/.." : "..", a2 = 2);
        } else a2 = e2.slice(r2 + 1 | 0, i2), t2 = t2.length > 0 ? t2 + "/" + a2 : a2, a2 = i2 - r2 - 1 | 0;
        r2 = i2, o2 = 0;
      } else "." == s2 && o2 > -1 ? o2++ : o2 = -1;
      i2++;
    }
    return t2;
  }
  function ue(e2) {
    var t2 = "/" == e2.charAt(0), r2 = se(e2, !t2);
    0 == r2.length && !t2 && (r2 = "."), r2.length > 0 && "/" == e2.charAt(e2.length - 1) && (r2 = r2 + "/");
    return t2 ? "/" + r2 : r2;
  }
  function C(e2) {
    if ("string" != typeof e2) {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(e2));
    }
  }
  function l(e2, r2) {
    C(e2), C(r2);
    var t2 = e2 + "";
    e2 = r2 + "", t2.length > 0 || (t2 = ""), e2.length > 0 ? t2.length > 0 && (e2 = t2 + "/" + e2) : e2 = t2;
    return 0 == e2.length ? "." : ue(e2);
  }
  function b(e2, r2) {
    if (e2 && e2.includes("/")) throw new Error("`" + r2 + "` cannot be a path: did not expect `/`");
  }
  function m(e2, r2) {
    if (!e2) throw new Error("`" + r2 + "` cannot be empty");
  }
  function i(e2) {
    var r2 = e2.history;
    if (0 != r2.length) return r2[r2.length - 1];
  }
  function s(e2, r2) {
    if (R(r2)) {
      if ("file:" != r2.protocol + "") {
        e2 = new TypeError("The URL must be of scheme file"), e2.code = "ERR_INVALID_URL_SCHEME";
        throw e2;
      }
      if ((r2.hostname + "").length > 0) {
        e2 = new TypeError('File URL host must be "localhost" or empty on darwin'), e2.code = "ERR_INVALID_FILE_URL_HOST";
        throw e2;
      }
      var t2 = r2.pathname + "";
      for (r2 = 0; r2 < t2.length; r2++) if ("%" == t2.charAt(r2) && "2" == t2.charAt(r2 + 1) && ("F" == t2.charAt(r2 + 2) || "f" == t2.charAt(r2 + 2))) {
        e2 = new TypeError("File URL path must not include encoded / characters"), e2.code = "ERR_INVALID_FILE_URL_PATH";
        throw e2;
      }
      r2 = globalThis.decodeURIComponent(t2);
    }
    m(r2, "path"), i(e2) === r2 || e2.history.push(r2);
  }
  function w(e2) {
    if (!e2) return "1:1";
    var r2 = e2.line, t2 = e2.column;
    e2 = "number" == typeof r2 && r2 ? r2 + "" : "1", r2 = "number" == typeof t2 && t2 ? t2 + "" : "1";
    return e2 + ":" + r2;
  }
  function ce(e2) {
    return !e2 ? "1:1" : "start" in e2 || "end" in e2 ? w(e2.start) + "-" + w(e2.end) : w(e2);
  }
  function F(e2, r2, t2) {
    "string" == typeof r2 && (t2 = r2, r2 = void 0);
    var i2 = {};
    r2 && ("line" in r2 && "column" in r2 ? i2.place = r2 : "start" in r2 && "end" in r2 ? i2.place = r2 : "type" in r2 ? (i2.ancestors = [r2], i2.place = r2.position) : i2 = Object.assign(i2, r2));
    if ("string" == typeof e2) var n2, a2 = e2 + "", o2 = false;
    else !i2.cause && e2 ? (a2 = e2.message, i2.cause = e2, o2 = true) : (a2 = "", o2 = false);
    !i2.ruleId && !i2.source && "string" == typeof t2 && (e2 = t2 + "", r2 = e2.indexOf(":"), r2 < 0 ? i2.ruleId = e2 : (i2.source = e2.slice(0, r2), i2.ruleId = e2.slice(r2 + 1 | 0))), n2 = i2.ancestors, !i2.place && n2 && n2.length > 0 && (e2 = n2[n2.length - 1], i2.place = e2.position), r2 = i2.place, t2 = r2 && "start" in r2 ? r2.start : r2, e2 = new Error(), e2.ancestors = void 0, !n2 || (e2.ancestors = n2), e2.cause = void 0, !i2.cause || (e2.cause = i2.cause), e2.column = void 0, !t2 || (e2.column = t2.column), e2.fatal = void 0, e2.file = "", e2.message = a2, e2.line = void 0, !t2 || (e2.line = t2.line), e2.name = ce(r2), e2.place = void 0, !r2 || (e2.place = r2), e2.reason = a2, e2.ruleId = void 0, !i2.ruleId || (e2.ruleId = i2.ruleId), e2.source = void 0, !i2.source || (e2.source = i2.source), e2.actual = void 0, e2.expected = void 0, e2.note = void 0, e2.url = void 0, e2.stack = o2 && "string" == typeof i2.cause.stack ? i2.cause.stack : "";
    return e2;
  }
  function u(e2, r2) {
    Object.defineProperty(c, e2, r2);
    let t2 = r2.get, i2 = r2.set;
    Object.defineProperty(t2, "name", { configurable: true, value: "get " + e2 }), Object.defineProperty(i2, "name", { configurable: true, value: "set " + e2 });
  }
  function h(e2, r2) {
    Object.defineProperty(r2, "name", { configurable: true, value: e2 }), Object.defineProperty(c, e2, { configurable: true, writable: true, value: r2 });
  }
  function fe(e2) {
    return !e2 || "object" != typeof e2 ? false : "message" in e2 && "messages" in e2;
  }
  function p(e2) {
    return fe(e2) ? e2 : new a(e2);
  }
  function O(e2, r2) {
    "function" == typeof r2 || n("Cannot `" + e2 + "` without `parser`");
  }
  function j(e2, r2) {
    "function" == typeof r2 || n("Cannot `" + e2 + "` without `compiler`");
  }
  function A(e2, r2) {
    !r2 || v("Cannot call `" + e2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
  }
  function V(e2) {
    (!d(e2) || "string" != typeof e2.type) && n("Expected node, got `" + e2 + "`");
  }
  function N(e2, r2, t2) {
    t2 || v("`" + e2 + "` finished async. Use `" + r2 + "` instead");
  }
  function P(e2) {
    return e2.parser || e2.Parser;
  }
  function E(e2) {
    return e2.compiler || e2.Compiler;
  }
  function I(e2, r2, i2) {
    for (var o2, s2, n2 = e2.length, a2 = -1; ; ) {
      if (false) {
        a2 = -1;
        break;
      }
      a2++;
      if (a2 >= n2) {
        a2 = -1;
        break;
      }
      if (e2[a2][0] === r2) break;
    }
    if (a2 == -1) {
      i2 = t.call(i2, 0), i2.unshift(r2), e2.push(i2);
      return;
    }
    if (i2.length > 0) {
      n2 = i2[0], s2 = t.call(i2, 1), o2 = e2[a2][1], d(o2) && d(n2) && (n2 = f(o2, n2)), i2 = [], i2.push(r2), i2.push(n2);
      for (n2 = s2.length, r2 = 0; r2 < n2; r2++) i2.push(s2[r2]);
      Array.prototype.splice.call(e2, a2, 1, i2);
    }
  }
  function U(e2, r2, t2) {
    if (null != t2) {
      Array.isArray(t2) || n("Expected a list of plugins, not `" + t2 + "`");
      for (var a2 = t2.length, i2 = -1; ++i2 < a2; ) le(e2, r2, t2[i2]);
    }
  }
  function D(e2, r2, t2) {
    !("plugins" in t2) && !("settings" in t2) && v("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"), U(e2, r2, t2.plugins), e2 = t2.settings, !e2 || (r2.settings = f(r2.settings, e2));
  }
  function le(e2, r2, i2) {
    if ("function" == typeof i2) {
      I(e2, i2, []);
      return;
    }
    if ("object" == typeof i2) {
      if (Array.isArray(i2)) {
        r2 = i2[0], I(e2, r2, t.call(i2, 1));
        return;
      }
      D(e2, r2, i2);
      return;
    }
    n("Expected usable value, not `" + i2 + "`");
  }
  function H(e2) {
    for (var t2 = new r(), n2 = e2.attachers, a2 = n2.length, i2 = -1; ++i2 < a2; ) t2.use.apply(t2, n2[i2]);
    i2 = t2.data, t2.data(f({}, e2.namespace));
    return t2;
  }
  function he() {
    function e2(e3, r2, t2) {
      Object.defineProperty(r2, "name", { configurable: true, value: e3 }), Object.defineProperty(r2, "length", { configurable: true, value: t2 }), Object.defineProperty(x, e3, { configurable: true, writable: true, value: r2 });
    }
    e2("copy", B, 0), e2("data", $, 2), e2("freeze", ee, 0), e2("parse", G, 1), e2("process", X, 2), e2("processSync", Z, 1), e2("run", K, 3), e2("runSync", Q, 2), e2("stringify", W, 2), e2("use", Y, 1), Object.defineProperty(r, "prototype", { writable: false });
  }
  function pe() {
    var e2 = (0, function() {
      return H(e2);
    });
    Object.setPrototypeOf(e2, x), e2.Compiler = void 0, e2.Parser = void 0, e2.attachers = [], e2.compiler = void 0, e2.freezeIndex = -1, e2.frozen = void 0, e2.namespace = {}, e2.parser = void 0;
    var r2 = {};
    r2.fns = [], r2.run = q, r2.use = J, e2.transformers = r2;
    return e2;
  }
  var g = JSON.parse("null");
  var o = Object.prototype.hasOwnProperty;
  var M = Object.prototype.toString;
  var t = Array.prototype.slice;
  var q = (0, function() {
    var e2 = t.call(arguments), r2 = e2.pop();
    "function" == typeof r2 || n("Expected function as last argument, not " + r2);
    var i2, a2 = -1, o2 = this.fns;
    i2 = function() {
      a2++;
      var c2;
      a2 < o2.length && (c2 = o2[a2]);
      var b2, s3 = [];
      arguments.length > 0 && (b2 = arguments[0], s3 = t.call(arguments, 1));
      if (b2) {
        r2(b2);
        return;
      }
      for (var O2 = e2.length, n2 = -1; ++n2 < O2; ) b2 = void 0, n2 < s3.length && (b2 = s3[n2]), null == b2 && (s3[n2] = e2[n2]);
      e2 = s3, "function" == typeof c2 ? ne(c2, i2).apply(void 0, s3) : (n2 = t.call(s3), n2.unshift(g), r2.apply(void 0, n2));
    };
    var s2 = t.call(e2);
    s2.unshift(g), i2.apply(void 0, s2);
  });
  var J = (0, function(e2) {
    return "function" == typeof e2 || n("Expected `middelware` to be a function, not " + e2), this.fns.push(e2), this;
  });
  var y = "history path basename stem extname dirname".split(" ");
  var e = {};
  var be = (0, function(e2, r2, t2) {
    if (this === void 0) throw new TypeError("Class constructor VFileMessage cannot be invoked without 'new'");
    return F(e2, r2, t2);
  });
  e = be.prototype, Object.setPrototypeOf(be, Error), Object.setPrototypeOf(e, Error.prototype), Object.defineProperty(be, "name", { configurable: true, value: "VFileMessage" }), e.file = "", e.name = "", e.reason = "", e.message = "", e.stack = "", e.column = void 0, e.line = void 0, e.ancestors = void 0, e.cause = void 0, e.fatal = void 0, e.place = void 0, e.ruleId = void 0, e.source = void 0, Object.defineProperty(be, "prototype", { writable: false });
  var a = class VFile extends Object {
    constructor(e2) {
      super(), !e2 ? e2 = {} : R(e2) ? e2 = { path: e2 } : ("string" == typeof e2 || _(e2)) && (e2 = { value: e2 });
      var r2 = ie();
      "cwd" in e2 && (r2 = ""), this.cwd = r2, this.data = {}, this.history = [], this.messages = [];
      for (var t2, i2 = 0; i2 < y.length; i2++) r2 = y[i2] || "", r2 in e2 && null != e2[r2] && e2[r2] !== void 0 && (t2 = e2[r2], "history" == r2 && (t2 = t2.slice()), this[r2] = t2);
      for (r2 in e2) y.includes(r2) || (this[r2] = e2[r2]);
    }
  };
  var c = a.prototype;
  Object.defineProperty(a, "name", { configurable: true, value: "VFile" });
  var de = (0, function(e2, r2, t2) {
    e2 = this.message(e2, r2, t2), e2.fatal = true;
    throw e2;
  });
  var me = (0, function(e2, r2, t2) {
    e2 = this.message(e2, r2, t2), e2.fatal = void 0;
    return e2;
  });
  var we = (0, function(e2, r2, t2) {
    e2 = F(e2, r2, t2), r2 = i(this), !r2 || (e2.name = r2 + ":" + e2.name, e2.file = r2), e2.fatal = false, this.messages.push(e2);
    return e2;
  });
  var Oe = (0, function(e2) {
    var r2 = this.value;
    if (r2 === void 0) return "";
    if ("string" == typeof r2) return r2;
    var t2;
    !e2 && (e2 = t2), t2 = new TextDecoder(e2);
    return t2.decode(r2);
  });
  u("basename", { configurable: true, get: function() {
    var e2 = i(this);
    if ("string" == typeof e2) return L(e2 + "", "");
  }, set: function(e2) {
    m(e2, "basename"), b(e2, "basename");
    var r2 = this.dirname;
    !r2 && (r2 = ""), s(this, l(r2, e2));
  } }), u("dirname", { configurable: true, get: function() {
    var e2 = i(this);
    if ("string" == typeof e2) return oe(e2 + "");
  }, set: function(e2) {
    var r2 = this.basename;
    if (!r2) throw new Error("Setting `dirname` requires `path` to be set too");
    !e2 && (e2 = ""), s(this, l(e2, r2));
  } }), u("extname", { configurable: true, get: function() {
    var e2 = i(this);
    if ("string" == typeof e2) return ae(e2 + "");
  }, set: function(e2) {
    b(e2, "extname");
    var r2 = this.dirname;
    if (!r2) throw new Error("Setting `extname` requires `path` to be set too");
    if (e2) {
      if (46 != (+e2.codePointAt(0) | 0)) throw new Error("`extname` must start with `.`");
      if (e2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    e2 = e2 ? e2 + "" : "", s(this, l(r2, this.stem + "" + e2));
  } }), u("path", { configurable: true, get: function() {
    return i(this);
  }, set: function(e2) {
    s(this, e2);
  } }), u("stem", { configurable: true, get: function() {
    var e2 = i(this);
    if ("string" == typeof e2) return e2 += "", L(e2, this.extname + "");
  }, set: function(e2) {
    m(e2, "stem"), b(e2, "stem");
    var t2 = e2 + "";
    e2 = this.dirname, e2 = e2 ? e2 + "" : "";
    var r2 = this.extname;
    r2 = r2 ? r2 + "" : "", s(this, l(e2, t2 + r2));
  } }), h("fail", de), h("info", me), h("message", we), h("toString", Oe), Object.defineProperty(a, "prototype", { writable: false });
  var r;
  var Y = (0, function() {
    A("use", this.frozen);
    var e2, r2 = this.attachers, i2 = this.namespace;
    arguments.length > 0 && (e2 = arguments[0]);
    if (null == e2) return this;
    if ("function" == typeof e2) return I(r2, e2, t.call(arguments, 1)), this;
    if ("object" == typeof e2) return Array.isArray(e2) ? U(r2, i2, e2) : D(r2, i2, e2), this;
    throw new TypeError("Expected usable value, not `" + e2 + "`");
  });
  var B = (0, function() {
    return H(this);
  });
  var G = (0, function(e2) {
    this.freeze(), e2 = p(e2);
    let r2 = P(this);
    O("parse", r2);
    return r2(String(e2), e2);
  });
  var K = (0, function(e2, r2, t2) {
    V(e2);
    var a2 = this.freeze;
    this.freeze(), !t2 && "function" == typeof r2 && (t2 = r2, r2 = void 0);
    var n2 = this.transformers, i2 = function(i3, a3) {
      let o2 = p(r2);
      n2.run(e2, o2, function(r3, n3, o3) {
        var s2 = !n3 ? e2 : n3;
        if (r3) {
          a3(r3);
          return;
        }
        if (i3) {
          i3(s2);
          return;
        }
        t2(void 0, s2, o3);
      });
    };
    if (t2) {
      i2(void 0, t2);
      return;
    }
    return new Promise(i2);
  });
  var Q = (0, function(e2, r2) {
    var t2, i2 = false;
    this.run(e2, r2, function(e3, r3, n2) {
      k(e3), t2 = r3, i2 = true;
    }), N("runSync", "run", i2);
    return t2;
  });
  var W = (0, function(e2, r2) {
    this.freeze();
    let t2 = p(r2);
    r2 = E(this), j("stringify", r2), V(e2);
    return r2(e2, t2);
  });
  var X = (0, function(e2, r2) {
    var t2 = this;
    t2.freeze(), O("process", P(t2)), j("process", E(t2));
    var i2 = function(i3, n2) {
      let a2 = p(e2), o2 = t2.parse(a2);
      t2.run(o2, a2, function(e3, a3, o3) {
        if (e3 || !a3 || !o3) {
          n2(e3);
          return;
        }
        var s2 = t2.stringify(a3, o3);
        re(s2) ? o3.value = s2 : o3.result = s2;
        if (i3) {
          i3(o3);
          return;
        }
        r2(void 0, o3);
      });
    };
    if (r2) {
      i2(void 0, r2);
      return;
    }
    return new Promise(i2);
  });
  var Z = (0, function(e2) {
    this.freeze(), O("processSync", P(this)), j("processSync", E(this));
    var r2, t2 = false;
    this.process(e2, function(e3, i2) {
      t2 = true, k(e3), r2 = i2;
    }), N("processSync", "process", t2);
    return r2;
  });
  var $ = (0, function(e2, r2) {
    var i2 = this.namespace, n2 = arguments.length, t2;
    n2 > 0 && (t2 = e2);
    if ("string" == typeof t2) {
      if (2 == n2) return A("data", this.frozen), i2[t2] = r2, this;
      var a2;
      return o.call(i2, t2) && (a2 = i2[t2]) ? a2 : void 0;
    }
    return t2 ? (A("data", this.frozen), this.namespace = t2, this) : i2;
  });
  var ee = (0, function() {
    if (this.frozen) return this;
    for (var r2 = this.attachers, n2 = this.transformers; true; ) {
      var e2 = +this.freezeIndex + 1;
      this.freezeIndex = e2;
      if (e2 >= r2.length) break;
      var i2 = r2[e2], a2 = i2[0];
      e2 = t.call(i2, 1);
      if (!(e2.length > 0 && false === e2[0])) e2.length > 0 && true === e2[0] && Array.prototype.splice.call(e2, 0, 1, void 0), e2 = a2.apply(this, e2), "function" == typeof e2 && n2.use(e2);
    }
    this.frozen = true, this.freezeIndex = Number.POSITIVE_INFINITY;
    return this;
  });
  r = (0, function() {
    if (this === void 0) throw new TypeError("Class constructor Processor cannot be invoked without 'new'");
    return pe();
  }), Object.defineProperty(r, "name", { configurable: true, value: "Processor" });
  var x = r.prototype;
  he(), de = new r(), de.freeze();
  return __toCommonJS(unified_esm_exports);
})();
globalThis.unified=unified.unified||unified;
