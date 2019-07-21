"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoadManager {
    constructor() {
    }
    static load(manifest) {
        if (manifest.styles) {
            for (let i = 0; manifest.styles.length; i++) {
                this.fetchStyle(manifest.styles[i]);
            }
        }
        if (manifest.scripts.async) {
            for (let i = 0; manifest.scripts.async.length; i++) {
                this.fetchAsyncScript(manifest.scripts.async[i]);
            }
        }
        if (manifest.scripts.sync) {
            this.fetchSyncScripts(manifest.scripts.sync);
        }
    }
    static fetchStyle(filename) {
        fetch(`${window.location.origin}${window.location.pathname}assets/styles/${filename}`, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include'
        })
            .then(request => request.text())
            .then(response => {
            const newStylesheet = document.createElement('style');
            newStylesheet.innerHTML = response;
            newStylesheet.setAttribute('rel', 'stylesheet');
            newStylesheet.setAttribute('href', `${window.location.origin}assets/styles/${filename}`);
            document.head.appendChild(newStylesheet);
        })
            .catch(e => {
            console.error(`Failed to load stylesheet ${filename}`, e);
        });
    }
    static fetchAsyncScript(filename) {
        fetch(`${window.location.origin}${window.location.pathname}assets/styles/${filename}`, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include'
        })
            .then(request => request.text())
            .then(response => {
            const newScript = document.createElement('script');
            newScript.innerHTML = response;
            newScript.setAttribute('type', 'text/javascript');
            newScript.setAttribute('src', `${window.location.origin}${window.location.pathname}assets/scripts/${filename}`);
            document.body.appendChild(newScript);
        })
            .catch(e => {
            console.error(`Failed to load stylesheet ${filename}`, e);
        });
    }
    static fetchSyncScripts(scripts, index = 0) {
        const filename = scripts[index];
        fetch(`${window.location.origin}${window.location.pathname}assets/styles/${filename}`, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest'
            }),
            credentials: 'include'
        })
            .then(request => request.text())
            .then(response => {
            const newScript = document.createElement('script');
            newScript.innerHTML = response;
            newScript.setAttribute('type', 'text/javascript');
            newScript.setAttribute('src', `${window.location.origin}${window.location.pathname}assets/scripts/${filename}`);
            document.body.appendChild(newScript);
            if (index < scripts.length) {
                this.fetchSyncScripts(scripts, index + 1);
            }
        })
            .catch(e => {
            console.error(`Failed to load stylesheet ${filename}`, e);
        });
    }
}
exports.LoadManager = LoadManager;
new LoadManager();
