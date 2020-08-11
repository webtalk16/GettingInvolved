
class Utils {

    constructor () {
      this.popupContainer = document.querySelector('#lightBoxContainer');
      this.popupText = this.popupContainer.querySelector('#lightBoxPopupText');
      this.initLightBoxPopup();
      this.rootEl = document.querySelector('#appMain');
      this.menuIcon = null;
    }

    // TODO - Lazy Load images

    // TODO - make header sticky on scroll up

    menuIconBindClick (event) {
      this.menuIcon = document.querySelector('#menuIcon');
      if (event.target !== menuIcon && !menuIcon.contains(event.target)) {
        menuIcon.parentNode.parentNode.classList.remove('showMenu');
      }
      else {
        menuIcon.parentNode.parentNode.classList.toggle('showMenu');
      }
    }

    closeMenu () {
      if (this.menuIcon) { this.menuIcon.parentNode.parentNode.classList.remove('showMenu'); }
    }

    setStickyHeader () {
      window.onscroll = function(utils) { 
        return function () { setSticky(utils); }
      }(this);

      const header = document.querySelector('#headerMain');
      // const headerHieght = header.offsetHeight;
      const headerPos = header.offsetTop;
      const screenHeight = window.screen.height;

      let scrollPos = 0;
      let lastScrolledTime = 0;
      let currentTime = 0;
      function setSticky (utils) {
        currentTime = (new Date().getTime());

        utils.closeMenu();
        // Only check after 900ms
        if (currentTime - 900 > (lastScrolledTime)) {
          // if(window.pageYOffset > scrollPos) {
          //   //scrolling down
          //   header.classList.remove("sticky");
          // }
          // else {
          //   //scrolling up
          //   if (window.pageYOffset > (headerPos + (screenHeight / 2))) {
          //     header.classList.add("sticky");
          //   }
          //   else {
          //     header.classList.remove("sticky");
          //   }
          // }
          header.classList.remove("sticky");
          if(window.pageYOffset < scrollPos) {
            //scrolling up
            if (window.pageYOffset > (headerPos + (screenHeight / 2))) {
              header.classList.add("sticky");
            }
            else {
              header.classList.remove("sticky");
            }
          }
          lastScrolledTime = currentTime;
        }

        scrollPos = window.pageYOffset;
      }
    }

    setPage (page) {
      this.rootEl.className = page;
      this.actionPerPage(page);
      this.scrollToTop();
    }

    scrollToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      const header = document.querySelector('#headerMain');
      if (header) {
        header.classList.remove("sticky");
      }
    }

    actionPerPage (page) {
      const contentContainer = this.rootEl.querySelector('#contentContainer');
      switch (page) {
        case 'team':
          this.readMoreTruncate(contentContainer.querySelectorAll('.teamMemberAbout'), null, 12);
          break;
        case 'home':
          // this.readMoreTruncate(contentContainer.querySelectorAll('.groupItemDesc'), '.groupItemDescText', 5);
          break;
      }
    }

    readMoreTruncate (items, textNodeSelector, maxLines) {
      let parentItem = null;
      let innerItem = null;
      if (items) {
        if (items.length) {
          for(let i = 0; i < items.length; i++) {
            parentItem = items[i];
            innerItem = textNodeSelector != null ? parentItem.querySelector(textNodeSelector) : parentItem;
            this.truncate(innerItem, maxLines);
          }
        }
        else {
          parentItem = items;
          innerItem = parentItem.querySelector(textNodeSelector);
          innerItem = textNodeSelector != null ? parentItem.querySelector(textNodeSelector) : parentItem;
          this.truncate(innerItem, maxLines);
        }
      }
    }

    truncate (item, maxLines) {
      if (item) {
        const style = window.getComputedStyle(item, null);
        const lineHeight = parseInt(style.getPropertyValue('line-height'), 10);
        const height = item.clientHeight;
        const lines = height / lineHeight;
        if (lines > maxLines) {
          item.style.height = (lineHeight * maxLines) + 'px';
          item.classList.add('truncate');
          item.addEventListener('click', function openLightBox (txt, that) { return function () {  that.openLightBox(txt); } }(item.innerHTML, this));
        }
      }
    }

    initLightBoxPopup () {
      this.popupContainer.querySelector('.closeBtn').addEventListener('click', () => { this.popupContainer.classList.remove('show') });
    }

    openLightBox (contentText) {
      this.popupText.innerHTML = contentText;
      this.popupContainer.classList.add('show');
    }
}
  
export { Utils };