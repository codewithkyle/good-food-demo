export class LoadManager{
    constructor(){

    }

    public static load(manifest:IManifest):void{
        if(manifest.styles){
            for(let i = 0; manifest.styles.length; i++){
                this.fetchStyle(manifest.styles[i]);
            }
        }

        if(manifest.scripts.async){
            for(let i = 0; manifest.scripts.async.length; i++){
                this.fetchAsyncScript(manifest.scripts.async[i]);
            }
        }

        if(manifest.scripts.sync){
            this.fetchSyncScripts(manifest.scripts.sync);
        }
    }

    private static fetchStyle(filename:string):void{
        fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/${ filename }`,{
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
            newStylesheet.setAttribute('href', `${ window.location.origin }assets/styles/${ filename }`);
            document.head.appendChild(newStylesheet);
        })
        .catch(e => {
            console.error(`Failed to load stylesheet ${ filename }`, e);
        });
    }

    private static fetchAsyncScript(filename:string):void{
        fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/${ filename }`,{
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
            newScript.setAttribute('src', `${ window.location.origin }${ window.location.pathname }assets/scripts/${ filename }`);
            document.body.appendChild(newScript);
        })
        .catch(e => {
            console.error(`Failed to load stylesheet ${ filename }`, e);
        });
    }

    private static fetchSyncScripts(scripts:Array<string>, index:number = 0):void{
        const filename = scripts[index];

        fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/${ filename }`,{
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
            newScript.setAttribute('src', `${ window.location.origin }${ window.location.pathname }assets/scripts/${ filename }`);
            document.body.appendChild(newScript);

            if(index < scripts.length){
                this.fetchSyncScripts(scripts, index + 1);
            }
        })
        .catch(e => {
            console.error(`Failed to load stylesheet ${ filename }`, e);
        });
    }
}

new LoadManager();