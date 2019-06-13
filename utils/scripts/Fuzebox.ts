import { Env } from "./Env";

export class Fuzebox{
    constructor(){
        console.log('Fuzebox has stared');
        Env.stopLoading();
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
        fetch(`${ window.location.origin }/assets/manifest/global.json`,{
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
        })
        .catch(e => {
            console.error('Failed to load global manifest', e);
        });
    }

    private loadStyle(filename:string):void{
        fetch(`${ window.location.origin }/assets/styles/${ filename }`,{
            headers: new Headers({
                'X-Requested-With': 'XMLHttpRequest',
                'Accepts': 'application/text'
            }),
            credentials: 'include'
        })
        .then(request => request.text())
        .then(response => {
            const newStylesheet = document.createElement('style');
            newStylesheet.innerHTML = response;
            newStylesheet.setAttribute('rel', 'stylesheet');
            newStylesheet.setAttribute('href', `${ window.location.origin }/assets/styles/${ filename }`);
            document.head.appendChild(newStylesheet);
        })
        .catch(e => {
            console.error(`Failed to load stylesheet ${ filename }`, e);
        });
    }
}

new Fuzebox();