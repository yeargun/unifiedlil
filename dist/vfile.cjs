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
  VFile: () => R,
  VFileMessage: () => x,
  createVFileMessage: () => W
});
module.exports = __toCommonJS(vfile_esm_exports);
var Y = -1;
function H(t2) {
  return !!t2 && "object" == typeof t2 && "byteLength" in t2 && "byteOffset" in t2;
}
function N(t2) {
  return t2 != null && "object" == typeof t2 && "href" in t2 && t2.href && "protocol" in t2 && t2.protocol && t2.auth === void 0;
}
function q() {
  var t2 = globalThis.process;
  return t2 && "function" == typeof t2.cwd ? t2.cwd() + "" : "/";
}
function C(t2, e2) {
  var n2, o, E2, i, r2 = t2.length;
  if (0 == e2.length || e2.length > t2.length) {
    for (e2 = Y, n2 = false; ; ) {
      if (r2 <= 0) {
        r2 = 0;
        break;
      }
      --r2;
      if ("/" == t2.charAt(r2)) {
        if (n2) {
          r2++;
          break;
        }
      } else e2 < 0 && (e2 = r2 + 1, n2 = true);
    }
    return e2 < 0 ? "" : t2.slice(r2, e2);
  }
  if (e2 == t2) return "";
  for (n2 = Y, E2 = false, i = Y, o = e2.length - 1; ; ) {
    if (r2 <= 0) {
      e2 = 0;
      break;
    }
    --r2;
    if ("/" == t2.charAt(r2)) {
      if (E2) {
        e2 = r2 + 1;
        break;
      }
    } else i < 0 && (E2 = true, i = r2 + 1), o > Y && (t2.charAt(r2) == e2.charAt(o) ? (o = o - 1 | 0) < 0 && (n2 = r2) : (n2 = i, o = Y));
  }
  e2 == n2 ? n2 = i : n2 < 0 && (n2 = t2.length);
  return t2.slice(e2, n2);
}
function J(t2) {
  if (0 == t2.length) return ".";
  for (var e2 = t2.length, r2 = false; ; ) {
    if (e2 <= 1) {
      e2 = Y;
      break;
    }
    --e2;
    if ("/" == t2.charAt(e2)) {
      if (r2) break;
    } else r2 = r2 || true;
  }
  return e2 < 0 ? "/" == t2.charAt(0) ? "/" : "." : 1 == e2 && "/" == t2.charAt(0) ? "//" : t2.slice(0, e2);
}
function z(t2) {
  for (var E2, r2 = t2.length, n2 = Y, e2 = Y, o = 0, i = false; ; ) {
    if (r2 <= 0) {
      i = 0;
      break;
    }
    --r2;
    E2 = t2.charAt(r2);
    if ("/" == E2) {
      if (i) {
        i = r2 + 1;
        break;
      }
    } else n2 < 0 && (n2 = r2 + 1, i = true), "." == E2 ? e2 < 0 ? e2 = r2 : 1 != o && (o = 1) : e2 > Y && (o = Y);
  }
  return e2 < 0 || n2 < 0 || 0 == o || 1 == o && e2 == (n2 - 1 | 0) && e2 == (i + 1 | 0) ? "" : t2.slice(e2, n2);
}
function B(t2, o) {
  for (var a, r2 = "", i = 0, e2 = Y, E2 = 0, n2 = 0; n2 <= t2.length; ) {
    a = n2 < t2.length ? t2.charAt(n2) : "/";
    if ("/" == a) {
      if (!(e2 == n2 - 1 || 1 == E2)) if (e2 != n2 - 1 && 2 == E2) {
        if (r2.length < 2 || 2 != i || "." != r2.charAt(r2.length - 1) || "." != r2.charAt(r2.length - 2)) {
          if (r2.length > 2) {
            e2 = r2.lastIndexOf("/");
            if (e2 != r2.length - 1) {
              e2 < 0 ? (r2 = "", i = 0) : (r2 = r2.slice(0, e2), i = r2.length - 1 - r2.lastIndexOf("/") | 0), e2 = n2, E2 = 0, n2++;
              continue;
            }
          } else if (r2.length > 0) {
            r2 = "", i = 0, e2 = n2, E2 = 0, n2++;
            continue;
          }
        }
        o && (r2 = r2.length > 0 ? r2 + "/.." : "..", i = 2);
      } else i = t2.slice(e2 + 1 | 0, n2), r2 = r2.length > 0 ? r2 + "/" + i : i, i = (n2 - e2 | 0) - 1 | 0;
      e2 = n2, E2 = 0;
    } else E2 = "." == a && E2 > Y ? E2 + 1 | 0 : Y;
    n2++;
  }
  return r2;
}
function G(t2) {
  var r2 = "/" == t2.charAt(0), e2 = B(t2, !r2);
  0 == e2.length && !r2 && (e2 = "."), e2.length > 0 && "/" == t2.charAt(t2.length - 1) && (e2 += "/");
  return r2 ? "/" + e2 : e2;
}
function D(t2) {
  if ("string" != typeof t2) throw new TypeError("Path must be a string. Received " + JSON.stringify(t2));
}
function L(t2, e2) {
  D(t2), D(e2);
  var r2 = t2 + "";
  t2 = e2 + "", r2.length > 0 || (r2 = ""), t2.length > 0 ? r2.length > 0 && (t2 = r2 + "/" + t2) : t2 = r2;
  return 0 == t2.length ? "." : G(t2);
}
function _(t2, e2) {
  if (t2 && t2.includes("/")) throw new Error("`" + e2 + "` cannot be a path: did not expect `/`");
}
function S(t2, e2) {
  if (!t2) throw new Error("`" + e2 + "` cannot be empty");
}
function j(t2) {
  var e2 = t2.history;
  return 0 == e2.length ? void 0 : e2[e2.length - 1];
}
function I(t2, e2) {
  if (N(e2)) {
    if ("file:" != e2.protocol + "") {
      t2 = new TypeError("The URL must be of scheme file"), t2.code = "ERR_INVALID_URL_SCHEME";
      throw t2;
    }
    if ((e2.hostname + "").length > 0) {
      t2 = new TypeError('File URL host must be "localhost" or empty on darwin'), t2.code = "ERR_INVALID_FILE_URL_HOST";
      throw t2;
    }
    var r2 = e2.pathname + "";
    for (e2 = 0; e2 < r2.length; ) {
      if ("%" == r2.charAt(e2) && "2" == r2.charAt(e2 + 1) && ("F" == r2.charAt(e2 + 2) || "f" == r2.charAt(e2 + 2))) {
        t2 = new TypeError("File URL path must not include encoded / characters"), t2.code = "ERR_INVALID_FILE_URL_PATH";
        throw t2;
      }
      ++e2;
    }
    e2 = globalThis.decodeURIComponent(r2);
  }
  S(e2, "path");
  j(t2) === e2 || t2.history.push(e2);
}
function U(t2) {
  if (!t2) return "1:1";
  var e2 = t2.line, r2 = t2.column;
  t2 = "number" == typeof e2 && e2 ? e2 + "" : "1", e2 = "number" == typeof r2 && r2 ? r2 + "" : "1";
  return t2 + ":" + e2;
}
function K(t2) {
  return !t2 ? "1:1" : "start" in t2 || "end" in t2 ? U(t2.start) + "-" + U(t2.end) : U(t2);
}
function M(t2, e2, r2) {
  "string" == typeof e2 && (r2 = e2, e2 = void 0);
  var n2 = {};
  e2 && ("line" in e2 && "column" in e2 || "start" in e2 && "end" in e2 ? n2.place = e2 : "type" in e2 ? (n2.ancestors = [e2], n2.place = e2.position) : n2 = Object.assign(n2, e2));
  if ("string" == typeof t2) var o, i = t2 + "", a = false;
  else !n2.cause && t2 ? (i = t2.message, n2.cause = t2, a = true) : (i = "", a = false);
  !n2.ruleId && !n2.source && "string" == typeof r2 && (t2 = r2 + "", e2 = t2.indexOf(":"), e2 < 0 ? n2.ruleId = t2 : (n2.source = t2.slice(0, e2), n2.ruleId = t2.slice(e2 + 1 | 0))), o = n2.ancestors, !n2.place && o && o.length > 0 && (t2 = o[o.length - 1], n2.place = t2.position), e2 = n2.place, r2 = e2 && "start" in e2 ? e2.start : e2, t2 = new Error(), t2.ancestors = void 0, o && (t2.ancestors = o), t2.cause = void 0, !n2.cause || (t2.cause = n2.cause), t2.column = void 0, r2 && (t2.column = r2.column), t2.fatal = void 0, t2.file = "", t2.message = i, t2.line = void 0, r2 && (t2.line = r2.line), t2.name = K(e2), t2.place = void 0, e2 && (t2.place = e2), t2.reason = i, t2.ruleId = void 0, !n2.ruleId || (t2.ruleId = n2.ruleId), t2.source = void 0, !n2.source || (t2.source = n2.source), t2.actual = void 0, t2.expected = void 0, t2.note = void 0, t2.url = void 0, t2.stack = a && "string" == typeof n2.cause.stack ? n2.cause.stack : "";
  return t2;
}
function W(t2, e2) {
  return M(t2, e2, void 0);
}
function k(t2, e2) {
  Object.defineProperty(F, t2, e2);
  let r2 = e2.get, n2 = e2.set;
  Object.defineProperty(r2, "name", { configurable: true, value: "get " + t2 }), Object.defineProperty(n2, "name", { configurable: true, value: "set " + t2 });
}
function T(t2, e2) {
  Object.defineProperty(e2, "name", { configurable: true, value: t2 }), Object.defineProperty(F, t2, { configurable: true, writable: true, value: e2 });
}
JSON.parse("null");
Object.prototype.hasOwnProperty, Object.prototype.toString, Array.prototype.slice;
var V = "history path basename stem extname dirname".split(" ");
var E = {};
var x = (0, function(t2, e2, r2) {
  if (this === void 0) throw new TypeError("Class constructor VFileMessage cannot be invoked without 'new'");
  return M(t2, e2, r2);
});
E = x.prototype, Object.setPrototypeOf(x, Error), Object.setPrototypeOf(E, Error.prototype), Object.defineProperty(x, "name", { configurable: true, value: "VFileMessage" }), E.file = "", E.name = "", E.reason = "", E.message = "", E.stack = "", E.column = void 0, E.line = void 0, E.ancestors = void 0, E.cause = void 0, E.fatal = void 0, E.place = void 0, E.ruleId = void 0, E.source = void 0, Object.defineProperty(x, "prototype", { writable: false });
var F;
var R = class VFile extends Object {
  constructor(t2) {
    super();
    if (this === void 0) throw new TypeError("Class constructor VFile cannot be invoked without 'new'");
    t2 ? N(t2) ? t2 = { path: t2 } : ("string" == typeof t2 || H(t2)) && (t2 = { value: t2 }) : t2 = {};
    var e2 = q();
    "cwd" in t2 && (e2 = "");
    this.cwd = e2, this.data = {}, this.history = [], this.messages = [];
    for (var r2, n2 = 0; n2 < V.length; ) e2 = V[n2] || "", e2 in t2 && t2[e2] != null && t2[e2] !== void 0 && (r2 = t2[e2], "history" == e2 && (r2 = r2.slice()), this[e2] = r2), ++n2;
    for (e2 in t2) V.includes(e2) || (this[e2] = t2[e2]);
  }
};
F = R.prototype, Object.defineProperty(R, "name", { configurable: true, value: "VFile" });
var e = (0, function(t2, e2, r2) {
  t2 = this.message(t2, e2, r2), t2.fatal = true;
  throw t2;
});
var t = (0, function(t2, e2, r2) {
  t2 = this.message(t2, e2, r2), t2.fatal = void 0;
  return t2;
});
var r = (0, function(t2, e2, r2) {
  t2 = M(t2, e2, r2);
  if (e2 = j(this)) {
    var n2 = e2 + ":" + t2.name;
    t2.name = n2, t2.file = e2;
  }
  t2.fatal = false;
  this.messages.push(t2);
  return t2;
});
var n = (0, function(t2) {
  var e2 = this.value;
  if (e2 === void 0) return "";
  if ("string" == typeof e2) return e2;
  var r2 = void 0;
  t2 = t2 || r2, r2 = new TextDecoder(t2);
  return r2.decode(e2);
});
k("basename", { configurable: true, get: function() {
  var t2 = j(this);
  if ("string" == typeof t2) return C(t2 + "", "");
}, set: function(t2) {
  S(t2, "basename"), _(t2, "basename");
  var e2 = this.dirname;
  e2 = e2 || "", I(this, L(e2, t2));
} }), k("dirname", { configurable: true, get: function() {
  var t2 = j(this);
  if ("string" == typeof t2) return J(t2 + "");
}, set: function(t2) {
  var e2 = this.basename;
  if (!e2) throw new Error("Setting `dirname` requires `path` to be set too");
  I(this, L(t2 || "", e2));
} }), k("extname", { configurable: true, get: function() {
  var t2 = j(this);
  if ("string" == typeof t2) return z(t2 + "");
}, set: function(t2) {
  _(t2, "extname");
  var e2 = this.dirname;
  if (!e2) throw new Error("Setting `extname` requires `path` to be set too");
  if (t2) {
    if (46 != (+t2.codePointAt(0) | 0)) throw new Error("`extname` must start with `.`");
    if (t2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
  }
  t2 = t2 ? t2 + "" : "";
  I(this, L(e2, this.stem + "" + t2));
} }), k("path", { configurable: true, get: function() {
  return j(this);
}, set: function(t2) {
  I(this, t2);
} }), k("stem", { configurable: true, get: function() {
  var t2 = j(this);
  if ("string" == typeof t2) return t2 += "", C(t2, this.extname + "");
}, set: function(t2) {
  S(t2, "stem"), _(t2, "stem");
  var r2 = t2 + "";
  t2 = this.dirname, t2 = t2 ? t2 + "" : "";
  var e2 = this.extname;
  e2 = e2 ? e2 + "" : "", I(this, L(t2, r2 + e2));
} }), T("fail", e), T("info", t), T("message", r), T("toString", n), Object.defineProperty(R, "prototype", { writable: false });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VFile,
  VFileMessage,
  createVFileMessage
});
