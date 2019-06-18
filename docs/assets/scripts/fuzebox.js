"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fuzebox = (function () {
    function Fuzebox() {
        console.log('Fuzebox has stared');
        this._globalScriptRequestIndex = 0;
        this.init();
    }
    Fuzebox.prototype.init = function () {
        var _this = this;
        if ('reqeustIdleCallback' in window) {
            window.requestIdleCallback(function () {
                _this.loadGlobal();
            });
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
                _this.loadGlobalScripts(response.scripts);
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
    Fuzebox.prototype.loadGlobalScripts = function (scripts) {
        var _this = this;
        new Promise(function (resolve) {
            var _loop_1 = function (i) {
                var filename = scripts[i];
                _this._globalScriptRequestIndex++;
                var requestIndex = _this._globalScriptRequestIndex;
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
                    if (_this._globalScriptRequestIndex === requestIndex) {
                        resolve();
                    }
                })
                    .catch(function (e) {
                    console.error("Failed to load stylesheet " + filename, e);
                });
            };
            for (var i = 0; i < scripts.length; i++) {
                _loop_1(i);
            }
        })
            .then(function () {
        });
    };
    return Fuzebox;
}());
exports.Fuzebox = Fuzebox;
new Fuzebox();
