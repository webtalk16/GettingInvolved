
class Utils {

    constructor () {
      this.popupContainer = document.querySelector('#lightBoxContainer');
      this.popupText = this.popupContainer.querySelector('#lightBoxPopupText');
      this.initLightBoxPopup();
      this.rootEl = document.querySelector('#appMain');
    }

    setPage (page) {
      this.rootEl.className = page;
      this.actionPerPage(page);
    }

    actionPerPage (page) {
      const contentContainer = this.rootEl.querySelector('#contentContainer');
      switch (page) {
        case 'team':
          this.readMoreTruncate(contentContainer.querySelectorAll('.teamMemberAbout'), null, 12);
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
        if(lines > maxLines) {
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