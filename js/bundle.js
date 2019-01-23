/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(7);
	__webpack_require__(2);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(4);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);
	module.exports = __webpack_require__(10);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var ClientApp = __webpack_require__(2).ClientApp;

	(function AppEntryPoint() {
	    window.clientApp = new ClientApp();
	    clientApp.run();
	})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;
	var DataManager = __webpack_require__(5).DataManager;
	var Chart = __webpack_require__(7).Chart;
	var MainView = __webpack_require__(11).MainView;
	var log = __webpack_require__(6).log;

	var logPrefix = 'APP: ';
	// disableLogging = true;

	var ClientApp = function (params) {
	    this.mainView = null;
		this.chart = null;
		this.dataManager = null;
		log(logPrefix + "Initialized");
	};

	Utils.extend(ClientApp, EventDriven);

	ClientApp.prototype.run = function () {
		Utils.getElement('body').innerHTML = '';
		Utils.getElement('title').innerText = "METEO ARCHIVE";
		Utils.on('body', 'contextmenu', function (e) {
	        Utils.no(e, true);
	    });

		this.mainView = new MainView({
			app: this,
			className: 'meteo-main-view',
			appendTo: Utils.getElement('body')
		});
		log(logPrefix + "MainView created");
		this.dataManager = new DataManager({
			app: this
		});
		log(logPrefix + "DataManager created");
		this.chart = new Chart({
			app: this
		});


		this.bindEvents();
		log(logPrefix + "Events Binded");

		// initiate processing engine with default settings
		this.mainView.triggerOnChange();
	};

	ClientApp.prototype.bindEvents = function () {
		this.mainView.on('change', this.onChange.bind(this));
	};

	ClientApp.prototype.onChange = function (e) {
		var _this = this;
		log(logPrefix + 'MainView EVENT "change"', e);
		var mode = e.mode;
		var req = {
			table: e.table,
			from: Number(e.from),
			to: Number(e.to)
		};
		log(logPrefix + 'Request to DataManager', req);
		this.dataManager.get(req, function (data, from, to) {
			log(logPrefix + 'Response from DataManager', data);
			_this.chart.setData(data, e.table, from, to, mode);
		});
	};

	exports.ClientApp = ClientApp;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	//----------
	// CanvasRenderingContext2D.prototype upgrade
	//----------
	var CanvasRenderingContext2D_prototype_moveTo = CanvasRenderingContext2D.prototype.moveTo;
	var CanvasRenderingContext2D_prototype_lineTo = CanvasRenderingContext2D.prototype.lineTo;
	var CanvasRenderingContext2D_prototype_fillRect = CanvasRenderingContext2D.prototype.fillRect;
	var CanvasRenderingContext2D_prototype_strokeRect = CanvasRenderingContext2D.prototype.strokeRect;
	var CanvasRenderingContext2D_prototype_rect = CanvasRenderingContext2D.prototype.rect;
	var CanvasRenderingContext2D_prototype_drawImage = CanvasRenderingContext2D.prototype.drawImage;
	var CanvasRenderingContext2D_prototype_clearRect = CanvasRenderingContext2D.prototype.clearRect;
	var CanvasRenderingContext2D_prototype_arcTo = CanvasRenderingContext2D.prototype.arcTo;

	CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
	    x = x > 0 ? ~~(x) : x;
	    y = y > 0 ? ~~(y) : y;
	    if (this.lineWidth % 2 !== 0) {
	        x += 0.5;
	        y += 0.5;
	    }
	    CanvasRenderingContext2D_prototype_moveTo.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.lineTo = function (x, y) {
	    x = x > 0 ? ~~(x) : x;
	    y = y > 0 ? ~~(y) : y;
	    if (this.lineWidth % 2 !== 0) {
	        x += 0.5;
	        y += 0.5;
	    }
	    CanvasRenderingContext2D_prototype_lineTo.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.fillRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_fillRect.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.strokeRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_strokeRect.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.rect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_rect.apply(this, arguments);
	};

	/** 
	 * Draws a rounded rectangle using the current state of the canvas.  
	 * If you omit the last three params, it will draw a rectangle  
	 * outline with a 5 pixel border radius  
	 * @param {Number} x The top left x coordinate 
	 * @param {Number} y The top left y coordinate  
	 * @param {Number} width The width of the rectangle  
	 * @param {Number} height The height of the rectangle 
	 * @param {Object} radius All corner radii. Defaults to 0,0,0,0; 
	 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false. 
	 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true. 
	 */
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
	    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
	    if (typeof stroke == "undefined") {
	        stroke = true;
	    }
	    var side;
	    if (typeof radius === "object") {
	        for (side in radius) {
	            cornerRadius[side] = radius[side];
	        }
	    }
	    if (typeof radius === "number") {
	        for (side in cornerRadius) {
	            cornerRadius[side] = radius;
	        }
	    }

	    this.beginPath();
	    this.moveTo(x + cornerRadius.upperLeft, y);
	    this.lineTo(x + width - cornerRadius.upperRight, y);
	    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
	    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
	    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
	    this.lineTo(x + cornerRadius.lowerLeft, y + height);
	    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
	    this.lineTo(x, y + cornerRadius.upperLeft);
	    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
	    this.closePath();
	    if (stroke) {
	        this.stroke();
	    }
	    if (fill) {
	        this.fill();
	    }
	};

	CanvasRenderingContext2D.prototype.drawImage = function (c, sx, sy, sw, sh, dx, dy, dw, dh) {
	    sx = ~~(sx);
	    sy = ~~(sy);
	    dx = ~~(dx);
	    dy = ~~(dy);

	    if (sx < 0) {
	        sw = sw + sx;
	        sx = 0;
	    }

	    if (sy < 0) {
	        sh = sh + sy;
	        sy = 0;
	    }

	    if (dx < 0) {
	        dw = dw + dx;
	        dx = 0;
	    }

	    if (dy < 0) {
	        dh = dh + dy;
	        dy = 0;
	    }

	    sw = Math.max(1, Math.floor(sw));
	    sh = Math.max(1, Math.floor(sh));
	    dw = Math.max(1, Math.floor(dw));
	    dh = Math.max(1, Math.floor(dh));

	    CanvasRenderingContext2D_prototype_drawImage.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.clearRect = function (x, y, w, h) {
	    x = ~~(x);
	    y = ~~(y);
	    w = ~~(w);
	    h = ~~(h);
	    CanvasRenderingContext2D_prototype_clearRect.apply(this, arguments);
	};

	CanvasRenderingContext2D.prototype.arcTo = function (x1, y1, x2, y2, r) {
	    x1 = ~~(x1);
	    y1 = ~~(y1);
	    x2 = ~~(x2);
	    y2 = ~~(y2);
	    if (this.lineWidth % 2 !== 0) {
	        x1 += 0.5;
	        y1 += 0.5;
	        x2 += 0.5;
	        y2 += 0.5;
	    }
	    CanvasRenderingContext2D_prototype_arcTo.apply(this, arguments);
	};

	//----------
	// add support dashed lines to CanvasRenderingContext2D.prototype
	//----------
	try {
	    CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen, color, width, cap) {
	        this.save();
	        this.beginPath();
	        this.strokeStyle = color || this.strokeStyle || 'red';
	        this.lineWidth = width || 1;
	        this.lineCap = cap || 'butt';
	        if (typeof dashLen == 'undefined') dashLen = 2;
	        this.moveTo(x1, y1);
	        var dX = x2 - x1;
	        var dY = y2 - y1;
	        var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
	        var dashX = dX / dashes;
	        var dashY = dY / dashes;
	        var q = 0;
	        while (q++ < dashes) {
	            x1 += dashX;
	            y1 += dashY;
	            this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1 + 0.5, y1 + 0.5);
	        }
	        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2 + 0.5, y2 + 0.5);
	        this.stroke();
	        this.restore();
	    };
	} catch (ex) {}
	try {
	    CanvasRenderingContext2D.prototype.dashedLinePattern = function (x0, y0, x1, y1, pattern, color, width, cap) {
	        this.save();
	        this.beginPath();
	        this.strokeStyle = color || this.strokeStyle || 'red';
	        this.lineWidth = width || 1;
	        this.lineCap = cap || 'butt';
	        var length = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
	        var vector = { x: (x1 - x0) / length, y: (y1 - y0) / length };
	        var dist = 0;
	        var i = 0;
	        pattern = pattern && pattern.length ? pattern : [4, 4];
	        while (dist < length) {
	            var dashLength = Math.min(pattern[i++ % pattern.length], length - dist);
	            var draw = (i % 2);
	            dist += dashLength;
	            if (draw) this.moveTo(x0 + 0.5, y0 + 0.5);
	            x0 += dashLength * vector.x;
	            y0 += dashLength * vector.y;
	            if (draw) this.lineTo(x0 + 0.5, y0 + 0.5);
	        }
	        this.stroke();
	        this.restore();
	    };
	} catch (ex) { alert('Your bowser does not support HTML5!'); }

	//----------
	// Cross-browser requestAnimationFrame
	//----------
	if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = (function() {
	        return window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame ||
	            window.oRequestAnimationFrame ||
	            window.msRequestAnimationFrame ||
	            function(callback, element) {
	                var currTime = new Date().getTime();
	                var timeToCall = Math.max(0, 16 - (currTime - (typeof lastTime != 'undefined' ? lastTime : 0)));
	                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
	                lastTime = currTime + timeToCall;
	                return id;
	            };
	    })();
	}

	//----------
	// Cross-browser cancelAnimationFrame
	//----------
	if (!window.cancelAnimationFrame) {
	    window.cancelAnimationFrame = function (id) {
	        clearTimeout(id);
	    };
	}

	//----------
	// IE11 NodeList.forEach (nodes collection iterator)
	//----------
	if ('NodeList' in window && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, givenArguments) {
			givenArguments = givenArguments || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(givenArguments, this[i], i, this);
			}
		};
	}

	exports.inherit = function (Child, Parent) {
	    if (!Child) throw 'Inherit - child undefined!';
	    if (!Parent) throw 'Inherit - parent undefined!';
	    var childProto = Child.prototype,
	        i, desc;
	    Child.prototype = Object.create(Parent.prototype);
	    var props = Object.getOwnPropertyNames(childProto);
	    for (i = props.length; i--;) {
	        if (childProto.hasOwnProperty(props[i])) {
	            desc = Object.getOwnPropertyDescriptor(childProto, props[i]);
	            Object.defineProperty(Child.prototype, props[i], desc);
	        }
	    }
	    Child.prototype.constructor = Child;
	    Child.superclass = Parent.prototype;
	};

	exports.extend = function extend(clazz, trait, isDirect) {
	    if (!clazz) throw 'Extend - class undefined!';
	    if (!trait) throw 'Extend - trait undefined!';
	    var from = trait,
	        to = isDirect ? clazz : clazz.prototype;
	    if (trait.prototype) extend(clazz, trait.prototype, isDirect);
	    for (var prop in from) {
	        var descriptor = Object.getOwnPropertyDescriptor(from, prop);
	        if (!descriptor) continue;
	        Object.defineProperty(to, prop, descriptor);
	    }
	};

	exports.clone = function (obj) {
		/// <summary>Clone given Object or Array</summary>
		/// <param name="obj" type="Object|Array">Object or Array</param>
	    if (Array.isArray(obj)) {
	        return obj.concat();
	    } else {
	        var clone = {};
	        Object.keys(obj).forEach(function(key) {
	            clone[key] = obj[key];
	        });
	        return clone;
	    }
	};

	exports.no = function (e, bubbles) {
		/// <summary>Prevent Default Events</summary>
		/// <param name="e" type="Event">Event</param>
		/// <param name="bubbles" type="Boolean">Cancel Bubbles and Stop Propagation</param>
	    if (typeof e.preventDefault !== 'undefined') e.preventDefault();
	    if (typeof e.returnValue !== 'undefined') e.returnValue = false;
	    if (bubbles === true) {
	        if (typeof e.stopPropagation !== 'undefined') e.stopPropagation();
	        if (typeof e.cancelBubble !== 'undefined') e.cancelBubble = true;
	    }
	};

	exports.rnd = function (min, max) {
		/// <summary>Get Random number between MIN and MAX (all included)</summary>
		/// <param name="min" type="String|Number">Range from</param>
		/// <param name="max" type="String|Number">Range to</param>
	    min = parseInt(min, 10);
	    max = parseInt(max, 10);
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	exports.uid = function () {
		/// <summary>Get Unique ID</summary>
	    return performance ? parseInt((performance.now()*1000).toFixed(0), 10) : Date.now();
	};

	exports.dt = function (date, isTimeFirst, useLocalTimeZone, dateDelimiter, timeDelimiter, currentTimeZoneOffset, showMilliseconds, millisecondsDelimiter) {
		/// <summary>Get DATE and TIME (return: formated string)</summary>
		/// <param name="date" type="date|number|string">date</param>
		/// <param name="isTimeFirst" type="boolean">for return time first before date</param>
		/// <param name="useLocalTimeZone" type="boolean">change date to local TimeZone</param>
		/// <param name="dateDelimiter" type="string">delimiter (default '-')</param>
		/// <param name="timeDelimiter" type="string">delimiter (default ':')</param>
		dateDelimiter = dateDelimiter || '.';
		timeDelimiter = timeDelimiter || ':';
		millisecondsDelimiter = millisecondsDelimiter || '.';
		currentTimeZoneOffset = currentTimeZoneOffset || new Date().getTimezoneOffset();
		showMilliseconds = showMilliseconds || false;
		//currentTimeZoneOffset *= 60;
		if (typeof date == 'string') {
			// only for parsing DOS time format "Mon 01/20/2014  9:45:28.10"
			// from file created by TeamCity: jsVersion.txt
			if (date.contains('.') && date.contains(':') && date.contains(' ')) {
				var raw = date.split(' ');
				var part = '';
				var dt = new Date();
				var dr = 0;
				var tr = '';
				for (var i = 0; i < raw.length; i++) {
					part = raw[i];
					if (part.contains('/')) { // date
						dr += Date.parse(part);
					} else
					if (part.contains('.') && !part.contains(':')) { // date
						dr += Date.parse(part);
					} else
					if (part.contains('-')) { // date
						dr += Date.parse(part);
					}

					if (part.contains(':') && part.contains('.')) { // time
						tr = part.split('.')[0];
					} else
					if (part.contains(':') && part.contains(',')) { // time
						tr = part.split(',')[0];
					} else
					if (part.contains(':')) { // time
						tr = part;
					}
				}
				dt.setTime(dr);
				var composedDateTime = dt.toDateString() + ' ' + tr;
				var datetime = Date.parse(composedDateTime);
				date = new Date(datetime);
			} else {
				date = new Date(parseInt(date, 10));
			}
		} else if (typeof date == 'undefined' || date === null) {
			date = new Date();
			date.setMinutes(date.getMinutes() - new Date().getTimezoneOffset());
		} else if (typeof date != 'object') { date = new Date(parseInt(date, 10)); }
		var d = date;
		useLocalTimeZone = useLocalTimeZone || true;
		var h = '' + d.getHours();
		if (h.length < 2) h = '0' + h;
		var m = '' + d.getMinutes();
		if (m.length < 2) m = '0' + m;
		var s = '' + d.getSeconds();
		if (s.length < 2) s = '0' + s;
		var ms = '' + d.getMilliseconds();
		if (ms.length < 2) ms = '00' + s;
		if (ms.length < 3) ms = '0' + s;
		var y = '' + d.getFullYear();
		var i_i = (d.getMonth() + 1);
		var ii = '' + i_i;
		if (ii.length < 2) ii = '0' + ii;
		var a = '' + d.getDate();
		if (a.length < 2) a = '0' + a;
		var dxx = a + dateDelimiter + ii + dateDelimiter + y;
		var txx = h + timeDelimiter + m + timeDelimiter + s;
		var res = "";
		if (isTimeFirst) {
			res = txx + (showMilliseconds ? millisecondsDelimiter + ms : '') + " " + dxx;
		} else {
			res = dxx + " " + txx + (showMilliseconds ? millisecondsDelimiter + ms : '');
		}
		return res;
	};

	exports.calculateWidth = function (text, config) {
		if (!this.canvas) {
			this.canvas = live({tag: 'canvas', attributes: [{width: '100'}, {height: '100'}]});
			this.ctx = this.canvas.getContext('2d');
			this.fontFamily = 'Tahoma';
			this.fontSize = 12;
			this.paddingLeft = 5;
			this.paddingRight = 5;
			this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		}
		text = text || '';
		config = config || {};
		var changes = false;
		if (config.fontFamily && (typeof config.fontFamily == 'string')) {
			this.fontFamily = config.fontFamily;
			changes = true;
		}
		if (config.fontSize && (typeof config.fontSize == 'number')) {
			this.fontSize = config.fontSize;
			changes = true;
		}
		if (changes) {
			this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		}
		if (config.paddingLeft != null && typeof config.paddingLeft == 'number') { this.paddingLeft = config.paddingLeft; }
		if (config.paddingRight != null && typeof config.paddingRight == 'number') { this.paddingRight = config.paddingRight; }

		var measureText = this.ctx.measureText(text);
		return (this.paddingLeft + measureText.width + this.paddingRight);
	};

	var getDOMElement = function (queryString) {
		/// <summary>Get DOM HTMLElement object</summary>
		/// <param name="el" type="String|HTMLElement">Query String or HTML Element</param>
		if (typeof queryString === 'undefined' || !queryString) {
			return null;
		}
		if (typeof queryString === 'string') {
			return document.querySelector(queryString);
		} else if (queryString instanceof HTMLElement) {
			return queryString;
		} else {
			return null;
		}
	};
	exports.getElement = getDOMElement;

	var live = function (parameters_object) {
		/// <summary>Create DOM Element (return successfull created element)</summary>
		/// <param name="tag" type="string">tag name: 'div', 'span' etc.</param>
		/// <param name="id" type="string|null">element id ('?' - autogenerate id; empty - create without id)</param>
		/// <param name="target" type="string|DOM|null">target: id|DOM element|null - document.body</param>
		/// <param name="display" type="boolean|null">show element after create (null - yes)</param>
		/// <param name="class_name" type="string|null">add inline className attribute (null - no)</param>
		/// <param name="style" type="string|null">add inline style attribute (null - no)</param>
		/// <param name="attributes" type="objects array">add inline attributes [{key1:value1}, {key2:value2}]</param>
		/// <param name="html" type="string|null">add innerHTML to element (null - nothing)</param>
		/// <param name="insertBefore_target" type="number|string|DOM|null">to insert before this sibling element (number - index of parentElement.children array; strind - id; DOM - element; null - append to end)</param>
		if (typeof parameters_object != 'object') return null;
		var tag, id, target, display, class_name, style, attributes, html, insertBefore_target;
		if (typeof parameters_object.tag != 'string')
			tag = 'DIV'; // default
		else
			tag = parameters_object.tag.toUpperCase();
		if (tag.toLowerCase() == 'br') return null;
		id = parameters_object.id || null;
		if (id == '?') id = (tag + exports.uid());
		if (typeof parameters_object.target == 'undefined' || parameters_object.target == null) {
			target = document.getElementsByTagName("body")[0];
		} else if (typeof target == 'string') target = getDOMElement(target);
		else target = parameters_object.target;
		if (typeof target == 'undefined' || target == null) {
			target = document.getElementsByTagName("body")[0];
		}
		if (typeof parameters_object.display != 'undefined') {
			display = (parameters_object.display === true);
		} else display = null;
		class_name = parameters_object.class_name || null;
		style = parameters_object.style || null;
		attributes = parameters_object.attributes || null;
		insertBefore_target = parameters_object.before || null;
		html = parameters_object.html || null;

		var d = document.createElement(tag);
		if (id !== null) d.id = id;
		if (class_name !== null) d.className = class_name;
		if (html !== null) d.innerHTML = html;
		if (style !== null) d.setAttribute("style", style);
		if (display === false) d.style.display = "none";
		if (attributes !== null && attributes.length > 0) {
			attributes.forEach(function(item) {
				d.setAttribute(Object.keys(item)[0], item[Object.keys(item)[0]]);
			});
		}
		if (typeof insertBefore_target != 'undefined') { // insert before element
			if (typeof insertBefore_target == 'number') {
				insertBefore_target = target.children[insertBefore_target];
			} else if (typeof insertBefore_target == 'string') {
				insertBefore_target = getDOMElement(insertBefore_target);
			}
			target.insertBefore(d, insertBefore_target);
		} else { // append to end
			target.appendChild(d);
		}

		return d;
	};
	exports.createElement = live;

	var kill = function (el) {
		/// <summary>Remove DOM Element</summary>
		/// <param name="el" type="String|DOM">String - for search by query; DOM - DOM HTMLElement object</param>
		el = getDOMElement(el);
		if (!el) return false;
		var parent = el.parentElement || document.body;
		parent.removeChild(el);
		return true;
	};
	exports.removeElement = kill;

	exports.html = function (el, html) {
		/// <summary>Set or GET innerHTML of DOM element</summary>
		/// <param name="el" type="String|DOM">String - element id; DOM - DOM element object</param>
		/// <param name="html" type="String">HTML string to Set (or empty to Get)</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof el.innerHTML != 'undefined') {
			if (typeof html != 'undefined') {
				el.innerHTML = html;
				return el;
			} else {
				return el.innerHTML;
			}
		}
		return false;
	};

	exports.text = function (el) {
		/// <summary>GET innerText of DOM element</summary>
		/// <param name="el" type="String|DOM">String - for search by query; DOM - DOM element object</param>
		el = getDOMElement(el);
		if (!el) return false;
		return el.innerText || el.textContent;
	};

	exports.hasClass = function (el, class_style) {
		/// <summary>Has class style name</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_style" type="string">style class name to detect</param>
		if (typeof class_style == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		return el.className.indexOf(class_style) !== -1;
	};

	exports.addClass = function (el, class_to_add) {
		/// <summary>Add style class (and return [el] after success add)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_add" type="string">style class name to add</param>
		if (typeof class_to_add == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		if (el.className.indexOf(class_to_add) !== -1) return false;
		el.className = (el.className + ' ' + class_to_add).trim();
		return el;
	};

	exports.removeClass = function (el, class_to_remove) {
		/// <summary>Remove style class (and return [el] after success remove)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_remove" type="string">style class name to remove (if absent - remove [class] attribute)</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof class_to_remove != 'undefined') {
			var cls = el.className;
			el.className = cls.replace(class_to_remove, '').trim();
			return el;
		}
	};

	exports.toggleClass = function (el, class_to_toggle, force) {
		/// <summary>Remove style class (and return [el] after success remove)</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="class_to_remove" type="string">style class name to remove (if absent - remove [class] attribute)</param>
		/// <param name="force" type="Boolean">true or false - for Set or Remove class</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof class_to_toggle != 'undefined') {
			if (typeof force != 'undefined') {
				if (force === true) {
					return exports.addClass(el, class_to_toggle);
				} else {
					return exports.removeClass(el, class_to_toggle);
				}
			} else {
				if (exports.hasClass(el, class_to_toggle)) {
					return exports.removeClass(el, class_to_toggle);
				} else {
					return exports.addClass(el, class_to_toggle);
				}
			}
		}
	};

	exports.attr = function (el, attribute_name, attribute_value) {
		/// <summary>GET or SET inline attribute:</summary>
		/// <param name="el" type="string|DOM">string = element, DOM = DOM element object</param>
		/// <param name="attribute_name" type="string>attribute name (for GET)</param>
		/// <param name="attribute_value" type="string>attribute value (for SET)</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof el != 'undefined' && typeof el.getAttribute != 'undefined' && typeof el.setAttribute != 'undefined') {
			if (arguments.length === 2) { //get
				if (el.hasAttribute(arguments[1])) {
					return el.getAttribute(arguments[1]);
				} else {
					return null;
				}
			}
			if (arguments.length === 3) { //set
				el.setAttribute(arguments[1], arguments[2]);
				return el;
			}
		}
		return false;
	};

	exports.hasAttribute = function (el, attribute_to_find) {
		/// <summary>Detect is element has inline attribute by name</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="attribute_to_find" type="string">attribute name</param>
		if (typeof attribute_to_find == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		return el.hasAttribute(attribute_to_find);
	};

	exports.removeAttribute = function (el, attribute_to_remove) {
		/// <summary>Remove inline attribute by name</summary>
		/// <param name="el" type="string|DOM">string - element; DOM - DOM element object</param>
		/// <param name="attribute_to_remove" type="string">attribute name</param>
		if (typeof attribute_to_remove == 'undefined') return false;
		el = getDOMElement(el);
		if (!el) return false;
		el.removeAttribute(attribute_to_remove);
		return el;
	};

	exports.show = function (el, value) {
		/// <summary>SHOW element</summary>
		/// <param name="el" type="String|DOM">String - query string; DOM - DOM element object</param>
		/// <param name="value" type="string">value of display attribute (default: 'block')</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof el.style == 'undefined') return false;
		if (typeof value == 'undefined' && typeof value != 'string') value = 'block';
		el.style.display = value;
		return el;
	};

	exports.hide = function (el) {
		/// <summary>HIDE element</summary>
		/// <param name="el" type="String|DOM">String - query string; DOM - DOM element object</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof el.style != 'undefined') {
			el.style.display = 'none';
			return el;
		}
		return false;
	};

	var offsetSum = function (el) {
		/// <summary>Get offset position of Element (by summ offsets of all parent elements)</summary>
		/// <param name="el" type="DOM">DOM element object</param>
		var left = 0,
			top = 0;
		while (el) {
			top = top + parseInt(el.offsetTop, 10);
			left = left + parseInt(el.offsetLeft, 10);
			el = el_.offsetParent;
		}
		return { left: left, top: top };
	};

	 var offsetRect = function (el) {
		/// <summary>Get offset position of Element (by use getBoundingClientRect of element)</summary>
		/// <param name="el" type="DOM">DOM element object</param>
		var box = el.getBoundingClientRect();
		var body = document.body;
		var docElem = document.documentElement;
		var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
		var clientTop = docElem.clientTop || body.clientTop || 0;
		var clientLeft = docElem.clientLeft || body.clientLeft || 0;
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;
		return { left: Math.round(left), top: Math.round(top) };
	};

	var offset = function (el) {
		/// <summary>Cross-browser OFFSET position of Element (return object {l:left, t:top})</summary>
		/// <param name="el" type="string|DOM">string - element id; DOM - DOM element object</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (el.getBoundingClientRect) {
			return offsetRect(el);
		} else { // for old browsers
			return offsetSum(el);
		}
	};

	exports.box = function (el, obj_ltwh, doNotChangePositonToAbsolute) {
		/// <summary>SET|GET one or multiply parameters of Left_Top_Width_Height object of Element (return: DOM element (or false if error))</summary>
		/// <param name="el" type="string|DOM">string - element id; DOM - DOM element object</param>
		/// <param name="obj_ltwh" type="object">to Set { l: left, t: top, w: width, h: height } (or empty to Get)</param>
		/// <param name="doNotChangePositonToAbsolute" type="boolean">true for not set position of element to Absolute</param>
		el = getDOMElement(el);
		if (!el) return false;
		if (typeof obj_ltwh == 'undefined' || typeof obj_ltwh != 'object') {
			var _offset = offset(el);
			var l = _offset.left;
			var t = _offset.top;
			var w = el.offsetWidth;
			var h = el.offsetHeight;
			return { /*short*/ l: l, t: t, w: w, h: h, /*full*/ left: l, top: t, width: w, height: h };
		} else {
			// position
			if (doNotChangePositonToAbsolute !== true) el.style.position = 'absolute';
			// left
			if (typeof obj_ltwh.l != 'undefined') {
				el.style.left = '' + obj_ltwh.l + 'px';
			} else if (typeof obj_ltwh.left != 'undefined') {
				el.style.left = '' + obj_ltwh.left + 'px';
			}
			// top
			if (typeof obj_ltwh.t != 'undefined') {
				el.style.top = '' + obj_ltwh.t + 'px';
			} else if (typeof obj_ltwh.top != 'undefined') {
				el.style.top = '' + obj_ltwh.top + 'px';
			}
			// width
			if (typeof obj_ltwh.w != 'undefined') {
				el.style.width = '' + obj_ltwh.w + 'px';
			} else if (typeof obj_ltwh.width != 'undefined') {
				el.style.width = '' + obj_ltwh.width + 'px';
			}
			//height
			if (typeof obj_ltwh.h != 'undefined') {
				el.style.height = '' + obj_ltwh.h + 'px';
			} else if (typeof obj_ltwh.height != 'undefined') {
				el.style.height = '' + obj_ltwh.height + 'px';
			}
		}
		return el;
	};

	exports.isPointInBox = function (point, elementLTWH, clipperLTWH) {
		var x = point.x || point.pageX;
		var y = point.y || point.pageY;
		var res = false;
		if (x >= elementLTWH.l && x <= (elementLTWH.l + elementLTWH.w) &&
			y >= elementLTWH.t && y <= (elementLTWH.t + elementLTWH.h)) {
			res = true;
		}
		if (res && typeof clipperLTWH != 'undefined') {
			res = exports.isPointInBox(point, clipperLTWH);
		}
		return res;
	};

	// Cross-browser implementation of Attach|Remove Event
	var on, off;
	if (document.addEventListener) {
		on = function (el, type, handler, capture) {
			el = getDOMElement(el);
			if (!el) return false;
			el.addEventListener(type, handler, !!capture);
			return handler; // ex. for remove
		};
		off = function (el, type, handler, capture) {
			el = getDOMElement(el);
			if (!el) return false;
			el.removeEventListener(type, handler, !!capture);
			return true;
		};
	} else if (document.attachEvent) {
		on = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			var withHandler = function () {
				return handler.apply(el, arguments);
			};
			el.attachEvent(type, withHandler);
			return withHandler;
		};
		off = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			el.detachEvent(type, handler);
			return true;
		};
	} else {
		on = function (el, type, handler) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			el.store = el.store || {};
			if (!el.store[type]) {
				el.store[type] = { counter: 1 };
				el[type] = function () {
					for (var key in item) {
						if (item.hasOwnProperty(key)) {
							if (typeof item[key] == "function") {
								item[key].apply(this, arguments);
							}
						}
					}
				};
			}
			var item = el.store[type],
				id = item.counter++;
			item[id] = handler;
			return id;
		};
		off = function (el, type, handlerId) {
			el = getDOMElement(el);
			if (!el) return false;
			type = "on" + type;
			if (el.store && el.store[type] && el.store[type][handlerId]) el.store[type][handlerId] = undefined;
			return true;
		};
	}
	exports.on = on;
	exports.off = off;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var EventDriven = function EventDriven() {
	    this._events = {};
	};

	var EventDriven_calls;
	var EventDriven_list;
	var EventDriven_args;
	var EventDriven_argsToSend;
	var EventDriven_i;
	var EventDriven_length;
	var EventDriven_context;

	EventDriven.prototype.on = function __method(eventName, data, callback, context) {
	    var _callback_;

	    if (typeof data === 'function') {
	        context = callback;
	        callback = data;
	        data = undefined;
	    }

	    var calls = this._events || (this._events = {});
	    var list = calls[eventName] || (calls[eventName] = []);

	    list.push([_callback_ || callback, context, data]);
	    return this;
	};

	EventDriven.prototype.off = function(eventName, context) {
	    var calls = this._events || (this._events = {}),
	        list = calls[eventName] || (calls[eventName] = []);

	    calls[eventName] = list.filter(function(listItem) {
	        return context !== undefined && listItem[1] !== context;
	    });

	    return this;
	};

	EventDriven.prototype.destroy = function() {
	    this._events = {};
	};

	EventDriven.prototype.execute = function(eventName) {
	    EventDriven_calls = this._events || (this._events = {});
	    EventDriven_list = EventDriven_calls[eventName] || (EventDriven_calls[eventName] = []);
	    EventDriven_args = Array.prototype.splice.call(arguments, 1);
	    EventDriven_length = EventDriven_list.length;

	    for (EventDriven_i = 0; EventDriven_i < EventDriven_length; EventDriven_i++) {
	        EventDriven_context = EventDriven_list[EventDriven_i][1] || this;
	        if (typeof EventDriven_list[EventDriven_i][2] !== 'undefined') {
	            EventDriven_argsToSend = EventDriven_args.concat([EventDriven_list[EventDriven_i][2]]);
	        } else {
	            EventDriven_argsToSend = EventDriven_args;
	        }
	        EventDriven_list[EventDriven_i][0].apply(EventDriven_context, EventDriven_argsToSend);
	    }
	};

	EventDriven.prototype.trigger = function(eventName, data) {
	    this.execute.apply(this, arguments);
	};

	exports.EventDriven = EventDriven;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;
	var log = __webpack_require__(6).log;
	var logPrefix = 'DataManager: ';

	var DataManager = function (params) {
	    this.params = params || {};
	    this.data_cache = {};
	    this.messages_cache = {};
	    this.worker = null;
	    this.createWorker('js/idb_worker.js');
	};

	Utils.extend(DataManager, EventDriven);

	DataManager.prototype.createWorker = function (workerScript) {
	    if (typeof(Worker) !== 'undefined') {
	        var _this = this;
	        try {
	            this.worker = new Worker(workerScript); 
	            this.worker.onmessage = function (event) {
	                var data = event.data;
	                log(logPrefix + 'IDB_WORKER MESSAGE', data);

	                var uid;
	                if (data.resolve) {
	                    if (data.args) {
	                        uid = data.args.uid;
	                        if (!!_this.messages_cache[uid]) {
	                            _this.messages_cache[uid](data.args.json || data.args);
	                            _this.removeFromMessagesCache(uid);
	                        }
	                    }
	                } else if (data.reject) {
	                    if (data.reject.uid) {
	                        uid = data.reject.uid;
	                        _this.removeFromMessagesCache(uid);
	                    }
	                }
	            };
	            this.worker.onerror = function (event) {
	                log(logPrefix + 'IDB_WORKER ERROR', event);
	            };
	            log(logPrefix + 'IDB_WORKER Initialized');
	        } catch (error) {
	            log(logPrefix + 'IDB_WORKER ERROR', error);
	        }
	    }
	};

	DataManager.prototype.addToMessagesCache = function (uid, callback) {
	    this.messages_cache[uid] = callback;
	};

	DataManager.prototype.removeFromMessagesCache = function (uid) {
	    if (!!this.messages_cache[uid]) {
			this.messages_cache[uid] = null;
	        delete this.messages_cache[uid];
	    }
	};

	DataManager.prototype.send = function (data, sendCallback) {
	    var uid = Utils.uid();
	    this.addToMessagesCache(uid, sendCallback);
	    data.uid = uid;
	    this.worker.postMessage(data);
	};

	DataManager.prototype.get = function (params, getCallback) {
		params = params || {};
		var _this = this;
		var cache = this.getFromInternalDataCache(params.table, params.from, params.to);
		if (cache) {
			 getCallback(cache, params.from, params.to);
		} else {
			this.requestWorkerDBData(params.table, params.from, params.to, /*requestWorkerDBDataCallback*/function (data) {
				if (data && data.result) {
					_this.setToInternalDataCache(params.table, params.from, params.to, data.result);
					getCallback(data.result, params.from, params.to);
				} else {
					getCallback(null);
				}
			});
		}
	};

	DataManager.prototype.getFromInternalDataCache = function (table, from, to) {
		// use internal cache for data already in stored range
		if (this.data_cache[table] && from >= this.data_cache[table].from && to <= this.data_cache[table].to) {
			return this.data_cache[table].records.filter(function (record) {
				if (record.y >= from && record.y <= to) {
					return true;
				}
			});
		}
		return null;
	};

	DataManager.prototype.setToInternalDataCache = function (table, from, to, data) {
		// store received data to arrange posibility next quick use
		if (data && data.length) {
			this.data_cache[table] = {
				from: from,
				to: to,
				records: data
			};
			return true;
		}
		return false;
	};

	DataManager.prototype.requestWorkerDBData = function (table, from, to, requestWorkerDBDataCallback) {
		var data = { 
			table: table, 
			from: from, 
			to: to 
		};
		log(logPrefix + 'Send REQUST to IDB_WORKER', data);
		this.send(data, function (response) {
			log(logPrefix + 'Received RESPONSE from IDB_WORKER', response);
			requestWorkerDBDataCallback(response);
		});
	};

	exports.DataManager = DataManager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	function log (text, params) {
		if (typeof disableLogging != 'undefined' && disableLogging) return;
	    var data = (typeof params == 'undefined' ? null : params);
	    var dt = new Date();
	    var ms = dt.getMilliseconds();
	    var len = ms.toString().length;
	    if (len === 1) {
	        ms += '00';
	    } else if (len === 2) {
	        ms += '0';
	    }
	    var dateLog = dateFormat(dt, 'DD-MM-YYYY');
	    var timeLog = dt.toLocaleTimeString() + '.' + ms;
	    var logString = dateLog + ' ' + timeLog + ' > ' + text;

	    if (data) {
	        console.log(logString, data);
	    } else {
	        console.log(logString);
	    }
	}

	function dateFormat (date, format) {
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
	    format = format.replace("DD", (d < 10 ? '0' : '') + d);
	    format = format.replace("MM", (m < 9 ? '0' : '') + (m + 1));
	    format = format.replace("YYYY", y);

	    return format;
	}

	if (true) {
		exports.log = log;
	}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;
	var Interaction = __webpack_require__(8).Interaction;
	var ChartView = __webpack_require__(9).ChartView;

	var Chart = function (params) {
		this.app = params.app;
	    this.data = null;
	    this.table = null;
	    this.rangeFrom = null;
	    this.rangeTo = null;

		// visual settings:
		this.positiveHotColor = 'lightcoral';
		this.positiveNormalColor = '#d5d551';
		this.negativeNormalColor = 'skyblue';
		this.negativeColdColor = 'dodgerblue';
		this.timeColor = '#999';
	    this.axisColor = '#000';
	    this.gridColor = '#444';
	    this.gridValuesColor = '#fff';
	    this.crosshairColor = 'dodgerblue';
	    this.hoverColor = 'goldenrod';
	    this.lineColor = '#fff';
	    this.lineFirstYearColor = '#000';
	    this.lineLastYearColor = '#fff';
		this.cloudColor = 'dodgerblue';

		// default options:
	    this.renderMode = 1; // 1=single, 2=both
	    this.draggingMode = false;
		this.startIndex = null;
		this.shiftX = 0;
		this.count = 31;
	    this.countShift = 30;
	    this.space = 20;
	    this.lineWidth = 5;
	    this.scale = 1;
	    this.margin = 50; 
	    this.paddingTop = 50;
	    this.paddingBottom = 150;
	    this.paddingLeft = 0;
	    this.paddingRight = 150;
	    this.digits = 1;

	    this.view = new ChartView({
			app: this.app,
			className: 'meteo-chart-view',
			appendTo: this.app.mainView.$middle
		});
		
	    this.interaction = new Interaction({
	        view: this.view
	    });

	    this.interactionDownX = null;
	    this.interactionDownY = null;
	    this.interactionDownStartIndex = null;
	    this.interactionMoveX = null;
		this.interactionMoveY = null;
		this.interactionActivated = false;

		this.bindEvents();
	};

	Utils.extend(Chart, EventDriven);

	Chart.prototype.bindEvents = function () {
	    window.onresize = function () {
	        this.onViewResize();
	    }.bind(this);

	    this.view.on('toEnd', this.handleToEndClick, this);
	};

	Chart.prototype.handleToEndClick = function (e) {
	    if (!this.data) return;
	    this.startIndex = null;
	    this.view.refresh(this.getModel());
	};

	Chart.prototype.onViewResize = function () {
	    if (!this.data) return;
	    this.view.resize();
	    this.view.refresh(this.getModel());
	};

	Chart.prototype.setData = function (data, table, from, to, mode) {
		if (data && data.length) {
	        var i, d, y;
			var data_length = data.length;

	        this.table = table;
	        this.rangeFrom = from;
	        this.rangeTo = to;

			if (mode === 'both') {
				this.renderMode = 2;

				// prepare data model as array of next arrays (related by index):
				this.data = [
					[], 	// [0] values of first year in selected range
					[], 	// [1] values of last year in selected range
					[], 	// [2] highest values of all years in selected range
					[], 	// [3] lowest values of all years in selected range
					[], 	// [4] highest year
					[], 	// [5] lowest year
					[]		// [6] day and month
				];
				for (i = 0; i < data_length; i++) {
					if (data[i].d.length !== 366) {
						// add value from 28 to 29 of February
						data[i].d.splice(59, 0, data[i].d[58]);
						data[i].t.splice(59, 0, '-/-');
					}
				}
				// here all arrays are has the same length and ready to prepare data model
				this.data[0] = this.data[0].concat(data[0].d);
				this.data[1] = this.data[1].concat(data[data_length - 1].d);
				for (i = 0; i < 366; i++) {
					d = data[0].t[i].split('/');
					this.data[6][i] = [d[0], d[1]].join('/'); 
				}
				for (d = 0; d < 366; d++) {
					for (i = 0; i < data_length; i++) {
						y = data[i];
						// initialize
						if (typeof this.data[2][d] === 'undefined') this.data[2][d] = y.d[d];
						if (typeof this.data[3][d] === 'undefined') this.data[3][d] = y.d[d];
						if (typeof this.data[4][d] === 'undefined') this.data[4][d] = y.y;
						if (typeof this.data[5][d] === 'undefined') this.data[5][d] = y.y;
						// compare
						if (y.d[d] > this.data[2][d]) {
							this.data[2][d] = y.d[d];
							this.data[4][d] = y.y;
						}
						if (y.d[d] < this.data[3][d]) {
							this.data[3][d] = y.d[d];
							this.data[5][d] = y.y;
						}
					}
				}
			} else {
				this.renderMode = 1;

				// prepare data model as array of 2 plain arrays (values and dates related by index)
				this.data = [
					[], 	// [0] values (Number)
					[]		// [1] dates (String)
				];
				for (i = 0; i < data_length; i++) {
					this.data[0] = this.data[0].concat(data[i].d);
					this.data[1] = this.data[1].concat(data[i].t);
				}
			}

			this.startIndex = this.data[0].length - this.count;

			this.view.resize(Utils.box(this.view.$container));
			this.view.refresh(this.getModel());
		
			if (!this.interactionActivated) {
				// only once activate the interactions
				this.interactionActivated = true;
				this.bindInteractionEvents();
				this.interaction.activate();
			}
		}
	};

	Chart.prototype.bindInteractionEvents = function () {
	    this.interaction.on('down', this.onInteractionDown, this);
	    this.interaction.on('move', this.onInteractionMove, this);
	    this.interaction.on('up', this.onInteractionUp, this);
	    this.interaction.on('wheel', this.onInteractionWheel, this);
	};

	Chart.prototype.unBindInteractionEvents = function () {
	    this.interaction.off('down', this);
	    this.interaction.off('move', this);
	    this.interaction.off('up', this);
	    this.interaction.off('wheel', this);
	};

	Chart.prototype.getXFromEvent = function (e) {
	    return (e.pageX || e.targetTouches[0].pageX) - this.view.left;
	};

	Chart.prototype.getYFromEvent = function (e) {
	    return (e.pageY || e.targetTouches[0].pageY) - this.view.top;
	};

	Chart.prototype.onInteractionDown = function (e) {
	    Utils.toggleClass(this.view.canvas, 'grabbing', true);
	    this.draggingMode = true;
	    this.interactionDownX = this.getXFromEvent(e);
	    this.interactionDownY = this.getYFromEvent(e);
		var minStartIndex = (this.data[0].length - this.count);
		this.interactionDownStartIndex = this.startIndex || minStartIndex;
	    if (this.startIndex == null) {
	        this.interactionDownStartIndex = minStartIndex;
	    } else {
	        this.interactionDownStartIndex = this.startIndex;
	    }
	};

	Chart.prototype.onInteractionMove = function (e) {
	    this.interactionMoveX = this.getXFromEvent(e);
		this.interactionMoveY = this.getYFromEvent(e);

	    if (this.interactionDownX != null && this.interactionDownY != null && this.interactionDownStartIndex != null) {
	        var shiftX = this.interactionMoveX - this.interactionDownX;
			var indexShift = shiftX >= 0 ? Math.floor(shiftX / this.space) : Math.ceil(shiftX / this.space);
			this.startIndex = this.interactionDownStartIndex - indexShift;
			this.shiftX = shiftX - Math.floor(indexShift * this.space);
			var minStartIndex = this.data[0].length - this.count;
			if (this.startIndex > minStartIndex) {
				this.startIndex = null;
				this.shiftX = 0;
			} else if (this.startIndex < 1) {
				this.startIndex = 1;
				this.shiftX = 0;
			}
	    }

	    this.view.refresh(this.getModel());
	};

	Chart.prototype.onInteractionUp = function (e) {
	    this.draggingMode = false;
		Utils.toggleClass(this.view.canvas, 'grabbing', false);
	    this.interactionMoveX = null;
	    this.interactionMoveY = null;
	    this.interactionDownX = null;
	    this.interactionDownY = null;
	    this.interactionDownStartIndex = null;
		this.shiftX = 0;
	    this.view.refresh(this.getModel());
	};

	Chart.prototype.onInteractionWheel = function (e) {
	    var delta = e.wheelDelta > 0;
	    var currentX = this.getXFromEvent(e);
	    var currentIndex = this.startIndex + Math.floor(currentX / this.space);

	    if (!delta) {
	        this.count += this.countShift;
	        if (this.count > 732) {
	            this.count = 732;
	        }
	    } else {
	        this.count -= this.countShift;
	        if (this.count < 31) {
	            this.count = 31;
	        }
	    }
	    this.lineWidth = 5 - ~~(this.count / 50);
	    if (this.lineWidth < 1) {
	        this.lineWidth = 1;
	    } else if (this.lineWidth > 5) {
	        this.lineWidth = 5;
		}
	    
	    var width = this.view.canvas.width - this.paddingLeft - this.paddingRight;
	    var space = (this.startIndex == null ? width : width + this.margin) / (this.count - 1);
	    var newIndexShift = Math.floor(currentX / space);
	    this.startIndex = currentIndex - newIndexShift;

		if (this.startIndex + this.count > this.data[0].length) {
			this.startIndex = this.data[0].length - this.count;
		}

	    this.view.refresh(this.getModel());
	};

	Chart.prototype.getModel = function () {
		var i, index, len, history, values_length, startIndex, max, min;

		if (this.renderMode === 2) {
			// both (analyze of selected years range)
			history = [[], [], [], [], [], [], []];
			values_length = this.data[0].length;
			startIndex = this.startIndex || (values_length - this.count);
			if (startIndex < 0) {
				startIndex = 0;
			}
			len = Math.min(this.count, values_length);
			for (i = 0; i < len; i++) {
				index = i + startIndex;
				if (index < 0) {
					index = 0;
				} else if (index >= values_length) {
					index = values_length - 1;
				}
				history[0].push(this.data[0][index]);
				history[1].push(this.data[1][index]);
				history[2].push(this.data[2][index]);
				history[3].push(this.data[3][index]);
				history[4].push(this.data[4][index]);
				history[5].push(this.data[5][index]);
				history[6].push(this.data[6][index]);
			}
			max = Math.max.apply(null, history[2]);
			min = Math.min.apply(null, history[3]);
		} else {
			// single (flat lined chart)
			history = [[], []];
			values = this.data[0];
			dates = this.data[1];
			values_length = values.length;
			startIndex = this.startIndex || (values_length - this.count);
			if (startIndex < 0) {
				startIndex = 0;
			}
			len = Math.min(this.count, values_length);
			for (i = 0; i < len; i++) {
				index = i + startIndex;
				if (index < 0) {
					index = 0;
				} else if (index >= values_length) {
					index = values_length - 1;
				}
				history[0].push(values[index]);
				history[1].push(dates[index]);
			}
			max = -100;
			min = 100;
			for (i in history[0]) {
				if (history[0][i] < min) {
					min = history[0][i];
				}
				if (history[0][i] > max) {
					max = history[0][i];
				}
			}
		}

		this.count = history[0].length;
	    var width = this.view.canvas.width - this.paddingLeft - this.paddingRight;
		var height = this.view.canvas.height - this.paddingTop - this.paddingBottom;
	    this.space = (this.startIndex == null ? width : width + this.margin) / (this.count - 1);
	    this.scale = (max - min) / height;

	    var crosshairX = null;
	    var crosshairY = null;
	    var hoveredIndex = null;
	    if (this.interactionMoveX != null && this.interactionMoveY != null) {
	        crosshairX = this.interactionMoveX;
	        crosshairY = this.interactionMoveY;
	        hoveredIndex = ~~(crosshairX / this.space); 
	    }

	    return {
	        width: width,
	        height: height,
	        max: max,
	        min: min,
			history: history,
	        rangeFrom: this.rangeFrom,
	        rangeTo: this.rangeTo,
	        table: this.table,
	        renderMode: this.renderMode,
	        draggingMode: this.draggingMode,
	        count: this.count,
	        startIndex: this.startIndex,
			space: this.space,
			digits: this.digits,
			scale: this.scale,
			shiftX: this.shiftX,

			positiveHotColor: this.positiveHotColor,
			positiveNormalColor: this.positiveNormalColor,
	        negativeNormalColor: this.negativeNormalColor,
	        negativeColdColor: this.negativeColdColor,
	        lineFirstYearColor: this.lineFirstYearColor,
	        lineLastYearColor: this.lineLastYearColor,
	        cloudColor: this.cloudColor,
			lineWidth: this.lineWidth,
	        lineColor: this.lineColor,
	        timeColor: this.timeColor,
	        axisColor: this.axisColor,
			gridColor: this.gridColor,
			gridValuesColor: this.gridValuesColor,
	        crosshairColor: this.crosshairColor,
	        hoverColor: this.hoverColor,
	        margin: this.margin, 
	        paddingTop: this.paddingTop,
	        paddingBottom: this.paddingBottom,
	        paddingLeft: this.paddingLeft,
	        paddingRight: this.paddingRight,

	        crosshairX: crosshairX,
	        crosshairY: crosshairY,
	        hoveredIndex: hoveredIndex
	    };
	};

	exports.Chart = Chart;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;

	var Interaction = function (params) {
	    this.view = params.view;
	    this.active = false;
	};

	Utils.extend(Interaction, EventDriven);

	Interaction.prototype.activate = function () {
	    if (!this.view) return;
	    this.active = true;
	    this.bindViewEvents();
	};

	Interaction.prototype.deActivate = function () {
	    if (!this.view) return;
	    this.active = false;
	    this.unBindViewEvents();
	};

	Interaction.prototype.bindViewEvents = function () {
	    if (!this.view) return;
	    // desktop mouse events
	    Utils.on(this.view.$container, 'mousedown', this.onEventDown.bind(this));
	    Utils.on(this.view.$container, 'mousemove', this.onEventMove.bind(this));
	    Utils.on(this.view.$container, 'mouseup', this.onEventUp.bind(this));
	    Utils.on(this.view.$container, 'mouseout', this.onEventUp.bind(this));
	    Utils.on(this.view.$container, 'mouseleave', this.onEventUp.bind(this));
	    Utils.on(this.view.$container, 'mousewheel', this.onEventWheel.bind(this));
	    // touch device events
	    Utils.on(this.view.$container, 'touchstart', this.onEventDown.bind(this));
	    Utils.on(this.view.$container, 'touchmove', this.onEventMove.bind(this));
	    Utils.on(this.view.$container, 'touchend', this.onEventUp.bind(this));
	};

	Interaction.prototype.unBindViewEvents = function () {
	    if (!this.view) return;

	    Utils.off(this.view.$container, 'mousedown');
	    Utils.off(this.view.$container, 'mousemove');
	    Utils.off(this.view.$container, 'mouseup');
	    Utils.off(this.view.$container, 'mouseout');
	    Utils.off(this.view.$container, 'mouseleave');
	    Utils.off(this.view.$container, 'mousewheel');
	    Utils.off(this.view.$container, 'touchstart');
	    Utils.off(this.view.$container, 'touchmove');
	    Utils.off(this.view.$container, 'touchend');
	};

	Interaction.prototype.onEventDown = function (e) {
	    this.trigger('down', e);
	};

	Interaction.prototype.onEventMove = function (e) {
	    this.trigger('move', e);
	};

	Interaction.prototype.onEventUp = function (e) {
	    this.trigger('up', e);
	};

	Interaction.prototype.onEventWheel = function (e) {
	    this.trigger('wheel', e);
	};

	exports.Interaction = Interaction;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var UI = __webpack_require__(10).UI;

	var ChartView = function (params) {
	    ChartView.superclass.constructor.call(this, params);
		this.app = params.app;
	    this.canvas = null;
	    this.ready = false;
	    this.ctx = null;
	    this.left = 0;
	    this.top = 0;
	    this.createView(params);
	};

	Utils.inherit(ChartView, UI);

	ChartView.prototype.createView = function (params) {
	    this.canvas = Utils.createElement({tag: "canvas", class_name: "meteo-main-canvas", target: this.$container});
	    this.ctx = this.canvas.getContext('2d');
	    this.ctx.lineCap = 'round';
	    this.ctx.lineJoin = 'round';

		this.toEndButton = Utils.createElement({class_name: "chart-to-end", html: "\>", target: this.$container});
	    Utils.on(this.toEndButton, 'click', this.onEndButtonClick.bind(this));
		
	    // wait for DOM composited to resize canvas
	    var html = Utils.getElement('html');
		var initInterval = setInterval(function () {
			if (html.offsetWidth && html.offsetHeight && (this.canvas.width !== 300 || this.canvas.height !== 150)) {
	            clearInterval(initInterval);
	            setTimeout(function () {
	                this.canvas.width = this.canvas.offsetWidth;
	                this.canvas.height = this.canvas.offsetHeight;
	                this.ready = true;
	                this.app.chart.onViewResize();
	            }.bind(this), 500);
			}
		}.bind(this), 30);
	};

	ChartView.prototype.onEndButtonClick = function (e) {
	    this.trigger('toEnd');
	};

	ChartView.prototype.resize = function () {
	    var box = Utils.box(this.$container);
	    this.left = box.left;
	    this.top = box.top;
	    this.canvas.width = box.width;
	    this.canvas.height = box.height;
	};

	ChartView.prototype.refresh = function (model) {
	    if (!this.ready) return;
	    window.requestAnimationFrame(function() {
	        this.render(model);
	    }.bind(this));
	};

	ChartView.prototype.getYByValue = function (value, model) {
	    return model.paddingTop + (model.max - value) / model.scale;
	};

	ChartView.prototype.getValueByY = function (y, model) {
	    return model.max - (y - model.paddingTop) * model.scale;
	};

	ChartView.prototype.getXByIndex = function (index, model) {
	    return model.paddingLeft + (index - 0) * model.space;
	};

	ChartView.prototype.getIndexByX = function (x, model) {
	    return 0 + Math.floor((x - model.paddingLeft) / model.space);
	};

	ChartView.prototype.getTimeByX = function (x, model) {
	    var index = this.getIndexByX(x, model);
	    return model.history[1][index];
	};

	ChartView.prototype.render = function (model) {
	    if (model.startIndex != null) { 
	        Utils.show(this.toEndButton);
	    } else {
	        Utils.hide(this.toEndButton);
	    }

	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	    this.drawAxisY(this.ctx, model);
	    this.drawAxisX(this.ctx, model);

	    if (model.renderMode === 2) {
	        this.drawBothMode(this.ctx, model);
	    } else {
	        this.drawSingleMode(this.ctx, model);
	        if (!model.draggingMode) {
	            this.drawCrosshair(this.ctx, model);
	        }
	    }
	};

	ChartView.prototype.drawSingleMode = function (ctx, model) {
		ctx.beginPath();
		ctx.lineCap = 'round';
	    ctx.lineJoin = 'round';
		ctx.lineWidth = model.lineWidth;
	    ctx.strokeStyle = model.lineColor;

	    var drawResult = this.drawOneLine(ctx, model, model.history[0], true, false);
	    if (!model.draggingMode) {
	        this.drawHovered(this.ctx, model, drawResult.hoveredX);
	    }
	};

	ChartView.prototype.drawBothMode = function (ctx, model) {
		ctx.lineCap = 'round';
	    ctx.lineJoin = 'round';
	    
	    // draw cloud on back before lines
	    ctx.beginPath();
	    ctx.strokeStyle = model.cloudColor;
	    ctx.fillStyle = model.cloudColor;
	    this.drawOneLine(ctx, model, model.history[2], false, false);
	    this.drawOneLine(ctx, model, model.history[3], false, true);
	    this.fillInnerCloud(ctx);
	    ctx.lineWidth = 1;
	    ctx.globalAlpha = 0.4;
	    ctx.beginPath();
	    this.drawOneLine(ctx, model, model.history[2], true, false);
	    ctx.beginPath();
	    this.drawOneLine(ctx, model, model.history[3], true, true);
	    ctx.lineWidth = model.lineWidth;
	    ctx.globalAlpha = 1;

	    // first selected year line
		ctx.beginPath();
	    ctx.strokeStyle = model.lineFirstYearColor;
	    var drawResult = this.drawOneLine(ctx, model, model.history[0], true, false);

	    // last selected year line
		ctx.beginPath();
	    ctx.strokeStyle = model.lineLastYearColor;
	    this.drawOneLine(ctx, model, model.history[1], true, false);
	    
	    if (!model.draggingMode) {
	        this.drawHovered(this.ctx, model, drawResult.hoveredX);
	    }
	};

	ChartView.prototype.fillInnerCloud = function (ctx) {
	    ctx.closePath();
	    ctx.globalAlpha = 0.1;
	    ctx.fill();
	};

	ChartView.prototype.drawAxisY = function (ctx, model) {
	    var maxValue = model.max;
	    var minValue = model.min;
	    var step = (maxValue - minValue) / 10;
	    var xLeft = model.paddingLeft;
	    var xRight = model.paddingLeft + model.width + model.margin;
	    var y;  

	    // dashed grid lines and colored values
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
	    for (var value = minValue; value <= maxValue + step / 2; value += step) {
	        y = this.getYByValue(value, model);
	        ctx.dashedLinePattern(xLeft, y, xRight, y, '2 2', model.gridColor);
	        
	        if (model.table === "temperature") {
	            if (value >= 25) {
	                ctx.fillStyle = model.positiveHotColor;
	            } else if (value >= 0) {
	                ctx.fillStyle = model.positiveNormalColor;
	            } else if (value < -15) {
	                ctx.fillStyle = model.negativeColdColor;
	            } else {
	                ctx.fillStyle = model.negativeNormalColor;
	            }
	        } else {
	            if (value >= 80) {
	                ctx.fillStyle = model.negativeColdColor;
	            } else if (value >= 40) {
	                ctx.fillStyle = model.negativeNormalColor;
	            } else {
	                ctx.fillStyle = model.positiveNormalColor;
	            }
	        }
	        ctx.fillText(value.toFixed(model.digits), xRight + 10, y + 4);
	    }

	    // vertical axis Y
	    ctx.beginPath();
	    ctx.strokeStyle = model.axisColor;
	    ctx.moveTo(model.paddingLeft + model.width + model.margin, model.paddingTop - model.margin);
	    ctx.lineTo(model.paddingLeft + model.width + model.margin, model.paddingTop + model.height + model.margin);
	    ctx.stroke();
	};

	ChartView.prototype.drawAxisX = function (ctx, model) {
	    var minIndex = 0;
	    var maxIndex = model.count;
	    var step = Math.ceil((maxIndex - minIndex) / (model.width / 100));
		var yTop = model.paddingTop - model.margin / 2;
		var yBottom = model.paddingTop + model.height + model.margin;
	    var x, data;

	    if (model.renderMode === 1) {
	        data = model.history[1];
	    } else if (model.renderMode === 2) {
	        data = model.history[6];
	    }

	    // dashed grid lines and times
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.font = "normal 12px Tahoma, Verdana, sans-serif";
	    for (var index = minIndex + 1; index < maxIndex; index += step) {
	        x = Math.floor(index * model.space);
			ctx.dashedLinePattern(x, yTop, x, yBottom, '2 2', model.gridColor);
			ctx.fillStyle = model.timeColor;
			var time = data[index];
	        ctx.fillText(time, x, yBottom + 20);
	    }

	    // horizontal axis X
		ctx.beginPath();
	    ctx.strokeStyle = model.axisColor;
	    ctx.lineWidth = 1;
	    ctx.moveTo(model.paddingLeft, model.paddingTop + model.height + model.margin);
	    ctx.lineTo(model.paddingLeft + model.width + model.margin, model.paddingTop + model.height + model.margin);
	    ctx.stroke();
	    ctx.closePath();
	};

	ChartView.prototype.drawCrosshair = function (ctx, model) {
	    if (model.crosshairX == null || model.crosshairY == null) return;
	    var xLeft = model.paddingLeft;
	    var xRight = model.paddingLeft + model.width + model.margin;
	    var yTop = model.paddingTop -  + model.margin;
	    var yBottom = model.paddingTop + model.height + model.margin;
	    var x = model.crosshairX;
	    var y = model.crosshairY;

	    ctx.beginPath();
	    ctx.strokeStyle = model.crosshairColor;
	    ctx.fillStyle = model.crosshairColor;
	    ctx.lineWidth = 1;
	    if (y >= yTop && y <= yBottom) {
	        var value = this.getValueByY(y, model);
	        ctx.moveTo(xLeft, y);
	        ctx.lineTo(xRight + 5, y);
	        ctx.fillRect(xRight + 50, y - 11, 50, 20);
	        ctx.fillStyle = 'white';
	        ctx.textAlign = 'left';
	        ctx.fillText(value.toFixed(model.digits), xRight + 55, y + 3);
	    }
	    ctx.stroke();
	};

	ChartView.prototype.drawOneLine = function (ctx, model, data, strokeNeeded, isReverse) {
	    var i, x, y, len = data.length;
	    var hoveredX = null;

	    var preX = model.paddingLeft + model.shiftX;
	    var preY = this.getYByValue(data[0], model);

	    if (isReverse) {
	        preX = model.paddingLeft + (len - 1) * model.space + model.shiftX;
	        preY = this.getYByValue(data[len - 1], model);
	        ctx.lineTo(preX, preY);
	        for (i = len - 2; i >= 0; i--) {
	            x = preX - model.space;
	            y = this.getYByValue(data[i], model);
	            ctx.lineTo(x, y);
	            if (model.hoveredIndex && model.hoveredIndex === i) hoveredX = x;
	            preX = x;
	            preY = y;
	        }
	    } else {
	        ctx.moveTo(preX, preY);
	        for (i = 1; i < len; i++) {
	            x = preX + model.space;
	            y = this.getYByValue(data[i], model);
	            ctx.lineTo(x, y);
	            if (model.hoveredIndex && model.hoveredIndex === i) hoveredX = x;
	            preX = x;
	            preY = y;
	        }
	    } 

	    if (strokeNeeded) {
	        ctx.stroke();
	    }

	    return {
	        hoveredX: hoveredX,
	        lastY: y
	    };
	};

	ChartView.prototype.drawHovered = function (ctx, model, hoveredX) {
	    if (hoveredX == null) return;
	    model.hoveredX = hoveredX;

	    if (model.renderMode === 1) {
	        var value = model.history[0][model.hoveredIndex];
	        this.drawHoveredValueMarker(ctx, model, value);

	        var time = model.history[1][model.hoveredIndex];
	        this.drawHoveredTimeMarker(ctx, model, time, value);
	    } else {
	        var valueOfFirstSelectedYear = model.history[0][model.hoveredIndex];
	        var yearOfFirstInRange = model.rangeFrom;
	        this.drawHoveredValueMarker(ctx, model, valueOfFirstSelectedYear, model.lineFirstYearColor, yearOfFirstInRange);
	    
	        var valueOfLastSelectedYear = model.history[1][model.hoveredIndex];
	        var yearOfLastInRange = model.rangeTo;
	        this.drawHoveredValueMarker(ctx, model, valueOfLastSelectedYear, model.lineLastYearColor, yearOfLastInRange);
	    
	        var valueOfHighestInRange = model.history[2][model.hoveredIndex];
	        var yearOfHighestInRange = model.history[4][model.hoveredIndex];
	        this.drawHoveredValueMarker(ctx, model, valueOfHighestInRange, model.cloudColor, yearOfHighestInRange);
	    
	        var valueOfLowestInRange = model.history[3][model.hoveredIndex];
	        var yearOfLowestInRange = model.history[5][model.hoveredIndex];
	        this.drawHoveredValueMarker(ctx, model, valueOfLowestInRange, model.cloudColor, yearOfLowestInRange);
	    
	        var dayAndMonth = model.history[6][model.hoveredIndex];
	        this.drawHoveredTimeMarker(ctx, model, dayAndMonth, valueOfHighestInRange, true);
	    }
	};

	ChartView.prototype.drawHoveredValueMarker = function (ctx, model, value, color, description) {
	    if (value == null) return;
	    color = color || model.hoverColor; 
	    var w = model.lineWidth * 4;
	    var xRight = model.paddingLeft + model.width + model.margin;
	    var x = model.hoveredX;
	    var y = this.getYByValue(value, model);
	    ctx.beginPath();
	    ctx.fillStyle = color;
	    ctx.strokeStyle = color;
	    ctx.fillRect(x - w/2, y - w/2, w, w);
	    ctx.dashedLinePattern(x, y, xRight + 4, y, '1 1');
	    var rectangleY = y - 11;
	    var rectangleW = 45;
	    if (description) {
	        rectangleW = 80;
	    }
	    ctx.fillRect(xRight + 5, rectangleY, rectangleW, 20);
	    if (color === '#000') {
	        ctx.fillStyle = '#fff';
	    } else {
	        ctx.fillStyle = '#000';
	    }
	    ctx.fillText(value.toFixed(model.digits) + (description ? " (" + description + ")" : ""), xRight + 10, rectangleY + 14);

	    return y;
	};

	ChartView.prototype.drawHoveredTimeMarker = function (ctx, model, time, value, short) {
		if (!time) return;
	    var x = model.hoveredX;
	    var y = this.getYByValue(value, model);
	    ctx.dashedLinePattern(x, y, x, model.paddingTop + model.height + model.margin - 25, '1 1', model.hoverColor);
	    y = model.paddingTop + model.height + model.margin - 25;

	    ctx.beginPath();
	    ctx.fillStyle = model.hoverColor;
	    ctx.fillRect(x - 10, y, (short === true ? 55 : 80), 20);
	    ctx.fillStyle = '#000';
	    ctx.fillText(time, x, y + 14);
	};

	exports.ChartView = ChartView;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var EventDriven = __webpack_require__(4).EventDriven;

	var UI = function(params) {
		params = params || {};
		var classes = params.className;
	    if (params.extraClassName) {
	        classes += ' ' + params.extraClassName;
		}
		var attributes = null;
	    if (params.noDisplayOnCreate === true) {
	        attributes = [{display: 'none'}];
	    }
	    this.$container = (params.container == null ? Utils.createElement({class_name: classes, attributes: attributes}) : Utils.getElement(params.container));
	    this.parent = params.parent;

	    this.appendTo(params.appendTo || this.parent);
	};

	Utils.extend(UI, EventDriven);

	UI.prototype.appendTo = function(parent) {
	    if (!parent) return;
	    if (parent instanceof Element) {
	        parent.appendChild(this.$container);
	    } else if (parent instanceof UI) {
	        parent.$container.append(this.$container);
	    } else {
	        console.trace('ERROR: UI want to append to unsupported parent', parent);
	    }
	};

	UI.prototype.show = function() {
	    if (!this.hidden) {
	        return this;
	    }
	    this.hidden = false;
		Utils.show(this.$container);
	    return this;
	};

	UI.prototype.hide = function() {
	    if (this.hidden) {
	        return this;
	    }
	    this.hidden = true;
		Utils.hide(this.$container);
	    return this;
	};

	UI.prototype.destroy = function() {
	    if (this.$container) {
			Utils.removeElement(this.$container);
	        this.$container = null;
	    }
	};

	exports.UI = UI;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var Utils = __webpack_require__(3);
	var UI = __webpack_require__(10).UI;
	var log = __webpack_require__(6).log;

	var MainView = function (params) {
	    MainView.superclass.constructor.call(this, params);
	    this.app = params.app;
	    this.createView();
	    this.bindEvents();
	};

	Utils.inherit(MainView, UI);

	MainView.prototype.createView = function () {
	    this.$top = Utils.createElement({class_name: "meteo-main-top", target: this.$container});
	    this.$title = Utils.createElement({class_name: "meteo-main-title", target: this.$top, html: "Архив метеослужбы"});
	    this.$controls = Utils.createElement({class_name: "meteo-main-controls", target: this.$top});
	    this.$types = Utils.createElement({class_name: "meteo-main-types", target: this.$controls});
	    this.$type_temperature = Utils.createElement({class_name: "meteo-main-type temperature active", target: this.$types, html: "температура"});
	    this.$type_precipitation = Utils.createElement({class_name: "meteo-main-type precipitation", target: this.$types, html: "осадки"});
	    this.$type_both = Utils.createElement({class_name: "meteo-main-type both", target: this.$types, html: "анализ&nbsp;диапа&shy;зона&nbsp;лет"});
	    this.$ranges = Utils.createElement({class_name: "meteo-main-ranges", target: this.$controls});
	    this.$select_from = Utils.createElement({tag: "select", class_name: "meteo-main-range from", target: this.$ranges});
	    this.$select_to = Utils.createElement({tag: "select", class_name: "meteo-main-range to", target: this.$ranges});
	    this.$content = Utils.createElement({class_name: "meteo-main-content", target: this.$container});
	    this.$middle = Utils.createElement({class_name: "meteo-main-middle", target: this.$content});
		
		var select_options = [];
		for (var i = 1881; i <= 2006; i++) {
			select_options.push('<option value="' + i + '">' + i + '</option>');
		}
		select_options = select_options.join('');
		Utils.html(this.$select_from, select_options);
		Utils.html(this.$select_to, select_options);
		this.$select_from.value = '1881';
		this.$select_to.value = '2006';
	};

	MainView.prototype.bindEvents = function () {
		Utils.on(this.$type_temperature, 'click', function (e) { 
			Utils.toggleClass(this.$type_temperature, 'active', true);
			Utils.toggleClass(this.$type_precipitation, 'active', false);
			this.triggerOnChange(); 
		}.bind(this));

		Utils.on(this.$type_precipitation, 'click', function (e) { 
			Utils.toggleClass(this.$type_temperature, 'active', false);
			Utils.toggleClass(this.$type_precipitation, 'active', true);
			this.triggerOnChange(); 
		}.bind(this));

		Utils.on(this.$type_both, 'click', function (e) { 
			Utils.toggleClass(this.$type_both, 'active');
			Utils.toggleClass(this.$ranges, 'both-mode');
			this.triggerOnChange(); 
		}.bind(this));

		Utils.on(this.$select_from, 'change', function (e) {
			this.disableMinMaxOptions();
			this.triggerOnChange(); 
		}.bind(this));

		Utils.on(this.$select_to, 'change', function (e) { 
			this.disableMinMaxOptions();
			this.triggerOnChange(); 
		}.bind(this));
	};

	MainView.prototype.disableMinMaxOptions = function () {
		var from = Number(this.$select_from.value);
		var to = Number(this.$select_to.value);
		this.$select_from.querySelectorAll('option').forEach(function (option) {
			if (Number(option.value) > to) {
				Utils.attr(option, 'disabled', 'disabled');
			} else {
				Utils.removeAttribute(option, 'disabled');
			}
		});
		this.$select_to.querySelectorAll('option').forEach(function (option) {
			if (Number(option.value) < from) {
				Utils.attr(option, 'disabled', 'disabled');
			} else {
				Utils.removeAttribute(option, 'disabled');
			}
		});
	};

	MainView.prototype.triggerOnChange = function () {
		var data = {
			mode: (Utils.hasClass(this.$type_both, 'active') ? 'both' : 'single'),
			table: (Utils.hasClass(this.$type_temperature, 'active') ? 'temperature' : 'precipitation'),
			from: this.$select_from.value,
			to: this.$select_to.value
		};
		this.trigger('change', data); 
	};

	exports.MainView = MainView;

/***/ })
/******/ ]);