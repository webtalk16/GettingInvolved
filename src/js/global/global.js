import { Resources } from './resources.js'
import { Config } from './config.js'

class Global {
    constructor () {
        // this.resources = Resources.lang[Config.uiLang];
        this.resourceLangs = Resources.lang;
        // this.config = Config;
    }

    getResources () {
        return Resources.lang[Config.uiLang.get.call(Config.uiLang)];
    }

    getResourceLangs () {
        return this.resourceLangs;
    }

    getConfig () {
        return Config;
    }
}
  
export { Global };