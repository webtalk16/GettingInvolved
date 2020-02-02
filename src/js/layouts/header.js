import { Global } from '../global/global.js';

const rootEl = document.querySelector('#appMain');

class Header {

  constructor () {
    const global = new Global();
    this.resources = global.getResources();
    this.resourceLangs = global.getResourceLangs();
    this.config = global.getConfig();
  } 

  loadHeader(){
    console.log('Header component is loaded');
    this.buildHtml();
  }

  buildHtml () {
    // const global = new Global();
    // const resources = global.getResources();
    let langOptions = '';
    for (let lang in this.resourceLangs) {
      langOptions += `<option${lang == this.config.uiLang ? ' selected=selected' : ''}>${lang}</option>`;
    }

    const html = `
      <div id="headerMain">
        <div id="headerContainer">
          <div id="headerLogo">
          </div>
          <nav id="headerNav">
            <ul>
              <li>${this.resources.nav.home}</li>
            </ul>
          </nav>
          <div id="headerLang">
            <select>${langOptions}<select>
          </div>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
    // <option>${this.resources.lang}</option>
    // <option>${this.config.uiLang}</option>
  }

}
  
  export { Header } 