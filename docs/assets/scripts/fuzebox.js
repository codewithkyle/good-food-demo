"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fuzebox {
    constructor() {
        console.log('Fuzebox has stared');
        this._globalScriptRequestIndex = 0;
        this.init();
    }
    init() {
        if ('reqeustIdleCallback' in window) {
            window.requestIdleCallback(() => {
                this.loadGlobal();
            });
        }
        else {
            this.loadGlobal();
        }
    }
    loadGlobal() {
        fetch(`${window.location.origin}${window.location.pathname}assets/manifests/global.json`, {
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Accepts': 'application/json'
            }),
            credentials: 'include'
        })
            .then(request => request.json())
            .then(response => {
            if (response.styles.length) {
                for (let i = 0; i < response.styles.length; i++) {
                    this.loadStyle(response.styles[i]);
                }
            }
            if (response.scripts.length) {
                this.loadGlobalScripts(response.scripts);
            }
        })
            .catch(e => {
            console.error('Failed to load global manifest', e);
        });
    }
    loadStyle(filename) {
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
    loadGlobalScripts(scripts) {
        new Promise((resolve) => {
            for (let i = 0; i < scripts.length; i++) {
                const filename = scripts[i];
                this._globalScriptRequestIndex++;
                const requestIndex = this._globalScriptRequestIndex;
                fetch(`${window.location.origin}${window.location.pathname}assets/scripts/${filename}`, {
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
                    if (this._globalScriptRequestIndex === requestIndex) {
                        newScript.addEventListener('load', () => {
                            resolve();
                        });
                    }
                })
                    .catch(e => {
                    console.error(`Failed to load stylesheet ${filename}`, e);
                });
            }
        })
            .then(() => {
            try {
                new exports['Application'].prototype.constructor();
            }
            catch (e) {
                console.error('Failed to start application', e);
            }
        });
    }
}
exports.Fuzebox = Fuzebox;
new Fuzebox();
