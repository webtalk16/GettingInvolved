import { Global } from '../global/global.js';
import { Config } from '../global/config.js'
import { Home } from './home.js'

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

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer"></div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }
}

export { Content } 