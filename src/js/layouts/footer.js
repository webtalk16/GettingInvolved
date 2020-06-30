import { Global } from '../global/global.js';

const rootEl = document.querySelector('#appMain');

class Footer {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
  } 

  loadFooter () {
    console.log('Footer component is loaded');
    this.buildHtml();
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  buildHtml () {

    const html = `
      <div id="footerMain">
        <div id="footerContainer">
          <div class="copyright"><span>&copy;&nbsp;2020</span><span>&nbsp;Israeli Free-Market Coalition</span></div>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

}
  
export { Footer } 