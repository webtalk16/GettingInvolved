import { Global } from '../global/global.js';
import { Utils } from '../global/utils.js';

const rootEl = document.querySelector('#appMain');

class Footer {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.utils = new Utils();
  } 

  loadFooter () {
    console.log('Footer component is loaded');
    this.buildHtml();
    this.bindEvents();
    this.buildNav();
  }

  setLayoutByLang () {
    document.querySelector('body').className = 'heb' === this.config.uiLang.get.call(this.config.uiLang) ? 'layoutRTL' : '';
  }

  buildHtml () {

    const html = `
      <div id="footerMain">
        <div id="footerContainer">
          <img src="images/Theme/ifcLogo-White-144x144-Transparent.png" class="imgFooterLogo" />
          <ul id="footerNavListItems"></ul>
        </div>
        <div class="footerBottom">
            <div class="youtubeChannel"><span>${this.resources.footer.youtube}</span></div>
            <div class="copyright"><span>&copy;&nbsp;2020</span><span>&nbsp;Israeli Free-Market Coalition</span></div>
          </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  buildNav () {
    let navListItems = '';
    const objNav = this.global.getResourceNavItems();

    for (let navItem in objNav) {
      navListItems += `<li name="${objNav[navItem].name}" class="footerNavItem ${objNav[navItem].name}"><span class="txtFooterNavItem">${objNav[navItem].text}</span></li>`;
    }

    const footerNavListItems = document.querySelector('#footerNavListItems');
    footerNavListItems.insertAdjacentHTML('beforeend', navListItems);

    this.bindMenuItems();
  }

  bindMenuItems () {
    const footerNav = document.querySelector('#footerNavListItems');
    const menuItems = footerNav.querySelectorAll('.footerNavItem');

    const handleEvent = (that) => {
      return function handleItem (el) {
        const handleClick = (that) => {
          return function () {
            const headerNav = document.querySelector('#headerNav');
            headerNav.querySelectorAll('li').forEach( function(li) { li.classList.remove('selected'); li.classList.remove('showSubNav'); });
            const elemSelected = headerNav.querySelector(`li[name="${this.getAttribute('name')}"]`);

            if (elemSelected.classList.contains('parentItem')) {
              const firstSubNavItem = elemSelected.querySelector('.subNav').firstChild;
              that.utils.setPage(firstSubNavItem.getAttribute('name'));
              firstSubNavItem.classList.add('selected');
              elemSelected.classList.add('showSubNav');
            }
            else {
              elemSelected.classList.add('selected');
              that.utils.setPage(this.getAttribute('name'));
            }
          }
        };
        el.addEventListener('click', handleClick(that));
      }
    }
        
    menuItems.forEach( handleEvent(this) );
  }

  bindEvents () {
    const donateBtnGeneral = document.querySelector('.youtubeChannel');
    const channelPlaylistLink = 'https://www.youtube.com/channel/UCW9KKTn53K0bXnRs4VBDf0A/playlists';
    donateBtnGeneral.addEventListener('click', function () {
      window.open(channelPlaylistLink, '_blank');
    });
  }

}
  
export { Footer } 