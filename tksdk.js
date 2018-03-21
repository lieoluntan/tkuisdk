var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, d) {
  b != Array.prototype && b != Object.prototype && (b[a] = d.value)
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.Symbol = function() {
  var b = 0;
  return function(a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + b++
  }
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {
    configurable: !0,
    writable: !0,
    value: function() {
      return $jscomp.arrayIterator(this)
    }
  });
  $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(b) {
  var a = 0;
  return $jscomp.iteratorPrototype(function() {
    return a < b.length ? {
      done: !1,
      value: b[a++]
    } : {
      done: !0
    }
  })
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {
    next: b
  };
  b[$jscomp.global.Symbol.iterator] = function() {
    return this
  };
  return b
};
$jscomp.iteratorFromArray = function(b, a) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var d = 0,
    f = {
      next: function() {
        if (d < b.length) {
          var e = d++;
          return {
            value: a(e, b[e]),
            done: !1
          }
        }
        f.next = function() {
          return {
            done: !0,
            value: void 0
          }
        };
        return f.next()
      }
    };
  f[Symbol.iterator] = function() {
    return f
  };
  return f
};
$jscomp.polyfill = function(b, a, d, f) {
  if (a) {
    d = $jscomp.global;
    b = b.split(".");
    for (f = 0; f < b.length - 1; f++) {
      var e = b[f];
      e in d || (d[e] = {});
      d = d[e]
    }
    b = b[b.length - 1];
    f = d[b];
    a = a(f);
    a != f && null != a && $jscomp.defineProperty(d, b, {
      configurable: !0,
      writable: !0,
      value: a
    })
  }
};
$jscomp.polyfill("Array.prototype.keys", function(b) {
  return b ? b : function() {
    return $jscomp.iteratorFromArray(this, function(a) {
      return a
    })
  }
}, "es6", "es3");
(function() {
  var b = !1;
  if (void 0 !== window.__SDKDEV__ && null !== window.__SDKDEV__ && "boolean" === typeof window.__SDKDEV__) try {
    b = window.__SDKDEV__
  } catch (d) {
    b = !1
  }
  if (!b) {
    b = decodeURIComponent(window.location.href);
    var a = b.indexOf("?");
    b = b.substring(a + 1).match(/(^|&)debug=([^&]*)(&|$)/i);
    b = null != b ? b[2] : ""
  }
  window.__TkSdkBuild__ = !b;
  try {
    window.localStorage ? window.localStorage.setItem("debug", b ? "*" : "none") : console.warn("[tk-sdk]window.localStorage is not exist!")
  } catch (d) {
    console.warn("[tk-sdk]Browser does not support localStorage!")
  }
})();
! function(b, a) {
  "object" == typeof exports && "object" == typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? exports.io = a() : b.io = a()
}(this, function() {
  return function(b) {
    function a(f) {
      if (d[f]) return d[f].exports;
      var e = d[f] = {
        exports: {},
        id: f,
        loaded: !1
      };
      return b[f].call(e.exports, e, e.exports, a), e.loaded = !0, e.exports
    }
    var d = {};
    return a.m = b, a.c = d, a.p = "", a(0)
  }([function(b, a, d) {
    function f(a, b) {
      "object" === ("undefined" == typeof a ? "undefined" : e(a)) && (b = a, a = void 0);
      b = b || {};
      var d;
      a = c(a);
      var f = a.source,
        l = a.id,
        q = a.path;
      q = m[l] && q in m[l].nsps;
      return b.forceNew || b["force new connection"] || !1 === b.multiplex || q ? (k("ignoring socket cache for %s", f), d = g(f, b)) : (m[l] || (k("new io instance for %s", f), m[l] = g(f, b)), d = m[l]), a.query && !b.query && (b.query = a.query), d.socket(a.path, b)
    }
    var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a
      } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" :
          typeof a
      },
      c = d(1),
      l = d(7),
      g = d(13),
      k = d(3)("socket.io-client");
    b.exports = a = f;
    var m = a.managers = {};
    a.protocol = l.protocol;
    a.connect = f;
    a.Manager = d(13);
    a.Socket = d(39)
  }, function(b, a, d) {
    (function(a) {
      var e = d(2),
        c = d(3)("socket.io-client:url");
      b.exports = function(b, d) {
        var g = b;
        d = d || a.location;
        null == b && (b = d.protocol + "//" + d.host);
        "string" == typeof b && ("/" === b.charAt(0) && (b = "/" === b.charAt(1) ? d.protocol + b : d.host + b), /^(https?|wss?):\/\//.test(b) || (c("protocol-less url %s", b), b = "undefined" != typeof d ? d.protocol + "//" + b : "https://" +
          b), c("parse %s", b), g = e(b));
        g.port || (/^(http|ws)$/.test(g.protocol) ? g.port = "80" : /^(http|ws)s$/.test(g.protocol) && (g.port = "443"));
        g.path = g.path || "/";
        b = -1 !== g.host.indexOf(":") ? "[" + g.host + "]" : g.host;
        return g.id = g.protocol + "://" + b + ":" + g.port, g.href = g.protocol + "://" + b + (d && d.port === g.port ? "" : ":" + g.port), g
      }
    }).call(a, function() {
      return this
    }())
  }, function(b, a) {
    var d = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      f = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
    b.exports = function(a) {
      var b = a,
        e = a.indexOf("["),
        g = a.indexOf("]"); - 1 != e && -1 != g && (a = a.substring(0, e) + a.substring(e, g).replace(/:/g, ";") + a.substring(g, a.length));
      a = d.exec(a || "");
      for (var k = {}, m = 14; m--;) k[f[m]] = a[m] || "";
      return -1 != e && -1 != g && (k.source = b, k.host = k.host.substring(1, k.host.length - 1).replace(/;/g, ":"), k.authority = k.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), k.ipv6uri = !0), k
    }
  }, function(b, a, d) {
    (function(f) {
      function e() {
        try {
          var b = a.storage.debug
        } catch (k) {}
        return !b && "undefined" != typeof f && "env" in f && (b = f.env.DEBUG), b
      }
      a = b.exports = d(5);
      a.log = function() {
        return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
      };
      a.formatArgs = function(b) {
        var c = this.useColors;
        if (b[0] = (c ? "%c" : "") + this.namespace + (c ? " %c" : " ") + b[0] + (c ? "%c " : " ") + "+" + a.humanize(this.diff), c) {
          c = "color: " + this.color;
          b.splice(1, 0, c, "color: inherit");
          var e = 0,
            d = 0;
          b[0].replace(/%[a-zA-Z%]/g,
            function(a) {
              "%%" !== a && (e++, "%c" === a && (d = e))
            });
          b.splice(d, 0, c)
        }
      };
      a.save = function(b) {
        try {
          null == b ? a.storage.removeItem("debug") : a.storage.debug = b
        } catch (k) {}
      };
      a.load = e;
      a.useColors = function() {
        return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception &&
          window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && 31 <= parseInt(RegExp.$1, 10) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
      };
      var c = a;
      if ("undefined" != typeof chrome && "undefined" != typeof chrome.storage) var l = chrome.storage.local;
      else a: {
        try {
          l = window.localStorage;
          break a
        } catch (g) {}
        l = void 0
      }
      c.storage = l;
      a.colors = "lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" ");
      a.formatters.j = function(a) {
        try {
          return JSON.stringify(a)
        } catch (k) {
          return "[UnexpectedJSONParseError]: " + k.message
        }
      };
      a.enable(e())
    }).call(a, d(4))
  }, function(b, a) {
    function d() {
      throw Error("setTimeout has not been defined");
    }

    function f() {
      throw Error("clearTimeout has not been defined");
    }

    function e(a) {
      if (n === setTimeout) return setTimeout(a, 0);
      if ((n === d || !n) && setTimeout) return n = setTimeout, setTimeout(a, 0);
      try {
        return n(a, 0)
      } catch (z) {
        try {
          return n.call(null, a, 0)
        } catch (w) {
          return n.call(this, a, 0)
        }
      }
    }

    function c(a) {
      if (q ===
        clearTimeout) return clearTimeout(a);
      if ((q === f || !q) && clearTimeout) return q = clearTimeout, clearTimeout(a);
      try {
        return q(a)
      } catch (z) {
        try {
          return q.call(null, a)
        } catch (w) {
          return q.call(this, a)
        }
      }
    }

    function l() {
      x && t && (x = !1, t.length ? u = t.concat(u) : D = -1, u.length && g())
    }

    function g() {
      if (!x) {
        var a = e(l);
        x = !0;
        for (var b = u.length; b;) {
          t = u;
          for (u = []; ++D < b;) t && t[D].run();
          D = -1;
          b = u.length
        }
        t = null;
        x = !1;
        c(a)
      }
    }

    function k(a, b) {
      this.fun = a;
      this.array = b
    }

    function m() {}
    b = b.exports = {};
    try {
      var n = "function" == typeof setTimeout ? setTimeout :
        d
    } catch (I) {
      n = d
    }
    try {
      var q = "function" == typeof clearTimeout ? clearTimeout : f
    } catch (I) {
      q = f
    }!0;
    var t, u = [],
      x = !1,
      D = -1;
    b.nextTick = function(a) {
      var b = Array(arguments.length - 1);
      if (1 < arguments.length)
        for (var c = 1; c < arguments.length; c++) b[c - 1] = arguments[c];
      u.push(new k(a, b));
      1 !== u.length || x || e(g)
    };
    k.prototype.run = function() {
      this.fun.apply(null, this.array)
    };
    b.title = "browser";
    b.browser = !0;
    b.env = {};
    b.argv = [];
    b.version = "";
    b.versions = {};
    b.on = m;
    b.addListener = m;
    b.once = m;
    b.off = m;
    b.removeListener = m;
    b.removeAllListeners = m;
    b.emit = m;
    b.prependListener = m;
    b.prependOnceListener = m;
    b.listeners = function(a) {
      return []
    };
    b.binding = function(a) {
      throw Error("process.binding is not supported");
    };
    b.cwd = function() {
      return "/"
    };
    b.chdir = function(a) {
      throw Error("process.chdir is not supported");
    };
    b.umask = function() {
      return 0
    }
  }, function(b, a, d) {
    function f(b) {
      var c, e = 0;
      for (c in b) e = (e << 5) - e + b.charCodeAt(c), e |= 0;
      return a.colors[Math.abs(e) % a.colors.length]
    }

    function e(b) {
      function e() {
        if (e.enabled) {
          var b = +new Date;
          e.diff = b - (c || b);
          e.prev = c;
          c = e.curr =
            b;
          var d = Array(arguments.length);
          for (b = 0; b < d.length; b++) d[b] = arguments[b];
          d[0] = a.coerce(d[0]);
          "string" != typeof d[0] && d.unshift("%O");
          var f = 0;
          d[0] = d[0].replace(/%([a-zA-Z%])/g, function(b, c) {
            if ("%%" === b) return b;
            f++;
            c = a.formatters[c];
            "function" == typeof c && (b = c.call(e, d[f]), d.splice(f, 1), f--);
            return b
          });
          a.formatArgs.call(e, d);
          (e.log || a.log || console.log.bind(console)).apply(e, d)
        }
      }
      return e.namespace = b, e.enabled = a.enabled(b), e.useColors = a.useColors(), e.color = f(b), "function" == typeof a.init && a.init(e), e
    }
    a =
      b.exports = e.debug = e["default"] = e;
    a.coerce = function(a) {
      return a instanceof Error ? a.stack || a.message : a
    };
    a.disable = function() {
      a.enable("")
    };
    a.enable = function(b) {
      a.save(b);
      a.names = [];
      a.skips = [];
      for (var c = ("string" == typeof b ? b : "").split(/[\s,]+/), e = c.length, d = 0; d < e; d++) c[d] && (b = c[d].replace(/\*/g, ".*?"), "-" === b[0] ? a.skips.push(new RegExp("^" + b.substr(1) + "$")) : a.names.push(new RegExp("^" + b + "$")))
    };
    a.enabled = function(b) {
      var c;
      var e = 0;
      for (c = a.skips.length; e < c; e++)
        if (a.skips[e].test(b)) return !1;
      e = 0;
      for (c =
             a.names.length; e < c; e++)
        if (a.names[e].test(b)) return !0;
      return !1
    };
    a.humanize = d(6);
    a.names = [];
    a.skips = [];
    a.formatters = {};
    var c
  }, function(b, a) {
    function d(a) {
      if (a = String(a), !(100 < a.length))
        if (a = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(a)) {
          var b = parseFloat(a[1]);
          switch ((a[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return b * k;
            case "days":
            case "day":
            case "d":
              return b * g;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return b *
                l;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return b * c;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return b * e;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return b
          }
        }
    }

    function f(a, b, c) {
      if (!(a < b)) return a < 1.5 * b ? Math.floor(a / b) + " " + c : Math.ceil(a / b) + " " + c + "s"
    }
    var e = 1E3,
      c = 60 * e,
      l = 60 * c,
      g = 24 * l,
      k = 365.25 * g;
    b.exports = function(a, b) {
      b = b || {};
      var q = typeof a;
      if ("string" === q && 0 < a.length) return d(a);
      if ("number" === q && !1 === isNaN(a)) return b["long"] ? f(a,
          g, "day") || f(a, l, "hour") || f(a, c, "minute") || f(a, e, "second") || a + " ms" : a >= g ? Math.round(a / g) + "d" : a >= l ? Math.round(a / l) + "h" : a >= c ? Math.round(a / c) + "m" : a >= e ? Math.round(a / e) + "s" : a + "ms";
      throw Error("val is not a non-empty string or a valid number. val\x3d" + JSON.stringify(a));
    }
  }, function(b, a, d) {
    function f() {}

    function e(b) {
      var c = "" + b.type;
      return a.BINARY_EVENT !== b.type && a.BINARY_ACK !== b.type || (c += b.attachments + "-"), b.nsp && "/" !== b.nsp && (c += b.nsp + ","), null != b.id && (c += b.id), null != b.data && (c += JSON.stringify(b.data)),
        m("encoded %j as %s", b, c), c
    }

    function c(a, b) {
      q.removeBlobs(a, function(a) {
        var c = q.deconstructPacket(a);
        a = e(c.packet);
        c = c.buffers;
        c.unshift(a);
        b(c)
      })
    }

    function l() {
      this.reconstructor = null
    }

    function g(a) {
      this.reconPack = a;
      this.buffers = []
    }

    function k() {
      return {
        type: a.ERROR,
        data: "parser error"
      }
    }
    var m = d(3)("socket.io-parser");
    b = d(8);
    var n = d(9),
      q = d(11),
      t = d(12);
    a.protocol = 4;
    a.types = "CONNECT DISCONNECT EVENT ACK ERROR BINARY_EVENT BINARY_ACK".split(" ");
    a.CONNECT = 0;
    a.DISCONNECT = 1;
    a.EVENT = 2;
    a.ACK = 3;
    a.ERROR = 4;
    a.BINARY_EVENT =
      5;
    a.BINARY_ACK = 6;
    a.Encoder = f;
    a.Decoder = l;
    f.prototype.encode = function(b, d) {
      (b.type !== a.EVENT && b.type !== a.ACK || !n(b.data) || (b.type = b.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK), m("encoding packet %j", b), a.BINARY_EVENT === b.type || a.BINARY_ACK === b.type) ? c(b, d): (b = e(b), d([b]))
    };
    b(l.prototype);
    l.prototype.add = function(b) {
      if ("string" == typeof b) {
        var c = 0,
          e = {
            type: Number(b.charAt(0))
          };
        if (null == a.types[e.type]) b = k();
        else {
          if (a.BINARY_EVENT === e.type || a.BINARY_ACK === e.type) {
            for (var d = "";
                 "-" !== b.charAt(++c) && (d +=
                   b.charAt(c), c != b.length););
            if (d != Number(d) || "-" !== b.charAt(c)) throw Error("Illegal attachments");
            e.attachments = Number(d)
          }
          if ("/" === b.charAt(c + 1))
            for (e.nsp = ""; ++c;) {
              d = b.charAt(c);
              if ("," === d) break;
              if (e.nsp += d, c === b.length) break
            } else e.nsp = "/";
          d = b.charAt(c + 1);
          if ("" !== d && Number(d) == d) {
            for (e.id = ""; ++c;) {
              d = b.charAt(c);
              if (null == d || Number(d) != d) {
                --c;
                break
              }
              if (e.id += b.charAt(c), c === b.length) break
            }
            e.id = Number(e.id)
          }
          if (b.charAt(++c)) {
            b: {
              c = b.substr(c);
              try {
                e.data = JSON.parse(c)
              } catch (z) {
                c = k();
                break b
              }
              c = e
            }
            e = c
          }
          b = (m("decoded %s as %j",
            b, e), e)
        }
        a.BINARY_EVENT === b.type || a.BINARY_ACK === b.type ? (this.reconstructor = new g(b), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", b)) : this.emit("decoded", b)
      } else {
        if (!t(b) && !b.base64) throw Error("Unknown type: " + b);
        if (!this.reconstructor) throw Error("got binary data when not reconstructing a packet");
        (b = this.reconstructor.takeBinaryData(b)) && (this.reconstructor = null, this.emit("decoded", b))
      }
    };
    l.prototype.destroy = function() {
      this.reconstructor && this.reconstructor.finishedReconstruction()
    };
    g.prototype.takeBinaryData = function(a) {
      return (this.buffers.push(a), this.buffers.length === this.reconPack.attachments) ? (a = q.reconstructPacket(this.reconPack, this.buffers), this.finishedReconstruction(), a) : null
    };
    g.prototype.finishedReconstruction = function() {
      this.reconPack = null;
      this.buffers = []
    }
  }, function(b, a, d) {
    function f(a) {
      if (a) {
        for (var b in f.prototype) a[b] = f.prototype[b];
        return a
      }
    }
    b.exports = f;
    f.prototype.on = f.prototype.addEventListener = function(a, b) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" +
      a] = this._callbacks["$" + a] || []).push(b), this
    };
    f.prototype.once = function(a, b) {
      function c() {
        this.off(a, c);
        b.apply(this, arguments)
      }
      return c.fn = b, this.on(a, c), this
    };
    f.prototype.off = f.prototype.removeListener = f.prototype.removeAllListeners = f.prototype.removeEventListener = function(a, b) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var c = this._callbacks["$" + a];
      if (!c) return this;
      if (1 == arguments.length) return delete this._callbacks["$" + a], this;
      for (var e, d = 0; d < c.length; d++)
        if (e =
            c[d], e === b || e.fn === b) {
          c.splice(d, 1);
          break
        }
      return this
    };
    f.prototype.emit = function(a) {
      this._callbacks = this._callbacks || {};
      var b = [].slice.call(arguments, 1),
        e = this._callbacks["$" + a];
      if (e) {
        e = e.slice(0);
        for (var d = 0, f = e.length; d < f; ++d) e[d].apply(this, b)
      }
      return this
    };
    f.prototype.listeners = function(a) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + a] || []
    };
    f.prototype.hasListeners = function(a) {
      return !!this.listeners(a).length
    }
  }, function(b, a, d) {
    (function(a) {
      function e(b) {
        if (!b || "object" != typeof b) return !1;
        if (c(b)) {
          for (var d = 0, f = b.length; d < f; d++)
            if (e(b[d])) return !0;
          return !1
        }
        if ("function" == typeof a.Buffer && a.Buffer.isBuffer && a.Buffer.isBuffer(b) || "function" == typeof a.ArrayBuffer && b instanceof ArrayBuffer || g && b instanceof Blob || k && b instanceof File) return !0;
        if (b.toJSON && "function" == typeof b.toJSON && 1 === arguments.length) return e(b.toJSON(), !0);
        for (d in b)
          if (Object.prototype.hasOwnProperty.call(b, d) && e(b[d])) return !0;
        return !1
      }
      var c = d(10),
        f = Object.prototype.toString,
        g = "function" == typeof a.Blob || "[object BlobConstructor]" ===
          f.call(a.Blob),
        k = "function" == typeof a.File || "[object FileConstructor]" === f.call(a.File);
      b.exports = e
    }).call(a, function() {
      return this
    }())
  }, function(b, a) {
    var d = {}.toString;
    b.exports = Array.isArray || function(a) {
        return "[object Array]" == d.call(a)
      }
  }, function(b, a, d) {
    (function(b) {
      function e(a, b) {
        if (!a) return a;
        if (g(a)) {
          var c = {
            _placeholder: !0,
            num: b.length
          };
          return b.push(a), c
        }
        if (f(a)) {
          c = Array(a.length);
          for (var d = 0; d < a.length; d++) c[d] = e(a[d], b);
          return c
        }
        if ("object" == typeof a && !(a instanceof Date)) {
          c = {};
          for (d in a) c[d] =
            e(a[d], b);
          return c
        }
        return a
      }

      function c(a, b) {
        if (!a) return a;
        if (a && a._placeholder) return b[a.num];
        if (f(a))
          for (var e = 0; e < a.length; e++) a[e] = c(a[e], b);
        else if ("object" == typeof a)
          for (e in a) a[e] = c(a[e], b);
        return a
      }
      var f = d(10),
        g = d(12),
        k = Object.prototype.toString,
        m = "function" == typeof b.Blob || "[object BlobConstructor]" === k.call(b.Blob),
        n = "function" == typeof b.File || "[object FileConstructor]" === k.call(b.File);
      a.deconstructPacket = function(a) {
        var b = [];
        return a.data = e(a.data, b), a.attachments = b.length, {
          packet: a,
          buffers: b
        }
      };
      a.reconstructPacket = function(a, b) {
        return a.data = c(a.data, b), a.attachments = void 0, a
      };
      a.removeBlobs = function(a, b) {
        function c(a, l, x) {
          if (!a) return a;
          if (m && a instanceof Blob || n && a instanceof File) {
            e++;
            var k = new FileReader;
            k.onload = function() {
              x ? x[l] = this.result : d = this.result;
              --e || b(d)
            };
            k.readAsArrayBuffer(a)
          } else if (f(a))
            for (k = 0; k < a.length; k++) c(a[k], k, a);
          else if ("object" == typeof a && !g(a))
            for (k in a) c(a[k], k, a)
        }
        var e = 0,
          d = a;
        c(d);
        e || b(d)
      }
    }).call(a, function() {
      return this
    }())
  }, function(b, a) {
    (function(a) {
      b.exports =
        function(b) {
          return a.Buffer && a.Buffer.isBuffer(b) || a.ArrayBuffer && b instanceof ArrayBuffer
        }
    }).call(a, function() {
      return this
    }())
  }, function(b, a, d) {
    function f(a, b) {
      if (!(this instanceof f)) return new f(a, b);
      a && "object" === ("undefined" == typeof a ? "undefined" : e(a)) && (b = a, a = void 0);
      b = b || {};
      b.path = b.path || "/socket.io";
      this.nsps = {};
      this.subs = [];
      this.opts = b;
      this.reconnection(!1 !== b.reconnection);
      this.reconnectionAttempts(b.reconnectionAttempts || 1 / 0);
      this.reconnectionDelay(b.reconnectionDelay || 1E3);
      this.reconnectionDelayMax(b.reconnectionDelayMax ||
        5E3);
      this.randomizationFactor(b.randomizationFactor || .5);
      this.backoff = new t({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == b.timeout ? 2E4 : b.timeout);
      this.readyState = "closed";
      this.uri = a;
      this.connecting = [];
      this.lastPing = null;
      this.encoding = !1;
      this.packetBuffer = [];
      a = b.parser || g;
      this.encoder = new a.Encoder;
      this.decoder = new a.Decoder;
      (this.autoConnect = !1 !== b.autoConnect) && this.open()
    }
    var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
        function(a) {
          return typeof a
        } : function(a) {
          return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        },
      c = d(14),
      l = d(39);
    a = d(8);
    var g = d(7),
      k = d(41),
      m = d(42),
      n = d(3)("socket.io-client:manager"),
      q = d(37),
      t = d(43),
      u = Object.prototype.hasOwnProperty;
    b.exports = f;
    f.prototype.emitAll = function() {
      this.emit.apply(this, arguments);
      for (var a in this.nsps) u.call(this.nsps, a) && this.nsps[a].emit.apply(this.nsps[a], arguments)
    };
    f.prototype.updateSocketIds = function() {
      for (var a in this.nsps) u.call(this.nsps,
        a) && (this.nsps[a].id = this.generateId(a))
    };
    f.prototype.generateId = function(a) {
      return ("/" === a ? "" : a + "#") + this.engine.id
    };
    a(f.prototype);
    f.prototype.reconnection = function(a) {
      return arguments.length ? (this._reconnection = !!a, this) : this._reconnection
    };
    f.prototype.reconnectionAttempts = function(a) {
      return arguments.length ? (this._reconnectionAttempts = a, this) : this._reconnectionAttempts
    };
    f.prototype.reconnectionDelay = function(a) {
      return arguments.length ? (this._reconnectionDelay = a, this.backoff && this.backoff.setMin(a),
        this) : this._reconnectionDelay
    };
    f.prototype.randomizationFactor = function(a) {
      return arguments.length ? (this._randomizationFactor = a, this.backoff && this.backoff.setJitter(a), this) : this._randomizationFactor
    };
    f.prototype.reconnectionDelayMax = function(a) {
      return arguments.length ? (this._reconnectionDelayMax = a, this.backoff && this.backoff.setMax(a), this) : this._reconnectionDelayMax
    };
    f.prototype.timeout = function(a) {
      return arguments.length ? (this._timeout = a, this) : this._timeout
    };
    f.prototype.maybeReconnectOnOpen = function() {
      !this.reconnecting &&
      this._reconnection && 0 === this.backoff.attempts && this.reconnect()
    };
    f.prototype.open = f.prototype.connect = function(a, b) {
      if (n("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
      n("opening %s", this.uri);
      var e = this.engine = c(this.uri, this.opts),
        d = this;
      this.readyState = "opening";
      this.skipReconnect = !1;
      var f = k(e, "open", function() {
        d.onopen();
        a && a()
      });
      b = k(e, "error", function(b) {
        if (n("connect_error"), d.cleanup(), d.readyState = "closed", d.emitAll("connect_error", b), a) {
          var c = Error("Connection error");
          c.data = b;
          a(c)
        } else d.maybeReconnectOnOpen()
      });
      if (!1 !== this._timeout) {
        var g = this._timeout;
        n("connect attempt will timeout after %d", g);
        var l = setTimeout(function() {
          n("connect attempt timed out after %d", g);
          f.destroy();
          e.close();
          e.emit("error", "timeout");
          d.emitAll("connect_timeout", g)
        }, g);
        this.subs.push({
          destroy: function() {
            clearTimeout(l)
          }
        })
      }
      return this.subs.push(f), this.subs.push(b), this
    };
    f.prototype.onopen = function() {
      n("open");
      this.cleanup();
      this.readyState = "open";
      this.emit("open");
      var a = this.engine;
      this.subs.push(k(a, "data", m(this, "ondata")));
      this.subs.push(k(a, "ping", m(this, "onping")));
      this.subs.push(k(a, "pong", m(this, "onpong")));
      this.subs.push(k(a, "error", m(this, "onerror")));
      this.subs.push(k(a, "close", m(this, "onclose")));
      this.subs.push(k(this.decoder, "decoded", m(this, "ondecoded")))
    };
    f.prototype.onping = function() {
      this.lastPing = new Date;
      this.emitAll("ping")
    };
    f.prototype.onpong = function() {
      this.emitAll("pong", new Date - this.lastPing)
    };
    f.prototype.ondata = function(a) {
      this.decoder.add(a)
    };
    f.prototype.ondecoded =
      function(a) {
        this.emit("packet", a)
      };
    f.prototype.onerror = function(a) {
      n("error", a);
      this.emitAll("error", a)
    };
    f.prototype.socket = function(a, b) {
      function c() {
        ~q(d.connecting, e) || d.connecting.push(e)
      }
      var e = this.nsps[a];
      if (!e) {
        e = new l(this, a, b);
        this.nsps[a] = e;
        var d = this;
        e.on("connecting", c);
        e.on("connect", function() {
          e.id = d.generateId(a)
        });
        this.autoConnect && c()
      }
      return e
    };
    f.prototype.destroy = function(a) {
      a = q(this.connecting, a);
      ~a && this.connecting.splice(a, 1);
      this.connecting.length || this.close()
    };
    f.prototype.packet =
      function(a) {
        n("writing packet %j", a);
        var b = this;
        a.query && 0 === a.type && (a.nsp += "?" + a.query);
        b.encoding ? b.packetBuffer.push(a) : (b.encoding = !0, this.encoder.encode(a, function(c) {
          for (var e = 0; e < c.length; e++) b.engine.write(c[e], a.options);
          b.encoding = !1;
          b.processPacketQueue()
        }))
      };
    f.prototype.processPacketQueue = function() {
      if (0 < this.packetBuffer.length && !this.encoding) {
        var a = this.packetBuffer.shift();
        this.packet(a)
      }
    };
    f.prototype.cleanup = function() {
      n("cleanup");
      for (var a = this.subs.length, b = 0; b < a; b++) this.subs.shift().destroy();
      this.packetBuffer = [];
      this.encoding = !1;
      this.lastPing = null;
      this.decoder.destroy()
    };
    f.prototype.close = f.prototype.disconnect = function() {
      n("disconnect");
      this.skipReconnect = !0;
      this.reconnecting = !1;
      "opening" === this.readyState && this.cleanup();
      this.backoff.reset();
      this.readyState = "closed";
      this.engine && this.engine.close()
    };
    f.prototype.onclose = function(a) {
      n("onclose");
      this.cleanup();
      this.backoff.reset();
      this.readyState = "closed";
      this.emit("close", a);
      this._reconnection && !this.skipReconnect && this.reconnect()
    };
    f.prototype.reconnect = function() {
      if (this.reconnecting || this.skipReconnect) return this;
      var a = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) n("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
      else {
        var b = this.backoff.duration();
        n("will wait %dms before reconnect attempt", b);
        this.reconnecting = !0;
        var c = setTimeout(function() {
          a.skipReconnect || (n("attempting reconnect"), a.emitAll("reconnect_attempt", a.backoff.attempts), a.emitAll("reconnecting", a.backoff.attempts),
          a.skipReconnect || a.open(function(b) {
            b ? (n("reconnect attempt error"), a.reconnecting = !1, a.reconnect(), a.emitAll("reconnect_error", b.data)) : (n("reconnect success"), a.onreconnect())
          }))
        }, b);
        this.subs.push({
          destroy: function() {
            clearTimeout(c)
          }
        })
      }
    };
    f.prototype.onreconnect = function() {
      var a = this.backoff.attempts;
      this.reconnecting = !1;
      this.backoff.reset();
      this.updateSocketIds();
      this.emitAll("reconnect", a)
    }
  }, function(b, a, d) {
    b.exports = d(15)
  }, function(b, a, d) {
    b.exports = d(16);
    b.exports.parser = d(23)
  }, function(b, a,
              d) {
    (function(a) {
      function e(b, c) {
        if (!(this instanceof e)) return new e(b, c);
        c = c || {};
        b && "object" == typeof b && (c = b, b = null);
        b ? (b = n(b), c.hostname = b.host, c.secure = "https" === b.protocol || "wss" === b.protocol, c.port = b.port, b.query && (c.query = b.query)) : c.host && (c.hostname = n(c.host).host);
        this.secure = null != c.secure ? c.secure : a.location && "https:" === location.protocol;
        c.hostname && !c.port && (c.port = this.secure ? "443" : "80");
        this.agent = c.agent || !1;
        this.hostname = c.hostname || (a.location ? location.hostname : "localhost");
        this.port =
          c.port || (a.location && location.port ? location.port : this.secure ? 443 : 80);
        this.query = c.query || {};
        "string" == typeof this.query && (this.query = t.decode(this.query));
        this.upgrade = !1 !== c.upgrade;
        this.path = (c.path || "/engine.io").replace(/\/$/, "") + "/";
        this.forceJSONP = !!c.forceJSONP;
        this.jsonp = !1 !== c.jsonp;
        this.forceBase64 = !!c.forceBase64;
        this.enablesXDR = !!c.enablesXDR;
        this.timestampParam = c.timestampParam || "t";
        this.timestampRequests = c.timestampRequests;
        this.transports = c.transports || ["polling", "websocket"];
        this.transportOptions =
          c.transportOptions || {};
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.policyPort = c.policyPort || 843;
        this.rememberUpgrade = c.rememberUpgrade || !1;
        this.binaryType = null;
        this.onlyBinaryUpgrades = c.onlyBinaryUpgrades;
        this.perMessageDeflate = !1 !== c.perMessageDeflate && (c.perMessageDeflate || {});
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {});
        this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024);
        this.pfx = c.pfx || null;
        this.key = c.key || null;
        this.passphrase = c.passphrase || null;
        this.cert = c.cert || null;
        this.ca = c.ca || null;
        this.ciphers = c.ciphers || null;
        this.rejectUnauthorized = void 0 === c.rejectUnauthorized || c.rejectUnauthorized;
        this.forceNode = !!c.forceNode;
        b = "object" == typeof a && a;
        b.global === b && (c.extraHeaders && 0 < Object.keys(c.extraHeaders).length && (this.extraHeaders = c.extraHeaders), c.localAddress && (this.localAddress = c.localAddress));
        this.pingTimeoutTimer = this.pingIntervalTimer = this.pingTimeout = this.pingInterval = this.upgrades = this.id = null;
        this.open()
      }
      var c = d(17),
        f = d(8),
        g = d(3)("engine.io-client:socket"),
        k = d(37),
        m = d(23),
        n = d(2),
        q = d(38),
        t = d(31);
      b.exports = e;
      e.priorWebsocketSuccess = !1;
      f(e.prototype);
      e.protocol = m.protocol;
      e.Socket = e;
      e.Transport = d(22);
      e.transports = d(17);
      e.parser = d(23);
      e.prototype.createTransport = function(a) {
        g('creating transport "%s"', a);
        var b = this.query,
          e = {},
          d;
        for (d in b) b.hasOwnProperty(d) && (e[d] = b[d]);
        e.EIO = m.protocol;
        e.transport = a;
        b = this.transportOptions[a] || {};
        this.id && (e.sid = this.id);
        return new c[a]({
          query: e,
          socket: this,
          agent: b.agent ||
          this.agent,
          hostname: b.hostname || this.hostname,
          port: b.port || this.port,
          secure: b.secure || this.secure,
          path: b.path || this.path,
          forceJSONP: b.forceJSONP || this.forceJSONP,
          jsonp: b.jsonp || this.jsonp,
          forceBase64: b.forceBase64 || this.forceBase64,
          enablesXDR: b.enablesXDR || this.enablesXDR,
          timestampRequests: b.timestampRequests || this.timestampRequests,
          timestampParam: b.timestampParam || this.timestampParam,
          policyPort: b.policyPort || this.policyPort,
          pfx: b.pfx || this.pfx,
          key: b.key || this.key,
          passphrase: b.passphrase || this.passphrase,
          cert: b.cert || this.cert,
          ca: b.ca || this.ca,
          ciphers: b.ciphers || this.ciphers,
          rejectUnauthorized: b.rejectUnauthorized || this.rejectUnauthorized,
          perMessageDeflate: b.perMessageDeflate || this.perMessageDeflate,
          extraHeaders: b.extraHeaders || this.extraHeaders,
          forceNode: b.forceNode || this.forceNode,
          localAddress: b.localAddress || this.localAddress,
          requestTimeout: b.requestTimeout || this.requestTimeout,
          protocols: b.protocols || void 0
        })
      };
      e.prototype.open = function() {
        if (this.rememberUpgrade && e.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) var a =
          "websocket";
        else {
          if (0 === this.transports.length) {
            var b = this;
            return void setTimeout(function() {
              b.emit("error", "No transports available")
            }, 0)
          }
          a = this.transports[0]
        }
        this.readyState = "opening";
        try {
          a = this.createTransport(a)
        } catch (D) {
          return this.transports.shift(), void this.open()
        }
        a.open();
        this.setTransport(a)
      };
      e.prototype.setTransport = function(a) {
        g("setting transport %s", a.name);
        var b = this;
        this.transport && (g("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners());
        this.transport =
          a;
        a.on("drain", function() {
          b.onDrain()
        }).on("packet", function(a) {
          b.onPacket(a)
        }).on("error", function(a) {
          b.onError(a)
        }).on("close", function() {
          b.onClose("transport close")
        })
      };
      e.prototype.probe = function(a) {
        function b() {
          if (t.onlyBinaryUpgrades) {
            var b = !this.supportsBinary && t.transport.supportsBinary;
            u = u || b
          }
          u || (g('probe transport "%s" opened', a), n.send([{
            type: "ping",
            data: "probe"
          }]), n.once("packet", function(b) {
            if (!u)
              if ("pong" === b.type && "probe" === b.data) {
                if (g('probe transport "%s" pong', a), t.upgrading = !0,
                    t.emit("upgrading", n), n) e.priorWebsocketSuccess = "websocket" === n.name, g('pausing current transport "%s"', t.transport.name), t.transport.pause(function() {
                  u || "closed" !== t.readyState && (g("changing transport and sending upgrade packet"), q(), t.setTransport(n), n.send([{
                    type: "upgrade"
                  }]), t.emit("upgrade", n), n = null, t.upgrading = !1, t.flush())
                })
              } else g('probe transport "%s" failed', a), b = Error("probe error"), b.transport = n.name, t.emit("upgradeError", b)
          }))
        }

        function c() {
          u || (u = !0, q(), n.close(), n = null)
        }

        function d(b) {
          var e =
            Error("probe error: " + b);
          e.transport = n.name;
          c();
          g('probe transport "%s" failed because of error: %s', a, b);
          t.emit("upgradeError", e)
        }

        function f() {
          d("transport closed")
        }

        function l() {
          d("socket closed")
        }

        function k(a) {
          n && a.name !== n.name && (g('"%s" works - aborting "%s"', a.name, n.name), c())
        }

        function q() {
          n.removeListener("open", b);
          n.removeListener("error", d);
          n.removeListener("close", f);
          t.removeListener("close", l);
          t.removeListener("upgrading", k)
        }
        g('probing transport "%s"', a);
        var n = this.createTransport(a, {
            probe: 1
          }),
          u = !1,
          t = this;
        e.priorWebsocketSuccess = !1;
        n.once("open", b);
        n.once("error", d);
        n.once("close", f);
        this.once("close", l);
        this.once("upgrading", k);
        n.open()
      };
      e.prototype.onOpen = function() {
        if (g("socket open"), this.readyState = "open", e.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
          g("starting upgrade probes");
          for (var a = 0, b = this.upgrades.length; a < b; a++) this.probe(this.upgrades[a])
        }
      };
      e.prototype.onPacket = function(a) {
        if ("opening" ===
          this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (g('socket receive: type "%s", data "%s"', a.type, a.data), this.emit("packet", a), this.emit("heartbeat"), a.type) {
          case "open":
            this.onHandshake(q(a.data));
            break;
          case "pong":
            this.setPing();
            this.emit("pong");
            break;
          case "error":
            var b = Error("server error");
            b.code = a.data;
            this.onError(b);
            break;
          case "message":
            this.emit("data", a.data), this.emit("message", a.data)
        } else g('packet received with socket readyState "%s"', this.readyState)
      };
      e.prototype.onHandshake =
        function(a) {
          this.emit("handshake", a);
          this.id = a.sid;
          this.transport.query.sid = a.sid;
          this.upgrades = this.filterUpgrades(a.upgrades);
          this.pingInterval = a.pingInterval;
          this.pingTimeout = a.pingTimeout;
          this.onOpen();
          "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
        };
      e.prototype.onHeartbeat = function(a) {
        clearTimeout(this.pingTimeoutTimer);
        var b = this;
        b.pingTimeoutTimer = setTimeout(function() {
            "closed" !== b.readyState && b.onClose("ping timeout")
          },
          a || b.pingInterval + b.pingTimeout)
      };
      e.prototype.setPing = function() {
        var a = this;
        clearTimeout(a.pingIntervalTimer);
        a.pingIntervalTimer = setTimeout(function() {
          g("writing ping packet - expecting pong within %sms", a.pingTimeout);
          a.ping();
          a.onHeartbeat(a.pingTimeout)
        }, a.pingInterval)
      };
      e.prototype.ping = function() {
        var a = this;
        this.sendPacket("ping", function() {
          a.emit("ping")
        })
      };
      e.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        this.prevBufferLen = 0;
        0 === this.writeBuffer.length ? this.emit("drain") :
          this.flush()
      };
      e.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (g("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
      };
      e.prototype.write = e.prototype.send = function(a, b, c) {
        return this.sendPacket("message", a, b, c), this
      };
      e.prototype.sendPacket = function(a, b, c, e) {
        if ("function" == typeof b && (e = b, b = void 0), "function" == typeof c && (e =
            c, c = null), "closing" !== this.readyState && "closed" !== this.readyState) c = c || {}, c.compress = !1 !== c.compress, a = {
          type: a,
          data: b,
          options: c
        }, this.emit("packetCreate", a), this.writeBuffer.push(a), e && this.once("flush", e), this.flush()
      };
      e.prototype.close = function() {
        function a() {
          e.onClose("forced close");
          g("socket closing - telling transport to close");
          e.transport.close()
        }

        function b() {
          e.removeListener("upgrade", b);
          e.removeListener("upgradeError", b);
          a()
        }

        function c() {
          e.once("upgrade", b);
          e.once("upgradeError", b)
        }
        if ("opening" ===
          this.readyState || "open" === this.readyState) {
          this.readyState = "closing";
          var e = this;
          this.writeBuffer.length ? this.once("drain", function() {
            this.upgrading ? c() : a()
          }) : this.upgrading ? c() : a()
        }
        return this
      };
      e.prototype.onError = function(a) {
        g("socket error %j", a);
        e.priorWebsocketSuccess = !1;
        this.emit("error", a);
        this.onClose("transport error", a)
      };
      e.prototype.onClose = function(a, b) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) g('socket close with reason: "%s"', a), clearTimeout(this.pingIntervalTimer),
          clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", a, b), this.writeBuffer = [], this.prevBufferLen = 0
      };
      e.prototype.filterUpgrades = function(a) {
        for (var b = [], c = 0, e = a.length; c < e; c++) ~k(this.transports, a[c]) && b.push(a[c]);
        return b
      }
    }).call(a, function() {
      return this
    }())
  }, function(b, a, d) {
    (function(b) {
      var e = d(18),
        c = d(20),
        f = d(34),
        g = d(35);
      a.polling = function(a) {
        var d, g = !1,
          l = !1,
          k = !1 !== a.jsonp;
        b.location && (l = "https:" === location.protocol, (g = location.port) || (g = l ? 443 : 80), g = a.hostname !== location.hostname || g !== a.port, l = a.secure !== l);
        if (a.xdomain = g, a.xscheme = l, d = new e(a), "open" in d && !a.forceJSONP) return new c(a);
        if (!k) throw Error("JSONP disabled");
        return new f(a)
      };
      a.websocket = g
    }).call(a, function() {
      return this
    }())
  }, function(b, a, d) {
    (function(a) {
      var e = d(19);
      b.exports = function(b) {
        var c = b.xdomain,
          d = b.xscheme;
        b = b.enablesXDR;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!c || e)) return new XMLHttpRequest
        } catch (k) {}
        try {
          if ("undefined" !=
            typeof XDomainRequest && !d && b) return new XDomainRequest
        } catch (k) {}
        if (!c) try {
          return new(a[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
        } catch (k) {}
      }
    }).call(a, function() {
      return this
    }())
  }, function(b, a) {
    try {
      b.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
    } catch (d) {
      b.exports = !1
    }
  }, function(b, a, d) {
    (function(a) {
      function e() {}

      function c(b) {
        if (m.call(this, b), this.requestTimeout = b.requestTimeout, this.extraHeaders = b.extraHeaders, a.location) {
          var c = "https:" === location.protocol,
            e = location.port;
          e || (e = c ? 443 : 80);
          this.xd = b.hostname !== a.location.hostname || e !== b.port;
          this.xs = b.secure !== c
        }
      }

      function f(a) {
        this.method = a.method || "GET";
        this.uri = a.uri;
        this.xd = !!a.xd;
        this.xs = !!a.xs;
        this.async = !1 !== a.async;
        this.data = void 0 !== a.data ? a.data : null;
        this.agent = a.agent;
        this.isBinary = a.isBinary;
        this.supportsBinary = a.supportsBinary;
        this.enablesXDR = a.enablesXDR;
        this.requestTimeout = a.requestTimeout;
        this.pfx = a.pfx;
        this.key = a.key;
        this.passphrase = a.passphrase;
        this.cert = a.cert;
        this.ca = a.ca;
        this.ciphers =
          a.ciphers;
        this.rejectUnauthorized = a.rejectUnauthorized;
        this.extraHeaders = a.extraHeaders;
        this.create()
      }

      function g() {
        for (var a in f.requests) f.requests.hasOwnProperty(a) && f.requests[a].abort()
      }
      var k = d(18),
        m = d(21),
        n = d(8),
        q = d(32),
        t = d(3)("engine.io-client:polling-xhr");
      b.exports = c;
      b.exports.Request = f;
      q(c, m);
      c.prototype.supportsBinary = !0;
      c.prototype.request = function(a) {
        return a = a || {}, a.uri = this.uri(), a.xd = this.xd, a.xs = this.xs, a.agent = this.agent || !1, a.supportsBinary = this.supportsBinary, a.enablesXDR = this.enablesXDR,
          a.pfx = this.pfx, a.key = this.key, a.passphrase = this.passphrase, a.cert = this.cert, a.ca = this.ca, a.ciphers = this.ciphers, a.rejectUnauthorized = this.rejectUnauthorized, a.requestTimeout = this.requestTimeout, a.extraHeaders = this.extraHeaders, new f(a)
      };
      c.prototype.doWrite = function(a, b) {
        a = this.request({
          method: "POST",
          data: a,
          isBinary: "string" != typeof a && void 0 !== a
        });
        var c = this;
        a.on("success", b);
        a.on("error", function(a) {
          c.onError("xhr post error", a)
        });
        this.sendXhr = a
      };
      c.prototype.doPoll = function() {
        t("xhr poll");
        var a =
            this.request(),
          b = this;
        a.on("data", function(a) {
          b.onData(a)
        });
        a.on("error", function(a) {
          b.onError("xhr poll error", a)
        });
        this.pollXhr = a
      };
      n(f.prototype);
      f.prototype.create = function() {
        var b = {
          agent: this.agent,
          xdomain: this.xd,
          xscheme: this.xs,
          enablesXDR: this.enablesXDR
        };
        b.pfx = this.pfx;
        b.key = this.key;
        b.passphrase = this.passphrase;
        b.cert = this.cert;
        b.ca = this.ca;
        b.ciphers = this.ciphers;
        b.rejectUnauthorized = this.rejectUnauthorized;
        var c = this.xhr = new k(b),
          e = this;
        try {
          t("xhr open %s: %s", this.method, this.uri);
          c.open(this.method,
            this.uri, this.async);
          try {
            if (this.extraHeaders) {
              c.setDisableHeaderCheck && c.setDisableHeaderCheck(!0);
              for (var d in this.extraHeaders) this.extraHeaders.hasOwnProperty(d) && c.setRequestHeader(d, this.extraHeaders[d])
            }
          } catch (z) {}
          if ("POST" === this.method) try {
            this.isBinary ? c.setRequestHeader("Content-type", "application/octet-stream") : c.setRequestHeader("Content-type", "text/plain;charset\x3dUTF-8")
          } catch (z) {}
          try {
            c.setRequestHeader("Accept", "*/*")
          } catch (z) {}
          "withCredentials" in c && (c.withCredentials = !0);
          this.requestTimeout &&
          (c.timeout = this.requestTimeout);
          this.hasXDR() ? (c.onload = function() {
            e.onLoad()
          }, c.onerror = function() {
            e.onError(c.responseText)
          }) : c.onreadystatechange = function() {
            if (2 === c.readyState) {
              try {
                var a = c.getResponseHeader("Content-Type")
              } catch (w) {}
              "application/octet-stream" === a && (c.responseType = "arraybuffer")
            }
            4 === c.readyState && (200 === c.status || 1223 === c.status ? e.onLoad() : setTimeout(function() {
              e.onError(c.status)
            }, 0))
          };
          t("xhr data %s", this.data);
          c.send(this.data)
        } catch (z) {
          return void setTimeout(function() {
              e.onError(z)
            },
            0)
        }
        a.document && (this.index = f.requestsCount++, f.requests[this.index] = this)
      };
      f.prototype.onSuccess = function() {
        this.emit("success");
        this.cleanup()
      };
      f.prototype.onData = function(a) {
        this.emit("data", a);
        this.onSuccess()
      };
      f.prototype.onError = function(a) {
        this.emit("error", a);
        this.cleanup(!0)
      };
      f.prototype.cleanup = function(b) {
        if ("undefined" != typeof this.xhr && null !== this.xhr) {
          if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = e : this.xhr.onreadystatechange = e, b) try {
            this.xhr.abort()
          } catch (x) {}
          a.document && delete f.requests[this.index];
          this.xhr = null
        }
      };
      f.prototype.onLoad = function() {
        try {
          try {
            var a = this.xhr.getResponseHeader("Content-Type")
          } catch (D) {}
          var b = "application/octet-stream" === a ? this.xhr.response || this.xhr.responseText : this.xhr.responseText
        } catch (D) {
          this.onError(D)
        }
        null != b && this.onData(b)
      };
      f.prototype.hasXDR = function() {
        return "undefined" != typeof a.XDomainRequest && !this.xs && this.enablesXDR
      };
      f.prototype.abort = function() {
        this.cleanup()
      };
      f.requestsCount = 0;
      f.requests = {};
      a.document && (a.attachEvent ? a.attachEvent("onunload", g) : a.addEventListener &&
        a.addEventListener("beforeunload", g, !1))
    }).call(a, function() {
      return this
    }())
  }, function(b, a, d) {
    function f(a) {
      var b = a && a.forceBase64;
      m && !b || (this.supportsBinary = !1);
      e.call(this, a)
    }
    var e = d(22),
      c = d(31),
      l = d(23);
    a = d(32);
    var g = d(33),
      k = d(3)("engine.io-client:polling");
    b.exports = f;
    var m = null != (new(d(18))({
        xdomain: !1
      })).responseType;
    a(f, e);
    f.prototype.name = "polling";
    f.prototype.doOpen = function() {
      this.poll()
    };
    f.prototype.pause = function(a) {
      function b() {
        k("paused");
        c.readyState = "paused";
        a()
      }
      var c = this;
      if (this.readyState =
          "pausing", this.polling || !this.writable) {
        var e = 0;
        this.polling && (k("we are currently polling - waiting to pause"), e++, this.once("pollComplete", function() {
          k("pre-pause polling complete");
          --e || b()
        }));
        this.writable || (k("we are currently writing - waiting to pause"), e++, this.once("drain", function() {
          k("pre-pause writing complete");
          --e || b()
        }))
      } else b()
    };
    f.prototype.poll = function() {
      k("polling");
      this.polling = !0;
      this.doPoll();
      this.emit("poll")
    };
    f.prototype.onData = function(a) {
      var b = this;
      k("polling got data %s",
        a);
      l.decodePayload(a, this.socket.binaryType, function(a, c, e) {
        return "opening" === b.readyState && b.onOpen(), "close" === a.type ? (b.onClose(), !1) : void b.onPacket(a)
      });
      "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : k('ignoring poll - transport state "%s"', this.readyState))
    };
    f.prototype.doClose = function() {
      function a() {
        k("writing close packet");
        b.write([{
          type: "close"
        }])
      }
      var b = this;
      "open" === this.readyState ? (k("transport open - closing"), a()) : (k("transport not open - deferring close"),
        this.once("open", a))
    };
    f.prototype.write = function(a) {
      var b = this;
      this.writable = !1;
      var c = function() {
        b.writable = !0;
        b.emit("drain")
      };
      l.encodePayload(a, this.supportsBinary, function(a) {
        b.doWrite(a, c)
      })
    };
    f.prototype.uri = function() {
      var a = this.query || {},
        b = this.secure ? "https" : "http",
        e = "";
      !1 !== this.timestampRequests && (a[this.timestampParam] = g());
      this.supportsBinary || a.sid || (a.b64 = 1);
      a = c.encode(a);
      this.port && ("https" === b && 443 !== Number(this.port) || "http" === b && 80 !== Number(this.port)) && (e = ":" + this.port);
      a.length &&
      (a = "?" + a);
      var d = -1 !== this.hostname.indexOf(":");
      return b + "://" + (d ? "[" + this.hostname + "]" : this.hostname) + e + this.path + a
    }
  }, function(b, a, d) {
    function f(a) {
      this.path = a.path;
      this.hostname = a.hostname;
      this.port = a.port;
      this.secure = a.secure;
      this.query = a.query;
      this.timestampParam = a.timestampParam;
      this.timestampRequests = a.timestampRequests;
      this.readyState = "";
      this.agent = a.agent || !1;
      this.socket = a.socket;
      this.enablesXDR = a.enablesXDR;
      this.pfx = a.pfx;
      this.key = a.key;
      this.passphrase = a.passphrase;
      this.cert = a.cert;
      this.ca =
        a.ca;
      this.ciphers = a.ciphers;
      this.rejectUnauthorized = a.rejectUnauthorized;
      this.forceNode = a.forceNode;
      this.extraHeaders = a.extraHeaders;
      this.localAddress = a.localAddress
    }
    var e = d(23);
    a = d(8);
    b.exports = f;
    a(f.prototype);
    f.prototype.onError = function(a, b) {
      a = Error(a);
      return a.type = "TransportError", a.description = b, this.emit("error", a), this
    };
    f.prototype.open = function() {
      return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
    };
    f.prototype.close = function() {
      return "opening" !==
      this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
    };
    f.prototype.send = function(a) {
      if ("open" !== this.readyState) throw Error("Transport not open");
      this.write(a)
    };
    f.prototype.onOpen = function() {
      this.readyState = "open";
      this.writable = !0;
      this.emit("open")
    };
    f.prototype.onData = function(a) {
      a = e.decodePacket(a, this.socket.binaryType);
      this.onPacket(a)
    };
    f.prototype.onPacket = function(a) {
      this.emit("packet", a)
    };
    f.prototype.onClose = function() {
      this.readyState = "closed";
      this.emit("close")
    }
  },
    function(b, a, d) {
      (function(b) {
        function e(b, c, e) {
          if (!c) return a.encodeBase64Packet(b, e);
          var d = new FileReader;
          return d.onload = function() {
            b.data = d.result;
            a.encodePacket(b, c, !0, e)
          }, d.readAsArrayBuffer(b.data)
        }

        function c(a, b, c) {
          var e = Array(a.length);
          c = n(a.length, c);
          for (var d = function(a, c, d) {
            b(c, function(b, c) {
              e[a] = c;
              d(b, e)
            })
          }, f = 0; f < a.length; f++) d(f, a[f], c)
        }
        var f, g = d(24),
          k = d(9),
          m = d(25),
          n = d(26),
          q = d(27);
        b && b.ArrayBuffer && (f = d(29));
        var t = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
          u =
            "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
          x = t || u;
        a.protocol = 3;
        var D = a.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
          },
          I = g(D),
          z = {
            type: "error",
            data: "parser error"
          },
          w = d(30);
        a.encodePacket = function(c, d, f, g) {
          "function" == typeof d && (g = d, d = !1);
          "function" == typeof f && (g = f, f = null);
          var l = void 0 === c.data ? void 0 : c.data.buffer || c.data;
          if (b.ArrayBuffer && l instanceof ArrayBuffer) {
            if (d) {
              f = c.data;
              d = new Uint8Array(f);
              f = new Uint8Array(1 + f.byteLength);
              f[0] = D[c.type];
              for (c =
                     0; c < d.length; c++) f[c + 1] = d[c];
              c = g(f.buffer)
            } else c = a.encodeBase64Packet(c, g);
            return c
          }
          if (w && l instanceof b.Blob) return d ? x ? c = e(c, d, g) : (d = new Uint8Array(1), d[0] = D[c.type], c = new w([d.buffer, c.data]), c = g(c)) : c = a.encodeBase64Packet(c, g), c;
          if (l && l.base64) return g("b" + a.packets[c.type] + c.data.data);
          d = D[c.type];
          return void 0 !== c.data && (d += f ? q.encode(String(c.data), {
            strict: !1
          }) : String(c.data)), g("" + d)
        };
        a.encodeBase64Packet = function(c, e) {
          var d = "b" + a.packets[c.type];
          if (w && c.data instanceof b.Blob) {
            var f = new FileReader;
            return f.onload = function() {
              var a = f.result.split(",")[1];
              e(d + a)
            }, f.readAsDataURL(c.data)
          }
          try {
            var g = String.fromCharCode.apply(null, new Uint8Array(c.data))
          } catch (xa) {
            c = new Uint8Array(c.data);
            g = Array(c.length);
            for (var l = 0; l < c.length; l++) g[l] = c[l];
            g = String.fromCharCode.apply(null, g)
          }
          return d += b.btoa(g), e(d)
        };
        a.decodePacket = function(b, c, e) {
          if (void 0 === b) return z;
          if ("string" == typeof b) {
            if ("b" === b.charAt(0)) return a.decodeBase64Packet(b.substr(1), c);
            if (c = e) {
              c = b;
              try {
                c = q.decode(c, {
                  strict: !1
                })
              } catch (K) {
                c = !1
              }
              c =
                (b = c, !1 === b)
            }
            if (c) return z;
            e = b.charAt(0);
            return Number(e) == e && I[e] ? 1 < b.length ? {
              type: I[e],
              data: b.substring(1)
            } : {
              type: I[e]
            } : z
          }
          e = (new Uint8Array(b))[0];
          b = m(b, 1);
          return w && "blob" === c && (b = new w([b])), {
            type: I[e],
            data: b
          }
        };
        a.decodeBase64Packet = function(a, b) {
          var c = I[a.charAt(0)];
          if (!f) return {
            type: c,
            data: {
              base64: !0,
              data: a.substr(1)
            }
          };
          a = f.decode(a.substr(1));
          return "blob" === b && w && (a = new w([a])), {
            type: c,
            data: a
          }
        };
        a.encodePayload = function(b, e, d) {
          function f(b, c) {
            a.encodePacket(b, !!g && e, !1, function(a) {
              c(null, a.length +
                ":" + a)
            })
          }
          "function" == typeof e && (d = e, e = null);
          var g = k(b);
          return e && g ? w && !x ? a.encodePayloadAsBlob(b, d) : a.encodePayloadAsArrayBuffer(b, d) : b.length ? void c(b, f, function(a, b) {
            return d(b.join(""))
          }) : d("0:")
        };
        a.decodePayload = function(b, c, e) {
          if ("string" != typeof b) return a.decodePayloadAsBinary(b, c, e);
          "function" == typeof c && (e = c, c = null);
          var d;
          if ("" === b) return e(z, 0, 1);
          for (var f, g, l = "", k = 0, q = b.length; k < q; k++) {
            var n = b.charAt(k);
            if (":" === n) {
              if ("" === l || l != (f = Number(l)) || (g = b.substr(k + 1, f), l != g.length)) return e(z,
                0, 1);
              if (g.length) {
                if (d = a.decodePacket(g, c, !1), z.type === d.type && z.data === d.data) return e(z, 0, 1);
                if (!1 === e(d, k + f, q)) return
              }
              k += f;
              l = ""
            } else l += n
          }
          return "" !== l ? e(z, 0, 1) : void 0
        };
        a.encodePayloadAsArrayBuffer = function(b, e) {
          function d(b, c) {
            a.encodePacket(b, !0, !0, function(a) {
              return c(null, a)
            })
          }
          return b.length ? void c(b, d, function(a, b) {
            a = b.reduce(function(a, b) {
              var c;
              return c = "string" == typeof b ? b.length : b.byteLength, a + c.toString().length + c + 2
            }, 0);
            var c = new Uint8Array(a),
              d = 0;
            return b.forEach(function(a) {
              var b = "string" ==
                  typeof a,
                e = a;
              if (b) {
                e = new Uint8Array(a.length);
                for (var f = 0; f < a.length; f++) e[f] = a.charCodeAt(f);
                e = e.buffer
              }
              b ? c[d++] = 0 : c[d++] = 1;
              a = e.byteLength.toString();
              for (f = 0; f < a.length; f++) c[d++] = parseInt(a[f]);
              c[d++] = 255;
              e = new Uint8Array(e);
              for (f = 0; f < e.length; f++) c[d++] = e[f]
            }), e(c.buffer)
          }) : e(new ArrayBuffer(0))
        };
        a.encodePayloadAsBlob = function(b, e) {
          c(b, function(b, c) {
            a.encodePacket(b, !0, !0, function(a) {
              var b = new Uint8Array(1);
              if (b[0] = 1, "string" == typeof a) {
                for (var e = new Uint8Array(a.length), d = 0; d < a.length; d++) e[d] =
                  a.charCodeAt(d);
                a = e.buffer;
                b[0] = 0
              }
              e = (a instanceof ArrayBuffer ? a.byteLength : a.size).toString();
              var f = new Uint8Array(e.length + 1);
              for (d = 0; d < e.length; d++) f[d] = parseInt(e[d]);
              if (f[e.length] = 255, w) a = new w([b.buffer, f.buffer, a]), c(null, a)
            })
          }, function(a, b) {
            return e(new w(b))
          })
        };
        a.decodePayloadAsBinary = function(b, c, e) {
          "function" == typeof c && (e = c, c = null);
          for (var d = []; 0 < b.byteLength;) {
            for (var f = new Uint8Array(b), g = 0 === f[0], l = "", k = 1; 255 !== f[k]; k++) {
              if (310 < l.length) return e(z, 0, 1);
              l += f[k]
            }
            b = m(b, 2 + l.length);
            l = parseInt(l);
            f = m(b, 0, l);
            if (g) try {
              f = String.fromCharCode.apply(null, new Uint8Array(f))
            } catch (Z) {
              for (g = new Uint8Array(f), f = "", k = 0; k < g.length; k++) f += String.fromCharCode(g[k])
            }
            d.push(f);
            b = m(b, l)
          }
          var q = d.length;
          d.forEach(function(b, d) {
            e(a.decodePacket(b, c, !0), d, q)
          })
        }
      }).call(a, function() {
        return this
      }())
    },
    function(b, a) {
      b.exports = Object.keys || function(a) {
          var b = [],
            e = Object.prototype.hasOwnProperty,
            c;
          for (c in a) e.call(a, c) && b.push(c);
          return b
        }
    },
    function(b, a) {
      b.exports = function(a, b, e) {
        var c = a.byteLength;
        if (b = b || 0, e = e || c,
            a.slice) return a.slice(b, e);
        if (0 > b && (b += c), 0 > e && (e += c), e > c && (e = c), b >= c || b >= e || 0 === c) return new ArrayBuffer(0);
        a = new Uint8Array(a);
        c = new Uint8Array(e - b);
        for (var d = 0; b < e; b++, d++) c[d] = a[b];
        return c.buffer
      }
    },
    function(b, a) {
      function d() {}
      b.exports = function(a, b, c) {
        function e(a, d) {
          if (0 >= e.count) throw Error("after called too many times");
          --e.count;
          a ? (f = !0, b(a), b = c) : 0 !== e.count || f || b(null, d)
        }
        var f = !1;
        return c = c || d, e.count = a, 0 === a ? b() : e
      }
    },
    function(b, a, d) {
      var f;
      (function(b, c) {
        ! function(c) {
          function e(a) {
            for (var b,
                   c, e = [], d = 0, f = a.length; d < f;) b = a.charCodeAt(d++), 55296 <= b && 56319 >= b && d < f ? (c = a.charCodeAt(d++), 56320 == (64512 & c) ? e.push(((1023 & b) << 10) + (1023 & c) + 65536) : (e.push(b), d--)) : e.push(b);
            return e
          }

          function d(a, b) {
            if (55296 <= a && 57343 >= a) {
              if (b) throw Error("Lone surrogate U+" + a.toString(16).toUpperCase() + " is not a scalar value");
              return !1
            }
            return !0
          }

          function l() {
            if (u >= t) throw Error("Invalid byte index");
            var a = 255 & q[u];
            if (u++, 128 == (192 & a)) return 63 & a;
            throw Error("Invalid continuation byte");
          }

          function n(a) {
            var b, c, e, f,
              g;
            if (u > t) throw Error("Invalid byte index");
            if (u == t) return !1;
            if (b = 255 & q[u], u++, 0 == (128 & b)) return b;
            if (192 == (224 & b)) {
              if (c = l(), g = (31 & b) << 6 | c, 128 <= g) return g;
              throw Error("Invalid continuation byte");
            }
            if (224 == (240 & b)) {
              if (c = l(), e = l(), g = (15 & b) << 12 | c << 6 | e, 2048 <= g) return d(g, a) ? g : 65533;
              throw Error("Invalid continuation byte");
            }
            if (240 == (248 & b) && (c = l(), e = l(), f = l(), g = (7 & b) << 18 | c << 12 | e << 6 | f, 65536 <= g && 1114111 >= g)) return g;
            throw Error("Invalid UTF-8 detected");
          }
          c = "object" == typeof a && a;
          "object" == typeof b && b && b.exports ==
          c && b;
          var q, t, u, x = String.fromCharCode;
          f = {
            version: "2.1.2",
            encode: function(a, b) {
              b = b || {};
              b = !1 !== b.strict;
              a = e(a);
              for (var c = a.length, f = -1, g = ""; ++f < c;) {
                var l = a[f];
                var k = b;
                if (0 == (4294967168 & l)) k = x(l);
                else {
                  var q = "";
                  k = (0 == (4294965248 & l) ? q = x(l >> 6 & 31 | 192) : 0 == (4294901760 & l) ? (d(l, k) || (l = 65533), q = x(l >> 12 & 15 | 224), q += x(l >> 6 & 63 | 128)) : 0 == (4292870144 & l) && (q = x(l >> 18 & 7 | 240), q += x(l >> 12 & 63 | 128), q += x(l >> 6 & 63 | 128)), q + x(63 & l | 128))
                }
                g += k
              }
              return g
            },
            decode: function(a, b) {
              b = b || {};
              b = !1 !== b.strict;
              q = e(a);
              t = q.length;
              u = 0;
              var c;
              for (a = []; !1 !== (c = n(b));) a.push(c);
              c = a.length;
              for (var d = -1, f = ""; ++d < c;) b = a[d], 65535 < b && (b -= 65536, f += x(b >>> 10 & 1023 | 55296), b = 56320 | 1023 & b), f += x(b);
              return f
            }
          };
          !(void 0 !== f && (b.exports = f))
        }(this)
      }).call(a, d(28)(b), function() {
        return this
      }())
    },
    function(b, a) {
      b.exports = function(a) {
        return a.webpackPolyfill || (a.deprecate = function() {}, a.paths = [], a.children = [], a.webpackPolyfill = 1), a
      }
    },
    function(b, a) {
      ! function() {
        for (var b = new Uint8Array(256), f = 0; 64 > f; f++) b["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(f)] =
          f;
        a.encode = function(a) {
          var b = new Uint8Array(a),
            e = b.length,
            d = "";
          for (a = 0; a < e; a += 3) d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [b[a] >> 2], d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(3 & b[a]) << 4 | b[a + 1] >> 4], d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(15 & b[a + 1]) << 2 | b[a + 2] >> 6], d += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [63 & b[a + 2]];
          return 2 === e % 3 ? d = d.substring(0, d.length - 1) + "\x3d" : 1 === e % 3 && (d = d.substring(0,
                d.length - 2) + "\x3d\x3d"), d
        };
        a.decode = function(a) {
          var c = .75 * a.length;
          var e = a.length,
            d = 0;
          "\x3d" === a[a.length - 1] && (c--, "\x3d" === a[a.length - 2] && c--);
          var f = new ArrayBuffer(c),
            m = new Uint8Array(f);
          for (c = 0; c < e; c += 4) {
            var n = b[a.charCodeAt(c)];
            var q = b[a.charCodeAt(c + 1)];
            var t = b[a.charCodeAt(c + 2)];
            var u = b[a.charCodeAt(c + 3)];
            m[d++] = n << 2 | q >> 4;
            m[d++] = (15 & q) << 4 | t >> 2;
            m[d++] = (3 & t) << 6 | 63 & u
          }
          return f
        }
      }()
    },
    function(b, a) {
      (function(a) {
        function d(a) {
          for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (c.buffer instanceof ArrayBuffer) {
              var e =
                c.buffer;
              if (c.byteLength !== e.byteLength) {
                var d = new Uint8Array(c.byteLength);
                d.set(new Uint8Array(e, c.byteOffset, c.byteLength));
                e = d.buffer
              }
              a[b] = e
            }
          }
        }

        function e(a, b) {
          b = b || {};
          var c = new l;
          d(a);
          for (var e = 0; e < a.length; e++) c.append(a[e]);
          return b.type ? c.getBlob(b.type) : c.getBlob()
        }

        function c(a, b) {
          return d(a), new Blob(a, b || {})
        }
        var l = a.BlobBuilder || a.WebKitBlobBuilder || a.MSBlobBuilder || a.MozBlobBuilder;
        try {
          var g = 2 === (new Blob(["hi"])).size
        } catch (n) {
          g = !1
        }
        var k;
        if (k = g) try {
          k = 2 === (new Blob([new Uint8Array([1, 2])])).size
        } catch (n) {
          k = !1
        }
        var m = l && l.prototype.append && l.prototype.getBlob;
        b.exports = g ? k ? a.Blob : c : m ? e : void 0
      }).call(a, function() {
        return this
      }())
    },
    function(b, a) {
      a.encode = function(a) {
        var b = "",
          e;
        for (e in a) a.hasOwnProperty(e) && (b.length && (b += "\x26"), b += encodeURIComponent(e) + "\x3d" + encodeURIComponent(a[e]));
        return b
      };
      a.decode = function(a) {
        var b = {};
        a = a.split("\x26");
        for (var e = 0, c = a.length; e < c; e++) {
          var d = a[e].split("\x3d");
          b[decodeURIComponent(d[0])] = decodeURIComponent(d[1])
        }
        return b
      }
    },
    function(b, a) {
      b.exports = function(a, b) {
        var e =
          function() {};
        e.prototype = b.prototype;
        a.prototype = new e;
        a.prototype.constructor = a
      }
    },
    function(b, a) {
      function d(a) {
        var b = "";
        do b = c[a % l] + b, a = Math.floor(a / l); while (0 < a);
        return b
      }

      function f() {
        var a = d(+new Date);
        return a !== e ? (k = 0, e = a) : a + "." + d(k++)
      }
      for (var e, c = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), l = 64, g = {}, k = 0, m = 0; m < l; m++) g[c[m]] = m;
      f.encode = d;
      f.decode = function(a) {
        var b = 0;
        for (m = 0; m < a.length; m++) b = b * l + g[a.charAt(m)];
        return b
      };
      b.exports = f
    },
    function(b, a, d) {
      (function(a) {
        function e() {}

        function c(b) {
          f.call(this, b);
          this.query = this.query || {};
          k || (a.___eio || (a.___eio = []), k = a.___eio);
          this.index = k.length;
          var c = this;
          k.push(function(a) {
            c.onData(a)
          });
          this.query.j = this.index;
          a.document && a.addEventListener && a.addEventListener("beforeunload", function() {
            c.script && (c.script.onerror = e)
          }, !1)
        }
        var f = d(21),
          g = d(32);
        b.exports = c;
        var k, m = /\n/g,
          n = /\\n/g;
        g(c, f);
        c.prototype.supportsBinary = !1;
        c.prototype.doClose = function() {
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
          this.form &&
          (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null);
          f.prototype.doClose.call(this)
        };
        c.prototype.doPoll = function() {
          var a = this,
            b = document.createElement("script");
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
          b.async = !0;
          b.src = this.uri();
          b.onerror = function(b) {
            a.onError("jsonp poll error", b)
          };
          var c = document.getElementsByTagName("script")[0];
          c ? c.parentNode.insertBefore(b, c) : (document.head || document.body).appendChild(b);
          this.script = b;
          "undefined" !=
          typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
            var a = document.createElement("iframe");
            document.body.appendChild(a);
            document.body.removeChild(a)
          }, 100)
        };
        c.prototype.doWrite = function(a, b) {
          function c() {
            e();
            b()
          }

          function e() {
            if (d.iframe) try {
              d.form.removeChild(d.iframe)
            } catch (P) {
              d.onError("jsonp polling iframe removal error", P)
            }
            try {
              f = document.createElement('\x3ciframe src\x3d"javascript:0" name\x3d"' + d.iframeId + '"\x3e')
            } catch (P) {
              f = document.createElement("iframe"), f.name = d.iframeId,
                f.src = "javascript:0"
            }
            f.id = d.iframeId;
            d.form.appendChild(f);
            d.iframe = f
          }
          var d = this;
          if (!this.form) {
            var f, g = document.createElement("form"),
              l = document.createElement("textarea"),
              k = this.iframeId = "eio_iframe_" + this.index;
            g.className = "socketio";
            g.style.position = "absolute";
            g.style.top = "-1000px";
            g.style.left = "-1000px";
            g.target = k;
            g.method = "POST";
            g.setAttribute("accept-charset", "utf-8");
            l.name = "d";
            g.appendChild(l);
            document.body.appendChild(g);
            this.form = g;
            this.area = l
          }
          this.form.action = this.uri();
          e();
          a = a.replace(n,
            "\\\n");
          this.area.value = a.replace(m, "\\n");
          try {
            this.form.submit()
          } catch (P) {}
          this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            "complete" === d.iframe.readyState && c()
          } : this.iframe.onload = c
        }
      }).call(a, function() {
        return this
      }())
    },
    function(b, a, d) {
      (function(a) {
        function e(a) {
          a && a.forceBase64 && (this.supportsBinary = !1);
          this.perMessageDeflate = a.perMessageDeflate;
          this.usingBrowserWebSocket = q && !a.forceNode;
          this.protocols = a.protocols;
          this.usingBrowserWebSocket || (u = t);
          c.call(this, a)
        }
        var c = d(22),
          f =
            d(23),
          g = d(31),
          k = d(32),
          m = d(33),
          n = d(3)("engine.io-client:websocket"),
          q = a.WebSocket || a.MozWebSocket;
        if ("undefined" == typeof window) try {
          var t = d(36)
        } catch (x) {}
        var u = q;
        u || "undefined" != typeof window || (u = t);
        b.exports = e;
        k(e, c);
        e.prototype.name = "websocket";
        e.prototype.supportsBinary = !0;
        e.prototype.doOpen = function() {
          if (this.check()) {
            var a = this.uri(),
              b = this.protocols,
              c = {
                agent: this.agent,
                perMessageDeflate: this.perMessageDeflate
              };
            c.pfx = this.pfx;
            c.key = this.key;
            c.passphrase = this.passphrase;
            c.cert = this.cert;
            c.ca = this.ca;
            c.ciphers = this.ciphers;
            c.rejectUnauthorized = this.rejectUnauthorized;
            this.extraHeaders && (c.headers = this.extraHeaders);
            this.localAddress && (c.localAddress = this.localAddress);
            try {
              this.ws = this.usingBrowserWebSocket ? b ? new u(a, b) : new u(a) : new u(a, b, c)
            } catch (z) {
              return this.emit("error", z)
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1);
            this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer";
            this.addEventListeners()
          }
        };
        e.prototype.addEventListeners =
          function() {
            var a = this;
            this.ws.onopen = function() {
              a.onOpen()
            };
            this.ws.onclose = function() {
              a.onClose()
            };
            this.ws.onmessage = function(b) {
              a.onData(b.data)
            };
            this.ws.onerror = function(b) {
              a.onError("websocket error", b)
            }
          };
        e.prototype.write = function(b) {
          function c() {
            e.emit("flush");
            setTimeout(function() {
              e.writable = !0;
              e.emit("drain")
            }, 0)
          }
          var e = this;
          this.writable = !1;
          for (var d = b.length, g = 0, l = d; g < l; g++) ! function(b) {
            f.encodePacket(b, e.supportsBinary, function(f) {
              if (!e.usingBrowserWebSocket) {
                var g = {};
                (b.options && (g.compress =
                  b.options.compress), e.perMessageDeflate) && ("string" == typeof f ? a.Buffer.byteLength(f) : f.length) < e.perMessageDeflate.threshold && (g.compress = !1)
              }
              try {
                e.usingBrowserWebSocket ? e.ws.send(f) : e.ws.send(f, g)
              } catch (V) {
                n("websocket closed before onclose event")
              }--d || c()
            })
          }(b[g])
        };
        e.prototype.onClose = function() {
          c.prototype.onClose.call(this)
        };
        e.prototype.doClose = function() {
          "undefined" != typeof this.ws && this.ws.close()
        };
        e.prototype.uri = function() {
          var a = this.query || {},
            b = this.secure ? "wss" : "ws",
            c = "";
          this.port && ("wss" ===
          b && 443 !== Number(this.port) || "ws" === b && 80 !== Number(this.port)) && (c = ":" + this.port);
          this.timestampRequests && (a[this.timestampParam] = m());
          this.supportsBinary || (a.b64 = 1);
          a = g.encode(a);
          a.length && (a = "?" + a);
          var e = -1 !== this.hostname.indexOf(":");
          return b + "://" + (e ? "[" + this.hostname + "]" : this.hostname) + c + this.path + a
        };
        e.prototype.check = function() {
          return !(!u || "__initialize" in u && this.name === e.prototype.name)
        }
      }).call(a, function() {
        return this
      }())
    },
    function(b, a) {},
    function(b, a) {
      var d = [].indexOf;
      b.exports = function(a,
                           b) {
        if (d) return a.indexOf(b);
        for (var c = 0; c < a.length; ++c)
          if (a[c] === b) return c;
        return -1
      }
    },
    function(b, a) {
      (function(a) {
        var d = /^[\],:{}\s]*$/,
          e = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
          c = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          l = /(?:^|:|,)(?:\s*\[)+/g,
          g = /^\s+/,
          k = /\s+$/;
        b.exports = function(b) {
          return "string" == typeof b && b ? (b = b.replace(g, "").replace(k, ""), a.JSON && JSON.parse ? JSON.parse(b) : d.test(b.replace(e, "@").replace(c, "]").replace(l, "")) ? (new Function("return " + b))() : void 0) : null
        }
      }).call(a,
        function() {
          return this
        }())
    },
    function(b, a, d) {
      function f(a, b, c) {
        this.io = a;
        this.nsp = b;
        this.json = this;
        this.ids = 0;
        this.acks = {};
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.connected = !1;
        this.disconnected = !0;
        c && c.query && (this.query = c.query);
        this.io.autoConnect && this.open()
      }
      var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
          return typeof a
        } : function(a) {
          return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
        },
        c = d(7);
      a = d(8);
      var l = d(40),
        g = d(41),
        k = d(42),
        m = d(3)("socket.io-client:socket"),
        n = d(31);
      b.exports = f;
      var q = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1
        },
        t = a.prototype.emit;
      a(f.prototype);
      f.prototype.subEvents = function() {
        if (!this.subs) {
          var a = this.io;
          this.subs = [g(a, "open", k(this, "onopen")), g(a, "packet", k(this, "onpacket")), g(a, "close", k(this, "onclose"))]
        }
      };
      f.prototype.open = f.prototype.connect = function() {
        return this.connected ?
          this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
      };
      f.prototype.send = function() {
        var a = l(arguments);
        return a.unshift("message"), this.emit.apply(this, a), this
      };
      f.prototype.emit = function(a) {
        if (q.hasOwnProperty(a)) return t.apply(this, arguments), this;
        var b = l(arguments),
          e = {
            type: c.EVENT,
            data: b
          };
        return e.options = {}, e.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof b[b.length - 1] && (m("emitting packet with ack id %d", this.ids),
          this.acks[this.ids] = b.pop(), e.id = this.ids++), this.connected ? this.packet(e) : this.sendBuffer.push(e), delete this.flags, this
      };
      f.prototype.packet = function(a) {
        a.nsp = this.nsp;
        this.io.packet(a)
      };
      f.prototype.onopen = function() {
        if (m("transport is open - connecting"), "/" !== this.nsp)
          if (this.query) {
            var a = "object" === e(this.query) ? n.encode(this.query) : this.query;
            m("sending connect packet with query %s", a);
            this.packet({
              type: c.CONNECT,
              query: a
            })
          } else this.packet({
            type: c.CONNECT
          })
      };
      f.prototype.onclose = function(a) {
        m("close (%s)",
          a);
        this.connected = !1;
        this.disconnected = !0;
        delete this.id;
        this.emit("disconnect", a)
      };
      f.prototype.onpacket = function(a) {
        if (a.nsp === this.nsp) switch (a.type) {
          case c.CONNECT:
            this.onconnect();
            break;
          case c.EVENT:
            this.onevent(a);
            break;
          case c.BINARY_EVENT:
            this.onevent(a);
            break;
          case c.ACK:
            this.onack(a);
            break;
          case c.BINARY_ACK:
            this.onack(a);
            break;
          case c.DISCONNECT:
            this.ondisconnect();
            break;
          case c.ERROR:
            this.emit("error", a.data)
        }
      };
      f.prototype.onevent = function(a) {
        var b = a.data || [];
        m("emitting event %j", b);
        null !=
        a.id && (m("attaching ack callback to event"), b.push(this.ack(a.id)));
        this.connected ? t.apply(this, b) : this.receiveBuffer.push(b)
      };
      f.prototype.ack = function(a) {
        var b = this,
          e = !1;
        return function() {
          if (!e) {
            e = !0;
            var d = l(arguments);
            m("sending ack %j", d);
            b.packet({
              type: c.ACK,
              id: a,
              data: d
            })
          }
        }
      };
      f.prototype.onack = function(a) {
        var b = this.acks[a.id];
        "function" == typeof b ? (m("calling ack %s with %j", a.id, a.data), b.apply(this, a.data), delete this.acks[a.id]) : m("bad ack %s", a.id)
      };
      f.prototype.onconnect = function() {
        this.connected = !0;
        this.disconnected = !1;
        this.emit("connect");
        this.emitBuffered()
      };
      f.prototype.emitBuffered = function() {
        var a;
        for (a = 0; a < this.receiveBuffer.length; a++) t.apply(this, this.receiveBuffer[a]);
        this.receiveBuffer = [];
        for (a = 0; a < this.sendBuffer.length; a++) this.packet(this.sendBuffer[a]);
        this.sendBuffer = []
      };
      f.prototype.ondisconnect = function() {
        m("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect")
      };
      f.prototype.destroy = function() {
        if (this.subs) {
          for (var a = 0; a < this.subs.length; a++) this.subs[a].destroy();
          this.subs = null
        }
        this.io.destroy(this)
      };
      f.prototype.close = f.prototype.disconnect = function() {
        return this.connected && (m("performing disconnect (%s)", this.nsp), this.packet({
          type: c.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
      };
      f.prototype.compress = function(a) {
        return this.flags = this.flags || {}, this.flags.compress = a, this
      }
    },
    function(b, a) {
      b.exports = function(a, b) {
        for (var e = [], c = (b = b || 0) || 0; c < a.length; c++) e[c - b] = a[c];
        return e
      }
    },
    function(b, a) {
      b.exports = function(a, b, e) {
        return a.on(b,
          e), {
          destroy: function() {
            a.removeListener(b, e)
          }
        }
      }
    },
    function(b, a) {
      var d = [].slice;
      b.exports = function(a, b) {
        if ("string" == typeof b && (b = a[b]), "function" != typeof b) throw Error("bind() requires a function");
        var c = d.call(arguments, 2);
        return function() {
          return b.apply(a, c.concat(d.call(arguments)))
        }
      }
    },
    function(b, a) {
      function d(a) {
        a = a || {};
        this.ms = a.min || 100;
        this.max = a.max || 1E4;
        this.factor = a.factor || 2;
        this.jitter = 0 < a.jitter && 1 >= a.jitter ? a.jitter : 0;
        this.attempts = 0
      }
      b.exports = d;
      d.prototype.duration = function() {
        var a =
          this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var b = Math.random(),
            c = Math.floor(b * this.jitter * a);
          a = 0 == (1 & Math.floor(10 * b)) ? a - c : a + c
        }
        return 0 | Math.min(a, this.max)
      };
      d.prototype.reset = function() {
        this.attempts = 0
      };
      d.prototype.setMin = function(a) {
        this.ms = a
      };
      d.prototype.setMax = function(a) {
        this.max = a
      };
      d.prototype.setJitter = function(a) {
        this.jitter = a
      }
    }
  ])
});
var TK = TK || {};
TK.EventDispatcher = function(b) {
  var a = {};
  b.dispatcher = {};
  b.dispatcher.eventListeners = {};
  b.dispatcher.backupListerners = {};
  a.addEventListener = function(a, f, e) {
    void 0 !== a && null !== a && (void 0 === b.dispatcher.eventListeners[a] && (b.dispatcher.eventListeners[a] = []), b.dispatcher.eventListeners[a].push(f), e && (void 0 === b.dispatcher.backupListerners[e] && (b.dispatcher.backupListerners[e] = []), b.dispatcher.backupListerners[e].push({
      eventType: a,
      listener: f
    })))
  };
  a.removeEventListener = function(a, f) {
    b.dispatcher.eventListeners[a] ? (f =
      b.dispatcher.eventListeners[a].indexOf(f), -1 !== f && b.dispatcher.eventListeners[a].splice(f, 1)) : L.Logger.info("[tk-sdk]not event type: " + a)
  };
  a.removeAllEventListener = function(d) {
    if (d && "object" === typeof d && "number" === typeof d.length && "function" === typeof d.splice && !d.propertyIsEnumerable("length"))
      for (var f in d) {
        var e = d[f];
        delete b.dispatcher.eventListeners[e]
      } else if ("string" === typeof d) delete b.dispatcher.eventListeners[d];
    else if ("object" === typeof d)
      for (var c in d) e = c, a.removeEventListener(e, d[c])
  };
  a.dispatchEvent = function(a, f) {
    var e;
    (void 0 != f ? f : 1) && L.Logger.debug("sdk-dispatchEvent , event type: " + a.type);
    for (e in b.dispatcher.eventListeners[a.type])
      if (b.dispatcher.eventListeners[a.type].hasOwnProperty(e)) b.dispatcher.eventListeners[a.type][e](a)
  };
  a.removeBackupListerner = function(d) {
    if (d && b.dispatcher.backupListerners[d]) {
      for (var f = 0; f < b.dispatcher.backupListerners[d].length; f++) {
        var e = b.dispatcher.backupListerners[d][f];
        a.removeEventListener(e.eventType, e.listener)
      }
      b.dispatcher.backupListerners[d].length =
        0;
      delete b.dispatcher.backupListerners[d]
    }
  };
  return a
};
TK.TalkEvent = function(b) {
  var a = {};
  a.type = b.type;
  return a
};
TK.RoomEvent = function(b, a) {
  var d = TK.TalkEvent(b);
  d.streams = b.streams;
  d.message = b.message;
  d.user = b.user;
  if (a && "object" === typeof a)
    for (var f in a) d[f] = a[f];
  return d
};
TK.StreamEvent = function(b, a) {
  var d = TK.TalkEvent(b);
  d.stream = b.stream;
  d.message = b.message;
  d.bandwidth = b.bandwidth;
  d.attrs = b.attrs;
  if (a && "object" === typeof a)
    for (var f in a) d[f] = a[f];
  return d
};
TK.PublisherEvent = function(b, a) {
  b = TK.TalkEvent(b);
  if (a && "object" === typeof a)
    for (var d in a) b[d] = a[d];
  return b
};
TK.coreEventController = TK.EventDispatcher({});
TK = TK || {};
TK.FcStack = function(b) {
  var a = {
      pcConfig: {},
      peerConnection: {},
      desc: {},
      signalCallback: void 0
    },
    d = d || {};
  a.close = function() {
    d.Logger.debug("[tk-sdk]Close FcStack")
  };
  a.createOffer = function() {
    d.Logger.debug("[tk-sdk]FCSTACK: CreateOffer")
  };
  a.addStream = function(a) {
    d.Logger.debug("[tk-sdk]FCSTACK: addStream", a)
  };
  a.removeStream = function(a) {
    d.Logger.debug("[tk-sdk]FCSTACK: removeStream", a)
  };
  a.processSignalingMessage = function(b) {
    d.Logger.debug("[tk-sdk]FCSTACK: processSignaling", b);
    void 0 !== a.signalCallback && a.signalCallback(b)
  };
  a.sendSignalingMessage = function(a) {
    d.Logger.debug("[tk-sdk]FCSTACK: Sending signaling Message", a);
    b.callback(a)
  };
  a.setSignalingCallback = function(b) {
    d.Logger.debug("[tk-sdk]FCSTACK: Setting signalling callback");
    a.signalCallback = b
  };
  return a
};
TK = TK || {};
TK.FirefoxStack = function(b) {
  var a = {},
    d = mozRTCPeerConnection,
    f = mozRTCSessionDescription,
    e = mozRTCIceCandidate;
  a.pcConfig = {
    iceServers: []
  };
  void 0 !== b.iceServers && (a.pcConfig.iceServers = b.iceServers);
  void 0 === b.audio && (b.audio = !0);
  void 0 === b.video && (b.video = !0);
  a.mediaConstraints = {
    offerToReceiveAudio: !0,
    offerToReceiveVideo: !0,
    mozDontOfferDataChannel: !0
  };
  var c = function(a) {
      L.Logger.error("[tk-sdk]Error in Stack ", a)
    },
    l = function() {
      b.video && b.simulcast && a.peerConnection.getSenders().forEach(function(a) {
        "video" === a.track.kind &&
        (a.getParameters(), a.setParameters({
          encodings: [{
            rid: "spam",
            active: !0,
            priority: "high",
            maxBitrate: 4E4,
            maxHeight: 640,
            maxWidth: 480
          }, {
            rid: "egg",
            active: !0,
            priority: "medium",
            maxBitrate: 1E4,
            maxHeight: 320,
            maxWidth: 240
          }]
        }))
      })
    },
    g = !1;
  a.peerConnection = new d(a.pcConfig, a.con);
  b.localCandidates = [];
  a.peerConnection.onicecandidate = function(a) {
    a.candidate ? (g = !0, a.candidate.candidate.match(/a=/) || (a.candidate.candidate = "a\x3d" + a.candidate.candidate), a = a.candidate, b.remoteDescriptionSet ? b.callback({
      type: "candidate",
      candidate: a
    }) : (b.localCandidates.push(a), L.Logger.debug("[tk-sdk]Local Candidates stored: ", b.localCandidates.length, b.localCandidates))) : L.Logger.debug("[tk-sdk]Gathered all candidates. Sending END candidate")
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  a.peerConnection.oniceconnectionstatechange = function(b) {
    if (a.oniceconnectionstatechange) a.oniceconnectionstatechange(b.target.iceConnectionState)
  };
  var k = function(a) {
      if (b.video && b.maxVideoBW) {
        a = a.replace(/b=AS:.*\r\n/g, "");
        var c = a.match(/m=video.*\r\n/);
        null == c && (c = a.match(/m=video.*\n/));
        if (c && 0 < c.length) {
          var e = c[0] + "b\x3dAS:" + b.maxVideoBW + "\r\n";
          a = a.replace(c[0], e)
        }
      }
      b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), null == c && (c = a.match(/m=audio.*\n/)), c && 0 < c.length && (e = c[0] + "b\x3dAS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], e)));
      return a
    },
    m, n = function(a) {
      a.sdp = k(a.sdp);
      a.sdp = a.sdp.replace(/a=ice-options:google-ice\r\n/g, "");
      b.callback(a);
      m = a
    },
    q = function(c) {
      c.sdp = k(c.sdp);
      c.sdp = c.sdp.replace(/a=ice-options:google-ice\r\n/g, "");
      b.callback(c);
      m = c;
      a.peerConnection.setLocalDescription(m)
    };
  a.updateSpec = function(a) {
    if (a.maxVideoBW || a.maxAudioBW) a.maxVideoBW && (L.Logger.debug("[tk-sdk]Maxvideo Requested", a.maxVideoBW, "limit", b.limitMaxVideoBW), a.maxVideoBW > b.limitMaxVideoBW && (a.maxVideoBW = b.limitMaxVideoBW), b.maxVideoBW = a.maxVideoBW), a.maxAudioBW && (a.maxAudioBW > b.limitMaxAudioBW && (a.maxAudioBW = b.limitMaxAudioBW), b.maxAudioBW = a.maxAudioBW), m.sdp =
      k(m.sdp), a.Sdp ? L.Logger.error("[tk-sdk]Cannot update with renegotiation in Firefox, try without renegotiation") : (L.Logger.debug("[tk-sdk]Updating without renegotiation, newVideoBW:", b.maxVideoBW, ", newAudioBW:", b.maxAudioBW), b.callback({
      type: "updatestream",
      sdp: m.sdp
    }));
    if (a.minVideoBW || void 0 !== a.slideShowMode || void 0 !== a.muteStream || void 0 !== a.qualityLayer) L.Logger.debug("[tk-sdk]MinVideo Changed to ", a.minVideoBW), L.Logger.debug("[tk-sdk]SlideShowMode Changed to ", a.slideShowMode), L.Logger.debug("[tk-sdk]muteStream changed to ",
      a.muteStream), b.callback({
      type: "updatestream",
      config: a
    })
  };
  a.createOffer = function(b) {
    !0 !== b && (l(), a.mediaConstraints = {
      offerToReceiveAudio: !1,
      offerToReceiveVideo: !1,
      mozDontOfferDataChannel: !0
    });
    a.peerConnection.createOffer(n, c, a.mediaConstraints)
  };
  a.addStream = function(b) {
    a.peerConnection.addStream(b)
  };
  a.removeStream = function(b) {
    a.peerConnection.removeStream(b)
  };
  b.remoteCandidates = [];
  b.remoteDescriptionSet = !1;
  a.close = function() {
    try {
      a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection &&
      a.peerConnection.close && (a.peerConnection.close(), a.state = "closed")
    } catch (t) {
      L.Logger.error("[tk-sdk]peerConnection close error:", t)
    }
  };
  a.processSignalingMessage = function(c) {
    if ("offer" === c.type) c.sdp = k(c.sdp), a.peerConnection.setRemoteDescription(new f(c), function() {
      a.peerConnection.createAnswer(q, function(a) {
        L.Logger.error("[tk-sdk]Error", a)
      }, a.mediaConstraints);
      b.remoteDescriptionSet = !0
    }, function(a) {
      L.Logger.error("[tk-sdk]Error setting Remote Description", a)
    });
    else if ("answer" === c.type) L.Logger.debug("[tk-sdk]Set remote and local description"),
      L.Logger.debug("[tk-sdk]Local Description to set", m.sdp), L.Logger.debug("[tk-sdk]Remote Description to set", c.sdp), c.sdp = k(c.sdp), a.peerConnection.setLocalDescription(m, function() {
      a.peerConnection.setRemoteDescription(new f(c), function() {
        b.remoteDescriptionSet = !0;
        for (L.Logger.debug("[tk-sdk]Remote Description successfully set"); 0 < b.remoteCandidates.length && g;) L.Logger.debug("[tk-sdk]Setting stored remote candidates"), a.peerConnection.addIceCandidate(b.remoteCandidates.shift());
        for (; 0 < b.localCandidates.length;) L.Logger.debug("[tk-sdk]Sending Candidate from list"),
          b.callback({
            type: "candidate",
            candidate: b.localCandidates.shift()
          })
      }, function(a) {
        L.Logger.error("[tk-sdk]Error Setting Remote Description", a)
      })
    }, function(a) {
      L.Logger.error("[tk-sdk]Failure setting Local Description", a)
    });
    else if ("candidate" === c.type) try {
      var d = "object" === typeof c.candidate ? c.candidate : L.Utils.toJsonParse(c.candidate);
      d.candidate = d.candidate.replace(/ generation 0/g, "");
      d.candidate = d.candidate.replace(/ udp /g, " UDP ");
      d.sdpMLineIndex = parseInt(d.sdpMLineIndex);
      var l = new e(d);
      if (b.remoteDescriptionSet &&
        g)
        for (a.peerConnection.addIceCandidate(l); 0 < b.remoteCandidates.length;) L.Logger.debug("[tk-sdk]Setting stored remote candidates"), a.peerConnection.addIceCandidate(b.remoteCandidates.shift());
      else b.remoteCandidates.push(l)
    } catch (D) {
      L.Logger.error("[tk-sdk]Error parsing candidate", c.candidate, D)
    }
  };
  return a
};
TK = TK || {};
window.TkWebkitRTCPeerConnection = function(b, a) {
  b && b.iceTransportPolicy && (b.iceTransports = b.iceTransportPolicy);
  b = new webkitRTCPeerConnection(b, a);
  var d = b.getStats.bind(b);
  b.getStats = function(a, b, c) {
    var e = arguments;
    if (0 < arguments.length && "function" === typeof a) return d(a, b);
    var g = function(a) {
      var b = {};
      a.result().forEach(function(a) {
        var c = {
          id: a.id,
          timestamp: (new Date(a.timestamp)).getTime(),
          type: a.type
        };
        a.names().forEach(function(b) {
          c[b] = a.stat(b)
        });
        b[c.id] = c
      });
      return b
    };
    if (2 <= arguments.length) return d.apply(this, [function(a) {
      e[1](g(a))
    },
      arguments[0]
    ])
  };
  return b
};
TK.TkChromeStableStack = function(b) {
  var a = {},
    d = window.TkWebkitRTCPeerConnection;
  a.pcConfig = {
    iceServers: []
  };
  a.con = {
    optional: [{
      DtlsSrtpKeyAgreement: !0
    }]
  };
  void 0 !== b.iceServers && (a.pcConfig.iceServers = b.iceServers);
  void 0 === b.audio && (b.audio = !0);
  void 0 === b.video && (b.video = !0);
  a.mediaConstraints = {
    mandatory: {
      OfferToReceiveVideo: b.video,
      OfferToReceiveAudio: b.audio
    }
  };
  var f = function(a) {
    L.Logger.error("[tk-sdk]Error in Stack ", a)
  };
  a.peerConnection = new d(a.pcConfig, a.con);
  var e = function(a) {
      var b = "a\x3dssrc-group:SIM";
      a.forEach(function(a) {
        b += " " + a
      });
      return b + "\r\n"
    },
    c = function(a) {
      if (!b.video || !b.simulcast) return a;
      var c = a.match(/a=ssrc-group:FID ([0-9]*) ([0-9]*)\r?\n/);
      if (!c || 0 >= c.length) return a;
      var d = b.simulcast.numSpatialLayers || 2;
      var g = parseInt(c[1]),
        f = parseInt(c[2]),
        l = a.match(new RegExp("a\x3dssrc:" + c[1] + " cname:(.*)\r?\n"))[1],
        k = a.match(new RegExp("a\x3dssrc:" + c[1] + " msid:(.*)\r?\n"))[1],
        q = a.match(new RegExp("a\x3dssrc:" + c[1] + " mslabel:(.*)\r?\n"))[1],
        n = a.match(new RegExp("a\x3dssrc:" + c[1] + " label:(.*)\r?\n"))[1];
      a.match(new RegExp("a\x3dssrc:" + c[1] + ".*\r?\n", "g")).forEach(function(b) {
        a = a.replace(b, "")
      });
      a.match(new RegExp("a\x3dssrc:" + c[2] + ".*\r?\n", "g")).forEach(function(b) {
        a = a.replace(b, "")
      });
      for (var m = [g], U = [f], K = 1; K < d; K++) m.push(g + 1E3 * K), U.push(f + 1E3 * K);
      d = e(m);
      for (var V in m) g = m[V], f = U[V], d += "a\x3dssrc-group:FID " + g + " " + f + "\r\n";
      for (V in m) g = m[V], f = U[V], d += "a\x3dssrc:" + g + " cname:" + l + "\r\na\x3dssrc:" + g + " msid:" + k + "\r\na\x3dssrc:" + g + " mslabel:" + q + "\r\na\x3dssrc:" + g + " label:" + n + "\r\na\x3dssrc:" + f + " cname:" +
        l + "\r\na\x3dssrc:" + f + " msid:" + k + "\r\na\x3dssrc:" + f + " mslabel:" + q + "\r\na\x3dssrc:" + f + " label:" + n + "\r\n";
      return a.replace(c[0], d + "a\x3dx-google-flag:conference\r\n")
    },
    l = function(a) {
      if (b.video && b.maxVideoBW) {
        a = a.replace(/b=AS:.*\r\n/g, "");
        var c = a.match(/m=video.*\r\n/);
        null == c && (c = a.match(/m=video.*\n/));
        if (c && 0 < c.length) {
          var e = c[0] + "b\x3dAS:" + b.maxVideoBW + "\r\n";
          a = a.replace(c[0], e)
        }
      }
      b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), null == c && (c = a.match(/m=audio.*\n/)), c && 0 < c.length && (e = c[0] + "b\x3dAS:" +
        b.maxAudioBW + "\r\n", a = a.replace(c[0], e)));
      return a
    };
  a.close = function() {
    try {
      a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection && a.peerConnection.close && (a.peerConnection.close(), a.state = "closed")
    } catch (q) {
      L.Logger.error("[tk-sdk]peerConnection close error:", q)
    }
  };
  b.localCandidates = [];
  a.peerConnection.onicecandidate = function(a) {
    a.candidate ? (a.candidate.candidate.match(/a=/) || (a.candidate.candidate = "a\x3d" + a.candidate.candidate), a = {
      sdpMLineIndex: a.candidate.sdpMLineIndex,
      sdpMid: a.candidate.sdpMid,
      candidate: a.candidate.candidate
    }) : (L.Logger.debug("[tk-sdk]Gathered all candidates. Sending END candidate"), a = {
      sdpMLineIndex: -1,
      sdpMid: "end",
      candidate: "end"
    });
    b.remoteDescriptionSet ? b.callback({
      type: "candidate",
      candidate: a
    }) : (b.localCandidates.push(a), L.Logger.debug("[tk-sdk]Storing candidate: ", b.localCandidates.length, a))
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  a.peerConnection.oniceconnectionstatechange = function(b) {
    if (a.oniceconnectionstatechange) a.oniceconnectionstatechange(b.target.iceConnectionState)
  };
  var g, k, m = function(a, e) {
      a || (e.sdp = c(e.sdp));
      e.sdp = l(e.sdp);
      a = e.sdp;
      var d = a.match(/a=rtpmap:(.*)opus.*\r\n/);
      null !== d && (a = a.replace(d[0], d[0] + "a\x3drtcp-fb:" + d[1] + "nack\r\n"));
      e.sdp = a;
      e.sdp = e.sdp.replace(/a=ice-options:google-ice\r\n/g, "");
      e.sdp = e.sdp.replace(/a=rtcp-fb:\d+ transport-cc\r\n/g, "");
      b.callback({
        type: e.type,
        sdp: e.sdp
      });
      g = e
    },
    n = function(c) {
      c.sdp =
        l(c.sdp);
      b.callback({
        type: c.type,
        sdp: c.sdp
      });
      g = c;
      a.peerConnection.setLocalDescription(c)
    };
  a.updateSpec = function(c, e) {
    if (c.maxVideoBW || c.maxAudioBW) c.maxVideoBW && (L.Logger.debug("[tk-sdk]Maxvideo Requested:", c.maxVideoBW, "limit:", b.limitMaxVideoBW), c.maxVideoBW > b.limitMaxVideoBW && (c.maxVideoBW = b.limitMaxVideoBW), b.maxVideoBW = c.maxVideoBW), c.maxAudioBW && (c.maxAudioBW > b.limitMaxAudioBW && (c.maxAudioBW = b.limitMaxAudioBW), b.maxAudioBW = c.maxAudioBW), g.sdp = l(g.sdp), c.Sdp || c.maxAudioBW ? (L.Logger.debug("[tk-sdk]Updating with SDP renegotiation",
      b.maxVideoBW, b.maxAudioBW), a.peerConnection.setLocalDescription(g, function() {
      k.sdp = l(k.sdp);
      a.peerConnection.setRemoteDescription(new RTCSessionDescription(k), function() {
        b.remoteDescriptionSet = !0;
        b.callback({
          type: "updatestream",
          sdp: g.sdp
        })
      })
    }, function(a) {
      L.Logger.error("[tk-sdk]Error updating configuration", a);
      e("error")
    })) : (L.Logger.debug("[tk-sdk]Updating without SDP renegotiation, newVideoBW:", b.maxVideoBW, "newAudioBW:", b.maxAudioBW), b.callback({
      type: "updatestream",
      sdp: g.sdp
    }));
    if (c.minVideoBW ||
      void 0 !== c.slideShowMode || void 0 !== c.muteStream || void 0 !== c.qualityLayer) L.Logger.debug("[tk-sdk]MinVideo Changed to ", c.minVideoBW), L.Logger.debug("[tk-sdk]SlideShowMode Changed to ", c.slideShowMode), L.Logger.debug("[tk-sdk]muteStream changed to ", c.muteStream), b.callback({
      type: "updatestream",
      config: c
    })
  };
  a.createOffer = function(b) {
    !0 !== b && (a.mediaConstraints = {
      mandatory: {
        OfferToReceiveVideo: !1,
        OfferToReceiveAudio: !1
      }
    });
    a.peerConnection.createOffer(m.bind(null, b), f, a.mediaConstraints)
  };
  a.addStream =
    function(b) {
      b ? a.peerConnection.addStream(b) : L.Logger.error("[tk-sdk]chromeStableStack addStream : stream is not exist!")
    };
  a.removeStream = function(b) {
    a.peerConnection.removeStream(b)
  };
  a.getStats = function(b) {
    if (b && "function" === typeof b)
      if (a.peerConnection && a.peerConnection.getStats) try {
        a.peerConnection.getStats(void 0, function(a) {
          b(a, void 0)
        }, function(a) {
          L.Logger.error("[tk-sdk]that.peerConnection.getStats error:", a);
          b(void 0, -2)
        })
      } catch (t) {
        L.Logger.error("[tk-sdk]that.peerConnection.getStats error:",
          t), b(void 0, -3)
      } else b(void 0, -1)
  };
  b.remoteCandidates = [];
  b.remoteDescriptionSet = !1;
  a.processSignalingMessage = function(c, e) {
    L.Logger.debug("[tk-sdk]Process Signaling Message ", L.Utils.toJsonStringify(c));
    if (c.sdp && "answer" === c.type) {
      var d = c.sdp,
        f = d.indexOf("udp");
      if (-1 !== f) {
        var m = "";
        e && (m += "stream sdp info:stream id:" + e.getID() + " , extensionId is " + e.extensionId + ", attrs is " + L.Utils.toJsonStringify(e.getAttributes()) + ". \n");
        m += "udp info:" + (window.__TkSdkBuild__ ? L.Utils.encrypt(d.substr(f, 58)) : d.substr(f,
            58));
        L.Logger.info(m)
      }
    }
    if ("offer" === c.type) c.sdp = l(c.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
      a.peerConnection.createAnswer(n, function(a) {
        L.Logger.error("[tk-sdk]createAnswer Error: ", a)
      }, a.mediaConstraints);
      b.remoteDescriptionSet = !0
    }, function(a) {
      L.Logger.error("[tk-sdk]Error setting Remote Description", a)
    });
    else if ("answer" === c.type) L.Logger.debug("[tk-sdk]Set remote and local description"), L.Logger.debug("[tk-sdk]Remote Description", c.sdp), L.Logger.debug("[tk-sdk]Local Description",
      g.sdp), c.sdp = l(c.sdp), k = c, a.peerConnection.setLocalDescription(g, function() {
      a.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
        b.remoteDescriptionSet = !0;
        for (L.Logger.debug("[tk-sdk]Candidates to be added: ", b.remoteCandidates.length, b.remoteCandidates); 0 < b.remoteCandidates.length;) a.peerConnection.addIceCandidate(b.remoteCandidates.shift());
        for (L.Logger.debug("[tk-sdk]Local candidates to send:", b.localCandidates.length); 0 < b.localCandidates.length;) b.callback({
          type: "candidate",
          candidate: b.localCandidates.shift()
        })
      })
    });
    else if ("candidate" === c.type) try {
      var q = "object" === typeof c.candidate ? c.candidate : L.Utils.toJsonParse(c.candidate);
      if ("end" !== q.candidate) {
        q.candidate = q.candidate.replace(/a=/g, "");
        q.sdpMLineIndex = parseInt(q.sdpMLineIndex);
        var t = new RTCIceCandidate(q);
        b.remoteDescriptionSet ? a.peerConnection.addIceCandidate(t) : b.remoteCandidates.push(t)
      }
    } catch (w) {
      L.Logger.error("[tk-sdk]Error parsing candidate", c.candidate)
    }
  };
  return a
};
TK = TK || {};
TK.BowserStack = function(b) {
  var a = {},
    d = webkitRTCPeerConnection;
  a.pcConfig = {
    iceServers: []
  };
  a.con = {
    optional: [{
      DtlsSrtpKeyAgreement: !0
    }]
  };
  void 0 !== b.stunServerUrl && a.pcConfig.iceServers.push({
    url: b.stunServerUrl
  });
  (b.turnServer || {}).url && a.pcConfig.iceServers.push({
    username: b.turnServer.username,
    credential: b.turnServer.password,
    url: b.turnServer.url
  });
  void 0 === b.audio && (b.audio = !0);
  void 0 === b.video && (b.video = !0);
  a.mediaConstraints = {
    offerToReceiveVideo: b.video,
    offerToReceiveAudio: b.audio
  };
  a.peerConnection = new d(a.pcConfig,
    a.con);
  b.remoteDescriptionSet = !1;
  var f = function(a) {
    if (b.maxVideoBW) {
      var c = a.match(/m=video.*\r\n/);
      null == c && (c = a.match(/m=video.*\n/));
      if (c && 0 < c.length) {
        var e = c[0] + "b\x3dAS:" + b.maxVideoBW + "\r\n";
        a = a.replace(c[0], e)
      }
    }
    b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), null == c && (c = a.match(/m=audio.*\n/)), c && 0 < c.length && (e = c[0] + "b\x3dAS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], e)));
    return a
  };
  a.close = function() {
    try {
      a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection && a.peerConnection.close &&
      (a.peerConnection.close(), a.state = "closed")
    } catch (k) {
      L.Logger.error("[tk-sdk]peerConnection close error:", k)
    }
  };
  b.localCandidates = [];
  a.peerConnection.onicecandidate = function(c) {
    c.candidate ? (c.candidate.candidate.match(/a=/) || (c.candidate.candidate = "a\x3d" + c.candidate.candidate), b.remoteDescriptionSet ? b.callback({
      type: "candidate",
      candidate: c.candidate
    }) : b.localCandidates.push(c.candidate)) : L.Logger.debug("End of candidates.", a.peerConnection.localDescription)
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  var e = function(a) {
      L.Logger.debug("Error in Stack ", a)
    },
    c, l = function(d) {
      d.sdp = f(d.sdp);
      L.Logger.debug("Set local description", d.sdp);
      c = d;
      a.peerConnection.setLocalDescription(c, function() {
        L.Logger.debug("The final LocalDesc", a.peerConnection.localDescription);
        b.callback(a.peerConnection.localDescription)
      }, e)
    },
    g = function(e) {
      e.sdp = f(e.sdp);
      b.callback(e);
      c = e;
      a.peerConnection.setLocalDescription(e)
    };
  a.createOffer = function(b) {
    !0 ===
    b ? a.peerConnection.createOffer(l, e, a.mediaConstraints) : a.peerConnection.createOffer(l, e)
  };
  a.addStream = function(b) {
    a.peerConnection.addStream(b)
  };
  b.remoteCandidates = [];
  a.processSignalingMessage = function(c) {
    L.Logger.debug("Process Signaling Message", c);
    if ("offer" === c.type) c.sdp = f(c.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(c)), a.peerConnection.createAnswer(g, null, a.mediaConstraints), b.remoteDescriptionSet = !0;
    else if ("answer" === c.type) L.Logger.debug("Set remote description",
      c.sdp), c.sdp = f(c.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
      b.remoteDescriptionSet = !0;
      for (L.Logger.debug("Candidates to be added: ", b.remoteCandidates.length); 0 < b.remoteCandidates.length;) L.Logger.debug("Candidate :", b.remoteCandidates[b.remoteCandidates.length - 1]), a.peerConnection.addIceCandidate(b.remoteCandidates.shift(), function() {}, e);
      for (; 0 < b.localCandidates.length;) b.callback({
        type: "candidate",
        candidate: b.localCandidates.shift()
      })
    }, function() {
      L.Logger.warning("Error Setting Remote Description")
    });
    else if ("candidate" === c.type) {
      L.Logger.debug("Message with candidate");
      try {
        var d = "object" === typeof c.candidate ? c.candidate : L.Utils.toJsonParse(c.candidate);
        d.candidate = d.candidate.replace(/a=/g, "");
        d.sdpMLineIndex = parseInt(d.sdpMLineIndex);
        d.sdpMLineIndex = "audio" === d.sdpMid ? 0 : 1;
        var l = new RTCIceCandidate(d);
        L.Logger.debug("Remote Candidate", l);
        b.remoteDescriptionSet ? a.peerConnection.addIceCandidate(l, function() {}, e) : b.remoteCandidates.push(l)
      } catch (q) {
        L.Logger.error("[tk-sdk]Error parsing candidate",
          c.candidate)
      }
    }
  };
  return a
};
TK = TK || {};
TK.ChromeCanaryStack = function(b) {
  var a = {},
    d = webkitRTCPeerConnection;
  a.pcConfig = {
    iceServers: []
  };
  a.con = {
    optional: [{
      DtlsSrtpKeyAgreement: !0
    }]
  };
  void 0 !== b.stunServerUrl && a.pcConfig.iceServers.push({
    url: b.stunServerUrl
  });
  (b.turnServer || {}).url && a.pcConfig.iceServers.push({
    username: b.turnServer.username,
    credential: b.turnServer.password,
    url: b.turnServer.url
  });
  if (void 0 === b.audio || b.nop2p) b.audio = !0;
  if (void 0 === b.video || b.nop2p) b.video = !0;
  a.mediaConstraints = {
    mandatory: {
      OfferToReceiveVideo: b.video,
      OfferToReceiveAudio: b.audio
    }
  };
  a.roapSessionId = 103;
  a.peerConnection = new d(a.pcConfig, a.con);
  a.peerConnection.onicecandidate = function(e) {
    L.Logger.debug("[tk-sdk]PeerConnection: ", b.sessionId);
    e.candidate ? a.iceCandidateCount += 1 : (L.Logger.debug("[tk-sdk]State: " + a.peerConnection.iceGatheringState), void 0 === a.ices && (a.ices = 0), a.ices += 1, 1 <= a.ices && a.moreIceComing && (a.moreIceComing = !1, a.markActionNeeded()))
  };
  var f = function(a) {
    var c;
    if (b.maxVideoBW && (c = a.match(/m=video.*\r\n/)) && 0 < c.length) {
      var e = c[0] + "b\x3dAS:" + b.maxVideoBW + "\r\n";
      a =
        a.replace(c[0], e)
    }
    b.maxAudioBW && (c = a.match(/m=audio.*\r\n/)) && 0 < c.length && (e = c[0] + "b\x3dAS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], e));
    return a
  };
  a.processSignalingMessage = function(b) {
    L.Logger.debug("[tk-sdk]Activity on conn " + a.sessionId);
    b = L.Utils.toJsonParse(b);
    a.incomingMessage = b;
    "new" === a.state ? "OFFER" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "offer"
    }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.state = "offer-received", a.markActionNeeded()) : a.error("Illegal message for this state: " +
      b.messageType + " in state " + a.state) : "offer-sent" === a.state ? "ANSWER" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "answer"
    }, L.Logger.debug("[tk-sdk]Received ANSWER: ", b.sdp), b.sdp = f(b.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.sendOK(), a.state = "established") : "pr-answer" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "pr-answer"
    }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b))) : "offer" === b.messageType ? a.error("Not written yet") : a.error("Illegal message for this state: " +
      b.messageType + " in state " + a.state) : "established" === a.state && ("OFFER" === b.messageType ? (b = {
        sdp: b.sdp,
        type: "offer"
      }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.state = "offer-received", a.markActionNeeded()) : a.error("Illegal message for this state: " + b.messageType + " in state " + a.state))
  };
  a.addStream = function(b) {
    a.peerConnection.addStream(b);
    a.markActionNeeded()
  };
  a.removeStream = function(b) {
    a.peerConnection.removeStream(b)
  };
  a.removeStream = function() {
    a.markActionNeeded()
  };
  a.close =
    function() {
      try {
        a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection && a.peerConnection.close && (a.peerConnection.close(), a.state = "closed")
      } catch (e) {
        L.Logger.error("[tk-sdk]peerConnection close error:", e)
      }
    };
  a.markActionNeeded = function() {
    a.actionNeeded = !0;
    a.doLater(function() {
      a.onstablestate()
    })
  };
  a.doLater = function(a) {
    window.setTimeout(a, 1)
  };
  a.onstablestate = function() {
    if (a.actionNeeded) {
      if ("new" === a.state || "established" === a.state) a.peerConnection.createOffer(function(b) {
        b.sdp =
          f(b.sdp);
        L.Logger.debug("[tk-sdk]Changed", b.sdp);
        b.sdp !== a.prevOffer ? (a.peerConnection.setLocalDescription(b), a.state = "preparing-offer", a.markActionNeeded()) : L.Logger.debug("[tk-sdk]Not sending a new offer")
      }, null, a.mediaConstraints);
      else if ("preparing-offer" === a.state) {
        if (a.moreIceComing) return;
        a.prevOffer = a.peerConnection.localDescription.sdp;
        L.Logger.debug("[tk-sdk]Sending OFFER: " + a.prevOffer);
        a.sendMessage("OFFER", a.prevOffer);
        a.state = "offer-sent"
      } else if ("offer-received" === a.state) a.peerConnection.createAnswer(function(b) {
        a.peerConnection.setLocalDescription(b);
        a.state = "offer-received-preparing-answer";
        a.iceStarted ? a.markActionNeeded() : (L.Logger.debug("[tk-sdk]" + (new Date).getTime() + ": Starting ICE in responder"), a.iceStarted = !0)
      }, null, a.mediaConstraints);
      else if ("offer-received-preparing-answer" === a.state) {
        if (a.moreIceComing) return;
        var b = a.peerConnection.localDescription.sdp;
        a.sendMessage("ANSWER", b);
        a.state = "established"
      } else a.error("Dazed and confused in state " + a.state + ", stopping here");
      a.actionNeeded = !1
    }
  };
  a.sendOK = function() {
    a.sendMessage("OK")
  };
  a.sendMessage = function(b, c) {
    console.log(b,c);
    var e = {};
    e.messageType = b;
    e.sdp = c;
    "OFFER" === b ? (e.offererSessionId = a.sessionId, e.answererSessionId = a.otherSessionId, e.seq = a.sequenceNumber += 1, e.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (e.offererSessionId = a.incomingMessage.offererSessionId, e.answererSessionId = a.sessionId, e.seq = a.incomingMessage.seq);
    a.onsignalingmessage(L.Utils.toJsonStringify(e))
  };
  a.error = function(a) {
    throw "Error in RoapOnJsep: " + a;
  };
  a.sessionId = a.roapSessionId += 1;
  a.sequenceNumber = 0;
  a.actionNeeded = !1;
  a.iceStarted = !1;
  a.moreIceComing = !0;
  a.iceCandidateCount = 0;
  a.onsignalingmessage = b.callback;
  a.peerConnection.onopen = function() {
    if (a.onopen) a.onopen()
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  a.peerConnection.oniceconnectionstatechange = function(b) {
    if (a.oniceconnectionstatechange) a.oniceconnectionstatechange(b.currentTarget.iceConnectionState)
  };
  a.onaddstream = null;
  a.onremovestream =
    null;
  a.state = "new";
  a.markActionNeeded();
  return a
};
TK = TK || {};
TK.ChromeRoapStack = function(b) {
  var a = {},
    d = webkitRTCPeerConnection;
  a.pcConfig = {
    iceServers: []
  };
  a.con = {
    optional: [{
      DtlsSrtpKeyAgreement: !0
    }]
  };
  void 0 !== b.stunServerUrl && a.pcConfig.iceServers.push({
    url: b.stunServerUrl
  });
  (b.turnServer || {}).url && a.pcConfig.iceServers.push({
    username: b.turnServer.username,
    credential: b.turnServer.password,
    url: b.turnServer.url
  });
  if (void 0 === b.audio || b.nop2p) b.audio = !0;
  if (void 0 === b.video || b.nop2p) b.video = !0;
  a.mediaConstraints = {
    mandatory: {
      OfferToReceiveVideo: b.video,
      OfferToReceiveAudio: b.audio
    }
  };
  a.roapSessionId = 103;
  a.peerConnection = new d(a.pcConfig, a.con);
  a.peerConnection.onicecandidate = function(e) {
    L.Logger.debug("[tk-sdk]PeerConnection: ", b.sessionId);
    e.candidate ? a.iceCandidateCount += 1 : (L.Logger.debug("[tk-sdk]onicecandidate state: " + a.peerConnection.iceGatheringState), void 0 === a.ices && (a.ices = 0), a.ices += 1, 1 <= a.ices && a.moreIceComing && (a.moreIceComing = !1, a.markActionNeeded()))
  };
  var f = function(a) {
    var c;
    if (b.maxVideoBW && (c = a.match(/m=video.*\r\n/)) && 0 < c.length) {
      var e = c[0] + "b\x3dAS:" + b.maxVideoBW +
        "\r\n";
      a = a.replace(c[0], e)
    }
    b.maxAudioBW && (c = a.match(/m=audio.*\r\n/)) && 0 < c.length && (e = c[0] + "b\x3dAS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0], e));
    return a
  };
  a.processSignalingMessage = function(b) {
    L.Logger.debug("[tk-sdk]Activity on conn " + a.sessionId);
    b = L.Utils.toJsonParse(b);
    a.incomingMessage = b;
    "new" === a.state ? "OFFER" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "offer"
    }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.state = "offer-received", a.markActionNeeded()) : a.error("Illegal message for this state: " +
      b.messageType + " in state " + a.state) : "offer-sent" === a.state ? "ANSWER" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "answer"
    }, L.Logger.debug("[tk-sdk]Received ANSWER: ", b.sdp), b.sdp = f(b.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.sendOK(), a.state = "established") : "pr-answer" === b.messageType ? (b = {
      sdp: b.sdp,
      type: "pr-answer"
    }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b))) : "offer" === b.messageType ? a.error("Not written yet") : a.error("Illegal message for this state: " +
      b.messageType + " in state " + a.state) : "established" === a.state && ("OFFER" === b.messageType ? (b = {
        sdp: b.sdp,
        type: "offer"
      }, a.peerConnection.setRemoteDescription(new RTCSessionDescription(b)), a.state = "offer-received", a.markActionNeeded()) : a.error("Illegal message for this state: " + b.messageType + " in state " + a.state))
  };
  a.addStream = function(b) {
    a.peerConnection.addStream(b);
    a.markActionNeeded()
  };
  a.removeStream = function(b) {
    a.peerConnection.removeStream(b)
  };
  a.removeStream = function() {
    a.markActionNeeded()
  };
  a.close =
    function() {
      try {
        a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection && a.peerConnection.close && (a.peerConnection.close(), a.state = "closed")
      } catch (e) {
        L.Logger.error("[tk-sdk]peerConnection close error:", e)
      }
    };
  a.markActionNeeded = function() {
    a.actionNeeded = !0;
    a.doLater(function() {
      a.onstablestate()
    })
  };
  a.doLater = function(a) {
    window.setTimeout(a, 1)
  };
  a.onstablestate = function() {
    if (a.actionNeeded) {
      if ("new" === a.state || "established" === a.state) a.peerConnection.createOffer(function(b) {
        b.sdp =
          f(b.sdp);
        L.Logger.debug("[tk-sdk]Changed", b.sdp);
        b.sdp !== a.prevOffer ? (a.peerConnection.setLocalDescription(b), a.state = "preparing-offer", a.markActionNeeded()) : L.Logger.debug("[tk-sdk]Not sending a new offer")
      }, null, a.mediaConstraints);
      else if ("preparing-offer" === a.state) {
        if (a.moreIceComing) return;
        a.prevOffer = a.peerConnection.localDescription.sdp;
        L.Logger.debug("[tk-sdk]Sending OFFER: " + a.prevOffer);
        a.sendMessage("OFFER", a.prevOffer);
        a.state = "offer-sent"
      } else if ("offer-received" === a.state) a.peerConnection.createAnswer(function(b) {
        a.peerConnection.setLocalDescription(b);
        a.state = "offer-received-preparing-answer";
        a.iceStarted ? a.markActionNeeded() : (L.Logger.debug("[tk-sdk]" + (new Date).getTime() + ": Starting ICE in responder"), a.iceStarted = !0)
      }, null, a.mediaConstraints);
      else if ("offer-received-preparing-answer" === a.state) {
        if (a.moreIceComing) return;
        var b = a.peerConnection.localDescription.sdp;
        a.sendMessage("ANSWER", b);
        a.state = "established"
      } else a.error("Dazed and confused in state " + a.state + ", stopping here");
      a.actionNeeded = !1
    }
  };
  a.sendOK = function() {
    a.sendMessage("OK")
  };
  a.sendMessage = function(b, c) {
    var e = {};
    e.messageType = b;
    e.sdp = c;
    "OFFER" === b ? (e.offererSessionId = a.sessionId, e.answererSessionId = a.otherSessionId, e.seq = a.sequenceNumber += 1, e.tiebreaker = Math.floor(429496723 * Math.random() + 1)) : (e.offererSessionId = a.incomingMessage.offererSessionId, e.answererSessionId = a.sessionId, e.seq = a.incomingMessage.seq);
    a.onsignalingmessage(L.Utils.toJsonStringify(e))
  };
  a.error = function(a) {
    throw "Error in RoapOnJsep: " + a;
  };
  a.sessionId = a.roapSessionId += 1;
  a.sequenceNumber = 0;
  a.actionNeeded = !1;
  a.iceStarted = !1;
  a.moreIceComing = !0;
  a.iceCandidateCount = 0;
  a.onsignalingmessage = b.callback;
  a.peerConnection.onopen = function() {
    if (a.onopen) a.onopen()
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  a.peerConnection.oniceconnectionstatechange = function(b) {
    if (a.oniceconnectionstatechange) a.oniceconnectionstatechange(b.currentTarget.iceConnectionState)
  };
  a.onaddstream = null;
  a.onremovestream =
    null;
  a.state = "new";
  a.markActionNeeded();
  return a
};
TK = TK || {};
TK.nativeEntry = function() {
  var b = document.getElementById("tknative");
  b && b.nodeName && "embed" === b.nodeName.toLowerCase() || (b = document.createElement("embed"), document.body.appendChild(b), b.setAttribute("id", "tknative"), b.setAttribute("mainentry", !0), b.setAttribute("hidden", !0), b.setAttribute("type", "application/x-ppapi-proxy"));
  return b
};
TK.nativePeerConnection = function(b) {
  var a = {},
    d = {},
    f = b.audio,
    e = b.video,
    c = b.screen,
    l = !0;
  void 0 === c && (c = !1);
  a.onicecandidate = null;
  a.onaddstream = null;
  a.onremovestream = null;
  a.oniceconnectionstatechange = null;
  var g = function() {
    if (!b.cnnId) throw Error("Invalid native-peer-connection ID");
    return b.media ? b.cnnId + ":file" : b.screen ? b.cnnId + ":screen" : b.cnnId
  };
  tknative.addEventListener("message", function(b) {
    var c = b.data.name;
    if (b.data.connectionId == g()) {
      if ("onLocalDescription" === c) {
        var e = {};
        e.sdp = b.data.sdp;
        e.type =
          "offer";
        "function" === typeof d.createOffer_suc && d.createOffer_suc(e);
        delete d.createOffer_suc;
        delete d.createOffer_fai
      }
      "onIceCandidate" === c && a.onicecandidate && (e = {
        candidate: {}
      }, e.candidate.sdpMLineIndex = b.data.sdpMLineIndex, e.candidate.sdpMid = b.data.sdpMid, e.candidate.candidate = b.data.candidate, a.onicecandidate(e));
      if ("onIceStatusChanged" === c) {
        b = b.data.state;
        if (1 == b) a.oniceconnectionstatechange("checking");
        if (2 == b) a.oniceconnectionstatechange("connected");
        if (3 == b) a.oniceconnectionstatechange("completed");
        if (4 == b) a.oniceconnectionstatechange("failed");
        if (5 == b) a.oniceconnectionstatechange("disconnected");
        if (6 == b) a.oniceconnectionstatechange("closed")
      }
      if ("onAddStream" === c) a.onaddstream({
        stream: {}
      })
    }
  }, !1);
  a.close = function() {
    tknative.postMessage({
      command: "closeConnection",
      streamId: g().toString(),
      offerToSend: l,
      type: Number(b.media ? 1 : b.screen ? 2 : 0)
    })
  };
  a.createOffer = function(a, b, n) {
    n && (l = !1);
    tknative.postMessage({
      command: "createOffer",
      streamId: g().toString(),
      includeLocalMedia: l,
      hasAudio: f,
      hasVideo: e,
      hasScreen: c,
      offerToSend: l
    });
    d.createOffer_suc = a;
    d.createOffer_fai = b
  };
  a.setRemoteDescription = function(a, b, c) {
    tknative.postMessage({
      command: "setRemoteDescription",
      sdpAnswer: a.sdp,
      streamId: g().toString()
    });
    b && "function" === typeof b && b()
  };
  a.addIceCandidate = function(a) {
    tknative.postMessage({
      command: "setIceCandidate",
      candidate: a.candidate,
      sdpMid: 0,
      sdpMLineIndex: a.sdpMLineIndex,
      streamId: g().toString()
    })
  };
  a.addStream = function(a) {
    tknative.postMessage({
      command: "addStream",
      streamId: g().toString(),
      type: Number(b.media ? 1 : b.screen ?
        2 : 0)
    })
  };
  a.removeStream = function(a) {
    tknative.postMessage({
      command: "removeStream",
      streamId: g().toString(),
      type: Number(b.media ? 1 : b.screen ? 2 : 0)
    })
  };
  a.setLocalDescription = function(a) {};
  a.getStats = function(a) {
    a && "function" === typeof a && a(void 0, -1)
  };
  return a
};
TK = TK || {};
TK.TkNativeStack = function(b) {
  var a = {},
    d = TK.nativePeerConnection;
  a.isNative = !0;
  a.pcConfig = {
    iceServers: []
  };
  a.con = {
    optional: [{
      DtlsSrtpKeyAgreement: !0
    }]
  };
  void 0 !== b.iceServers && (a.pcConfig.iceServers = b.iceServers);
  void 0 === b.audio && (b.audio = !0);
  void 0 === b.video && (b.video = !0);
  a.mediaConstraints = {
    mandatory: {
      OfferToReceiveVideo: b.video,
      OfferToReceiveAudio: b.audio
    }
  };
  var f = function(a) {
    L.Logger.error("Error in Stack ", a)
  };
  a.peerConnection = new d(b);
  var e = function(a) {
      var b = "a\x3dssrc-group:SIM";
      a.forEach(function(a) {
        b += " " +
          a
      });
      return b + "\r\n"
    },
    c = function(a) {
      if (!b.video || !b.simulcast) return a;
      var c = a.match(/a=ssrc-group:FID ([0-9]*) ([0-9]*)\r?\n/);
      if (!c || 0 >= c.length) return a;
      var d = b.simulcast.numSpatialLayers || 2;
      var g = parseInt(c[1]),
        f = parseInt(c[2]),
        l = a.match(new RegExp("a\x3dssrc:" + c[1] + " cname:(.*)\r?\n"))[1],
        k = a.match(new RegExp("a\x3dssrc:" + c[1] + " msid:(.*)\r?\n"))[1],
        n = a.match(new RegExp("a\x3dssrc:" + c[1] + " mslabel:(.*)\r?\n"))[1],
        m = a.match(new RegExp("a\x3dssrc:" + c[1] + " label:(.*)\r?\n"))[1];
      a.match(new RegExp("a\x3dssrc:" +
        c[1] + ".*\r?\n", "g")).forEach(function(b) {
        a = a.replace(b, "")
      });
      a.match(new RegExp("a\x3dssrc:" + c[2] + ".*\r?\n", "g")).forEach(function(b) {
        a = a.replace(b, "")
      });
      for (var M = [g], P = [f], U = 1; U < d; U++) M.push(g + 1E3 * U), P.push(f + 1E3 * U);
      d = e(M);
      for (var K in M) g = M[K], f = P[K], d += "a\x3dssrc-group:FID " + g + " " + f + "\r\n";
      for (K in M) g = M[K], f = P[K], d += "a\x3dssrc:" + g + " cname:" + l + "\r\na\x3dssrc:" + g + " msid:" + k + "\r\na\x3dssrc:" + g + " mslabel:" + n + "\r\na\x3dssrc:" + g + " label:" + m + "\r\na\x3dssrc:" + f + " cname:" + l + "\r\na\x3dssrc:" + f + " msid:" +
        k + "\r\na\x3dssrc:" + f + " mslabel:" + n + "\r\na\x3dssrc:" + f + " label:" + m + "\r\n";
      return a.replace(c[0], d + "a\x3dx-google-flag:conference\r\n")
    },
    l = function(a) {
      if (b.video && b.maxVideoBW) {
        a = a.replace(/b=AS:.*\r\n/g, "");
        var c = a.match(/m=video.*\r\n/);
        null == c && (c = a.match(/m=video.*\n/));
        if (c && 0 < c.length) {
          var e = c[0] + "b\x3dAS:" + b.maxVideoBW + "\r\n";
          a = a.replace(c[0], e)
        }
      }
      b.audio && b.maxAudioBW && (c = a.match(/m=audio.*\r\n/), null == c && (c = a.match(/m=audio.*\n/)), c && 0 < c.length && (e = c[0] + "b\x3dAS:" + b.maxAudioBW + "\r\n", a = a.replace(c[0],
        e)));
      return a
    };
  a.close = function() {
    try {
      a && a.peerConnection && "closed" !== a.peerConnection.signalingState && a.peerConnection && a.peerConnection.close && (a.peerConnection.close(), a.state = "closed")
    } catch (n) {
      L.Logger.error("[tk-sdk]peerConnection close error:", n)
    }
  };
  b.localCandidates = [];
  a.peerConnection.onicecandidate = function(a) {
    a.candidate ? (a.candidate.candidate.match(/a=/) || (a.candidate.candidate = "a\x3d" + a.candidate.candidate), a = {
      sdpMLineIndex: a.candidate.sdpMLineIndex,
      sdpMid: a.candidate.sdpMid,
      candidate: a.candidate.candidate
    }) :
      (L.Logger.debug("Gathered all candidates. Sending END candidate"), a = {
        sdpMLineIndex: -1,
        sdpMid: "end",
        candidate: "end"
      });
    b.remoteDescriptionSet ? b.callback({
      type: "candidate",
      candidate: a
    }) : (b.localCandidates.push(a), L.Logger.debug("Storing candidate: ", b.localCandidates.length, a))
  };
  a.peerConnection.onaddstream = function(b) {
    if (a.onaddstream) a.onaddstream(b)
  };
  a.peerConnection.onremovestream = function(b) {
    if (a.onremovestream) a.onremovestream(b)
  };
  a.peerConnection.oniceconnectionstatechange = function(b) {
    if (a.oniceconnectionstatechange) a.oniceconnectionstatechange(b)
  };
  var g, k = function(a, e) {
      a || (e.sdp = c(e.sdp));
      e.sdp = l(e.sdp);
      a = e.sdp;
      var d = a.match(/a=rtpmap:(.*)opus.*\r\n/);
      null !== d && (a = a.replace(d[0], d[0] + "a\x3drtcp-fb:" + d[1] + "nack\r\n"));
      e.sdp = a;
      e.sdp = e.sdp.replace(/a=ice-options:google-ice\r\n/g, "");
      b.callback({
        type: e.type,
        sdp: e.sdp
      });
      g = e
    },
    m = function(c) {
      c.sdp = l(c.sdp);
      b.callback({
        type: c.type,
        sdp: c.sdp
      });
      g = c;
      a.peerConnection.setLocalDescription(c)
    };
  a.updateSpec = function(c, e) {
    if (c.maxVideoBW || c.maxAudioBW) c.maxVideoBW && (L.Logger.debug("Maxvideo Requested:", c.maxVideoBW,
      "limit:", b.limitMaxVideoBW), c.maxVideoBW > b.limitMaxVideoBW && (c.maxVideoBW = b.limitMaxVideoBW), b.maxVideoBW = c.maxVideoBW, L.Logger.debug("Result", b.maxVideoBW)), c.maxAudioBW && (c.maxAudioBW > b.limitMaxAudioBW && (c.maxAudioBW = b.limitMaxAudioBW), b.maxAudioBW = c.maxAudioBW), g.sdp = l(g.sdp), c.Sdp || c.maxAudioBW ? (L.Logger.debug("Updating with SDP renegotiation", b.maxVideoBW, b.maxAudioBW), (void 0).sdp = l((void 0).sdp), a.peerConnection.setRemoteDescription(void 0, function() {
      b.remoteDescriptionSet = !0;
      b.callback({
        type: "updatestream",
        sdp: g.sdp
      })
    })) : (L.Logger.debug("Updating without SDP renegotiation, newVideoBW:", b.maxVideoBW, "newAudioBW:", b.maxAudioBW), b.callback({
      type: "updatestream",
      sdp: g.sdp
    }));
    if (c.minVideoBW || void 0 !== c.slideShowMode || void 0 !== c.muteStream || void 0 !== c.qualityLayer) L.Logger.debug("MinVideo Changed to ", c.minVideoBW), L.Logger.debug("SlideShowMode Changed to ", c.slideShowMode), L.Logger.debug("muteStream changed to ", c.muteStream), b.callback({
      type: "updatestream",
      config: c
    })
  };
  a.createOffer = function(b) {
    a.peerConnection.createOffer(k.bind(null,
      b), f, b)
  };
  a.addStream = function(b) {
    a.peerConnection.addStream(b)
  };
  a.removeStream = function(b) {
    a.peerConnection.removeStream(b)
  };
  b.remoteCandidates = [];
  b.remoteDescriptionSet = !1;
  a.processSignalingMessage = function(c) {
    L.Logger.debug("Process Signaling Message", c);
    if ("offer" === c.type) c.sdp = l(c.sdp), a.peerConnection.setRemoteDescription(c.sdp, m, function(a) {
      L.Logger.error("Error: ", a)
    });
    else if ("answer" === c.type) L.Logger.debug("Set remote and local description"), L.Logger.debug("Remote Description", c.sdp), L.Logger.debug("Local Description",
      g.sdp), c.sdp = l(c.sdp), a.peerConnection.setRemoteDescription(new RTCSessionDescription(c), function() {
      b.remoteDescriptionSet = !0;
      for (L.Logger.debug("Candidates to be added: ", b.remoteCandidates.length, b.remoteCandidates); 0 < b.remoteCandidates.length;) a.peerConnection.addIceCandidate(b.remoteCandidates.shift());
      for (L.Logger.debug("Local candidates to send:", b.localCandidates.length); 0 < b.localCandidates.length;) b.callback({
        type: "candidate",
        candidate: b.localCandidates.shift()
      })
    });
    else if ("candidate" === c.type) try {
      var e =
        "object" === typeof c.candidate ? c.candidate : L.Utils.toJsonParse(c.candidate);
      if ("end" !== e.candidate) {
        e.candidate = e.candidate.replace(/a=/g, "");
        e.sdpMLineIndex = parseInt(e.sdpMLineIndex);
        var d = new RTCIceCandidate(e);
        b.remoteDescriptionSet ? a.peerConnection.addIceCandidate(d) : b.remoteCandidates.push(d)
      }
    } catch (u) {
      L.Logger.error("Error parsing candidate", c.candidate)
    }
  };
  return a
};
TK = TK || {};
TK.sessionId = 103;
TK.Connection = function(b, a) {
  var d = {};
  b.sessionId = TK.sessionId += 1;
  d.browser = TK.getBrowser();
  if (!0 === a) L.Logger.debug("Talk-Client Stack"), d = TK.TkNativeStack(b);
  else if ("fake" === d.browser) L.Logger.warning("[tk-sdk]Publish/subscribe video/audio streams not supported in erizofc yet"), d = TK.FcStack(b);
  else if ("mozilla" === d.browser) L.Logger.debug("[tk-sdk]Firefox Stack"), d = TK.FirefoxStack(b);
  else if ("bowser" === d.browser) L.Logger.debug("[tk-sdk]Bowser Stack"), d = TK.BowserStack(b);
  else if ("chrome-stable" ===
    d.browser || "electron" === d.browser) L.Logger.debug("[tk-sdk]Chrome Stable Stack"), d = TK.TkChromeStableStack(b);
  else throw L.Logger.error("[tk-sdk]No stack available for this browser"), "WebRTC stack not available";
  d.updateSpec || (d.updateSpec = function(a, b) {
    L.Logger.error("[tk-sdk]Update Configuration not implemented in this browser");
    b && b("unimplemented")
  });
  return d
};
TK.getBrowser = function() {
  var b = "none";
  "undefined" !== typeof module && module.exports ? b = "fake" : null !== window.navigator.userAgent.match("Firefox") ? b = "mozilla" : null !== window.navigator.userAgent.match("Bowser") ? b = "bowser" : null !== window.navigator.userAgent.match("Chrome") ? (b = "chrome-stable", null !== window.navigator.userAgent.match("Electron") && (b = "electron")) : null !== window.navigator.userAgent.match("Safari") ? b = "bowser" : null !== window.navigator.userAgent.match("AppleWebKit") && (b = "bowser");
  return b
};
TK = TK || {};
TK.Stream = function(b, a) {
  return !0 === a ? TK.NativeStream(b) : TK.StreamInner(b)
};
TK.StreamInner = function(b) {
  var a = TK.EventDispatcher(b);
  void 0 !== b.video && "number" === typeof b.video && (b.video = 0 !== b.video);
  void 0 !== b.audio && "number" === typeof b.audio && (b.audio = 0 !== b.audio);
  a.stream = b.stream;
  a.url = b.url;
  a.recording = b.recording;
  a.room = void 0;
  a.playing = !1;
  a.local = !1;
  a.video = b.video;
  a.audio = b.audio;
  a.screen = b.screen;
  a.videoSize = b.videoSize;
  a.videoFrameRate = b.videoFrameRate;
  a.extensionId = b.extensionId;
  a.desktopStreamId = b.desktopStreamId;
  a.videoMuted = !1;
  a.audioMuted = !1;
  a.attributes = b.attributes || {};
  a.isTkNative = !1;
  void 0 === a.attributes.type && L.Logger.error("[tk-sdk]create stream spec.attributes.type is not exist , call video stream type must is video!");
  if (!(void 0 === a.videoSize || a.videoSize instanceof Array && 4 === a.videoSize.length)) throw Error("Invalid Video Size");
  if (void 0 === b.local || !0 === b.local) a.local = !0;
  a.getID = function() {
    return a.local && !b.streamID ? "local" : b.streamID
  };
  a.id = a.getID();
  a.getAttributes = function() {
    return b.attributes
  };
  a.setAttributes = function(b) {
    a.updateLocalAttributes(b)
  };
  a.updateLocalAttributes = function(a) {
    if (a && "object" === typeof a)
      for (var c in a) b.attributes[c] = a[c]
  };
  a.hasAudio = function() {
    return b.audio
  };
  a.changeAudio = function(a) {
    b.audio = a
  };
  a.hasVideo = function() {
    return b.video
  };
  a.changeVideo = function(a) {
    b.video = a
  };
  a.hasData = function() {
    return b.data
  };
  a.changeData = function(a) {
    b.data = a
  };
  a.hasScreen = function() {
    return b.screen
  };
  a.hasMedia = function() {
    return !1
  };
  a.changeScreen = function(a) {
    b.screen = a
  };
  a.sendData = function() {
    L.Logger.error("[tk-sdk]Failed to send data. This Stream object has not that channel enabled.")
  };
  a.init = function(e, c) {
    c = c || {};
    c.initDeviceId && ("object" === typeof c.initDeviceId ? (c.initDeviceId.videoinput && L.Utils.localStorage.setItem(L.Constant.deviceStorage.videoinput, c.initDeviceId.videoinput), c.initDeviceId.audioinput && L.Utils.localStorage.setItem(L.Constant.deviceStorage.audioinput, c.initDeviceId.audioinput), c.initDeviceId.audiooutput && L.Utils.localStorage.setItem(L.Constant.deviceStorage.audiooutput, c.initDeviceId.audiooutput)) : L.Logger.warning("[tk-sdk]stream.init options.initDeviceId must is json , key is (videoinput | audioinput | audiooutput )!"));
    try {
      if ((b.audio || b.video) && void 0 === b.url) {
        L.Logger.debug("[tk-sdk]Requested access to local media");
        e = {
          dispatchEvent: e,
          isDemotionLocalStream: !0,
          isNeedCheckChangeLocalStream: !0,
          isStopLocalStream: !0
        };
        var d = {
          audio: b.audio ? {
            sourceId: L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput)
          } : !1,
          video: b.video ? {
            sourceId: L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput)
          } : !1
        };
        TK.AVMgr.getUserMedia(function(b) {
          L.Logger.debug("[tk-sdk]User has granted access to local media.");
          a.stream =
            b;
          b = void 0;
          a.stream && void 0 !== a.stream.getUserMediaFailureCode && (b = a.stream.getUserMediaFailureCode);
          g = TK.StreamEvent({
            type: "access-accepted",
            message: {
              getUserMediaFailureCode: b
            }
          });
          a.dispatchEvent(g);
          a.stream.getTracks().forEach(function(b) {
            b.onended = function() {
              a.stream.getTracks().forEach(function(a) {
                a.onended = null
              });
              g = TK.StreamEvent({
                type: "stream-ended",
                stream: a,
                message: b.kind
              });
              a.dispatchEvent(g)
            }
          })
        }, function(b) {
          L.Logger.error("[tk-sdk]Failed to get access to local media. Error name was " + b.name +
            ".", b);
          b = TK.StreamEvent({
            type: "access-denied",
            message: {
              code: L.Constant.accessDenied.streamFail,
              msg: b
            }
          });
          a.dispatchEvent(b)
        }, d, e)
      } else {
        e = d = void 0;
        b.audio || b.video ? (d = "There's no audio or video or screen equipment , or url is not undefined", e = L.Constant.accessDenied.notAudioAndVideoAndScreenOrUrlNotUndefined) : (d = "There's no audio or video equipment", e = L.Constant.accessDenied.notAudioAndVideo);
        L.Logger.warning("[tk-sdk]" + d, e);
        var g = TK.StreamEvent({
          type: "access-denied",
          message: {
            code: e,
            msg: d
          }
        });
        a.dispatchEvent(g)
      }
    } catch (k) {
      e =
        L.Constant.accessDenied.ohterError, d = "[tk-sdk]Failed to get access to local media. Error was " + k + ".", L.Logger.error(d), g = TK.StreamEvent({
        type: "access-denied",
        message: {
          code: e,
          msg: d
        }
      }), a.dispatchEvent(g)
    }
  };
  a.close = function() {
    a.local && (void 0 !== a.room && a.room.unpublish(a), a.hide(), void 0 !== a.stream && a.stream.getTracks().forEach(function(a) {
      a.onended = null;
      a.stop()
    }), a.stream = void 0)
  };
  a.play = function(b, c) {
    c = c || {};
    a.elementID = b;
    void 0 !== b && (b = new TK.VideoPlayer({
      id: a.getID(),
      stream: a,
      elementID: b,
      options: c
    }),
      a.player = b, a.playing = !0)
  };
  a.stop = function() {
    a.playing && (void 0 !== a.player && a.player.destroy(), a.playing = !1)
  };
  a.show = function() {
    void 0 !== a.player && a.player.showVideo()
  };
  a.hide = function() {
    void 0 !== a.player && a.player.hideVideo()
  };
  a.setVolume = function(b) {
    void 0 !== a.player && a.player.setVolume && ("number" !== typeof b ? L.Logger.error("[tk-sdk]Stream setVolume volume type must is number!") : a.player.setVolume(b))
  };
  a.hideLoading = function() {
    void 0 !== a.player && a.player.hideLoading && a.player.hideLoading()
  };
  a.showLoading =
    function() {
      void 0 !== a.player && a.player.showLoading && a.player.showLoading()
    };
  var d = function() {
    if (void 0 !== a.player && void 0 !== a.stream) {
      var b = a.player.video,
        c = document.defaultView.getComputedStyle(b),
        d = parseInt(c.getPropertyValue("width"), 10),
        g = parseInt(c.getPropertyValue("height"), 10),
        f = parseInt(c.getPropertyValue("left"), 10);
      c = parseInt(c.getPropertyValue("top"), 10);
      var m = "object" === typeof a.elementID && "function" === typeof a.elementID.appendChild ? a.elementID : document.getElementById(a.elementID);
      var n =
        document.defaultView.getComputedStyle(m);
      m = parseInt(n.getPropertyValue("width"), 10);
      n = parseInt(n.getPropertyValue("height"), 10);
      var q = document.createElement("canvas");
      q.id = "testing";
      q.width = m;
      q.height = n;
      q.setAttribute("style", "display: none");
      q.getContext("2d").drawImage(b, f, c, d, g);
      return q
    }
    return null
  };
  a.getVideoFrameURL = function(a) {
    var b = d();
    return null !== b ? a ? b.toDataURL(a) : b.toDataURL() : null
  };
  a.getVideoFrame = function() {
    var a = d();
    return null !== a ? a.getContext("2d").getImageData(0, 0, a.width, a.height) :
      null
  };
  a.checkOptions = function(b, c) {
    if (!0 === c) {
      if (b.video || b.audio || b.screen) L.Logger.warning("[tk-sdk]Cannot update type of subscription"), b.video = void 0, b.audio = void 0, b.screen = void 0
    } else !1 === a.local && (!0 === b.video && !1 === a.hasVideo() && (L.Logger.warning("[tk-sdk]Trying to subscribe to video when there is no video, won't subscribe to video"), b.video = !1), !0 === b.audio && !1 === a.hasAudio() && (L.Logger.warning("[tk-sdk]Trying to subscribe to audio when there is no audio, won't subscribe to audio"), b.audio = !1));
    !1 !== a.local || a.hasVideo() || !0 !== b.slideShowMode || (L.Logger.warning("[tk-sdk]Cannot enable slideShowMode if it is not a video subscription, please check your parameters"), b.slideShowMode = !1)
  };
  a.updateMuteToServer = function(b) {
    if (a.room && a.room.p2p) L.Logger.warning("[tk-sdk]muteAudio is not implemented in p2p streams"), b("error");
    else if (void 0 !== a.pc) {
      var c = {
        muteStream: {
          video: a.videoMuted,
          audio: a.audioMuted
        }
      };
      a.checkOptions(c, !0);
      a.pc.updateSpec(c, b)
    }
  };
  a._setQualityLayer = function(b, c, d) {
    a.room &&
    a.room.p2p ? (L.Logger.warning("[tk-sdk]setQualityLayer is not implemented in p2p streams"), d("error")) : (b = {
      qualityLayer: {
        spatialLayer: b,
        temporalLayer: c
      }
    }, a.checkOptions(b, !0), a.pc.updateSpec(b, d))
  };
  var f = function(b, c, d) {
    !0 !== c && (c = !1);
    b = "string" === typeof b ? [b] : b;
    b = b instanceof Array ? b : [];
    0 < b.length && a.room.sendControlMessage(a, "control", {
      name: "controlhandlers",
      enable: d,
      publisherSide: c,
      handlers: b
    })
  };
  a.disableHandlers = function(a, b) {
    f(a, b, !1)
  };
  a.enableHandlers = function(a, b) {
    f(a, b, !0)
  };
  a.updateConfiguration =
    function(b, c) {
      if (void 0 !== b)
        if (a.pc)
          if (a.checkOptions(b, !0), a.local)
            if (a.room.p2p)
              for (var d in a.pc) a.pc[d].updateSpec(b, c);
            else a.pc.updateSpec(b, c);
          else a.pc.updateSpec(b, c);
        else c("This stream has no peerConnection attached, ignoring")
    };
  a.muteVideo = function(b, c) {
    a.videoMuted != b && (a.videoMuted = b, void 0 !== a.stream ? (a.stream.getTracks().forEach(function(a) {
      "video" === a.kind && (a.enabled = !b)
    }), a.updateMuteToServer(c)) : L.Logger.warning("[tk-sdk]not deviceStream to muteVideo"))
  };
  a.muteAudio = function(b,
                         c) {
    a.audioMuted != b && (a.audioMuted = b, void 0 !== a.stream ? (a.stream.getTracks().forEach(function(a) {
      "audio" === a.kind && (a.enabled = !b)
    }), a.updateMuteToServer(c)) : L.Logger.warning("[tk-sdk]not deviceStream to muteVideo"))
  };
  return a
};
TK = TK || {};
TK.NativeStream = function(b) {
  var a = TK.EventDispatcher(b);
  a.stream = b.stream;
  a.url = b.url;
  a.recording = b.recording;
  a.room = void 0;
  a.playing = !1;
  a.local = !1;
  a.video = b.video;
  a.audio = b.audio;
  a.screen = b.screen;
  a.media = b.media;
  a.videoSize = b.videoSize;
  a.videoFrameRate = b.videoFrameRate;
  a.extensionId = b.extensionId;
  a.desktopStreamId = b.desktopStreamId;
  a.path = b.path;
  a.videoMuted = !1;
  a.audioMuted = !1;
  a.isTkNative = !0;
  if (!(void 0 === a.videoSize || a.videoSize instanceof Array && 4 === a.videoSize.length)) throw Error("Invalid Video Size");
  if (void 0 ===
    b.local || !0 === b.local) a.local = !0;
  if (b.screen && b.media) throw Error("Wrong stream type which contains both media and screen");
  a.path || (a.path = "");
  var d = function() {
    return a.media ? 1 : a.screen ? 2 : 0
  };
  a.getID = function() {
    return a.local && !b.streamID ? "local" : b.streamID
  };
  a.getAttributes = function() {
    return b.attributes
  };
  a.setAttributes = function(b) {
    a.updateLocalAttributes(b)
  };
  a.updateLocalAttributes = function(a) {
    if (a && "object" === typeof a)
      for (var c in a) b.attributes[c] = a[c]
  };
  a.hasAudio = function() {
    return b.audio
  };
  a.hasVideo =
    function() {
      return b.video
    };
  a.hasData = function() {
    return b.data
  };
  a.hasScreen = function() {
    return b.screen
  };
  a.hasMedia = function() {
    return b.media
  };
  a.sendData = function() {
    L.Logger.error("[tk-sdk]Failed to send data. This Stream object has not that channel enabled.")
  };
  a.init = function() {
    try {
      if ((b.audio || b.video || b.screen) && void 0 === b.url) {
        L.Logger.debug("[tk-sdk]Requested access to local media");
        var c = b.video;
        !0 === c || !0 === b.screen ? (c = !0 === c ? {} : c, void 0 !== a.videoSize && (c.mandatory = c.mandatory || {}, c.mandatory.minWidth =
          a.videoSize[0], c.mandatory.minHeight = a.videoSize[1], c.mandatory.maxWidth = a.videoSize[2], c.mandatory.maxHeight = a.videoSize[3]), void 0 !== a.videoFrameRate && (c.optional = c.optional || [], c.optional.push({
          minFrameRate: a.videoFrameRate[0]
        }), c.optional.push({
          maxFrameRate: a.videoFrameRate[1]
        }))) : !0 === b.screen && void 0 === c && (c = !0);
        TK.AVMgr.getUserMedia(function(b) {
          L.Logger.debug("[tk-sdk]User has granted access to local media.");
          a.stream = b;
          d = TK.StreamEvent({
            type: "access-accepted"
          });
          a.dispatchEvent(d)
        }, function(b) {
          L.Logger.error("[tk-sdk]Failed to get access to local media. Error name was " +
            b.name + ".", b);
          b = TK.StreamEvent({
            type: "access-denied",
            msg: b
          });
          a.dispatchEvent(b)
        }, {
          video: c,
          audio: b.audio,
          fake: b.fake,
          screen: b.screen,
          extensionId: a.extensionId,
          desktopStreamId: a.desktopStreamId
        }, {
          isDemotionLocalStream: !0,
          isNeedCheckChangeLocalStream: !0,
          isStopLocalStream: !0
        })
      } else {
        var d = TK.StreamEvent({
          type: "access-accepted"
        });
        a.dispatchEvent(d)
      }
    } catch (g) {
      L.Logger.error("[tk-sdk]Failed to get access to local media. Error was:", g), d = TK.StreamEvent({
        type: "access-denied",
        msg: g
      }), a.dispatchEvent(d)
    }
  };
  a.close =
    function() {
      a.local && (void 0 !== a.room && a.room.unpublish(a), a.hide(), a.stream = void 0)
    };
  a.create = function() {
    a.local ? tknative.postMessage({
      command: "playStream",
      connectionId: b.extensionId.toString(),
      isLocal: !0,
      type: Number(d()),
      args: {
        path: a.path.toString()
      }
    }) : tknative.postMessage({
      command: "playStream",
      connectionId: b.extensionId.toString(),
      isLocal: !1,
      type: Number(d())
    })
  };
  a.destroy = function() {
    a.local ? tknative.postMessage({
      command: "stopStream",
      connectionId: b.extensionId.toString(),
      isLocal: !0,
      type: Number(d())
    }) :
      tknative.postMessage({
        command: "stopStream",
        connectionId: b.extensionId.toString(),
        isLocal: !1,
        type: Number(d())
      })
  };
  a.play = function(c, e) {
    e = e || {};
    a.elementID = c;
    void 0 !== c && (c = new TK.NativeVideoPlayer({
      id: b.extensionId,
      stream: a,
      elementID: c,
      options: e
    }), a.player = c, a.playing = !0, a.local ? tknative.postMessage({
      command: "playStream",
      connectionId: b.extensionId.toString(),
      isLocal: !0,
      type: Number(d()),
      args: {
        path: a.path.toString()
      }
    }) : tknative.postMessage({
      command: "playStream",
      connectionId: b.extensionId.toString(),
      isLocal: !1,
      type: Number(d())
    }));
    a && a.getAttributes && a.getAttributes() && "video" === a.getAttributes().type && a.extensionId && TK && TK.checkMyAudioAndVideoEnable && TK.checkMyAudioAndVideoEnable && "function" === typeof TK.checkMyAudioAndVideoEnable && TK.checkMyAudioAndVideoEnable(a.extensionId)
  };
  a.stop = function() {
    a.playing && (void 0 !== a.player && a.player.destroy(), a.playing = !1, a.local ? tknative.postMessage({
      command: "stopStream",
      connectionId: b.extensionId.toString(),
      isLocal: !0,
      type: Number(d())
    }) : tknative.postMessage({
      command: "stopStream",
      connectionId: b.extensionId.toString(),
      isLocal: !1,
      type: Number(d())
    }))
  };
  a.show = function() {
    void 0 !== a.player && a.player.showVideo()
  };
  a.hide = function() {
    void 0 !== a.player && a.player.hideVideo()
  };
  a.setVolume = function(b) {
    void 0 !== a.player && a.player.setVolume && ("number" !== typeof b ? L.Logger.error("[tk-sdk]Stream setVolume volume type must is number!") : a.player.setVolume(b))
  };
  a.hideLoading = function() {
    void 0 !== a.player && a.player.hideLoading && a.player.hideLoading()
  };
  a.showLoading = function() {
    void 0 !== a.player &&
    a.player.showLoading && a.player.showLoading()
  };
  var f = function() {
    if (void 0 !== a.player && void 0 !== a.stream) {
      var b = a.player.video,
        d = document.defaultView.getComputedStyle(b),
        e = parseInt(d.getPropertyValue("width"), 10),
        f = parseInt(d.getPropertyValue("height"), 10),
        m = parseInt(d.getPropertyValue("left"), 10);
      d = parseInt(d.getPropertyValue("top"), 10);
      var n = "object" === typeof a.elementID && "function" === typeof a.elementID.appendChild ? a.elementID : document.getElementById(a.elementID);
      var q = document.defaultView.getComputedStyle(n);
      n = parseInt(q.getPropertyValue("width"), 10);
      q = parseInt(q.getPropertyValue("height"), 10);
      var t = document.createElement("canvas");
      t.id = "testing";
      t.width = n;
      t.height = q;
      t.setAttribute("style", "display: none");
      t.getContext("2d").drawImage(b, m, d, e, f);
      return t
    }
    return null
  };
  a.getVideoFrameURL = function(a) {
    var b = f();
    return null !== b ? a ? b.toDataURL(a) : b.toDataURL() : null
  };
  a.getVideoFrame = function() {
    var a = f();
    return null !== a ? a.getContext("2d").getImageData(0, 0, a.width, a.height) : null
  };
  a.checkOptions = function(b, d) {
    if (!0 ===
      d) {
      if (b.video || b.audio || b.screen) L.Logger.warning("[tk-sdk]Cannot update type of subscription"), b.video = void 0, b.audio = void 0, b.screen = void 0
    } else !1 === a.local && (!0 === b.video && !1 === a.hasVideo() && (L.Logger.warning("[tk-sdk]Trying to subscribe to video when there is no video, won't subscribe to video"), b.video = !1), !0 === b.audio && !1 === a.hasAudio() && (L.Logger.warning("[tk-sdk]Trying to subscribe to audio when there is no audio, won't subscribe to audio"), b.audio = !1));
    !1 !== a.local || a.hasVideo() || !0 !== b.slideShowMode ||
    (L.Logger.warning("[tk-sdk]Cannot enable slideShowMode if it is not a video subscription, please check your parameters"), b.slideShowMode = !1)
  };
  a.updateMuteToServer = function(b) {
    if (a.room && a.room.p2p) L.Logger.warning("[tk-sdk]muteAudio is not implemented in p2p streams"), b("error");
    else if (void 0 !== a.pc) {
      var c = {
        muteStream: {
          video: a.videoMuted,
          audio: a.audioMuted
        }
      };
      a.checkOptions(c, !0);
      a.pc.updateSpec(c, b)
    }
  };
  a._setQualityLayer = function(b, d, e) {
    a.room && a.room.p2p ? (L.Logger.warning("[tk-sdk]setQualityLayer is not implemented in p2p streams"),
      e("error")) : (b = {
      qualityLayer: {
        spatialLayer: b,
        temporalLayer: d
      }
    }, a.checkOptions(b, !0), a.pc.updateSpec(b, e))
  };
  var e = function(b, d, e) {
    !0 !== d && (d = !1);
    b = "string" === typeof b ? [b] : b;
    b = b instanceof Array ? b : [];
    0 < b.length && a.room.sendControlMessage(a, "control", {
      name: "controlhandlers",
      enable: e,
      publisherSide: d,
      handlers: b
    })
  };
  a.disableHandlers = function(a, b) {
    e(a, b, !1)
  };
  a.enableHandlers = function(a, b) {
    e(a, b, !0)
  };
  a.updateConfiguration = function(b, d) {
    if (void 0 !== b)
      if (a.pc)
        if (a.checkOptions(b, !0), a.local)
          if (a.room.p2p)
            for (var c in a.pc) a.pc[c].updateSpec(b,
              d);
          else a.pc.updateSpec(b, d);
        else a.pc.updateSpec(b, d);
      else d("This stream has no peerConnection attached, ignoring")
  };
  a.muteVideo = function(b, d) {
    a.videoMuted != b && (a.videoMuted = b, tknative.postMessage({
      command: "enableVideo",
      enable: !b
    }), void 0 !== a.stream ? a.updateMuteToServer(d) : L.Logger.warning("[tk-sdk]not deviceStream to muteVideo"))
  };
  a.muteAudio = function(b, d) {
    a.audioMuted != b && (a.audioMuted = b, tknative.postMessage({
      command: "enableAudio",
      enable: !b
    }), void 0 !== a.stream ? a.updateMuteToServer(d) : L.Logger.warning("[tk-sdk]not deviceStream to muteVideo"))
  };
  return a
};
TK = TK || {};
TK.nativeCallSeq = 0;
TK.waitNativeToCallbackList = {};
TK.SDKTYPE = "pc";
var tknative;
TK.NativeInfo = function() {
  try {
    var b = {};
    return b = talk_window
  } catch (a) {
    return null
  }
};
TK.Initialize = function(b, a) {
  try {
    if (b) {
      if (TK.isTkNative = !0, TK.isTkMacNative = a, tknative = tknative || TK.nativeEntry(), TK.AVMgr = null, TK.AVMgr = TK.NativeAVMgr(), tknative.postMessage({
          command: "maximizeNativeClient"
        }), c = void 0, e = TK.NativeInfo()) c = e.clientversion
    } else {
      TK.isTkNative = !1;
      TK.isTkMacNative = !1;
      var d = document.getElementById("tknative");
      if (d && d.nodeName && "embed" === d.nodeName.toLowerCase()) {
        var f = d.parentNode;
        f && f.removeChild(d)
      }
      var e = TK.NativeInfo(),
        c = void 0;
      e && e.maxmizeWindow && "function" === typeof e.maxmizeWindow &&
      (e.maxmizeWindow(), c = e.clientversion)
    }
    TK.subscribe_from_native = TK.isTkNative && !TK.isTkMacNative && 2018031E3 <= c;
    L.Logger.info("[tk-sdk]isClient:" + TK.isTkNative + ",clientVersion:" + c)
  } catch (l) {
    L.Logger.error("[tk-sdk]Initialize error:", l)
  }
};
TK.Room = function() {
  function b(a) {
    if (!G) {
      var b = L.Utils.localStorage.getItem("tkLocalstorageServerName");
      b && void 0 !== b && null !== b && "undefined" !== b && "null" !== b ? G = b : a && !/(192.168.|127.0.0.1|127.17.|localhost)/g.test(a) ? (b = a.indexOf("."), 0 < b ? (a = a.substring(0, b)) && (G = a) : L.Logger.warning("[tk-sdk]firstSaveServerNameToLocalStorage--\x3eweb request host not find first dot , current host is " + (window.__TkSdkBuild__ ? L.Utils.encrypt(a) : a) + " ! ")) : L.Logger.warning("[tk-sdk]firstSaveServerNameToLocalStorage--\x3eservername is undefined and web_host is exist or not a domain name , current host is " +
        (window.__TkSdkBuild__ ? L.Utils.encrypt(a) : a) + " ! ")
    }
  }

  function a(a, b, c, d) {
    y = a || y;
    F = b || F;
    void 0 === fa && (fa = y);
    void 0 === ca && (ca = F);
    ya || (fa = y, ca = F);
    fa = c || fa;
    ca = d || ca;
    a = TK.RoomEvent({
      type: "room-updateWebAddressInfo",
      message: {
        web_host: y,
        web_port: F,
        doc_host: fa,
        doc_port: ca
      }
    });
    h.dispatchEvent(a)
  }

  function d(a, b, c) {
    var r = W;
    a = a || {};
    a.source = a.source || "unknown source";
    var d = a.source;
    x(y, F, function(a, e) {
      if (0 !== a) L.Logger.error("[tk-sdk]" + d + ":step2GetConfig failure --\x3e result and responseText:", a, e);
      else if (0 ==
        a && 2 == B) {
        if (r !== W) {
          h.needReconnectSocket = !0;
          da && h.stopIntervalRtcStatsrObserver();
          v.rtcStatsrObserverTimer && h.stopIntervalRtcStatsrObserverByStream(v);
          TK.isTkNative && (ea = !1, tknative.postMessage({
            command: "nativeClear"
          }));
          ia = !1;
          try {
            h.socket && h.socket.disconnect && h.socket.disconnect()
          } catch (Ua) {
            L.Logger.debug("[tk-sdk]" + d + ":Socket already disconnected , disconnect errorInfo:", Ua)
          }
          h.socket = void 0;
          "select service reconnect" === d && (m(), a = TK.RoomEvent({
            type: "room-disconnected",
            message: "select service reconnect , need socket disconnect"
          }),
            h.dispatchEvent(a))
        }
        D(y, F, function(a, e) {
          L.Logger.debug("[tk-sdk]reconnected room:step2GetFileList result \x3d " + a + " , message:" + L.Utils.toJsonStringify(e)); - 1 !== a ? (void 0 !== e ? (ja = e, a = TK.RoomEvent({
            type: "room-files",
            message: ja
          })) : (ja = [], a = TK.RoomEvent({
            type: "room-error",
            message: {
              source: L.Constant.roomError.GETFILELISTERROR,
              error: a
            }
          })), h.dispatchEvent(a)) : L.Logger.info("[tk-sdk]" + d + ":step2GetFileList code is " + a);
          r === W ? (L.Logger.info("[tk-sdk]" + d + ":room socket url not change  , room socket url:" + (window.__TkSdkBuild__ ?
              L.Utils.encrypt(W) : W) + "! "), "reconnected room" === d ? w(b, c) : "select service reconnect" === d && (L.Logger.warning("[tk-sdk]room uri is not change , no need to perform a reload server"), la && p && p.id && A[p.id] && G !== p.servername && h.changeUserProperty(p.id, "__all", {
              servername: G
            }))) : (L.Logger.info("[tk-sdk]" + d + ":room socket url  changed  , old room socket url:" + (window.__TkSdkBuild__ ? L.Utils.encrypt(r) : r) + "  , now room socket url:" + (window.__TkSdkBuild__ ? L.Utils.encrypt(W) : W) + "! "), z())
        })
      } else L.Logger.error("[tk-sdk]" +
        d + ":step2GetConfig failure --\x3e result and responseText:", a, e, " , _status \x3d " + B), a = TK.RoomEvent({
        type: "room-error",
        message: {
          source: L.Constant.roomError.GETCONFIGERROR,
          error: a
        }
      }), h.dispatchEvent(a)
    })
  }

  function f(a, b) {
    a = a || J;
    b = b || G;
    if (void 0 !== a && void 0 !== b)
      for (var c in a) a[c].isUseServer = b === c ? !0 : !1
  }

  function e() {
    if (!/(192.168.|127.0.0.1|127.17.|localhost)/g.test(y))
      if (void 0 !== y) {
        var b = y.indexOf(".");
        0 < b ? (b = y.substring(0, b), b = new RegExp(b), qa = y, b = y.replace(b, G), b !== y ? (L.Logger.info("[tk-sdk]changeWebRequest host , old host is " +
          (window.__TkSdkBuild__ ? L.Utils.encrypt(qa) : qa) + ", now host is " + (window.__TkSdkBuild__ ? L.Utils.encrypt(b) : b)), a(b)) : L.Logger.info("[tk-sdk]changeWebRequest host , host is not change ,   host is " + (window.__TkSdkBuild__ ? L.Utils.encrypt(y) : y))) : L.Logger.error("[tk-sdk]web request host not find first dot , cannot address to replace , current host is " + (window.__TkSdkBuild__ ? L.Utils.encrypt(y) : y) + " ! ")
      } else L.Logger.error("[tk-sdk]web request host is not exist , cannot call changeWebRequestAddress ! ")
  }

  function c(a, b, c) {
    a = a || p.publishstate;
    b = b || {
        hasvideo: p.hasvideo,
        disablevideo: p.disablevideo
      };
    c = c || {
        hasaudio: p.hasaudio,
        disableaudio: p.disableaudio
      };
    a > TK.PUBLISH_STATE_NONE && (g(b.hasvideo && !b.disablevideo && (a === TK.PUBLISH_STATE_VIDEOONLY || a === TK.PUBLISH_STATE_BOTH)), l(c.hasaudio && !c.disableaudio && (a === TK.PUBLISH_STATE_AUDIOONLY || a === TK.PUBLISH_STATE_BOTH)))
  }

  function l(a) {
    v.muteAudio(!a, function(a) {
      if (void 0 !== v.getID() || "local" !== v.getID()) L.Logger.debug("[tk-sdk]Sending message", a), a = V(a), X("signaling_message", {
        streamId: v.getID(),
        msg: a
      })
    })
  }

  function g(a) {
    v.muteVideo(!a, function(a) {
      if (void 0 !== v.getID() || "local" !== v.getID()) L.Logger.debug("[tk-sdk]Sending message", a), a = V(a), X("signaling_message", {
        streamId: v.getID(),
        msg: a
      })
    })
  }

  function k(a, b, c) {
    "failed" === b && (void 0 === a.reconnectionNumber && (a.reconnectionNumber = 0), 0 !== h.state && a && 3 > a.reconnectionNumber ? "publish" === c ? a.extensionId === p.id ? (L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3eunpublish , stream id:" + a.getID() + " , extensionId is " + a.extensionId +
      ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.unpublish(a, function(b) {
      setTimeout(function() {
        b || L.Logger.warning("[tk-sdk]oniceconnectionstatechange failed: unpublish in not success , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()) + " !");
        p.publishstate > TK.PUBLISH_STATE_NONE ? (L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3epublish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())),
          a.reconnectionNumber++, h.publish(a, {
          reconnection: !0
        })) : L.Logger.warning("[tk-sdk]oniceconnectionstatechange failed --\x3emy publishstate is 0 , not need afresh publish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
      }, 1E3)
    }, {
      reconnection: !0
    })) : (h.unpublish(a), L.Logger.info("[tk-sdk]publish stream stream.extensionId !\x3d _myself.id   , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))) :
      "subscribe" === c && (L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3eunsubscribe , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.unsubscribe(a, function(b) {
        setTimeout(function() {
          b || L.Logger.warning("[tk-sdk]oniceconnectionstatechange failed: unsubscribe in not success , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()) + " !");
          if (h.remoteStreams[a.getID()]) {
            a.reconnectionNumber++;
            L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3estream-removed(initiative) , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
            var r = TK.StreamEvent({
              type: "stream-removed",
              stream: a,
              message: {
                reconnection: !0,
                reconnectionNumber: a.reconnectionNumber,
                isCompleted: a.isCompleted,
                source: c,
                isNotRemote: !0
              }
            });
            h.dispatchEvent(r);
            L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3esubscribe , stream id:" + a.getID() + " , extensionId is " +
              a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
            h.subscribe(a, {
              reconnection: !0
            })
          } else L.Logger.info("[tk-sdk]oniceconnectionstatechange failed --\x3eremoteStreams does not contain streams , not need afresh subscribe , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
        }, 1E3)
      }, {
        reconnection: !0
      })) : 3 <= a.reconnectionNumber && ("publish" === c ? a.extensionId === p.id && p.publishstate > TK.PUBLISH_STATE_NONE ? h.changeUserProperty(a.extensionId,
        "__all", {
          publishstate: TK.PUBLISH_STATE_NONE
        }) : h.unpublish(a) : "subscribe" === c && h.unsubscribe(a), a.isCompleted || p.udpstate === L.Constant.udpState.notOnceSuccess || h.changeUserProperty(p.id, "__all", {
        udpstate: L.Constant.udpState.notOnceSuccess
      }), L.Logger.info("[tk-sdk]stream-reconnection-failed , source is " + c + ", isCompleted is " + a.isCompleted + ", reconnectionNumber is " + a.reconnectionNumber + " , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())),
        b = TK.StreamEvent({
          type: "stream-reconnection-failed",
          message: {
            reconnectionNumber: a.reconnectionNumber,
            source: c,
            isCompleted: a.isCompleted,
            code: a.isCompleted ? L.Constant.streamReconnection.midwayReconnectionNotSuccess : L.Constant.streamReconnection.notOnceSuccess
          },
          stream: a
        }), h.dispatchEvent(b)))
  }

  function m() {
    var a;
    for (a in h.remoteStreams)
      if (h.remoteStreams.hasOwnProperty(a)) {
        var b = h.remoteStreams[a];
        ra(b);
        delete h.remoteStreams[a];
        b && !b.failed && (L.Logger.info("[tk-sdk]_resetRoomState--\x3estream-removed(), stream id:" +
          b.getID() + " , extensionId is " + b.extensionId + ", attrs is " + L.Utils.toJsonStringify(b.getAttributes())), b = TK.StreamEvent({
          type: "stream-removed",
          stream: b
        }), h.dispatchEvent(b))
      }
    h.remoteStreams = {};
    for (a in h.localStreams)
      if (h.localStreams.hasOwnProperty(a)) {
        b = h.localStreams[a];
        if (h.p2p)
          for (var c in b.pc) b.pc[c].close();
        else b.pc.close();
        delete h.localStreams[a]
      }
    v && v.pc && v.pc.close && v.pc.close();
    A && (t(N), q(A));
    p && (p.publishstate = TK.PUBLISH_STATE_NONE)
  }

  function n(a) {
    L.Logger.debug("[tk-sdk]setStatus to: " +
      a);
    B != a && (B = a, 6 == B ? (N[p.role] || (N[p.role] = {}), N[p.role][p.id] = p, A[p.id] = p, p.publishstate > TK.PUBLISH_STATE_NONE && (c(p.publishstate), h.publish(v))) : 8 == B ? m() : 0 == B && m())
  }

  function q(a) {
    if (C)
      for (b in a) a[b].playbackLeaved = !0;
    else
      for (var b in a) delete a[b]
  }

  function t(a) {
    if (!C)
      for (var b in a) delete a[b]
  }

  function u(a, b, c, d, e, f) {
    var r = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    r.open(a, b, c);
    r.setRequestHeader("Content-Type", f ? f : "application/x-www-form-urlencoded;charset\x3dutf-8");
    r.send(d);
    r.onreadystatechange = e;
    return r
  }

  function x(b, c, d) {
    n(2);
    if (void 0 == O) d(3, null);
    else {
      L.Logger.debug("[tk-sdk]Going to getConfig");
      c = S + b + ":" + c + "/ClientAPI/getconfig?ts\x3d" + (new Date).getTime();
      var r = u("POST", c, !0, "serial\x3d" + O + "\x26userrole\x3d" + p.role, function() {
        if (4 == r.readyState)
          if (200 == r.status) {
            var c = L.Utils.toJsonParse(r.responseText);
            L.Logger.debug("[tk-sdk]getConfig resp \x3d ", L.Utils.toJsonStringify(c));
            Ia = c;
            var e = b,
              f = "8889";
            if (void 0 === za || void 0 === Aa) {
              if (void 0 !== c.courseserver) {
                var g =
                  c.courseserver;
                null !== g && void 0 !== g && 0 < g.length && (e = g)
              }
              void 0 !== c.courseserverport && (f = /http:/g.test(S) ? Number(c.courseserverport) + 1 : Number(c.courseserverport))
            } else e = za, f = Aa;
            Ba ? c.LiveDocServerAddr && (ya = c.LiveDocServerAddr, a(y, F, c.LiveDocServerAddr, ca)) : c.ClassDocServerAddr && (ya = c.ClassDocServerAddr, a(y, F, c.ClassDocServerAddr, ca));
            W = S + e + ":" + f;
            I(e, Ja);
            L.Logger.debug("[tk-sdk]_room_uri \x3d " + W);
            d(c ? 0 : 3, r.responseText)
          } else L.Logger.error("[tk-sdk]getConfig fail[readyState-status]:", r.readyState, r.status),
            d(3, r.responseText)
      })
    }
  }

  function D(a, b, c) {
    if (void 0 === O) c(3, void 0);
    else if (Ka) {
      L.Logger.debug("[tk-sdk]Going to getFileList");
      a = S + a + ":" + b + "/ClientAPI/getroomfile?ts\x3d" + (new Date).getTime();
      var d = u("POST", a, !0, "serial\x3d" + O, function() {
        if (4 == d.readyState)
          if (200 == d.status) {
            var a = L.Utils.toJsonParse(d.responseText);
            L.Logger.debug("[tk-sdk]getFileList resp \x3d ", L.Utils.toJsonStringify(a));
            var b = a.result,
              r;
            0 == b && void 0 !== a.roomfile ? r = a.roomfile : L.Logger.info("[tk-sdk]getFileList resp.roomfile is not exist , nRet:" +
              b);
            c(b, r)
          } else L.Logger.error("[tk-sdk]getFileList fail[readyState-status]:", d.readyState, d.status), c(3, void 0)
      })
    } else c(-1, void 0)
  }

  function I(a, b) {
    La && (b = S + a + ":" + b + "/where.html?ts\x3d" + (new Date).getTime(), (sa = Ba || /(192.168.|127.0.0.1|127.17.|localhost)/g.test(a) ? !1 : !0) && $.ajax({
      url: b,
      type: "get",
      async: !1
    }).done(function(a) {
      L.Logger.info("[tk-sdk]getFalsificationIp resp :", window.__TkSdkBuild__ ? L.Utils.encrypt("object" === typeof a ? L.Utils.toJsonStringify(a) : a) : "object" === typeof a ? L.Utils.toJsonStringify(a) :
        a);
      "string" === typeof a && (a = L.Utils.toJsonParse(a));
      a && "object" === typeof a ? (a.name && "string" === typeof a.name && (Ma = a.name.replace(/(^\s*)|(\s*$)/g, "")), a.nochange ? (sa = !1, L.Logger.info("[tk-sdk]no strings change SDP  , ipFalsificationName is " + Ma)) : a.ip && "string" === typeof a.ip && (ta = a.ip.replace(/(^\s*)|(\s*$)/g, ""))) : L.Logger.warning("[tk-sdk]getFalsificationIp resp not is json")
    }).fail(function(a) {
      L.Logger.error("[tk-sdk]getFalsificationIp fail:", a)
    }))
  }

  function z(a, b) {
    L.Logger.debug("[tk-sdk]step3Connect");
    3 <= B || (n(3), L.Logger.info("[tk-sdk]socket connect address:" + (window.__TkSdkBuild__ ? L.Utils.encrypt(W) : W)), la = !1, Na(W, H._handler_connectSocketSuccess, function(a) {
      L.Logger.error("[tk-sdk]Not Connected! Error: " + a);
      a = TK.RoomEvent({
        type: "room-error",
        message: {
          source: L.Constant.roomError.ROOMCONNECTERROR,
          error: a
        }
      });
      h.dispatchEvent(a)
    }))
  }

  function w(a, b) {
    if (!(5 <= B))
      if (void 0 == p.id || void 0 == O) L.Logger.error("[tk-sdk]Invalid status", p, O);
      else {
        n(5);
        p && (G && (p.servername = G), p.udpstate = L.Constant.udpState.ok);
        var c = {},
          d;
        for (d in p) "id" != d && "watchStatus" != d && (c[d] = p[d]);
        c = {
          userId: p.id,
          roomId: O,
          maxVideo: ba,
          videofps: Q,
          videowidth: Y,
          videoheight: ha,
          properties: c,
          roomtype: T.roomtype
        };
        if (C) {
          if (!ua) {
            L.Logger.error("[tk-sdk]The playback file address does not exist!");
            return
          }
          c.recordfilepath = ua
        }
        L.Logger.info("joinRoom params info:" + (window.__TkSdkBuild__ ? L.Utils.encrypt(L.Utils.toJsonStringify(c)) : L.Utils.toJsonStringify(c)));
        R("joinRoom", c, a, b)
      }
  }

  function M(a, b, c) {
    L.Logger.debug("[tk-sdk]Going to webInterfaceGetserver");
    a = S + a + ":" + b + "/ClientAPI/getserverarea?ts\x3d" + (new Date).getTime();
    console.log(a);

    $.ajax({
      url: a,
      type: "post",
      async: !0
    }).done(function(a) {
      L.Logger.info("[tk-sdk]webInterfaceGetserver resp \x3d ", window.__TkSdkBuild__ ? L.Utils.encrypt(L.Utils.toJsonStringify(a)) : L.Utils.toJsonStringify(a));
      a = L.Utils.toJsonParse(a);
      var b = a.result;
      J = {};
      if (0 == b && void 0 !== a.serverarealist)
        for (var d in a.serverarealist) {
          var r = a.serverarealist[d];
          J[r.serverareaname] = r
        } else L.Logger.info("[tk-sdk]webInterfaceGetserver resp.serverarealist is not exist , nRet:" +
        b);
      c(b, L.Utils.toJsonStringify(a))
    }).fail(function(a) {
      L.Logger.error("[tk-sdk]webInterfaceGetserver fail[readyState-status]:", a);
      c(3, void 0)
    })
  }

  function P(a, b, c) {
    var d = S + y + ":" + F + "/ClientAPI/uploaddocument?ts\x3d" + (new Date).getTime();
    console.log(d);
    if (a) return $.ajax({
      url: d,
      dataType: "json",
      type: "POST",
      data: a,
      async: !0,
      processData: !1,
      contentType: !1,
      xhr: function() {
        var a = $.ajaxSettings.xhr();
        if (a.upload) return c && "function" === typeof c && (L.Utils.removeEvent(a.upload, "progress", xa.bind(h, c), !1), L.Utils.addEvent(a.upload,
          "progress", xa.bind(h, c), !1)), a
      }
    }).done(function(a) {
      L.Logger.debug("[tk-sdk]uploadFile resp \x3d ", L.Utils.toJsonStringify(a));
      b && "function" === typeof b && b(a.result, a)
    }).fail(function(a, c, d) {
      L.Logger.error("[tk-sdk]uploadFile fail[ jqXHR , textStatus , errorThrown ]:", a, c, d);
      b && "function" === typeof b && b(3, void 0)
    });
    L.Logger.error("[tk-sdk]uploadFile formData is required!")
  }

  function U(a, b) {
    var c = S + y + ":" + F + "/ClientAPI/delroomfile?ts\x3d" + (new Date).getTime();
    console.log(c);
    void 0 === a || null === a ? L.Logger.error("[tk-sdk]deleteFile fileid is required!") :
      $.ajax({
        url: c,
        dataType: "json",
        type: "POST",
        anync: !1,
        data: {
          serial: T.serial,
          fileid: a
        }
      }).done(function(a) {
        L.Logger.debug("[tk-sdk]deleteFile resp \x3d ", L.Utils.toJsonStringify(a));
        b && "function" === typeof b && b(a.result, a)
      }).fail(function(a, c, d) {
        L.Logger.error("[tk-sdk]deleteFile fail[ jqXHR , textStatus , errorThrown ]:", a, c, d);
        b(3, void 0)
      })
  }

  function K(a) {
    clearTimeout(h._deviceChangeCallbackTimer);
    h._deviceChangeCallbackTimer = setTimeout(function() {
      if (la && p && void 0 != p.id && A[p.id] && !C) {
        var a = L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput),
          b = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput);
        TK.AVMgr.enumerateDevices(function(d) {
          var r = d.hasdevice;
          d = {};
          var e = !1,
            f = L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput),
            k = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput);
          p.hasvideo !== r.videoinput && (d.hasvideo = r.videoinput, e = !0);
          p.hasaudio !== r.audioinput && (d.hasaudio = r.audioinput, e = !0);
          r = function() {
            TK.AVMgr.getUserMedia(function(a) {
              if (v.stream) {
                for (var b in a) /^customdata_/g.test(b) && (v.stream[b] =
                  a[b]);
                var d = v.stream.getTracks();
                for (b = 0; b < d.length; b++) {
                  var r = d[b];
                  v.stream.removeTrack(r)
                }
                a = a.getTracks();
                for (b = 0; b < a.length; b++) r = a[b], v.stream.addTrack(r)
              } else v.stream = a;
              v.player && v.player.changeMediaStreamUrl(v.stream);
              var e = p.publishstate;
              e > TK.PUBLISH_STATE_NONE && h.unpublish(v, function(a, b) {
                l(!0);
                g(!0);
                void 0 != a && (c(p.publishstate), e > TK.PUBLISH_STATE_NONE && h.publish(v))
              })
            }, void 0, void 0, {
              isDemotionLocalStream: !0,
              isNeedCheckChangeLocalStream: !0,
              isStopLocalStream: !1
            })
          };
          e ? (L.Logger.info("[tk-sdk]change device:my old device info  [hasvideo , hasaudio] is [" +
            p.hasvideo + " ," + p.hasaudio + "] , change device property is " + L.Utils.toJsonStringify(d)), 0 === h.changeUserProperty(p.id, "__all", d) && (void 0 != d.hasvideo && p.hasvideo !== d.hasvideo && (p.hasvideo = d.hasvideo), void 0 != d.hasaudio && p.hasaudio !== d.hasaudio && (p.hasaudio = d.hasaudio)), v && (v.hasVideo() !== p.hasvideo && v.changeVideo(p.hasvideo), v.hasAudio() !== p.hasaudio && v.changeAudio(p.hasaudio)), r()) : a === f && b === k || r()
        }, {
          isSetlocalStorage: !0
        })
      }
      var d = document.getElementsByTagName("audio"),
        r = document.getElementsByTagName("video"),
        e = [];
      if (d && 0 < d.length)
        for (var f = 0; f < d.length; f++) e.push(d[f]);
      if (r && 0 < r.length)
        for (f = 0; f < r.length; f++) e.push(r[f]);
      0 < e.length && TK.AVMgr.setElementSinkIdToAudioouputDevice(e);
      h.dispatchEvent({
        type: "device_change"
      })
    }, 250)
  }

  function V(a) {
    if (!sa || !ta) return a;
    if ("offer" === a.type || "candidate" === a.type) {
      var b = L.Utils.toJsonStringify(a),
        c = /(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/g;
      c.test(b) && (a = L.Utils.toJsonParse(b.replace(c, "254.254.254.254")))
    }
    return a
  }

  function Sa(a, b) {
    var c = !1,
      d = !1,
      e = 0;
    d = a.getID() !== v.getID();
    var r = 0,
      f = {
        frameWidth: 0,
        frameHeight: 0
      },
      g = 0,
      l = 0,
      k = e = 0,
      h = 0,
      aa = 0,
      m = 0,
      n = 0,
      q = 0,
      t = 0,
      x = 0,
      p = 0,
      u = 0,
      D = 0,
      z = 0,
      I = 0,
      w = 0,
      P = 0,
      M = function(a) {
        "ssrc" === a.type && "video" === a.mediaType && (/send/g.test(a.id) ? (q = a.bytesSent, t = a.packetsSent, k = Number(a.googRtt), w = Number(a.googNacksReceived), h = Number(a.googFrameWidthSent), aa = Number(a.googFrameHeightSent), n = Number(a.googFrameRateSent), m = a.timestamp, d = !1) : /recv/g.test(a.id) && (x = Number(a.bytesReceived), I = Number(a.packetsReceived),
            P = Number(a.googNacksSent), p = Number(a.googCurrentDelayMs), u = Number(a.googFrameWidthReceived), D = Number(a.googFrameHeightReceived), z = Number(a.googFrameRateReceived), m = a.timestamp, d = !0))
      };
    if (b && "object" === typeof b && b.forEach) b.forEach(function(a, b) {
      M(a)
    });
    else
      for (var y in b) M(b[y]);
    a.report || (a.report = {}, c = !0);
    a.report.timestamp = a.report.timestamp || m;
    d ? (a.report.bytesReceived = a.report.bytesReceived || x, a.report.packetsReceived = a.report.packetsReceived || I, a.report.googNacksSent = a.report.googNacksSent ||
      P) : (a.report.bytesSent = a.report.bytesSent || q, a.report.packetsSent = a.report.packetsSent || t, a.report.googNacksReceived = a.report.googNacksReceived || w);
    if (!c) return d ? (e = 8 * (x - a.report.bytesReceived), f.frameWidth = isNaN(h) ? 0 : u, f.frameHeight = isNaN(aa) ? 0 : D, g = z, r = p, l = (P - a.report.googNacksSent) / (I - a.report.packetsReceived) * 100) : (e = 8 * (q - a.report.bytesSent), f.frameWidth = isNaN(h) ? 0 : h, f.frameHeight = isNaN(aa) ? 0 : aa, g = n, r = k, l = (w - a.report.googNacksReceived) / (t - a.report.packetsSent) * 100), e = e / ((m - a.report.timestamp) /
      1E3) / 1024, d ? (a.report.bytesReceived = x, a.report.packetsReceived = I, a.report.googNacksSent = P) : (a.report.bytesSent = q, a.report.packetsSent = t, a.report.googNacksReceived = w), a.report.timestamp = m, {
      kbps: isNaN(e) ? 0 : Math.round(e),
      frameRatio: f,
      frameRate: isNaN(g) ? 0 : Math.round(g),
      packetsLost: isNaN(l) ? 0 : 100 >= Math.round(l) ? Math.round(l) : 100,
      rtt: isNaN(r) ? 0 : r
    }
  }

  function xa(a, b) {
    var c = Math.floor(100 * b.loaded / b.total);
    a && "function" === typeof a && a(b, c)
  }

  function Ha(a, b, c) {
    var d = {},
      e = a.result;
    if (0 == e) {
      C && (a.nickname = "playback",
        a.roomrole = -1, a.thirdid = Ca() + ":playback");
      var r = a.room;
      var f = a.pullinfo;
      if (void 0 === r.serial) e = -1;
      else {
        r.roomtype = Number(r.roomtype);
        r.maxvideo = parseInt(r.maxvideo);
        a.roomrole = Number(a.roomrole);
        var g = {},
          l = {};
        if (f && f.data && f.data.pullConfigureList) {
          var k = f.data.pullConfigureList,
            h;
          for (h in k) {
            var aa = k[h];
            g[aa.pullProtocol] = aa.pullUrlList
          }
        }
        if (f && f.data && f.data.pushConfigureInfo)
          for (h in f = f.data.pushConfigureInfo, f) k = f[h], l[k.pushProtocol] = k.pushUrl;
        r.pullConfigure = g;
        r.pushConfigure = l;
        T = r;
        Da = r.roomname;
        ma = r.roomtype;
        Ba = 10 === ma;
        ba = r.maxvideo;
        d.properties = {};
        d.properties.role = a.roomrole;
        d.properties.nickname = a.nickname;
        g = a.thirdid;
        d.id = void 0 !== g && "0" != g && "" != g ? g : c ? c : Ca();
        p = TK.RoomUser(d);
        C ? (O = r.serial + "_" + p.id) && -1 === O.indexOf(":playback") && (O += ":playback") : O = r.serial;
        C || (c = ma, g = p.role, l = r.videotype, r = r.videoframerate, c = Number(c), g = Number(g), l = Number(l), r = Number(r), l += 1, 0 < c && 2 <= g && (l = 7 >= ba ? Math.max(1, Math.min(2, l - 1)) : Math.max(0, Math.min(2, l - 1))), Y = Oa[l][0], ha = Oa[l][1], Q = 10 > r ? 10 : 30 < r ? 30 : r, va = 80 >=
        Y ? 20 > Q ? 64 : 96 : 176 >= Y ? 20 > Q ? 128 : 192 : 320 >= Y ? 20 > Q ? 256 : 384 : 640 >= Y ? 20 > Q ? 384 : 512 : 1280 >= Y ? 15 > Q ? 1024 : 15 <= Q && 20 >= Q ? 1280 : 1536 : 15 > Q ? 1280 : 15 <= Q && 20 >= Q ? 1536 : 2048, r = {
          room_video_width: Y,
          room_video_height: ha,
          room_video_fps: Q
        }, na = TK.AVMgr, na.setAVMgrProperty(r), L.Logger.info("[tk-sdk]video config[_room_video_width * _room_video_height  , _room_video_fps , _room_video_maxbps]:" + Y + "*" + ha + ", " + Q + ", " + va), 3 === a.roomrole && (La = !1));
        oa = a ? "string" === typeof a ? a : L.Utils.toJsonStringify(a) : "";
        TK.isTkNative && !ea && (ea = !0, tknative.postMessage({
          command: "initNative",
          localId: p.id.toString(),
          width: Number(Y),
          height: Number(ha),
          fps: Number(Q),
          roomInfo: oa,
          webAddr: y.toString(),
          webPort: F.toString()
        }));
        L.Logger.info("[tk-sdk]" + (C ? "initPlaybackInfo to checkroom finshed--\x3e" : "") + "_room_max_videocount:" + ba, "my id:" + p.id, "room id:" + O, "room properties chairmancontrol is:" + (T.chairmancontrol ? window.__TkSdkBuild__ ? L.Utils.encrypt(T.chairmancontrol) : T.chairmancontrol : void 0))
      }
    } else L.Logger.warning("[tk-sdk]checkroom failure code is " + e);
    L.Logger.info("[tk-sdk]checkroom finshed!");
    b(e, d, a)
  }

  function pa(a) {
    if (a.extensionId && a.extensionId !== p.id && A[a.extensionId] && "video" === a.getAttributes().type && a.stream) {
      var b = A[a.extensionId];
      if (b.publishstate !== TK.PUBLISH_STATE_NONE) switch (b.publishstate) {
        case TK.PUBLISH_STATE_VIDEOONLY:
          TK.AVMgr.enabledStreamVideoTrack(a.stream, !0);
          TK.AVMgr.enabledStreamAudioTrack(a.stream, !1);
          break;
        case TK.PUBLISH_STATE_AUDIOONLY:
          TK.AVMgr.enabledStreamVideoTrack(a.stream, !1);
          TK.AVMgr.enabledStreamAudioTrack(a.stream, !0);
          break;
        case TK.PUBLISH_STATE_BOTH:
          TK.AVMgr.enabledStreamVideoTrack(a.stream, !0);
          TK.AVMgr.enabledStreamAudioTrack(a.stream, !0);
          break;
        case TK.PUBLISH_STATE_MUTEALL:
          TK.AVMgr.enabledStreamVideoTrack(a.stream, !1), TK.AVMgr.enabledStreamAudioTrack(a.stream, !1)
      }
    }
  }

  function Z() {
    if (void 0 === TK.nativeCallSeq || "number" !== typeof TK.nativeCallSeq) TK.nativeCallSeq = 0;
    return ++TK.nativeCallSeq
  }
  L.Logger.info("[tk-sdk-version]sdk-version:" + (window.__SDKVERSIONS__ || "2.1.5") + " , sdk-time: " + (window.__SDKVERSIONSTIME__ || "2018011014"));
  var E = {},
    h = TK.EventDispatcher(E),
    Na = void 0,
    R = void 0,
    X = void 0,
    Ea = void 0,
    Fa = void 0,
    ra = void 0,
    y = void 0,
    Pa = void 0,
    qa = void 0,
    Qa = void 0,
    F = void 0,
    ca = void 0,
    fa = void 0,
    W = void 0,
    O = void 0,
    ma = 0,
    Da = void 0,
    T = void 0,
    Y = 320,
    ha = 240,
    Q = 15,
    va = 256,
    ba = 6,
    Ia = void 0,
    za = void 0,
    Aa = void 0,
    v = void 0,
    ka = void 0,
    p = {},
    J = void 0,
    G = void 0,
    na = void 0,
    sa = !1,
    La = !0,
    ta = void 0,
    Ma = void 0,
    C = !1,
    Ka = !0,
    ua = void 0,
    Ga = 3E3,
    da = !1,
    ia = !1,
    Ja = 8080,
    wa = 0,
    la = !1,
    Ra = !0,
    H = {},
    ea = !1,
    ya = void 0,
    Ba = !1,
    oa = "";
  TK.default_stream = v;
  var S = "https://",
    ja;
  h.remoteStreams = {};
  h.localStreams = {};
  h.roomID = "";
  h.socket = {};
  h.p2p = !1;
  h.state = 0;
  var A = {},
    N = {},
    Oa = [
      [80, 60],
      [176, 144],
      [320, 240],
      [640, 480],
      [1280, 720],
      [1920, 1080]
    ],
    B = 0,
    Ca = function() {
      function a() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
      }
      return function() {
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
      }
    }();
  ra = function(a) {
    void 0 !== a.stream && (a.hide(), a.pc && (a.pc.close(), delete a.pc), a.local && a.stream.stop(), delete a.stream)
  };
  Ea = function(a, b) {
    a.local ? R("sendDataStream", {
      id: a.getID(),
      msg: b
    }) : L.Logger.error("[tk-sdk]You can not send data through a remote stream")
  };
  Fa = function(a, b) {
    a && "object" === typeof b && (h.remoteStreams[a.getID()] ? (a.local && a.updateLocalAttributes(b), R("updateStreamAttributes", {
      id: a.getID(),
      attrs: b
    })) : L.Logger.warning("[tk-sdk]You can not update attributes to server, because the stream does not exist on the server."))
  };
  Na = function(a, b, e) {
    var r = function(a, b) {
      a.pc = TK.Connection({
        callback: function(c) {
          c = V(c);
          X("signaling_message", {
            streamId: a.getID(),
            peerSocket: b,
            msg: c
          })
        },
        iceServers: h.iceServers,
        maxAudioBW: E.maxAudioBW,
        maxVideoBW: E.maxVideoBW,
        limitMaxAudioBW: E.maxAudioBW,
        limitMaxVideoBW: E.maxVideoBW,
        cnnId: a.extensionId
      }, a.isTkNative);
      a.pc.onaddstream = function(b) {
        h.remoteStreams[a.getID()] ? (L.Logger.debug("[tk-sdk]Stream subscribed"), a.stream = b.stream, da && h.rtcStatsrObserver(a), a.extensionId !== p.id && "video" === a.getAttributes().type && pa(a), b = TK.StreamEvent({
          type: "stream-subscribed",
          stream: a
        }), L.Logger.info("[tk-sdk]createRemotePc(stream.pc.onaddstream), stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())),
          h.dispatchEvent(b)) : L.Logger.info("[tk-sdk]createRemotePc(stream.pc.onaddstream):remoteStreams does not contain streams ,stream  subscribe  information does not need to be passed to the interface layer , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
      }
    };
    h.state = 1;
    h.socket = io.connect(W, {
      secure: !0,
      reconnection: !0,
      transports: ["websocket"]
    });
    h.socket.on("connect", function() {
      L.Logger.debug("[tk-sdk]tk connectd");
      h.state = 2;
      n(4);
      if (0 === wa ||
        h.needReconnectSocket) h.socket.on("onAddStream", function(a) {
        var b = a.extensionId,
          d = b.indexOf(":screen"),
          e = !1,
          r = !1;
        0 < d && (b = b.substring(0, d));
        b != p.id && (e = !0);
        if (a.attributes && a.attributes.type) switch (a.attributes.type) {
          case "screen":
          case "file":
          case "video":
            (new RegExp(p.id, "g")).test(a.extensionId) && (e = !1);
            break;
          case "media":
            e = !0
        }
        TK.subscribe_from_native && e && (r = !0);
        d = TK.Stream({
            streamID: a.id,
            local: !1,
            audio: a.audio,
            video: a.video,
            data: a.data,
            screen: a.screen,
            attributes: a.attributes,
            extensionId: a.extensionId
          },
          r);
        d.room = h;
        h.remoteStreams[a.id] = d;
        b === p.id && (h.publishedDefaultStream = d);
        e && h.subscribe(d);
        da && a.extensionId === p.id && h.rtcStatsrObserver(d);
        p.id === d.extensionId && c(p.publishstate);
        a = TK.StreamEvent({
          type: "stream-added",
          stream: d
        });
        L.Logger.info("[tk-sdk]stream-added , stream id:" + d.getID() + " , extensionId is " + d.extensionId + ", attrs is " + L.Utils.toJsonStringify(d.getAttributes()));
        h.dispatchEvent(a)
      }), h.socket.on("signaling_message_mediaserver", function(a) {
        L.Logger.debug("[tk-sdk]signaling_message_mediaserver",
          a);
        var b = a.mess;
        if (sa && ta && "answer" === b.type) {
          var c = L.Utils.toJsonStringify(b),
            d = ta,
            e = /(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/g;
          e.test(c) && (b = L.Utils.toJsonParse(c.replace(e, d)))
        }
        a.mess = b;
        b = a.peerId ? h.remoteStreams[a.peerId] : h.localStreams[a.streamId];
        a && a.mess && "ready" === a.mess.type && (b.isCompleted = !0, b.reconnectionNumber = 0, p.udpstate !== L.Constant.udpState.ok && h.changeUserProperty(p.id, "__all", {
          udpstate: L.Constant.udpState.ok
        }), TK.isTkNative && TK.subscribe_from_native &&
        b && b.hideLoading && b.hideLoading());
        b && !b.failed && (b.pc && b.pc.processSignalingMessage ? b.pc.processSignalingMessage(a.mess, b) : L.Logger.warning("stream.pc is not exist , Can't call processSignalingMessage method!"))
      }), h.socket.on("signaling_message_peer", function(a) {
        var b = h.localStreams[a.streamId];
        L.Logger.debug("signaling_message_peer", a);
        b && !b.failed ? b.pc[a.peerSocket].processSignalingMessage(a.msg) : (b = h.remoteStreams[a.streamId], b.pc || r(b, a.peerSocket), b.pc && b.pc.processSignalingMessage ? b.pc.processSignalingMessage(a.msg) :
          L.Logger.warning("stream.pc is not exist , Can't call processSignalingMessage method!"))
      }), h.socket.on("publish_me", function(a) {
        var b = h.localStreams[a.streamId];
        void 0 === b.pc && (b.pc = {});
        b.pc[a.peerSocket] = TK.Connection({
          callback: function(b) {
            b = V(b);
            X("signaling_message", {
              streamId: a.streamId,
              peerSocket: a.peerSocket,
              msg: b
            })
          },
          audio: b.hasAudio(),
          video: b.hasVideo(),
          media: b.hasMedia(),
          iceServers: h.iceServers,
          cnnId: b.extensionId
        }, TK.isTkNative);
        b.pc[a.peerSocket].oniceconnectionstatechange = function(c) {
          "failed" ===
          c && (b.pc[a.peerSocket].close(), delete b.pc[a.peerSocket])
        };
        b.pc[a.peerSocket].addStream(b.stream);
        b.pc[a.peerSocket].createOffer()
      }), h.socket.on("onBandwidthAlert", function(a) {
        L.Logger.debug("[tk-sdk]Bandwidth Alert on", a.streamID, "message", a.message, "BW:", a.bandwidth);
        if (a.streamID) {
          var b = h.remoteStreams[a.streamID];
          b && !b.failed && (a = TK.StreamEvent({
            type: "bandwidth-alert",
            stream: b,
            message: a.message,
            bandwidth: a.bandwidth
          }), h.dispatchEvent(a))
        }
      }), h.socket.on("onDataStream", function(a) {
        a = TK.StreamEvent({
          type: "stream-data",
          message: a.msg,
          stream: h.remoteStreams[a.id]
        });
        h.dispatchEvent(a)
      }), h.socket.on("onUpdateAttributeStream", function(a) {
        var b = h.remoteStreams[a.id],
          c = TK.StreamEvent({
            type: "stream-attributes-update",
            attrs: a.attrs,
            stream: b
          });
        void 0 !== b ? (b.updateLocalAttributes(a.attrs), h.dispatchEvent(c)) : L.Logger.warning("[tk-sdk]onUpdateAttributeStream stream invalid", a)
      }), h.socket.on("onRemoveStream", function(a) {
        var b = h.remoteStreams[a.id];
        b && b.failed ? L.Logger.debug("[tk-sdk]Received onRemoveStream for a stream that we already marked as failed ",
          a.id) : b ? (delete h.remoteStreams[a.id], delete h.localStreams[a.id], ra(b), a = TK.StreamEvent({
          type: "stream-removed",
          stream: b
        }), L.Logger.info("[tk-sdk]stream-removed , stream id:" + b.getID() + " , extensionId is " + b.extensionId + ", attrs is " + L.Utils.toJsonStringify(b.getAttributes())), h.dispatchEvent(a)) : L.Logger.debug("[tk-sdk]Received a removeStream for", a.id, "and it has not been registered here, ignoring.")
      }), h.socket.on("disconnect", function(a) {
        h.needReconnectSocket || (L.Logger.debug("[tk-sdk]Socket disconnected, lost connection to TKController",
          a), 0 !== h.state && (n(8), h.state = 0, da && h.stopIntervalRtcStatsrObserver(), v.rtcStatsrObserverTimer && h.stopIntervalRtcStatsrObserverByStream(v), TK.isTkNative && (ea = !1, tknative.postMessage({
          command: "nativeClear"
        })), ia = !1, a = TK.RoomEvent({
          type: "room-disconnected",
          message: "unexpected-disconnection"
        }), h.dispatchEvent(a)))
      }), h.socket.on("connection_failed", function(a) {
        L.Logger.debug("[tk-sdk]Socket connection_failed , arg is " + L.Utils.toJsonStringify(a))
      }), h.socket.on("error", function(a) {
        L.Logger.error("[tk-sdk]Cannot connect to Controller");
        e && e("Cannot connect to TKController (socket.io error)", a)
      }), h.socket.on("reconnecting", function(a) {
        L.Logger.debug("[tk-sdk]reconnecting info:", a);
        a = TK.RoomEvent({
          type: "room-reconnecting",
          message: {
            number: a,
            info: "room-reconnecting number:" + a
          }
        });
        h.dispatchEvent(a)
      }), h.socket.on("participantLeft", H._handler_participantLeft), h.socket.on("participantJoined", H._handler_participantJoined), h.socket.on("participantEvicted", function(a) {
        a = a || {};
        L.Logger.info("[tk-sdk]user evicted room  , user info: " + L.Utils.toJsonStringify(p) +
          " , participantEvicted  messages:" + L.Utils.toJsonStringify(a));
        h.leaveroom(!0);
        a = TK.RoomEvent({
          type: "room-participant_evicted",
          message: a,
          user: p
        });
        h.dispatchEvent(a)
      }), h.socket.on("sendMessage", H._handler_sendMessage), h.socket.on("msgList", function(a) {
        L.Logger.debug("[tk-sdk]msgList info:", L.Utils.toJsonStringify(a));
        a = TK.RoomEvent({
          type: "room-msglist",
          message: a
        });
        h.dispatchEvent(a)
      }), h.socket.on("pubMsg", H._handler_pubMsg), h.socket.on("delMsg", H._handler_delMsg), h.socket.on("setProperty", H._handler_setProperty),
        h.socket.on("playback_clearAll", H._handler_playback_clearAll), h.socket.on("duration", H._handler_duration), h.socket.on("playbackEnd", H._handler_playbackEnd), h.socket.on("playback_updatetime", H._handler_playback_updatetime), wa++, L.Logger.info("[tk-sdk]connected room  , current connected number is " + wa + "! "), h.needReconnectSocket || L.Logger.info("[tk-sdk]Reconnect Socket ,  join room start! "), h.needReconnectSocket = !1, w(b, e);
      else {
        L.Logger.info("[tk-sdk]reconnected room! ");
        var a = TK.RoomEvent({
          type: "room-reconnected"
        });
        h.dispatchEvent(a);
        d({
          source: "reconnected room"
        }, b, e)
      }
    })
  };
  R = function(a, b, c, d) {
    console.log(a,b,c,d);
    L.Logger.debug("[tk-sdk]sendMessageSocket", a, b);

    h.socket.emit(a, b, function(a, e) {

      "success" === a ? (L.Logger.debug("[tk-sdk]sendMessageSocket success", b, e), c && c(e)) : "error" === a ? d && d(e) : c && c(a, e)
    });
  };
  X = function(a, b, c, d) {
    0 !== h.state ? h.socket.emit(a, b, c, function(a, b) {
      d && d(a, b)
    }) : L.Logger.warning("[tk-sdk]Trying to send a message over a disconnected Socket")
  };
  h.setIsGetFileList = function(a) {
    Ka = a
  };
  h.getRoomType = function() {
    return ma
  };
  h.getRoomName = function() {
    return Da
  };
  h.getRoomProperties = function() {
    return T
  };
  h.getMySelf = function() {
    return p
  };
  h.getUser = function(a) {
    if (void 0 !== a) return A[a]
  };
  h.getUsers = function() {
    return A
  };
  h.getUsersNumber = function(a) {
    var b = 0,
      c;
    for (c in A) void 0 !== a && A[c].role == a || b++;
    return b
  };
  h.getSpecifyRoleList = function(a) {
    return void 0 === a ? (L.Logger.error("[tk-sdk]getSpecifyRoleList specifyKey is exist!"), {}) : N[a] || {}
  };
  h.getAllRoleList = function() {
    return N
  };
  h.getConfigInfo = function() {
    return Ia
  };
  h.getSpecifyUsersByPublishstate =
    function(a, b, c) {
      var d = {},
        e;
      for (e in A) {
        var r = A[e];
        c ? r.publishstate !== TK.PUBLISH_STATE_NONE && (void 0 == b || null == b || "number" != typeof b ? ("number" != typeof b && L.Logger.warning("filterRole must is number!", b), d[e] = r) : r.role == b && (d[e] = r)) : r.publishstate === a && (void 0 == b || null == b || "number" != typeof b ? ("number" != typeof b && L.Logger.warning("filterRole must is number!", b), d[e] = r) : r.role == b && (d[e] = r))
      }
      return d
    };
  h.getPublishStreamNumber = function() {
    var a = 0,
      b;
    for (b in A) A[b].publishstate !== TK.PUBLISH_STATE_NONE && a++;
    return a
  };
  h.isBeyondMaxVideo = function() {
    var a = 0,
      b;
    for (b in A)
      if (A[b].publishstate !== TK.PUBLISH_STATE_NONE && ++a >= ba) return !0;
    return !1
  };
  h.changeUserProperty = function(a, b, c) {
    if (6 != B) return 2;
    if (void 0 === c) return L.Logger.error("[tk-mobile-sdk]changeUserProperty properties or id is not exist!"), 4;
    var d = {};
    d.id = a;
    d.toID = b || "__all";
    if (A[a]) {
      if (c && "object" === typeof c) return d.properties = c, R("setProperty", d), 0;
      L.Logger.error("[tk-sdk]properties must be json , user id: " + a + "!")
    } else L.Logger.error("[tk-sdk]user is not exist , user id: " +
      a + "!")
  };
  h.onChangeMyPublishState = function(a) {
    L.Logger.debug("[tk-sdk]onChangeMyPublishState " + p.publishstate + " to " + a);
    p.publishstate != a && (a > TK.PUBLISH_STATE_NONE ? (c(a), p.publishstate === TK.PUBLISH_STATE_NONE && h.publish(v)) : h.unpublish(v), p.publishstate = a)
  };
  h.onChangeMyDisableVideoState = function(a) {
    L.Logger.debug("[tk-sdk]onChangeMyDisableVideoState " + p.disablevideo + " to " + a);
    p.disablevideo != a && (p.disablevideo = a, p.publishstate > TK.PUBLISH_STATE_NONE && c())
  };
  h.onChangeMyDisableAudioState = function(a) {
    L.Logger.debug("[tk-sdk]onChangeMyDisableAudioState " +
      p.disableaudio + " to " + a);
    p.disableaudio != a && (p.disableaudio = a, p.publishstate > TK.PUBLISH_STATE_NONE && c())
  };
  h.changeUserPublish = function(a, b) {
    if (6 != B) return 2;
    if (void 0 === a) return 4;
    h.changeUserProperty(a, "__all", {
      publishstate: b
    });
    return 0
  };
  h.changeMyDisableVideoState = function(a) {
    "boolean" !== typeof a ? L.Logger.warning("[tk-sdk]changeMyDisableVideoState:disablevideo must boolean !") : (h.onChangeMyDisableVideoState(a), h.changeUserProperty(p.id, "__all", {
      disablevideo: a
    }))
  };
  h.changeMyDisableAudioState = function(a) {
    "boolean" !==
    typeof a ? L.Logger.warning("[tk-sdk]changeMyDisableAudioState:disableaudio must boolean !") : (h.onChangeMyDisableAudioState(a), h.changeUserProperty(p.id, "__all", {
      disableaudio: a
    }))
  };
  h.sendMessage = function(a, b) {
    if (6 != B) return 2;
    var c = {};
    c.toID = b;
    c.message = a;
    R("sendMessage", c);
    return 0
  };
  h.pubMsg = function(a, b, c, d, e, f, g, l, k) {
    console.log(a,b,c,d,e,f,g,l,k);
    if (6 != B) return 2;
    var r = {};
    r.name = a;
    r.id = b;
    r.toID = c;
    r.data = d;
    e || (r.do_not_save = "");
    if (void 0 !== k) {
      if ("number" !== typeof k) {
        L.Logger.error("[tk-mobile-sdk]pubMsg params expires must is number!");
        return
      }
      r.expires = k
    }
    if (void 0 !== f) {
      if ("number" !== typeof f) {
        L.Logger.error("[tk-mobile-sdk]pubMsg params expiresabs must is number!");
        return
      }
      r.expiresabs = f
    }
    void 0 !== g && (r.associatedMsgID = g);
    void 0 !== l && (r.associatedUserID = l);
    R("pubMsg", r);
    return 0
  };
  h.delMsg = function(a, b, c, d) {
    console.log(a,b,c,d);
    if (6 != B) return 2;
    var e = {};
    e.name = a;
    e.id = b;
    e.toID = c;
    e.data = d;
    R("delMsg", e);
    return 0
  };
  h.evictUser = function(a, b) {
    L.Logger.debug("[tk-sdk]evictUser", a);
    if (6 != B) return 2;
    var c = {};
    c.id = a;
    if (b && "object" === typeof b)
      for (var d in b) c[d] =
        b[d];
    R("evictParticipant", c);
    return 0
  };
  h.joinroom = function(a, b, c) {
    console.log(a,b,c);
    console.log(h);
    0 !== h.state && L.Logger.warning("[tk-sdk]Room already connected", this.state);
    if (1 !== B || void 0 === y || void 0 === F || void 0 === p) return L.Logger.warning("[tk-sdk]Status error:", B), -1;
    v = a;
    TK.default_stream = v;
    void 0 === a ? (p.hasvideo = !1, p.hasaudio = !1) : (p.hasvideo = a.video, p.hasaudio = a.audio);
    L.Logger.info("[tk-sdk]joinroom:my device info  [hasvideo , hasaudio] is [" + p.hasvideo + " ," + p.hasaudio + "]");
    za = b;
    Aa = c;
    L.Logger.debug("[tk-sdk]joinroom:my room user",
      p);
    A = {};
    N = {};
    x(y, F, function(a, b) {
      0 !== a ? L.Logger.error("[tk-sdk]step2GetConfig failure --\x3e result and responseText:", a, b) : 0 == a && 2 == B ? D(y, F, function(a, b) {
        L.Logger.debug("[tk-sdk]step2GetFileList result \x3d " + a + " , message:" + L.Utils.toJsonStringify(b)); - 1 !== a ? (void 0 !== b ? (ja = b, a = TK.RoomEvent({
          type: "room-files",
          message: ja
        })) : (ja = [], a = TK.RoomEvent({
          type: "room-error",
          message: {
            source: L.Constant.roomError.GETFILELISTERROR,
            error: a
          }
        })), h.dispatchEvent(a)) : L.Logger.info("[tk-sdk]step2GetFileList code is " +
          a);
        z()
      }) : (L.Logger.error("[tk-sdk]step2GetConfig failure --\x3e result and responseText:", a, b, " , _status \x3d " + B), a = TK.RoomEvent({
        type: "room-error",
        message: {
          source: L.Constant.roomError.GETCONFIGERROR,
          error: a
        }
      }), h.dispatchEvent(a))
    })
  };
  h.leaveroom = function(a) {
    a = a || !1;
    L.Logger.debug("[tk-sdk]leaveroom:Disconnection requested");
    n(8);
    try {
      h.stopStreamTracksFromDefaultStream(), h.socket && h.socket.disconnect && h.socket.disconnect()
    } catch (aa) {
      L.Logger.debug("[tk-sdk]Socket already disconnected , disconnect errorInfo:",
        aa)
    }
    h.socket = void 0;
    a = TK.RoomEvent({
      type: "room-leaveroom",
      message: a
    });
    h.dispatchEvent(a)
  };
  h.publish = function(a, b, c) {
    if (6 != B) return L.Logger.warning("[tk-sdk]publish with wrong room status", B), 2;
    L.Logger.info("[tk-sdk]calling publish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    b = b || {};
    b.maxVideoBW = b.maxVideoBW || E.defaultVideoBW;
    b.maxVideoBW > E.maxVideoBW && (b.maxVideoBW = E.maxVideoBW);
    void 0 === b.minVideoBW && (b.minVideoBW = 0);
    b.minVideoBW >
    E.defaultVideoBW && (b.minVideoBW = E.defaultVideoBW);
    b.simulcast = b.simulcast || b._simulcast || !1;
    if (a && void 0 === h.localStreams[a.getID()]) {
      if (a.hasAudio() || a.hasVideo() || a.hasScreen()) return void 0 === a.url && void 0 === a.recording && (a.failed && delete a.failed, clearTimeout(a._publishTimer), a._publishTimer = setTimeout(function() {
        h.unpublish(a, function(b) {
          setTimeout(function() {
            b || L.Logger.warning("[tk-sdk]publish timeout 15s: unpublish in not success , stream id:" + a.getID() + " , extensionId is " + a.extensionId +
              ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()) + " !");
            if (a.extensionId === p.id)
              if (3 > a.timeoutRePublishNumber) void 0 === a.timeoutRePublishNumber && (a.timeoutRePublishNumber = 0), p.publishstate > TK.PUBLISH_STATE_NONE ? (L.Logger.info("[tk-sdk]publish timeout 15s--\x3epublish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), a.timeoutRePublishNumber++, h.publish(a, {
                timeoutPublishReconnection: !0
              })) : L.Logger.warning("[tk-sdk]publish timeout 15s--\x3emy publishstate is 0 , not need afresh publish , stream id:" +
                a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
              else {
                L.Logger.info("[tk-sdk]publish timeout 15s--\x3erePublish number \x3e 3 , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
                a.extensionId === p.id && p.publishstate > TK.PUBLISH_STATE_NONE && h.changeUserProperty(a.extensionId, "__all", {
                  publishstate: TK.PUBLISH_STATE_NONE
                });
                var d = TK.StreamEvent({
                  type: "stream-publish-fail",
                  stream: a,
                  message: {
                    code: "publishTimeout",
                    errorCode: -1,
                    timeoutRePublishNumber: a.timeoutRePublishNumber,
                    timeoutPublishReconnection: !0
                  }
                });
                h.dispatchEvent(d);
                c && c(void 0, void 0)
              }
            else d = TK.StreamEvent({
              type: "stream-publish-fail",
              stream: a,
              message: {
                code: "publishTimeout",
                errorCode: -1
              }
            }), h.dispatchEvent(d), L.Logger.info("[tk-sdk]publish timeout 15s--\x3e publish stream stream.extensionId !\x3d _myself.id   , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
          }, 1E3)
        })
      }, 15E3), L.Logger.debug("[tk-sdk]Publishing to ms Normally, is createOffer",
        b.createOffer, a.extensionId), X("publish", {
        state: "ms",
        data: a.hasData(),
        audio: a.hasAudio(),
        video: a.hasVideo(),
        screen: a.hasScreen(),
        minVideoBW: b.minVideoBW,
        attributes: a.getAttributes(),
        extensionId: a.extensionId,
        createOffer: b.createOffer,
        metadata: b.metadata,
        scheme: b.scheme
      }, void 0, function(d, e) {
        clearTimeout(a._publishTimer);
        if (0 != d)
          if (L.Logger.error("[tk-sdk]Error when publishing the stream: ", d, e), L.Logger.info("[tk-sdk]stream-publish-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " +
              L.Utils.toJsonStringify(a.getAttributes())), a.extensionId === p.id)
            if (3 > a.publishReconnectionNumber) void 0 === a.publishReconnectionNumber && (a.publishReconnectionNumber = 0), h.unpublish(a, function(b) {
              setTimeout(function() {
                p.publishstate > TK.PUBLISH_STATE_NONE ? (L.Logger.info("[tk-sdk]stream-publish-fail:publish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), a.publishReconnectionNumber++, h.publish(a, {
                  publishReconnection: !0
                })) : L.Logger.warning("[tk-sdk]stream-publish-fail:my publishstate is 0 , not need afresh publish , stream id:" +
                  a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
              }, 1E3)
            }, {
              publishReconnection: !0
            });
            else {
              a.extensionId === p.id && p.publishstate > TK.PUBLISH_STATE_NONE ? h.changeUserProperty(a.extensionId, "__all", {
                publishstate: TK.PUBLISH_STATE_NONE
              }) : h.unpublish(a);
              var r = TK.StreamEvent({
                type: "stream-publish-fail",
                stream: a,
                message: {
                  code: "publishFail",
                  errorCode: d,
                  publishReconnectionNumber: a.publishReconnectionNumber,
                  publishReconnection: !0,
                  hasdata: !1
                }
              });
              h.dispatchEvent(r);
              c && c(void 0, d)
            }
          else L.Logger.info("[tk-sdk]stream-publish-fail:publish stream stream.extensionId !\x3d _myself.id   , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.unpublish(a), r = TK.StreamEvent({
            type: "stream-publish-fail",
            stream: a,
            message: {
              code: "publishFail",
              errorCode: d,
              id: e,
              hasdata: !1
            }
          }), h.dispatchEvent(r), c && c(void 0, d);
        else L.Logger.debug("[tk-sdk]Stream assigned an Id, starting the publish process , stream id:" + a.getID() + " , extensionId is " +
          a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), a.publishReconnectionNumber = 0, a.timeoutRePublishNumber = 0, b.reconnection || (delete a.isCompleted, a.reconnectionNumber = 0), a.getID = function() {
          return e
        }, a.id = a.getID(), a.hasData() && (a.sendData = function(b) {
          Ea(a, b)
        }), a.setAttributes = function(b) {
          Fa(a, b)
        }, a.hasScreen() && (ia = !0), h.localStreams[e] = a, a.room = h, a.pc = TK.Connection({
          callback: function(b) {
            L.Logger.debug("[tk-sdk]Sending message", b);
            b = V(b);
            X("signaling_message", {
              streamId: a.getID(),
              msg: b
            }, void 0, function() {})
          },
          iceServers: h.iceServers,
          maxAudioBW: b.maxAudioBW,
          maxVideoBW: a.hasScreen() ? E.maxScreenBW : b.maxVideoBW,
          limitMaxAudioBW: E.maxAudioBW,
          limitMaxVideoBW: a.hasScreen() ? E.maxScreenBW : E.maxVideoBW,
          simulcast: b.simulcast,
          audio: a.hasAudio(),
          video: a.hasVideo(),
          screen: a.hasScreen(),
          media: a.hasMedia(),
          cnnId: p.id
        }, TK.isTkNative), a.pc.addStream(a.stream), a.pc.oniceconnectionstatechange = function(b) {
          L.Logger.info("[tk-sdk]publish ice state:" + b + " , stream id:" + a.getID() + " , extensionId is " +
            a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
          "failed" === b && 0 !== h.state && a && !a.failed && (a.failed = !0, L.Logger.warning("[tk-sdk]Publishing Stream", a.getID(), "has failed after successful ICE checks , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), k(a, b, "publish"))
        }, b.createOffer || a.pc.createOffer(), c && c(e)
      })), 0;
      L.Logger.error("[tk-sdk]Either screen or audio or video is at least one true for streaming", a);
      c &&
      c(void 0, "Either screen or audio or video is at least one true for streaming")
    } else L.Logger.error("[tk-sdk]Trying to publish invalid stream , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), c && c(void 0, "Trying to publish invalid stream")
  };
  h.publishMedia = function(a, b, c) {
    if (6 != B) return L.Logger.warning("[tk-sdk]publish with wrong room status", B), 2;
    L.Logger.info("[tk-sdk]calling mediaPublish stream , stream id:" + a.getID() + " , extensionId is " +
      a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    b = b || {};
    if (a && void 0 === h.remoteStreams[a.getID()]) {
      if (a.hasAudio() || a.hasVideo()) {
        if (void 0 !== a.url || void 0 !== a.recording) {
          a.failed && delete a.failed;
          if (a.url) {
            var d = "url";
            var e = a.url
          } else d = "recording", e = a.recording;
          L.Logger.debug("[tk-sdk]Checking publish options for", a.getID());
          a.checkOptions(b);
          X("publish", {
            state: d,
            data: a.hasData(),
            audio: a.hasAudio(),
            video: a.hasVideo(),
            attributes: a.getAttributes(),
            extensionId: a.extensionId,
            metadata: b.metadata,
            createOffer: b.createOffer
          }, e, function(d, e) {
            if (0 == d) L.Logger.debug("[tk-sdk]mediaStream published , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), b.reconnection || (delete a.isCompleted, a.reconnectionNumber = 0), a.getID = function() {
              return e
            }, a.id = a.getID(), a.sendData = function(b) {
              Ea(a, b)
            }, a.setAttributes = function(b) {
              Fa(a, b)
            }, a.room = h, c && c(e);
            else {
              L.Logger.error("[tk-sdk]Error when publishing mediaStream", d, e);
              var f =
                TK.StreamEvent({
                  type: "stream-publish-fail",
                  stream: a,
                  message: {
                    errorCode: d,
                    id: e,
                    hasdata: !1
                  }
                });
              L.Logger.info("[tk-sdk]stream-publish-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
              h.dispatchEvent(f);
              c && c(void 0, d)
            }
          })
        }
        return 0
      }
      L.Logger.error("[tk-sdk]Audio and video in the media file stream at least one is true", a);
      c && c(void 0, "Audio and video in the media file stream at least one is true")
    } else L.Logger.error("[tk-sdk]Trying to publish invalid mediaStream",
      a), c && c(void 0, "Trying to publish invalid mediaStrea")
  };
  h.publishScreen = function(a, b, c) {
    if (6 != B) return L.Logger.warning("[tk-sdk]publish with wrong room status", B), 2;
    if (ia) L.Logger.error("[tk-sdk]Screen has been shared already");
    else if (L.Logger.info("[tk-sdk]calling screenPublish stream , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), a && !a.failed && void 0 === h.remoteStreams[a.getID()]) {
      if (a.hasScreen()) return ka = a, h.publish(ka, b,
        c);
      L.Logger.error("[tk-sdk]Screen Shared streaming screen  must be true", a);
      c && c(void 0, "Screen Shared streaming screen must be true")
    } else L.Logger.error("[tk-sdk]Trying to publish invalid screenStream", a), c && c(void 0, "Trying to publish invalid screenStream")
  };
  h.publishLocalFile = function(a, b, c) {
    if (6 != B) return L.Logger.warning("[tk-sdk]publish with wrong room status", B), 2;
    L.Logger.info("[tk-sdk]calling localFilePublish stream , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " +
      L.Utils.toJsonStringify(a.getAttributes()));
    if (a && !a.failed && void 0 === h.remoteStreams[a.getID()]) {
      if (a.getAttributes() && "file" === a.getAttributes().type) return h.publish(a, b, c);
      L.Logger.error("[tk-sdk]LocalFile stream attrs.type must be file", a);
      c && c(void 0, "LocalFile stream attrs.type must be file")
    } else L.Logger.error("[tk-sdk]Trying to publish invalid LocalFileStream", a), c && c(void 0, "Trying to publish invalid LocalFileStream")
  };
  h.startRecording = function(a, b) {
    a ? (L.Logger.debug("[tk-sdk]Start Recording stream: " +
      a.getID()), R("startRecorder", {
      to: a.getID()
    }, function(a, c) {
      null === a ? (L.Logger.error("[tk-sdk]Error on start recording", c), b && b(void 0, c)) : (L.Logger.debug("[tk-sdk]Start recording", a), b && b(a))
    })) : (L.Logger.error("[tk-sdk]Trying to start recording on an invalid stream", a), b && b(void 0, "Invalid Stream"))
  };
  h.stopRecording = function(a, b) {
    R("stopRecorder", {
      id: a
    }, function(c, d) {
      null === c ? (L.Logger.error("[tk-sdk]Error on stop recording", d), b && b(void 0, d)) : (L.Logger.debug("[tk-sdk]Stop recording", a), b && b(!0))
    })
  };
  h.unpublish = function(a, b, c) {
    if (6 != B) return 2;
    c = c || {};
    L.Logger.info("[tk-sdk]calling unpublish , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    if (a) return R("unpublish", a.getID(), function(d, e) {
      0 !== d ? (L.Logger.error("[tk-sdk]Error unpublishing stream, stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()), e), d = TK.StreamEvent({
        type: "stream-unpublish-fail",
        stream: a,
        message: {
          error: e
        }
      }),
        L.Logger.info("[tk-sdk]stream-unpublish-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(d), b && b(void 0, e)) : (L.Logger.debug("[tk-sdk]Stream unpublished  , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), c.reconnection || (delete a.isCompleted, a.reconnectionNumber = 0), a.room = void 0, (a.hasAudio() || a.hasVideo() || a.hasScreen()) && void 0 === a.url && (a.pc &&
      a.pc.close(), a.pc = void 0), a.hasScreen() && (ia = !1), a.extensionId === p.id && (h.publishedDefaultStream || (d = TK.StreamEvent({
        type: "stream-unpublish-not-belong-remoteStreams",
        stream: a
      }), L.Logger.warning("[tk-sdk]stream-unpublish-not-belong-remoteStreams , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(d)), h.publishedDefaultStream = void 0), delete h.localStreams[a.getID()], a.getID = function() {
        return "local"
      }, a.id = a.getID(), a.sendData =
        function() {}, a.setAttributes = function() {}, a.failed && delete a.failed, b && b(!0))
    }), 0;
    L.Logger.error("[tk-sdk]unpublish error:", "Cannot unpublish, stream does not exist or is not local");
    var d = TK.StreamEvent({
      type: "stream-unpublish-fail",
      stream: a,
      message: {
        error: "Cannot unpublish, stream does not exist or is not local"
      }
    });
    L.Logger.info("[tk-sdk]stream-unpublish-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    h.dispatchEvent(d);
    b &&
    b(void 0, "Cannot unpublish, stream does not exist or is not local")
  };
  h.unpublishMedia = function(a, b) {
    if (6 != B) return 2;
    L.Logger.info("[tk-sdk]calling unpublishMedia , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    R("unpublish", a.getID(), function(c, d) {
      0 !== c ? (L.Logger.error("[tk-sdk]Error unpublishing stream", d), c = TK.StreamEvent({
        type: "stream-unpublish-fail",
        stream: a,
        message: {
          error: d
        }
      }), L.Logger.info("[tk-sdk]stream-unpublish-fail , stream id:" +
        a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(c), b && b(void 0, d)) : (L.Logger.debug("[tk-sdk]meidaStream unpublished , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), a.failed && delete a.failed, b && b(!0))
    });
    return 0
  };
  h.unpublishScreen = function(a) {
    if (6 != B) return 2;
    if (ia) return L.Logger.info("[tk-sdk]calling unpublishScreen , stream id:" + ka.getID() + " , extensionId is " +
      ka.extensionId + ", attrs is " + L.Utils.toJsonStringify(ka.getAttributes())), h.unpublish(ka, a)
  };
  h.unpublishLocalFile = function(a, b) {
    if (6 != B) return 2;
    L.Logger.info("[tk-sdk]calling unpublishLocalFile , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
    return h.unpublish(a, b)
  };
  h.sendControlMessage = function(a, b, c) {
    a && a.getID() && (b = {
      type: "control",
      action: c
    }, X("signaling_message", {
      streamId: a.getID(),
      msg: b
    }))
  };
  h.subscribe = function(a, b, c) {
    if (6 !=
      B) return L.Logger.warning("[tk-sdk]subscribe when not ready"), 2;
    clearTimeout(a._subscribeTimer);
    a._subscribeTimer = setTimeout(function() {
      h.unsubscribe(a, function(b) {
        setTimeout(function() {
          b || L.Logger.warning("[tk-sdk]subscribe timeout 15s: unsubscribe in not success , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()) + " !");
          if (h.remoteStreams[a.getID()])
            if (3 > a.timeoutReSubcribeNumber) {
              L.Logger.info("[tk-sdk]subscribe timeout 15s--\x3esubscribe , stream id:" +
                a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
              void 0 === a.timeoutReSubcribeNumber && (a.timeoutReSubcribeNumber = 0);
              a.timeoutReSubcribeNumber++;
              L.Logger.info("[tk-sdk]subscribe timeout 15s--\x3estream-removed(initiative) , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
              var d = TK.StreamEvent({
                type: "stream-removed",
                stream: a,
                message: {
                  timeoutSubscribeReconnection: !0,
                  timeoutReSubcribeNumber: a.timeoutReSubcribeNumber,
                  source: "subscribe",
                  isNotRemote: !0
                }
              });
              h.dispatchEvent(d);
              h.subscribe(a, {
                timeoutSubscribeReconnection: !0
              })
            } else L.Logger.info("[tk-sdk]subscribe timeout 15s--\x3ereSubscribe number \x3e 3 , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), d = TK.StreamEvent({
              type: "stream-subscribe-fail",
              stream: a,
              message: {
                code: "subscribeTimeout",
                hasdata: !1,
                timeoutReSubcribeNumber: a.timeoutReSubcribeNumber,
                hasRemoteStream: void 0 !== h.remoteStreams[a.getID()]
              }
            }),
              h.dispatchEvent(d), c && c(void 0, void 0);
          else L.Logger.info("[tk-sdk]subscribe timeout 15s--\x3eremoteStreams does not contain streams , not need afresh subscribe , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
        }, 1E3)
      }, {
        timeoutSubscribeReconnection: !0
      })
    }, 15E3);
    b = b || {};
    if (!a || a.local || a.failed) {
      var d = "Error on subscribe";
      a ? a.local ? (L.Logger.warning("[tk-sdk]Cannot subscribe to local stream, you should subscribe to the remote version of your local stream"),
        d = "Local copy of stream") : a.failed && (L.Logger.warning("[tk-sdk]Cannot subscribe to failed stream, you should wait a new stream-added event."), d = "Failed stream") : (L.Logger.warning("[tk-sdk]Cannot subscribe to invalid stream", a), d = "Invalid or undefined stream");
      c && c(void 0, d)
    } else {
      if (a.hasVideo() || a.hasAudio() || a.hasScreen()) a.hasVideo() || a.hasScreen() || (b.video = !1), a.hasAudio() || (b.audio = !1), b.maxVideoBW = b.maxVideoBW || E.defaultVideoBW, b.maxVideoBW > E.maxVideoBW && (b.maxVideoBW = E.maxVideoBW), L.Logger.debug("[tk-sdk]Checking subscribe options for",
        a.getID()), a.checkOptions(b), X("subscribe", {
        streamId: a.getID(),
        audio: b.audio,
        video: b.video,
        data: b.data,
        browser: TK.getBrowser(),
        createOffer: b.createOffer,
        metadata: b.metadata,
        slideShowMode: b.slideShowMode
      }, void 0, function(d, e) {
        clearTimeout(a._subscribeTimer);
        0 !== d ? (L.Logger.error("[tk-sdk]Error subscribing to stream ", e), L.Logger.info("[tk-sdk]stream-subscribe-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.remoteStreams[a.getID()] ?
          3 > a.subscribeReconnectionNumber ? (void 0 === a.subscribeReconnectionNumber && (a.subscribeReconnectionNumber = 0), h.unsubscribe(a, function(b) {
            setTimeout(function() {
              if (h.remoteStreams[a.getID()]) {
                a.subscribeReconnectionNumber++;
                L.Logger.info("[tk-sdk]stream-subscribe-fail--\x3estream-removed(initiative) , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
                var b = TK.StreamEvent({
                  type: "stream-removed",
                  stream: a,
                  message: {
                    subscribeReconnection: !0,
                    subscribeReconnectionNumber: a.subscribeReconnectionNumber,
                    source: "subscribe",
                    isNotRemote: !0
                  }
                });
                h.dispatchEvent(b);
                h.subscribe(a, {
                  subscribeReconnection: !0
                })
              } else L.Logger.info("[tk-sdk]stream-subscribe-fail(subscribe-fail):  failed --\x3eremoteStreams does not contain streams , not need afresh subscribe , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
            }, 1E3)
          }, {
            subscribeReconnection: !0
          })) : (h.unsubscribe(a), d = TK.StreamEvent({
            type: "stream-subscribe-fail",
            error: e,
            message: {
              code: "subscribeFail",
              stream: a,
              hasdata: !1,
              subscribeReconnectionNumber: a.subscribeReconnectionNumber,
              hasRemoteStream: void 0 !== h.remoteStreams[a.getID()]
            }
          }), h.dispatchEvent(d), c && c(void 0, e)) : L.Logger.info("[tk-sdk]stream-subscribe-fail:remoteStreams does not contain streams , not need afresh subscribe , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))) : (L.Logger.debug("[tk-sdk]Subscriber added"), a.subscribeReconnectionNumber =
          0, a.timeoutReSubcribeNumber = 0, b.reconnection || (delete a.isCompleted, a.reconnectionNumber = 0), a.pc = TK.Connection({
          callback: function(b) {
            L.Logger.debug("[tk-sdk]Sending message ", b);
            b = V(b);
            var c = "chrome-stable";
            a.pc && a.pc.browser && (c = a.pc.browser);
            X("signaling_message", {
              streamId: a.getID(),
              msg: b,
              browser: c
            }, void 0, function() {})
          },
          nop2p: !0,
          audio: b.audio,
          video: b.video,
          screen: !1,
          maxAudioBW: E.maxAudioBW,
          maxVideoBW: a.hasScreen() ? E.maxScreenBW : E.maxVideoBW,
          limitMaxAudioBW: E.maxAudioBW,
          limitMaxVideoBW: a.hasScreen() ?
            E.maxScreenBW : E.maxVideoBW,
          iceServers: h.iceServers,
          cnnId: a.extensionId
        }, a.isTkNative), a.pc.onaddstream = function(b) {
          h.remoteStreams[a.getID()] ? (L.Logger.debug("[tk-sdk]Stream subscribed"), a.stream = b.stream, da && h.rtcStatsrObserver(a), a.extensionId !== p.id && "video" === a.getAttributes().type && pa(a), b = TK.StreamEvent({
            type: "stream-subscribed",
            stream: a
          }), L.Logger.info("[tk-sdk]stream-subscribed , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())),
            h.dispatchEvent(b)) : L.Logger.info("[tk-sdk]stream-subscribe:remoteStreams does not contain streams ,stream  subscribe  information does not need to be passed to the interface layer , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()))
        }, a.pc.oniceconnectionstatechange = function(b) {
          L.Logger.info("[tk-sdk]subscribe ice state:" + b + " , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes()));
          "failed" === b && 0 !== h.state && a && !a.failed && (a.failed = !0, L.Logger.warning("[tk-sdk]Subscribing stream", a.getID(), "has failed after successful ICE checks , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), k(a, b, "subscribe"))
        }, a.pc.createOffer(!0), c && c(!0))
      });
      else if (a.hasData() && !1 !== b.data) X("subscribe", {
        streamId: a.getID(),
        data: b.data,
        metadata: b.metadata
      }, void 0, function(b, d) {
        0 !== b ? (L.Logger.error("[tk-sdk]Error subscribing to stream ",
          d), b = TK.StreamEvent({
          type: "stream-subscribe-fail",
          stream: a,
          message: {
            error: d,
            hasdata: !0
          }
        }), L.Logger.info("[tk-sdk]stream-subscribe-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(b), c && c(void 0, d)) : h.remoteStreams[a.getID()] ? (L.Logger.debug("[tk-sdk]Stream subscribed"), a.extensionId !== p.id && "video" === a.getAttributes().type && pa(a), d = TK.StreamEvent({
          type: "stream-subscribed",
          stream: a
        }), L.Logger.info("[tk-sdk]stream-subscribed , stream id:" +
          a.getID() + " , hasData is " + a.hasData() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(d), c && c(!0)) : (L.Logger.info("[tk-sdk]stream-subscribe:remoteStreams does not contain streams ,stream  subscribe  information does not need to be passed to the interface layer , stream id:" + a.getID() + " , hasData is " + a.hasData() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), c && c(!1))
      });
      else {
        L.Logger.warning("[tk-sdk]There's nothing to subscribe to");
        c && c(void 0, "Nothing to subscribe to");
        return
      }
      L.Logger.debug("[tk-sdk]Subscribing to: " + a.getID());
      return 0
    }
  };
  h.unsubscribe = function(a, b, c) {
    void 0 !== h.socket && a && !a.local && (c = c || {}, R("unsubscribe", a.getID(), function(d, e) {
      0 !== d ? (d = TK.StreamEvent({
        type: "stream-unsubscribe-fail",
        stream: a,
        message: {
          error: e
        }
      }), L.Logger.info("[tk-sdk]stream-unsubscribe-fail , stream id:" + a.getID() + " , extensionId is " + a.extensionId + ", attrs is " + L.Utils.toJsonStringify(a.getAttributes())), h.dispatchEvent(d), b && b(void 0,
        e)) : (c.reconnection || (delete a.isCompleted, a.reconnectionNumber = 0), a.failed && delete a.failed, ra(a), b && b(!0))
    }, function() {
      L.Logger.error("[tk-sdk]Error calling unsubscribe.")
    }))
  };
  h.getStreamStats = function(a, b) {
    if (!h.socket) return "Error getting stats - no socket";
    if (!a) return "Error getting stats - no stream";
    R("getStreamStats", a.getID(), function(a) {
      a && b(a)
    })
  };
  h.getStreamsByAttribute = function(a, b) {
    var c = [],
      d;
    for (d in h.remoteStreams)
      if (h.remoteStreams.hasOwnProperty(d)) {
        var e = h.remoteStreams[d];
        void 0 !==
        e.getAttributes() && void 0 !== e.getAttributes()[a] && e.getAttributes()[a] === b && c.push(e)
      }
    return c
  };
  h.deleteStream = function(a) {
    void 0 !== a.stream && (a.hide(), a.pc && a.pc.removeStream(a.stream), a.local && a.stream.stop(), delete a.stream)
  };
  h.addStream = function(a) {
    a || L.Logger.warning("[tk-sdk]not stream to addStream");
    a.pc.addStream(a)
  };
  h.seekPlayback = function(a) {
    if (C) try {
      a = Number(a), h.socket.emit("seekPlayback", a)
    } catch (aa) {
      L.Logger.error("[tk-sdk]The seek posttion must be a number, in milliseconds !")
    } else L.Logger.warning("[tk-sdk]No playback environment!")
  };
  h.pausePlayback = function() {
    C ? h.socket.emit("pausePlayback") : L.Logger.warning("[tk-sdk]No playback environment!")
  };
  h.playPlayback = function() {
    C ? h.socket.emit("Playback") : L.Logger.warning("[tk-sdk]No playback environment!")
  };
  h.initPlaybackInfo = function(b, c, d, e, f) {
    var g = function() {
      if (d) {
        if ("string" === typeof d) try {
          d = L.Utils.toJsonParse(d)
        } catch (Wa) {
          L.Logger.error("[tk-sdk]params type must is json! ");
          return
        }
        if (void 0 === d.roomtype || void 0 === d.serial || void 0 === d.recordfilepath) L.Logger.error("[tk-sdk]The params must be included [roomtype , serial , recordfilepath] ! ");
        else {
          n(1);
          a(b, c);
          var f = {
              room: {
                roomtype: d.roomtype,
                maxvideo: d.maxvideo || 0 == d.roomtype ? 2 : 1E4,
                roomrole: -1,
                serial: d.serial,
                roomname: d.roomname || "Play Back",
                recordfilepath: d.recordfilepath,
                domain: d.domain,
                host: d.host,
                companyid: d.companyid || -1
              },
              nickname: "playback",
              roomrole: -1,
              thirdid: Ca() + ":playback"
            },
            g = {};
          var l = f.room;
          l.roomtype = Number(l.roomtype);
          l.maxvideo = parseInt(l.maxvideo);
          l.roomrole = Number(l.roomrole);
          T = l;
          O = l.serial;
          Da = l.roomname;
          ma = l.roomtype;
          ba = l.maxvideo;
          ua = l.recordfilepath;
          g.properties = {};
          g.properties.role =
            f.roomrole;
          g.properties.nickname = f.nickname;
          g.id = f.thirdid;
          C = !0;
          p = TK.RoomUser(g);
          na = TK.AVMgr;
          C && (O = O + "_" + p.id) && -1 === O.indexOf(":playback") && (O += ":playback");
          h.setIsGetFileList(!1);
          da = !1;
          oa = f ? "string" === typeof f ? f : L.Utils.toJsonStringify(f) : "";
          TK.isTkNative && !ea && (ea = !0, tknative.postMessage({
            command: "initNative",
            localId: p.id.toString(),
            width: Number(Y),
            height: Number(ha),
            fps: Number(Q),
            roomInfo: oa,
            webAddr: y.toString(),
            webPort: F.toString()
          }));
          e && "function" === typeof e && e(0, g, T);
          L.Logger.info("[tk-sdk]initPlaybackInfo--\x3e_room_max_videocount:" +
            ba + " , my id:" + p.id + " , room id:" + O, "room properties chairmancontrol is:" + (T.chairmancontrol ? window.__TkSdkBuild__ ? L.Utils.encrypt(T.chairmancontrol) : T.chairmancontrol : void 0))
        }
      } else L.Logger.error("[tk-sdk]params is required ,params type is json !")
    };
    f ? g() : d && "object" === typeof d ? d.recordfilepath ? (n(1), a(b, c), C = !0, na = TK.AVMgr, ua = d.recordfilepath, h.setIsGetFileList(!1), da = !1, d.playback = !0, L.Logger.info("[tk-sdk]initPlaybackInfo to checkroom start , params is " + (window.__TkSdkBuild__ ? L.Utils.encrypt(L.Utils.toJsonStringify(d)) :
        L.Utils.toJsonStringify(d)) + "!"), f = d.recordfilepath + "room.json", /room.json/g.test(d.recordfilepath) && (f = d.recordfilepath), /https:/g.test(window.location.protocol) && !/https:/g.test(f) && (f = f.replace(/http:/g, "https:").replace(/:\d+/g, "")), $.ajax({
      url: f,
      dataType: "json",
      type: "GET",
      async: !0
    }).done(function(a) {
      L.Logger.debug("[tk-sdk]getPlaybackRoomJson resp \x3d ", L.Utils.toJsonStringify(a));
      a && "object" === typeof a ? Ha(a, function(a, b, c) {
        0 === a ? e && "function" === typeof e && e(a, b, c) : g()
      }) : (L.Logger.error("[tk-sdk]getPlaybackRoomJson resp must is json , call oldInitPlaybackInterface handler!"),
        g())
    }).fail(function(a, b, c) {
      L.Logger.error("[tk-sdk]getPlaybackRoomJson fail[ jqXHR , textStatus , errorThrown ]:", a, b, c);
      g()
    })) : L.Logger.error("[tk-sdk]params.recordfilepath is required !") : L.Logger.error("[tk-sdk]params is required ,params type is json !")
  };
  h.updateProtocol = function(a) {
    S = a;
    Ja = /http:/g.test(a) ? 81 : 8080
  };
  h.checkroom = function(c, d, f, g, l, k) {
    TK.isTkNative && tknative.addEventListener("message", Va, !1);
    n(1);
    C || (b(c), a(c, d), e());
    void 0 !== J && void 0 !== G || C || h.requestServerList(y, F, void 0, {
      checkroom: !0
    });
    c = S + y + ":" + F + "/ClientAPI/checkroom?ts\x3d" + (new Date).getTime();
    d = !0;
    k = "";
    if ("string" === typeof f) k = f, C && (k += "\x26playback\x3dtrue");
    else {
      C && (f.playback = !0);
      for (var r in f) d ? d = !1 : k += "\x26", k = k + r + "\x3d" + f[r]
    }
    L.Logger.debug("[tk-sdk]Going to checkroom", k);
    L.Logger.info("[tk-sdk]call checkroom start!");
    var m = u("POST", c, !0, k, function() {
      L.Logger.debug("[tk-sdk]Http status ", m.readyState);
      if (4 == m.readyState)
        if (200 == m.status) {
          L.Logger.debug("[tk-sdk]checkroom resp : " + m.responseText);
          var a = L.Utils.toJsonParse(m.responseText);
          Ha(a, g, l)
        } else L.Logger.error("[tk-sdk]checkroom fail[readyState-status]:", m.readyState, m.status), g(3, m.responseText)
    })
  };
  h.getAVMgr = function() {
    return na
  };
  h.controlMedia = function(a, b) {
    h.socket.emit("controlmedia", a, b)
  };
  h.changeLocalDeviceToLocalstream = function(a, b, d) {
    TK.AVMgr.changeLocalDeviceToLocalstream(function(a) {
      if (v) {
        v.hasVideo() !== p.hasvideo && v.changeVideo(p.hasvideo);
        v.hasAudio() !== p.hasaudio && v.changeAudio(p.hasaudio);
        if (v.stream) {
          for (var b in a) /^customdata_/g.test(b) && (v.stream[b] = a[b]);
          var d = v.stream.getTracks();
          for (b = 0; b < d.length; b++) {
            var e = d[b];
            v.stream.removeTrack(e)
          }
          a = a.getTracks();
          for (b = 0; b < a.length; b++) e = a[b], v.stream.addTrack(e)
        } else v.stream = a;
        v.player && v.player.changeMediaStreamUrl(v.stream);
        if (la && p && void 0 != p.id && A[p.id]) {
          var f = p.publishstate;
          f > TK.PUBLISH_STATE_NONE && h.unpublish(v, function(a, b) {
            l(!0);
            g(!0);
            c(p.publishstate);
            f > TK.PUBLISH_STATE_NONE && h.publish(v)
          })
        }
      } else L.Logger.error("[tk-sdk]changeLocalDeviceToLocalstream _default_stream is not exist!")
    }, a, b, d)
  };
  h.getLottyerDraw =
    function(a, b, c, d) {
      var e = S + y + ":" + F + "/ClientAPI/lotterydraw?ts\x3d" + (new Date).getTime();
      console.log(e);
      if (c) return $.ajax({
        url: e,
        dataType: "json",
        type: "POST",
        data: {
          serial: a,
          isReLotterydraw: b,
          num: c
        },
        async: !1
      }).done(function(a) {
        L.Logger.debug("[tk-sdk]getLottyerDraw resp \x3d ", L.Utils.toJsonStringify(a));
        d && "function" === typeof d && d(a)
      }).fail(function(a, b, c) {
        L.Logger.error("[tk-sdk]getLottyerDraw fail[ jqXHR , textStatus , errorThrown ]:", a, b, c);
        d(3, void 0)
      });
      L.Logger.error("[tk-sdk]getLottyerDraw num is required!")
    };
  h.getOnlineNum = function(a, b, c) {
    var d = S + y + ":" + F + "/ClientAPI/getonlinenum?ts\x3d" + (new Date).getTime();
    console.log(d);
    if (a) {
      if (b) return $.ajax({
        url: d,
        dataType: "json",
        type: "POST",
        data: {
          companyid: a,
          serial: b
        },
        async: !1
      }).done(function(a) {
        L.Logger.debug("[tk-sdk]getOnlineNum resp \x3d ", L.Utils.toJsonStringify(a));
        c && "function" === typeof c && c(a.result, a)
      }).fail(function(a, b, d) {
        L.Logger.error("[tk-sdk]getOnlineNum fail[ jqXHR , textStatus , errorThrown ]:", a, b, d);
        c(3, void 0)
      });
      L.Logger.error("[tk-sdk]getOnlineNum serial is required!")
    } else L.Logger.error("[tk-sdk]getOnlineNum companyid is required!")
  };
  h.getUploadFileParams = function(a, b, c, d) {
    a = {
      serial: T.serial,
      userid: p.id,
      sender: p.nickname,
      conversion: 1,
      isconversiondone: 0,
      writedb: (void 0 !== c ? c : 1) ? 1 : 0,
      fileoldname: a,
      fieltype: b,
      alluser: 1
    };
    d && (a.codeid = d);
    return a
  };
  h.docUploadFileDataInfo = function(a, b) {
    var c = S + y + ":" + F + "/ClientAPI/docupdateinfo?ts\x3d" + (new Date).getTime();
    console.log(c);
    if (a) return $.ajax({
      url: c,
      dataType: "json",
      type: "POST",
      data: {
        fileid: a
      },
      async: !1
    }).done(function(a) {
      L.Logger.debug("[tk-sdk]docUploadFileDataInfo resp \x3d ", L.Utils.toJsonStringify(a));
      b && "function" === typeof b && b(a.status, a)
    }).fail(function(a, c, d) {
      L.Logger.error("[tk-sdk]docUploadFileDataInfo fail[ jqXHR , textStatus , errorThrown ]:", a, c, d);
      b(3, void 0)
    });
    L.Logger.error("[tk-sdk]docUploadFileDataInfo fileId is required!")
  };
  h.uploadFile = function(a, b, c) {
    return P(a, b, c)
  };
  h.deleteFile = function(a, b) {
    U(a, b)
  };
  h.setIsGetRtcStatsrObserver = function(a) {
    da = a
  };
  h.setRtcStatsrObserverTimer = function(a) {
    Ga = a
  };
  h.stopIntervalRtcStatsrObserver = function() {
    clearInterval(h._rtcStatsrObserverTimer);
    h._rtcStatsrObserverTimer =
      null
  };
  h.startIntervalRtcStatsrObserver = function() {
    clearInterval(h._rtcStatsrObserverTimer);
    h._rtcStatsrObserverTimer = setInterval(function() {
      for (var a in h.remoteStreams) {
        var b = h.remoteStreams[a];
        b.extensionId === p.id && h.localStreams[b.getID()] && (b = v);
        b && b.pc && h.rtcStatsrObserver(b)
      }
    }, Ga)
  };
  h.stopIntervalRtcStatsrObserverByStream = function(a) {
    a ? (clearInterval(a.rtcStatsrObserverTimer), a.rtcStatsrObserverTimer = null) : L.Logger.error("[tk-sdk]stream is not exist!")
  };
  h.startIntervalRtcStatsrObserverByStream =
    function(a, b) {
      b = b || Ga;
      a ? (clearInterval(a.rtcStatsrObserverTimer), a.rtcStatsrObserverTimer = setInterval(function() {
        a && a.pc && h.rtcStatsrObserver(a)
      }, b)) : L.Logger.error("[tk-sdk]stream is not exist!")
    };
  h.rtcStatsrObserver = function(a) {
    if (a)
      if (a.extensionId === p.id && h.localStreams[a.getID()] && (a = v), !a.pc) L.Logger.error("[tk-sdk]stream.pc is not exist , stream id and extensionId:" + a.getID() + "," + a.extensionId + "!");
      else {
        if (a && a.pc)
          if (!0 === a.pc.isNative) {
            L.Logger.debug("[tk-sdk]pc.getStats has not been implemented currently!");
            clearTimeout(h._rtcStatsrObserverTimer);
            clearTimeout(a.rtcStatsrObserverTimer);
            h._rtcStatsrObserverTimer = null;
            a.rtcStatsrObserverTimer = null;
            var b = TK.StreamEvent({
              type: "stream-rtcStats-failed",
              stream: a,
              message: {
                error: "[tk_client]pc.getStats has not been implemented currently!",
                code: L.Constant.getStats.nativeFailure,
                isNative: a.pc.isNative
              }
            });
            h.dispatchEvent(b)
          } else if (a.pc.getStats) try {
            a.pc.getStats(function(b, c) {
              void 0 === c || -1 !== c && -2 !== c && -3 !== c ? (b = Sa(a, b)) ? (a.networkStatus = b, b = TK.StreamEvent({
                type: "stream-rtcStats",
                stream: a,
                message: {
                  networkStatus: b
                }
              }, !1), h.dispatchEvent(b, !1)) : h.rtcStatsrObserver(a) : (L.Logger.error("[tk-sdk]pc.getStats -\x3e getStats not exist!"), clearTimeout(a.rtcStatsrObserverTimer), a.rtcStatsrObserverTimer = null, b = TK.StreamEvent({
                type: "stream-rtcStats-failed",
                stream: a,
                message: {
                  error: "pc.getStats -\x3e getStats not exist!",
                  code: -1 === c ? L.Constant.getStats.peerConnectionNotGetStats : -2 === c ? L.Constant.getStats.getStatsFailure : L.Constant.getStats.getStatsError,
                  isNative: a.pc.isNative
                }
              }), h.dispatchEvent(b))
            })
          } catch (Ta) {
            L.Logger.error("[tk-sdk]pc.getStats error:",
              Ta)
          } else L.Logger.error("[tk-sdk]pc.getStats is not exist!"), clearTimeout(a.rtcStatsrObserverTimer), a.rtcStatsrObserverTimer = null, b = TK.StreamEvent({
            type: "stream-rtcStats-failed",
            stream: a,
            message: {
              error: "pc.getStats is not exist!",
              code: L.Constant.getStats.pcNotGetStats,
              isNative: a.pc.isNative
            }
          }), h.dispatchEvent(b)
      }
    else L.Logger.error("[tk-sdk]stream is not exist!")
  };
  h.initBroadcast = function(a, b, c, d, e) {
    a ? (b || (b = 10), c || (c = 3), d && e ? tknative.postMessage({
      command: "initBroadcast",
      url: a.toString(),
      fps: Number(b),
      key_sec: Number(c),
      width: Number(d),
      height: Number(e)
    }) : L.Logger.error("[tk-sdk]argument width or height of initBroadcast function not exist!")) : L.Logger.error("[tk-sdk]argument url of initBroadcast function not exist!")
  };
  h.uninitBroadcast = function() {
    tknative.postMessage({
      command: "uninitBroadcast"
    })
  };
  h.startBroadcast = function(a) {
    a ? tknative.postMessage({
      command: "startBroadcast",
      streamId: a
    }) : L.Logger.error("[tk-sdk]argument extensionId of startBroadcast function not exist!")
  };
  h.stopBroadcast = function() {
    tknative.postMessage({
      command: "stopBroadcast"
    })
  };
  h.addOndevicechange = function() {
    if (!C) {
      var a = function(a) {
        K(a)
      };
      TK && TK.AVMgr && TK.AVMgr.addOndevicechange ? TK.AVMgr.addOndevicechange(a) && h.dispatchEvent({
          type: "add_device_change_listener"
        }) : L.Logger.error("TK.AVMgr no initialization is done!")
    }
  };
  h.removeOndevicechange = function() {
    TK && TK.AVMgr && TK.AVMgr.removeOndevicechange ? TK.AVMgr.removeOndevicechange() && h.dispatchEvent({
        type: "remove_device_change_listener"
      }) : L.Logger.error("TK.AVMgr no initialization is done!")
  };
  h.startRecordStream = function(a, b, c) {
    if (6 != B) return 2;
    if (void 0 === a || void 0 === a.getID()) return 4;
    var d = {};
    d.streamId = a.getID();
    d.convert = b.convert || 0;
    R("startRecordStream", d, function(a, b) {
      L.Logger.debug("startRecordStream", a, b);
      c(a, b)
    });
    return 0
  };
  h.stopRecordStream = function(a, b) {
    if (6 != B) return 2;
    if (void 0 === a || void 0 === a.getID()) return 4;
    var c = {};
    c.streamId = a.id;
    R("stopRecordStream", c, function(a) {
      L.Logger.debug("stopRecordStream", a);
      b(a)
    });
    return 0
  };
  h.getRoomMaxVideocount = function() {
    return ba
  };
  h.updateRoomMaxVideocount = function(a) {
    ba = a;
    L.Logger.info("[tk-sdk]updateRoomMaxVideocount --\x3e update room_max_videocount to " +
      ba)
  };
  h.requestServerList = function(a, c, d, e) {
    if (Ra)
      if (h.webInterfaceGetservering || h.webInterfaceGetserverNameing) L.Logger.info("[tk-sdk]requestServerList  interface is being requested and cannot be executed again requestServerList"), d && "function" === typeof d && d(J, -2);
      else {
        if (void 0 !== J && void 0 !== G) return d && "function" === typeof d && d(J, -1), J;
        if (void 0 === a || null === a || void 0 === c || null === c) L.Logger.error("[tk-sdk]first requestServerList web_host or web_port is not exist!");
        else {
          Pa = a;
          Qa = c;
          L.Logger.debug("[tk-sdk]Going to requestServerList");
          var g = !1,
            l = !1,
            k = function() {
              if (g && l) {
                f(J, G);
                L.Logger.info("[tk-sdk]requestServerList finshed , serverName is " + G + " , serverlist info : ", window.__TkSdkBuild__ ? L.Utils.encrypt(L.Utils.toJsonStringify(J)) : L.Utils.toJsonStringify(J));
                var a = TK.RoomEvent({
                  type: "room-serverlist",
                  message: {
                    serverList: J,
                    serverName: G
                  }
                });
                h.dispatchEvent(a);
                d && "function" === typeof d && d(J, 0)
              }
            };
          h.webInterfaceGetservering = !0;
          h.webInterfaceGetserverNameing = !0;
          M(a, c, function(a, b) {
            h.webInterfaceGetservering = !1;
            g = !0;
            k()
          });
          (function(a,
                    c) {
            b(a);
            c && "function" === typeof c && c()
          })(a, function() {
            h.webInterfaceGetserverNameing = !1;
            l = !0;
            k()
          })
        }
      }
    else d && "function" === typeof d && d(void 0, -2)
  };
  h.getServerName = function() {
    return G
  };
  h.switchServerByName = function(a) {
    if (void 0 === J) return L.Logger.error("[tk-sdk]selectServerByName --\x3e service list not request  , list is not exist!"), !1;
    if (!J[a]) return L.Logger.error("[tk-sdk]selectServerByName --\x3e the service list  has no option name  " + a + "!"), !1;
    void 0 !== y && void 0 !== F ? 0 < wa ? (G = a, L.Utils.localStorage.setItem("tkLocalstorageServerName",
      G), f(J, G), e(), qa !== y ? d({
      source: "select service reconnect"
    }) : L.Logger.info("[tk-sdk]web request host is not change , not need reconnect service!")) : L.Logger.error("[tk-sdk]selectServerByName--\x3eThe room has no connection success and cannot perform a reswitch server! ") : L.Logger.error("[tk-sdk]selectServerByName--\x3eweb request host and port is not exist , cannot perform a reswitch server! ");
    return !0
  };
  h.selectServerToCheckroom = function(b, c, d, g, l) {
    b = b || G;
    void 0 === J ? (L.Logger.error("[tk-sdk]selectServerToCheckroom --\x3eservice list not request  , list is not exist!"),
    d && "function" === typeof d && d(-2, void 0, void 0)) : J[b] ? (G = b, L.Utils.localStorage.setItem("tkLocalstorageServerName", G), f(J, G), a(Pa, Qa), void 0 !== y && void 0 !== F ? (e(), h.checkroom(y, F, c, d, g, l)) : L.Logger.error("[tk-sdk]web request host and port is not exist , cannot call checkroom ! ")) : (L.Logger.error("[tk-sdk]selectServerToCheckroom --\x3ethe service list  has no option name  " + b + "!"), d && "function" === typeof d && d(-2, void 0, void 0))
  };
  h.getWebAddressInfo = function() {
    return {
      host: y,
      port: F,
      doc_host: fa,
      doc_port: ca,
      protocol: S
    }
  };
  h.updateRequestServerListPermission = function(a) {
    Ra = a
  };
  h.stopStreamTracksFromDefaultStream = function() {
    v && v.stream ? TK.AVMgr.stopStreamTracks ? TK.AVMgr.stopStreamTracks(v.stream) : L.Logger.warning("[tk-sdk] TK.AVMgr.stopStreamTracks is not exist , inexecutable stopStreamTracksFromDefaultStream") : L.Logger.warning("[tk-sdk] defaultstream.stream is not exist , inexecutable stopStreamTracksFromDefaultStream")
  };
  h.getValidWindowList = function(a, b) {
    if (void 0 === a || null === a || "function" !== typeof b) L.Logger.error("[tk-sdk] getValidWindowList function got wrong arguments");
    else {
      var c = Z();
      TK.waitNativeToCallbackList[c] = b;
      tknative.postMessage({
        command: "getValidWindowList",
        type: Number(a),
        seq: c
      })
    }
  };
  h.updateWindowSource = function(a) {
    a.id || (a.id = 0);
    a.x || (a.x = 0);
    a.y || (a.y = 0);
    a.width || (a.width = 0);
    a.height || (a.height = 0);
    a.mixMic || (a.mixMic = !1);
    a.mixSpk || (a.mixSpk = !1);
    a.type || (a.type = 0);
    tknative.postMessage({
      command: "updateWindowSource",
      id: Number(a.id),
      left: Number(a.x),
      top: Number(a.y),
      width: Number(a.width),
      height: Number(a.height),
      mixMic: a.mixMic,
      mixSpk: a.mixSpk,
      type: Number(a.type)
    })
  };
  h.getMonitorCount = function(a) {
    if (TK.isTkNative)
      if ("function" !== typeof a) L.Logger.error("[tk-sdk] getMonitorCount function got wrong arguments");
      else {
        var b = Z();
        TK.waitNativeToCallbackList[b] = a;
        tknative.postMessage({
          command: "getMonitorCount",
          seq: b
        })
      }
  };
  h.enableViceMonitor = function() {
    TK.isTkNative && (TK.subscribe_from_native = !0, tknative.postMessage({
      command: "enableViceMonitor"
    }))
  };
  h.takeSnapshot = function(a, b, c) {
    if (TK.isTkNative)
      if (b)
        if ("function" !== typeof c) L.Logger.error("[tk-sdk] takeSnapshot function got wrong arguments");
        else {
          var d = Z();
          TK.waitNativeToCallbackList[d] = c;
          tknative.postMessage({
            command: "takeSnapshot",
            needMin: a,
            fileName: b,
            requestId: d
          })
        }
      else L.Logger.error("[tk-sdk] takeSnapshot function got wrong arguments")
  };
  h.startLocalRecord = function(a, b) {
    if (TK.isTkNative)
      if (a && "function" === typeof b) {
        var c = Z();
        TK.waitNativeToCallbackList[c] = b;
        tknative.postMessage({
          command: "startLocalRecord",
          args: a,
          seq: c
        })
      } else L.Logger.error("[tk-sdk] startRecordScreen function got wrong arguments")
  };
  h.stopLocalRecord = function(a) {
    TK.isTkNative &&
    tknative.postMessage({
      command: "stopLocalRecord",
      args: a
    })
  };
  h.pauseLocalRecord = function(a, b) {
    if (TK.isTkNative)
      if (a && "function" === typeof b) {
        var c = Z();
        TK.waitNativeToCallbackList[c] = b;
        tknative.postMessage({
          command: "pauseLocalRecord",
          args: a,
          seq: c
        })
      } else L.Logger.error("[tk-sdk] pauseLocalRecord function got wrong arguments")
  };
  h.shutdownNativeClient = function() {
    TK.isTkNative && tknative.postMessage({
      command: "shutdownNativeClient"
    })
  };
  h.getOpenLocalFileName = function(a, b) {
    if (TK.isTkNative)
      if ("object" !== typeof a ||
        "function" !== typeof b) L.Logger.error("[tk-sdk] getOpenLocalFileName function got wrong arguments ,param must is json , callback must is function! ");
      else {
        var c = Z();
        TK.waitNativeToCallbackList[c] = b;
        tknative.postMessage({
          command: "getOpenFileName",
          args: a,
          seq: c
        })
      }
  };
  h.getSaveLocalFileName = function(a, b) {
    if (TK.isTkNative)
      if ("object" !== typeof a || "function" !== typeof b) L.Logger.error("[tk-sdk] getSaveLocalFileName function got wrong arguments ,param must is json , callback must is function! ");
      else {
        var c = Z();
        TK.waitNativeToCallbackList[c] = b;
        tknative.postMessage({
          command: "getSaveFileName",
          args: a,
          seq: c
        })
      }
  };
  h.getLocalFileStreamPlayerPosition = function(a) {
    if (TK.isTkNative)
      if ("function" !== typeof a) L.Logger.error("[tk-sdk] getFileStreamPlayerPosition function got wrong arguments , must is function!");
      else {
        var b = Z();
        TK.waitNativeToCallbackList[b] = a;
        tknative.postMessage({
          command: "getMediaPlayPos",
          seq: b
        })
      }
  };
  h.getLocalFileMediaInfo = function(a, b) {
    if (TK.isTkNative)
      if (a && "function" === typeof b) {
        var c = Z();
        TK.waitNativeToCallbackList[c] =
          b;
        tknative.postMessage({
          command: "getMediaFileInfo",
          seq: c,
          file: a
        })
      } else L.Logger.error("[tk-sdk] getLocalFileMediaInfo function got wrong arguments!")
  };
  h.pauseLocalFileStream = function(a) {
    TK.isTkNative && ("boolean" !== typeof a ? L.Logger.error("[tk-sdk] pauseLocalFileStream function got wrong arguments , must is boolean!") : tknative.postMessage({
      command: "pauseMediaFile",
      pause: a
    }))
  };
  h.seekLocalFileStream = function(a) {
    TK.isTkNative && ("number" !== typeof a ? L.Logger.error("[tk-sdk] seekLocalFileStream function got wrong arguments , must is number!") :
      (1 < a && (a = 1), tknative.postMessage({
        command: "seekMediaFile",
        pos: a
      })))
  };
  h.listenCloseEvent = function() {
    if (TK.isTkNative) try {
      talk_window.listenCloseEvent()
    } catch (r) {
      L.Logger.error("[tk-sdk] listenCloseEvent function can not be called")
    }
  };
  h.closeWindow = function() {
    if (TK.isTkNative) try {
      talk_window.closeWindow()
    } catch (r) {
      L.Logger.error("[tk-sdk] closeWindow function can not be called")
    }
  };
  h.enableLocalAudioOrVideo = function(a) {
    a && "object" === typeof a ? (void 0 !== a.video && "boolean" === typeof a.video && g(a.video),
    void 0 !== a.audio && "boolean" === typeof a.audio && l(a.audio)) : L.Logger.error("[tk-sdk]enableLocalAudioOrVideo enables must is json . enables \x3d {video , audio} !")
  };
  h.liveSimulateServerCommunicationInterface = function(a) {
    if (H["_handler_" + a] && "function" === typeof H["_handler_" + a]) {
      for (var b = [], c = 1; c < arguments.length; c++) b.push(arguments[c]);
      H["_handler_" + a].apply(null, b)
    }
  };
  h.clientAudioMediaPlayer = function(a, b, c) {
    TK.isTkNative && (c = c || {}, b ? (L.Logger.info("[tk-sdk]clientAudioMediaPlayer url is " + a + " , action is " +
      b + " , options is" + L.Utils.toJsonStringify(c)), c.audioUrl = a, tknative.postMessage({
      command: "clientAudioMediaPlayer",
      action: b,
      options: c
    })) : L.Logger.error("[tk-sdk]clientAudioMediaPlayer action is not exist!"))
  };
  h.clientPreloadMediaFile = function(a) {
    TK.isTkNative && (Array.isArray(a) ? a && 0 < a.length && tknative.postMessage({
        command: "clientPreloadMediaFile",
        urlArray: a
      }) : L.Logger.error("[tk-sdk]clientPreloadMediaFile args must is array!"))
  };
  h.clientOpenBrowserUrl = function(a) {
    TK.isTkNative && (a ? tknative.postMessage({
      command: "clientOpenBrowserUrl",
      url: a
    }) : L.Logger.error("[tk-sdk]clientOpenBrowserUrl url is not exist!"))
  };
  TK && TK.coreEventController && (TK.coreEventController.addEventListener("getUserMedia_success", function(a) {
    h.dispatchEvent(a)
  }), TK.coreEventController.addEventListener("getUserMedia_failure", function(a) {
    h.dispatchEvent(a)
  }), TK.coreEventController.addEventListener("getUserMedia_failure_reGetOnlyAudioStream", function(a) {
    h.dispatchEvent(a)
  }));
  var Va = function(a) {
    var b = a.data.name;
    if ("onValidWindowList" === b) b = a.data.seq, void 0 !== b &&
    "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](a.data.validWindows), delete TK.waitNativeToCallbackList[b]);
    else if ("onLog" === b) b = a.data.level, a = a.data.log, 0 === b && L.Logger.debug(a), 1 === b && L.Logger.info(a), 2 === b && L.Logger.warning(a), 3 === b && L.Logger.error(a);
    else if ("onMonitorCount" === b) {
      var c = a.data.count;
      b = a.data.seq;
      void 0 !== b && "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](c), delete TK.waitNativeToCallbackList[b])
    } else if ("onTakSnapshot" ===
      b) {
      b = a.data.action;
      c = a.data.requestId;
      var d = a.data.total,
        e = a.data.now,
        f = a.data.code;
      "function" === typeof TK.waitNativeToCallbackList[c] && (a = L.Utils.toJsonParse(a.data.result), TK.waitNativeToCallbackList[c](b, c, d, e, f, a), "result" === b && delete TK.TK.waitNativeToCallbackList[c])
    } else "onLocalRecord" === b ? (c = a.data.arg, b = a.data.seq, "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](c), delete TK.waitNativeToCallbackList[b])) : "onGetOpenOrSaveFileName" === b ? (c = a.data.arg, b = a.data.seq,
    "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](c), delete TK.waitNativeToCallbackList[b])) : "onGetMediaPlayPos" === b ? (c = a.data.arg, c.duration = parseInt(1E3 * c.duration), 1 < c.pos && (c.pos = 1), c.position = parseInt(c.pos * c.duration), c.position > c.duration && (c.position = c.duration), b = a.data.seq, "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](c), delete TK.waitNativeToCallbackList[b])) : "onNativeNotification" === b ? (c = a.data.arg, TK.isTkNative &&
    "object" === typeof c && "onMediaFileEnded" === c.name && (a = TK.RoomEvent({
      type: "room-clientNotification-onMediaFileEnded",
      message: {}
    }), h.dispatchEvent(a))) : "onGetMediaFileInfo" === b && (c = a.data.arg, b = a.data.seq, c.duration && (c.duration *= 1E3), "function" === typeof TK.waitNativeToCallbackList[b] && (TK.waitNativeToCallbackList[b](c), delete TK.waitNativeToCallbackList[b]))
  };
  H._handler_participantLeft = function(a, b) {
    L.Logger.debug("[tk-sdk]participantLeft userid:" + a);
    var c = A[a];
    void 0 === c ? L.Logger.error("[tk-sdk]participantLeft user is not exist , userid is " +
      a + "!") : (L.Logger.info("[tk-sdk]user leave room  , user info: " + L.Utils.toJsonStringify(c)), C && void 0 !== b && (c.leaveTs = b), N[c.role] || (N[c.role] = {}), C ? A[a] && (A[a].playbackLeaved = !0) : (delete N[c.role][a], delete A[a]), C && "object" === typeof a && (c.leaveTs = a.ts), a = TK.RoomEvent({
      type: "room-participant_leave",
      user: c
    }), h.dispatchEvent(a))
  };
  H._handler_participantJoined = function(a) {
    L.Logger.debug("[tk-sdk]participantJoined userinfo:" + L.Utils.toJsonStringify(a));
    var b = TK.RoomUser(a);
    L.Logger.info("[tk-sdk]user join room  , user info: " +
      L.Utils.toJsonStringify(b));
    N[b.role] || (N[b.role] = {});
    N[b.role][b.id] = b;
    A[b.id] = b;
    C && A[b.id] && delete A[b.id].playbackLeaved;
    C && "object" === typeof a && (b.joinTs = a.ts);
    a = TK.RoomEvent({
      type: "room-participant_join",
      user: b
    });
    h.dispatchEvent(a)
  };
  H._handler_sendMessage = function(a) {
    L.Logger.debug("[tk-sdk]room-text-message info:" + (a && "object" === typeof a ? L.Utils.toJsonStringify(a) : a));
    if (a && a.hasOwnProperty("message")) {
      var b = a.fromID,
        c = p;
      if (10 === T.roomtype) c = void 0;
      else if (void 0 !== b && (c = A[a.fromID]), !c) {
        L.Logger.error("[tk-sdk]user is not exist , user id:" +
          a.fromID + ", message from room-text-message!");
        return
      }
      C && (b = !1, a && a.message && "string" === typeof a.message && (a.message = L.Utils.toJsonParse(a.message), b = !0), a.message.ts = a.ts, b && "object" === typeof a.message && (a.message = L.Utils.toJsonStringify(a.message)));
      a = TK.RoomEvent({
        type: "room-text-message",
        user: c,
        message: a.message
      });
      h.dispatchEvent(a)
    } else L.Logger.error("messages or messages.message is not exist!")
  };
  H._handler_pubMsg = function(a) {
    L.Logger.debug("[tk-sdk]pubMsg info:", L.Utils.toJsonStringify(a));
    a = TK.RoomEvent({
      type: "room-pubmsg",
      message: a
    });
    h.dispatchEvent(a)
  };
  H._handler_delMsg = function(a) {
    L.Logger.debug("[tk-sdk]delMsg info:", L.Utils.toJsonStringify(a));
    a = TK.RoomEvent({
      type: "room-delmsg",
      message: a
    });
    h.dispatchEvent(a)
  };
  H._handler_setProperty = function(a) {
    L.Logger.debug("[tk-sdk]setProperty info:", L.Utils.toJsonStringify(a));
    var b = a.id;
    if (a.hasOwnProperty("properties")) {
      var c = a.properties,
        d = A[b];
      if (p.id === b)
        if (d = p, c.hasOwnProperty("publishstate")) h.onChangeMyPublishState(c.publishstate);
        else if (c.hasOwnProperty("disablevideo")) h.onChangeMyDisableVideoState(c.disablevideo);
        else if (c.hasOwnProperty("disableaudio")) h.onChangeMyDisableAudioState(c.disableaudio);
        else c.hasOwnProperty("hasaudio") ? v.audio = c.hasaudio : c.hasOwnProperty("hasvideo") && (v.video = c.hasvideo);
      if (void 0 === d) L.Logger.error("[tk-sdk]setProperty user is not exist , userid is " + b + "!");
      else {
        var e = d.servername,
          g;
        for (g in c) "id" != g && "watchStatus" != g && (d[g] = c[g]);
        if (p.id !== d.id && c.hasOwnProperty("publishstate"))
          for (g in h.remoteStreams) {
            var l =
              h.remoteStreams[g];
            l.extensionId !== p.id && l.extensionId === d.id && "video" === l.getAttributes().type && pa(l)
          }
        d = TK.RoomEvent({
          type: "room-userproperty-changed",
          user: d,
          message: c
        }, {
          fromID: a.fromID
        });
        h.dispatchEvent(d);
        p.id == b && c.hasOwnProperty("servername") && (p.id !== a.fromID ? c.servername && c.servername !== e && h.switchServerByName(c.servername) : c.servername && c.servername !== e && (G = c.servername, L.Utils.localStorage.setItem("tkLocalstorageServerName", G), f(J, G)))
      }
    }
  };
  H._handler_playback_clearAll = function() {
    if (C) {
      var a =
        TK.RoomEvent({
          type: "room-playback-clear_all"
        });
      h.dispatchEvent(a);
      C ? (void 0 != A && (t(N), q(A)), null != p && (p.publishstate = TK.PUBLISH_STATE_NONE)) : L.Logger.error("[tk-sdk]No playback environment, no execution playbackClearAll!")
    } else L.Logger.warning("[tk-sdk]No playback environment!")
  };
  H._handler_duration = function(a) {
    C ? (a = TK.RoomEvent({
      type: "room-playback-duration",
      message: a
    }), h.dispatchEvent(a)) : L.Logger.warning("[tk-sdk]No playback environment!")
  };
  H._handler_playbackEnd = function() {
    if (C) {
      var a = TK.RoomEvent({
        type: "room-playback-playbackEnd"
      });
      h.dispatchEvent(a)
    } else L.Logger.warning("[tk-sdk]No playback environment!")
  };
  H._handler_playback_updatetime = function(a) {
    C ? (a = TK.RoomEvent({
      type: "room-playback-playback_updatetime",
      message: a
    }), h.dispatchEvent(a)) : L.Logger.warning("[tk-sdk]No playback environment!")
  };
  H._handler_connectSocketSuccess = function(a, b) {
    TK.isTkNative && !ea && (ea = !0, tknative.postMessage({
      command: "initNative",
      localId: p.id.toString(),
      width: Number(Y),
      height: Number(ha),
      fps: Number(Q),
      roomInfo: oa,
      webAddr: y.toString(),
      webPort: F.toString()
    }));
    var c = b.roominfo;
    a = b.msglist;
    var d = b.userlist,
      e = 0,
      f = [];
    var g = c.streams || [];
    h.p2p = c.p2p;
    var l = c.id;
    h.iceServers = c.iceServers;
    E.defaultVideoBW = va;
    E.maxVideoBW = va;
    E.defaultScreenBW = 1536;
    E.maxScreenBW = 1536;
    A = {};
    N = {};
    n(6);
    for (e in g)
      if (g.hasOwnProperty(e)) {
        c = g[e];
        var k = !1;
        TK.subscribe_from_native && (k = !0);
        k = TK.Stream({
          streamID: c.id,
          local: !1,
          audio: c.audio,
          video: c.video,
          data: c.data,
          screen: c.screen,
          attributes: c.attributes,
          extensionId: c.extensionId
        }, k);
        f.push(k);
        h.remoteStreams[c.id] = k;
        L.Logger.info("[tk-sdk]room-connected --\x3e stream info , stream id:" +
          k.getID() + " , extensionId is " + k.extensionId + ", attrs is " + L.Utils.toJsonStringify(k.getAttributes()));
        h.subscribe(k)
      }
    for (e in d) d.hasOwnProperty(e) && (g = TK.RoomUser(d[e]), void 0 !== g && (N[g.role] || (N[g.role] = {}), N[g.role][g.id] = g, A[g.id] = g, C && A[g.id] && delete A[g.id].playbackLeaved, L.Logger.info("[tk-sdk]room-connected --\x3e user info: " + L.Utils.toJsonStringify(g))));
    L.Logger.info("[tk-sdk]room-connected --\x3e myself info: " + L.Utils.toJsonStringify(p));
    d = [];
    a && "string" == typeof a && (a = L.Utils.toJsonParse(a));
    for (e in a) a.hasOwnProperty(e) && d.push(a[e]);
    d.sort(function(a, b) {
      return void 0 !== a && a.hasOwnProperty("seq") && void 0 !== b && b.hasOwnProperty("seq") ? a.seq - b.seq : 0
    });
    h.roomID = l;
    la = !0;
    L.Logger.debug("[tk-sdk]Connected to room " + h.roomID);
    L.Logger.debug("[tk-sdk]connected response:", L.Utils.toJsonStringify(b));
    L.Logger.info("[tk-sdk]room-connected ,streams length is " + f.length + " , signalling list length " + d.length);
    b = TK.RoomEvent({
      type: "room-connected",
      streams: f,
      message: d
    });
    h.dispatchEvent(b);
    da && (h.stopIntervalRtcStatsrObserver(),
      h.startIntervalRtcStatsrObserver())
  };
  window.onNativeWindowClose = function() {
    if (TK.isTkNative) {
      var a = TK.RoomEvent({
        type: "room-cilent-close"
      });
      h.dispatchEvent(a)
    }
  };
  TK.checkMyAudioAndVideoEnable = function(a) {
    p && p.id && (a = a || p.id, a === p.id && (TK.isTkNative && (l(!0), g(!0)), p.publishstate > TK.PUBLISH_STATE_NONE && c()))
  };
  return h
};
TK = TK || {};
TK.PUBLISH_STATE_NONE = 0;
TK.PUBLISH_STATE_AUDIOONLY = 1;
TK.PUBLISH_STATE_VIDEOONLY = 2;
TK.PUBLISH_STATE_BOTH = 3;
TK.PUBLISH_STATE_MUTEALL = 4;
TK.RoomUser = function(b) {
  if (void 0 == b || void 0 === b.properties) L.Logger.warning("[tk-sdk]Invalidate user info", a, d);
  else {
    var a = b.id,
      d = b.properties;
    L.Logger.debug("[tk-sdk]RoomUser", a, d);
    b = {};
    b.id = a;
    b.watchStatus = 0;
    for (var f in d) "id" != f && "watchStatus" != f && (b[f] = d[f]);
    b.publishstate = b.publishstate || TK.PUBLISH_STATE_NONE;
    return b
  }
};
var L = L || {};
TK = TK || {};
L.Logger = function(b) {
  var a = "",
    d = !1;
  var f = function(a, c) {
    try {
      switch (c) {
        case b.Logger.DEBUG:
          d ? console.warn.apply(console, a) : console.debug.apply(console, a);
          break;
        case b.Logger.TRACE:
          console.trace.apply(console, a);
          break;
        case b.Logger.INFO:
          d ? console.warn.apply(console, a) : console.info.apply(console, a);
          break;
        case b.Logger.WARNING:
          console.warn.apply(console, a);
          break;
        case b.Logger.ERROR:
          console.error.apply(console, a);
          break;
        case b.Logger.NONE:
          console.warn("log level is none!");
          break;
        default:
          d ? console.warn.apply(console,
            a) : console.log.apply(console, a)
      }
    } catch (l) {
      console.log.apply(console, a)
    }
  };
  return {
    DEBUG: 0,
    TRACE: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
    NONE: 5,
    setLogDevelopment: function(a) {
      d = a
    },
    enableLogPanel: function() {
      b.Logger.panel = document.createElement("textarea");
      b.Logger.panel.setAttribute("id", "licode-logs");
      b.Logger.panel.setAttribute("style", "width: 100%; height: 100%; display: none");
      b.Logger.panel.setAttribute("rows", 20);
      b.Logger.panel.setAttribute("cols", 20);
      b.Logger.panel.setAttribute("readOnly", !0);
      document.body.appendChild(b.Logger.panel)
    },
    setLogLevel: function(a) {
      a > b.Logger.NONE ? a = b.Logger.NONE : a < b.Logger.DEBUG && (a = b.Logger.DEBUG);
      b.Logger.logLevel = a
    },
    setOutputFunction: function(a) {
      f = a
    },
    setLogPrefix: function(b) {
      a = b
    },
    print: function(d) {
      var c = a;
      if (!(d < b.Logger.logLevel)) {
        d === b.Logger.DEBUG ? c = c + "DEBUG(" + (new Date).toLocaleString() + ")" : d === b.Logger.TRACE ? c = c + "TRACE(" + (new Date).toLocaleString() + ")" : d === b.Logger.INFO ? c = c + "INFO(" + (new Date).toLocaleString() + ")" : d === b.Logger.WARNING ? c = c + "WARNING(" + (new Date).toLocaleString() + ")" : d === b.Logger.ERROR &&
          (c = c + "ERROR(" + (new Date).toLocaleString() + ")");
        c += ":";
        for (var e = [], g = 0; g < arguments.length; g++) e[g] = arguments[g];
        e = e.slice(1);
        e = [c].concat(e);
        if (void 0 !== b.Logger.panel) {
          c = "";
          for (g = 0; g < e.length; g++) c += e[g];
          b.Logger.panel.value = b.Logger.panel.value + "\n" + c
        } else f.apply(b.Logger, [e, d])
      }
    },
    debug: function() {
      for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
      b.Logger.print.apply(b.Logger, [b.Logger.DEBUG].concat(a))
    },
    trace: function() {
      for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
      b.Logger.print.apply(b.Logger, [b.Logger.TRACE].concat(a))
    },
    info: function() {
      for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
      b.Logger.print.apply(b.Logger, [b.Logger.INFO].concat(a))
    },
    warning: function() {
      for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
      b.Logger.print.apply(b.Logger, [b.Logger.WARNING].concat(a))
    },
    error: function() {
      for (var a = [], c = 0; c < arguments.length; c++) a[c] = arguments[c];
      b.Logger.print.apply(b.Logger, [b.Logger.ERROR].concat(a))
    }
  }
}(L);
TK.tkLogPrintConfig = function(b, a, d) {
  a = a || {};
  b = b || {};
  d = d || {};
  var f = void 0 != a.logLevel ? a.logLevel : 0;
  b = void 0 != b.debug ? b.debug : !0;
  d = void 0 != d.webrtcLogDebug ? d.webrtcLogDebug : !0;
  L.Logger.setLogDevelopment(void 0 != a.development ? a.development : !0);
  L.Logger.setLogLevel(f);
  L.Utils.localStorage && L.Utils.localStorage.setItem("debug", b ? "*" : "none");
  window.webrtcLogDebug = d
};
L = L || {};
L.Base64 = function() {
  var b, a, d;
  var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  var e = [];
  for (d = 0; d < f.length; d += 1) e[f[d]] = d;
  var c = function(c) {
    b = c;
    a = 0
  };
  var l = function() {
    if (!b || a >= b.length) return -1;
    var c = b.charCodeAt(a) & 255;
    a += 1;
    return c
  };
  var g = function() {
    if (!b) return -1;
    for (;;) {
      if (a >= b.length) return -1;
      var c = b.charAt(a);
      a += 1;
      if (e[c]) return e[c];
      if ("A" === c) return 0
    }
  };
  var k = function(a) {
    a = a.toString(16);
    1 === a.length && (a = "0" + a);
    return unescape("%" + a)
  };
  return {
    encodeBase64: function(a) {
      var b;
      c(a);
      a = "";
      var d = Array(3);
      var e = 0;
      for (b = !1; !b && -1 !== (d[0] = l());) d[1] = l(), d[2] = l(), a += f[d[0] >> 2], -1 !== d[1] ? (a += f[d[0] << 4 & 48 | d[1] >> 4], -1 !== d[2] ? (a += f[d[1] << 2 & 60 | d[2] >> 6], a += f[d[2] & 63]) : (a += f[d[1] << 2 & 60], a += "\x3d", b = !0)) : (a += f[d[0] << 4 & 48], a += "\x3d", a += "\x3d", b = !0), e += 4, 76 <= e && (a += "\n", e = 0);
      return a
    },
    decodeBase64: function(a) {
      var b;
      c(a);
      a = "";
      var d = Array(4);
      for (b = !1; !b && -1 !== (d[0] = g()) && -1 !== (d[1] = g());) d[2] = g(), d[3] = g(), a += k(d[0] << 2 & 255 | d[1] >> 4), -1 !== d[2] ? (a += k(d[1] << 4 & 255 | d[2] >> 2), -1 !== d[3] ? a += k(d[2] << 6 & 255 |
        d[3]) : b = !0) : b = !0;
      return a
    }
  }
}(L);
/*
 https://github.com/Mr0grog/element-query/blob/master/LICENSE

 @param element
 @param value
 @param units
 @returns {*}
 */
(function() {
  function b() {
    (new d.ElementQueries).init()
  }

  function a(a, b) {
    var c = Object.prototype.toString.call(a),
      d = 0,
      e = a.length;
    if ("[object Array]" === c || "[object NodeList]" === c || "[object HTMLCollection]" === c || "undefined" !== typeof jQuery && a instanceof jQuery || "undefined" !== typeof Elements && a instanceof Elements)
      for (; d < e; d++) b(a[d]);
    else b(a)
  }
  var d = this.L = this.L || {};
  d.ElementQueries = function() {
    function a(a) {
      a || (a = document.documentElement);
      a = getComputedStyle(a, "fontSize");
      return parseFloat(a) || 16
    }

    function b(b,
               c) {
      var d = c.replace(/[0-9]*/, "");
      c = parseFloat(c);
      switch (d) {
        case "px":
          return c;
        case "em":
          return c * a(b);
        case "rem":
          return c * a();
        case "vw":
          return c * document.documentElement.clientWidth / 100;
        case "vh":
          return c * document.documentElement.clientHeight / 100;
        case "vmin":
        case "vmax":
          return c * (0, Math["vmin" === d ? "min" : "max"])(document.documentElement.clientWidth / 100, document.documentElement.clientHeight / 100);
        default:
          return c
      }
    }

    function f(a) {
      this.element = a;
      this.options = [];
      var c, d, e, f = 0,
        g = 0,
        l, k, m, n, q;
      this.addOption =
        function(a) {
          this.options.push(a)
        };
      var K = ["min-width", "min-height", "max-width", "max-height"];
      this.call = function() {
        f = this.element.offsetWidth;
        g = this.element.offsetHeight;
        m = {};
        c = 0;
        for (d = this.options.length; c < d; c++) e = this.options[c], l = b(this.element, e.value), k = "width" === e.property ? f : g, q = e.mode + "-" + e.property, n = "", "min" === e.mode && k >= l && (n += e.value), "max" === e.mode && k <= l && (n += e.value), m[q] || (m[q] = ""), n && -1 === (" " + m[q] + " ").indexOf(" " + n + " ") && (m[q] += " " + n);
        for (var a in K) m[K[a]] ? this.element.setAttribute(K[a],
          m[K[a]].substr(1)) : this.element.removeAttribute(K[a])
      }
    }

    function g(a, b) {
      a.elementQueriesSetupInformation ? a.elementQueriesSetupInformation.addOption(b) : (a.elementQueriesSetupInformation = new f(a), a.elementQueriesSetupInformation.addOption(b), new d.ResizeSensor(a, function() {
        a.elementQueriesSetupInformation.call()
      }));
      a.elementQueriesSetupInformation.call()
    }

    function k(a) {
      var b;
      for (a = a.replace(/'/g, '"'); null !== (b = n.exec(a));)
        if (5 < b.length) {
          var c = void 0,
            d = b[1] || b[5],
            e = b[2],
            f = b[3];
          b = b[4];
          document.querySelectorAll &&
          (c = document.querySelectorAll.bind(document));
          c || "undefined" === typeof $$ || (c = $$);
          c || "undefined" === typeof jQuery || (c = jQuery);
          if (!c) throw "No document.querySelectorAll, jQuery or Mootools's $$ found.";
          c = c(d);
          d = 0;
          for (var l = c.length; d < l; d++) g(c[d], {
            mode: e,
            property: f,
            value: b
          })
        }
    }

    function m(a) {
      if (a)
        if ("string" === typeof a) a = a.toLowerCase(), -1 === a.indexOf("min-width") && -1 === a.indexOf("max-width") || k(a);
        else
          for (var b = 0, c = a.length; b < c; b++)
            if (1 === a[b].type) {
              var d = a[b].selectorText || a[b].cssText; - 1 !== d.indexOf("min-height") ||
              -1 !== d.indexOf("max-height") ? k(d) : (-1 !== d.indexOf("min-width") || -1 !== d.indexOf("max-width")) && k(d)
            } else 4 === a[b].type && m(a[b].cssRules || a[b].rules)
    }
    var n = /,?([^,\n]*)\[[\s\t]*(min|max)-(width|height)[\s\t]*[~$\^]?=[\s\t]*"([^"]*)"[\s\t]*]([^\n\s\{]*)/mgi;
    this.init = function() {
      for (var a = 0, b = document.styleSheets.length; a < b; a++) m(document.styleSheets[a].cssText || document.styleSheets[a].cssRules || document.styleSheets[a].rules)
    }
  };
  window.addEventListener ? window.addEventListener("load", b, !1) : window.attachEvent("onload",
    b);
  var f = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(a) {
      return window.setTimeout(a, 20)
    };
  d.ResizeSensor = function(b, c) {
    function e() {
      var a = [];
      this.add = function(b) {
        a.push(b)
      };
      var b, c;
      this.call = function() {
        b = 0;
        for (c = a.length; b < c; b++) a[b].call()
      };
      this.remove = function(d) {
        var e = [];
        b = 0;
        for (c = a.length; b < c; b++) a[b] !== d && e.push(a[b]);
        a = e
      };
      this.length = function() {
        return a.length
      }
    }

    function g(a, b) {
      return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle ?
        window.getComputedStyle(a, null).getPropertyValue(b) : a.style[b]
    }

    function k(a, b) {
      if (!a.resizedAttached) a.resizedAttached = new e, a.resizedAttached.add(b);
      else if (a.resizedAttached) {
        a.resizedAttached.add(b);
        return
      }
      a.resizeSensor = document.createElement("div");
      a.resizeSensor.className = "resize-sensor";
      a.resizeSensor.style.cssText = "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;";
      a.resizeSensor.innerHTML = '\x3cdiv class\x3d"resize-sensor-expand" style\x3d"position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"\x3e\x3cdiv style\x3d"position: absolute; left: 0; top: 0; transition: 0s;"\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"resize-sensor-shrink" style\x3d"position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"\x3e\x3cdiv style\x3d"position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"\x3e\x3c/div\x3e\x3c/div\x3e';
      a.appendChild(a.resizeSensor);
      "static" === g(a, "position") && (a.style.position = "relative");
      var c = a.resizeSensor.childNodes[0],
        d = c.childNodes[0],
        l = a.resizeSensor.childNodes[1],
        k = function() {
          d.style.width = "100000px";
          d.style.height = "100000px";
          c.scrollLeft = 1E5;
          c.scrollTop = 1E5;
          l.scrollLeft = 1E5;
          l.scrollTop = 1E5
        };
      k();
      var m = !1,
        n = function() {
          a.resizedAttached && (m && (a.resizedAttached.call(), m = !1), f(n))
        };
      f(n);
      var z, w, M, P;
      b = function() {
        if ((M = a.offsetWidth) !== z || (P = a.offsetHeight) !== w) m = !0, z = M, w = P;
        k()
      };
      var U = function(a,
                       b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener(b, c)
      };
      U(c, "scroll", b);
      U(l, "scroll", b)
    }
    a(b, function(a) {
      k(a, c)
    });
    this.detach = function(a) {
      d.ResizeSensor.detach(b, a)
    }
  };
  d.ResizeSensor.detach = function(b, c) {
    a(b, function(a) {
      if (a.resizedAttached && "function" === typeof c && (a.resizedAttached.remove(c), a.resizedAttached.length())) return;
      a.resizeSensor && (a.contains(a.resizeSensor) && a.removeChild(a.resizeSensor), delete a.resizeSensor, delete a.resizedAttached)
    })
  }
})();
TK = TK || {};
TK.View = function() {
  var b = TK.EventDispatcher({});
  b.url = "";
  return b
};
TK = TK || {};
TK.VideoPlayer = function(b) {
  b.options = b.options || {};
  b.options.bar = void 0 !== b.options.bar ? b.options.bar : !1;
  var a = void 0 !== b.options.audioPlayer ? b.options.audioPlayer : !1,
    d = TK.View({});
  d.id = b.id;
  d.local = b.stream.local;
  d.stream = b.stream.stream;
  d.elementID = b.elementID;
  var f = function() {
    d.bar.display()
  };
  var e = function() {
    d.bar.hide()
  };
  d.destroy = function() {
    L.Utils.mediaPause(d.video);
    delete d.resizer;
    try {
      d.div && d.container.removeChild(d.div)
    } catch (g) {
      L.Logger.error("[tk-sdk]videoplayer destroy error , removeChild method error info:", g)
    }
  };
  d.resize = function() {
    var a = d.container.offsetWidth,
      c = d.container.offsetHeight;
    if (b.stream.screen || !1 === b.options.crop) 9 / 16 * a < c ? (d.video.style.width = a + "px", d.video.style.height = 9 / 16 * a + "px", d.video.style.top = -(9 / 16 * a / 2 - c / 2) + "px", d.video.style.left = "0px") : (d.video.style.height = c + "px", d.video.style.width = 16 / 9 * c + "px", d.video.style.left = -(16 / 9 * c / 2 - a / 2) + "px", d.video.style.top = "0px");
    else if (a !== d.containerWidth || c !== d.containerHeight) 3 / 4 * a > c ? (d.video.style.width = a + "px", d.video.style.height = 3 / 4 * a + "px", d.video.style.top = -(3 / 4 * a / 2 - c / 2) + "px", d.video.style.left = "0px") : (d.video.style.height = c + "px", d.video.style.width = 4 / 3 * c + "px", d.video.style.left = -(4 / 3 * c / 2 - a / 2) + "px", d.video.style.top = "0px");
    d.containerWidth = a;
    d.containerHeight = c
  };
  d.stream && "object" === typeof d.stream && d.stream.playbackquUrl ? (L.Logger.debug("[tk-sdk]Creating palyback URL from stream " + d.stream), d.streamUrl = d.stream.playbackquUrl) : d.stream && (L.Logger.debug("[tk-sdk]Creating URL from stream " + d.stream), d.streamUrl = (window.URL || webkitURL).createObjectURL(d.stream));
  d.div = document.createElement("div");
  d.div.setAttribute("id", "player_" + d.id);
  d.div.setAttribute("class", "Talk_player");
  d.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;" + (a ? "  display: none;" : " "));
  !1 !== b.options.loader && (d.loader = document.createElement("div"), d.loader.setAttribute("id", "back_" + d.id), d.loader.setAttribute("class", "Talk_loader"));
  d.video = a ? document.createElement("audio") : document.createElement("video");
  d.video.setAttribute("id",
    "stream" + d.id);
  d.video.setAttribute("class", "Talk_stream");
  d.video.setAttribute("style", "width: 100%; height: 100%; position: absolute;background-color:#000;");
  d.video.setAttribute("autoplay", "autoplay");
  d.videoSupernatant = document.createElement("div");
  d.videoSupernatant.setAttribute("class", "Talk_stream_videoSupernatant");
  d.videoSupernatant.setAttribute("style", "width: 100%; height: 100%; position: absolute;background-color:transparent;left:0;top:0;");
  d.showVideoContainer = function() {
    d.container &&
    (d.container.style.display = "block")
  };
  d.hideVideoContainer = function() {
    d.container && (d.container.style.display = "none")
  };
  d.showVideo = function() {
    d.video && (d.video.style.display = "block")
  };
  d.hideVideo = function() {
    d.video && (d.video.style.display = "none")
  };
  d.local && (d.video.volume = 0, d.video.muted = !0);
  d.container = void 0 !== d.elementID ? "object" === typeof d.elementID && "function" === typeof d.elementID.appendChild ? d.elementID : document.getElementById(d.elementID) : document.body;
  d.container.appendChild(d.div);
  d.loader &&
  d.div.appendChild(d.loader);
  d.div.appendChild(d.video);
  d.div.appendChild(d.videoSupernatant);
  d.containerWidth = 0;
  d.containerHeight = 0;
  !1 !== b.options.bar ? (d.bar = new TK.Bar({
    elementID: "player_" + d.id,
    id: d.id,
    stream: b.stream,
    media: d.video,
    options: b.options
  }), d.div.onmouseover = f, d.div.onmouseout = e) : d.media = d.video;
  d.streamUrl && (d.video.src = d.streamUrl, d.video.load());
  var c = function() {
    d.video && 0 !== d.video.readyState && d.audio && (d.div && d.div.removeChild && d.audio && (d.audio.src = "", d.div.removeChild(d.audio)),
      d.audio = void 0)
  };
  d.video.oncanplay = function(a) {
    d.hideLoading();
    d.video.oncanplay = void 0;
    d.video.onloadeddata = void 0;
    d.video.onloadedmetadata = void 0;
    c()
  };
  d.video.onloadeddata = function(a) {
    d.hideLoading();
    d.video.oncanplay = void 0;
    d.video.onloadeddata = void 0;
    d.video.onloadedmetadata = void 0;
    c()
  };
  d.video.onloadedmetadata = function(a) {
    d.hideLoading();
    d.video.oncanplay = void 0;
    d.video.onloadeddata = void 0;
    d.video.onloadedmetadata = void 0;
    c()
  };
  d.video.onreadystatechange = function(a) {
    c()
  };
  d.changeMediaStreamUrl =
    function(a) {
      d.video && a && (d.stream = a, d.stream && "object" === typeof d.stream && d.stream.playbackquUrl ? (L.Logger.debug("[tk-sdk]Creating palyback URL from stream:", d.stream), d.streamUrl = d.stream.playbackquUrl) : d.stream && (L.Logger.debug("[tk-sdk]Creating URL from stream: ", d.stream), d.streamUrl = (window.URL || webkitURL).createObjectURL(d.stream)), d.streamUrl && (d.video.src = d.streamUrl, d.video.load()))
    };
  d.setVolume = function(a) {
    "number" !== typeof a ? L.Logger.error("[tk-sdk]Stream setVolume volume type must is number!") :
      (d.video && void 0 !== d.video.volume && (d.video.volume = a / 100), d.audio && void 0 !== d.audio.volume && (d.audio.volume = a / 100))
  };
  d.hideLoading = function() {
    d.loader && (d.loader.style.display = "none");
    d.div.style.backgroundColor = "transparent"
  };
  d.showLoading = function() {
    d.loader && (d.loader.style.display = "");
    d.div.style.backgroundColor = ""
  };
  d.stream ? "object" === typeof d.stream && d.stream.playbackquUrl || (f = d.stream.getVideoTracks ? d.stream.getVideoTracks() : void 0, f && 0 < f.length || (L.Logger.warning("[tk-sdk]TK.VideoPlayer stream is not videoTracks , hide video element , VideoPlayer id is " +
      d.id + "!"), d.hideVideo())) : (L.Logger.warning("[tk-sdk]TK.VideoPlayer stream is not exist , hide video element , VideoPlayer id is " + d.id + "!"), d.hideVideo());
  var l = function() {
    try {
      if (a || !d.video || 0 !== d.video.readyState || d.local || setTimeout(function() {
          if (d && d.video && 0 === d.video.readyState && d.streamUrl && d.div) {
            d.audio = document.createElement("audio");
            d.audio.setAttribute("id", "stream_temp_audio_" + d.id);
            d.audio.setAttribute("autoplay", "autoplay");
            d.audio.style.display = "none";
            d.div.appendChild(d.audio);
            d.audio.src =
              d.streamUrl;
            d.audio.load();
            d.local && (d.audio.volume = 0, d.audio.muted = !0);
            var a = function() {
                if (d.audio && d.audio.play) {
                  var a = L.Utils.mediaPlay(d.audio);
                  a && a.catch && a.catch(function(a) {
                    L.Logger.warning("[tk-sdk]audio.play method catch error , videoPlayer id is " + d.id + " , error info:" + a)
                  })
                }
              },
              b = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput);
            b ? TK.AVMgr.setElementSinkIdToAudioouputDevice(d.audio, b, function() {
              a()
            }) : a()
          }
        }, 250), d.video && d.video.play) {
        var b = L.Utils.mediaPlay(d.video);
        b && b.catch &&
        b.catch(function(a) {
          L.Logger.warning("[tk-sdk]video.play method catch error , videoPlayer id is " + d.id + " , error info:" + a)
        })
      }
    } catch (k) {
      L.Logger.warning("[tk-sdk]video.play method error , videoPlayer id is " + d.id + " !")
    }
  };
  f = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput);
  d.video && f ? TK.AVMgr.setElementSinkIdToAudioouputDevice(d.video, f, function() {
    l()
  }) : l();
  return d
};
TK = TK || {};
TK.NativeVideoPlayer = function(b) {
  b.options = b.options || {};
  b.options.bar = void 0 !== b.options.bar ? b.options.bar : !1;
  var a = void 0 !== b.options.audioPlayer ? b.options.audioPlayer : !1;
  b.stream.stream || L.Logger.warning("[tk-sdk]VideoPlayer: media stream  is not exist!");
  var d = TK.View({});
  d.id = b.id;
  d.stream = b.stream.stream;
  d.elementID = b.elementID;
  var f = function() {
    d.bar.display()
  };
  var e = function() {
    d.bar.hide()
  };
  d.destroy = function() {
    d.parentNode.removeChild(d.div)
  };
  d.resize = function() {
    var a = d.container.offsetWidth,
      e =
        d.container.offsetHeight;
    if (b.stream.screen || !1 === b.options.crop) 9 / 16 * a < e ? (d.video.style.width = a + "px", d.video.style.height = 9 / 16 * a + "px", d.video.style.top = -(9 / 16 * a / 2 - e / 2) + "px", d.video.style.left = "0px") : (d.video.style.height = e + "px", d.video.style.width = 16 / 9 * e + "px", d.video.style.left = -(16 / 9 * e / 2 - a / 2) + "px", d.video.style.top = "0px");
    else if (a !== d.containerWidth || e !== d.containerHeight) 3 / 4 * a > e ? (d.video.style.width = a + "px", d.video.style.height = 3 / 4 * a + "px", d.video.style.top = -(3 / 4 * a / 2 - e / 2) + "px", d.video.style.left =
      "0px") : (d.video.style.height = e + "px", d.video.style.width = 4 / 3 * e + "px", d.video.style.left = -(4 / 3 * e / 2 - a / 2) + "px", d.video.style.top = "0px");
    d.containerWidth = a;
    d.containerHeight = e
  };
  d.div = document.createElement("div");
  d.div.setAttribute("id", "player_" + d.id);
  d.div.setAttribute("class", "Talk_player");
  d.div.setAttribute("style", "width: 100%; height: 100%; position: relative; background-color: black; overflow: hidden;" + (a ? "  display: none;" : " "));
  !1 !== b.options.loader && (d.loader = document.createElement("div"), d.loader.setAttribute("id",
    "back_" + d.id), d.loader.setAttribute("class", "Talk_loader"));
  d.video = document.createElement("embed");
  d.video.setAttribute("id", d.id);
  d.video.setAttribute("class", "Talk_stream");
  d.video.setAttribute("style", "width: 100%; height: 100%; position: absolute;background-color:#000;");
  d.video.setAttribute("type", "application/x-ppapi-proxy");
  d.videoSupernatant = document.createElement("div");
  d.videoSupernatant.setAttribute("class", "Talk_stream_videoSupernatant");
  d.videoSupernatant.setAttribute("style", "width: 100%; height: 100%; position: absolute;background-color:transparent;left:0;top:0;");
  d.showVideo = function() {
    d.video && (d.video.style.opacity = 1)
  };
  d.hideVideo = function() {
    d.video && (d.video.style.opacity = 0)
  };
  d.container = void 0 !== d.elementID ? "object" === typeof d.elementID && "function" === typeof d.elementID.appendChild ? d.elementID : document.getElementById(d.elementID) : document.body;
  d.container.appendChild(d.div);
  d.parentNode = d.div.parentNode;
  d.loader && d.div.appendChild(d.loader);
  d.div.appendChild(d.video);
  d.div.appendChild(d.videoSupernatant);
  d.containerWidth = 0;
  d.containerHeight = 0;
  !1 !== b.options.bar ?
    (d.bar = new TK.Bar({
      elementID: "player_" + d.id,
      id: d.id,
      stream: b.stream,
      media: d.video,
      options: b.options
    }), d.div.onmouseover = f, d.div.onmouseout = e) : d.media = d.video;
  d.changeMediaStreamUrl = function(a) {};
  d.setVolume = function(a) {
    "number" !== typeof a ? L.Logger.error("[tk-sdk]Stream setVolume volume type must is number!") : tknative.postMessage({
      command: "setEmbedVolume",
      connectionId: d.id,
      volume: a
    })
  };
  d.hideLoading = function() {
    d.loader && (d.loader.style.display = "none");
    d.div.style.backgroundColor = "transparent"
  };
  d.showLoading =
    function() {
      d.loader && (d.loader.style.display = "");
      d.div.style.backgroundColor = ""
    };
  a = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput);
  d.video && a && TK.AVMgr.setElementSinkIdToAudioouputDevice(d.video, a);
  TK.isTkNative && TK.subscribe_from_native || d.hideLoading();
  return d
};
TK = TK || {};
TK.Bar = function(b) {
  var a = TK.View({}),
    d;
  a.elementID = b.elementID;
  a.id = b.id;
  a.div = document.createElement("div");
  a.div.setAttribute("id", "bar_" + a.id);
  a.div.setAttribute("class", "Talk_bar");
  a.bar = document.createElement("div");
  a.bar.setAttribute("style", "width: 100%; height: 15%; max-height: 30px; position: absolute; bottom: 0; right: 0; background-color: rgba(255,255,255,0.62)");
  a.bar.setAttribute("id", "subbar_" + a.id);
  a.bar.setAttribute("class", "Talk_subbar");
  a.link = document.createElement("a");
  a.link.setAttribute("href",
    b && b.options && b.options.link ? b.options.link : "http://www.talk-cloud.com/");
  a.link.setAttribute("class", "Talk_link");
  a.link.setAttribute("target", "_blank");
  a.logo = document.createElement("div");
  a.logo.setAttribute("style", "width: 100%; height: 100%; max-width: 30px; position: absolute; top: 0; left: 2px;");
  a.logo.setAttribute("class", "Talk_logo");
  a.logo.setAttribute("alt", "Lynckia");
  var f = function(b) {
    "block" !== b ? b = "none" : clearTimeout(d);
    a.div.setAttribute("style", "width: 100%; height: 100%; position: relative; bottom: 0; right: 0; display:" +
      b)
  };
  a.display = function() {
    f("block")
  };
  a.hide = function() {
    d = setTimeout(f, 1E3)
  };
  document.getElementById(a.elementID).appendChild(a.div);
  a.div.appendChild(a.bar);
  a.bar.appendChild(a.link);
  a.link.appendChild(a.logo);
  b.stream.screen || void 0 !== b.options && void 0 !== b.options.speaker && !0 !== b.options.speaker || (a.speaker = new TK.Speaker({
    elementID: "subbar_" + a.id,
    id: a.id,
    stream: b.stream,
    media: b.media
  }));
  a.display();
  a.hide();
  return a
};
TK = TK || {};
TK.Speaker = function(b) {
  function a(a, b) {
    if (f(a, b)) {
      for (var c = " " + a.className.replace(/[\t\r\n]/g, "") + " "; 0 <= c.indexOf(" " + b + " ");) c = c.replace(" " + b + " ", " ");
      a.className = c.replace(/^\s+|\s+$/g, "")
    }
  }

  function d(a, b) {
    f(a, b) || (a.className += " " + b)
  }

  function f(a, b) {
    b = b || "";
    return 0 == b.replace(/\s/g, "").length ? !1 : (new RegExp(" " + b + " ")).test(" " + a.className + " ")
  }
  var e = TK.View({}),
    c = 50;
  e.elementID = b.elementID;
  e.media = b.media;
  e.id = b.id;
  e.stream = b.stream;
  e.div = document.createElement("div");
  e.div.setAttribute("style", "width: 40%; height: 100%; max-width: 32px; position: absolute; right: 0;z-index:0;");
  e.icon = document.createElement("div");
  e.icon.setAttribute("id", "volume_" + e.id);
  e.icon.setAttribute("class", "Talk_Volume_icon");
  e.icon.setAttribute("style", "width: 80%; height: 100%; position: absolute;");
  e.div.appendChild(e.icon);
  if (e.stream.local) {
    var l = function() {
      e.media.muted = !0;
      a(e.icon, "sound");
      d(e.icon, "mute");
      e.stream.stream.getAudioTracks()[0].enabled = !1
    };
    var g = function() {
      e.media.muted = !1;
      a(e.icon, "mute");
      d(e.icon, "sound");
      e.stream.stream.getAudioTracks()[0].enabled = !0
    };
    e.icon.onclick = function() {
      e.media.muted ?
        g() : l()
    }
  } else {
    e.picker = document.createElement("input");
    e.picker.setAttribute("id", "picker_" + e.id);
    e.picker.type = "range";
    e.picker.min = 0;
    e.picker.max = 100;
    e.picker.step = 10;
    e.picker.value = c;
    e.picker.setAttribute("orient", "vertical");
    e.div.appendChild(e.picker);
    e.media.volume = e.picker.value / 100;
    e.media.muted = !1;
    e.picker.oninput = function() {
      e.media.muted = 0 < e.picker.value ? !1 : !0;
      a(e.icon, "sound");
      d(e.icon, "mute");
      e.media.volume = e.picker.value / 100
    };
    var k = function(a) {
      e.picker.setAttribute("style", "background: transparent; width: 32px; height: 100px; position: absolute; bottom: 90%; z-index: 1;" +
        e.div.offsetHeight + "px; right: 0px; -webkit-appearance: slider-vertical; display: " + a)
    };
    l = function() {
      a(e.icon, "sound");
      d(e.icon, "mute");
      c = e.picker.value;
      e.picker.value = 0;
      e.media.volume = 0;
      e.media.muted = !0
    };
    g = function() {
      a(e.icon, "mute");
      d(e.icon, "sound");
      e.picker.value = c;
      e.media.volume = e.picker.value / 100;
      e.media.muted = !1
    };
    e.icon.onclick = function() {
      e.media.muted ? g() : l()
    };
    e.div.onmouseover = function() {
      k("block")
    };
    e.div.onmouseout = function() {
      k("none")
    };
    k("none")
  }
  document.getElementById(e.elementID).appendChild(e.div);
  return e
};
L = L || {};
L.Constant = function() {
  return {
    roomError: {
      ROOMCONNECTERROR: 0,
      GETCONFIGERROR: 1,
      GETFILELISTERROR: 2
    },
    getUserMedia: {
      SUCCESS_ONLY_VIDEO: 1,
      SUCCESS_ONLY_AUDIO: 2,
      SUCCESS_ALL: 3,
      SUCCESS_NOT_ALL: 4,
      FAILURE_ONLY_VIDEO: -1,
      FAILURE_ONLY_AUDIO: -2,
      FAILURE_ALL: -3,
      FAILURE_USERMEDIA_AGAIN_ONLY_GET_AUDIO: 0,
      FAILURE_USERMEDIA_AGAIN_ONLY_GET_VIDEO: 0
    },
    accessDenied: {
      streamFail: 0,
      notAudioAndVideo: 1,
      notAudioAndVideoAndScreenOrUrlNotUndefined: 2,
      ohterError: -1
    },
    deviceStorage: {
      audioinput: "audioinputDeviceId",
      audiooutput: "audiooutputDeviceId",
      videoinput: "videoinputDeviceId"
    },
    streamReconnection: {
      notOnceSuccess: 1,
      midwayReconnectionNotSuccess: 2
    },
    getStats: {
      nativeFailure: 1,
      pcNotGetStats: 2,
      peerConnectionNotGetStats: 3,
      getStatsFailure: 4,
      getStatsError: 5
    },
    udpState: {
      ok: 1,
      notOnceSuccess: 2
    },
    localRecord: {
      onlyRecordAudio: 0,
      recordAudioAndVideo: 1
    }
  }
}(L);
L = L || {};
L.hex64Instance = void 0;
(function() {
  var b = {
    cipher: function(a, d) {
      for (var c = d.length / 4 - 1, e = [
        [],
        [],
        [],
        []
      ], f = 0; 16 > f; f++) e[f % 4][Math.floor(f / 4)] = a[f];
      e = b.addRoundKey(e, d, 0, 4);
      for (f = 1; f < c; f++) e = b.subBytes(e, 4), e = b.shiftRows(e, 4), e = b.mixColumns(e, 4), e = b.addRoundKey(e, d, f, 4);
      e = b.subBytes(e, 4);
      e = b.shiftRows(e, 4);
      e = b.addRoundKey(e, d, c, 4);
      d = Array(16);
      for (f = 0; 16 > f; f++) d[f] = e[f % 4][Math.floor(f / 4)];
      return d
    },
    keyExpansion: function(a) {
      for (var d = a.length / 4, c = d + 6, f = Array(4 * (c + 1)), g = Array(4), k = 0; k < d; k++) f[k] = [a[4 * k], a[4 * k + 1], a[4 * k + 2], a[4 *
      k + 3]];
      for (k = d; k < 4 * (c + 1); k++) {
        f[k] = Array(4);
        for (a = 0; 4 > a; a++) g[a] = f[k - 1][a];
        if (0 == k % d)
          for (g = b.subWord(b.rotWord(g)), a = 0; 4 > a; a++) g[a] ^= b.rCon[k / d][a];
        else 6 < d && 4 == k % d && (g = b.subWord(g));
        for (a = 0; 4 > a; a++) f[k][a] = f[k - d][a] ^ g[a]
      }
      return f
    },
    subBytes: function(a, d) {
      for (var c = 0; 4 > c; c++)
        for (var e = 0; e < d; e++) a[c][e] = b.sBox[a[c][e]];
      return a
    },
    shiftRows: function(a, b) {
      for (var c = Array(4), d = 1; 4 > d; d++) {
        for (var e = 0; 4 > e; e++) c[e] = a[d][(e + d) % b];
        for (e = 0; 4 > e; e++) a[d][e] = c[e]
      }
      return a
    },
    mixColumns: function(a, b) {
      for (b = 0; 4 > b; b++) {
        for (var c =
          Array(4), d = Array(4), e = 0; 4 > e; e++) c[e] = a[e][b], d[e] = a[e][b] & 128 ? a[e][b] << 1 ^ 283 : a[e][b] << 1;
        a[0][b] = d[0] ^ c[1] ^ d[1] ^ c[2] ^ c[3];
        a[1][b] = c[0] ^ d[1] ^ c[2] ^ d[2] ^ c[3];
        a[2][b] = c[0] ^ c[1] ^ d[2] ^ c[3] ^ d[3];
        a[3][b] = c[0] ^ d[0] ^ c[1] ^ c[2] ^ d[3]
      }
      return a
    },
    addRoundKey: function(a, b, c, d) {
      for (var e = 0; 4 > e; e++)
        for (var f = 0; f < d; f++) a[e][f] ^= b[4 * c + f][e];
      return a
    },
    subWord: function(a) {
      for (var d = 0; 4 > d; d++) a[d] = b.sBox[a[d]];
      return a
    },
    rotWord: function(a) {
      for (var b = a[0], c = 0; 3 > c; c++) a[c] = a[c + 1];
      a[3] = b;
      return a
    },
    sBox: [99, 124, 119, 123, 242, 107,
      111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220,
      34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
    ],
    rCon: [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [8, 0, 0, 0],
      [16, 0, 0, 0],
      [32, 0, 0, 0],
      [64, 0, 0, 0],
      [128, 0, 0, 0],
      [27, 0, 0, 0],
      [54,
        0, 0, 0
      ]
    ],
    Ctr: {}
  };
  b.Ctr.encrypt = function(f, e, c) {
    e = e || "talk_2018_@beijing_20180310_talk_2018_@beijing";
    c = c || 256;
    if (128 != c && 192 != c && 256 != c) return "";
    f = d.encode(f);
    e = d.encode(e);
    var l = c / 8,
      g = Array(l);
    for (c = 0; c < l; c++) g[c] = isNaN(e.charCodeAt(c)) ? 0 : e.charCodeAt(c);
    g = b.cipher(g, b.keyExpansion(g));
    g = g.concat(g.slice(0, l - 16));
    e = Array(16);
    c = (new Date).getTime();
    l = c % 1E3;
    var k = Math.floor(c / 1E3),
      m = Math.floor(65535 * Math.random());
    for (c = 0; 2 > c; c++) e[c] = l >>> 8 * c & 255;
    for (c = 0; 2 > c; c++) e[c + 2] = m >>> 8 * c & 255;
    for (c = 0; 4 > c; c++) e[c +
    4] = k >>> 8 * c & 255;
    l = "";
    for (c = 0; 8 > c; c++) l += String.fromCharCode(e[c]);
    g = b.keyExpansion(g);
    k = Math.ceil(f.length / 16);
    m = Array(k);
    for (var n = 0; n < k; n++) {
      for (c = 0; 4 > c; c++) e[15 - c] = n >>> 8 * c & 255;
      for (c = 0; 4 > c; c++) e[15 - c - 4] = n / 4294967296 >>> 8 * c;
      var q = b.cipher(e, g),
        t = n < k - 1 ? 16 : (f.length - 1) % 16 + 1,
        u = Array(t);
      for (c = 0; c < t; c++) u[c] = q[c] ^ f.charCodeAt(16 * n + c), u[c] = String.fromCharCode(u[c]);
      m[n] = u.join("")
    }
    f = l + m.join("");
    return f = a.encode(f)
  };
  b.Ctr.decrypt = function(f, e, c) {
    e = e || "talk_2018_@beijing_20180310_talk_2018_@beijing";
    c = c ||
      256;
    if (128 != c && 192 != c && 256 != c) return "";
    f = a.decode(f);
    e = d.encode(e);
    var l = c / 8,
      g = Array(l);
    for (c = 0; c < l; c++) g[c] = isNaN(e.charCodeAt(c)) ? 0 : e.charCodeAt(c);
    g = b.cipher(g, b.keyExpansion(g));
    g = g.concat(g.slice(0, l - 16));
    e = Array(8);
    l = f.slice(0, 8);
    for (c = 0; 8 > c; c++) e[c] = l.charCodeAt(c);
    l = b.keyExpansion(g);
    g = Math.ceil((f.length - 8) / 16);
    c = Array(g);
    for (var k = 0; k < g; k++) c[k] = f.slice(8 + 16 * k, 16 * k + 24);
    f = c;
    var m = Array(f.length);
    for (k = 0; k < g; k++) {
      for (c = 0; 4 > c; c++) e[15 - c] = k >>> 8 * c & 255;
      for (c = 0; 4 > c; c++) e[15 - c - 4] = (k + 1) / 4294967296 -
        1 >>> 8 * c & 255;
      var n = b.cipher(e, l),
        q = Array(f[k].length);
      for (c = 0; c < f[k].length; c++) q[c] = n[c] ^ f[k].charCodeAt(c), q[c] = String.fromCharCode(q[c]);
      m[k] = q.join("")
    }
    f = m.join("");
    return f = d.decode(f)
  };
  var a = {
      code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d",
      encode: function(b, d) {
        var c = [],
          e = "",
          f = a.code;
        d = ("undefined" == typeof d ? 0 : d) ? b.encodeUTF8() : b;
        b = d.length % 3;
        if (0 < b)
          for (; 3 > b++;) e += "\x3d", d += "\x00";
        for (b = 0; b < d.length; b += 3) {
          var k = d.charCodeAt(b);
          var m = d.charCodeAt(b + 1);
          var n = d.charCodeAt(b +
            2);
          var q = k << 16 | m << 8 | n;
          k = q >> 18 & 63;
          m = q >> 12 & 63;
          n = q >> 6 & 63;
          q &= 63;
          c[b / 3] = f.charAt(k) + f.charAt(m) + f.charAt(n) + f.charAt(q)
        }
        c = c.join("");
        return c = c.slice(0, c.length - e.length) + e
      },
      decode: function(b, d) {
        d = "undefined" == typeof d ? !1 : d;
        var c = [],
          e = a.code;
        var f = d ? b.decodeUTF8() : b;
        for (var k = 0; k < f.length; k += 4) {
          var m = e.indexOf(f.charAt(k));
          var n = e.indexOf(f.charAt(k + 1));
          b = e.indexOf(f.charAt(k + 2));
          var q = e.indexOf(f.charAt(k + 3));
          var t = m << 18 | n << 12 | b << 6 | q;
          m = t >>> 16 & 255;
          n = t >>> 8 & 255;
          t &= 255;
          c[k / 4] = String.fromCharCode(m, n, t);
          64 ==
          q && (c[k / 4] = String.fromCharCode(m, n));
          64 == b && (c[k / 4] = String.fromCharCode(m))
        }
        c = c.join("");
        return d ? c.decodeUTF8() : c
      }
    },
    d = {
      encode: function(a) {
        a = a.replace(/[\u0080-\u07ff]/g, function(a) {
          a = a.charCodeAt(0);
          return String.fromCharCode(192 | a >> 6, 128 | a & 63)
        });
        return a = a.replace(/[\u0800-\uffff]/g, function(a) {
          a = a.charCodeAt(0);
          return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63)
        })
      },
      decode: function(a) {
        a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(a) {
          a = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) &
            63) << 6 | a.charCodeAt(2) & 63;
          return String.fromCharCode(a)
        });
        return a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(a) {
          a = (a.charCodeAt(0) & 31) << 6 | a.charCodeAt(1) & 63;
          return String.fromCharCode(a)
        })
      }
    };
  L.hex64Instance = b.Ctr
})();
L.Utils = function() {
  var b = void 0,
    a = !1,
    d = !1;
  b = {
    handleMediaPlayOnEvent: function(a, d) {
      try {
        if (L.Utils.removeEvent(a, "canplay", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadedmetadata", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadeddata", b.handleMediaPlayOnEvent.bind(null, a, d)), a && a.play && "function" === typeof a.play) {
          var c = a.play();
          c && c.catch && "function" === typeof c.catch && c.catch(function(b) {
            L.Logger.error("[tk-sdk]media play err:", L.Utils.toJsonStringify(b),
              d ? " , media element id is " + d : " media element:", d ? "" : a)
          })
        }
      } catch (l) {
        L.Logger.error("[tk-sdk]media play error:", L.Utils.toJsonStringify(l), d ? " , media element id is " + d : " media element:", d ? "" : a)
      }
    },
    handleMediaPauseOnEvent: function(a, d) {
      try {
        if (L.Utils.removeEvent(a, "canplay", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadedmetadata", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadeddata", b.handleMediaPauseOnEvent.bind(null, a, d)), a && a.pause && "function" === typeof a.pause) {
          var c =
            a.pause();
          c && c.catch && "function" === typeof c.catch && c.catch(function(b) {
            L.Logger.error("[tk-sdk]media pause err:", L.Utils.toJsonStringify(b), d ? " , media element id is " + d : " media element:", d ? "" : a)
          })
        }
      } catch (l) {
        L.Logger.error("[tk-sdk]media pause error:", L.Utils.toJsonStringify(l), d ? " , media element id is " + d : " media element:", d ? "" : a)
      }
    }
  };
  return {
    addEvent: function(a, b, c, d) {
      a.addEventListener ? a.addEventListener(b, c, void 0 != d && null != d ? d : !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    },
    removeEvent: function(a,
                          b, c, d) {
      a.removeEventListener ? a.removeEventListener(b, c, void 0 != d && null != d ? d : !1) : a.detachEvent ? a.detachEvent("on" + b, c) : a["on" + b] = null
    },
    toJsonStringify: function(a, b) {
      if (void 0 != b && !b || !a) return a;
      try {
        if ("object" !== typeof a) return a;
        var c = JSON.stringify(a);
        c ? a = c : L.Logger.debug("[tk-sdk]toJsonStringify:data is not json!")
      } catch (l) {
        L.Logger.debug("[tk-sdk]toJsonStringify:data is not json!")
      }
      return a
    },
    toJsonParse: function(a, b) {
      if (void 0 != b && !b || !a) return a;
      try {
        if ("string" !== typeof a) return a;
        var c = JSON.parse(a);
        c ? a = c : L.Logger.debug("[tk-sdk]toJsonParse:data is not json string!")
      } catch (l) {
        L.Logger.debug("[tk-sdk]toJsonParse:data is not json string!")
      }
      return a
    },
    encrypt: function(a, b, c, d) {
      if (!a) return a;
      c = c || TK.hexEncryptDecryptKey;
      d = d || TK.hexEncryptDecryptBit;
      b = void 0 != b ? b : "talk_2018_@beijing";
      a = L.hex64Instance.encrypt(a, c, d);
      return b + a + b
    },
    decrypt: function(a, b, c, d) {
      if (!a) return a;
      c = c || TK.hexEncryptDecryptKey;
      d = d || TK.hexEncryptDecryptBit;
      a = a.replace(new RegExp(void 0 != b ? b : "talk_2018_@beijing", "gm"), "");
      return L.hex64Instance.decrypt(a,
        c, d)
    },
    mediaPlay: function(a) {
      var d = void 0;
      a && "string" === typeof a ? a = document.getElementById(a) : a && /(audio|video)/g.test(a.nodeName.toLowerCase()) && a.getAttribute && "function" === typeof a.getAttribute && (d = a.getAttribute("id"));
      a && /(audio|video)/g.test(a.nodeName.toLowerCase()) && (0 !== a.readyState ? b.handleMediaPlayOnEvent(a, d) : (L.Utils.removeEvent(a, "canplay", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadedmetadata", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadeddata",
        b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "canplay", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "loadedmetadata", b.handleMediaPlayOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "loadeddata", b.handleMediaPlayOnEvent.bind(null, a, d))))
    },
    mediaPause: function(a) {
      var d = void 0;
      a && "string" === typeof a ? a = document.getElementById(a) : a && /(audio|video)/g.test(a.nodeName.toLowerCase()) && a.getAttribute && "function" === typeof a.getAttribute && (d = a.getAttribute("id"));
      a && /(audio|video)/g.test(a.nodeName.toLowerCase()) &&
      (0 !== a.readyState ? b.handleMediaPauseOnEvent(a, d) : (L.Utils.removeEvent(a, "canplay", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadedmetadata", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.removeEvent(a, "loadeddata", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "canplay", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "loadedmetadata", b.handleMediaPauseOnEvent.bind(null, a, d)), L.Utils.addEvent(a, "loadeddata", b.handleMediaPauseOnEvent.bind(null, a,
        d))))
    },
    localStorage: {
      setItem: function(b, d) {
        try {
          window.localStorage ? window.localStorage.setItem ? window.localStorage.setItem(b, d) : L.Logger.warning("[tk-sdk]Browser does not support localStorage.setItem , key is " + b + " , value is " + d + "!") : a || (a = !0, L.Logger.warning("[tk-sdk]Browser does not support localStorage!"))
        } catch (c) {
          a || (a = !0, L.Logger.warning("[tk-sdk]Browser does not support localStorage , error info:", L.Utils.toJsonStringify(c)))
        }
      },
      getItem: function(b) {
        try {
          if (window.localStorage) {
            if (window.localStorage.getItem) return window.localStorage.getItem(b);
            L.Logger.warning("[tk-sdk]Browser does not support localStorage.getItem , key is " + b + " !");
            return ""
          }
          a || (a = !0, L.Logger.warning("[tk-sdk]Browser does not support localStorage!"));
          return ""
        } catch (e) {
          return a || (a = !0, L.Logger.warning("[tk-sdk]Browser does not support localStorage , error info:", L.Utils.toJsonStringify(e))), ""
        }
      }
    },
    sessionStorage: {
      setItem: function(a, b) {
        try {
          window.sessionStorage ? window.sessionStorage.setItem ? window.sessionStorage.setItem(a, b) : L.Logger.warning("[tk-sdk]Browser does not support sessionStorage.setItem , key is " +
            a + " , value is " + b + "!") : d || (d = !0, L.Logger.warning("[tk-sdk]Browser does not support sessionStorage!"))
        } catch (c) {
          d || (d = !0, L.Logger.warning("[tk-sdk]Browser does not support sessionStorage , error info:", L.Utils.toJsonStringify(c)))
        }
      },
      getItem: function(a) {
        try {
          if (window.sessionStorage) {
            if (window.sessionStorage.getItem) return window.sessionStorage.getItem(a);
            L.Logger.warning("[tk-sdk]Browser does not support sessionStorage.getItem , key is " + a + " !");
            return ""
          }
          d || (d = !0, L.Logger.warning("[tk-sdk]Browser does not support sessionStorage!"));
          return ""
        } catch (e) {
          return d || (d = !0, L.Logger.warning("[tk-sdk]Browser does not support sessionStorage , error info:", L.Utils.toJsonStringify(e))), ""
        }
      }
    }
  }
}(L);
TK = TK || {};
TK.mediaStream = void 0;
TK.AVMgr = function() {
  var b = {
      room_video_width: 320,
      room_video_height: 240,
      room_video_fps: 10,
      streamJson: {
        selectStream: void 0
      },
      setAVMgrProperty: function(a) {
        for (var c in a) b.hasOwnProperty(c) && (b[c] = a[c])
      }
    },
    a = function(a, b, d) {
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia(a).then(b).catch(d) : (navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia, navigator.getMedia(a, b, d))
    },
    d = function(c,
                 d, e) {
      L.Logger.debug("[tk-sdk]checkGetUserMediaing , videoinputDeviceId:" + d + " , audioinputDeviceId:" + e);
      c && "function" === typeof c || L.Logger.error("[tk-sdk]checkGetUserMedia callback must function");
      var g = !1,
        f = !1,
        l, q, t = function() {
          g && f && c({
            videoinput: {
              old: d,
              now: l
            },
            audioinput: {
              old: e,
              now: q
            }
          })
        },
        u = function(a) {
          L.Logger.debug("[tk-sdk]checkGetUserMedia video finshed , videoinputDeviceId:" + d + " , successVideoinputId:" + a);
          g = !0;
          l = a;
          t()
        },
        x = function(a) {
          L.Logger.debug("[tk-sdk]checkGetUserMedia audio finshed , audioinputDeviceId:" +
            e + " , successAudioinputId:" + a);
          f = !0;
          q = a;
          t()
        };
      a({
        audio: !1,
        video: {
          deviceId: {
            exact: d
          }
        }
      }, function(a) {
        u(d)
      }, function(c) {
        b.enumerateDevices(function(b) {
          if (b && b.devices && b.devices.videoinput) {
            var c = b.devices.videoinput;
            if (c && 0 < c.length) {
              var d = c[0],
                e = function(b) {
                  a({
                    audio: !1,
                    video: {
                      deviceId: {
                        exact: b
                      }
                    }
                  }, function(a) {
                    c.shift();
                    u(b)
                  }, function(a) {
                    c.shift();
                    (d = c[0]) ? e(d.deviceId): u()
                  })
                };
              d ? e(d.deviceId) : u()
            } else u()
          } else u()
        })
      });
      a({
        video: !1,
        audio: {
          deviceId: {
            exact: e
          }
        }
      }, function(a) {
        x(e)
      }, function(c) {
        b.enumerateDevices(function(b) {
          if (b &&
            b.devices && b.devices.audioinput) {
            var c = b.devices.audioinput;
            if (c && 0 < c.length) {
              var d = c[0],
                e = function(b) {
                  a({
                    video: !1,
                    audio: {
                      deviceId: {
                        exact: b
                      }
                    }
                  }, function(a) {
                    c.shift();
                    x(b)
                  }, function(a) {
                    c.shift();
                    (d = c[0]) ? e(d.deviceId): x()
                  })
                };
              d ? e(d.deviceId) : x()
            } else x()
          } else x()
        })
      })
    },
    f = function(c, d, e, f) {
      var g = void 0,
        k;
      var l = function(a) {
        var d = g && "string" === typeof g ? L.Utils.toJsonParse(g) : g;
        a.customdata_createID = (new Date).getTime();
        a.customdata_deviceJsonId = {};
        d && (d.video && "object" === typeof d.video && (a.customdata_deviceJsonId.videoinput =
          "object" === typeof d.video.deviceId ? d.video.deviceId.exact : d.video.deviceId), d.audio && "object" === typeof d.audio && (a.customdata_deviceJsonId.audioinput = "object" === typeof d.audio.deviceId ? d.audio.deviceId.exact : d.audio.deviceId));
        b.streamJson.selectStream = a;
        d = {
          videoTracks: !0,
          audioTracks: !0
        };
        if (a) {
          var e = a.getVideoTracks ? a.getVideoTracks() : void 0,
            k = a.getAudioTracks ? a.getAudioTracks() : void 0;
          e && 0 < e.length || (d.videoTracks = !1, L.Logger.warning("[tk-sdk]getUserMedia stream is  not videoTracks  , currUserMediaConfig info:" +
            g + "!"));
          k && 0 < k.length || (d.audioTracks = !1, L.Logger.warning("[tk-sdk]getUserMedia stream is  not audioTracks  , currUserMediaConfig info:" + g + "!"))
        } else L.Logger.error("[tk-sdk]getUserMedia stream is not exist!"), d.videoTracks = !1, d.audioTracks = !1;
        e = [];
        e.push(a);
        e.push(d);
        a.customdata_tracksInfo = d;
        f && f.externalJson && void 0 !== f.externalJson.getUserMediaFailureCode && (a.getUserMediaFailureCode = f.externalJson.getUserMediaFailureCode);
        f.isNeedCheckChangeLocalStream && f.deviceInfo.initDeviceId.audioinput !==
        a.customdata_deviceJsonId.audioinput && (L.Logger.info("[tk-sdk]getUserMedia changed audioinput device , old device id is " + f.deviceInfo.initDeviceId.audioinput + " , now device id is " + a.customdata_deviceJsonId.audioinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.audioinput, a.customdata_deviceJsonId.audioinput || ""));
        f.isNeedCheckChangeLocalStream && f.deviceInfo.initDeviceId.videoinput !== a.customdata_deviceJsonId.videoinput && (L.Logger.info("[tk-sdk]getUserMedia changed videoinput device , old device id is " +
          f.deviceInfo.initDeviceId.videoinput + " , now device id is " + a.customdata_deviceJsonId.videoinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.videoinput, a.customdata_deviceJsonId.videoinput || ""));
        f && f.dispatchEvent && (k = L.Constant.getUserMedia.SUCCESS_ALL, d.videoTracks || d.audioTracks ? d.videoTracks ? d.audioTracks || (k = L.Constant.getUserMedia.SUCCESS_ONLY_VIDEO) : k = L.Constant.getUserMedia.SUCCESS_ONLY_AUDIO : k = L.Constant.getUserMedia.SUCCESS_NOT_ALL, TK && TK.coreEventController && TK.coreEventController.dispatchEvent({
          type: "getUserMedia_success",
          message: {
            mediaStream: a,
            customdata_tracksInfo: d,
            code: k,
            externalJson: f.externalJson
          }
        }, !1));
        c.apply(c, e)
      };
      var t = function(a) {
        L.Logger.error("[tk-sdk]getUserMedia error info: name is " + a.name + " , message is " + a.message + " , constraintName is " + a.constraintName);
        var b = g && "string" === typeof g ? L.Utils.toJsonParse(g) : g,
          c = k && "string" === typeof k ? L.Utils.toJsonParse(k) : k;
        if (f.isDemotionLocalStream) {
          if (b.video && "object" === typeof b.video && !f.deviceInfo.demotion.videoinput) {
            f.deviceInfo.demotion.videoinput = !0;
            c.video = !1;
            f.externalJson.getUserMediaFailureCode = L.Constant.getUserMedia.FAILURE_USERMEDIA_AGAIN_ONLY_GET_AUDIO;
            L.Logger.warning("[tk-sdk]Gets the data stream failed and now only gets the audio device stream , oldUserMediaConfig info:" + g + " , nowUserMediaConfig info:" + L.Utils.toJsonStringify(c) + "!");
            f && f.dispatchEvent && TK && TK.coreEventController && TK.coreEventController.dispatchEvent({
              type: "getUserMedia_failure_reGetOnlyAudioStream",
              message: {
                errorMsg: e,
                code: L.Constant.getUserMedia.FAILURE_USERMEDIA_AGAIN_ONLY_GET_AUDIO,
                externalJson: f.externalJson
              }
            }, !1);
            u(c);
            return
          }
          if (b.video && "object" === typeof b.video && !f.deviceInfo.demotion.audioinput) {
            f.deviceInfo.demotion.audioinput = !0;
            c.audio = !1;
            f.externalJson.getUserMediaFailureCode = L.Constant.getUserMedia.FAILURE_USERMEDIA_AGAIN_ONLY_GET_VIDEO;
            L.Logger.warning("[tk-sdk]Gets the data stream failed and now only gets the video device stream , oldUserMediaConfig info:" + g + " , nowUserMediaConfig info:" + L.Utils.toJsonStringify(c) + "!");
            f && f.dispatchEvent && TK && TK.coreEventController &&
            TK.coreEventController.dispatchEvent({
              type: "getUserMedia_failure_reGetOnlyVideoStream",
              message: {
                errorMsg: e,
                code: L.Constant.getUserMedia.FAILURE_USERMEDIA_AGAIN_ONLY_GET_VIDEO,
                externalJson: f.externalJson
              }
            }, !1);
            u(c);
            return
          }
        }
        var e = "[tk-sdk]Gets the data stream failed[video , audio] ,currUserMediaConfig info:" + g + "!";
        L.Logger.warning(e);
        f.externalJson.getUserMediaFailureCode = L.Constant.getUserMedia.FAILURE_ALL;
        f && f.dispatchEvent && TK && TK.coreEventController && TK.coreEventController.dispatchEvent({
          type: "getUserMedia_failure",
          message: {
            errorMsg: e,
            code: L.Constant.getUserMedia.FAILURE_ALL,
            externalJson: f.externalJson
          }
        }, !1);
        if (d && "function" === typeof d) {
          b = [];
          for (c = 0; c < arguments.length; c++) b[c] = arguments[c];
          f && f.externalJson && void 0 !== f.externalJson.getUserMediaFailureCode && b.push({
            getUserMediaFailureCode: f.externalJson.getUserMediaFailureCode
          });
          d.apply(d, b)
        }
      };
      var u = function(b) {
        g = b && "object" === typeof b ? L.Utils.toJsonStringify(b) : b;
        k || (k = g);
        a(b, l, t)
      };
      u(e)
    },
    e = function(a, d) {
      var c = {
        video: {},
        audio: {}
      };
      a ? (void 0 !== a.audio && (c.audio =
        a.audio), void 0 !== a.video && (c.video = a.video), c.audio && "object" === typeof c.audio && void 0 !== c.audio.sourceId && (c.audio.deviceId = c.audio.sourceId, delete c.audio.sourceId), c.video && "object" === typeof c.video && void 0 !== c.video.sourceId && (c.video.deviceId = c.video.sourceId, delete c.video.sourceId)) : (c.audio.deviceId = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput), c.video.deviceId = L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput));
      if (c.video && "object" === typeof c.video) {
        a =
          b.room_video_width || 320;
        var e = b.room_video_width || 320,
          f = b.room_video_height || 240,
          l = b.room_video_height || 240,
          q = Number(b.room_video_fps || 10),
          t = Number(b.room_video_fps || 10);
        void 0 === c.video.width && (c.video.width = {
          ideal: a,
          max: e
        });
        void 0 === c.video.height && (c.video.height = {
          ideal: f,
          max: l
        });
        void 0 === c.video.frameRate && (c.video.frameRate = {
          ideal: q,
          max: t
        })
      }
      d.audio.sourceId ? (c.audio = "object" === typeof c.audio ? c.audio : {}, c.audio.deviceId = d.audio.sourceId) : d.audio.deviceId && (c.audio = "object" === typeof c.audio ? c.audio : {}, c.audio.deviceId = d.audio.deviceId);
      d.video.sourceId ? (c.video = "object" === typeof c.video ? c.video : {}, c.video.deviceId = d.video.sourceId) : d.video.deviceId && (c.video = "object" === typeof c.video ? c.video : {}, c.video.deviceId = d.video.deviceId);
      d.exclude && d.exclude.audio ? c.audio = !1 : c.audio && "object" === typeof c.audio && void 0 !== c.audio.deviceId && (c.audio.deviceId = "object" !== c.audio.deviceId ? {
          exact: c.audio.deviceId
        } : c.audio.deviceId);
      d.exclude && d.exclude.video ? c.video = !1 : c.video && "object" === typeof c.video && void 0 !==
        c.video.deviceId && (c.video.deviceId = "object" !== c.video.deviceId ? {
          exact: c.video.deviceId
        } : c.video.deviceId);
      return c
    };
  b.getUserMedia = function(a, b, g, k) {
    k = void 0 != k && null != k && "object" === typeof k ? k : {
      video: {},
      audio: {},
      exclude: {}
    };
    k.video = k.video || {};
    k.audio = k.audio || {};
    k.exclude = k.exclude || {};
    k.externalJson = k.externalJson || {};
    k.deviceInfo = {
      initDeviceId: {
        videoinput: void 0,
        audioinput: void 0
      },
      demotion: {
        videoinput: !1,
        audioinput: !1
      }
    };
    g = e(g, k);
    g.audio && "object" === typeof g.audio && (k.deviceInfo.initDeviceId.audioinput =
      "object" === typeof g.audio.deviceId ? g.audio.deviceId.exact : g.audio.deviceId);
    g.video && "object" === typeof g.video && (k.deviceInfo.initDeviceId.videoinput = "object" === typeof g.video.deviceId ? g.video.deviceId.exact : g.video.deviceId);
    k.isNeedCheckChangeLocalStream ? d(function(c) {
      var d = c.videoinput;
      c = c.audioinput;
      g.video && "object" === typeof g.video && d.old !== d.now ? d.now ? g.video.deviceId = {
        exact: d.now
      } : g.video = !1 : d.old || (g.video = !1);
      g.audio && "object" === typeof g.audio && c.old !== c.now ? c.now ? g.audio.deviceId = {
        exact: c.now
      } :
        g.audio = !1 : c.old || (g.audio = !1);
      f(a, b, g, k)
    }, k.deviceInfo.initDeviceId.videoinput, k.deviceInfo.initDeviceId.audioinput) : f(a, b, g, k)
  };
  b.enumerateDevices = function(a, b) {
    function c(c) {
      var d = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput),
        e = L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput),
        f = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput),
        g = {},
        k = {},
        l = {
          hasdevice: {
            audioinput: !1,
            audiooutput: !1,
            videoinput: !1
          },
          devices: {
            audioinput: [],
            audiooutput: [],
            videoinput: []
          },
          useDevices: {}
        };
      c && c.forEach && c.forEach(function(a) {
        null != a && "communications" != a.groupId && "communications" != a.deiceId && "\u901a\u8baf" != a.label && ("audioinput" === a.kind && a.deviceId === d && (l.useDevices[a.kind] = a.deviceId), "videoinput" === a.kind && a.deviceId === e && (l.useDevices[a.kind] = a.deviceId), "audiooutput" === a.kind && a.deviceId === f && (l.useDevices[a.kind] = a.deviceId), g[a.kind] = g[a.kind] || a.deviceId, l.devices[a.kind].push(a), l.hasdevice[a.kind] = !0, "default" === a.deviceId && (k[a.kind] = a.deviceId))
      });
      l.useDevices.audioinput ||
      (l.useDevices.audioinput = k.audioinput || g.audioinput || "");
      l.useDevices.videoinput || (l.useDevices.videoinput = k.videoinput || g.videoinput || "");
      l.useDevices.audiooutput || (l.useDevices.audiooutput = k.audiooutput || g.audiooutput || "");
      L.Utils.localStorage ? b.isSetlocalStorage && (L.Utils.localStorage.setItem(L.Constant.deviceStorage.audioinput, l.useDevices.audioinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.videoinput, l.useDevices.videoinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.audiooutput,
          l.useDevices.audiooutput)) : L.Logger.error("[tk-sdk]not support localStorage");
      L.Logger.info("[tk-sdk]enumerateDevices devicesInfo:", L.Utils.toJsonStringify(l));
      a && "function" === typeof a && a(l)
    }
    b = b || {};
    L.Logger.debug("[tk-sdk]call enumerateDevices!");
    b.isSetlocalStorage = void 0 != b.isSetlocalStorage ? b.isSetlocalStorage : !1;
    (function(a) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return L.Logger.error("[tk-sdk]navigator.mediaDevices.enumerateDevices method not supported."), a && "function" ===
      typeof a && a([]), null;
      navigator.mediaDevices.enumerateDevices().then(function(b) {
        var c = {};
        b.forEach(function(a) {
          L.Logger.debug("[tk-sdk]" + a.kind + ": " + a.label + " id \x3d " + a.deviceId, a);
          c[a.kind] = c[a.kind] || {};
          c[a.kind][a.deviceId] = {
            kind: a.kind,
            label: a.label,
            deviceId: a.deviceId
          }
        });
        L.Logger.debug("[tk-sdk]enumerateDevices devices:" + L.Utils.toJsonStringify(c));
        a && "function" === typeof a && a(b)
      }).catch(function(b) {
        L.Logger.error("[tk-sdk]enumerateDevices error :" + b.name + ": " + b.message);
        a && "function" === typeof a &&
        a([]);
        throw b;
      })
    })(function(a) {
      c(a)
    })
  };
  b.getsSoundMeterInstance = function(a) {
    if (a) return new function(a) {
      var b = this;
      b.audioContext = a;
      b.instant = 0;
      b.slow = 0;
      b.clip = 0;
      b.script = b.audioContext.createScriptProcessor(2048, 1, 1);
      b.script.onaudioprocess = function(a) {
        a = a.inputBuffer.getChannelData(0);
        var c, d = 0,
          e = 0;
        for (c = 0; c < a.length; ++c) d += a[c] * a[c], .99 < Math.abs(a[c]) && (e += 1);
        b.instant = Math.sqrt(d / a.length);
        b.slow = .95 * b.slow + .05 * b.instant;
        b.clip = e / a.length
      };
      b.connectToSource = function(a, c) {
        L.Logger.debug("SoundMeter connecting");
        try {
          b.mic = b.audioContext.createMediaStreamSource(a), b.mic.connect(b.script), b.script.connect(b.audioContext.destination), "undefined" !== typeof c && c(null)
        } catch (n) {
          L.Logger.error("[tk-sdk]connecToSource error:", n), "undefined" !== typeof c && c(n)
        }
      };
      b.stop = function() {
        b.mic && b.mic.disconnect && b.mic.disconnect();
        b.script && b.script.disconnect && b.script.disconnect()
      };
      return b
    }(a);
    L.Logger.error("[tk-sdk]getsSoundMeterInstance audioContext is not exist!")
  };
  b.setElementSinkIdToAudioouputDevice = function(a, b, d) {
    if (b =
        b || L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput))
      if (TK.isTkNative && TK.subscribe_from_native) b = b || L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput), tknative.postMessage({
        command: "setSpeaker",
        deviceId: b
      }), d && "function" === typeof d && d(!1);
      else {
        var c = 0,
          e = function(a, e, f) {
            if (a && /(audio|video)/g.test(a.nodeName.toLowerCase()) && b)
              if (a.setSinkId) try {
                a.setSinkId(b).then(function() {
                  var e = a.getAttribute("id");
                  L.Logger.debug("[tk-sdk]Audio output device set to " + b, e ? " , element id is " +
                    e : "  element:", e ? "" : a);
                  c++;
                  c === f && d && "function" === typeof d && d(!0)
                }).catch(function(b) {
                  var e = void 0,
                    g = a.getAttribute("id");
                  b && "SecurityError" === b.name && (e = "You need to use HTTPS for selecting audio output device  ");
                  L.Logger.warning("[tk-sdk]setSinkId error:", b, e ? e : "", g ? " , element id is " + g : "  element:", g ? "" : a);
                  c++;
                  c === f && d && "function" === typeof d && d(!1)
                })
              } catch (z) {
                e = a.getAttribute("id"), L.Logger.error("[tk-sdk]setSinkId err:", z, e ? " , element id is " + e : "  element:", e ? "" : a), c++, c === f && d && "function" ===
                typeof d && d(!1)
              } else e = a.getAttribute("id"), L.Logger.error("[tk-sdk]The browser does not support the setSinkId method,audiooutputDeviceId :", b, e ? " , element id is " + e : "  element:", e ? "" : a), c++, c === f && d && "function" === typeof d && d(!1);
            else c++, c === f && d && "function" === typeof d && d(!1)
          };
        if (!a) {
          a = [];
          var f = document.getElementsByTagName("audio"),
            g = document.getElementsByTagName("video");
          if (f && 0 < f.length)
            for (var l = 0; l < f.length; l++) {
              var u = f[l];
              a.push(u)
            }
          if (g && 0 < g.length)
            for (l = 0; l < g.length; l++) u = g[l], a.push(u)
        }
        if (a &&
          0 < a.length)
          for (f = a.length, l = 0; l < a.length; l++) u = a[l], e(u, l, f);
        else e(a, 0, 1)
      }
    else d && "function" === typeof d && d(!1)
  };
  b.changeLocalDeviceToLocalstream = function(a, d, e, f) {
    var c = {},
      g;
    for (g in d) L.Constant.deviceStorage[g] && d[g] !== L.Utils.localStorage.getItem(L.Constant.deviceStorage[g]) && (L.Utils.localStorage.setItem(L.Constant.deviceStorage[g], d[g]), c[g] = !0);
    !c.videoinput && !c.audioinput && TK && TK.default_stream && TK.default_stream.stream && (d.videoinput && TK.default_stream.stream.getVideoTracks && TK.default_stream.stream.getVideoTracks() &&
    0 === TK.default_stream.stream.getVideoTracks().length && (c.videoinput = !0), d.audioinput && TK.default_stream.stream.getAudioTracks && TK.default_stream.stream.getAudioTracks() && 0 === TK.default_stream.stream.getAudioTracks().length && (c.audioinput = !0));
    c.audiooutput && b.setElementSinkIdToAudioouputDevice(f);
    c.videoinput || c.audioinput ? b.getUserMedia(function(b) {
      a && "function" === typeof a && a(b);
      e && "function" === typeof e && e(b)
    }, function(a) {
      e && "function" === typeof e && e(void 0)
    }, void 0, {
      isDemotionLocalStream: !0,
      isNeedCheckChangeLocalStream: !1,
      isStopLocalStream: !1
    }) : c.audiooutput && e && "function" === typeof e && e(void 0)
  };
  b.addOndevicechange = function(a) {
    if (!navigator.mediaDevices) return L.Logger.error("Browser does not support navigator.mediaDevices!"), !1;
    if (navigator.mediaDevices) return navigator.mediaDevices.ondevicechange = null, navigator.mediaDevices.ondevicechange = function(b) {
      L.Logger.debug("[tk-sdk]AVMgr:ondevicechange event:", b);
      a && "function" === typeof a && a(b)
    }, !0
  };
  b.removeOndevicechange = function() {
    if (!navigator.mediaDevices) return L.Logger.error("Browser does not support navigator.mediaDevices!"), !1;
    if (!navigator.mediaDevices.ondevicechange) return !1;
    navigator.mediaDevices.ondevicechange = null;
    return !0
  };
  b.stopStreamTracks = function(a, b, d) {
    b = void 0 !== b ? b : !0;
    d = void 0 !== d ? d : !0;
    if (b && d && a && a.getTracks && "function" === typeof a.getTracks) {
      if ((a = a.getTracks()) && 0 < a.length)
        for (d = 0; d < a.length; d++) a[d] && a[d].stop && "function" === typeof a[d].stop && a[d].stop()
    } else {
      if (b && a && a.getVideoTracks && "function" === typeof a.getVideoTracks && (b = a.getVideoTracks()) && 0 < b.length)
        for (var c = 0; c < b.length; c++) b[c] && b[c].stop &&
        "function" === typeof b[c].stop && b[c].stop();
      if (d && a && a.getAudioTracks && "function" === typeof a.getAudioTracks && (a = a.getAudioTracks()) && 0 < a.length)
        for (d = 0; d < a.length; d++) a[d] && a[d].stop && "function" === typeof a[d].stop && a[d].stop()
    }
  };
  b.enabledStreamVideoTrack = function(a, b) {
    if (a && a.getVideoTracks && "function" === typeof a.getVideoTracks && (a = a.getVideoTracks()) && 0 < a.length)
      for (var c = 0; c < a.length; c++) a[c].enabled !== b && (a[c].enabled = b)
  };
  b.enabledStreamAudioTrack = function(a, b) {
    if (a && a.getAudioTracks && "function" ===
      typeof a.getAudioTracks && (a = a.getAudioTracks()) && 0 < a.length)
      for (var c = 0; c < a.length; c++) a[c].enabled !== b && (a[c].enabled = b)
  };
  return b
}(TK);
TK = TK || {};
TK.NativeAVMgr = function() {
  var b = {
      room_video_width: 320,
      room_video_height: 240,
      room_video_fps: 10,
      onMicVolumeReportCallback: void 0
    },
    a = {},
    d = {},
    f = 100;
  b.setAVMgrProperty = function(a) {
    for (var c in a) b.hasOwnProperty(c) && (b[c] = a[c])
  };
  tknative.addEventListener("message", function(c) {
    var e = c.data.name;
    if ("onEnumerateDevices" === e) {
      var f = function() {
        var b = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput),
          e = L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput),
          f = L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput);
        L.Logger.debug("devices in enumerateDevices(client):",
          c.data);
        var g = c.data.audioinput,
          k = c.data.videoinput,
          l = c.data.audiooutput,
          D = c.data.seq,
          I = {},
          z = {},
          w = {
            hasdevice: {
              audioinput: !1,
              audiooutput: !1,
              videoinput: !1
            },
            devices: {
              audioinput: [],
              audiooutput: [],
              videoinput: []
            },
            useDevices: {}
          },
          M = function(a) {
            null != a && "communications" != a.groupId && "communications" != a.deiceId && "\u901a\u8baf" != a.label && ("audioinput" === a.kind && a.deviceId === b && (w.useDevices[a.kind] = a.deviceId), "videoinput" === a.kind && a.deviceId === e && (w.useDevices[a.kind] = a.deviceId), "audiooutput" === a.kind && a.deviceId ===
            f && (w.useDevices[a.kind] = a.deviceId), I[a.kind] = I[a.kind] || a.deviceId, w.devices[a.kind].push(a), w.hasdevice[a.kind] = !0, "default" === a.deviceId && (z[a.kind] = a.deviceId))
          };
        Array.isArray(g) && g.forEach(function(a) {
          M(a)
        });
        Array.isArray(k) && k.forEach(function(a) {
          M(a)
        });
        Array.isArray(l) && l.forEach(function(a) {
          M(a)
        });
        w.useDevices.audioinput || (w.useDevices.audioinput = z.audioinput || I.audioinput || "");
        w.useDevices.videoinput || (w.useDevices.videoinput = z.videoinput || I.videoinput || "");
        w.useDevices.audiooutput || (w.useDevices.audiooutput =
          z.audiooutput || I.audiooutput || "");
        L.Utils.localStorage ? d[D].isSetlocalStorage && (L.Utils.localStorage.setItem(L.Constant.deviceStorage.audioinput, w.useDevices.audioinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.videoinput, w.useDevices.videoinput), L.Utils.localStorage.setItem(L.Constant.deviceStorage.audiooutput, w.useDevices.audiooutput)) : L.Logger.error("not support localStorage");
        a[D] && (a[D](w), delete a[D]);
        d[D] && delete d[D]
      };
      TK.isTkNative && TK.subscribe_from_native ? f() : navigator.mediaDevices &&
      navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function(a) {
        var b = [];
        a.forEach(function(a) {
          "audiooutput" === a.kind && b.push({
            kind: a.kind,
            label: a.label,
            deviceId: a.deviceId,
            groupId: a.groupId
          })
        });
        c.data.audiooutput = b;
        f()
      }).catch(function(a) {
        L.Logger.error("[tk-sdk]enumerateDevices error :" + a.name + ": " + a.message);
        c.data.audiooutput = [];
        f()
      }) : (L.Logger.error("[tk-sdk]navigator.mediaDevices.enumerateDevices method not supported."), c.data.audiooutput = [], f())
    }
    if ("onMicVolumeReport" ===
      e) {
      var k = c.data.volume;
      if (null === k || void 0 === k) return;
      if (a["detecte-mic-callback"] && "function" === typeof a["detecte-mic-callback"]) a["detecte-mic-callback"](k / 100);
      if (b.onMicVolumeReportCallback && "function" === typeof b.onMicVolumeReportCallback) b.onMicVolumeReportCallback(k / 100, c.data.connectionId)
    }
    "onGetSpeakerVolume" === e && (k = c.data.volume, e = c.data.seq, "function" === typeof a[e] && (k = Math.round(k / 2.55), a[e](k), delete a[e]))
  }, !1);
  var e = function(a, d, e, f) {
    var c = function(b) {
      tknative.postMessage({
        command: "setCamera",
        deviceId: b.video.deviceId,
        width: Number(b.video.width),
        height: Number(b.video.height),
        fps: Number(b.video.frameRate)
      });
      tknative.postMessage({
        command: "setMicrophone",
        deviceId: b.audio.deviceId
      });
      a(null)
    };
    e = e || {
        audio: {},
        video: {}
      };
    if (e.screen) L.Logger.debug("[tk-sdk]Screen access requested!"), a(null);
    else {
      var g = {
        video: {},
        audio: {},
        screen: e.screen
      };
      "object" === typeof e.audio && (g.audio = e.audio);
      f = void 0 != f && null != f && "object" === typeof f ? f : {
        video: {},
        audio: {},
        exclude: {}
      };
      f.video = f.video || {};
      f.audio = f.audio || {};
      var k = e.audio.mandatory || {
            sourceId: f.audio.sourceId || L.Utils.localStorage.getItem(L.Constant.deviceStorage.audioinput) || ""
          },
        l = e.video.mandatory || {
            sourceId: f.video.sourceId || L.Utils.localStorage.getItem(L.Constant.deviceStorage.videoinput) || "",
            idealWidth: b.room_video_width || 320,
            maxWidth: b.room_video_width || 320,
            idealHeight: b.room_video_height || 240,
            maxHeight: b.room_video_height || 240
          };
      g.video.width = l.maxWidth;
      g.video.height = l.maxHeight;
      void 0 !== e.video.optional ? g.video.frameRate = e.video.optional[1].maxFrameRate :
        (d = {
          idealFrameRate: Number(b.room_video_fps || 10),
          maxFrameRate: Number(b.room_video_fps || 10)
        }, void 0 != d.idealFrameRate && void 0 != d.maxFrameRate ? g.video.frameRate = d.maxFrameRate : void 0 != d.frameRate && (g.video.frameRate = d.frameRate));
      l.sourceId && k.sourceId ? (null !== k.sourceId && void 0 !== k.sourceId ? g.audio.deviceId = k.sourceId : g.audio = !1, null !== l.sourceId && void 0 !== l.sourceId ? g.video.deviceId = l.sourceId : g.video = !1, f.exclude && f.exclude.video ? g.video = !1 : f.exclude && f.exclude.audio && (g.audio = !1), c(g)) : b.enumerateDevices(function(a) {
        var b =
          a.useDevices;
        a = a.hasdevice;
        null === a.videoinput || void 0 === a.videoinput || null === b.videoinput || void 0 === b.videoinput || l.sourceId || (l.sourceId = b.videoinput, L.Utils.localStorage.setItem(L.Constant.deviceStorage.videoinput, l.sourceId));
        null === a.audioinput || void 0 === a.audioinput || null === b.audioinput || void 0 === b.audioinput || k.sourceId || (k.sourceId = b.audioinput, L.Utils.localStorage.setItem(L.Constant.deviceStorage.audioinput, k.sourceId));
        null !== k.sourceId && void 0 !== k.sourceId ? g.audio.deviceId = k.sourceId : g.audio = !1;
        null !== l.sourceId && void 0 !== l.sourceId ? g.video.deviceId = l.sourceId : g.video = !1;
        f.exclude && f.exclude.video ? g.video = !1 : f.exclude && f.exclude.audio && (g.audio = !1);
        c(g)
      })
    }
  };
  b.getUserMedia = function(a, b, d, f) {
    e(a, b, d, f)
  };
  b.startDetecteMic = function(c, d) {
    b.stopDetectMic();
    tknative.postMessage({
      command: "startDetecteMic",
      deviceId: c
    });
    a["detecte-mic-callback"] = d
  };
  b.stopDetectMic = function() {
    tknative.postMessage({
      command: "stopDetecteMic"
    });
    delete a["detecte-mic-callback"]
  };
  b.startDetecteCam = function(a, d) {
    b.stopDetecteCam();
    tknative.postMessage({
      command: "startDetecteCam",
      deviceId: a,
      args: d
    })
  };
  b.stopDetecteCam = function() {
    tknative.postMessage({
      command: "stopDetecteCam"
    })
  };
  b.enumerateDevices = function(b, e) {
    L.Logger.debug("[tk-sdk]call enumerateDevices from client!");
    var c = f++;
    a[c] = b;
    b = {};
    b.isSetlocalStorage = void 0 === e ? !1 : void 0 != e.isSetlocalStorage ? e.isSetlocalStorage : !1;
    d[c] = b;
    tknative.postMessage({
      command: "enumerateDevices",
      seq: c
    })
  };
  b.setSpeaker = function(a) {
    tknative.postMessage({
      command: "setSpeaker",
      deviceId: a
    })
  };
  b.getsSoundMeterInstance =
    function(a) {
      if (a) return new function(a) {
        var b = this;
        b.audioContext = a;
        b.instant = 0;
        b.slow = 0;
        b.clip = 0;
        b.script = b.audioContext.createScriptProcessor(2048, 1, 1);
        b.script.onaudioprocess = function(a) {
          a = a.inputBuffer.getChannelData(0);
          var c, d = 0,
            e = 0;
          for (c = 0; c < a.length; ++c) d += a[c] * a[c], .99 < Math.abs(a[c]) && (e += 1);
          b.instant = Math.sqrt(d / a.length);
          b.slow = .95 * b.slow + .05 * b.instant;
          b.clip = e / a.length
        };
        b.connectToSource = function(a, c) {
          L.Logger.debug("SoundMeter connecting");
          try {
            b.mic = b.audioContext.createMediaStreamSource(a),
              b.mic.connect(b.script), b.script.connect(b.audioContext.destination), "undefined" !== typeof c && c(null)
          } catch (n) {
            L.Logger.error(n), "undefined" !== typeof c && c(n)
          }
        };
        b.stop = function() {
          b.mic && b.mic.disconnect && b.mic.disconnect();
          b.script && b.script.disconnect && b.script.disconnect()
        };
        return b
      }(a);
      L.Logger.error("[tk-sdk]getsSoundMeterInstance audioContext is not exist!")
    };
  b.setElementSinkIdToAudioouputDevice = function(a, b, d) {
    if (b = b || L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput))
      if (TK.isTkNative &&
        TK.subscribe_from_native) b = b || L.Utils.localStorage.getItem(L.Constant.deviceStorage.audiooutput), tknative.postMessage({
        command: "setSpeaker",
        deviceId: b
      }), d && "function" === typeof d && d(!1);
      else {
        var c = 0,
          e = function(a, e, f) {
            if (a && /(audio|video)/g.test(a.nodeName.toLowerCase()) && b)
              if (a.setSinkId) try {
                a.setSinkId(b).then(function() {
                  var e = a.getAttribute("id");
                  L.Logger.debug("[tk-sdk]Audio output device set to " + b, e ? " , element id is " + e : "  element:", e ? "" : a);
                  c++;
                  c === f && d && "function" === typeof d && d(!0)
                }).catch(function(b) {
                  var e =
                      void 0,
                    g = a.getAttribute("id");
                  b && "SecurityError" === b.name && (e = "You need to use HTTPS for selecting audio output device  ");
                  L.Logger.warning("[tk-sdk]setSinkId error:", b, e ? e : "", g ? " , element id is " + g : "  element:", g ? "" : a);
                  c++;
                  c === f && d && "function" === typeof d && d(!1)
                })
              } catch (z) {
                e = a.getAttribute("id"), L.Logger.error("[tk-sdk]setSinkId err:", z, e ? " , element id is " + e : "  element:", e ? "" : a), c++, c === f && d && "function" === typeof d && d(!1)
              } else e = a.getAttribute("id"), L.Logger.error("[tk-sdk]The browser does not support the setSinkId method,audiooutputDeviceId :",
                b, e ? " , element id is " + e : "  element:", e ? "" : a), c++, c === f && d && "function" === typeof d && d(!1);
            else c++, c === f && d && "function" === typeof d && d(!1)
          };
        if (!a) {
          a = [];
          var f = document.getElementsByTagName("audio"),
            g = document.getElementsByTagName("video");
          if (f && 0 < f.length)
            for (var l = 0; l < f.length; l++) {
              var u = f[l];
              a.push(u)
            }
          if (g && 0 < g.length)
            for (l = 0; l < g.length; l++) u = g[l], a.push(u)
        }
        if (a && 0 < a.length)
          for (f = a.length, l = 0; l < a.length; l++) u = a[l], e(u, l, f);
        else e(a, 0, 1)
      }
    else d && "function" === typeof d && d(!1)
  };
  b.changeLocalDeviceToLocalstream =
    function(a, d, e, f) {
      var c = {},
        g;
      for (g in d) L.Constant.deviceStorage[g] && d[g] !== L.Utils.localStorage.getItem(L.Constant.deviceStorage[g]) && (L.Utils.localStorage.setItem(L.Constant.deviceStorage[g], d[g]), c[g] = !0);
      c.audiooutput && b.setElementSinkIdToAudioouputDevice(f);
      c.videoinput || c.audioinput ? b.getUserMedia(function(b) {
        a && "function" === typeof a && a(b);
        e && "function" === typeof e && e(b)
      }, function(a) {
        e && "function" === typeof e && e(void 0)
      }, void 0, {
        isDemotionLocalStream: !0,
        isNeedCheckChangeLocalStream: !1,
        isStopLocalStream: !1
      }) :
        c.audiooutput && e && "function" === typeof e && e(void 0)
    };
  b.addOndevicechange = function(a) {};
  b.removeOndevicechange = function() {};
  b.getSpeakerVolume = function(b) {
    if ("function" !== typeof b) L.Logger.error("[tk-sdk] wrong arguments in funciton getSpeakerVolume");
    else {
      var c = f++;
      a[c] = b;
      tknative.postMessage({
        command: "getSpeakerVolume",
        seq: c
      })
    }
  };
  b.setSpeakerVolume = function(a) {
    void 0 === a || null === a || 0 > a || 100 < a ? L.Logger.error("[tk-sdk] invalid arguments in funciton setSpeakerVolume") : (a = Math.round(2.55 * a), tknative.postMessage({
      command: "setSpeakerVolume",
      volume: a
    }))
  };
  b.enabledStreamVideoTrack = function(a, b) {
    if (a && a.getVideoTracks && "function" === typeof a.getVideoTracks && (a = a.getVideoTracks()) && 0 < a.length)
      for (var c = 0; c < a.length; c++) a[c].enabled !== b && (a[c].enabled = b)
  };
  b.enabledStreamAudioTrack = function(a, b) {
    if (a && a.getAudioTracks && "function" === typeof a.getAudioTracks && (a = a.getAudioTracks()) && 0 < a.length)
      for (var c = 0; c < a.length; c++) a[c].enabled !== b && (a[c].enabled = b)
  };
  return b
};