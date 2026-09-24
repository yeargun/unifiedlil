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
  VFile: () => A,
  VFileMessage: () => z,
  createVFileMessage: () => createVFileMessage
});
module.exports = __toCommonJS(vfile_esm_exports);
var c = (a, b) => {
  if (a === void 0) throw new TypeError("Class constructor " + b + " cannot be invoked without 'new'");
};
var d = (a, b) => {
  Object.defineProperty(a, "name", { value: b });
};
var e = (a, b) => {
  for (let c2 in a) {
    let e2 = a[c2], f2 = e2;
    if (typeof e2 == "function") {
      d(e2, c2);
      f2 = { writable: true, value: e2 };
    } else {
      d(e2.get, "get " + c2);
      d(e2.set, "set " + c2);
    }
    f2.configurable = true;
    Object.defineProperty(b, c2, f2);
  }
};
var f = (a, b) => {
  d(a, b);
  Object.defineProperty(a, "prototype", { writable: false });
};
var g = (a, b) => a.codePointAt(b) === 47;
var h = (a) => {
  if (typeof a != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(a));
};
var i = (a, b) => {
  let c2 = 0, d2 = -1, e2 = a.length, f2 = false;
  if (b === void 0 || b.length == 0 || b.length > a.length) {
    while (e2 > 0) {
      --e2;
      if (g(a, e2)) {
        if (f2) {
          c2 = e2 + 1;
          break;
        }
      } else if (d2 < 0) {
        f2 = true;
        d2 = e2 + 1;
      }
    }
    return d2 < 0 ? "" : a.slice(c2, d2);
  }
  if (b === a) return "";
  let h2 = -1, i2 = b.length - 1;
  while (e2 > 0) {
    --e2;
    if (g(a, e2)) {
      if (f2) {
        c2 = e2 + 1;
        break;
      }
    } else {
      if (h2 < 0) {
        f2 = true;
        h2 = e2 + 1;
      }
      if (i2 > -1) if (a.codePointAt(e2) === b.codePointAt(i2)) {
        --i2;
        if (i2 < 0) d2 = e2;
      } else {
        i2 = -1;
        d2 = h2;
      }
    }
  }
  if (c2 == d2) d2 = h2;
  else if (d2 < 0) d2 = a.length;
  return a.slice(c2, d2);
};
var m = (a, b) => {
  h(a);
  h(b);
  let c2 = !a ? b : b ? a + "/" + b : a;
  if (!c2) return ".";
  let d2 = g(c2, 0), e2 = ((a2, b2) => {
    let c3 = "", d3 = 0, e3 = -1, f2 = 0, g2;
    for (let h2 = 0; h2 <= a2.length; ++h2) {
      if (h2 < a2.length) g2 = a2.codePointAt(h2);
      else if (g2 === 47) break;
      else g2 = 47;
      if (g2 === 47) {
        if (e3 != h2 - 1 && f2 != 1) if (f2 == 2) {
          if (c3.length < 2 || d3 != 2 || c3.codePointAt(c3.length - 1) !== 46 || c3.codePointAt(c3.length - 2) !== 46) {
            if (c3.length > 2) {
              let a3 = +c3.lastIndexOf("/");
              if (a3 != c3.length - 1) {
                if (a3 < 0) {
                  c3 = "";
                  d3 = 0;
                } else {
                  c3 = c3.slice(0, a3);
                  d3 = c3.length - 1 - +c3.lastIndexOf("/");
                }
                e3 = h2;
                f2 = 0;
                continue;
              }
            } else if (c3.length > 0) {
              c3 = "";
              d3 = 0;
              e3 = h2;
              f2 = 0;
              continue;
            }
          }
          if (b2) {
            c3 = c3.length > 0 ? c3 + "/.." : "..";
            d3 = 2;
          }
        } else {
          let b3 = a2.slice(e3 + 1, h2);
          c3 = c3.length > 0 ? c3 + "/" + b3 : b3;
          d3 = h2 - e3 - 1;
        }
        e3 = h2;
        f2 = 0;
      } else if (g2 === 46 && f2 > -1) ++f2;
      else f2 = -1;
    }
    return c3;
  })(c2, !d2);
  if (e2.length == 0 && !d2) e2 = ".";
  if (e2.length > 0 && g(c2, c2.length - 1)) e2 = e2 + "/";
  return d2 ? "/" + e2 : e2;
};
var n = (a) => !!a && typeof a == "object" && "href" in a && !!a.href && "protocol" in a && !!a.protocol && a.auth === void 0;
var o = (a, b) => {
  throw Object.assign(new TypeError(a), { code: b });
};
var q = (a) => s(a && a.line) + ":" + s(a && a.column);
var r = (a) => q(a && a.start) + "-" + q(a && a.end);
var s = (a) => a && typeof a == "number" ? a : 1;
var u = (a, b, c2, d2) => {
  if (typeof c2 == "string") {
    d2 = c2;
    c2 = void 0;
  }
  let e2 = "", f2 = false, g2 = !c2 ? {} : "line" in c2 && "column" in c2 || "start" in c2 && "end" in c2 ? { place: c2 } : "type" in c2 ? { ancestors: [c2], place: c2.position } : Object.assign({}, c2);
  if (typeof b == "string") e2 = b;
  else if (!g2.cause && b) {
    f2 = true;
    e2 = b.message;
    g2.cause = b;
  }
  if (!g2.ruleId && !g2.source && typeof d2 == "string") {
    let a2 = d2.indexOf(":");
    if (a2 === -1) g2.ruleId = d2;
    else {
      g2.source = d2.slice(0, a2);
      g2.ruleId = d2.slice(a2 + 1);
    }
  }
  let h2 = g2.ancestors;
  if (!g2.place && h2) {
    let a2 = h2[h2.length - 1];
    if (a2) g2.place = a2.position;
  }
  let i2 = g2.place, j = i2 && "start" in i2 ? i2.start : i2, l = g2.cause;
  return Object.assign(Object.setPrototypeOf(new Error(), a), { ancestors: h2 || void 0, cause: l || void 0, column: j ? j.column : void 0, fatal: void 0, file: "", message: e2, line: j ? j.line : void 0, name: ((a2) => !a2 || typeof a2 != "object" ? "" : "position" in a2 || "type" in a2 ? r(a2.position) : "start" in a2 || "end" in a2 ? r(a2) : "line" in a2 || "column" in a2 ? q(a2) : "")(i2) || "1:1", place: i2 || void 0, reason: e2, ruleId: g2.ruleId || void 0, source: g2.source || void 0, stack: f2 && l && typeof l.stack == "string" ? l.stack : "", actual: void 0, expected: void 0, note: void 0, url: void 0 });
};
var createVFileMessage = function(a, b) {
  return u(z.prototype, a, b);
};
var v = (a, b) => {
  if (a && a.includes("/")) throw new Error("`" + b + "` cannot be a path: did not expect `/`");
};
var w = (a, b) => {
  if (!a) throw new Error("`" + b + "` cannot be empty");
};
var x = (a, b) => {
  if (!a) throw new Error("Setting `" + b + "` requires `path` to be set too");
};
var y = ["history", "path", "basename", "stem", "extname", "dirname"];
function D(a) {
  return function(b, c2, d2) {
    return a(this, b, c2, d2);
  };
}
var z = D((a, b, d2, e2) => {
  c(a, "VFileMessage");
  return u(z.prototype, b, d2, e2);
});
f(z, "VFileMessage");
Object.setPrototypeOf(z, Error);
Object.assign(Object.setPrototypeOf(z.prototype, Error.prototype), { file: "", name: "", reason: "", message: "", stack: "", column: void 0, line: void 0, ancestors: void 0, cause: void 0, fatal: void 0, place: void 0, ruleId: void 0, source: void 0 });
function E(a) {
  return function(b) {
    return a(this, b);
  };
}
var A = E((a, b) => {
  c(a, "VFile");
  let d2 = !b ? {} : n(b) ? { path: b } : typeof b == "string" || b && typeof b == "object" && "byteLength" in b && "byteOffset" in b ? { value: b } : b, e2 = globalThis.process;
  Object.assign(a, { cwd: "cwd" in d2 ? "" : e2 && typeof e2.cwd == "function" ? e2.cwd() : "/", data: {}, history: [], messages: [] });
  for (let b2 = 0; b2 < y.length; ++b2) {
    let c2 = y[b2];
    if (c2 in d2) {
      let b3 = d2[c2];
      if (b3 != null) a[c2] = c2 == "history" ? b3.slice() : b3;
    }
  }
  for (let b2 in d2) if (!y.includes(b2)) a[b2] = d2[b2];
});
f(A, "VFile");
function F(a) {
  return function() {
    return a(this);
  };
}
var C = { basename: { get: F((a) => typeof a.path == "string" ? i(a.path) : void 0), set: E((a, b) => {
  w(b, "basename");
  v(b, "basename");
  a.path = m(a.dirname || "", b);
}) }, dirname: { get: F((a) => typeof a.path == "string" ? ((a2) => {
  if (a2.length == 0) return ".";
  let b = -1, c2 = a2.length, d2 = false;
  while (c2 > 1) {
    --c2;
    if (g(a2, c2)) {
      if (d2) {
        b = c2;
        break;
      }
    } else d2 = true;
  }
  return b < 0 ? g(a2, 0) ? "/" : "." : b == 1 && g(a2, 0) ? "//" : a2.slice(0, b);
})(a.path) : void 0), set: E((a, b) => {
  x(a.basename, "dirname");
  a.path = m(b || "", a.basename);
}) }, extname: { get: F((a) => typeof a.path == "string" ? ((a2) => {
  let b = a2.length, c2 = -1, d2 = 0, e2 = -1, f2 = 0, g2 = false;
  while (b > 0) {
    --b;
    let h2 = a2.codePointAt(b);
    if (h2 === 47) {
      if (g2) {
        d2 = b + 1;
        break;
      }
      continue;
    }
    if (c2 < 0) {
      g2 = true;
      c2 = b + 1;
    }
    if (h2 === 46) {
      if (e2 < 0) e2 = b;
      else f2 = 1;
    } else if (e2 > -1) f2 = -1;
  }
  return e2 < 0 || c2 < 0 || f2 == 0 || f2 == 1 && e2 == c2 - 1 && e2 == d2 + 1 ? "" : a2.slice(e2, c2);
})(a.path) : void 0), set: E((a, b) => {
  v(b, "extname");
  x(a.dirname, "extname");
  if (b) {
    if (b.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
    if (b.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
  }
  a.path = m(a.dirname, a.stem + (b || ""));
}) }, path: { get: F((a) => a.history[a.history.length - 1]), set: E((a, b) => {
  if (n(b)) b = ((a2) => {
    if (a2.protocol !== "file:") o("The URL must be of scheme file", "ERR_INVALID_URL_SCHEME");
    if (a2.hostname !== "") o('File URL host must be "localhost" or empty on darwin', "ERR_INVALID_FILE_URL_HOST");
    let c2 = a2.pathname;
    for (let a3 = 0; a3 < c2.length; ++a3) if (c2.codePointAt(a3) === 37 && c2.codePointAt(a3 + 1) === 50) {
      let b2 = c2.codePointAt(a3 + 2);
      if (b2 === 70 || b2 === 102) o("File URL path must not include encoded / characters", "ERR_INVALID_FILE_URL_PATH");
    }
    return globalThis.decodeURIComponent(c2);
  })(b);
  w(b, "path");
  if (a.path !== b) a.history.push(b);
}) }, stem: { get: F((a) => typeof a.path == "string" ? i(a.path, a.extname) : void 0), set: E((a, b) => {
  w(b, "stem");
  v(b, "stem");
  a.path = m(a.dirname || "", b + (a.extname || ""));
}) }, fail: D((a, b, c2, d2) => {
  let e2 = a.message(b, c2, d2);
  e2.fatal = true;
  throw e2;
}), info: D((a, b, c2, d2) => {
  let e2 = a.message(b, c2, d2);
  e2.fatal = void 0;
  return e2;
}), message: D((a, b, c2, d2) => {
  let f2 = u(z.prototype, b, c2, d2);
  if (a.path) {
    f2.name = a.path + ":" + f2.name;
    f2.file = a.path;
  }
  f2.fatal = false;
  a.messages.push(f2);
  return f2;
}), toString: E((a, b) => a.value === void 0 ? "" : typeof a.value == "string" ? a.value : new TextDecoder(b || void 0).decode(a.value)) };
e(C, A.prototype);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VFile,
  VFileMessage,
  createVFileMessage
});
