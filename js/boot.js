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
/***/ (function(module, exports) {

	(function() {
		var browser = {
	        init: function() {
	            this.name = this.searchString(this.dataBrowser) || "an unknown browser";
	            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
	            this.os = this.searchString(this.dataOS) || "an unknown OS";
	        },
	        searchString: function(b) {
	            for (var a = 0; a < b.length; a++) {
	                var c = b[a].string,
	                    d = b[a].prop;
	                this.versionSearchString = b[a].versionSearch || b[a].identity;
	                if (c) { if (-1 != c.indexOf(b[a].subString)) return b[a].identity; } else if (d) return b[a].identity;
	            }
	        },
	        searchVersion: function(b) { var a = b.indexOf(this.versionSearchString); if (-1 != a) return parseFloat(b.substring(a + this.versionSearchString.length + 1)); },
	        dataBrowser: [
	            { string: navigator.userAgent, subString: "OPR", identity: "Opera", versionSearch: "OPR" },
	            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
	            { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
	            { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
	            { prop: window.opera, identity: "Opera", versionSearch: "Version" },
	            { string: navigator.vendor, subString: "iCab", identity: "iCab" },
	            { string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
	            { string: navigator.userAgent, subString: "FF", identity: "Firefox" },
	            { string: navigator.vendor, subString: "Camino", identity: "Camino" },
	            { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
	            { string: navigator.userAgent, subString: "MSIE", identity: "IE", versionSearch: "MSIE" },
	            { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
	            { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
	        ],
	        dataOS: [
	            { string: navigator.platform, subString: "Win", identity: "Windows" },
	            { string: navigator.platform, subString: "Mac", identity: "Mac" },
	            { string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
	            { string: navigator.platform, subString: "Linux", identity: "Linux" }
	        ]
	    };
	    browser.init();

		window.bootSettings = {
	        isDevMode: window.location.host.indexOf('localhost') !== -1,
	        browser: {
	            pageDescription: 'METEO ARCHIVE (MetaQuotes test task)',
	            userAgent: navigator.userAgent,
	            userLanguage: navigator.userLanguage,
	            isMobileBrowser: (/Android|iPad|iPhone|Mobile|PalmOS|SymbOS|Windows Phone/i.test(navigator.userAgent)),
	            NOCACHE: Date.now(),
	            name: browser.name.toLowerCase(),
	            version: browser.version.toString().toLowerCase(),
	            os: browser.os.toLowerCase()
	        },
	        path: {
	            ROOT: ''
	        }
	    };

	    boot();

	    function boot() {
	        var linkInfo = getLinkInfo();
	        var pathname = linkInfo.pathname;

	        bootSettings.path.ROOT = pathname || '';
	        if (window.require)(window.require.moduleRoot = bootSettings.path.ROOT);

	        document.head.innerHTML =
	            '<title>...loading</title>' +
	            '<meta charset="utf-8"/>' +
	            '<meta name="description" content="' + bootSettings.browser.pageDescription + '"/>' +

	            (bootSettings.browser.isMobileBrowser ? (
	                '<meta name="apple-mobile-web-app-status-bar-style" content="white"/>' +
	                '<meta name="apple-mobile-web-app-capable" content="yes">' +
	                '<meta name="mobile-web-app-capable" content="yes">' +
	                '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, minimal-ui">'
	            ) : '') +

				'<link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAElLSgTn5+T/09PR/+fn5P/n5+T/5eXi/+fn5P/T09H/5+fk/+fn5P/l5eL/5+fk/9PT0f/n5+T/Pz8+AS8xMQPn5+T/1dXT/+fn5P/Y2db/5+fk/+fn5P/V1dP/5+fk/9jZ1v/n5+T/5+fk/9XV0//n5+T/2NnW/+fn5P8AAAAA5+fk/+fn5P/T09H/5+fk/+bm4//n5+T/5+fk/9PT0f/n5+T/5ubj/+fn5P/n5+T/09PR/+fn5P/m5uP/5+fk/wAAAADj4+D/5+fk/9PT0f/n5+T/5+fk/+Pj4P/n5+T/09PR/+fn5P/n5+T/4+Pg/+fn5P/T09H/5+fk/+fn5P8AAAAAAAAAANTU0v/n5+T/3d7b/+fn5P/n5+T/1NTS/+fn5P/d3tv/5+fk/+fn5P/U1NL/5+fk/93e2//n5+T/AAAAAAAAAADn5+T/09PR/+fn5P/n5+T/5+fk/+fn5P/T09H/5+fk/+fn5P/n5+T/5+fk/9PT0f/n5+T/AAAAAAAAAABex+//XMDl/+fn5P/U1NL/5+fk/+fn5P/d3tv/5+fk/9TU0v/n5+T/5+fk/93e2//n5+T/AAAAAAAAAAAAAAAAXsfv/17H7/9at9r/Xsfv/+Pj4P/n5+T/5+fk/9PT0f/n5+T/4+Pg/+fn5P/n5+T/AAAAAAAAAABAREQGAAAAAF7H7/9exu7/Xsfv/1q32v9ex+//Xsfv/+bm4//n5+T/09PR/+fn5P/n5+T/5ubj/wAAAAAAAAAAAAAAAAAAAABex+//Xsfv/1u74P9ex+//W7nc/17H7/8AAAAAAAAAAOfn5P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALzExA17H7/9ex+//Wrfa/17H7/8vMTEDAAAAAAAAAAAAAAAAAAAAAC8xMQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AACAAwAAAAEAAAAAAACAAAAAwAAAAMABAACAAwAAgAcAAIAHAACBvwAAw/8AAP//AAD//wAA//8AAA==" rel="icon" type="image/x-icon" />' +
	            '<link rel="stylesheet" href="css/style.css" type="text/css" charset="utf-8" />' +
	            '';

	        setTimeout(loadBundleJs, 0);

	        function loadBundleJs() {
	            var __JS__ = 'js/bundle.js';
	            addScript(__JS__);

				var rootClassNames = '';

	            if (isTouchDevice()) {
	                rootClassNames += 'touch-device';
				} else {
	                rootClassNames += 'desktop-pc';
				}

				rootClassNames += (' browser-name-' + bootSettings.browser.name + ' browser-version-' + bootSettings.browser.version + ' os-name-' + bootSettings.browser.os);
				document.querySelector('html').className = rootClassNames;
	        }
	    }

	    function isTouchDevice () {
	        try { 
				document.createEvent("TouchEvent"); 
				return true; 
			} catch(e) { 
				return false; 
			}
	    }

	    function getLinkInfo() {
	        var link = window.location.origin + '/';
	        var info = link.split('index.html')[0];
	        if (info === 'file:///') info = '';
	        return {
	            pathname: info
	        };
	    }

	    function getLink(link, nocache) {
	        if (nocache) {
	            return getLinkNoCache(link);
	        } else {
	            return bootSettings.path.ROOT + (link);
	        }
	    }

	    function getLinkNoCache(link) {
	        return bootSettings.path.ROOT + addNoCache(link);
	    }

	    function addNoCache(link) {
	        return link + '?' + bootSettings.browser.NOCACHE;
	    }

	    function addScript(src, async) {
	        var script = document.createElement('script');
	        if (async) script.async = true;
	        script.src = src;
	        document.head.appendChild(script);
	        return script;
		}
	})();

/***/ })
/******/ ]);