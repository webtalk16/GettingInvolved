import { Resources } from './resources.js'
import { Posts } from './posts.js'
import { Config } from './config.js'
import { Utils } from './utils.js';
import { References } from '../global/references.js';

class Global {
    constructor () {
      this.utils = new Utils(this);
      this.references = References;
      this.resourceLangs = Resources.lang;
      this.config = (new Config(this)).config;
      this.resources = this.getResources();
      this.resourceNavItems = Resources.lang[this.config .uiLang.get.call(this.config.uiLang)].nav;
      this.user = null;
      this.modules = {};
      this.functions = null;
      this.retrievedData = null;
    }

    // TODO - make larger text, buttons, inputs for mobile

    addModule (module) {
      const instance = new module(this);
      this.modules[instance.name] = instance;
      instance.init();
    }

    setUser (user) {
      this.user = user;
    }

    getUser () {
      return this.user;
    }

    getResources () {
        return Resources.lang[this.config.uiLang.get.call(this.config.uiLang)];
    }

    getPosts () {
      return Posts.lang[this.config.uiLang.get.call(this.config.uiLang)];
    }

    getResourceLangs () {
        return this.resourceLangs;
    }

    getResourceNavItems () {
        return this.resourceNavItems;
    }

    // getConfig () {
    //     return this.config;
    // }

    checkPwa (rootEl) {
      setTimeout(() => {
        if (window.deferredPrompt) {
          // add install button
          const node = document.createElement('DIV');
          node.id = 'btnPwa';
          const span = document.createElement('SPAN');
          span.id = 'btnPwaInner';
          node.appendChild(span);
          const textnode = document.createTextNode(this.resources.pwa.InstallTitle);
          span.appendChild(textnode);
          rootEl.appendChild(node);
  
          const btnPwa = document.querySelector('#btnPwaInner');
          btnPwa.addEventListener('click', e => {
            window.addEventListener('appinstalled', e => {
              console.log('The IFC app is now installed on this device, thank you and enjoy :)');
            });
            this.doPwaInstall();
          });
        }
      }, 2000);
    }
  
    async doPwaInstall() {
      window.deferredPrompt.prompt();
      console.log('deferredPrompt' + window.deferredPrompt)
      window.deferredPrompt.userChoice.then(function(choiceResult){
        if (choiceResult.outcome === 'accepted') {
          console.log('Your PWA has been installed');
        } else {
          console.log('User chose to not install your PWA');
        }
        window.deferredPrompt = null;
      });
    }

    relayEvent (eventName) {
      for (let prop in this.modules) {
        if (this.modules[prop] && this.modules[prop].eventHandler) {
          this.modules[prop].eventHandler(eventName);
        }
      }
    }
}
  
export { Global };