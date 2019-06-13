(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Env_1 = __webpack_require__(1);
var uuid = __webpack_require__(2);
var device_manager_1 = __webpack_require__(5);
var Application = (function () {
    function Application() {
        new device_manager_1.default(Env_1.Env.isDebug, true);
        Env_1.Env.stopLoading();
    }
    Application.mountModules = function () {
        var pendingModules = Array.from(document.body.querySelectorAll('[data-module]:not([data-uuid])'));
        pendingModules.forEach(function (requestedModule) {
            var moduleIndex = requestedModule.dataset.module;
            Application.createModule(moduleIndex, requestedModule);
        });
        Application.manageLazyParents();
    };
    Application.manageLazyParents = function () {
        Application.modules.forEach(function (module) {
            if (module.futureParent) {
                module.parent = Application.getModuleByUUID(module.futureParent.getAttribute('data-uuid'));
                if (module.parent) {
                    module.futureParent = null;
                    module.parent.register(module);
                }
            }
        });
    };
    Application.createModule = function (index, view) {
        var newModule = null;
        try {
            var id = uuid();
            newModule = new modules[index].prototype.constructor(view, id);
            newModule.mount();
        }
        catch (e) {
            if (modules[index] !== undefined) {
                console.error('Failed to create module', e);
            }
        }
        if (newModule) {
            Application.modules.push(newModule);
            newModule.afterMount();
        }
        return newModule;
    };
    Application.destroyModule = function (uuid) {
        var _this = this;
        if (uuid) {
            this.modules.forEach(function (module) {
                if (module.uuid === uuid) {
                    var index = _this.modules.indexOf(module);
                    module.beforeDestroy();
                    module.destroy();
                    _this.modules.splice(index, 1);
                }
            });
        }
        else {
            console.warn('No UUID provided');
        }
    };
    Application.getModuleByUUID = function (uuid) {
        if (!uuid) {
            console.warn('No UUID provided');
            return null;
        }
        var returnModule = null;
        this.modules.forEach(function (module) {
            if (module.uuid === uuid) {
                returnModule = module;
            }
        });
        return returnModule;
    };
    Application.modules = [];
    return Application;
}());
exports.Application = Application;
new Application();
Application.mountModules();


/***/ }),
/* 1 */
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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = __webpack_require__(0);
var Module = (function () {
    function Module(view, uuid) {
        this.view = view;
        this.uuid = uuid;
        this.parent = null;
        this.submodules = [];
        this.futureParent = null;
    }
    Module.prototype.register = function (submodule) {
        this.submodules.push(submodule);
    };
    Module.prototype.mount = function () {
        this.view.dataset.uuid = this.uuid;
        var parent = this.view.closest("[data-module]:not([data-uuid=\"" + this.uuid + "\"])");
        if (parent) {
            this.parent = Application_1.Application.getModuleByUUID(parent.getAttribute('data-uuid'));
            if (this.parent) {
                this.parent.register(this);
            }
            else {
                this.futureParent = parent;
            }
        }
    };
    Module.prototype.afterMount = function () { };
    Module.prototype.seppuku = function () {
        Application_1.Application.destroyModule(this.uuid);
    };
    Module.prototype.beforeDestroy = function () { };
    Module.prototype.destroy = function () {
        if (this.submodules.length) {
            for (var i = this.submodules.length - 1; i >= 0; i--) {
                Application_1.Application.destroyModule(this.submodules[i].uuid);
            }
        }
        this.view.remove();
    };
    return Module;
}());
exports.Module = Module;


/***/ })
],[[7,0,5,6]]]);