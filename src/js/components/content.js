import { Global } from '../global/global.js';
import { Config } from '../global/config.js';
import { Home } from './home.js';

class Content {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadContent(){
    console.log('Content component is loaded');
    this.buildHtml();
    this.loadHomepage();
  }

  loadHomepage () {
    const homepage = new Home();
    homepage.loadHome();
  }

  // loadScripts (rootEl) {
  //   const FacebookSDK = `
  //   <div id="fb-root"></div>
  //   <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
  //   `;
  //   rootEl.insertAdjacentHTML('beforeend', FacebookSDK);
  // }

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer"></div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
    // this.loadScripts(rootEl);
  }
}

export { Content } 