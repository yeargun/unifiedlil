/*! @itslil/unified 11.0.7 vfile | LilScript reimplementation of vfile@6.0.3 | MIT */

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

// vfile.node.js
var vfile_node_exports = {};
__export(vfile_node_exports, {
  VFile: () => y,
  VFileMessage: () => x,
  createVFileMessage: () => createVFileMessage
});
module.exports = __toCommonJS(vfile_node_exports);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_process = __toESM(require("node:process"), 1);
var import_node_url = require("node:url");
var a = (a2, b2) => import_node_path.default.basename(a2, b2);
var b = (a2) => import_node_path.default.dirname(a2);
var c = (a2) => import_node_path.default.extname(a2);
var d = (a2, b2) => import_node_path.default.join(a2, b2);
var j = (a2, b2) => {
  if (a2 === void 0) throw new TypeError("Class constructor " + b2 + " cannot be invoked without 'new'");
};
var k = (a2, b2) => {
  Object.defineProperty(a2, "name", { value: b2 });
};
var m = (a2, b2) => {
  k(a2, b2);
  Object.defineProperty(a2, "prototype", { writable: false });
};
var n = (a2) => !!a2 && typeof a2 == "object" && "href" in a2 && !!a2.href && "protocol" in a2 && !!a2.protocol && a2.auth === void 0;
var o = (a2) => q(a2 && a2.line) + ":" + q(a2 && a2.column);
var p = (a2) => o(a2 && a2.start) + "-" + o(a2 && a2.end);
var q = (a2) => a2 && typeof a2 == "number" ? a2 : 1;
var s = (a2, b2, c2, d2) => {
  typeof c2 == "string" && (d2 = c2, c2 = void 0);
  let e = "", f = false, g = !c2 ? {} : "line" in c2 && "column" in c2 || "start" in c2 && "end" in c2 ? { place: c2 } : "type" in c2 ? { ancestors: [c2], place: c2.position } : Object.assign({}, c2);
  typeof b2 == "string" ? e = b2 : !g.cause && b2 && (f = true, e = b2.message, g.cause = b2);
  if (!g.ruleId && !g.source && typeof d2 == "string") {
    let a3 = d2.indexOf(":");
    a3 === -1 ? g.ruleId = d2 : (g.source = d2.slice(0, a3), g.ruleId = d2.slice(a3 + 1));
  }
  let h = g.ancestors;
  if (!g.place && h) {
    let a3 = h[h.length - 1];
    a3 && (g.place = a3.position);
  }
  let i = g.place, j2 = i && "start" in i ? i.start : i, l = g.cause;
  return Object.assign(Object.setPrototypeOf(new Error(), a2), { ancestors: h || void 0, cause: l || void 0, column: j2 ? j2.column : void 0, fatal: void 0, file: "", message: e, line: j2 ? j2.line : void 0, name: ((a3) => !a3 || typeof a3 != "object" ? "" : "position" in a3 || "type" in a3 ? p(a3.position) : "start" in a3 || "end" in a3 ? p(a3) : "line" in a3 || "column" in a3 ? o(a3) : "")(i) || "1:1", place: i || void 0, reason: e, ruleId: g.ruleId || void 0, source: g.source || void 0, stack: f && l && typeof l.stack == "string" ? l.stack : "", actual: void 0, expected: void 0, note: void 0, url: void 0 });
};
var createVFileMessage = function(a2, b2) {
  return s(x.prototype, a2, b2);
};
var t = (a2, b2) => {
  if (a2 && a2.includes(import_node_path.default.sep)) throw new Error("`" + b2 + "` cannot be a path: did not expect `" + import_node_path.default.sep + "`");
};
var u = (a2, b2) => {
  if (!a2) throw new Error("`" + b2 + "` cannot be empty");
};
var v = (a2, b2) => {
  if (!a2) throw new Error("Setting `" + b2 + "` requires `path` to be set too");
};
var w = ["history", "path", "basename", "stem", "extname", "dirname"];
function B(a2) {
  return function(b2, c2, d2) {
    return a2(this, b2, c2, d2);
  };
}
var x = B((a2, b2, c2, d2) => {
  j(a2, "VFileMessage");
  return s(x.prototype, b2, c2, d2);
});
m(x, "VFileMessage");
Object.setPrototypeOf(x, Error);
Object.assign(Object.setPrototypeOf(x.prototype, Error.prototype), { file: "", name: "", reason: "", message: "", stack: "", column: void 0, line: void 0, ancestors: void 0, cause: void 0, fatal: void 0, place: void 0, ruleId: void 0, source: void 0 });
function C(a2) {
  return function(b2) {
    return a2(this, b2);
  };
}
var y = C((a2, b2) => {
  j(a2, "VFile");
  let c2 = !b2 ? {} : n(b2) ? { path: b2 } : typeof b2 == "string" || b2 && typeof b2 == "object" && "byteLength" in b2 && "byteOffset" in b2 ? { value: b2 } : b2;
  Object.assign(a2, { cwd: "cwd" in c2 ? "" : import_node_process.default.cwd(), data: {}, history: [], messages: [] });
  for (let b3 = 0; b3 < w.length; ++b3) {
    let d2 = w[b3];
    if (d2 in c2) {
      let b4 = c2[d2];
      b4 != null && (a2[d2] = d2 == "history" ? b4.slice() : b4);
    }
  }
  for (let b3 in c2) !w.includes(b3) && (a2[b3] = c2[b3]);
});
m(y, "VFile");
function D(a2) {
  return function() {
    return a2(this);
  };
}
var A = { basename: { get: D((b2) => typeof b2.path == "string" ? a(b2.path) : void 0), set: C((a2, b2) => {
  u(b2, "basename");
  t(b2, "basename");
  a2.path = d(a2.dirname || "", b2);
}) }, dirname: { get: D((a2) => typeof a2.path == "string" ? b(a2.path) : void 0), set: C((a2, b2) => {
  v(a2.basename, "dirname");
  a2.path = d(b2 || "", a2.basename);
}) }, extname: { get: D((a2) => typeof a2.path == "string" ? c(a2.path) : void 0), set: C((a2, b2) => {
  t(b2, "extname");
  v(a2.dirname, "extname");
  if (b2) {
    if (b2.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
    if (b2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
  }
  a2.path = d(a2.dirname, a2.stem + (b2 || ""));
}) }, path: { get: D((a2) => a2.history[a2.history.length - 1]), set: C((a2, b2) => {
  n(b2) && (b2 = (0, import_node_url.fileURLToPath)(b2));
  u(b2, "path");
  a2.path !== b2 && a2.history.push(b2);
}) }, stem: { get: D((b2) => typeof b2.path == "string" ? a(b2.path, b2.extname) : void 0), set: C((a2, b2) => {
  u(b2, "stem");
  t(b2, "stem");
  a2.path = d(a2.dirname || "", b2 + (a2.extname || ""));
}) }, fail: B((a2, b2, c2, d2) => {
  let e = a2.message(b2, c2, d2);
  e.fatal = true;
  throw e;
}), info: B((a2, b2, c2, d2) => {
  let e = a2.message(b2, c2, d2);
  e.fatal = void 0;
  return e;
}), message: B((a2, b2, c2, d2) => {
  let f = s(x.prototype, b2, c2, d2);
  a2.path && (f.name = a2.path + ":" + f.name, f.file = a2.path);
  f.fatal = false;
  a2.messages.push(f);
  return f;
}), toString: C((a2, b2) => a2.value === void 0 ? "" : typeof a2.value == "string" ? a2.value : new TextDecoder(b2 || void 0).decode(a2.value)) };
{
  let a2 = A, b2 = y.prototype;
  for (let c2 in a2) {
    let d2 = a2[c2], e = d2;
    typeof d2 == "function" ? (k(d2, c2), e = { writable: true, value: d2 }) : (k(d2.get, "get " + c2), k(d2.set, "set " + c2));
    e.configurable = true;
    Object.defineProperty(b2, c2, e);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VFile,
  VFileMessage,
  createVFileMessage
});
