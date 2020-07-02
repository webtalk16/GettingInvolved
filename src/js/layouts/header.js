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
    this.bindMenuIcon();
    this.global.checkPwa(document.querySelector('#headerMain'));
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  bindMenuIcon () {
    const menuIcon = document.querySelector('#menuIcon');
    // menuIcon.addEventListener('click', () => {
    //   menuIcon.parentNode.classList.toggle('showMenu');
    // });
    window.addEventListener('click', () => {
      if(!menuIcon.contains(event.target)) {
        menuIcon.parentNode.classList.remove('showMenu');
      }
      else {
        menuIcon.parentNode.classList.toggle('showMenu');
      }
    });
  }

  bindLangSelect () {
    this.setLayoutByLang();

    const elSliderText = document.querySelector('#sliderText');
    const objLangs = this.global.getResourceLangs();
    let currentLang = this.config.uiLang.get.call(this.config.uiLang);
    let isHeb = currentLang === 'heb';
    elSliderText.innerHTML = '<span>' + objLangs[isHeb ? 'eng' : 'heb'].langName + '</span>';
    elSliderText.style.textAlign = isHeb ? 'left' : 'right';
    elSliderText.style.direction = isHeb ? 'ltr' : 'rtl';
    const langCheckbox = document.querySelector('#langSlider input');
    langCheckbox.checked = !isHeb;
    function check() {
      document.getElementById("myCheck").checked = true;
    }
    
    function uncheck() {
        document.getElementById("myCheck").checked = false;
    }

    const eventListerCallback = onLangChange.bind(this);
    langCheckbox.addEventListener('click', eventListerCallback);

    function onLangChange (event) {
      currentLang = this.config.uiLang.get.call(this.config.uiLang);
      isHeb = currentLang === 'heb';
      console.log('currentLang ' + currentLang);
      elSliderText.innerHTML = '<span>' + objLangs[isHeb ? 'heb' : 'eng'].langName + '</span>';
      elSliderText.style.textAlign = isHeb ? 'right' : 'rigleftht';
      elSliderText.style.direction = isHeb ? 'rtl' : 'ltr';
      //change lang
      this.config.uiLang.set(isHeb ? 'eng' : 'heb');

      // make unclickable
      event.target.removeEventListener('click', eventListerCallback);
      langCheckbox.disabled = true;

      //reload
      // location.reload();
      setTimeout(() => location.reload(), 200);
    }

  }

  buildHtml () {
    const objLangs = this.global.getResourceLangs();
    for (let lang in objLangs) {
    }

    let navListItems = '';
    // const objNav = this.global.resourceNavItems;
    let menuOnclick = '';

    // Set Homepage
    let urlparams = (new URL(document.location)).searchParams;
    let pageParam = urlparams.get("page");
    const homepage = pageParam ? pageParam : 'about';
    document.querySelector('#appMain').className = homepage;
    let selected = '';

    //document.querySelector('#headerNav').querySelectorAll('li').forEach(function(el){el.classList.remove('selected')});

    for (let navItem in this.resources.nav) {
      selected = this.resources.nav[navItem].name == homepage ? ' selected' : '';
      menuOnclick = `document.querySelector('#headerNav').querySelectorAll('li').forEach(function(el){el.classList.remove('selected')});this.classList.add('selected');document.querySelector('#appMain').className='${this.resources.nav[navItem].name}';`;
      navListItems += `<li onclick="${menuOnclick}" class="${this.resources.nav[navItem].name + selected}"><span>${this.resources.nav[navItem].text}</span></li>`;
    }

    const html = `
      <div id="headerMain">
        <div id="headerContainer">
          <div id="headerLogo">
          </div>
          <nav id="headerNav">
            <div id="menuIcon"><div></div><div></div><div></div></div>
            <ul>${navListItems}</ul>
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