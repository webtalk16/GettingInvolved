import { Global } from '../global/global.js';
import { Config } from '../global/config.js';

class Facebook {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadPage () {
    console.log('Facebook component is loaded');
    this.buildHtml();
    this.bindEvents();
  }

  buildHtml () {

    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentFbPage">
        <div class="fbPageHeader">IFC - Israeli Free-Market Coalition</div>
        <div class="fbPageLeftCover"></div>
        <div class="fbPageWrapper">
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIsraeli-Free-Market-Coalition-107814867514490%2F&tabs=timeline&width=340&height=465&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="465" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
        </div>
        <div class="fbPageRightCover"></div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
  }
}

export { Facebook } 