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
        Env.stopLoading();
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
