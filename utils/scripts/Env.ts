export class Env {

    public static isDebug:boolean       = true;

    constructor(){
        if(window.location.hostname.match(/.local/)){
            // Checks if the hostname is set to `.local`
            Env.setDebug(true);
        }
        else if(document.documentElement.getAttribute('debug') !== null){
            // Checks if the `debug` attribute is set on the `document
            Env.setDebug(true);
        }

        Env.stopLoading();
    }

    /**
     * Sets the static `Env.isDebug` status to the provided parameter.
     * @param status - `boolean`
     */
    public static setDebug(status:boolean):void{
        Env.isDebug = status;
    }

    public static stopLoading():void{
        document.documentElement.classList.remove('dom-is-loading');
    }

    public static startLoading():void{
        document.documentElement.classList.add('dom-is-loading');
    }
}

new Env();
