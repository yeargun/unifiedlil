/*! @itslil/unified 11.0.7 | LilScript reimplementation of unified | MIT */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// unified.node.js
var unified_node_exports = {};
__export(unified_node_exports, {
  unified: () => $
});
module.exports = __toCommonJS(unified_node_exports);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_process = __toESM(require("node:process"), 1);
var import_node_url = require("node:url");
var b = (a) => !!a && typeof a == "object" && "byteLength" in a && "byteOffset" in a;
var c = (a) => typeof a == "string" || b(a);
var d = (a) => {
  if (a) throw a;
};
var e = (a, b2) => {
  if (a === void 0) throw new TypeError("Class constructor " + b2 + " cannot be invoked without 'new'");
};
var f = (a, b2) => {
  Object.defineProperty(a, "name", { value: b2 });
};
var g = (a, b2) => {
  for (let c2 in a) {
    let d2 = a[c2], e2 = d2;
    if (typeof d2 == "function") {
      f(d2, c2);
      e2 = { writable: true, value: d2 };
    } else {
      f(d2.get, "get " + c2);
      f(d2.set, "set " + c2);
    }
    e2.configurable = true;
    Object.defineProperty(b2, c2, e2);
  }
};
var h = (a, b2) => {
  f(a, b2);
  Object.defineProperty(a, "prototype", { writable: false });
};
var i = (a) => {
  if (typeof a != "object" || a == null) return false;
  let b2 = Object.getPrototypeOf(a);
  return (b2 == null || b2 === Object.prototype || Object.getPrototypeOf(b2) == null) && !(Symbol.toStringTag in a) && !(Symbol.iterator in a);
};
var j = (a) => {
  if (!a || Object.prototype.toString.call(a) != "[object Object]") return false;
  let b2 = a.constructor, c2;
  if (b2 && !k.call(a, "constructor")) {
    let a2 = b2.prototype;
    if (!a2 || !k.call(a2, "isPrototypeOf")) return false;
  }
  for (let b3 in a) c2 = b3;
  return c2 === void 0 || !!k.call(a, c2);
};
var l = (a, b2) => {
  if (b2 == "__proto__") {
    if (!k.call(a, b2)) return;
    return Object.getOwnPropertyDescriptor(a, b2).value;
  }
  return a[b2];
};
var m = (a, b2) => {
  if (a == null || typeof a != "object" && typeof a != "function") a = {};
  if (b2 != null) for (let c2 in b2) {
    let d2 = l(a, c2), e2 = l(b2, c2);
    if (a !== e2) {
      let b3 = e2;
      if (e2 && (j(e2) || Array.isArray(e2))) b3 = m(Array.isArray(e2) ? d2 && Array.isArray(d2) ? d2 : [] : d2 && j(d2) ? d2 : {}, e2);
      else if (e2 === void 0) continue;
      if (c2 == "__proto__") Object.defineProperty(a, c2, { enumerable: true, configurable: true, value: b3, writable: true });
      else a[c2] = b3;
    }
  }
  return a;
};
function _(a) {
  return function() {
    return a(arguments);
  };
}
var o = (a) => [null].concat(a);
var p = () => {
  let a = [], b2;
  b2 = { run: _((b3) => {
    let c2 = Array.from(b3), d2 = -1, e2 = c2.pop(), f2;
    if (typeof e2 != "function") throw new TypeError("Expected function as last argument, not " + e2);
    f2 = _((b4) => {
      ++d2;
      let g2 = a[d2], h2 = b4[0];
      if (h2) return e2(h2);
      let i2 = Array.from(b4).slice(1);
      for (let a2 = 0; a2 < c2.length; ++a2) if (i2[a2] == null) i2[a2] = c2[a2];
      c2 = i2;
      if (g2) ((a2, b5) => {
        let c3 = false, d3 = _((a3) => {
          if (!c3) {
            c3 = true;
            b5.apply(void 0, a3);
          }
        }), e3 = (a3) => d3(null, a3);
        return _((b6) => {
          let f3 = Array.from(b6), g3 = a2.length > f3.length, h3;
          if (g3) f3.push(d3);
          try {
            h3 = a2.apply(void 0, f3);
          } catch (a3) {
            if (g3 && c3) throw a3;
            return d3(a3);
          }
          if (!g3) if (h3 && h3.then && typeof h3.then == "function") h3.then(e3, d3);
          else if (Error.prototype.isPrototypeOf(h3)) d3(h3);
          else e3(h3);
        });
      })(g2, f2).apply(void 0, i2);
      else e2.apply(void 0, o(i2));
    });
    f2.apply(void 0, o(c2));
  }), use: (c2) => {
    if (typeof c2 != "function") throw new TypeError("Expected `middelware` to be a function, not " + c2);
    a.push(c2);
    return b2;
  } };
  return b2;
};
var q = (a, b2) => import_node_path.default.basename(a, b2);
var r = (a) => import_node_path.default.dirname(a);
var s = (a) => import_node_path.default.extname(a);
var t = (a, b2) => import_node_path.default.join(a, b2);
var x = (a) => !!a && typeof a == "object" && "href" in a && !!a.href && "protocol" in a && !!a.protocol && a.auth === void 0;
var y = (a) => A(a && a.line) + ":" + A(a && a.column);
var z = (a) => y(a && a.start) + "-" + y(a && a.end);
var A = (a) => a && typeof a == "number" ? a : 1;
var C = (a, b2, c2, d2) => {
  if (typeof c2 == "string") {
    d2 = c2;
    c2 = void 0;
  }
  let e2 = "", f2 = false, g2 = !c2 ? {} : "line" in c2 && "column" in c2 || "start" in c2 && "end" in c2 ? { place: c2 } : "type" in c2 ? { ancestors: [c2], place: c2.position } : Object.assign({}, c2);
  if (typeof b2 == "string") e2 = b2;
  else if (!g2.cause && b2) {
    f2 = true;
    e2 = b2.message;
    g2.cause = b2;
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
  let i2 = g2.place, j2 = i2 && "start" in i2 ? i2.start : i2, l2 = g2.cause;
  return Object.assign(Object.setPrototypeOf(new Error(), a), { ancestors: h2 || void 0, cause: l2 || void 0, column: j2 ? j2.column : void 0, fatal: void 0, file: "", message: e2, line: j2 ? j2.line : void 0, name: ((a2) => !a2 || typeof a2 != "object" ? "" : "position" in a2 || "type" in a2 ? z(a2.position) : "start" in a2 || "end" in a2 ? z(a2) : "line" in a2 || "column" in a2 ? y(a2) : "")(i2) || "1:1", place: i2 || void 0, reason: e2, ruleId: g2.ruleId || void 0, source: g2.source || void 0, stack: f2 && l2 && typeof l2.stack == "string" ? l2.stack : "", actual: void 0, expected: void 0, note: void 0, url: void 0 });
};
var D = (a, b2) => {
  if (a && a.includes(import_node_path.default.sep)) throw new Error("`" + b2 + "` cannot be a path: did not expect `" + import_node_path.default.sep + "`");
};
var E = (a, b2) => {
  if (!a) throw new Error("`" + b2 + "` cannot be empty");
};
var F = (a, b2) => {
  if (!a) throw new Error("Setting `" + b2 + "` requires `path` to be set too");
};
var M = (a) => a && typeof a == "object" && "message" in a && "messages" in a ? a : new I(a);
var N = (a, b2) => {
  if (typeof b2 != "function") throw new TypeError("Cannot `" + a + "` without `parser`");
};
var O = (a, b2) => {
  if (typeof b2 != "function") throw new TypeError("Cannot `" + a + "` without `compiler`");
};
var P = (a, b2) => {
  if (b2) throw new Error("Cannot call `" + a + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
};
var Q = (a) => {
  if (!i(a) || typeof a.type != "string") throw new TypeError("Expected node, got `" + a + "`");
};
var R = (a, b2, c2) => {
  if (!c2) throw new Error("`" + a + "` finished async. Use `" + b2 + "` instead");
};
var S = (a, b2, c2, d2, e2) => {
  if (typeof c2 == "function") U(a, c2, d2);
  else if (typeof c2 == "object") {
    if (!Array.isArray(c2)) {
      if (!("plugins" in c2) && !("settings" in c2)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
      T(a, b2, c2.plugins);
      if (c2.settings) b2.settings = m(b2.settings, c2.settings);
    } else if (e2) T(a, b2, c2);
    else U(a, c2[0], c2.slice(1));
  } else throw new TypeError("Expected usable value, not `" + c2 + "`");
};
var T = (a, b2, c2) => {
  if (c2 != null) {
    if (!Array.isArray(c2)) throw new TypeError("Expected a list of plugins, not `" + c2 + "`");
    for (let d2 = 0; d2 < c2.length; ++d2) S(a, b2, c2[d2], [], false);
  }
};
var U = (a, b2, c2) => {
  let d2 = -1;
  for (let c3 = 0; c3 < a.length; ++c3) if (a[c3][0] === b2) {
    d2 = c3;
    break;
  }
  if (d2 > -1) {
    if (c2.length == 0) return;
    let b3 = c2[0], e3 = a[d2][1];
    if (i(e3) && i(b3)) c2[0] = m(e3, b3);
  }
  let e2 = [b2].concat(c2);
  if (d2 < 0) a.push(e2);
  else a[d2] = e2;
};
var V = (a, b2) => b2 ? a(void 0, b2) : new Promise(a);
var k = {}.hasOwnProperty;
var G = ["history", "path", "basename", "stem", "extname", "dirname"];
function aa(a) {
  return function(b2, c2, d2) {
    return a(this, b2, c2, d2);
  };
}
var H = aa((a, b2, c2, d2) => {
  e(a, "VFileMessage");
  return C(H.prototype, b2, c2, d2);
});
h(H, "VFileMessage");
Object.setPrototypeOf(H, Error);
Object.assign(Object.setPrototypeOf(H.prototype, Error.prototype), { file: "", name: "", reason: "", message: "", stack: "", column: void 0, line: void 0, ancestors: void 0, cause: void 0, fatal: void 0, place: void 0, ruleId: void 0, source: void 0 });
function ba(a) {
  return function(b2) {
    return a(this, b2);
  };
}
var I = ba((a, c2) => {
  e(a, "VFile");
  let d2 = !c2 ? {} : x(c2) ? { path: c2 } : typeof c2 == "string" || b(c2) ? { value: c2 } : c2;
  Object.assign(a, { cwd: "cwd" in d2 ? "" : import_node_process.default.cwd(), data: {}, history: [], messages: [] });
  for (let b2 = 0; b2 < G.length; ++b2) {
    let c3 = G[b2];
    if (c3 in d2) {
      let b3 = d2[c3];
      if (b3 != null) a[c3] = c3 == "history" ? b3.slice() : b3;
    }
  }
  for (let b2 in d2) if (!G.includes(b2)) a[b2] = d2[b2];
});
h(I, "VFile");
function ca(a) {
  return function() {
    return a(this);
  };
}
var K = { basename: { get: ca((a) => typeof a.path == "string" ? q(a.path) : void 0), set: ba((a, b2) => {
  E(b2, "basename");
  D(b2, "basename");
  a.path = t(a.dirname || "", b2);
}) }, dirname: { get: ca((a) => typeof a.path == "string" ? r(a.path) : void 0), set: ba((a, b2) => {
  F(a.basename, "dirname");
  a.path = t(b2 || "", a.basename);
}) }, extname: { get: ca((a) => typeof a.path == "string" ? s(a.path) : void 0), set: ba((a, b2) => {
  D(b2, "extname");
  F(a.dirname, "extname");
  if (b2) {
    if (b2.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
    if (b2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
  }
  a.path = t(a.dirname, a.stem + (b2 || ""));
}) }, path: { get: ca((a) => a.history[a.history.length - 1]), set: ba((a, b2) => {
  if (x(b2)) b2 = (0, import_node_url.fileURLToPath)(b2);
  E(b2, "path");
  if (a.path !== b2) a.history.push(b2);
}) }, stem: { get: ca((a) => typeof a.path == "string" ? q(a.path, a.extname) : void 0), set: ba((a, b2) => {
  E(b2, "stem");
  D(b2, "stem");
  a.path = t(a.dirname || "", b2 + (a.extname || ""));
}) }, fail: aa((a, b2, c2, d2) => {
  let e2 = a.message(b2, c2, d2);
  e2.fatal = true;
  throw e2;
}), info: aa((a, b2, c2, d2) => {
  let e2 = a.message(b2, c2, d2);
  e2.fatal = void 0;
  return e2;
}), message: aa((a, b2, c2, d2) => {
  let f2 = C(H.prototype, b2, c2, d2);
  if (a.path) {
    f2.name = a.path + ":" + f2.name;
    f2.file = a.path;
  }
  f2.fatal = false;
  a.messages.push(f2);
  return f2;
}), toString: ba((a, b2) => a.value === void 0 ? "" : typeof a.value == "string" ? a.value : new TextDecoder(b2 || void 0).decode(a.value)) };
g(K, I.prototype);
var W = ca((a) => {
  e(a, "Processor");
  let b2 = W.prototype, c2 = b2.copy, d2;
  d2 = _((a2) => c2.apply(d2, a2));
  return Object.assign(Object.setPrototypeOf(d2, b2), { Compiler: void 0, Parser: void 0, attachers: [], compiler: void 0, freezeIndex: -1, frozen: void 0, namespace: {}, parser: void 0, transformers: p() });
});
h(W, "Processor");
function da(a) {
  return function() {
    return a(this, arguments);
  };
}
var X = da((a, b2) => {
  let d2 = b2[0];
  if (typeof d2 == "string") {
    if (b2.length == 2) {
      P("data", a.frozen);
      a.namespace[d2] = b2[1];
      return a;
    }
    return k.call(a.namespace, d2) && a.namespace[d2] || void 0;
  }
  if (d2) {
    P("data", a.frozen);
    a.namespace = d2;
    return a;
  }
  return a.namespace;
});
var Y = da((a, b2) => {
  let d2 = a.attachers, e2 = a.namespace;
  P("use", a.frozen);
  let f2 = b2[0];
  if (f2 != null) S(d2, e2, f2, Array.from(b2).slice(1), true);
  return a;
});
function ea(a) {
  return function(b2, c2) {
    return a(this, b2, c2);
  };
}
g({ copy: ca((a) => {
  let c2 = new W(), d2 = a.attachers;
  for (let a2 = 0; a2 < d2.length; ++a2) c2.use.apply(c2, d2[a2]);
  c2.data(m({}, a.namespace));
  return c2;
}), data: X, freeze: ca((a) => {
  if (a.frozen) return a;
  while (true) {
    let b2 = +a.freezeIndex + 1;
    a.freezeIndex = b2;
    if (!(b2 < a.attachers.length)) break;
    let c2 = a.attachers[b2], d2 = c2.slice(1);
    if (d2[0] !== false) {
      if (d2[0] === true) d2[0] = void 0;
      let b3 = c2[0].apply(a, d2);
      if (typeof b3 == "function") a.transformers.use(b3);
    }
  }
  a.frozen = true;
  a.freezeIndex = 1 / 0;
  return a;
}), parse: ba((a, b2) => {
  a.freeze();
  let d2 = M(b2), e2 = a.parser || a.Parser;
  N("parse", e2);
  return e2(String(d2), d2);
}), process: ea((a, b2, d2) => {
  a.freeze();
  N("process", a.parser || a.Parser);
  O("process", a.compiler || a.Compiler);
  return V((e2, f2) => {
    let g2 = M(b2), h2 = a.parse(g2);
    a.run(h2, g2, (b3, g3, h3) => {
      if (b3 || !g3 || !h3) f2(b3);
      else {
        let f3 = a.stringify(g3, h3);
        if (c(f3)) h3.value = f3;
        else h3.result = f3;
        if (e2) e2(h3);
        else d2(void 0, h3);
      }
    });
  }, d2);
}), processSync: ba((a, b2) => {
  let e2 = false, f2;
  a.freeze();
  N("processSync", a.parser || a.Parser);
  O("processSync", a.compiler || a.Compiler);
  a.process(b2, (a2, b3) => {
    e2 = true;
    d(a2);
    f2 = b3;
  });
  R("processSync", "process", e2);
  return f2;
}), run: aa((a, b2, c2, d2) => {
  Q(b2);
  a.freeze();
  let f2 = a.transformers;
  if (!d2 && typeof c2 == "function") {
    d2 = c2;
    c2 = void 0;
  }
  return V((a2, e2) => {
    f2.run(b2, M(c2), (c3, f3, g2) => {
      let h2 = f3 || b2;
      if (c3) e2(c3);
      else if (a2) a2(h2);
      else d2(void 0, h2, g2);
    });
  }, d2);
}), runSync: ea((a, b2, c2) => {
  let e2 = false, f2;
  a.run(b2, c2, (a2, b3) => {
    d(a2);
    f2 = b3;
    e2 = true;
  });
  R("runSync", "run", e2);
  return f2;
}), stringify: ea((a, b2, c2) => {
  a.freeze();
  let e2 = M(c2), f2 = a.compiler || a.Compiler;
  O("stringify", f2);
  Q(b2);
  return f2(b2, e2);
}), use: Y }, W.prototype);
Object.defineProperty(X, "length", { value: 2 });
Object.defineProperty(Y, "length", { value: 1 });
var $ = new W().freeze();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  unified
});
