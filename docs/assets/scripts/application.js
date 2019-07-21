"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
class Application {
    constructor() {
        console.log('Application has started');
    }
    static mountModules() {
        const pendingModules = Array.from(document.body.querySelectorAll('[data-module]:not([data-uuid])'));
        pendingModules.forEach((requestedModule) => {
            const moduleIndex = requestedModule.dataset.module;
            Application.createModule(moduleIndex, requestedModule);
        });
        Application.manageLazyParents();
    }
    static manageLazyParents() {
        Application.modules.forEach((module) => {
            if (module.futureParent) {
                module.parent = Application.getModuleByUUID(module.futureParent.getAttribute('data-uuid'));
                if (module.parent) {
                    module.futureParent = null;
                    module.parent.register(module);
                }
            }
        });
    }
    static createModule(index, view) {
        let newModule = null;
        try {
            const id = uuid();
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
    }
    static destroyModule(uuid) {
        if (uuid) {
            this.modules.forEach((module) => {
                if (module.uuid === uuid) {
                    const index = this.modules.indexOf(module);
                    module.beforeDestroy();
                    module.destroy();
                    this.modules.splice(index, 1);
                }
            });
        }
        else {
            console.warn('No UUID provided');
        }
    }
    static getModuleByUUID(uuid) {
        if (!uuid) {
            console.warn('No UUID provided');
            return null;
        }
        let returnModule = null;
        this.modules.forEach((module) => {
            if (module.uuid === uuid) {
                returnModule = module;
            }
        });
        return returnModule;
    }
}
Application.modules = [];
exports.Application = Application;
