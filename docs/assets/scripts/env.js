"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Env {
    constructor() {
        if (window.location.hostname.match(/.local/)) {
            Env.setDebug(true);
        }
        else if (document.documentElement.getAttribute('debug') !== null) {
            Env.setDebug(true);
        }
        Env.stopLoading();
    }
    static setDebug(status) {
        Env.isDebug = status;
    }
    static stopLoading() {
        document.documentElement.classList.remove('dom-is-loading');
    }
    static startLoading() {
        document.documentElement.classList.add('dom-is-loading');
    }
}
Env.isDebug = true;
exports.Env = Env;
new Env();
