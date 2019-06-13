(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Env = (function () {
    function Env() {
        if (window.location.hostname.match(/.local/)) {
            Env.setDebug(true);
        }
        else if (document.documentElement.getAttribute('debug') !== null) {
            Env.setDebug(true);
        }
    }
    Env.setDebug = function (status) {
        Env.isDebug = status;
    };
    Env.stopLoading = function () {
        document.documentElement.classList.remove('dom-is-loading');
    };
    Env.startLoading = function () {
        document.documentElement.classList.add('dom-is-loading');
    };
    Env.isDebug = true;
    return Env;
}());
exports.Env = Env;
new Env();


/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Env_1 = __webpack_require__(1);
var Fuzebox = (function () {
    function Fuzebox() {
        console.log('Fuzebox has stared');
        Env_1.Env.stopLoading();
        this.init();
    }
    Fuzebox.prototype.init = function () {
        var _this = this;
        if ('reqeustIdleCallback' in window) {
            window.requestIdleCallback(function () { _this.loadGlobal(); });
        }
        else {
            this.loadGlobal();
        }
    };
    Fuzebox.prototype.loadGlobal = function () {
        var _this = this;
        fetch("" + window.location.origin + window.location.pathname + "assets/manifests/global.json", {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Accepts': 'application/json'
            }),
            credentials: 'include'
        })
            .then(function (request) { return request.json(); })
            .then(function (response) {
            if (response.styles.length) {
                for (var i = 0; i < response.styles.length; i++) {
                    _this.loadStyle(response.styles[i]);
                }
            }
            if (response.scripts.length) {
                for (var i = 0; i < response.scripts.length; i++) {
                    _this.loadScript(response.scripts[i]);
                }
            }
        })
            .catch(function (e) {
            console.error('Failed to load global manifest', e);
        });
    };
    Fuzebox.prototype.loadStyle = function (filename) {
        fetch("" + window.location.origin + window.location.pathname + "assets/styles/" + filename, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include'
        })
            .then(function (request) { return request.text(); })
            .then(function (response) {
            var newStylesheet = document.createElement('style');
            newStylesheet.innerHTML = response;
            newStylesheet.setAttribute('rel', 'stylesheet');
            newStylesheet.setAttribute('href', window.location.origin + "assets/styles/" + filename);
            document.head.appendChild(newStylesheet);
        })
            .catch(function (e) {
            console.error("Failed to load stylesheet " + filename, e);
        });
    };
    Fuzebox.prototype.loadScript = function (filename) {
        fetch("" + window.location.origin + window.location.pathname + "assets/scripts/" + filename, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include'
        })
            .then(function (request) { return request.text(); })
            .then(function (response) {
            var newScript = document.createElement('script');
            newScript.innerHTML = response;
            newScript.setAttribute('type', 'text/javascript');
            newScript.setAttribute('src', "" + window.location.origin + window.location.pathname + "assets/scripts/" + filename);
            document.body.appendChild(newScript);
        })
            .catch(function (e) {
            console.error("Failed to load stylesheet " + filename, e);
        });
    };
    return Fuzebox;
}());
exports.Fuzebox = Fuzebox;
new Fuzebox();


/***/ })

},[[6,0]]]);