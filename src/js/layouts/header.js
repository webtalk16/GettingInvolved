import { Global } from '../global/global.js';

const rootEl = document.querySelector('#appMain');

class Header {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.config = this.global.getConfig();
  } 

  loadHeader () {
    console.log('Header component is loaded');
    this.buildHtml();
    this.bindLangSelect();
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  bindLangSelect () {
    this.setLayoutByLang();

    const elSliderText = document.querySelector('#sliderText');
    const objLangs = this.global.getResourceLangs();
    let currentLang = this.config.uiLang.get.call(this.config.uiLang);
    let isHeb = currentLang === 'heb';
    elSliderText.innerHTML = objLangs[isHeb ? 'heb' : 'eng'].langName;
    elSliderText.style.textAlign = isHeb ? 'right' : 'left';
    elSliderText.style.direction = isHeb ? 'rtl' : 'ltr';
    const langCheckbox = document.querySelector('#langSlider input');
    langCheckbox.checked = isHeb;
    function check() {
      document.getElementById("myCheck").checked = true;
    }
    
    function uncheck() {
        document.getElementById("myCheck").checked = false;
    }

    // langCheckbox.addEventListener('click', (event) => {
    //   currentLang = this.config.uiLang.get.call(this.config.uiLang);
    //   isHeb = currentLang === 'heb';
    //   console.log('currentLang ' + currentLang);
    //   elSliderText.innerHTML = objLangs[isHeb ? 'eng' : 'heb'].langName;
    //   elSliderText.style.textAlign = isHeb ? 'left' : 'right';
    //   elSliderText.style.direction = isHeb ? 'ltr' : 'rtl';
    // //change lang
    //   this.config.uiLang.set(isHeb ? 'eng' : 'heb');
    //   //remove event lister
    //   // event.target.removeEventListener('click', );
    //   //reload
    // });
    const eventListerCallback = onLangChange.bind(this);
    langCheckbox.addEventListener('click', eventListerCallback);

    function onLangChange (event) {
      currentLang = this.config.uiLang.get.call(this.config.uiLang);
      isHeb = currentLang === 'heb';
      console.log('currentLang ' + currentLang);
      elSliderText.innerHTML = objLangs[isHeb ? 'eng' : 'heb'].langName;
      elSliderText.style.textAlign = isHeb ? 'left' : 'right';
      elSliderText.style.direction = isHeb ? 'ltr' : 'rtl';
      //change lang
      this.config.uiLang.set(isHeb ? 'eng' : 'heb');

      // make unclickable
      event.target.removeEventListener('click', eventListerCallback);
      langCheckbox.disabled = true;

      //reload
      // location.reload();
      setTimeout(() => location.reload(), 400);
    }

  }

  buildHtml () {
    const objLangs = this.global.getResourceLangs();
    for (let lang in objLangs) {
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
            <div id="langSlider">
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
              <span id="sliderText" class="sliderText noselect"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

}
  
  export { Header } 