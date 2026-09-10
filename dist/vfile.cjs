/*! @itslil/unified vfile browser runtime | LilScript reimplementation of vfile@6.0.3 | MIT */

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

// vfile.esm.js
var vfile_esm_exports = {};
__export(vfile_esm_exports, {
  VFile: () => o,
  VFileMessage: () => m,
  createVFileMessage: () => H
});
module.exports = __toCommonJS(vfile_esm_exports);
var J = -1;
function w(a2) {
  return null != a2 && "object" == typeof a2 && "href" in a2 && a2.href && "protocol" in a2 && a2.protocol && a2.auth === void 0;
}
function x(a2, b2) {
  var c2 = a2.length, d2, e, g, f;
  if (0 == b2.length || b2.length > a2.length) {
    for (b2 = J, d2 = false; ; ) {
      if (c2 <= 0) {
        c2 = 0;
        break;
      }
      c2--;
      if ("/" == a2.charAt(c2)) {
        if (d2) {
          c2++;
          break;
        }
      } else b2 < 0 && (b2 = c2 + 1, d2 = true);
    }
    return b2 < 0 ? "" : a2.slice(c2, b2);
  }
  if (b2 == a2) return "";
  for (d2 = J, g = false, f = J, e = b2.length - 1; ; ) {
    if (c2 <= 0) {
      b2 = 0;
      break;
    }
    c2--;
    if ("/" == a2.charAt(c2)) {
      if (g) {
        b2 = c2 + 1;
        break;
      }
    } else f < 0 && (g = true, f = c2 + 1), e > J && (a2.charAt(c2) == b2.charAt(e) ? (e--, e < 0 && (d2 = c2)) : (d2 = f, e = J));
  }
  b2 == d2 ? d2 = f : d2 < 0 && (d2 = a2.length);
  return a2.slice(b2, d2);
}
function y(a2) {
  if ("string" != typeof a2) throw new TypeError("Path must be a string. Received " + JSON.stringify(a2));
}
function p(a2, b2) {
  y(a2), y(b2);
  var c2 = a2 + "";
  a2 = b2 + "", c2.length > 0 || (c2 = ""), a2.length > 0 ? c2.length > 0 && (a2 = c2 + "/" + a2) : a2 = c2;
  return 0 == a2.length ? "." : (function(a3) {
    var c3 = "/" == a3.charAt(0), b3 = (function(a4, b4) {
      for (var g, c4 = "", f = 0, e = J, h = 0, d2 = 0; d2 <= a4.length; ) {
        g = d2 < a4.length ? a4.charAt(d2) : "/";
        if ("/" == g) {
          if (!(e == d2 - 1 || 1 == h)) if (e != d2 - 1 && 2 == h) {
            if (c4.length < 2 || 2 != f || "." != c4.charAt(c4.length - 1) || "." != c4.charAt(c4.length - 2)) {
              if (c4.length > 2) {
                e = c4.lastIndexOf("/");
                if (e != c4.length - 1) {
                  e < 0 ? (c4 = "", f = 0) : (c4 = c4.slice(0, e), f = c4.length - 1 - c4.lastIndexOf("/") | 0), e = d2, h = 0, d2++;
                  continue;
                }
              } else if (c4.length > 0) {
                c4 = "", f = 0, e = d2, h = 0, d2++;
                continue;
              }
            }
            b4 && (c4 = c4.length > 0 ? c4 + "/.." : "..", f = 2);
          } else f = a4.slice(e + 1 | 0, d2), c4 = c4.length > 0 ? c4 + "/" + f : f, f = d2 - e - 1 | 0;
          e = d2, h = 0;
        } else "." == g && h > J ? h++ : h = J;
        d2++;
      }
      return c4;
    })(a3, !c3);
    0 == b3.length && !c3 && (b3 = "."), b3.length > 0 && "/" == a3.charAt(a3.length - 1) && (b3 = b3 + "/");
    return c3 ? "/" + b3 : b3;
  })(a2);
}
function s(a2, b2) {
  if (a2 && a2.includes("/")) throw new Error("`" + b2 + "` cannot be a path: did not expect `/`");
}
function t(a2, b2) {
  if (!a2) throw new Error("`" + b2 + "` cannot be empty");
}
function T(a2) {
  var b2 = a2.history;
  if (0 != b2.length) return b2[b2.length - 1];
}
function k(a2, b2) {
  if (w(b2)) {
    if ("file:" != b2.protocol + "") {
      a2 = new TypeError("The URL must be of scheme file"), a2.code = "ERR_INVALID_URL_SCHEME";
      throw a2;
    }
    if ((b2.hostname + "").length > 0) {
      a2 = new TypeError('File URL host must be "localhost" or empty on darwin'), a2.code = "ERR_INVALID_FILE_URL_HOST";
      throw a2;
    }
    var c2 = b2.pathname + "";
    for (b2 = 0; b2 < c2.length; b2++) if ("%" == c2[b2] && "2" == c2.charAt(b2 + 1) && ("F" == c2.charAt(b2 + 2) || "f" == c2.charAt(b2 + 2))) {
      a2 = new TypeError("File URL path must not include encoded / characters"), a2.code = "ERR_INVALID_FILE_URL_PATH";
      throw a2;
    }
    b2 = globalThis.decodeURIComponent(c2);
  }
  t(b2, "path"), T(a2) === b2 || a2.history.push(b2);
}
function u(a2) {
  if (!a2) return "1:1";
  var b2 = a2.line, c2 = a2.column;
  a2 = "number" == typeof b2 && b2 ? b2 + "" : "1", b2 = "number" == typeof c2 && c2 ? c2 + "" : "1";
  return a2 + ":" + b2;
}
function v(a2, b2, c2) {
  "string" == typeof b2 && (c2 = b2, b2 = void 0);
  var d2 = {};
  !b2 || ("line" in b2 && "column" in b2 ? d2.place = b2 : "start" in b2 && "end" in b2 ? d2.place = b2 : "type" in b2 ? (d2.ancestors = [b2], d2.place = b2.position) : d2 = Object.assign(d2, b2));
  if ("string" == typeof a2) var f = a2 + "", g = false, e;
  else !d2.cause && a2 ? (f = a2.message, d2.cause = a2, g = true) : (f = "", g = false);
  !d2.ruleId && !d2.source && "string" == typeof c2 && (a2 = c2 + "", b2 = a2.indexOf(":"), b2 < 0 ? d2.ruleId = a2 : (d2.source = a2.slice(0, b2), d2.ruleId = a2.slice(b2 + 1 | 0))), e = d2.ancestors, !d2.place && e && e.length > 0 && (a2 = e[e.length - 1], d2.place = a2.position), b2 = d2.place, c2 = b2 && "start" in b2 ? b2.start : b2, a2 = new Error(), Object.setPrototypeOf(a2, i), a2.ancestors = void 0, !e || (a2.ancestors = e), a2.cause = void 0, !d2.cause || (a2.cause = d2.cause), a2.column = void 0, !c2 || (a2.column = c2.column), a2.fatal = void 0, a2.file = "", a2.message = f, a2.line = void 0, !c2 || (a2.line = c2.line), a2.name = (function(a3) {
    return !a3 ? "1:1" : "start" in a3 || "end" in a3 ? u(a3.start) + "-" + u(a3.end) : u(a3);
  })(b2), a2.place = void 0, !b2 || (a2.place = b2), a2.reason = f, a2.ruleId = void 0, !d2.ruleId || (a2.ruleId = d2.ruleId), a2.source = void 0, !d2.source || (a2.source = d2.source), a2.actual = void 0, a2.expected = void 0, a2.note = void 0, a2.url = void 0, a2.stack = g && "string" == typeof d2.cause.stack ? d2.cause.stack : "";
  return a2;
}
function H(a2, b2) {
  return v(a2, b2, void 0);
}
function l(a2, b2) {
  Object.defineProperty(n, a2, b2);
  let c2 = b2.get, d2 = b2.set;
  Object.defineProperty(c2, "name", { configurable: true, value: "get " + a2 }), Object.defineProperty(d2, "name", { configurable: true, value: "set " + a2 });
}
function q(a2, b2) {
  Object.defineProperty(b2, "name", { configurable: true, value: a2 }), Object.defineProperty(n, a2, { configurable: true, writable: true, value: b2 });
}
JSON.parse("null"), Object.prototype.hasOwnProperty, Object.prototype.toString, Array.prototype.slice;
var r = "history path basename stem extname dirname".split(" ");
var i = {};
var m = (0, function(a2, b2, c2) {
  if (this === void 0) throw new TypeError("Class constructor VFileMessage cannot be invoked without 'new'");
  return v(a2, b2, c2);
});
i = m.prototype, Object.setPrototypeOf(m, Error), Object.setPrototypeOf(i, Error.prototype), Object.defineProperty(m, "name", { configurable: true, value: "VFileMessage" }), i.file = "", i.name = "", i.reason = "", i.message = "", i.stack = "", i.column = void 0, i.line = void 0, i.ancestors = void 0, i.cause = void 0, i.fatal = void 0, i.place = void 0, i.ruleId = void 0, i.source = void 0, Object.defineProperty(m, "prototype", { writable: false });
var n = void 0;
var o = (0, function(a2) {
  if (this === void 0) throw new TypeError("Class constructor VFile cannot be invoked without 'new'");
  !a2 ? a2 = {} : w(a2) ? a2 = { path: a2 } : ("string" == typeof a2 || (function(a3) {
    return !a3 ? false : "object" != typeof a3 ? false : "byteLength" in a3 && "byteOffset" in a3;
  })(a2)) && (a2 = { value: a2 });
  var b2 = (function() {
    var a3 = globalThis.process;
    return a3 && "function" == typeof a3.cwd ? a3.cwd() + "" : "/";
  })();
  "cwd" in a2 && (b2 = ""), this.cwd = b2, this.data = {}, this.history = [], this.messages = [];
  for (var c2, d2 = 0; d2 < r.length; d2++) b2 = r[d2] || "", b2 in a2 && null != a2[b2] && a2[b2] !== void 0 && (c2 = a2[b2], "history" == b2 && (c2 = c2.slice()), this[b2] = c2);
  for (b2 in a2) r.includes(b2) || (this[b2] = a2[b2]);
  return this;
});
n = o.prototype, Object.setPrototypeOf(n, Object.prototype), Object.defineProperty(o, "name", { configurable: true, value: "VFile" });
var a = (0, function(a2, b2, c2) {
  a2 = this.message(a2, b2, c2), a2.fatal = true;
  throw a2;
});
var b = (0, function(a2, b2, c2) {
  a2 = this.message(a2, b2, c2), a2.fatal = void 0;
  return a2;
});
var c = (0, function(a2, b2, c2) {
  a2 = v(a2, b2, c2), b2 = T(this), !b2 || (a2.name = b2 + ":" + a2.name, a2.file = b2), a2.fatal = false, this.messages.push(a2);
  return a2;
});
var d = (0, function(a2) {
  var b2 = this.value;
  if (b2 === void 0) return "";
  if ("string" == typeof b2) return b2;
  var c2;
  !a2 && (a2 = c2), c2 = new TextDecoder(a2);
  return c2.decode(b2);
});
l("basename", { configurable: true, get: function() {
  var a2 = T(this);
  if ("string" == typeof a2) return x(a2 + "", "");
}, set: function(a2) {
  t(a2, "basename"), s(a2, "basename");
  var b2 = this.dirname;
  !b2 && (b2 = ""), k(this, p(b2, a2));
} }), l("dirname", { configurable: true, get: function() {
  var a2 = T(this);
  if ("string" == typeof a2) return (function(a3) {
    if (0 == a3.length) return ".";
    for (var b2 = a3.length, c2 = false; ; ) {
      if (b2 <= 1) {
        b2 = J;
        break;
      }
      b2--;
      if ("/" == a3.charAt(b2)) {
        if (c2) break;
      } else c2 = c2 || true;
    }
    return b2 < 0 ? "/" == a3.charAt(0) ? "/" : "." : 1 == b2 && "/" == a3.charAt(0) ? "//" : a3.slice(0, b2);
  })(a2 + "");
}, set: function(a2) {
  var b2 = this.basename;
  if (!b2) throw new Error("Setting `dirname` requires `path` to be set too");
  !a2 && (a2 = ""), k(this, p(a2, b2));
} }), l("extname", { configurable: true, get: function() {
  var a2 = T(this);
  if ("string" == typeof a2) return (function(a3) {
    for (var g, c2 = a3.length, d2 = J, b2 = J, e = 0, f = false; ; ) {
      if (c2 <= 0) {
        f = 0;
        break;
      }
      c2--, g = a3.charAt(c2);
      if ("/" == g) {
        if (f) {
          f = c2 + 1;
          break;
        }
      } else d2 < 0 && (d2 = c2 + 1, f = true), "." == g ? b2 < 0 ? b2 = c2 : 1 != e && (e = 1) : b2 > J && (e = J);
    }
    return b2 < 0 || d2 < 0 || 0 == e || 1 == e && b2 == (d2 - 1 | 0) && b2 == (f + 1 | 0) ? "" : a3.slice(b2, d2);
  })(a2 + "");
}, set: function(a2) {
  s(a2, "extname");
  var b2 = this.dirname;
  if (!b2) throw new Error("Setting `extname` requires `path` to be set too");
  if (a2) {
    if (46 != (a2.codePointAt(0) | 0)) throw new Error("`extname` must start with `.`");
    if (a2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
  }
  a2 = a2 ? a2 + "" : "", k(this, p(b2, this.stem + "" + a2));
} }), l("path", { configurable: true, get: function() {
  return T(this);
}, set: function(a2) {
  k(this, a2);
} }), l("stem", { configurable: true, get: function() {
  var a2 = T(this);
  if ("string" == typeof a2) return a2 = a2 + "", x(a2, this.extname + "");
}, set: function(a2) {
  t(a2, "stem"), s(a2, "stem");
  var c2 = a2 + "";
  a2 = this.dirname, a2 = a2 ? a2 + "" : "";
  var b2 = this.extname;
  b2 = b2 ? b2 + "" : "", k(this, p(a2, c2 + b2));
} }), q("fail", a), q("info", b), q("message", c), q("toString", d), Object.defineProperty(o, "prototype", { writable: false });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VFile,
  VFileMessage,
  createVFileMessage
});
