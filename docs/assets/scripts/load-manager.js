"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadManager = (function () {
    function LoadManager() {
    }
    LoadManager.load = function (manifest) {
        if (manifest.styles) {
            for (var i = 0; manifest.styles.length; i++) {
                this.fetchStyle(manifest.styles[i]);
            }
        }
        if (manifest.scripts.async) {
            for (var i = 0; manifest.scripts.async.length; i++) {
                this.fetchAsyncScript(manifest.scripts.async[i]);
            }
        }
        if (manifest.scripts.sync) {
            this.fetchSyncScripts(manifest.scripts.sync);
        }
    };
    LoadManager.fetchStyle = function (filename) {
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
    LoadManager.fetchAsyncScript = function (filename) {
        fetch("" + window.location.origin + window.location.pathname + "assets/styles/" + filename, {
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
    LoadManager.fetchSyncScripts = function (scripts, index) {
        var _this = this;
        if (index === void 0) { index = 0; }
        var filename = scripts[index];
        fetch("" + window.location.origin + window.location.pathname + "assets/styles/" + filename, {
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
            if (index < scripts.length) {
                _this.fetchSyncScripts(scripts, index + 1);
            }
        })
            .catch(function (e) {
            console.error("Failed to load stylesheet " + filename, e);
        });
    };
    return LoadManager;
}());
exports.LoadManager = LoadManager;
new LoadManager();
