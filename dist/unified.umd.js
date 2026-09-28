/*! @itslil/unified 11.0.7 | LilScript reimplementation of unified | MIT */

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
    unified: () => ca
  });
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
      typeof d2 == "function" ? (f(d2, c2), e2 = { writable: true, value: d2 }) : (f(d2.get, "get " + c2), f(d2.set, "set " + c2));
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
    (a == null || typeof a != "object" && typeof a != "function") && (a = {});
    if (b2 != null) for (let c2 in b2) {
      let d2 = l(a, c2), e2 = l(b2, c2);
      if (a !== e2) {
        let b3 = e2;
        if (e2 && (j(e2) || Array.isArray(e2))) b3 = m(Array.isArray(e2) ? d2 && Array.isArray(d2) ? d2 : [] : d2 && j(d2) ? d2 : {}, e2);
        else if (e2 === void 0) continue;
        c2 == "__proto__" ? Object.defineProperty(a, c2, { enumerable: true, configurable: true, value: b3, writable: true }) : a[c2] = b3;
      }
    }
    return a;
  };
  function da(a) {
    return function() {
      return a(arguments);
    };
  }
  var o = (a) => [null].concat(a);
  var p = () => {
    let a = [], b2;
    b2 = { run: da((b3) => {
      let c2 = Array.from(b3), d2 = -1, e2 = c2.pop(), f2;
      if (typeof e2 != "function") throw new TypeError("Expected function as last argument, not " + e2);
      f2 = da((b4) => {
        ++d2;
        let g2 = a[d2], h2 = b4[0];
        if (h2) return e2(h2);
        let i2 = Array.from(b4).slice(1);
        for (let a2 = 0; a2 < c2.length; ++a2) i2[a2] == null && (i2[a2] = c2[a2]);
        c2 = i2;
        g2 ? ((a2, b5) => {
          let c3 = false, d3 = da((a3) => {
            !c3 && (c3 = true, b5.apply(void 0, a3));
          }), e3 = (a3) => d3(null, a3);
          return da((b6) => {
            let f3 = Array.from(b6), g3 = a2.length > f3.length, h3;
            g3 && f3.push(d3);
            try {
              h3 = a2.apply(void 0, f3);
            } catch (a3) {
              if (g3 && c3) throw a3;
              return d3(a3);
            }
            !g3 && (h3 && h3.then && typeof h3.then == "function" ? h3.then(e3, d3) : Error.prototype.isPrototypeOf(h3) ? d3(h3) : e3(h3));
          });
        })(g2, f2).apply(void 0, i2) : e2.apply(void 0, o(i2));
      });
      f2.apply(void 0, o(c2));
    }), use: (c2) => {
      if (typeof c2 != "function") throw new TypeError("Expected `middelware` to be a function, not " + c2);
      a.push(c2);
      return b2;
    } };
    return b2;
  };
  var q = (a, b2) => a.codePointAt(b2) === 47;
  var r = (a) => {
    if (typeof a != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(a));
  };
  var s = (a, b2) => {
    let c2 = 0, d2 = -1, e2 = a.length, f2 = false;
    if (b2 === void 0 || b2.length == 0 || b2.length > a.length) {
      while (e2 > 0) {
        --e2;
        if (q(a, e2)) {
          if (f2) {
            c2 = e2 + 1;
            break;
          }
        } else d2 < 0 && (f2 = true, d2 = e2 + 1);
      }
      return d2 < 0 ? "" : a.slice(c2, d2);
    }
    if (b2 === a) return "";
    let g2 = -1, h2 = b2.length - 1;
    while (e2 > 0) {
      --e2;
      if (q(a, e2)) {
        if (f2) {
          c2 = e2 + 1;
          break;
        }
      } else {
        g2 < 0 && (f2 = true, g2 = e2 + 1);
        h2 > -1 && (a.codePointAt(e2) === b2.codePointAt(h2) ? (--h2, h2 < 0 && (d2 = e2)) : (h2 = -1, d2 = g2));
      }
    }
    c2 == d2 ? d2 = g2 : d2 < 0 && (d2 = a.length);
    return a.slice(c2, d2);
  };
  var t = (a) => {
    if (a.length == 0) return ".";
    let b2 = -1, c2 = a.length, d2 = false;
    while (c2 > 1) {
      --c2;
      if (q(a, c2)) {
        if (d2) {
          b2 = c2;
          break;
        }
      } else d2 = true;
    }
    return b2 < 0 ? q(a, 0) ? "/" : "." : b2 == 1 && q(a, 0) ? "//" : a.slice(0, b2);
  };
  var u = (a) => {
    let b2 = a.length, c2 = -1, d2 = 0, e2 = -1, f2 = 0, g2 = false;
    while (b2 > 0) {
      --b2;
      let h2 = a.codePointAt(b2);
      if (h2 === 47) {
        if (g2) {
          d2 = b2 + 1;
          break;
        }
      } else {
        c2 < 0 && (g2 = true, c2 = b2 + 1);
        h2 === 46 ? e2 < 0 ? e2 = b2 : f2 = 1 : e2 > -1 && (f2 = -1);
      }
    }
    return e2 < 0 || c2 < 0 || f2 == 0 || f2 == 1 && e2 == c2 - 1 && e2 == d2 + 1 ? "" : a.slice(e2, c2);
  };
  var w = (a, b2) => {
    r(a);
    r(b2);
    let c2 = !a ? b2 : b2 ? a + "/" + b2 : a;
    if (!c2) return ".";
    let d2 = q(c2, 0), e2 = ((a2, b3) => {
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
                  a3 < 0 ? (c3 = "", d3 = 0) : (c3 = c3.slice(0, a3), d3 = c3.length - 1 - +c3.lastIndexOf("/"));
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
            b3 && (c3 = c3.length > 0 ? c3 + "/.." : "..", d3 = 2);
          } else {
            let b4 = a2.slice(e3 + 1, h2);
            c3 = c3.length > 0 ? c3 + "/" + b4 : b4;
            d3 = h2 - e3 - 1;
          }
          e3 = h2;
          f2 = 0;
        } else g2 === 46 && f2 > -1 ? ++f2 : f2 = -1;
      }
      return c3;
    })(c2, !d2);
    e2.length == 0 && !d2 && (e2 = ".");
    e2.length > 0 && q(c2, c2.length - 1) && (e2 = e2 + "/");
    return d2 ? "/" + e2 : e2;
  };
  var x = (a, b2) => {
    throw Object.assign(new TypeError(a), { code: b2 });
  };
  var y = (a) => {
    a.protocol !== "file:" && x("The URL must be of scheme file", "ERR_INVALID_URL_SCHEME");
    a.hostname !== "" && x('File URL host must be "localhost" or empty on darwin', "ERR_INVALID_FILE_URL_HOST");
    let c2 = a.pathname;
    for (let a2 = 0; a2 < c2.length; ++a2) if (c2.codePointAt(a2) === 37 && c2.codePointAt(a2 + 1) === 50) {
      let b2 = c2.codePointAt(a2 + 2);
      (b2 === 70 || b2 === 102) && x("File URL path must not include encoded / characters", "ERR_INVALID_FILE_URL_PATH");
    }
    return globalThis.decodeURIComponent(c2);
  };
  var B = (a) => !!a && typeof a == "object" && "href" in a && !!a.href && "protocol" in a && !!a.protocol && a.auth === void 0;
  var C = (a) => E(a && a.line) + ":" + E(a && a.column);
  var D = (a) => C(a && a.start) + "-" + C(a && a.end);
  var E = (a) => a && typeof a == "number" ? a : 1;
  var G = (a, b2, c2, d2) => {
    typeof c2 == "string" && (d2 = c2, c2 = void 0);
    let e2 = "", f2 = false, g2 = !c2 ? {} : "line" in c2 && "column" in c2 || "start" in c2 && "end" in c2 ? { place: c2 } : "type" in c2 ? { ancestors: [c2], place: c2.position } : Object.assign({}, c2);
    typeof b2 == "string" ? e2 = b2 : !g2.cause && b2 && (f2 = true, e2 = b2.message, g2.cause = b2);
    if (!g2.ruleId && !g2.source && typeof d2 == "string") {
      let a2 = d2.indexOf(":");
      a2 === -1 ? g2.ruleId = d2 : (g2.source = d2.slice(0, a2), g2.ruleId = d2.slice(a2 + 1));
    }
    let h2 = g2.ancestors;
    if (!g2.place && h2) {
      let a2 = h2[h2.length - 1];
      a2 && (g2.place = a2.position);
    }
    let i2 = g2.place, j2 = i2 && "start" in i2 ? i2.start : i2, l2 = g2.cause;
    return Object.assign(Object.setPrototypeOf(new Error(), a), { ancestors: h2 || void 0, cause: l2 || void 0, column: j2 ? j2.column : void 0, fatal: void 0, file: "", message: e2, line: j2 ? j2.line : void 0, name: ((a2) => !a2 || typeof a2 != "object" ? "" : "position" in a2 || "type" in a2 ? D(a2.position) : "start" in a2 || "end" in a2 ? D(a2) : "line" in a2 || "column" in a2 ? C(a2) : "")(i2) || "1:1", place: i2 || void 0, reason: e2, ruleId: g2.ruleId || void 0, source: g2.source || void 0, stack: f2 && l2 && typeof l2.stack == "string" ? l2.stack : "", actual: void 0, expected: void 0, note: void 0, url: void 0 });
  };
  var H = (a, b2) => {
    if (a && a.includes("/")) throw new Error("`" + b2 + "` cannot be a path: did not expect `/`");
  };
  var I = (a, b2) => {
    if (!a) throw new Error("`" + b2 + "` cannot be empty");
  };
  var J = (a, b2) => {
    if (!a) throw new Error("Setting `" + b2 + "` requires `path` to be set too");
  };
  var Q = (a) => a && typeof a == "object" && "message" in a && "messages" in a ? a : new M(a);
  var R = (a, b2) => {
    if (typeof b2 != "function") throw new TypeError("Cannot `" + a + "` without `parser`");
  };
  var S = (a, b2) => {
    if (typeof b2 != "function") throw new TypeError("Cannot `" + a + "` without `compiler`");
  };
  var T = (a, b2) => {
    if (b2) throw new Error("Cannot call `" + a + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
  };
  var U = (a) => {
    if (!i(a) || typeof a.type != "string") throw new TypeError("Expected node, got `" + a + "`");
  };
  var V = (a, b2, c2) => {
    if (!c2) throw new Error("`" + a + "` finished async. Use `" + b2 + "` instead");
  };
  var W = (a, b2, c2, d2, e2) => {
    if (typeof c2 == "function") Y(a, c2, d2);
    else if (typeof c2 == "object") {
      if (!Array.isArray(c2)) {
        if (!("plugins" in c2) && !("settings" in c2)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
        X(a, b2, c2.plugins);
        c2.settings && (b2.settings = m(b2.settings, c2.settings));
      } else e2 ? X(a, b2, c2) : Y(a, c2[0], c2.slice(1));
    } else throw new TypeError("Expected usable value, not `" + c2 + "`");
  };
  var X = (a, b2, c2) => {
    if (c2 != null) {
      if (!Array.isArray(c2)) throw new TypeError("Expected a list of plugins, not `" + c2 + "`");
      for (let d2 = 0; d2 < c2.length; ++d2) W(a, b2, c2[d2], [], false);
    }
  };
  var Y = (a, b2, c2) => {
    let d2 = -1;
    for (let c3 = 0; c3 < a.length; ++c3) if (a[c3][0] === b2) {
      d2 = c3;
      break;
    }
    if (d2 > -1) {
      if (c2.length == 0) return;
      let b3 = c2[0], e3 = a[d2][1];
      i(e3) && i(b3) && (c2[0] = m(e3, b3));
    }
    let e2 = [b2].concat(c2);
    d2 < 0 ? a.push(e2) : a[d2] = e2;
  };
  var Z = (a, b2) => b2 ? a(void 0, b2) : new Promise(a);
  var k = {}.hasOwnProperty;
  var K = ["history", "path", "basename", "stem", "extname", "dirname"];
  function ea(a) {
    return function(b2, c2, d2) {
      return a(this, b2, c2, d2);
    };
  }
  var L = ea((a, b2, c2, d2) => {
    e(a, "VFileMessage");
    return G(L.prototype, b2, c2, d2);
  });
  h(L, "VFileMessage");
  Object.setPrototypeOf(L, Error);
  Object.assign(Object.setPrototypeOf(L.prototype, Error.prototype), { file: "", name: "", reason: "", message: "", stack: "", column: void 0, line: void 0, ancestors: void 0, cause: void 0, fatal: void 0, place: void 0, ruleId: void 0, source: void 0 });
  function fa(a) {
    return function(b2) {
      return a(this, b2);
    };
  }
  var M = fa((a, c2) => {
    e(a, "VFile");
    let d2 = !c2 ? {} : B(c2) ? { path: c2 } : typeof c2 == "string" || b(c2) ? { value: c2 } : c2;
    Object.assign(a, { cwd: "cwd" in d2 ? "" : "/", data: {}, history: [], messages: [] });
    for (let b2 = 0; b2 < K.length; ++b2) {
      let c3 = K[b2];
      if (c3 in d2) {
        let b3 = d2[c3];
        b3 != null && (a[c3] = c3 == "history" ? b3.slice() : b3);
      }
    }
    for (let b2 in d2) !K.includes(b2) && (a[b2] = d2[b2]);
  });
  h(M, "VFile");
  function ga(a) {
    return function() {
      return a(this);
    };
  }
  var O = { basename: { get: ga((a) => typeof a.path == "string" ? s(a.path) : void 0), set: fa((a, b2) => {
    I(b2, "basename");
    H(b2, "basename");
    a.path = w(a.dirname || "", b2);
  }) }, dirname: { get: ga((a) => typeof a.path == "string" ? t(a.path) : void 0), set: fa((a, b2) => {
    J(a.basename, "dirname");
    a.path = w(b2 || "", a.basename);
  }) }, extname: { get: ga((a) => typeof a.path == "string" ? u(a.path) : void 0), set: fa((a, b2) => {
    H(b2, "extname");
    J(a.dirname, "extname");
    if (b2) {
      if (b2.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
      if (b2.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    a.path = w(a.dirname, a.stem + (b2 || ""));
  }) }, path: { get: ga((a) => a.history[a.history.length - 1]), set: fa((a, b2) => {
    B(b2) && (b2 = y(b2));
    I(b2, "path");
    a.path !== b2 && a.history.push(b2);
  }) }, stem: { get: ga((a) => typeof a.path == "string" ? s(a.path, a.extname) : void 0), set: fa((a, b2) => {
    I(b2, "stem");
    H(b2, "stem");
    a.path = w(a.dirname || "", b2 + (a.extname || ""));
  }) }, fail: ea((a, b2, c2, d2) => {
    let e2 = a.message(b2, c2, d2);
    e2.fatal = true;
    throw e2;
  }), info: ea((a, b2, c2, d2) => {
    let e2 = a.message(b2, c2, d2);
    e2.fatal = void 0;
    return e2;
  }), message: ea((a, b2, c2, d2) => {
    let f2 = G(L.prototype, b2, c2, d2);
    a.path && (f2.name = a.path + ":" + f2.name, f2.file = a.path);
    f2.fatal = false;
    a.messages.push(f2);
    return f2;
  }), toString: fa((a, b2) => a.value === void 0 ? "" : typeof a.value == "string" ? a.value : new TextDecoder(b2 || void 0).decode(a.value)) };
  g(O, M.prototype);
  var $ = ga((a) => {
    e(a, "Processor");
    let b2 = $.prototype, c2 = b2.copy, d2;
    d2 = da((a2) => c2.apply(d2, a2));
    return Object.assign(Object.setPrototypeOf(d2, b2), { Compiler: void 0, Parser: void 0, attachers: [], compiler: void 0, freezeIndex: -1, frozen: void 0, namespace: {}, parser: void 0, transformers: p() });
  });
  h($, "Processor");
  function ha(a) {
    return function() {
      return a(this, arguments);
    };
  }
  var _ = ha((a, b2) => {
    let d2 = b2[0];
    if (typeof d2 == "string") {
      if (b2.length == 2) {
        T("data", a.frozen);
        a.namespace[d2] = b2[1];
        return a;
      }
      return k.call(a.namespace, d2) && a.namespace[d2] || void 0;
    }
    if (d2) {
      T("data", a.frozen);
      a.namespace = d2;
      return a;
    }
    return a.namespace;
  });
  var aa = ha((a, b2) => {
    let d2 = a.attachers, e2 = a.namespace;
    T("use", a.frozen);
    let f2 = b2[0];
    f2 != null && W(d2, e2, f2, Array.from(b2).slice(1), true);
    return a;
  });
  function ia(a) {
    return function(b2, c2) {
      return a(this, b2, c2);
    };
  }
  g({ copy: ga((a) => {
    let c2 = new $(), d2 = a.attachers;
    for (let a2 = 0; a2 < d2.length; ++a2) c2.use.apply(c2, d2[a2]);
    c2.data(m({}, a.namespace));
    return c2;
  }), data: _, freeze: ga((a) => {
    if (a.frozen) return a;
    while (true) {
      let b2 = +a.freezeIndex + 1;
      a.freezeIndex = b2;
      if (!(b2 < a.attachers.length)) break;
      let c2 = a.attachers[b2], d2 = c2.slice(1);
      if (d2[0] !== false) {
        d2[0] === true && (d2[0] = void 0);
        let b3 = c2[0].apply(a, d2);
        typeof b3 == "function" && a.transformers.use(b3);
      }
    }
    a.frozen = true;
    a.freezeIndex = 1 / 0;
    return a;
  }), parse: fa((a, b2) => {
    a.freeze();
    let d2 = Q(b2), e2 = a.parser || a.Parser;
    R("parse", e2);
    return e2(String(d2), d2);
  }), process: ia((a, b2, d2) => {
    a.freeze();
    R("process", a.parser || a.Parser);
    S("process", a.compiler || a.Compiler);
    return Z((e2, f2) => {
      let g2 = Q(b2), h2 = a.parse(g2);
      a.run(h2, g2, (b3, g3, h3) => {
        if (b3 || !g3 || !h3) f2(b3);
        else {
          let f3 = a.stringify(g3, h3);
          c(f3) ? h3.value = f3 : h3.result = f3;
          e2 ? e2(h3) : d2(void 0, h3);
        }
      });
    }, d2);
  }), processSync: fa((a, b2) => {
    let e2 = false, f2;
    a.freeze();
    R("processSync", a.parser || a.Parser);
    S("processSync", a.compiler || a.Compiler);
    a.process(b2, (a2, b3) => {
      e2 = true;
      d(a2);
      f2 = b3;
    });
    V("processSync", "process", e2);
    return f2;
  }), run: ea((a, b2, c2, d2) => {
    U(b2);
    a.freeze();
    let f2 = a.transformers;
    !d2 && typeof c2 == "function" && (d2 = c2, c2 = void 0);
    return Z((a2, e2) => {
      f2.run(b2, Q(c2), (c3, f3, g2) => {
        let h2 = f3 || b2;
        c3 ? e2(c3) : a2 ? a2(h2) : d2(void 0, h2, g2);
      });
    }, d2);
  }), runSync: ia((a, b2, c2) => {
    let e2 = false, f2;
    a.run(b2, c2, (a2, b3) => {
      d(a2);
      f2 = b3;
      e2 = true;
    });
    V("runSync", "run", e2);
    return f2;
  }), stringify: ia((a, b2, c2) => {
    a.freeze();
    let e2 = Q(c2), f2 = a.compiler || a.Compiler;
    S("stringify", f2);
    U(b2);
    return f2(b2, e2);
  }), use: aa }, $.prototype);
  Object.defineProperty(_, "length", { value: 2 });
  Object.defineProperty(aa, "length", { value: 1 });
  var ca = new $().freeze();
  return __toCommonJS(unified_esm_exports);
})();
globalThis.unified=unified.unified||unified;
