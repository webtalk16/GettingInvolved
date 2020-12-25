import { Config } from '../global/config.js';

class VideoCarousel {

  constructor (global) {
    this.name = 'VideoCarousel';
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
  } 

  init () {
    console.log('VideoCarousel component is loaded');
  }

  eventHandler (eventName) {
    switch (eventName) {
      case this.global.references.Events.newVideoAdded:
        const divFeaturedVideos = document.querySelector('#featuredVideos');
        if (divFeaturedVideos) {
          this.updateFeaturedVideos(divFeaturedVideos);
        }
        break;
      default:
        break;
    }
  }

  updateFeaturedVideos (divFeaturedVideos) {
    const that = this;

    // Dumbie Video HTML
    const numberOfPlacholderVideos = 7;
    const dumbieVideos = [];
    let videosHtml = '';
    for(let i = 0; i < numberOfPlacholderVideos; i++) {
      dumbieVideos.push(`
        <div class="watchVideoContainer">
          <div class="watchVideoPoster" style="background: #CCCCCC;"></div>
          <div class="watchVideoCategory"></div>
          <div class="watchVideoTitle"></div>
          <div class="watchVideoFooter"></div>
        </div>`);
    }
    videosHtml = `
      <h2>${this.resources.video.viewOn}</h2>
      <div class="watchIFCvideos">
        <div id="watchVideosWrapper" class="dumbiePlaceholder">${dumbieVideos.join('')}</div>
      </div>`;
      divFeaturedVideos.innerHTML = videosHtml;

    this.global.modules.Firebase.readData(this.global.references.DataStructure.videos, (videos) => {

      this.global.retrievedData.videos.featuredVideos = videos;
      const videosWrapper = document.querySelector('.watchIFCvideos');
      const videosHTML = [];
      let videoInfo = null; 
      const imageUrl = (videoId) => { return Config.firebase.storage.url.get.call(Config.firebase.storage.url, videoId); };

      // TODO - change 'watch' to 'featured' in all locations

      videosHTML.push(`
        <div id="watchVideoLeftArrow"></div>
        <div id="watchVideosWrapper">`
      );
      videosHTML.push('<div id="addVideoBtn" class="hidden adminOnly">+</div>');
      for (let prop in videos) {
        videoInfo = videos[prop];
        console.log(imageUrl(prop));
        videosHTML.push(`
          <div class="watchVideoContainer" data-video-id="${prop}">
            <div class="editVideoBtn hidden adminOnly"></div>
            <div class="watchVideoPoster" style="background-image: url(${imageUrl(prop)});"></div>
            <div class="watchVideoCategory">${videoInfo[this.uiLang].category}</div>
            <div class="watchVideoTitle">${videoInfo[this.uiLang].title}</div>
            <div class="watchVideoFooter">${videoInfo[this.uiLang].title2}</div>
          </div>
        `);
      }
      videosHTML.push(`
        </div>
        <div id="watchVideoRightArrow"></div>`
      );

      videosWrapper.innerHTML = videosHTML.join('');

      // Bind video clicks
      const onVideoSelect = (el, event) => {

        const editIcon = el.querySelector('.editVideoBtn');
        const videoId = el.getAttribute('data-video-id');
        const videoData = videos[videoId];

        // TEMP !!!!!!!!!!!!!!!!!!!!!
        // TEMP !!!!!!!!!!!!!!!!!!!!!
        // const example = '"<iframe id=\"video-MOWbquSbbUFJTI5MwLq\" style=\"width:100%;height:400px;\" src=\"https://www.youtube.com/embed/CP6M5Rqa-U8?enablejsapi=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"';
        // const videoSrc = videoData.media.videoEmbed;
        // const link = videoSrc.split('src');
        // const link2 = link[1].split('?enablejsapi=1');
        // const link3 = link2[0].split('https');
        // const finalLink = 'https' + link3[1];
        // this.global.modules.Firebase.tempAddItem(videoId, finalLink);
        // return;
        // TEMP !!!!!!!!!!!!!!!!!!!!!
        // TEMP !!!!!!!!!!!!!!!!!!!!!

        if (editIcon.classList.contains('hidden') || event.target !== editIcon && !editIcon.contains(event.target)) {
          that.utils.openVideoPlayer(videoId, videoData, that.resources);
        }
        else {
          // open edit popup
          const popup = this.global.modules[that.global.references.ModuleNames.AddEditPopup];
          popup.onAddEditVideoClick(true, videoId, videoData)();
        }

      };
      const watchVideoContainer = document.querySelectorAll('.watchVideoContainer');
      watchVideoContainer.forEach((el) => {
        that.utils.attachEventListeners('click', onVideoSelect, [el]);
      });

      // Videos Scroll Arrows
      const isRTL = this.uiLang == 'heb';
      const videoScrollElement = document.querySelector('#watchVideosWrapper');
      const watchVideoLeftArrow = document.querySelector('#watchVideoLeftArrow');
      const watchVideoRightArrow = document.querySelector('#watchVideoRightArrow');
      const arrowBack = isRTL ? watchVideoRightArrow : watchVideoLeftArrow;
      const arrowFoward = isRTL ? watchVideoLeftArrow : watchVideoRightArrow;
      const numOfVideoItems = watchVideoContainer.length;

      watchVideoLeftArrow.addEventListener('click', function (that, numVideos, arrowBack, arrowFoward) {
        return function () {
          that.utils.videoScroll(videoScrollElement, 'back', isRTL, numVideos, arrowBack, arrowFoward);
        }
      }(this, numOfVideoItems, arrowBack, arrowFoward));

      watchVideoRightArrow.addEventListener('click', function (that, numVideos, arrowBack, arrowFoward) {
        return function () {
          that.utils.videoScroll(videoScrollElement, 'foward', isRTL, numVideos, arrowBack, arrowFoward);
        }
      }(this, numOfVideoItems, arrowBack, arrowFoward));

      let finishedScrolling = null;
      this.utils.updateScrollArrows(videoScrollElement, isRTL, arrowBack, arrowFoward) ;
      videoScrollElement.onscroll = function (that, isRTL, arrowBack, arrowFoward) {
        return function () {
          clearTimeout(finishedScrolling);
          finishedScrolling = setTimeout(function () {
            that.utils.updateScrollArrows(videoScrollElement, isRTL, arrowBack, arrowFoward) ;
          }, 200);
        }
      }(this, isRTL, arrowBack, arrowFoward);

      // Bind Add Video Button
      const addVideoBtn = document.querySelector('#addVideoBtn');
      const popup = this.global.modules[that.global.references.ModuleNames.AddEditPopup];
      that.utils.attachEventListeners('click', popup.onAddEditVideoClick(), [addVideoBtn]);

      that.global.relayEvent(that.global.references.Events.updateUserItems);
    });
  }

}

export { VideoCarousel } 