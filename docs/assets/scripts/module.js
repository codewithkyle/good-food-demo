"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
class Module {
    constructor(view, uuid) {
        this.view = view;
        this.uuid = uuid;
        this.parent = null;
        this.submodules = [];
        this.futureParent = null;
    }
    register(submodule) {
        this.submodules.push(submodule);
    }
    mount() {
        this.view.dataset.uuid = this.uuid;
        const parent = this.view.closest(`[data-module]:not([data-uuid="${this.uuid}"])`);
        if (parent) {
            this.parent = Application_1.Application.getModuleByUUID(parent.getAttribute('data-uuid'));
            if (this.parent) {
                this.parent.register(this);
            }
            else {
                this.futureParent = parent;
            }
        }
    }
    afterMount() { }
    seppuku() {
        Application_1.Application.destroyModule(this.uuid);
    }
    beforeDestroy() { }
    destroy() {
        if (this.submodules.length) {
            for (let i = this.submodules.length - 1; i >= 0; i--) {
                Application_1.Application.destroyModule(this.submodules[i].uuid);
            }
        }
        this.view.remove();
    }
}
exports.Module = Module;
