
class Utils {

    constructor () {
      this.popupContainer = document.querySelector('#lightBoxContainer');
      this.popupText = this.popupContainer.querySelector('#lightBoxPopupText');
      this.initLightBoxPopup();
      this.rootEl = document.querySelector('#appMain');
      this.menuIcon = null;
      this.playTimoutOut = null;
    }

    // TODO - Lazy Load images

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
      let scrollingUp = false;
      let passedMinThreshold = false;
      function setSticky (utils) {
        currentTime = (new Date().getTime());
        scrollingUp = window.pageYOffset < scrollPos;
        passedMinThreshold = window.pageYOffset > (headerPos + (screenHeight / 2));

        utils.closeMenu();

        if ((!scrollingUp) || scrollingUp && !passedMinThreshold) {
          header.classList.remove("sticky");
        }

        // Only check 900ms after last scroll
        if (currentTime - 900 > (lastScrolledTime)) {
          if(scrollingUp) {
            if (passedMinThreshold) {
              header.classList.add("sticky");
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
        case 'postsFeed':
          this.readMoreTruncate(contentContainer.querySelectorAll('.postText'), null, 12);
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
        // set css for item - line-height: ??em; font-size: ??px; AND make parent position:relative;overflow:hidden;
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

    openLightBox (contentHTML, onClose) {
      this.popupText.innerHTML = contentHTML;
      this.popupContainer.classList.add('show');
      const onCloseCallback = onClose ? () => { onClose(); this.popupContainer.classList.remove('show'); } : () => { this.popupContainer.classList.remove('show') };
      
      const closeBtn = this.popupContainer.querySelector('.closeBtn');
      closeBtn.removeEventListener('click', onCloseCallback);
      closeBtn.addEventListener('click', onCloseCallback);
    }

    getSocialIcons (type) {
      let objIcons = null;
      switch (type) {
        case 'color':
          objIcons = {
            website: `images/icons/icon-website-blue.png`,
            fb: `images/icons/icon-facebook-blue.png`,
            insta: `images/icons/icon-insta.png`,
            spotify: `images/icons/icon-spotify-green.png`,
            twiter: `images/icons/icon-twitter-blue.png`,
            youTube: `images/icons/icon-youtube.png`,
            linkedIn: `images/icons/icon-linkedin-blue.png`
          }
          break;
        default:
          objIcons = {
            website: `images/icons/icon-website-blue.png`,
            fb: `images/icons/icon-facebook-blue.png`,
            insta: `images/icons/icon-insta.png`,
            spotify: `images/icons/icon-spotify-green.png`,
            twiter: `images/icons/icon-twitter-blue.png`,
            youTube: `images/icons/icon-youtube.png`,
            linkedIn: `images/icons/icon-linkedin-blue.png`
          }
      }
      return objIcons;
    }

    initVideoPlayer (videoData, resources, onClose) {
      const ifcPlayer = document.querySelector('#ifcPlayer');
      const ifcPlayerVideo = ifcPlayer.querySelector('#ifcPlayerVideo');
      const ifcPlayerFooter = ifcPlayer.querySelector('#ifcPlayerFooter');
      const closeBtn = ifcPlayer.querySelector('.closeBtn');
      const appMain = document.querySelector('#appMain');
      const embededVideo = videoData.media.videoEmbed;
      const socialIcons = this.getSocialIcons('color');

      const socialLinks = [];
      let link = null;
      for (let prop in videoData.socialLinks) {
        link = videoData.socialLinks[prop];
        if (link) {
          // TODO - on link click, pause video
          socialLinks.push(`
            <div class="postSocialIcon">
              <a href="${link}" target="_blank">
                <img src="${socialIcons[prop]}" />
              </a>
            </div>
          `);
        }
      }
      const linksHTML = socialLinks.length ? ('<div class="postSocialLinks"><div class="socialLinksTxt">' + resources.video.viewFullPost + '</div> ' + socialLinks.join('') + '</div>') : '';

      ifcPlayerVideo.innerHTML = embededVideo;
      ifcPlayerFooter.innerHTML = linksHTML;
      ifcPlayer.classList.add('show');
      appMain.style.display = 'none';

      const doEachTime = () => {
        ifcPlayer.classList.remove('show');
        appMain.style.display = 'block';
        closeBtn.removeEventListener('click', onCloseCallback);
      };
      const onCloseCallback = onClose ? () => { onClose(); doEachTime();  } : doEachTime;
      
      closeBtn.addEventListener('click', onCloseCallback);
    }

    openVideoPlayer (videoId, videoData, resources) {
      const onClose = () => { 
        clearTimeout(this.playTimoutOut);
        const videoEl = document.querySelector('#video' + videoId);
        videoEl.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      };

      // this.initVideoPlayer();
      this.initVideoPlayer(videoData, resources, onClose);

      clearTimeout(this.playTimoutOut);
      this.playTimoutOut = setTimeout(() => {
        const vid1 = document.querySelector('#video' + videoId);
        vid1.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
      }, 2000);
    }

    videoScroll (scrollEl, direction, isRTL, numVideos, arrowBack, arrowFoward) {
      let previousLeft = scrollEl.scrollLeft;
      const offsetWidth  = scrollEl.scrollWidth;
      const scrollAmount = offsetWidth / numVideos;
      let animateSpeed = 1;

      // this.updateScrollArrows(scrollEl, isRTL, arrowBack, arrowFoward);
      
      const animate = function (newLeft) {
        animateSpeed += 1;
        setTimeout(function () {
          scrollEl.scrollLeft = newLeft; 
        }, animateSpeed);
      };

      previousLeft -= 1;
      for (let i = 0; i < scrollAmount; i++) {
        previousLeft = (direction == 'back') ? previousLeft - 1 : previousLeft + 1;
        animate(previousLeft);
      }

      // console.log("-------------------- ");
      // console.log("scrollEl.scrollLeft -- " + scrollEl.scrollLeft);
      // console.log("scrollEl.clientWidth -- " + scrollEl.clientWidth);
      // console.log("numVideos --- " + numVideos);
      // console.log("offsetWidth - " + offsetWidth );
      // console.log("scrollAmount - " + scrollAmount );

    }

    updateScrollArrows (scrollEl, isRTL, arrowBack, arrowFoward) {
      const scrollLeft = isRTL ? -scrollEl.scrollLeft : scrollEl.scrollLeft;
      if (scrollLeft == 0) {
        arrowBack.classList.add('hide');
      }
      else {
        arrowBack.classList.remove('hide');
      }

      if ((scrollLeft + scrollEl.clientWidth) >= (scrollEl.scrollWidth - 2)) {
        arrowFoward.classList.add('hide');
      }
      else {
        arrowFoward.classList.remove('hide');
      }

      if (!(scrollEl.clientWidth < scrollEl.scrollWidth)) {
        arrowFoward.classList.add('hide');
        arrowBack.classList.add('hide');
      }

    }
}
  
export { Utils };