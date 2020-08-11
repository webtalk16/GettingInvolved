import { Global } from '../global/global.js';
import { Utils } from '../global/utils.js';

class Header {

  constructor () {
    this.global = new Global();
    this.utils = new Utils();
    this.resources = this.global.getResources();
    this.config = this.global.getConfig();
    this.homepage = this.setHomePage();
  } 

  loadHeader () {
    console.log('Header component is loaded');
    this.buildHtml();
    this.buildNav();
    this.bindLangSelect();
    this.bindMenuIcon();
    this.global.checkPwa(document.querySelector('#headerMain'));
    this.utils.setStickyHeader();
  }

  setHomePage () {
    // Set Homepage
    let urlparams = (new URL(document.location)).searchParams;
    let pageParam = urlparams.get("page");
    const homepage = pageParam ? pageParam : 'home';
    this.utils.setPage(homepage);
    return homepage;
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  bindMenuIcon () {
    document.addEventListener('click', (event) => {
      this.utils.menuIconBindClick(event);
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
      setTimeout(() => location.reload(), 200);
    }

  }

  // if(!el.classList.contains('home')){el.classList.add('selected');
  
  buildHtml () {
    const homeOnclick = `document.querySelector('#headerNav').querySelectorAll('li').forEach(function(el){el.classList.remove('selected');el.classList.remove('showSubNav');});document.querySelector('#appMain').className='home';document.querySelector('.menuItem.home').classList.add('selected');document.body.scrollTop=0;document.documentElement.scrollTop=0;`;
    const html = `
      <div id="headerMain">
        <div id="headerContainer">
          <div id="headerLogo" onclick="${homeOnclick}">
          </div>
          <nav id="headerNav">
            <div id="menuIcon"><div></div><div></div><div></div></div>
            <ul id="ulNavListItems"></ul>
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
    const rootEl = document.querySelector('#appMain');
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  buildNav () {
    let navListItems = '';
    let subnavHTML = '';
    const objNav = this.global.getResourceNavItems();
    let selected = '';
    let parentMenuItem = '';
    const homeLinkTxt = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'ראשי' : 'Home';

    navListItems += `<li id="navCloseBtn">X</li>`;
    navListItems += `<li name="home" class="menuItem home ${'home' == this.homepage ? ' selected' : ''}"><span class="txtNavItem">${homeLinkTxt}</span></li>`;
    for (let navItem in objNav) {
      selected = objNav[navItem].name == this.homepage ? ' selected' : '';
      subnavHTML = '';
      parentMenuItem = objNav[navItem].subMenu ? ' parentItem' : '';
      if (parentMenuItem) {
        subnavHTML += `<ul class="subNav">`
        for (let subNavItem in objNav[navItem].subMenu) {
          subnavHTML += `<li name="${objNav[navItem].subMenu[subNavItem].name}" class="subMenuItem ${objNav[navItem].subMenu[subNavItem].name + selected}"><span class="txtSubNavItem">${objNav[navItem].subMenu[subNavItem].text}</span></li>`;
        }
        subnavHTML += `</ul>`
      }

      navListItems += `<li name="${objNav[navItem].name}" class="menuItem ${objNav[navItem].name + selected + parentMenuItem}"><span class="txtNavItem">${objNav[navItem].text}</span>${subnavHTML}</li>`;
      
    }

    const ulNavListItems = document.querySelector('#ulNavListItems');
    ulNavListItems.insertAdjacentHTML('beforeend', navListItems);

    this.bindMenuItems();
  }

  bindMenuItems () {
    const headerNav = document.querySelector('#headerNav');
    
    let subMenuItem = null;
    const menuItems = document.querySelectorAll('.menuItem');

    const loopItems = (that) => {
      return function handleItem (el) {
        const handleClick = (that) => {
          return function handleEvent (event) {
            subMenuItem = event.target.closest('.subMenuItem');
            headerNav.querySelectorAll('li').forEach( function(li) { li.classList.remove('selected'); li.classList.remove('showSubNav'); });
            if (!this.classList.contains('parentItem')) {
              this.classList.add('selected');
              that.utils.setPage(this.getAttribute('name'));
            }
            else if (subMenuItem) {
              that.utils.setPage(subMenuItem.getAttribute('name'));
              this.classList.add('showSubNav');
              subMenuItem.classList.add('selected');
            }
            else if (this.classList.contains('parentItem')) {
              const firstSubNavItem = this.querySelector('.subNav').firstChild;
              that.utils.setPage(firstSubNavItem.getAttribute('name'));
              firstSubNavItem.classList.add('selected');
              this.classList.add('showSubNav');
            }
          }
        }
        el.addEventListener('click', handleClick(that));
      }
    }
    menuItems.forEach( loopItems(this) );
  }

}
  
export { Header } 