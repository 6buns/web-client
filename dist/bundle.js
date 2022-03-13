var Bun = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
		if (n.__esModule) return n;
		var a = Object.defineProperty({}, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var client = {};

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  Object.defineProperty(subClass, "prototype", {
	    writable: false
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();

	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get() {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get.apply(this, arguments);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _createForOfIteratorHelper(o, allowArrayLike) {
	  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

	  if (!it) {
	    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
	      if (it) o = it;
	      var i = 0;

	      var F = function () {};

	      return {
	        s: F,
	        n: function () {
	          if (i >= o.length) return {
	            done: true
	          };
	          return {
	            done: false,
	            value: o[i++]
	          };
	        },
	        e: function (e) {
	          throw e;
	        },
	        f: F
	      };
	    }

	    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	  }

	  var normalCompletion = true,
	      didErr = false,
	      err;
	  return {
	    s: function () {
	      it = it.call(o);
	    },
	    n: function () {
	      var step = it.next();
	      normalCompletion = step.done;
	      return step;
	    },
	    e: function (e) {
	      didErr = true;
	      err = e;
	    },
	    f: function () {
	      try {
	        if (!normalCompletion && it.return != null) it.return();
	      } finally {
	        if (didErr) throw err;
	      }
	    }
	  };
	}

	var cjs$3 = {exports: {}};

	var url$1 = {};

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

	var parseuri = function parseuri(str) {
	  var src = str,
	      b = str.indexOf('['),
	      e = str.indexOf(']');

	  if (b != -1 && e != -1) {
	    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	  }

	  var m = re.exec(str || ''),
	      uri = {},
	      i = 14;

	  while (i--) {
	    uri[parts[i]] = m[i] || '';
	  }

	  if (b != -1 && e != -1) {
	    uri.source = src;
	    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	    uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	    uri.ipv6uri = true;
	  }

	  uri.pathNames = pathNames(uri, uri['path']);
	  uri.queryKey = queryKey(uri, uri['query']);
	  return uri;
	};

	function pathNames(obj, path) {
	  var regx = /\/{2,9}/g,
	      names = path.replace(regx, "/").split("/");

	  if (path.substr(0, 1) == '/' || path.length === 0) {
	    names.splice(0, 1);
	  }

	  if (path.substr(path.length - 1, 1) == '/') {
	    names.splice(names.length - 1, 1);
	  }

	  return names;
	}

	function queryKey(uri, query) {
	  var data = {};
	  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
	    if ($1) {
	      data[$1] = $2;
	    }
	  });
	  return data;
	}

	var browser = {exports: {}};

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	var ms = function ms(val, options) {
	  options = options || {};

	  var type = _typeof(val);

	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options["long"] ? fmtLong(val) : fmtShort(val);
	  }

	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
	};
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */


	function parse(str) {
	  str = String(str);

	  if (str.length > 100) {
	    return;
	  }

	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

	  if (!match) {
	    return;
	  }

	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();

	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;

	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;

	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;

	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;

	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;

	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;

	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;

	    default:
	      return undefined;
	  }
	}
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */


	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);

	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }

	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }

	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }

	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }

	  return ms + 'ms';
	}
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */


	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);

	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }

	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }

	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }

	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }

	  return ms + ' ms';
	}
	/**
	 * Pluralization helper.
	 */


	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
	  createDebug.debug = createDebug;
	  createDebug["default"] = createDebug;
	  createDebug.coerce = coerce;
	  createDebug.disable = disable;
	  createDebug.enable = enable;
	  createDebug.enabled = enabled;
	  createDebug.humanize = ms;
	  createDebug.destroy = destroy;
	  Object.keys(env).forEach(function (key) {
	    createDebug[key] = env[key];
	  });
	  /**
	  * The currently active debug mode names, and names to skip.
	  */

	  createDebug.names = [];
	  createDebug.skips = [];
	  /**
	  * Map of special "%n" handling functions, for the debug "format" argument.
	  *
	  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	  */

	  createDebug.formatters = {};
	  /**
	  * Selects a color for a debug namespace
	  * @param {String} namespace The namespace string for the debug instance to be colored
	  * @return {Number|String} An ANSI color code for the given namespace
	  * @api private
	  */

	  function selectColor(namespace) {
	    var hash = 0;

	    for (var i = 0; i < namespace.length; i++) {
	      hash = (hash << 5) - hash + namespace.charCodeAt(i);
	      hash |= 0; // Convert to 32bit integer
	    }

	    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	  }

	  createDebug.selectColor = selectColor;
	  /**
	  * Create a debugger with the given `namespace`.
	  *
	  * @param {String} namespace
	  * @return {Function}
	  * @api public
	  */

	  function createDebug(namespace) {
	    var prevTime;
	    var enableOverride = null;
	    var namespacesCache;
	    var enabledCache;

	    function debug() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      // Disabled?
	      if (!debug.enabled) {
	        return;
	      }

	      var self = debug; // Set `diff` timestamp

	      var curr = Number(new Date());
	      var ms = curr - (prevTime || curr);
	      self.diff = ms;
	      self.prev = prevTime;
	      self.curr = curr;
	      prevTime = curr;
	      args[0] = createDebug.coerce(args[0]);

	      if (typeof args[0] !== 'string') {
	        // Anything else let's inspect with %O
	        args.unshift('%O');
	      } // Apply any `formatters` transformations


	      var index = 0;
	      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	        // If we encounter an escaped % then don't increase the array index
	        if (match === '%%') {
	          return '%';
	        }

	        index++;
	        var formatter = createDebug.formatters[format];

	        if (typeof formatter === 'function') {
	          var val = args[index];
	          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

	          args.splice(index, 1);
	          index--;
	        }

	        return match;
	      }); // Apply env-specific formatting (colors, etc.)

	      createDebug.formatArgs.call(self, args);
	      var logFn = self.log || createDebug.log;
	      logFn.apply(self, args);
	    }

	    debug.namespace = namespace;
	    debug.useColors = createDebug.useColors();
	    debug.color = createDebug.selectColor(namespace);
	    debug.extend = extend;
	    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

	    Object.defineProperty(debug, 'enabled', {
	      enumerable: true,
	      configurable: false,
	      get: function get() {
	        if (enableOverride !== null) {
	          return enableOverride;
	        }

	        if (namespacesCache !== createDebug.namespaces) {
	          namespacesCache = createDebug.namespaces;
	          enabledCache = createDebug.enabled(namespace);
	        }

	        return enabledCache;
	      },
	      set: function set(v) {
	        enableOverride = v;
	      }
	    }); // Env-specific initialization logic for debug instances

	    if (typeof createDebug.init === 'function') {
	      createDebug.init(debug);
	    }

	    return debug;
	  }

	  function extend(namespace, delimiter) {
	    var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
	    newDebug.log = this.log;
	    return newDebug;
	  }
	  /**
	  * Enables a debug mode by namespaces. This can include modes
	  * separated by a colon and wildcards.
	  *
	  * @param {String} namespaces
	  * @api public
	  */


	  function enable(namespaces) {
	    createDebug.save(namespaces);
	    createDebug.namespaces = namespaces;
	    createDebug.names = [];
	    createDebug.skips = [];
	    var i;
	    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	    var len = split.length;

	    for (i = 0; i < len; i++) {
	      if (!split[i]) {
	        // ignore empty strings
	        continue;
	      }

	      namespaces = split[i].replace(/\*/g, '.*?');

	      if (namespaces[0] === '-') {
	        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	      } else {
	        createDebug.names.push(new RegExp('^' + namespaces + '$'));
	      }
	    }
	  }
	  /**
	  * Disable debug output.
	  *
	  * @return {String} namespaces
	  * @api public
	  */


	  function disable() {
	    var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
	      return '-' + namespace;
	    }))).join(',');
	    createDebug.enable('');
	    return namespaces;
	  }
	  /**
	  * Returns true if the given mode name is enabled, false otherwise.
	  *
	  * @param {String} name
	  * @return {Boolean}
	  * @api public
	  */


	  function enabled(name) {
	    if (name[name.length - 1] === '*') {
	      return true;
	    }

	    var i;
	    var len;

	    for (i = 0, len = createDebug.skips.length; i < len; i++) {
	      if (createDebug.skips[i].test(name)) {
	        return false;
	      }
	    }

	    for (i = 0, len = createDebug.names.length; i < len; i++) {
	      if (createDebug.names[i].test(name)) {
	        return true;
	      }
	    }

	    return false;
	  }
	  /**
	  * Convert regexp to namespace
	  *
	  * @param {RegExp} regxep
	  * @return {String} namespace
	  * @api private
	  */


	  function toNamespace(regexp) {
	    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
	  }
	  /**
	  * Coerce `val`.
	  *
	  * @param {Mixed} val
	  * @return {Mixed}
	  * @api private
	  */


	  function coerce(val) {
	    if (val instanceof Error) {
	      return val.stack || val.message;
	    }

	    return val;
	  }
	  /**
	  * XXX DO NOT USE. This is a temporary stub function.
	  * XXX It WILL be removed in the next major release.
	  */


	  function destroy() {
	    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	  }

	  createDebug.enable(createDebug.load());
	  return createDebug;
	}

	var common = setup;

	(function (module, exports) {
	  /**
	   * This is the web browser implementation of `debug()`.
	   */
	  exports.formatArgs = formatArgs;
	  exports.save = save;
	  exports.load = load;
	  exports.useColors = useColors;
	  exports.storage = localstorage();

	  exports.destroy = function () {
	    var warned = false;
	    return function () {
	      if (!warned) {
	        warned = true;
	        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	      }
	    };
	  }();
	  /**
	   * Colors.
	   */


	  exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
	  /**
	   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	   * and the Firebug extension (any Firefox version) are known
	   * to support "%c" CSS customizations.
	   *
	   * TODO: add a `localStorage` variable to explicitly enable/disable colors
	   */
	  // eslint-disable-next-line complexity

	  function useColors() {
	    // NB: In an Electron preload script, document will be defined but not fully
	    // initialized. Since we know we're in Chrome, we'll just detect this case
	    // explicitly
	    if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
	      return true;
	    } // Internet Explorer and Edge do not support colors.


	    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	      return false;
	    } // Is webkit? http://stackoverflow.com/a/16459606/376773
	    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


	    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
	    typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
	    typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	  }
	  /**
	   * Colorize log arguments if enabled.
	   *
	   * @api public
	   */


	  function formatArgs(args) {
	    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

	    if (!this.useColors) {
	      return;
	    }

	    var c = 'color: ' + this.color;
	    args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
	    // arguments passed either before or after the %c, so we need to
	    // figure out the correct index to insert the CSS into

	    var index = 0;
	    var lastC = 0;
	    args[0].replace(/%[a-zA-Z%]/g, function (match) {
	      if (match === '%%') {
	        return;
	      }

	      index++;

	      if (match === '%c') {
	        // We only are interested in the *last* %c
	        // (the user may have provided their own)
	        lastC = index;
	      }
	    });
	    args.splice(lastC, 0, c);
	  }
	  /**
	   * Invokes `console.debug()` when available.
	   * No-op when `console.debug` is not a "function".
	   * If `console.debug` is not available, falls back
	   * to `console.log`.
	   *
	   * @api public
	   */


	  exports.log = console.debug || console.log || function () {};
	  /**
	   * Save `namespaces`.
	   *
	   * @param {String} namespaces
	   * @api private
	   */


	  function save(namespaces) {
	    try {
	      if (namespaces) {
	        exports.storage.setItem('debug', namespaces);
	      } else {
	        exports.storage.removeItem('debug');
	      }
	    } catch (error) {// Swallow
	      // XXX (@Qix-) should we be logging these?
	    }
	  }
	  /**
	   * Load `namespaces`.
	   *
	   * @return {String} returns the previously persisted debug modes
	   * @api private
	   */


	  function load() {
	    var r;

	    try {
	      r = exports.storage.getItem('debug');
	    } catch (error) {// Swallow
	      // XXX (@Qix-) should we be logging these?
	    } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


	    if (!r && typeof process !== 'undefined' && 'env' in process) {
	      r = process.env.DEBUG;
	    }

	    return r;
	  }
	  /**
	   * Localstorage attempts to return the localstorage.
	   *
	   * This is necessary because safari throws
	   * when a user disables cookies/localstorage
	   * and you attempt to access it.
	   *
	   * @return {LocalStorage}
	   * @api private
	   */


	  function localstorage() {
	    try {
	      // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
	      // The Browser also has localStorage in the global context.
	      return localStorage;
	    } catch (error) {// Swallow
	      // XXX (@Qix-) should we be logging these?
	    }
	  }

	  module.exports = common(exports);
	  var formatters = module.exports.formatters;
	  /**
	   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	   */

	  formatters.j = function (v) {
	    try {
	      return JSON.stringify(v);
	    } catch (error) {
	      return '[UnexpectedJSONParseError]: ' + error.message;
	    }
	  };
	})(browser, browser.exports);

	var __importDefault$a = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(url$1, "__esModule", {
	  value: true
	});
	url$1.url = void 0;

	var parseuri_1$1 = __importDefault$a(parseuri);

	var debug_1$7 = __importDefault$a(browser.exports); // debug()


	var debug$7 = debug_1$7["default"]("socket.io-client:url"); // debug()

	/**
	 * URL parser.
	 *
	 * @param uri - url
	 * @param path - the request path of the connection
	 * @param loc - An object meant to mimic window.location.
	 *        Defaults to window.location.
	 * @public
	 */

	function url(uri) {
	  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	  var loc = arguments.length > 2 ? arguments[2] : undefined;
	  var obj = uri; // default to window.location

	  loc = loc || typeof location !== "undefined" && location;
	  if (null == uri) uri = loc.protocol + "//" + loc.host; // relative path support

	  if (typeof uri === "string") {
	    if ("/" === uri.charAt(0)) {
	      if ("/" === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug$7("protocol-less url %s", uri);

	      if ("undefined" !== typeof loc) {
	        uri = loc.protocol + "//" + uri;
	      } else {
	        uri = "https://" + uri;
	      }
	    } // parse


	    debug$7("parse %s", uri);
	    obj = parseuri_1$1["default"](uri);
	  } // make sure we treat `localhost:80` and `localhost` equally


	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = "80";
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = "443";
	    }
	  }

	  obj.path = obj.path || "/";
	  var ipv6 = obj.host.indexOf(":") !== -1;
	  var host = ipv6 ? "[" + obj.host + "]" : obj.host; // define unique id

	  obj.id = obj.protocol + "://" + host + ":" + obj.port + path; // define href

	  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
	  return obj;
	}

	url$1.url = url;

	var manager = {};

	var cjs$2 = {};

	var socket$1 = {};

	var transports = {};

	var pollingXhr = {};

	var xmlhttprequest_browser = {};

	var hasCors = {exports: {}};

	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  hasCors.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  hasCors.exports = false;
	}

	var globalThis_browser = {};

	Object.defineProperty(globalThis_browser, "__esModule", {
	  value: true
	});

	globalThis_browser["default"] = function () {
	  if (typeof self !== "undefined") {
	    return self;
	  } else if (typeof window !== "undefined") {
	    return window;
	  } else {
	    return Function("return this")();
	  }
	}();

	var __importDefault$9 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(xmlhttprequest_browser, "__esModule", {
	  value: true
	});

	var has_cors_1 = __importDefault$9(hasCors.exports);

	var globalThis_js_1$3 = __importDefault$9(globalThis_browser);

	function default_1(opts) {
	  var xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

	  try {
	    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors_1["default"])) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) {}

	  if (!xdomain) {
	    try {
	      return new globalThis_js_1$3["default"][["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
	    } catch (e) {}
	  }
	}

	xmlhttprequest_browser["default"] = default_1;

	var util = {};

	var __importDefault$8 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(util, "__esModule", {
	  value: true
	});
	util.installTimerFunctions = util.pick = void 0;

	var globalThis_js_1$2 = __importDefault$8(globalThis_browser);

	function pick(obj) {
	  for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    attr[_key - 1] = arguments[_key];
	  }

	  return attr.reduce(function (acc, k) {
	    if (obj.hasOwnProperty(k)) {
	      acc[k] = obj[k];
	    }

	    return acc;
	  }, {});
	}

	util.pick = pick; // Keep a reference to the real timeout functions so they can be used when overridden

	var NATIVE_SET_TIMEOUT = setTimeout;
	var NATIVE_CLEAR_TIMEOUT = clearTimeout;

	function installTimerFunctions(obj, opts) {
	  if (opts.useNativeTimers) {
	    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis_js_1$2["default"]);
	    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis_js_1$2["default"]);
	  } else {
	    obj.setTimeoutFn = setTimeout.bind(globalThis_js_1$2["default"]);
	    obj.clearTimeoutFn = clearTimeout.bind(globalThis_js_1$2["default"]);
	  }
	}

	util.installTimerFunctions = installTimerFunctions;

	var componentEmitter = {};

	/**
	 * Expose `Emitter`.
	 */

	componentEmitter.Emitter = Emitter;
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */


	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }

	  return obj;
	}
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */


	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	  return this;
	};
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */


	Emitter.prototype.once = function (event, fn) {
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */


	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {}; // all

	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  } // specific event


	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this; // remove all handlers

	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  } // remove specific handler


	  var cb;

	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];

	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  } // Remove event specific arrays for event types that no
	  // one is subscribed for to avoid memory leak.


	  if (callbacks.length === 0) {
	    delete this._callbacks['$' + event];
	  }

	  return this;
	};
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */


	Emitter.prototype.emit = function (event) {
	  this._callbacks = this._callbacks || {};
	  var args = new Array(arguments.length - 1),
	      callbacks = this._callbacks['$' + event];

	  for (var i = 1; i < arguments.length; i++) {
	    args[i - 1] = arguments[i];
	  }

	  if (callbacks) {
	    callbacks = callbacks.slice(0);

	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	}; // alias used for reserved events (protected method)


	Emitter.prototype.emitReserved = Emitter.prototype.emit;
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function (event) {
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */


	Emitter.prototype.hasListeners = function (event) {
	  return !!this.listeners(event).length;
	};

	var polling = {};

	var transport = {};

	var cjs$1 = {};

	var encodePacket_browser = {};

	var commons = {};

	Object.defineProperty(commons, "__esModule", {
	  value: true
	});
	commons.ERROR_PACKET = commons.PACKET_TYPES_REVERSE = commons.PACKET_TYPES = void 0;
	var PACKET_TYPES = Object.create(null); // no Map = no polyfill

	commons.PACKET_TYPES = PACKET_TYPES;
	PACKET_TYPES["open"] = "0";
	PACKET_TYPES["close"] = "1";
	PACKET_TYPES["ping"] = "2";
	PACKET_TYPES["pong"] = "3";
	PACKET_TYPES["message"] = "4";
	PACKET_TYPES["upgrade"] = "5";
	PACKET_TYPES["noop"] = "6";
	var PACKET_TYPES_REVERSE = Object.create(null);
	commons.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
	Object.keys(PACKET_TYPES).forEach(function (key) {
	  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
	});
	var ERROR_PACKET = {
	  type: "error",
	  data: "parser error"
	};
	commons.ERROR_PACKET = ERROR_PACKET;

	Object.defineProperty(encodePacket_browser, "__esModule", {
	  value: true
	});
	var commons_js_1$1 = commons;
	var withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
	var withNativeArrayBuffer$2 = typeof ArrayBuffer === "function"; // ArrayBuffer.isView method is not defined in IE10

	var isView$1 = function isView(obj) {
	  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
	};

	var encodePacket = function encodePacket(_ref, supportsBinary, callback) {
	  var type = _ref.type,
	      data = _ref.data;

	  if (withNativeBlob$1 && data instanceof Blob) {
	    if (supportsBinary) {
	      return callback(data);
	    } else {
	      return encodeBlobAsBase64(data, callback);
	    }
	  } else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
	    if (supportsBinary) {
	      return callback(data);
	    } else {
	      return encodeBlobAsBase64(new Blob([data]), callback);
	    }
	  } // plain string


	  return callback(commons_js_1$1.PACKET_TYPES[type] + (data || ""));
	};

	var encodeBlobAsBase64 = function encodeBlobAsBase64(data, callback) {
	  var fileReader = new FileReader();

	  fileReader.onload = function () {
	    var content = fileReader.result.split(",")[1];
	    callback("b" + content);
	  };

	  return fileReader.readAsDataURL(data);
	};

	encodePacket_browser["default"] = encodePacket;

	var decodePacket_browser = {};

	/*
	 * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
	 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
	 * Released under MIT License
	 */
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'; // Use a lookup table to find the index.

	var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);

	for (var i$1 = 0; i$1 < chars.length; i$1++) {
	  lookup[chars.charCodeAt(i$1)] = i$1;
	}

	var encode$1 = function encode(arraybuffer) {
	  var bytes = new Uint8Array(arraybuffer),
	      i,
	      len = bytes.length,
	      base64 = '';

	  for (i = 0; i < len; i += 3) {
	    base64 += chars[bytes[i] >> 2];
	    base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
	    base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
	    base64 += chars[bytes[i + 2] & 63];
	  }

	  if (len % 3 === 2) {
	    base64 = base64.substring(0, base64.length - 1) + '=';
	  } else if (len % 3 === 1) {
	    base64 = base64.substring(0, base64.length - 2) + '==';
	  }

	  return base64;
	};

	var decode$1 = function decode(base64) {
	  var bufferLength = base64.length * 0.75,
	      len = base64.length,
	      i,
	      p = 0,
	      encoded1,
	      encoded2,
	      encoded3,
	      encoded4;

	  if (base64[base64.length - 1] === '=') {
	    bufferLength--;

	    if (base64[base64.length - 2] === '=') {
	      bufferLength--;
	    }
	  }

	  var arraybuffer = new ArrayBuffer(bufferLength),
	      bytes = new Uint8Array(arraybuffer);

	  for (i = 0; i < len; i += 4) {
	    encoded1 = lookup[base64.charCodeAt(i)];
	    encoded2 = lookup[base64.charCodeAt(i + 1)];
	    encoded3 = lookup[base64.charCodeAt(i + 2)];
	    encoded4 = lookup[base64.charCodeAt(i + 3)];
	    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
	    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
	    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	  }

	  return arraybuffer;
	};

	var base64Arraybuffer_es5 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		decode: decode$1,
		encode: encode$1
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(base64Arraybuffer_es5);

	Object.defineProperty(decodePacket_browser, "__esModule", {
	  value: true
	});
	var commons_js_1 = commons;
	var base64_arraybuffer_1 = require$$1;
	var withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";

	var decodePacket = function decodePacket(encodedPacket, binaryType) {
	  if (typeof encodedPacket !== "string") {
	    return {
	      type: "message",
	      data: mapBinary(encodedPacket, binaryType)
	    };
	  }

	  var type = encodedPacket.charAt(0);

	  if (type === "b") {
	    return {
	      type: "message",
	      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
	    };
	  }

	  var packetType = commons_js_1.PACKET_TYPES_REVERSE[type];

	  if (!packetType) {
	    return commons_js_1.ERROR_PACKET;
	  }

	  return encodedPacket.length > 1 ? {
	    type: commons_js_1.PACKET_TYPES_REVERSE[type],
	    data: encodedPacket.substring(1)
	  } : {
	    type: commons_js_1.PACKET_TYPES_REVERSE[type]
	  };
	};

	var decodeBase64Packet = function decodeBase64Packet(data, binaryType) {
	  if (withNativeArrayBuffer$1) {
	    var decoded = (0, base64_arraybuffer_1.decode)(data);
	    return mapBinary(decoded, binaryType);
	  } else {
	    return {
	      base64: true,
	      data: data
	    }; // fallback for old browsers
	  }
	};

	var mapBinary = function mapBinary(data, binaryType) {
	  switch (binaryType) {
	    case "blob":
	      return data instanceof ArrayBuffer ? new Blob([data]) : data;

	    case "arraybuffer":
	    default:
	      return data;
	    // assuming the data is already an ArrayBuffer
	  }
	};

	decodePacket_browser["default"] = decodePacket;

	Object.defineProperty(cjs$1, "__esModule", {
	  value: true
	});
	cjs$1.decodePayload = cjs$1.decodePacket = cjs$1.encodePayload = cjs$1.encodePacket = cjs$1.protocol = void 0;
	var encodePacket_js_1 = encodePacket_browser;
	cjs$1.encodePacket = encodePacket_js_1["default"];
	var decodePacket_js_1 = decodePacket_browser;
	cjs$1.decodePacket = decodePacket_js_1["default"];
	var SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

	var encodePayload = function encodePayload(packets, callback) {
	  // some packets may be added to the array while encoding, so the initial length must be saved
	  var length = packets.length;
	  var encodedPackets = new Array(length);
	  var count = 0;
	  packets.forEach(function (packet, i) {
	    // force base64 encoding for binary packets
	    (0, encodePacket_js_1["default"])(packet, false, function (encodedPacket) {
	      encodedPackets[i] = encodedPacket;

	      if (++count === length) {
	        callback(encodedPackets.join(SEPARATOR));
	      }
	    });
	  });
	};

	cjs$1.encodePayload = encodePayload;

	var decodePayload = function decodePayload(encodedPayload, binaryType) {
	  var encodedPackets = encodedPayload.split(SEPARATOR);
	  var packets = [];

	  for (var i = 0; i < encodedPackets.length; i++) {
	    var decodedPacket = (0, decodePacket_js_1["default"])(encodedPackets[i], binaryType);
	    packets.push(decodedPacket);

	    if (decodedPacket.type === "error") {
	      break;
	    }
	  }

	  return packets;
	};

	cjs$1.decodePayload = decodePayload;
	cjs$1.protocol = 4;

	var __importDefault$7 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(transport, "__esModule", {
	  value: true
	});
	transport.Transport = void 0;
	var engine_io_parser_1$3 = cjs$1;
	var component_emitter_1$4 = componentEmitter;
	var util_js_1$3 = util;

	var debug_1$6 = __importDefault$7(browser.exports); // debug()


	var debug$6 = (0, debug_1$6["default"])("engine.io-client:transport"); // debug()

	var Transport = /*#__PURE__*/function (_component_emitter_1$) {
	  _inherits(Transport, _component_emitter_1$);

	  var _super = _createSuper(Transport);

	  /**
	   * Transport abstract constructor.
	   *
	   * @param {Object} options.
	   * @api private
	   */
	  function Transport(opts) {
	    var _this;

	    _classCallCheck(this, Transport);

	    _this = _super.call(this);
	    _this.writable = false;
	    (0, util_js_1$3.installTimerFunctions)(_assertThisInitialized(_this), opts);
	    _this.opts = opts;
	    _this.query = opts.query;
	    _this.readyState = "";
	    _this.socket = opts.socket;
	    return _this;
	  }
	  /**
	   * Emits an error.
	   *
	   * @param {String} str
	   * @return {Transport} for chaining
	   * @api protected
	   */


	  _createClass(Transport, [{
	    key: "onError",
	    value: function onError(msg, desc) {
	      var err = new Error(msg); // @ts-ignore

	      err.type = "TransportError"; // @ts-ignore

	      err.description = desc;

	      _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "error", err);

	      return this;
	    }
	    /**
	     * Opens the transport.
	     *
	     * @api public
	     */

	  }, {
	    key: "open",
	    value: function open() {
	      if ("closed" === this.readyState || "" === this.readyState) {
	        this.readyState = "opening";
	        this.doOpen();
	      }

	      return this;
	    }
	    /**
	     * Closes the transport.
	     *
	     * @api public
	     */

	  }, {
	    key: "close",
	    value: function close() {
	      if ("opening" === this.readyState || "open" === this.readyState) {
	        this.doClose();
	        this.onClose();
	      }

	      return this;
	    }
	    /**
	     * Sends multiple packets.
	     *
	     * @param {Array} packets
	     * @api public
	     */

	  }, {
	    key: "send",
	    value: function send(packets) {
	      if ("open" === this.readyState) {
	        this.write(packets);
	      } else {
	        // this might happen if the transport was silently closed in the beforeunload event handler
	        debug$6("transport is not open, discarding packets");
	      }
	    }
	    /**
	     * Called upon open
	     *
	     * @api protected
	     */

	  }, {
	    key: "onOpen",
	    value: function onOpen() {
	      this.readyState = "open";
	      this.writable = true;

	      _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "open");
	    }
	    /**
	     * Called with data.
	     *
	     * @param {String} data
	     * @api protected
	     */

	  }, {
	    key: "onData",
	    value: function onData(data) {
	      var packet = (0, engine_io_parser_1$3.decodePacket)(data, this.socket.binaryType);
	      this.onPacket(packet);
	    }
	    /**
	     * Called with a decoded packet.
	     *
	     * @api protected
	     */

	  }, {
	    key: "onPacket",
	    value: function onPacket(packet) {
	      _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "packet", packet);
	    }
	    /**
	     * Called upon close.
	     *
	     * @api protected
	     */

	  }, {
	    key: "onClose",
	    value: function onClose() {
	      this.readyState = "closed";

	      _get(_getPrototypeOf(Transport.prototype), "emit", this).call(this, "close");
	    }
	  }]);

	  return Transport;
	}(component_emitter_1$4.Emitter);

	transport.Transport = Transport;

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
	    length = 64,
	    map = {},
	    seed = 0,
	    i = 0,
	    prev;
	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */

	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}
	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */


	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}
	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */


	function yeast() {
	  var now = encode(+new Date());
	  if (now !== prev) return seed = 0, prev = now;
	  return now + '.' + encode(seed++);
	} //
	// Map each character to its index.
	//


	for (; i < length; i++) {
	  map[alphabet[i]] = i;
	} //
	// Expose the `yeast`, `encode` and `decode` functions.
	//


	yeast.encode = encode;
	yeast.decode = decode;
	var yeast_1$2 = yeast;

	var parseqs = {};

	parseqs.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */


	parseqs.decode = function (qs) {
	  var qry = {};
	  var pairs = qs.split('&');

	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }

	  return qry;
	};

	var __importDefault$6 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(polling, "__esModule", {
	  value: true
	});
	polling.Polling = void 0;
	var transport_js_1$1 = transport;

	var debug_1$5 = __importDefault$6(browser.exports); // debug()


	var yeast_1$1 = __importDefault$6(yeast_1$2);

	var parseqs_1$2 = __importDefault$6(parseqs);

	var engine_io_parser_1$2 = cjs$1;
	var debug$5 = (0, debug_1$5["default"])("engine.io-client:polling"); // debug()

	var Polling = /*#__PURE__*/function (_transport_js_1$Trans) {
	  _inherits(Polling, _transport_js_1$Trans);

	  var _super = _createSuper(Polling);

	  function Polling() {
	    var _this;

	    _classCallCheck(this, Polling);

	    _this = _super.apply(this, arguments);
	    _this.polling = false;
	    return _this;
	  }
	  /**
	   * Transport name.
	   */


	  _createClass(Polling, [{
	    key: "name",
	    get: function get() {
	      return "polling";
	    }
	    /**
	     * Opens the socket (triggers polling). We write a PING message to determine
	     * when the transport is open.
	     *
	     * @api private
	     */

	  }, {
	    key: "doOpen",
	    value: function doOpen() {
	      this.poll();
	    }
	    /**
	     * Pauses polling.
	     *
	     * @param {Function} callback upon buffers are flushed and transport is paused
	     * @api private
	     */

	  }, {
	    key: "pause",
	    value: function pause(onPause) {
	      var _this2 = this;

	      this.readyState = "pausing";

	      var pause = function pause() {
	        debug$5("paused");
	        _this2.readyState = "paused";
	        onPause();
	      };

	      if (this.polling || !this.writable) {
	        var total = 0;

	        if (this.polling) {
	          debug$5("we are currently polling - waiting to pause");
	          total++;
	          this.once("pollComplete", function () {
	            debug$5("pre-pause polling complete");
	            --total || pause();
	          });
	        }

	        if (!this.writable) {
	          debug$5("we are currently writing - waiting to pause");
	          total++;
	          this.once("drain", function () {
	            debug$5("pre-pause writing complete");
	            --total || pause();
	          });
	        }
	      } else {
	        pause();
	      }
	    }
	    /**
	     * Starts polling cycle.
	     *
	     * @api public
	     */

	  }, {
	    key: "poll",
	    value: function poll() {
	      debug$5("polling");
	      this.polling = true;
	      this.doPoll();
	      this.emit("poll");
	    }
	    /**
	     * Overloads onData to detect payloads.
	     *
	     * @api private
	     */

	  }, {
	    key: "onData",
	    value: function onData(data) {
	      var _this3 = this;

	      debug$5("polling got data %s", data);

	      var callback = function callback(packet) {
	        // if its the first message we consider the transport open
	        if ("opening" === _this3.readyState && packet.type === "open") {
	          _this3.onOpen();
	        } // if its a close packet, we close the ongoing requests


	        if ("close" === packet.type) {
	          _this3.onClose();

	          return false;
	        } // otherwise bypass onData and handle the message


	        _this3.onPacket(packet);
	      }; // decode payload


	      (0, engine_io_parser_1$2.decodePayload)(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

	      if ("closed" !== this.readyState) {
	        // if we got data we're not polling
	        this.polling = false;
	        this.emit("pollComplete");

	        if ("open" === this.readyState) {
	          this.poll();
	        } else {
	          debug$5('ignoring poll - transport state "%s"', this.readyState);
	        }
	      }
	    }
	    /**
	     * For polling, send a close packet.
	     *
	     * @api private
	     */

	  }, {
	    key: "doClose",
	    value: function doClose() {
	      var _this4 = this;

	      var close = function close() {
	        debug$5("writing close packet");

	        _this4.write([{
	          type: "close"
	        }]);
	      };

	      if ("open" === this.readyState) {
	        debug$5("transport open - closing");
	        close();
	      } else {
	        // in case we're trying to close while
	        // handshaking is in progress (GH-164)
	        debug$5("transport not open - deferring close");
	        this.once("open", close);
	      }
	    }
	    /**
	     * Writes a packets payload.
	     *
	     * @param {Array} data packets
	     * @param {Function} drain callback
	     * @api private
	     */

	  }, {
	    key: "write",
	    value: function write(packets) {
	      var _this5 = this;

	      this.writable = false;
	      (0, engine_io_parser_1$2.encodePayload)(packets, function (data) {
	        _this5.doWrite(data, function () {
	          _this5.writable = true;

	          _this5.emit("drain");
	        });
	      });
	    }
	    /**
	     * Generates uri for connection.
	     *
	     * @api private
	     */

	  }, {
	    key: "uri",
	    value: function uri() {
	      var query = this.query || {};
	      var schema = this.opts.secure ? "https" : "http";
	      var port = ""; // cache busting is forced

	      if (false !== this.opts.timestampRequests) {
	        query[this.opts.timestampParam] = (0, yeast_1$1["default"])();
	      }

	      if (!this.supportsBinary && !query.sid) {
	        query.b64 = 1;
	      } // avoid port if default for schema


	      if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
	        port = ":" + this.opts.port;
	      }

	      var encodedQuery = parseqs_1$2["default"].encode(query);
	      var ipv6 = this.opts.hostname.indexOf(":") !== -1;
	      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
	    }
	  }]);

	  return Polling;
	}(transport_js_1$1.Transport);

	polling.Polling = Polling;

	/* global attachEvent */


	var __importDefault$5 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(pollingXhr, "__esModule", {
	  value: true
	});
	pollingXhr.Request = pollingXhr.XHR = void 0;

	var xmlhttprequest_js_1 = __importDefault$5(xmlhttprequest_browser);

	var debug_1$4 = __importDefault$5(browser.exports); // debug()


	var globalThis_js_1$1 = __importDefault$5(globalThis_browser);

	var util_js_1$2 = util;
	var component_emitter_1$3 = componentEmitter;
	var polling_js_1 = polling;
	var debug$4 = (0, debug_1$4["default"])("engine.io-client:polling-xhr"); // debug()

	/**
	 * Empty function
	 */

	function empty() {}

	var hasXHR2 = function () {
	  var xhr = new xmlhttprequest_js_1["default"]({
	    xdomain: false
	  });
	  return null != xhr.responseType;
	}();

	var XHR = /*#__PURE__*/function (_polling_js_1$Polling) {
	  _inherits(XHR, _polling_js_1$Polling);

	  var _super = _createSuper(XHR);

	  /**
	   * XHR Polling constructor.
	   *
	   * @param {Object} opts
	   * @api public
	   */
	  function XHR(opts) {
	    var _this;

	    _classCallCheck(this, XHR);

	    _this = _super.call(this, opts);

	    if (typeof location !== "undefined") {
	      var isSSL = "https:" === location.protocol;
	      var port = location.port; // some user agents have empty `location.port`

	      if (!port) {
	        port = isSSL ? "443" : "80";
	      }

	      _this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
	      _this.xs = opts.secure !== isSSL;
	    }
	    /**
	     * XHR supports binary
	     */


	    var forceBase64 = opts && opts.forceBase64;
	    _this.supportsBinary = hasXHR2 && !forceBase64;
	    return _this;
	  }
	  /**
	   * Creates a request.
	   *
	   * @param {String} method
	   * @api private
	   */


	  _createClass(XHR, [{
	    key: "request",
	    value: function request() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      Object.assign(opts, {
	        xd: this.xd,
	        xs: this.xs
	      }, this.opts);
	      return new Request(this.uri(), opts);
	    }
	    /**
	     * Sends data.
	     *
	     * @param {String} data to send.
	     * @param {Function} called upon flush.
	     * @api private
	     */

	  }, {
	    key: "doWrite",
	    value: function doWrite(data, fn) {
	      var _this2 = this;

	      var req = this.request({
	        method: "POST",
	        data: data
	      });
	      req.on("success", fn);
	      req.on("error", function (err) {
	        _this2.onError("xhr post error", err);
	      });
	    }
	    /**
	     * Starts a poll cycle.
	     *
	     * @api private
	     */

	  }, {
	    key: "doPoll",
	    value: function doPoll() {
	      var _this3 = this;

	      debug$4("xhr poll");
	      var req = this.request();
	      req.on("data", this.onData.bind(this));
	      req.on("error", function (err) {
	        _this3.onError("xhr poll error", err);
	      });
	      this.pollXhr = req;
	    }
	  }]);

	  return XHR;
	}(polling_js_1.Polling);

	pollingXhr.XHR = XHR;

	var Request = /*#__PURE__*/function (_component_emitter_1$) {
	  _inherits(Request, _component_emitter_1$);

	  var _super2 = _createSuper(Request);

	  /**
	   * Request constructor
	   *
	   * @param {Object} options
	   * @api public
	   */
	  function Request(uri, opts) {
	    var _this4;

	    _classCallCheck(this, Request);

	    _this4 = _super2.call(this);
	    (0, util_js_1$2.installTimerFunctions)(_assertThisInitialized(_this4), opts);
	    _this4.opts = opts;
	    _this4.method = opts.method || "GET";
	    _this4.uri = uri;
	    _this4.async = false !== opts.async;
	    _this4.data = undefined !== opts.data ? opts.data : null;

	    _this4.create();

	    return _this4;
	  }
	  /**
	   * Creates the XHR object and sends the request.
	   *
	   * @api private
	   */


	  _createClass(Request, [{
	    key: "create",
	    value: function create() {
	      var _this5 = this;

	      var opts = (0, util_js_1$2.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
	      opts.xdomain = !!this.opts.xd;
	      opts.xscheme = !!this.opts.xs;
	      var xhr = this.xhr = new xmlhttprequest_js_1["default"](opts);

	      try {
	        debug$4("xhr open %s: %s", this.method, this.uri);
	        xhr.open(this.method, this.uri, this.async);

	        try {
	          if (this.opts.extraHeaders) {
	            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

	            for (var i in this.opts.extraHeaders) {
	              if (this.opts.extraHeaders.hasOwnProperty(i)) {
	                xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
	              }
	            }
	          }
	        } catch (e) {}

	        if ("POST" === this.method) {
	          try {
	            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
	          } catch (e) {}
	        }

	        try {
	          xhr.setRequestHeader("Accept", "*/*");
	        } catch (e) {} // ie6 check


	        if ("withCredentials" in xhr) {
	          xhr.withCredentials = this.opts.withCredentials;
	        }

	        if (this.opts.requestTimeout) {
	          xhr.timeout = this.opts.requestTimeout;
	        }

	        xhr.onreadystatechange = function () {
	          if (4 !== xhr.readyState) return;

	          if (200 === xhr.status || 1223 === xhr.status) {
	            _this5.onLoad();
	          } else {
	            // make sure the `error` event handler that's user-set
	            // does not throw in the same tick and gets caught here
	            _this5.setTimeoutFn(function () {
	              _this5.onError(typeof xhr.status === "number" ? xhr.status : 0);
	            }, 0);
	          }
	        };

	        debug$4("xhr data %s", this.data);
	        xhr.send(this.data);
	      } catch (e) {
	        // Need to defer since .create() is called directly from the constructor
	        // and thus the 'error' event can only be only bound *after* this exception
	        // occurs.  Therefore, also, we cannot throw here at all.
	        this.setTimeoutFn(function () {
	          _this5.onError(e);
	        }, 0);
	        return;
	      }

	      if (typeof document !== "undefined") {
	        this.index = Request.requestsCount++;
	        Request.requests[this.index] = this;
	      }
	    }
	    /**
	     * Called upon successful response.
	     *
	     * @api private
	     */

	  }, {
	    key: "onSuccess",
	    value: function onSuccess() {
	      this.emit("success");
	      this.cleanup();
	    }
	    /**
	     * Called if we have data.
	     *
	     * @api private
	     */

	  }, {
	    key: "onData",
	    value: function onData(data) {
	      this.emit("data", data);
	      this.onSuccess();
	    }
	    /**
	     * Called upon error.
	     *
	     * @api private
	     */

	  }, {
	    key: "onError",
	    value: function onError(err) {
	      this.emit("error", err);
	      this.cleanup(true);
	    }
	    /**
	     * Cleans up house.
	     *
	     * @api private
	     */

	  }, {
	    key: "cleanup",
	    value: function cleanup(fromError) {
	      if ("undefined" === typeof this.xhr || null === this.xhr) {
	        return;
	      }

	      this.xhr.onreadystatechange = empty;

	      if (fromError) {
	        try {
	          this.xhr.abort();
	        } catch (e) {}
	      }

	      if (typeof document !== "undefined") {
	        delete Request.requests[this.index];
	      }

	      this.xhr = null;
	    }
	    /**
	     * Called upon load.
	     *
	     * @api private
	     */

	  }, {
	    key: "onLoad",
	    value: function onLoad() {
	      var data = this.xhr.responseText;

	      if (data !== null) {
	        this.onData(data);
	      }
	    }
	    /**
	     * Aborts the request.
	     *
	     * @api public
	     */

	  }, {
	    key: "abort",
	    value: function abort() {
	      this.cleanup();
	    }
	  }]);

	  return Request;
	}(component_emitter_1$3.Emitter);

	pollingXhr.Request = Request;
	Request.requestsCount = 0;
	Request.requests = {};
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	if (typeof document !== "undefined") {
	  // @ts-ignore
	  if (typeof attachEvent === "function") {
	    // @ts-ignore
	    attachEvent("onunload", unloadHandler);
	  } else if (typeof addEventListener === "function") {
	    var terminationEvent = "onpagehide" in globalThis_js_1$1["default"] ? "pagehide" : "unload";
	    addEventListener(terminationEvent, unloadHandler, false);
	  }
	}

	function unloadHandler() {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}

	var websocket = {};

	var websocketConstructor_browser = {};

	var __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(websocketConstructor_browser, "__esModule", {
	  value: true
	});
	websocketConstructor_browser.defaultBinaryType = websocketConstructor_browser.usingBrowserWebSocket = websocketConstructor_browser.WebSocket = websocketConstructor_browser.nextTick = void 0;

	var globalThis_js_1 = __importDefault$4(globalThis_browser);

	websocketConstructor_browser.nextTick = function () {
	  var isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";

	  if (isPromiseAvailable) {
	    return function (cb) {
	      return Promise.resolve().then(cb);
	    };
	  } else {
	    return function (cb, setTimeoutFn) {
	      return setTimeoutFn(cb, 0);
	    };
	  }
	}();

	websocketConstructor_browser.WebSocket = globalThis_js_1["default"].WebSocket || globalThis_js_1["default"].MozWebSocket;
	websocketConstructor_browser.usingBrowserWebSocket = true;
	websocketConstructor_browser.defaultBinaryType = "arraybuffer";

	var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(websocket, "__esModule", {
	  value: true
	});
	websocket.WS = void 0;
	var transport_js_1 = transport;

	var parseqs_1$1 = __importDefault$3(parseqs);

	var yeast_1 = __importDefault$3(yeast_1$2);

	var util_js_1$1 = util;
	var websocket_constructor_js_1 = websocketConstructor_browser;

	var debug_1$3 = __importDefault$3(browser.exports); // debug()


	var engine_io_parser_1$1 = cjs$1;
	var debug$3 = (0, debug_1$3["default"])("engine.io-client:websocket"); // debug()
	// detect ReactNative environment

	var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";

	var WS = /*#__PURE__*/function (_transport_js_1$Trans) {
	  _inherits(WS, _transport_js_1$Trans);

	  var _super = _createSuper(WS);

	  /**
	   * WebSocket transport constructor.
	   *
	   * @api {Object} connection options
	   * @api public
	   */
	  function WS(opts) {
	    var _this;

	    _classCallCheck(this, WS);

	    _this = _super.call(this, opts);
	    _this.supportsBinary = !opts.forceBase64;
	    return _this;
	  }
	  /**
	   * Transport name.
	   *
	   * @api public
	   */


	  _createClass(WS, [{
	    key: "name",
	    get: function get() {
	      return "websocket";
	    }
	    /**
	     * Opens socket.
	     *
	     * @api private
	     */

	  }, {
	    key: "doOpen",
	    value: function doOpen() {
	      if (!this.check()) {
	        // let probe timeout
	        return;
	      }

	      var uri = this.uri();
	      var protocols = this.opts.protocols; // React Native only supports the 'headers' option, and will print a warning if anything else is passed

	      var opts = isReactNative ? {} : (0, util_js_1$1.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");

	      if (this.opts.extraHeaders) {
	        opts.headers = this.opts.extraHeaders;
	      }

	      try {
	        this.ws = websocket_constructor_js_1.usingBrowserWebSocket && !isReactNative ? protocols ? new websocket_constructor_js_1.WebSocket(uri, protocols) : new websocket_constructor_js_1.WebSocket(uri) : new websocket_constructor_js_1.WebSocket(uri, protocols, opts);
	      } catch (err) {
	        return this.emit("error", err);
	      }

	      this.ws.binaryType = this.socket.binaryType || websocket_constructor_js_1.defaultBinaryType;
	      this.addEventListeners();
	    }
	    /**
	     * Adds event listeners to the socket
	     *
	     * @api private
	     */

	  }, {
	    key: "addEventListeners",
	    value: function addEventListeners() {
	      var _this2 = this;

	      this.ws.onopen = function () {
	        if (_this2.opts.autoUnref) {
	          _this2.ws._socket.unref();
	        }

	        _this2.onOpen();
	      };

	      this.ws.onclose = this.onClose.bind(this);

	      this.ws.onmessage = function (ev) {
	        return _this2.onData(ev.data);
	      };

	      this.ws.onerror = function (e) {
	        return _this2.onError("websocket error", e);
	      };
	    }
	    /**
	     * Writes data to socket.
	     *
	     * @param {Array} array of packets.
	     * @api private
	     */

	  }, {
	    key: "write",
	    value: function write(packets) {
	      var _this3 = this;

	      this.writable = false; // encodePacket efficient as it uses WS framing
	      // no need for encodePayload

	      var _loop = function _loop(i) {
	        var packet = packets[i];
	        var lastPacket = i === packets.length - 1;
	        (0, engine_io_parser_1$1.encodePacket)(packet, _this3.supportsBinary, function (data) {
	          // always create a new object (GH-437)
	          var opts = {};

	          if (!websocket_constructor_js_1.usingBrowserWebSocket) {
	            if (packet.options) {
	              opts.compress = packet.options.compress;
	            }

	            if (_this3.opts.perMessageDeflate) {
	              var len = "string" === typeof data ? Buffer.byteLength(data) : data.length;

	              if (len < _this3.opts.perMessageDeflate.threshold) {
	                opts.compress = false;
	              }
	            }
	          } // Sometimes the websocket has already been closed but the browser didn't
	          // have a chance of informing us about it yet, in that case send will
	          // throw an error


	          try {
	            if (websocket_constructor_js_1.usingBrowserWebSocket) {
	              // TypeError is thrown when passing the second argument on Safari
	              _this3.ws.send(data);
	            } else {
	              _this3.ws.send(data, opts);
	            }
	          } catch (e) {
	            debug$3("websocket closed before onclose event");
	          }

	          if (lastPacket) {
	            // fake drain
	            // defer to next tick to allow Socket to clear writeBuffer
	            (0, websocket_constructor_js_1.nextTick)(function () {
	              _this3.writable = true;

	              _this3.emit("drain");
	            }, _this3.setTimeoutFn);
	          }
	        });
	      };

	      for (var i = 0; i < packets.length; i++) {
	        _loop(i);
	      }
	    }
	    /**
	     * Closes socket.
	     *
	     * @api private
	     */

	  }, {
	    key: "doClose",
	    value: function doClose() {
	      if (typeof this.ws !== "undefined") {
	        this.ws.close();
	        this.ws = null;
	      }
	    }
	    /**
	     * Generates uri for connection.
	     *
	     * @api private
	     */

	  }, {
	    key: "uri",
	    value: function uri() {
	      var query = this.query || {};
	      var schema = this.opts.secure ? "wss" : "ws";
	      var port = ""; // avoid port if default for schema

	      if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
	        port = ":" + this.opts.port;
	      } // append timestamp to URI


	      if (this.opts.timestampRequests) {
	        query[this.opts.timestampParam] = (0, yeast_1["default"])();
	      } // communicate binary support capabilities


	      if (!this.supportsBinary) {
	        query.b64 = 1;
	      }

	      var encodedQuery = parseqs_1$1["default"].encode(query);
	      var ipv6 = this.opts.hostname.indexOf(":") !== -1;
	      return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
	    }
	    /**
	     * Feature detection for WebSocket.
	     *
	     * @return {Boolean} whether this transport is available.
	     * @api public
	     */

	  }, {
	    key: "check",
	    value: function check() {
	      return !!websocket_constructor_js_1.WebSocket && !("__initialize" in websocket_constructor_js_1.WebSocket && this.name === WS.prototype.name);
	    }
	  }]);

	  return WS;
	}(transport_js_1.Transport);

	websocket.WS = WS;

	Object.defineProperty(transports, "__esModule", {
	  value: true
	});
	transports.transports = void 0;
	var polling_xhr_js_1 = pollingXhr;
	var websocket_js_1 = websocket;
	transports.transports = {
	  websocket: websocket_js_1.WS,
	  polling: polling_xhr_js_1.XHR
	};

	var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(socket$1, "__esModule", {
	  value: true
	});
	socket$1.Socket = void 0;
	var index_js_1 = transports;
	var util_js_1 = util;

	var parseqs_1 = __importDefault$2(parseqs);

	var parseuri_1 = __importDefault$2(parseuri);

	var debug_1$2 = __importDefault$2(browser.exports); // debug()


	var component_emitter_1$2 = componentEmitter;
	var engine_io_parser_1 = cjs$1;
	var debug$2 = (0, debug_1$2["default"])("engine.io-client:socket"); // debug()

	var Socket$1 = /*#__PURE__*/function (_component_emitter_1$) {
	  _inherits(Socket, _component_emitter_1$);

	  var _super = _createSuper(Socket);

	  /**
	   * Socket constructor.
	   *
	   * @param {String|Object} uri or options
	   * @param {Object} opts - options
	   * @api public
	   */
	  function Socket(uri) {
	    var _this;

	    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, Socket);

	    _this = _super.call(this);

	    if (uri && "object" === _typeof(uri)) {
	      opts = uri;
	      uri = null;
	    }

	    if (uri) {
	      uri = (0, parseuri_1["default"])(uri);
	      opts.hostname = uri.host;
	      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
	      opts.port = uri.port;
	      if (uri.query) opts.query = uri.query;
	    } else if (opts.host) {
	      opts.hostname = (0, parseuri_1["default"])(opts.host).host;
	    }

	    (0, util_js_1.installTimerFunctions)(_assertThisInitialized(_this), opts);
	    _this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;

	    if (opts.hostname && !opts.port) {
	      // if no port is specified manually, use the protocol default
	      opts.port = _this.secure ? "443" : "80";
	    }

	    _this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
	    _this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : _this.secure ? "443" : "80");
	    _this.transports = opts.transports || ["polling", "websocket"];
	    _this.readyState = "";
	    _this.writeBuffer = [];
	    _this.prevBufferLen = 0;
	    _this.opts = Object.assign({
	      path: "/engine.io",
	      agent: false,
	      withCredentials: false,
	      upgrade: true,
	      timestampParam: "t",
	      rememberUpgrade: false,
	      rejectUnauthorized: true,
	      perMessageDeflate: {
	        threshold: 1024
	      },
	      transportOptions: {},
	      closeOnBeforeunload: true
	    }, opts);
	    _this.opts.path = _this.opts.path.replace(/\/$/, "") + "/";

	    if (typeof _this.opts.query === "string") {
	      _this.opts.query = parseqs_1["default"].decode(_this.opts.query);
	    } // set on handshake


	    _this.id = null;
	    _this.upgrades = null;
	    _this.pingInterval = null;
	    _this.pingTimeout = null; // set on heartbeat

	    _this.pingTimeoutTimer = null;

	    if (typeof addEventListener === "function") {
	      if (_this.opts.closeOnBeforeunload) {
	        // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
	        // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
	        // closed/reloaded)
	        addEventListener("beforeunload", function () {
	          if (_this.transport) {
	            // silently close the transport
	            _this.transport.removeAllListeners();

	            _this.transport.close();
	          }
	        }, false);
	      }

	      if (_this.hostname !== "localhost") {
	        _this.offlineEventListener = function () {
	          _this.onClose("transport close");
	        };

	        addEventListener("offline", _this.offlineEventListener, false);
	      }
	    }

	    _this.open();

	    return _this;
	  }
	  /**
	   * Creates transport of the given type.
	   *
	   * @param {String} transport name
	   * @return {Transport}
	   * @api private
	   */


	  _createClass(Socket, [{
	    key: "createTransport",
	    value: function createTransport(name) {
	      debug$2('creating transport "%s"', name);
	      var query = clone(this.opts.query); // append engine.io protocol identifier

	      query.EIO = engine_io_parser_1.protocol; // transport name

	      query.transport = name; // session id if we already have one

	      if (this.id) query.sid = this.id;
	      var opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
	        query: query,
	        socket: this,
	        hostname: this.hostname,
	        secure: this.secure,
	        port: this.port
	      });
	      debug$2("options: %j", opts);
	      return new index_js_1.transports[name](opts);
	    }
	    /**
	     * Initializes transport to use and starts probe.
	     *
	     * @api private
	     */

	  }, {
	    key: "open",
	    value: function open() {
	      var _this2 = this;

	      var transport;

	      if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
	        transport = "websocket";
	      } else if (0 === this.transports.length) {
	        // Emit error on next tick so it can be listened to
	        this.setTimeoutFn(function () {
	          _this2.emitReserved("error", "No transports available");
	        }, 0);
	        return;
	      } else {
	        transport = this.transports[0];
	      }

	      this.readyState = "opening"; // Retry with the next transport if the transport is disabled (jsonp: false)

	      try {
	        transport = this.createTransport(transport);
	      } catch (e) {
	        debug$2("error while creating transport: %s", e);
	        this.transports.shift();
	        this.open();
	        return;
	      }

	      transport.open();
	      this.setTransport(transport);
	    }
	    /**
	     * Sets the current transport. Disables the existing one (if any).
	     *
	     * @api private
	     */

	  }, {
	    key: "setTransport",
	    value: function setTransport(transport) {
	      var _this3 = this;

	      debug$2("setting transport %s", transport.name);

	      if (this.transport) {
	        debug$2("clearing existing transport %s", this.transport.name);
	        this.transport.removeAllListeners();
	      } // set up transport


	      this.transport = transport; // set up transport listeners

	      transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", function () {
	        _this3.onClose("transport close");
	      });
	    }
	    /**
	     * Probes a transport.
	     *
	     * @param {String} transport name
	     * @api private
	     */

	  }, {
	    key: "probe",
	    value: function probe(name) {
	      var _this4 = this;

	      debug$2('probing transport "%s"', name);
	      var transport = this.createTransport(name);
	      var failed = false;
	      Socket.priorWebsocketSuccess = false;

	      var onTransportOpen = function onTransportOpen() {
	        if (failed) return;
	        debug$2('probe transport "%s" opened', name);
	        transport.send([{
	          type: "ping",
	          data: "probe"
	        }]);
	        transport.once("packet", function (msg) {
	          if (failed) return;

	          if ("pong" === msg.type && "probe" === msg.data) {
	            debug$2('probe transport "%s" pong', name);
	            _this4.upgrading = true;

	            _this4.emitReserved("upgrading", transport);

	            if (!transport) return;
	            Socket.priorWebsocketSuccess = "websocket" === transport.name;
	            debug$2('pausing current transport "%s"', _this4.transport.name);

	            _this4.transport.pause(function () {
	              if (failed) return;
	              if ("closed" === _this4.readyState) return;
	              debug$2("changing transport and sending upgrade packet");
	              cleanup();

	              _this4.setTransport(transport);

	              transport.send([{
	                type: "upgrade"
	              }]);

	              _this4.emitReserved("upgrade", transport);

	              transport = null;
	              _this4.upgrading = false;

	              _this4.flush();
	            });
	          } else {
	            debug$2('probe transport "%s" failed', name);
	            var err = new Error("probe error"); // @ts-ignore

	            err.transport = transport.name;

	            _this4.emitReserved("upgradeError", err);
	          }
	        });
	      };

	      function freezeTransport() {
	        if (failed) return; // Any callback called by transport should be ignored since now

	        failed = true;
	        cleanup();
	        transport.close();
	        transport = null;
	      } // Handle any error that happens while probing


	      var onerror = function onerror(err) {
	        var error = new Error("probe error: " + err); // @ts-ignore

	        error.transport = transport.name;
	        freezeTransport();
	        debug$2('probe transport "%s" failed because of error: %s', name, err);

	        _this4.emitReserved("upgradeError", error);
	      };

	      function onTransportClose() {
	        onerror("transport closed");
	      } // When the socket is closed while we're probing


	      function onclose() {
	        onerror("socket closed");
	      } // When the socket is upgraded while we're probing


	      function onupgrade(to) {
	        if (transport && to.name !== transport.name) {
	          debug$2('"%s" works - aborting "%s"', to.name, transport.name);
	          freezeTransport();
	        }
	      } // Remove all listeners on the transport and on self


	      var cleanup = function cleanup() {
	        transport.removeListener("open", onTransportOpen);
	        transport.removeListener("error", onerror);
	        transport.removeListener("close", onTransportClose);

	        _this4.off("close", onclose);

	        _this4.off("upgrading", onupgrade);
	      };

	      transport.once("open", onTransportOpen);
	      transport.once("error", onerror);
	      transport.once("close", onTransportClose);
	      this.once("close", onclose);
	      this.once("upgrading", onupgrade);
	      transport.open();
	    }
	    /**
	     * Called when connection is deemed open.
	     *
	     * @api private
	     */

	  }, {
	    key: "onOpen",
	    value: function onOpen() {
	      debug$2("socket open");
	      this.readyState = "open";
	      Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
	      this.emitReserved("open");
	      this.flush(); // we check for `readyState` in case an `open`
	      // listener already closed the socket

	      if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
	        debug$2("starting upgrade probes");
	        var i = 0;
	        var l = this.upgrades.length;

	        for (; i < l; i++) {
	          this.probe(this.upgrades[i]);
	        }
	      }
	    }
	    /**
	     * Handles a packet.
	     *
	     * @api private
	     */

	  }, {
	    key: "onPacket",
	    value: function onPacket(packet) {
	      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
	        debug$2('socket receive: type "%s", data "%s"', packet.type, packet.data);
	        this.emitReserved("packet", packet); // Socket is live - any packet counts

	        this.emitReserved("heartbeat");

	        switch (packet.type) {
	          case "open":
	            this.onHandshake(JSON.parse(packet.data));
	            break;

	          case "ping":
	            this.resetPingTimeout();
	            this.sendPacket("pong");
	            this.emitReserved("ping");
	            this.emitReserved("pong");
	            break;

	          case "error":
	            var err = new Error("server error"); // @ts-ignore

	            err.code = packet.data;
	            this.onError(err);
	            break;

	          case "message":
	            this.emitReserved("data", packet.data);
	            this.emitReserved("message", packet.data);
	            break;
	        }
	      } else {
	        debug$2('packet received with socket readyState "%s"', this.readyState);
	      }
	    }
	    /**
	     * Called upon handshake completion.
	     *
	     * @param {Object} data - handshake obj
	     * @api private
	     */

	  }, {
	    key: "onHandshake",
	    value: function onHandshake(data) {
	      this.emitReserved("handshake", data);
	      this.id = data.sid;
	      this.transport.query.sid = data.sid;
	      this.upgrades = this.filterUpgrades(data.upgrades);
	      this.pingInterval = data.pingInterval;
	      this.pingTimeout = data.pingTimeout;
	      this.onOpen(); // In case open handler closes socket

	      if ("closed" === this.readyState) return;
	      this.resetPingTimeout();
	    }
	    /**
	     * Sets and resets ping timeout timer based on server pings.
	     *
	     * @api private
	     */

	  }, {
	    key: "resetPingTimeout",
	    value: function resetPingTimeout() {
	      var _this5 = this;

	      this.clearTimeoutFn(this.pingTimeoutTimer);
	      this.pingTimeoutTimer = this.setTimeoutFn(function () {
	        _this5.onClose("ping timeout");
	      }, this.pingInterval + this.pingTimeout);

	      if (this.opts.autoUnref) {
	        this.pingTimeoutTimer.unref();
	      }
	    }
	    /**
	     * Called on `drain` event
	     *
	     * @api private
	     */

	  }, {
	    key: "onDrain",
	    value: function onDrain() {
	      this.writeBuffer.splice(0, this.prevBufferLen); // setting prevBufferLen = 0 is very important
	      // for example, when upgrading, upgrade packet is sent over,
	      // and a nonzero prevBufferLen could cause problems on `drain`

	      this.prevBufferLen = 0;

	      if (0 === this.writeBuffer.length) {
	        this.emitReserved("drain");
	      } else {
	        this.flush();
	      }
	    }
	    /**
	     * Flush write buffers.
	     *
	     * @api private
	     */

	  }, {
	    key: "flush",
	    value: function flush() {
	      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
	        debug$2("flushing %d packets in socket", this.writeBuffer.length);
	        this.transport.send(this.writeBuffer); // keep track of current length of writeBuffer
	        // splice writeBuffer and callbackBuffer on `drain`

	        this.prevBufferLen = this.writeBuffer.length;
	        this.emitReserved("flush");
	      }
	    }
	    /**
	     * Sends a message.
	     *
	     * @param {String} message.
	     * @param {Function} callback function.
	     * @param {Object} options.
	     * @return {Socket} for chaining.
	     * @api public
	     */

	  }, {
	    key: "write",
	    value: function write(msg, options, fn) {
	      this.sendPacket("message", msg, options, fn);
	      return this;
	    }
	  }, {
	    key: "send",
	    value: function send(msg, options, fn) {
	      this.sendPacket("message", msg, options, fn);
	      return this;
	    }
	    /**
	     * Sends a packet.
	     *
	     * @param {String} packet type.
	     * @param {String} data.
	     * @param {Object} options.
	     * @param {Function} callback function.
	     * @api private
	     */

	  }, {
	    key: "sendPacket",
	    value: function sendPacket(type, data, options, fn) {
	      if ("function" === typeof data) {
	        fn = data;
	        data = undefined;
	      }

	      if ("function" === typeof options) {
	        fn = options;
	        options = null;
	      }

	      if ("closing" === this.readyState || "closed" === this.readyState) {
	        return;
	      }

	      options = options || {};
	      options.compress = false !== options.compress;
	      var packet = {
	        type: type,
	        data: data,
	        options: options
	      };
	      this.emitReserved("packetCreate", packet);
	      this.writeBuffer.push(packet);
	      if (fn) this.once("flush", fn);
	      this.flush();
	    }
	    /**
	     * Closes the connection.
	     *
	     * @api public
	     */

	  }, {
	    key: "close",
	    value: function close() {
	      var _this6 = this;

	      var close = function close() {
	        _this6.onClose("forced close");

	        debug$2("socket closing - telling transport to close");

	        _this6.transport.close();
	      };

	      var cleanupAndClose = function cleanupAndClose() {
	        _this6.off("upgrade", cleanupAndClose);

	        _this6.off("upgradeError", cleanupAndClose);

	        close();
	      };

	      var waitForUpgrade = function waitForUpgrade() {
	        // wait for upgrade to finish since we can't send packets while pausing a transport
	        _this6.once("upgrade", cleanupAndClose);

	        _this6.once("upgradeError", cleanupAndClose);
	      };

	      if ("opening" === this.readyState || "open" === this.readyState) {
	        this.readyState = "closing";

	        if (this.writeBuffer.length) {
	          this.once("drain", function () {
	            if (_this6.upgrading) {
	              waitForUpgrade();
	            } else {
	              close();
	            }
	          });
	        } else if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      }

	      return this;
	    }
	    /**
	     * Called upon transport error
	     *
	     * @api private
	     */

	  }, {
	    key: "onError",
	    value: function onError(err) {
	      debug$2("socket error %j", err);
	      Socket.priorWebsocketSuccess = false;
	      this.emitReserved("error", err);
	      this.onClose("transport error", err);
	    }
	    /**
	     * Called upon transport close.
	     *
	     * @api private
	     */

	  }, {
	    key: "onClose",
	    value: function onClose(reason, desc) {
	      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
	        debug$2('socket close with reason: "%s"', reason); // clear timers

	        this.clearTimeoutFn(this.pingTimeoutTimer); // stop event from firing again for transport

	        this.transport.removeAllListeners("close"); // ensure transport won't stay open

	        this.transport.close(); // ignore further transport communication

	        this.transport.removeAllListeners();

	        if (typeof removeEventListener === "function") {
	          removeEventListener("offline", this.offlineEventListener, false);
	        } // set ready state


	        this.readyState = "closed"; // clear session id

	        this.id = null; // emit close event

	        this.emitReserved("close", reason, desc); // clean buffers after, so users can still
	        // grab the buffers on `close` event

	        this.writeBuffer = [];
	        this.prevBufferLen = 0;
	      }
	    }
	    /**
	     * Filters upgrades, returning only those matching client transports.
	     *
	     * @param {Array} server upgrades
	     * @api private
	     *
	     */

	  }, {
	    key: "filterUpgrades",
	    value: function filterUpgrades(upgrades) {
	      var filteredUpgrades = [];
	      var i = 0;
	      var j = upgrades.length;

	      for (; i < j; i++) {
	        if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
	      }

	      return filteredUpgrades;
	    }
	  }]);

	  return Socket;
	}(component_emitter_1$2.Emitter);

	socket$1.Socket = Socket$1;
	Socket$1.protocol = engine_io_parser_1.protocol;

	function clone(obj) {
	  var o = {};

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }

	  return o;
	}

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.installTimerFunctions = exports.transports = exports.Transport = exports.protocol = exports.Socket = void 0;
	  var socket_js_1 = socket$1;
	  Object.defineProperty(exports, "Socket", {
	    enumerable: true,
	    get: function get() {
	      return socket_js_1.Socket;
	    }
	  });
	  exports.protocol = socket_js_1.Socket.protocol;
	  var transport_js_1 = transport;
	  Object.defineProperty(exports, "Transport", {
	    enumerable: true,
	    get: function get() {
	      return transport_js_1.Transport;
	    }
	  });
	  var index_js_1 = transports;
	  Object.defineProperty(exports, "transports", {
	    enumerable: true,
	    get: function get() {
	      return index_js_1.transports;
	    }
	  });
	  var util_js_1 = util;
	  Object.defineProperty(exports, "installTimerFunctions", {
	    enumerable: true,
	    get: function get() {
	      return util_js_1.installTimerFunctions;
	    }
	  });
	})(cjs$2);

	var socket = {};

	var cjs = {};

	var binary = {};

	var isBinary$1 = {};

	Object.defineProperty(isBinary$1, "__esModule", {
	  value: true
	});
	isBinary$1.hasBinary = isBinary$1.isBinary = void 0;
	var withNativeArrayBuffer = typeof ArrayBuffer === "function";

	var isView = function isView(obj) {
	  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
	};

	var toString = Object.prototype.toString;
	var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
	var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
	/**
	 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
	 *
	 * @private
	 */

	function isBinary(obj) {
	  return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
	}

	isBinary$1.isBinary = isBinary;

	function hasBinary(obj, toJSON) {
	  if (!obj || _typeof(obj) !== "object") {
	    return false;
	  }

	  if (Array.isArray(obj)) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      if (hasBinary(obj[i])) {
	        return true;
	      }
	    }

	    return false;
	  }

	  if (isBinary(obj)) {
	    return true;
	  }

	  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
	    return hasBinary(obj.toJSON(), true);
	  }

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
	      return true;
	    }
	  }

	  return false;
	}

	isBinary$1.hasBinary = hasBinary;

	Object.defineProperty(binary, "__esModule", {
	  value: true
	});
	binary.reconstructPacket = binary.deconstructPacket = void 0;
	var is_binary_js_1 = isBinary$1;
	/**
	 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @public
	 */

	function deconstructPacket(packet) {
	  var buffers = [];
	  var packetData = packet.data;
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData, buffers);
	  pack.attachments = buffers.length; // number of binary 'attachments'

	  return {
	    packet: pack,
	    buffers: buffers
	  };
	}

	binary.deconstructPacket = deconstructPacket;

	function _deconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (is_binary_js_1.isBinary(data)) {
	    var placeholder = {
	      _placeholder: true,
	      num: buffers.length
	    };
	    buffers.push(data);
	    return placeholder;
	  } else if (Array.isArray(data)) {
	    var newData = new Array(data.length);

	    for (var i = 0; i < data.length; i++) {
	      newData[i] = _deconstructPacket(data[i], buffers);
	    }

	    return newData;
	  } else if (_typeof(data) === "object" && !(data instanceof Date)) {
	    var _newData = {};

	    for (var key in data) {
	      if (Object.prototype.hasOwnProperty.call(data, key)) {
	        _newData[key] = _deconstructPacket(data[key], buffers);
	      }
	    }

	    return _newData;
	  }

	  return data;
	}
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @public
	 */


	function reconstructPacket(packet, buffers) {
	  packet.data = _reconstructPacket(packet.data, buffers);
	  packet.attachments = undefined; // no longer useful

	  return packet;
	}

	binary.reconstructPacket = reconstructPacket;

	function _reconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (data && data._placeholder) {
	    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
	  } else if (Array.isArray(data)) {
	    for (var i = 0; i < data.length; i++) {
	      data[i] = _reconstructPacket(data[i], buffers);
	    }
	  } else if (_typeof(data) === "object") {
	    for (var key in data) {
	      if (Object.prototype.hasOwnProperty.call(data, key)) {
	        data[key] = _reconstructPacket(data[key], buffers);
	      }
	    }
	  }

	  return data;
	}

	(function (exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
	  var component_emitter_1 = componentEmitter;
	  var binary_js_1 = binary;
	  var is_binary_js_1 = isBinary$1;
	  var debug_1 = browser.exports; // debug()

	  var debug = debug_1["default"]("socket.io-parser"); // debug()

	  /**
	   * Protocol version.
	   *
	   * @public
	   */

	  exports.protocol = 5;
	  var PacketType;

	  (function (PacketType) {
	    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
	    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
	    PacketType[PacketType["EVENT"] = 2] = "EVENT";
	    PacketType[PacketType["ACK"] = 3] = "ACK";
	    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
	  })(PacketType = exports.PacketType || (exports.PacketType = {}));
	  /**
	   * A socket.io Encoder instance
	   */


	  var Encoder = /*#__PURE__*/function () {
	    function Encoder() {
	      _classCallCheck(this, Encoder);
	    }

	    _createClass(Encoder, [{
	      key: "encode",
	      value:
	      /**
	       * Encode a packet as a single string if non-binary, or as a
	       * buffer sequence, depending on packet type.
	       *
	       * @param {Object} obj - packet object
	       */
	      function encode(obj) {
	        debug("encoding packet %j", obj);

	        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
	          if (is_binary_js_1.hasBinary(obj)) {
	            obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
	            return this.encodeAsBinary(obj);
	          }
	        }

	        return [this.encodeAsString(obj)];
	      }
	      /**
	       * Encode packet as string.
	       */

	    }, {
	      key: "encodeAsString",
	      value: function encodeAsString(obj) {
	        // first is type
	        var str = "" + obj.type; // attachments if we have them

	        if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
	          str += obj.attachments + "-";
	        } // if we have a namespace other than `/`
	        // we append it followed by a comma `,`


	        if (obj.nsp && "/" !== obj.nsp) {
	          str += obj.nsp + ",";
	        } // immediately followed by the id


	        if (null != obj.id) {
	          str += obj.id;
	        } // json data


	        if (null != obj.data) {
	          str += JSON.stringify(obj.data);
	        }

	        debug("encoded %j as %s", obj, str);
	        return str;
	      }
	      /**
	       * Encode packet as 'buffer sequence' by removing blobs, and
	       * deconstructing packet into object with placeholders and
	       * a list of buffers.
	       */

	    }, {
	      key: "encodeAsBinary",
	      value: function encodeAsBinary(obj) {
	        var deconstruction = binary_js_1.deconstructPacket(obj);
	        var pack = this.encodeAsString(deconstruction.packet);
	        var buffers = deconstruction.buffers;
	        buffers.unshift(pack); // add packet info to beginning of data list

	        return buffers; // write all the buffers
	      }
	    }]);

	    return Encoder;
	  }();

	  exports.Encoder = Encoder;
	  /**
	   * A socket.io Decoder instance
	   *
	   * @return {Object} decoder
	   */

	  var Decoder = /*#__PURE__*/function (_component_emitter_1$) {
	    _inherits(Decoder, _component_emitter_1$);

	    var _super = _createSuper(Decoder);

	    function Decoder() {
	      _classCallCheck(this, Decoder);

	      return _super.call(this);
	    }
	    /**
	     * Decodes an encoded packet string into packet JSON.
	     *
	     * @param {String} obj - encoded packet
	     */


	    _createClass(Decoder, [{
	      key: "add",
	      value: function add(obj) {
	        var packet;

	        if (typeof obj === "string") {
	          packet = this.decodeString(obj);

	          if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
	            // binary packet's json
	            this.reconstructor = new BinaryReconstructor(packet); // no attachments, labeled binary but no binary data to follow

	            if (packet.attachments === 0) {
	              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
	            }
	          } else {
	            // non-binary full packet
	            _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
	          }
	        } else if (is_binary_js_1.isBinary(obj) || obj.base64) {
	          // raw binary data
	          if (!this.reconstructor) {
	            throw new Error("got binary data when not reconstructing a packet");
	          } else {
	            packet = this.reconstructor.takeBinaryData(obj);

	            if (packet) {
	              // received final buffer
	              this.reconstructor = null;

	              _get(_getPrototypeOf(Decoder.prototype), "emitReserved", this).call(this, "decoded", packet);
	            }
	          }
	        } else {
	          throw new Error("Unknown type: " + obj);
	        }
	      }
	      /**
	       * Decode a packet String (JSON data)
	       *
	       * @param {String} str
	       * @return {Object} packet
	       */

	    }, {
	      key: "decodeString",
	      value: function decodeString(str) {
	        var i = 0; // look up type

	        var p = {
	          type: Number(str.charAt(0))
	        };

	        if (PacketType[p.type] === undefined) {
	          throw new Error("unknown packet type " + p.type);
	        } // look up attachments if type binary


	        if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
	          var start = i + 1;

	          while (str.charAt(++i) !== "-" && i != str.length) {}

	          var buf = str.substring(start, i);

	          if (buf != Number(buf) || str.charAt(i) !== "-") {
	            throw new Error("Illegal attachments");
	          }

	          p.attachments = Number(buf);
	        } // look up namespace (if any)


	        if ("/" === str.charAt(i + 1)) {
	          var _start = i + 1;

	          while (++i) {
	            var c = str.charAt(i);
	            if ("," === c) break;
	            if (i === str.length) break;
	          }

	          p.nsp = str.substring(_start, i);
	        } else {
	          p.nsp = "/";
	        } // look up id


	        var next = str.charAt(i + 1);

	        if ("" !== next && Number(next) == next) {
	          var _start2 = i + 1;

	          while (++i) {
	            var _c = str.charAt(i);

	            if (null == _c || Number(_c) != _c) {
	              --i;
	              break;
	            }

	            if (i === str.length) break;
	          }

	          p.id = Number(str.substring(_start2, i + 1));
	        } // look up json data


	        if (str.charAt(++i)) {
	          var payload = tryParse(str.substr(i));

	          if (Decoder.isPayloadValid(p.type, payload)) {
	            p.data = payload;
	          } else {
	            throw new Error("invalid payload");
	          }
	        }

	        debug("decoded %s as %j", str, p);
	        return p;
	      }
	    }, {
	      key: "destroy",
	      value:
	      /**
	       * Deallocates a parser's resources
	       */
	      function destroy() {
	        if (this.reconstructor) {
	          this.reconstructor.finishedReconstruction();
	        }
	      }
	    }], [{
	      key: "isPayloadValid",
	      value: function isPayloadValid(type, payload) {
	        switch (type) {
	          case PacketType.CONNECT:
	            return _typeof(payload) === "object";

	          case PacketType.DISCONNECT:
	            return payload === undefined;

	          case PacketType.CONNECT_ERROR:
	            return typeof payload === "string" || _typeof(payload) === "object";

	          case PacketType.EVENT:
	          case PacketType.BINARY_EVENT:
	            return Array.isArray(payload) && payload.length > 0;

	          case PacketType.ACK:
	          case PacketType.BINARY_ACK:
	            return Array.isArray(payload);
	        }
	      }
	    }]);

	    return Decoder;
	  }(component_emitter_1.Emitter);

	  exports.Decoder = Decoder;

	  function tryParse(str) {
	    try {
	      return JSON.parse(str);
	    } catch (e) {
	      return false;
	    }
	  }
	  /**
	   * A manager of a binary event's 'buffer sequence'. Should
	   * be constructed whenever a packet of type BINARY_EVENT is
	   * decoded.
	   *
	   * @param {Object} packet
	   * @return {BinaryReconstructor} initialized reconstructor
	   */


	  var BinaryReconstructor = /*#__PURE__*/function () {
	    function BinaryReconstructor(packet) {
	      _classCallCheck(this, BinaryReconstructor);

	      this.packet = packet;
	      this.buffers = [];
	      this.reconPack = packet;
	    }
	    /**
	     * Method to be called when binary data received from connection
	     * after a BINARY_EVENT packet.
	     *
	     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	     * @return {null | Object} returns null if more binary data is expected or
	     *   a reconstructed packet object if all buffers have been received.
	     */


	    _createClass(BinaryReconstructor, [{
	      key: "takeBinaryData",
	      value: function takeBinaryData(binData) {
	        this.buffers.push(binData);

	        if (this.buffers.length === this.reconPack.attachments) {
	          // done with buffer list
	          var packet = binary_js_1.reconstructPacket(this.reconPack, this.buffers);
	          this.finishedReconstruction();
	          return packet;
	        }

	        return null;
	      }
	      /**
	       * Cleans up binary packet reconstruction variables.
	       */

	    }, {
	      key: "finishedReconstruction",
	      value: function finishedReconstruction() {
	        this.reconPack = null;
	        this.buffers = [];
	      }
	    }]);

	    return BinaryReconstructor;
	  }();
	})(cjs);

	var on$1 = {};

	Object.defineProperty(on$1, "__esModule", {
	  value: true
	});
	on$1.on = void 0;

	function on(obj, ev, fn) {
	  obj.on(ev, fn);
	  return function subDestroy() {
	    obj.off(ev, fn);
	  };
	}

	on$1.on = on;

	var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(socket, "__esModule", {
	  value: true
	});
	socket.Socket = void 0;
	var socket_io_parser_1 = cjs;
	var on_js_1$1 = on$1;
	var component_emitter_1$1 = componentEmitter;

	var debug_1$1 = __importDefault$1(browser.exports); // debug()


	var debug$1 = debug_1$1["default"]("socket.io-client:socket"); // debug()

	/**
	 * Internal events.
	 * These events can't be emitted by the user.
	 */

	var RESERVED_EVENTS = Object.freeze({
	  connect: 1,
	  connect_error: 1,
	  disconnect: 1,
	  disconnecting: 1,
	  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
	  newListener: 1,
	  removeListener: 1
	});

	var Socket = /*#__PURE__*/function (_component_emitter_1$) {
	  _inherits(Socket, _component_emitter_1$);

	  var _super = _createSuper(Socket);

	  /**
	   * `Socket` constructor.
	   *
	   * @public
	   */
	  function Socket(io, nsp, opts) {
	    var _this;

	    _classCallCheck(this, Socket);

	    _this = _super.call(this);
	    _this.connected = false;
	    _this.disconnected = true;
	    _this.receiveBuffer = [];
	    _this.sendBuffer = [];
	    _this.ids = 0;
	    _this.acks = {};
	    _this.flags = {};
	    _this.io = io;
	    _this.nsp = nsp;

	    if (opts && opts.auth) {
	      _this.auth = opts.auth;
	    }

	    if (_this.io._autoConnect) _this.open();
	    return _this;
	  }
	  /**
	   * Subscribe to open, close and packet events
	   *
	   * @private
	   */


	  _createClass(Socket, [{
	    key: "subEvents",
	    value: function subEvents() {
	      if (this.subs) return;
	      var io = this.io;
	      this.subs = [on_js_1$1.on(io, "open", this.onopen.bind(this)), on_js_1$1.on(io, "packet", this.onpacket.bind(this)), on_js_1$1.on(io, "error", this.onerror.bind(this)), on_js_1$1.on(io, "close", this.onclose.bind(this))];
	    }
	    /**
	     * Whether the Socket will try to reconnect when its Manager connects or reconnects
	     */

	  }, {
	    key: "active",
	    get: function get() {
	      return !!this.subs;
	    }
	    /**
	     * "Opens" the socket.
	     *
	     * @public
	     */

	  }, {
	    key: "connect",
	    value: function connect() {
	      if (this.connected) return this;
	      this.subEvents();
	      if (!this.io["_reconnecting"]) this.io.open(); // ensure open

	      if ("open" === this.io._readyState) this.onopen();
	      return this;
	    }
	    /**
	     * Alias for connect()
	     */

	  }, {
	    key: "open",
	    value: function open() {
	      return this.connect();
	    }
	    /**
	     * Sends a `message` event.
	     *
	     * @return self
	     * @public
	     */

	  }, {
	    key: "send",
	    value: function send() {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      args.unshift("message");
	      this.emit.apply(this, args);
	      return this;
	    }
	    /**
	     * Override `emit`.
	     * If the event is in `events`, it's emitted normally.
	     *
	     * @return self
	     * @public
	     */

	  }, {
	    key: "emit",
	    value: function emit(ev) {
	      if (RESERVED_EVENTS.hasOwnProperty(ev)) {
	        throw new Error('"' + ev + '" is a reserved event name');
	      }

	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      args.unshift(ev);
	      var packet = {
	        type: socket_io_parser_1.PacketType.EVENT,
	        data: args
	      };
	      packet.options = {};
	      packet.options.compress = this.flags.compress !== false; // event ack callback

	      if ("function" === typeof args[args.length - 1]) {
	        var id = this.ids++;
	        debug$1("emitting packet with ack id %d", id);
	        var ack = args.pop();

	        this._registerAckCallback(id, ack);

	        packet.id = id;
	      }

	      var isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
	      var discardPacket = this.flags["volatile"] && (!isTransportWritable || !this.connected);

	      if (discardPacket) {
	        debug$1("discard packet as the transport is not currently writable");
	      } else if (this.connected) {
	        this.packet(packet);
	      } else {
	        this.sendBuffer.push(packet);
	      }

	      this.flags = {};
	      return this;
	    }
	    /**
	     * @private
	     */

	  }, {
	    key: "_registerAckCallback",
	    value: function _registerAckCallback(id, ack) {
	      var _this2 = this;

	      var timeout = this.flags.timeout;

	      if (timeout === undefined) {
	        this.acks[id] = ack;
	        return;
	      } // @ts-ignore


	      var timer = this.io.setTimeoutFn(function () {
	        delete _this2.acks[id];

	        for (var i = 0; i < _this2.sendBuffer.length; i++) {
	          if (_this2.sendBuffer[i].id === id) {
	            debug$1("removing packet with ack id %d from the buffer", id);

	            _this2.sendBuffer.splice(i, 1);
	          }
	        }

	        debug$1("event with ack id %d has timed out after %d ms", id, timeout);
	        ack.call(_this2, new Error("operation has timed out"));
	      }, timeout);

	      this.acks[id] = function () {
	        // @ts-ignore
	        _this2.io.clearTimeoutFn(timer);

	        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	          args[_key3] = arguments[_key3];
	        }

	        ack.apply(_this2, [null].concat(args));
	      };
	    }
	    /**
	     * Sends a packet.
	     *
	     * @param packet
	     * @private
	     */

	  }, {
	    key: "packet",
	    value: function packet(_packet) {
	      _packet.nsp = this.nsp;

	      this.io._packet(_packet);
	    }
	    /**
	     * Called upon engine `open`.
	     *
	     * @private
	     */

	  }, {
	    key: "onopen",
	    value: function onopen() {
	      var _this3 = this;

	      debug$1("transport is open - connecting");

	      if (typeof this.auth == "function") {
	        this.auth(function (data) {
	          _this3.packet({
	            type: socket_io_parser_1.PacketType.CONNECT,
	            data: data
	          });
	        });
	      } else {
	        this.packet({
	          type: socket_io_parser_1.PacketType.CONNECT,
	          data: this.auth
	        });
	      }
	    }
	    /**
	     * Called upon engine or manager `error`.
	     *
	     * @param err
	     * @private
	     */

	  }, {
	    key: "onerror",
	    value: function onerror(err) {
	      if (!this.connected) {
	        this.emitReserved("connect_error", err);
	      }
	    }
	    /**
	     * Called upon engine `close`.
	     *
	     * @param reason
	     * @private
	     */

	  }, {
	    key: "onclose",
	    value: function onclose(reason) {
	      debug$1("close (%s)", reason);
	      this.connected = false;
	      this.disconnected = true;
	      delete this.id;
	      this.emitReserved("disconnect", reason);
	    }
	    /**
	     * Called with socket packet.
	     *
	     * @param packet
	     * @private
	     */

	  }, {
	    key: "onpacket",
	    value: function onpacket(packet) {
	      var sameNamespace = packet.nsp === this.nsp;
	      if (!sameNamespace) return;

	      switch (packet.type) {
	        case socket_io_parser_1.PacketType.CONNECT:
	          if (packet.data && packet.data.sid) {
	            var id = packet.data.sid;
	            this.onconnect(id);
	          } else {
	            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
	          }

	          break;

	        case socket_io_parser_1.PacketType.EVENT:
	          this.onevent(packet);
	          break;

	        case socket_io_parser_1.PacketType.BINARY_EVENT:
	          this.onevent(packet);
	          break;

	        case socket_io_parser_1.PacketType.ACK:
	          this.onack(packet);
	          break;

	        case socket_io_parser_1.PacketType.BINARY_ACK:
	          this.onack(packet);
	          break;

	        case socket_io_parser_1.PacketType.DISCONNECT:
	          this.ondisconnect();
	          break;

	        case socket_io_parser_1.PacketType.CONNECT_ERROR:
	          this.destroy();
	          var err = new Error(packet.data.message); // @ts-ignore

	          err.data = packet.data.data;
	          this.emitReserved("connect_error", err);
	          break;
	      }
	    }
	    /**
	     * Called upon a server event.
	     *
	     * @param packet
	     * @private
	     */

	  }, {
	    key: "onevent",
	    value: function onevent(packet) {
	      var args = packet.data || [];
	      debug$1("emitting event %j", args);

	      if (null != packet.id) {
	        debug$1("attaching ack callback to event");
	        args.push(this.ack(packet.id));
	      }

	      if (this.connected) {
	        this.emitEvent(args);
	      } else {
	        this.receiveBuffer.push(Object.freeze(args));
	      }
	    }
	  }, {
	    key: "emitEvent",
	    value: function emitEvent(args) {
	      if (this._anyListeners && this._anyListeners.length) {
	        var listeners = this._anyListeners.slice();

	        var _iterator = _createForOfIteratorHelper(listeners),
	            _step;

	        try {
	          for (_iterator.s(); !(_step = _iterator.n()).done;) {
	            var listener = _step.value;
	            listener.apply(this, args);
	          }
	        } catch (err) {
	          _iterator.e(err);
	        } finally {
	          _iterator.f();
	        }
	      }

	      _get(_getPrototypeOf(Socket.prototype), "emit", this).apply(this, args);
	    }
	    /**
	     * Produces an ack callback to emit with an event.
	     *
	     * @private
	     */

	  }, {
	    key: "ack",
	    value: function ack(id) {
	      var self = this;
	      var sent = false;
	      return function () {
	        // prevent double callbacks
	        if (sent) return;
	        sent = true;

	        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }

	        debug$1("sending ack %j", args);
	        self.packet({
	          type: socket_io_parser_1.PacketType.ACK,
	          id: id,
	          data: args
	        });
	      };
	    }
	    /**
	     * Called upon a server acknowlegement.
	     *
	     * @param packet
	     * @private
	     */

	  }, {
	    key: "onack",
	    value: function onack(packet) {
	      var ack = this.acks[packet.id];

	      if ("function" === typeof ack) {
	        debug$1("calling ack %s with %j", packet.id, packet.data);
	        ack.apply(this, packet.data);
	        delete this.acks[packet.id];
	      } else {
	        debug$1("bad ack %s", packet.id);
	      }
	    }
	    /**
	     * Called upon server connect.
	     *
	     * @private
	     */

	  }, {
	    key: "onconnect",
	    value: function onconnect(id) {
	      debug$1("socket connected with id %s", id);
	      this.id = id;
	      this.connected = true;
	      this.disconnected = false;
	      this.emitBuffered();
	      this.emitReserved("connect");
	    }
	    /**
	     * Emit buffered events (received and emitted).
	     *
	     * @private
	     */

	  }, {
	    key: "emitBuffered",
	    value: function emitBuffered() {
	      var _this4 = this;

	      this.receiveBuffer.forEach(function (args) {
	        return _this4.emitEvent(args);
	      });
	      this.receiveBuffer = [];
	      this.sendBuffer.forEach(function (packet) {
	        return _this4.packet(packet);
	      });
	      this.sendBuffer = [];
	    }
	    /**
	     * Called upon server disconnect.
	     *
	     * @private
	     */

	  }, {
	    key: "ondisconnect",
	    value: function ondisconnect() {
	      debug$1("server disconnect (%s)", this.nsp);
	      this.destroy();
	      this.onclose("io server disconnect");
	    }
	    /**
	     * Called upon forced client/server side disconnections,
	     * this method ensures the manager stops tracking us and
	     * that reconnections don't get triggered for this.
	     *
	     * @private
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.subs) {
	        // clean subscriptions to avoid reconnections
	        this.subs.forEach(function (subDestroy) {
	          return subDestroy();
	        });
	        this.subs = undefined;
	      }

	      this.io["_destroy"](this);
	    }
	    /**
	     * Disconnects the socket manually.
	     *
	     * @return self
	     * @public
	     */

	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      if (this.connected) {
	        debug$1("performing disconnect (%s)", this.nsp);
	        this.packet({
	          type: socket_io_parser_1.PacketType.DISCONNECT
	        });
	      } // remove socket from pool


	      this.destroy();

	      if (this.connected) {
	        // fire events
	        this.onclose("io client disconnect");
	      }

	      return this;
	    }
	    /**
	     * Alias for disconnect()
	     *
	     * @return self
	     * @public
	     */

	  }, {
	    key: "close",
	    value: function close() {
	      return this.disconnect();
	    }
	    /**
	     * Sets the compress flag.
	     *
	     * @param compress - if `true`, compresses the sending data
	     * @return self
	     * @public
	     */

	  }, {
	    key: "compress",
	    value: function compress(_compress) {
	      this.flags.compress = _compress;
	      return this;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	     * ready to send messages.
	     *
	     * @returns self
	     * @public
	     */

	  }, {
	    key: "volatile",
	    get: function get() {
	      this.flags["volatile"] = true;
	      return this;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
	     * given number of milliseconds have elapsed without an acknowledgement from the server:
	     *
	     * ```
	     * socket.timeout(5000).emit("my-event", (err) => {
	     *   if (err) {
	     *     // the server did not acknowledge the event in the given delay
	     *   }
	     * });
	     * ```
	     *
	     * @returns self
	     * @public
	     */

	  }, {
	    key: "timeout",
	    value: function timeout(_timeout) {
	      this.flags.timeout = _timeout;
	      return this;
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback.
	     *
	     * @param listener
	     * @public
	     */

	  }, {
	    key: "onAny",
	    value: function onAny(listener) {
	      this._anyListeners = this._anyListeners || [];

	      this._anyListeners.push(listener);

	      return this;
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback. The listener is added to the beginning of the listeners array.
	     *
	     * @param listener
	     * @public
	     */

	  }, {
	    key: "prependAny",
	    value: function prependAny(listener) {
	      this._anyListeners = this._anyListeners || [];

	      this._anyListeners.unshift(listener);

	      return this;
	    }
	    /**
	     * Removes the listener that will be fired when any event is emitted.
	     *
	     * @param listener
	     * @public
	     */

	  }, {
	    key: "offAny",
	    value: function offAny(listener) {
	      if (!this._anyListeners) {
	        return this;
	      }

	      if (listener) {
	        var listeners = this._anyListeners;

	        for (var i = 0; i < listeners.length; i++) {
	          if (listener === listeners[i]) {
	            listeners.splice(i, 1);
	            return this;
	          }
	        }
	      } else {
	        this._anyListeners = [];
	      }

	      return this;
	    }
	    /**
	     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	     * e.g. to remove listeners.
	     *
	     * @public
	     */

	  }, {
	    key: "listenersAny",
	    value: function listenersAny() {
	      return this._anyListeners || [];
	    }
	  }]);

	  return Socket;
	}(component_emitter_1$1.Emitter);

	socket.Socket = Socket;

	/**
	 * Expose `Backoff`.
	 */

	var backo2 = Backoff;
	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */


	Backoff.prototype.duration = function () {
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);

	  if (this.jitter) {
	    var rand = Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	  }

	  return Math.min(ms, this.max) | 0;
	};
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */


	Backoff.prototype.reset = function () {
	  this.attempts = 0;
	};
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */


	Backoff.prototype.setMin = function (min) {
	  this.ms = min;
	};
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */


	Backoff.prototype.setMax = function (max) {
	  this.max = max;
	};
	/**
	 * Set the jitter
	 *
	 * @api public
	 */


	Backoff.prototype.setJitter = function (jitter) {
	  this.jitter = jitter;
	};

	var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  Object.defineProperty(o, k2, {
	    enumerable: true,
	    get: function get() {
	      return m[k];
	    }
	  });
	} : function (o, m, k, k2) {
	  if (k2 === undefined) k2 = k;
	  o[k2] = m[k];
	});

	var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
	  Object.defineProperty(o, "default", {
	    enumerable: true,
	    value: v
	  });
	} : function (o, v) {
	  o["default"] = v;
	});

	var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
	  if (mod && mod.__esModule) return mod;
	  var result = {};
	  if (mod != null) for (var k in mod) {
	    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	  }

	  __setModuleDefault(result, mod);

	  return result;
	};

	var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	  return mod && mod.__esModule ? mod : {
	    "default": mod
	  };
	};

	Object.defineProperty(manager, "__esModule", {
	  value: true
	});
	manager.Manager = void 0;
	var engine_io_client_1 = cjs$2;
	var socket_js_1 = socket;

	var parser = __importStar(cjs);

	var on_js_1 = on$1;

	var backo2_1 = __importDefault(backo2);

	var component_emitter_1 = componentEmitter;

	var debug_1 = __importDefault(browser.exports); // debug()


	var debug = debug_1["default"]("socket.io-client:manager"); // debug()

	var Manager = /*#__PURE__*/function (_component_emitter_1$) {
	  _inherits(Manager, _component_emitter_1$);

	  var _super = _createSuper(Manager);

	  function Manager(uri, opts) {
	    var _this;

	    _classCallCheck(this, Manager);

	    var _a;

	    _this = _super.call(this);
	    _this.nsps = {};
	    _this.subs = [];

	    if (uri && "object" === _typeof(uri)) {
	      opts = uri;
	      uri = undefined;
	    }

	    opts = opts || {};
	    opts.path = opts.path || "/socket.io";
	    _this.opts = opts;
	    engine_io_client_1.installTimerFunctions(_assertThisInitialized(_this), opts);

	    _this.reconnection(opts.reconnection !== false);

	    _this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);

	    _this.reconnectionDelay(opts.reconnectionDelay || 1000);

	    _this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);

	    _this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);

	    _this.backoff = new backo2_1["default"]({
	      min: _this.reconnectionDelay(),
	      max: _this.reconnectionDelayMax(),
	      jitter: _this.randomizationFactor()
	    });

	    _this.timeout(null == opts.timeout ? 20000 : opts.timeout);

	    _this._readyState = "closed";
	    _this.uri = uri;

	    var _parser = opts.parser || parser;

	    _this.encoder = new _parser.Encoder();
	    _this.decoder = new _parser.Decoder();
	    _this._autoConnect = opts.autoConnect !== false;
	    if (_this._autoConnect) _this.open();
	    return _this;
	  }

	  _createClass(Manager, [{
	    key: "reconnection",
	    value: function reconnection(v) {
	      if (!arguments.length) return this._reconnection;
	      this._reconnection = !!v;
	      return this;
	    }
	  }, {
	    key: "reconnectionAttempts",
	    value: function reconnectionAttempts(v) {
	      if (v === undefined) return this._reconnectionAttempts;
	      this._reconnectionAttempts = v;
	      return this;
	    }
	  }, {
	    key: "reconnectionDelay",
	    value: function reconnectionDelay(v) {
	      var _a;

	      if (v === undefined) return this._reconnectionDelay;
	      this._reconnectionDelay = v;
	      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
	      return this;
	    }
	  }, {
	    key: "randomizationFactor",
	    value: function randomizationFactor(v) {
	      var _a;

	      if (v === undefined) return this._randomizationFactor;
	      this._randomizationFactor = v;
	      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
	      return this;
	    }
	  }, {
	    key: "reconnectionDelayMax",
	    value: function reconnectionDelayMax(v) {
	      var _a;

	      if (v === undefined) return this._reconnectionDelayMax;
	      this._reconnectionDelayMax = v;
	      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
	      return this;
	    }
	  }, {
	    key: "timeout",
	    value: function timeout(v) {
	      if (!arguments.length) return this._timeout;
	      this._timeout = v;
	      return this;
	    }
	    /**
	     * Starts trying to reconnect if reconnection is enabled and we have not
	     * started reconnecting yet
	     *
	     * @private
	     */

	  }, {
	    key: "maybeReconnectOnOpen",
	    value: function maybeReconnectOnOpen() {
	      // Only try to reconnect if it's the first time we're connecting
	      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
	        // keeps reconnection from firing twice for the same reconnection loop
	        this.reconnect();
	      }
	    }
	    /**
	     * Sets the current transport `socket`.
	     *
	     * @param {Function} fn - optional, callback
	     * @return self
	     * @public
	     */

	  }, {
	    key: "open",
	    value: function open(fn) {
	      var _this2 = this;

	      debug("readyState %s", this._readyState);
	      if (~this._readyState.indexOf("open")) return this;
	      debug("opening %s", this.uri);
	      this.engine = new engine_io_client_1.Socket(this.uri, this.opts);
	      var socket = this.engine;
	      var self = this;
	      this._readyState = "opening";
	      this.skipReconnect = false; // emit `open`

	      var openSubDestroy = on_js_1.on(socket, "open", function () {
	        self.onopen();
	        fn && fn();
	      }); // emit `error`

	      var errorSub = on_js_1.on(socket, "error", function (err) {
	        debug("error");
	        self.cleanup();
	        self._readyState = "closed";

	        _this2.emitReserved("error", err);

	        if (fn) {
	          fn(err);
	        } else {
	          // Only do this if there is no fn to handle the error
	          self.maybeReconnectOnOpen();
	        }
	      });

	      if (false !== this._timeout) {
	        var timeout = this._timeout;
	        debug("connect attempt will timeout after %d", timeout);

	        if (timeout === 0) {
	          openSubDestroy(); // prevents a race condition with the 'open' event
	        } // set timer


	        var timer = this.setTimeoutFn(function () {
	          debug("connect attempt timed out after %d", timeout);
	          openSubDestroy();
	          socket.close(); // @ts-ignore

	          socket.emit("error", new Error("timeout"));
	        }, timeout);

	        if (this.opts.autoUnref) {
	          timer.unref();
	        }

	        this.subs.push(function subDestroy() {
	          clearTimeout(timer);
	        });
	      }

	      this.subs.push(openSubDestroy);
	      this.subs.push(errorSub);
	      return this;
	    }
	    /**
	     * Alias for open()
	     *
	     * @return self
	     * @public
	     */

	  }, {
	    key: "connect",
	    value: function connect(fn) {
	      return this.open(fn);
	    }
	    /**
	     * Called upon transport open.
	     *
	     * @private
	     */

	  }, {
	    key: "onopen",
	    value: function onopen() {
	      debug("open"); // clear old subs

	      this.cleanup(); // mark as open

	      this._readyState = "open";
	      this.emitReserved("open"); // add new subs

	      var socket = this.engine;
	      this.subs.push(on_js_1.on(socket, "ping", this.onping.bind(this)), on_js_1.on(socket, "data", this.ondata.bind(this)), on_js_1.on(socket, "error", this.onerror.bind(this)), on_js_1.on(socket, "close", this.onclose.bind(this)), on_js_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
	    }
	    /**
	     * Called upon a ping.
	     *
	     * @private
	     */

	  }, {
	    key: "onping",
	    value: function onping() {
	      this.emitReserved("ping");
	    }
	    /**
	     * Called with data.
	     *
	     * @private
	     */

	  }, {
	    key: "ondata",
	    value: function ondata(data) {
	      this.decoder.add(data);
	    }
	    /**
	     * Called when parser fully decodes a packet.
	     *
	     * @private
	     */

	  }, {
	    key: "ondecoded",
	    value: function ondecoded(packet) {
	      this.emitReserved("packet", packet);
	    }
	    /**
	     * Called upon socket error.
	     *
	     * @private
	     */

	  }, {
	    key: "onerror",
	    value: function onerror(err) {
	      debug("error", err);
	      this.emitReserved("error", err);
	    }
	    /**
	     * Creates a new socket for the given `nsp`.
	     *
	     * @return {Socket}
	     * @public
	     */

	  }, {
	    key: "socket",
	    value: function socket(nsp, opts) {
	      var socket = this.nsps[nsp];

	      if (!socket) {
	        socket = new socket_js_1.Socket(this, nsp, opts);
	        this.nsps[nsp] = socket;
	      }

	      return socket;
	    }
	    /**
	     * Called upon a socket close.
	     *
	     * @param socket
	     * @private
	     */

	  }, {
	    key: "_destroy",
	    value: function _destroy(socket) {
	      var nsps = Object.keys(this.nsps);

	      for (var _i = 0, _nsps = nsps; _i < _nsps.length; _i++) {
	        var nsp = _nsps[_i];
	        var _socket = this.nsps[nsp];

	        if (_socket.active) {
	          debug("socket %s is still active, skipping close", nsp);
	          return;
	        }
	      }

	      this._close();
	    }
	    /**
	     * Writes a packet.
	     *
	     * @param packet
	     * @private
	     */

	  }, {
	    key: "_packet",
	    value: function _packet(packet) {
	      debug("writing packet %j", packet);
	      var encodedPackets = this.encoder.encode(packet);

	      for (var i = 0; i < encodedPackets.length; i++) {
	        this.engine.write(encodedPackets[i], packet.options);
	      }
	    }
	    /**
	     * Clean up transport subscriptions and packet buffer.
	     *
	     * @private
	     */

	  }, {
	    key: "cleanup",
	    value: function cleanup() {
	      debug("cleanup");
	      this.subs.forEach(function (subDestroy) {
	        return subDestroy();
	      });
	      this.subs.length = 0;
	      this.decoder.destroy();
	    }
	    /**
	     * Close the current socket.
	     *
	     * @private
	     */

	  }, {
	    key: "_close",
	    value: function _close() {
	      debug("disconnect");
	      this.skipReconnect = true;
	      this._reconnecting = false;
	      this.onclose("forced close");
	      if (this.engine) this.engine.close();
	    }
	    /**
	     * Alias for close()
	     *
	     * @private
	     */

	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      return this._close();
	    }
	    /**
	     * Called upon engine close.
	     *
	     * @private
	     */

	  }, {
	    key: "onclose",
	    value: function onclose(reason) {
	      debug("closed due to %s", reason);
	      this.cleanup();
	      this.backoff.reset();
	      this._readyState = "closed";
	      this.emitReserved("close", reason);

	      if (this._reconnection && !this.skipReconnect) {
	        this.reconnect();
	      }
	    }
	    /**
	     * Attempt a reconnection.
	     *
	     * @private
	     */

	  }, {
	    key: "reconnect",
	    value: function reconnect() {
	      var _this3 = this;

	      if (this._reconnecting || this.skipReconnect) return this;
	      var self = this;

	      if (this.backoff.attempts >= this._reconnectionAttempts) {
	        debug("reconnect failed");
	        this.backoff.reset();
	        this.emitReserved("reconnect_failed");
	        this._reconnecting = false;
	      } else {
	        var delay = this.backoff.duration();
	        debug("will wait %dms before reconnect attempt", delay);
	        this._reconnecting = true;
	        var timer = this.setTimeoutFn(function () {
	          if (self.skipReconnect) return;
	          debug("attempting reconnect");

	          _this3.emitReserved("reconnect_attempt", self.backoff.attempts); // check again for the case socket closed in above events


	          if (self.skipReconnect) return;
	          self.open(function (err) {
	            if (err) {
	              debug("reconnect attempt error");
	              self._reconnecting = false;
	              self.reconnect();

	              _this3.emitReserved("reconnect_error", err);
	            } else {
	              debug("reconnect success");
	              self.onreconnect();
	            }
	          });
	        }, delay);

	        if (this.opts.autoUnref) {
	          timer.unref();
	        }

	        this.subs.push(function subDestroy() {
	          clearTimeout(timer);
	        });
	      }
	    }
	    /**
	     * Called upon successful reconnect.
	     *
	     * @private
	     */

	  }, {
	    key: "onreconnect",
	    value: function onreconnect() {
	      var attempt = this.backoff.attempts;
	      this._reconnecting = false;
	      this.backoff.reset();
	      this.emitReserved("reconnect", attempt);
	    }
	  }]);

	  return Manager;
	}(component_emitter_1.Emitter);

	manager.Manager = Manager;

	(function (module, exports) {

	  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function (mod) {
	    return mod && mod.__esModule ? mod : {
	      "default": mod
	    };
	  };

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports["default"] = exports.connect = exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
	  var url_js_1 = url$1;
	  var manager_js_1 = manager;
	  Object.defineProperty(exports, "Manager", {
	    enumerable: true,
	    get: function get() {
	      return manager_js_1.Manager;
	    }
	  });
	  var socket_js_1 = socket;
	  Object.defineProperty(exports, "Socket", {
	    enumerable: true,
	    get: function get() {
	      return socket_js_1.Socket;
	    }
	  });

	  var debug_1 = __importDefault(browser.exports); // debug()


	  var debug = debug_1["default"]("socket.io-client"); // debug()

	  /**
	   * Managers cache.
	   */

	  var cache = {};

	  function lookup(uri, opts) {
	    if (_typeof(uri) === "object") {
	      opts = uri;
	      uri = undefined;
	    }

	    opts = opts || {};
	    var parsed = url_js_1.url(uri, opts.path || "/socket.io");
	    var source = parsed.source;
	    var id = parsed.id;
	    var path = parsed.path;
	    var sameNamespace = cache[id] && path in cache[id]["nsps"];
	    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
	    var io;

	    if (newConnection) {
	      debug("ignoring socket cache for %s", source);
	      io = new manager_js_1.Manager(source, opts);
	    } else {
	      if (!cache[id]) {
	        debug("new io instance for %s", source);
	        cache[id] = new manager_js_1.Manager(source, opts);
	      }

	      io = cache[id];
	    }

	    if (parsed.query && !opts.query) {
	      opts.query = parsed.queryKey;
	    }

	    return io.socket(parsed.path, opts);
	  }

	  exports.io = lookup;
	  exports.connect = lookup;
	  exports["default"] = lookup; // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
	  // namespace (e.g. `io.connect(...)`), for backward compatibility

	  Object.assign(lookup, {
	    Manager: manager_js_1.Manager,
	    Socket: socket_js_1.Socket,
	    io: lookup,
	    connect: lookup
	  });
	  /**
	   * Protocol version.
	   *
	   * @public
	   */

	  var socket_io_parser_1 = cjs;
	  Object.defineProperty(exports, "protocol", {
	    enumerable: true,
	    get: function get() {
	      return socket_io_parser_1.protocol;
	    }
	  });
	  module.exports = lookup;
	})(cjs$3, cjs$3.exports);

	var domain; // This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).

	function EventHandlers() {}

	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	// require('events') === require('events').EventEmitter

	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.usingDomains = false;
	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.

	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function () {
	  this.domain = null;

	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active ) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	}; // Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.


	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	}; // These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.


	function emitNone(handler, isFn, self) {
	  if (isFn) handler.call(self);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self);
	    }
	  }
	}

	function emitOne(handler, isFn, self, arg1) {
	  if (isFn) handler.call(self, arg1);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1);
	    }
	  }
	}

	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn) handler.call(self, arg1, arg2);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1, arg2);
	    }
	  }
	}

	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn) handler.call(self, arg1, arg2, arg3);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1, arg2, arg3);
	    }
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn) handler.apply(self, args);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);

	    for (var i = 0; i < len; ++i) {
	      listeners[i].apply(self, args);
	    }
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = type === 'error';
	  events = this._events;
	  if (events) doError = doError && events.error == null;else if (!doError) return false;
	  domain = this.domain; // If there is no 'error' event listener then throw.

	  if (doError) {
	    er = arguments[1];

	    if (domain) {
	      if (!er) er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }

	    return false;
	  }

	  handler = events[type];
	  if (!handler) return false;
	  var isFn = typeof handler === 'function';
	  len = arguments.length;

	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;

	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;

	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;

	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower

	    default:
	      args = new Array(len - 1);

	      for (i = 1; i < len; i++) {
	        args[i - 1] = arguments[i];
	      }

	      emitMany(handler, isFn, this, args);
	  }
	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = target._events;

	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object

	      events = target._events;
	    }

	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    } // Check for listener leak


	    if (!existing.warned) {
	      m = $getMaxListeners(target);

	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}

	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener = function prependListener(type, listener) {
	  return _addListener(this, type, listener, true);
	};

	function _onceWrap(target, type, listener) {
	  var fired = false;

	  function g() {
	    target.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }

	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.prependListener(type, _onceWrap(this, type, listener));
	  return this;
	}; // emits a 'removeListener' event iff the listener was removed


	EventEmitter.prototype.removeListener = function removeListener(type, listener) {
	  var list, events, position, i, originalListener;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = this._events;
	  if (!events) return this;
	  list = events[type];
	  if (!list) return this;

	  if (list === listener || list.listener && list.listener === listener) {
	    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
	      delete events[type];
	      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
	    }
	  } else if (typeof list !== 'function') {
	    position = -1;

	    for (i = list.length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        originalListener = list[i].listener;
	        position = i;
	        break;
	      }
	    }

	    if (position < 0) return this;

	    if (list.length === 1) {
	      list[0] = undefined;

	      if (--this._eventsCount === 0) {
	        this._events = new EventHandlers();
	        return this;
	      } else {
	        delete events[type];
	      }
	    } else {
	      spliceOne(list, position);
	    }

	    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
	  var listeners, events;
	  events = this._events;
	  if (!events) return this; // not listening for removeListener, no need to emit

	  if (!events.removeListener) {
	    if (arguments.length === 0) {
	      this._events = new EventHandlers();
	      this._eventsCount = 0;
	    } else if (events[type]) {
	      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
	    }

	    return this;
	  } // emit removeListener for all listeners on all events


	  if (arguments.length === 0) {
	    var keys = Object.keys(events);

	    for (var i = 0, key; i < keys.length; ++i) {
	      key = keys[i];
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }

	    this.removeAllListeners('removeListener');
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	    return this;
	  }

	  listeners = events[type];

	  if (typeof listeners === 'function') {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    do {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    } while (listeners[0]);
	  }

	  return this;
	};

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;
	  if (!events) ret = [];else {
	    evlistener = events[type];
	    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
	  }
	  return ret;
	};

	EventEmitter.listenerCount = function (emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;

	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	}; // About 1.5x faster than the two-arg version of Array#splice().


	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }

	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);

	  while (i--) {
	    copy[i] = arr[i];
	  }

	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);

	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }

	  return ret;
	}

	var events = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': EventEmitter,
		EventEmitter: EventEmitter
	});

	var require$$2 = /*@__PURE__*/getAugmentedNamespace(events);

	(function (exports) {

	  var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
	    var _extendStatics = function extendStatics(d, b) {
	      _extendStatics = Object.setPrototypeOf || {
	        __proto__: []
	      } instanceof Array && function (d, b) {
	        d.__proto__ = b;
	      } || function (d, b) {
	        for (var p in b) {
	          if (b.hasOwnProperty(p)) d[p] = b[p];
	        }
	      };

	      return _extendStatics(d, b);
	    };

	    return function (d, b) {
	      _extendStatics(d, b);

	      function __() {
	        this.constructor = d;
	      }

	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	  }();

	  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
	    function adopt(value) {
	      return value instanceof P ? value : new P(function (resolve) {
	        resolve(value);
	      });
	    }

	    return new (P || (P = Promise))(function (resolve, reject) {
	      function fulfilled(value) {
	        try {
	          step(generator.next(value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function rejected(value) {
	        try {
	          step(generator["throw"](value));
	        } catch (e) {
	          reject(e);
	        }
	      }

	      function step(result) {
	        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
	      }

	      step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	  };

	  var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
	    var _ = {
	      label: 0,
	      sent: function sent() {
	        if (t[0] & 1) throw t[1];
	        return t[1];
	      },
	      trys: [],
	      ops: []
	    },
	        f,
	        y,
	        t,
	        g;
	    return g = {
	      next: verb(0),
	      "throw": verb(1),
	      "return": verb(2)
	    }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
	      return this;
	    }), g;

	    function verb(n) {
	      return function (v) {
	        return step([n, v]);
	      };
	    }

	    function step(op) {
	      if (f) throw new TypeError("Generator is already executing.");

	      while (_) {
	        try {
	          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	          if (y = 0, t) op = [op[0] & 2, t.value];

	          switch (op[0]) {
	            case 0:
	            case 1:
	              t = op;
	              break;

	            case 4:
	              _.label++;
	              return {
	                value: op[1],
	                done: false
	              };

	            case 5:
	              _.label++;
	              y = op[1];
	              op = [0];
	              continue;

	            case 7:
	              op = _.ops.pop();

	              _.trys.pop();

	              continue;

	            default:
	              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
	                _ = 0;
	                continue;
	              }

	              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
	                _.label = op[1];
	                break;
	              }

	              if (op[0] === 6 && _.label < t[1]) {
	                _.label = t[1];
	                t = op;
	                break;
	              }

	              if (t && _.label < t[2]) {
	                _.label = t[2];

	                _.ops.push(op);

	                break;
	              }

	              if (t[2]) _.ops.pop();

	              _.trys.pop();

	              continue;
	          }

	          op = body.call(thisArg, _);
	        } catch (e) {
	          op = [6, e];
	          y = 0;
	        } finally {
	          f = t = 0;
	        }
	      }

	      if (op[0] & 5) throw op[1];
	      return {
	        value: op[0] ? op[1] : void 0,
	        done: true
	      };
	    }
	  };

	  var __values = commonjsGlobal && commonjsGlobal.__values || function (o) {
	    var s = typeof Symbol === "function" && Symbol.iterator,
	        m = s && o[s],
	        i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	      next: function next() {
	        if (o && i >= o.length) o = void 0;
	        return {
	          value: o && o[i++],
	          done: !o
	        };
	      }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	  };

	  var __read = commonjsGlobal && commonjsGlobal.__read || function (o, n) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator];
	    if (!m) return o;
	    var i = m.call(o),
	        r,
	        ar = [],
	        e;

	    try {
	      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
	        ar.push(r.value);
	      }
	    } catch (error) {
	      e = {
	        error: error
	      };
	    } finally {
	      try {
	        if (r && !r.done && (m = i["return"])) m.call(i);
	      } finally {
	        if (e) throw e.error;
	      }
	    }

	    return ar;
	  };

	  var __spread = commonjsGlobal && commonjsGlobal.__spread || function () {
	    for (var ar = [], i = 0; i < arguments.length; i++) {
	      ar = ar.concat(__read(arguments[i]));
	    }

	    return ar;
	  };

	  exports.__esModule = true;
	  var socket_io_client_1 = cjs$3.exports;
	  var debug_1 = browser.exports;
	  var events_1 = require$$2;
	  var s = debug_1["default"]("Socket");
	  var p = debug_1["default"]("Peer");
	  var rp = debug_1["default"]("Remote");

	  var Bun =
	  /** @class */
	  function (_super) {
	    __extends(Bun, _super);

	    function Bun(_a) {
	      var apiKey = _a.apiKey,
	          hasVideo = _a.hasVideo,
	          hasAudio = _a.hasAudio;

	      var _this = _super.call(this) || this;

	      _this.join = function (room) {
	        return __awaiter(_this, void 0, void 0, function () {
	          var _this = this;

	          return __generator(this, function (_a) {
	            switch (_a.label) {
	              case 0:
	                this.room = room;
	                return [4
	                /*yield*/
	                , new Promise(function (resolve, reject) {
	                  s("Joining Room");

	                  _this.socket.emit("join-room", room, function (peerList) {
	                    s("Room Joined", peerList);

	                    if (peerList.length > 1) {
	                      s("Peers List Recieved");
	                      peerList.forEach(function (pid) {
	                        if (pid !== _this.socket.id) {
	                          try {
	                            _this.peers.set(pid, new RTCPeerConnection({
	                              iceServers: _this.iceServers
	                            }));
	                          } catch (error) {
	                            throw new Error(error);
	                          }

	                          var newPeer_1 = _this.peers.get(pid);

	                          p("Adding Tracks");

	                          _this.streams.getTracks().forEach(function (track) {
	                            newPeer_1.addTrack(track, _this.streams);
	                          });

	                          p("Tracks Added");

	                          newPeer_1.ontrack = function (event) {
	                            var to = event.target.to;

	                            _this.remoteStreams.set(to, event.streams);

	                            _this.emit("new-remote-track", event);
	                          };

	                          newPeer_1.onicecandidate = function (event) {
	                            if (event.candidate) {
	                              p("ICE Candidate", event);
	                              var pe = event.currentTarget;

	                              _this.socket.emit("data", {
	                                from: pe.from,
	                                to: pe.to,
	                                data: {
	                                  candidate: event.candidate
	                                }
	                              });
	                            }
	                          };

	                          newPeer_1.onnegotiationneeded = function (event) {
	                            return __awaiter(_this, void 0, void 0, function () {
	                              var pe, offer, error_1;
	                              return __generator(this, function (_a) {
	                                switch (_a.label) {
	                                  case 0:
	                                    pe = event.currentTarget;
	                                    _a.label = 1;

	                                  case 1:
	                                    _a.trys.push([1, 4, 5, 6]);

	                                    pe.makingOffer = true;
	                                    p("Negotiation needed", event);
	                                    return [4
	                                    /*yield*/
	                                    , pe.createOffer()];

	                                  case 2:
	                                    offer = _a.sent();
	                                    p("Offer Generated", offer);
	                                    if (pe.signalingState != "stable") return [2
	                                    /*return*/
	                                    ];
	                                    return [4
	                                    /*yield*/
	                                    , pe.setLocalDescription(offer)];

	                                  case 3:
	                                    _a.sent();

	                                    p("Local Description Set", pe.localDescription);
	                                    pe.socket.emit("data", {
	                                      to: pe.to,
	                                      from: pe.from,
	                                      data: {
	                                        sdp: pe.localDescription
	                                      }
	                                    });
	                                    return [3
	                                    /*break*/
	                                    , 6];

	                                  case 4:
	                                    error_1 = _a.sent();
	                                    console.error(new Error(error_1));
	                                    return [3
	                                    /*break*/
	                                    , 6];

	                                  case 5:
	                                    pe.makingOffer = false;
	                                    return [7
	                                    /*endfinally*/
	                                    ];

	                                  case 6:
	                                    return [2
	                                    /*return*/
	                                    ];
	                                }
	                              });
	                            });
	                          };

	                          newPeer_1.from = _this.socket.id;
	                          newPeer_1.to = pid;
	                          newPeer_1.initiator = true;
	                          newPeer_1.ignoreOffer = false;
	                          newPeer_1.makingOffer = false;
	                          newPeer_1.socket = _this.socket;
	                        }
	                      });
	                      p("Establishing Peer Connection to Remote Peer.");
	                      resolve();
	                    }
	                  });
	                })];

	              case 1:
	                _a.sent();

	                return [2
	                /*return*/
	                ];
	            }
	          });
	        });
	      };

	      _this.addMediaTrack = function (track) {
	        var e_1, _a;

	        _this.streams.addTrack(track);

	        if (_this.peers.size > 0) {
	          try {
	            for (var _b = __values(_this.peers), _c = _b.next(); !_c.done; _c = _b.next()) {
	              var _d = __read(_c.value, 2),
	                  id = _d[0],
	                  peer = _d[1];

	              peer.addTrack(track);
	            }
	          } catch (e_1_1) {
	            e_1 = {
	              error: e_1_1
	            };
	          } finally {
	            try {
	              if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
	            } finally {
	              if (e_1) throw e_1.error;
	            }
	          }
	        }
	      };

	      _this.addMedia = function (stream) {
	        stream.getTracks().forEach(function (track) {
	          return _this.addMediaTrack(track);
	        });
	        p("Added new Stream", _this.peers);
	      };

	      _this.removeMediaTrack = function (track) {
	        var e_2, _a;

	        var _loop_1 = function _loop_1(id, peer) {
	          peer.getSenders().forEach(function (rtpSender) {
	            var _a;

	            if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === track.kind) {
	              peer.removeTrack(rtpSender);

	              _this.socket.emit("track-update", {
	                id: peer.from,
	                update: "end",
	                room: _this.room
	              });
	            }
	          });
	        };

	        try {
	          for (var _b = __values(_this.peers), _c = _b.next(); !_c.done; _c = _b.next()) {
	            var _d = __read(_c.value, 2),
	                id = _d[0],
	                peer = _d[1];

	            _loop_1(id, peer);
	          }
	        } catch (e_2_1) {
	          e_2 = {
	            error: e_2_1
	          };
	        } finally {
	          try {
	            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
	          } finally {
	            if (e_2) throw e_2.error;
	          }
	        }

	        _this.streams.removeTrack(track);
	      };

	      _this.removeMedia = function (stream) {
	        stream.getTracks().forEach(function (track) {
	          return _this.removeMediaTrack(track);
	        });
	        p("Removed Stream", stream);
	      };

	      _this.getMedia = function (video, audio) {
	        return navigator.mediaDevices.getUserMedia({
	          video: video,
	          audio: audio
	        }).then(function (stream) {
	          p(stream);

	          _this.addStream(stream);

	          _this.addMedia(stream);
	        })["catch"](console.error);
	      };

	      _this.screenShare = function () {
	        return navigator.mediaDevices // @ts-ignore
	        .getDisplayMedia({
	          video: true,
	          audio: true
	        }).then(function (stream) {
	          var track = stream.getVideoTracks()[0];
	          p("Sharing Screen", track);

	          track.onended = function (ev) {
	            p("Stop Sharing Screen");

	            _this.emit("screen-share-ended", ev);

	            _this.switchToCam();
	          };

	          _this.removeMedia(_this.streams);

	          _this.addMedia(stream);

	          _this.addStream(stream);
	        })["catch"](console.error);
	      };

	      _this.switchToCam = function () {
	        _this.removeMedia(_this.streams);

	        _this.getMedia(_this.media.video, _this.media.audio);
	      };

	      _this.addStream = function (stream) {
	        var video = document.querySelector(".self");
	        video.srcObject = stream;

	        video.onloadedmetadata = function (ev) {
	          video.play();
	        };
	      };

	      _this.stopMedia = function (mediaType, peerId) {
	        if (mediaType) {
	          switch (mediaType) {
	            case "video":
	              _this.streams.getVideoTracks().forEach(function (track) {
	                _this.removeMediaTrack(track);

	                var video = document.querySelector(".self");
	                video.srcObject = null;
	                track.stop();
	              });

	              break;

	            case "audio":
	              _this.streams.getAudioTracks().forEach(function (track) {
	                _this.removeMediaTrack(track);

	                track.stop();
	              });

	              break;

	            case "screen":
	              _this.streams.getVideoTracks().forEach(function (track) {
	                _this.removeMediaTrack(track);

	                track.stop();
	              });

	              break;

	            case "all":
	              _this.streams.getTracks().forEach(function (track) {
	                _this.removeMediaTrack(track);

	                var video = document.querySelector(".self");
	                video.srcObject = null;
	                track.stop();
	              });

	              break;
	          }
	        }

	        if (peerId) {
	          _this.peers.get(peerId).getSenders().forEach(function (rtpSender) {
	            var _a, _b;

	            if (mediaType) {
	              if (((_a = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _a === void 0 ? void 0 : _a.kind) === mediaType) rtpSender.track.stop();
	            } else {
	              (_b = rtpSender === null || rtpSender === void 0 ? void 0 : rtpSender.track) === null || _b === void 0 ? void 0 : _b.stop();
	            }
	          });
	        }
	      };

	      _this.createPoster = function (name) {
	        var canv = document.createElement("canvas");
	        canv.id = "canv";
	        canv.height = 600;
	        canv.width = 800;
	        document.body.appendChild(canv);
	        var canve = document.getElementById("canv");
	        var ctx = canve.getContext("2d");
	        ctx.fillStyle = "#1C1917";
	        ctx.fillRect(0, 0, 800, 600);
	        ctx.fillStyle = "#FAFAF9";
	        ctx.textAlign = "center";
	        ctx.font = "64px sans-serif";
	        ctx.fillText(name, 400, 300);
	        var uri = canv.toDataURL();
	        document.body.removeChild(canv);
	        return uri;
	      };

	      _this.apiKey = apiKey;
	      _this.hasAudio = hasAudio || true;
	      _this.hasVideo = hasVideo || true;
	      _this.media = {
	        video: _this.hasVideo,
	        audio: _this.hasAudio
	      };

	      _this.getMedia(_this.hasVideo, _this.hasAudio);

	      _this.name = btoa(Math.random().toString()).substring(10, 5);
	      _this.poster = _this.createPoster(_this.name);
	      _this.streams = new MediaStream();
	      _this.room = "";
	      _this.buffer = 50;
	      _this.remoteStreams = new Map();
	      _this.peers = new Map();
	      _this.iceServers = [];
	      _this.socket = socket_io_client_1.io("https://p2p.6buns.com/", {
	        transports: ["websocket", "polling"],
	        auth: {
	          key: _this.apiKey
	        }
	      });

	      _this.socket.on("connection", function (id, users, iceServers) {
	        s("Socket Connected", {
	          id: id,
	          users: users,
	          iceServers: iceServers
	        });
	        _this.iceServers = __spread(iceServers);
	      });

	      _this.socket.on("new-peer-connected", function (id) {
	        if (id !== _this.socket.id) {
	          s("New Peer Connected. Waiting for an offer");

	          _this.peers.set(id, new RTCPeerConnection({
	            iceServers: _this.iceServers
	          }));

	          var peer_1 = _this.peers.get(id);

	          rp("Adding Tracks");

	          _this.streams.getTracks().forEach(function (track) {
	            peer_1.addTrack(track, _this.streams);
	          });

	          rp("Tracks Added");

	          peer_1.ontrack = function (event) {
	            var to = event.target.to;

	            _this.remoteStreams.set(to, event.streams);

	            _this.emit("new-remote-track", event);
	          };

	          peer_1.onicecandidate = function (event) {
	            if (event.candidate) {
	              rp("ICE Candidate", event);
	              var pe = event.currentTarget;

	              _this.socket.emit("data", {
	                from: pe.from,
	                to: pe.to,
	                data: {
	                  candidate: event.candidate
	                }
	              });
	            }
	          };

	          peer_1.onnegotiationneeded = function (event) {
	            return __awaiter(_this, void 0, void 0, function () {
	              var pe, offer, error_2;
	              return __generator(this, function (_a) {
	                switch (_a.label) {
	                  case 0:
	                    pe = event.currentTarget;
	                    _a.label = 1;

	                  case 1:
	                    _a.trys.push([1, 4, 5, 6]);

	                    pe.makingOffer = true;
	                    rp("Negotiation needed", event);
	                    return [4
	                    /*yield*/
	                    , pe.createOffer()];

	                  case 2:
	                    offer = _a.sent();
	                    rp("Offer Generated", offer);
	                    if (pe.signalingState != "stable") return [2
	                    /*return*/
	                    ];
	                    return [4
	                    /*yield*/
	                    , pe.setLocalDescription(offer)];

	                  case 3:
	                    _a.sent();

	                    rp("Local Description Set", pe.localDescription);
	                    pe.socket.emit("data", {
	                      to: pe.to,
	                      from: pe.from,
	                      data: {
	                        sdp: pe.localDescription
	                      }
	                    });
	                    return [3
	                    /*break*/
	                    , 6];

	                  case 4:
	                    error_2 = _a.sent();
	                    console.error(new Error(error_2));
	                    return [3
	                    /*break*/
	                    , 6];

	                  case 5:
	                    pe.makingOffer = false;
	                    return [7
	                    /*endfinally*/
	                    ];

	                  case 6:
	                    return [2
	                    /*return*/
	                    ];
	                }
	              });
	            });
	          };

	          peer_1.from = _this.socket.id;
	          peer_1.to = id;
	          peer_1.initiator = false;
	          peer_1.ignoreOffer = false;
	          peer_1.makingOffer = false;
	          peer_1.socket = _this.socket;
	        }
	      });

	      _this.socket.on("data", function (_a) {
	        var to = _a.to,
	            from = _a.from,
	            _b = _a.data,
	            sdp = _b.sdp,
	            candidate = _b.candidate;
	        return __awaiter(_this, void 0, void 0, function () {
	          var peer, offerCollision, answer, e_3, error_3;
	          return __generator(this, function (_c) {
	            switch (_c.label) {
	              case 0:
	                if (!(this.peers.has(from) && to === this.socket.id)) return [3
	                /*break*/
	                , 15];
	                _c.label = 1;

	              case 1:
	                _c.trys.push([1, 14,, 15]);

	                peer = this.peers.get(from);
	                if (!sdp) return [3
	                /*break*/
	                , 9];
	                offerCollision = sdp.type === "offer" && (peer.makingOffer || peer.signalingState !== "stable");
	                peer.ignoreOffer = !peer.initiator && offerCollision;
	                if (peer.ignoreOffer) return [2
	                /*return*/
	                ];
	                if (!offerCollision) return [3
	                /*break*/
	                , 3];
	                return [4
	                /*yield*/
	                , Promise.all([peer.setLocalDescription({
	                  type: "rollback"
	                }), peer.setRemoteDescription(sdp)])];

	              case 2:
	                _c.sent();

	                return [3
	                /*break*/
	                , 5];

	              case 3:
	                p("Answer Recieved", sdp);
	                return [4
	                /*yield*/
	                , peer.setRemoteDescription(sdp)];

	              case 4:
	                _c.sent();

	                _c.label = 5;

	              case 5:
	                if (!(sdp.type === "offer")) return [3
	                /*break*/
	                , 8];
	                return [4
	                /*yield*/
	                , peer.createAnswer()];

	              case 6:
	                answer = _c.sent();
	                p("Answer Created", answer);
	                return [4
	                /*yield*/
	                , peer.setLocalDescription(answer)];

	              case 7:
	                _c.sent();

	                p("Local description set as answer", peer.localDescription);
	                this.socket.emit("data", {
	                  to: from,
	                  from: to,
	                  data: {
	                    sdp: peer.localDescription
	                  }
	                });
	                _c.label = 8;

	              case 8:
	                return [3
	                /*break*/
	                , 13];

	              case 9:
	                if (!candidate) return [3
	                /*break*/
	                , 13];
	                _c.label = 10;

	              case 10:
	                _c.trys.push([10, 12,, 13]);

	                return [4
	                /*yield*/
	                , peer.addIceCandidate(candidate)];

	              case 11:
	                _c.sent();

	                p("Added Ice Candidate", candidate);
	                return [3
	                /*break*/
	                , 13];

	              case 12:
	                e_3 = _c.sent();
	                if (!peer.ignoreOffer) p("Error adding IceCandidate", e_3);else p("Should be ignored", e_3, candidate, this.peers.has(from), to === this.socket.id);
	                return [3
	                /*break*/
	                , 13];

	              case 13:
	                return [3
	                /*break*/
	                , 15];

	              case 14:
	                error_3 = _c.sent();
	                s("Socket Error", error_3);
	                return [3
	                /*break*/
	                , 15];

	              case 15:
	                return [2
	                /*return*/
	                ];
	            }
	          });
	        });
	      });

	      _this.socket.on("track-update", function (_a) {
	        var id = _a.id,
	            update = _a.update;
	        s("Track Update Recieved", id, update);

	        switch (update) {
	          case "mute":
	            _this.emit("remote-peer-track-muted", id);

	            break;

	          case "unmute":
	            _this.emit("remote-peer-track-unmuted", id);

	            break;

	          case "end":
	            _this.emit("remote-peer-track-ended", id);

	            break;
	        }
	      });

	      _this.socket.on("peer-disconneted", function (id) {
	        var peer = _this.peers.get(id);

	        s("Socket Disconnected", peer);

	        _this.emit("peer-left", peer.to);

	        peer.close();
	        rp("Remote Peer Connection Closed");

	        _this.peers["delete"](id);

	        rp("Remote Peer Removed");
	      });

	      return _this;
	    }

	    return Bun;
	  }(events_1.EventEmitter);

	  exports["default"] = Bun;
	})(client);

	var index = /*@__PURE__*/getDefaultExportFromCjs(client);

	return index;

})();
