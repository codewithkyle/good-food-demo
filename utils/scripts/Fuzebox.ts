export class Fuzebox{
    constructor(){
        console.log('Fuzebox has stared');
        this.init();
    }

    private init():void{
        if('reqeustIdleCallback' in window){
            // @ts-ignore
            window.requestIdleCallback(()=>{ this.loadGlobal(); });
        }else{
            this.loadGlobal();
        }
    }

    private loadGlobal():void{
        fetch(`${ window.location.origin }${ window.location.pathname }assets/manifests/global.json`,{
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Accepts': 'application/json'
            }),
            credentials: 'include'
        })
        .then(request => request.json())
        .then(response => {
            if(response.styles.length){
                for(let i = 0; i < response.styles.length; i++){
                    this.loadStyle(response.styles[i]);
                }
            }

            if(response.scripts.length){
                for(let i = 0; i < response.scripts.length; i++){
                    this.loadScript(response.scripts[i]);
                }
            }
        })
        .catch(e => {
            console.error('Failed to load global manifest', e);
        });
    }

    private loadStyle(filename:string):void{
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

    private loadScript(filename:string):void{
        fetch(`${ window.location.origin }${ window.location.pathname }assets/scripts/${ filename }`,{
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
}

new Fuzebox();