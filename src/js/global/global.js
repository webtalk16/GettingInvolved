import { Resources } from './resources.js'
import { Posts } from './posts.js'
import { Config } from './config.js'

class Global {
    constructor () {
        this.resourceLangs = Resources.lang;
        this.resources = this.getResources();
        this.resourceNavItems = Resources.lang[Config.uiLang.get.call(Config.uiLang)].nav;
        // this.config = Config;
    }

    getResources () {
        return Resources.lang[Config.uiLang.get.call(Config.uiLang)];
    }

    getPosts () {
      return Posts.lang[Config.uiLang.get.call(Config.uiLang)];
  }

    getResourceLangs () {
        return this.resourceLangs;
    }

    getResourceNavItems () {
        return this.resourceNavItems;
    }

    getConfig () {
        return Config;
    }

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
}
  
export { Global };