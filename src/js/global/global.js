import { Resources } from './resources.js'
import { Config } from './config.js'
class Global {
    constructor () {
        console.log('constructor--- ');
        this.resources = Resources.lang[Config.uiLang];
        this.resourceLangs = Resources.lang;
        this.config = Config;
    }

    getResources () {
        return this.resources;
    }

    getResourceLangs () {
        return this.resourceLangs;
    }

    getConfig () {
        return this.config;
    }
}
  
export { Global };  
//  export const global = new Global(); 