/** Object storing module functions */
declare var modules: { [index:string]: Function };

declare module 'uuid/v4';

interface IManifest{
    styles?: Array<string>;
    scripts?: { sync: Array<string>, async: Array<string> };
    callback?: Function
}
