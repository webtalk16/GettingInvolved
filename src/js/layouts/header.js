import { Global } from '../global/global.js';

const rootEl = document.querySelector('#appMain');

class Header {

  constructor () {
    this.global = new Global();
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
  }

  setHomePage () {
    // Set Homepage
    let urlparams = (new URL(document.location)).searchParams;
    let pageParam = urlparams.get("page");
    const homepage = pageParam ? pageParam : 'home';
    this.setPage(homepage);
    return homepage;
  }

  setPage (page) {
    rootEl.className = page;
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  bindMenuIcon () {
    const menuIcon = document.querySelector('#menuIcon');
    // menuIcon.addEventListener('click', () => {
    //   menuIcon.parentNode.classList.toggle('showMenu');
    // });
    document.addEventListener('click', (event) => {
      if (event.target !== menuIcon && !menuIcon.contains(event.target)) {
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
      setTimeout(() => location.reload(), 200);
    }

  }

  buildHtml () {
    const homeOnclick = `document.querySelector('#headerNav').querySelectorAll('li').forEach(function(el){el.classList.remove('selected');el.classList.remove('showSubNav');});document.querySelector('#appMain').className='home';`;
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
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  buildNav () {
    let navListItems = '';
    let subnavHTML = '';
    const objNav = this.global.getResourceNavItems();
    let selected = '';
    let parentMenuItem = '';

    navListItems += `<li id="navCloseBtn">X</li>`;
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
    menuItems.forEach( function(el) { 
      el.addEventListener('click', function (event) {
        subMenuItem = event.target.closest('.subMenuItem');
        headerNav.querySelectorAll('li').forEach( function(li) { li.classList.remove('selected'); li.classList.remove('showSubNav'); });
        if (!this.classList.contains('parentItem')) {
          this.classList.add('selected');
          rootEl.className = this.getAttribute('name');
        }
        else if (subMenuItem) {
          rootEl.className = subMenuItem.getAttribute('name');
          this.classList.add('showSubNav');
          subMenuItem.classList.add('selected');
        }
        else if (this.classList.contains('parentItem')) {
          const firstSubNavItem = this.querySelector('.subNav').firstChild;
          rootEl.className = firstSubNavItem.getAttribute('name');
          firstSubNavItem.classList.add('selected');
          this.classList.add('showSubNav');
        }
      });
    });
  }

}
  
export { Header } 