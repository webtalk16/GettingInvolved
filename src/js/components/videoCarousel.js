class VideoCarousel {

  constructor (global) {
    this.name = 'VideoCarousel';
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = this.global.config.uiLang.get.call(this.global.config.uiLang);
  } 

  init () {
    console.log('VideoCarousel component is loaded');
  }

  eventHandler (eventName) {
    switch (eventName) {
      case this.global.references.Events.newVideoAdded:
      case this.global.references.Events.videoDeleted:
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

      const arrVideos = [];
      for (let prop in videos) {
        arrVideos.push({ id: prop, videoData: videos[prop]});
      }
      this.global.config.videoSort.set.call(this.global.config, this.global.references.Sort.newestFirst);
      const sortType = this.global.config.videoSort.get.call(this.global.config);
      switch (sortType) {
        case this.global.references.Sort.oldestFirst:
          arrVideos.sort(function(a, b){
            return a.videoData.uploadDate - b.videoData.uploadDate
          });
          break;
        case this.global.references.Sort.newestFirst:
          arrVideos.sort(function(a, b){ return b.videoData.uploadDate - a.videoData.uploadDate });
          break;
      }

      this.global.retrievedData.videos.featuredVideos = videos;
      const videosWrapper = document.querySelector('.watchIFCvideos');
      const videosHTML = [];
      let videoInfo = null; 
      const imageUrl = (videoId) => { return that.global.config.firebase.storage.url.get.call(that.global.config.firebase.storage.url, videoId); };

      // TODO - change 'watch' to 'featured' in all locations

      videosHTML.push(`
        <div id="watchVideoLeftArrow"></div>
        <div id="watchVideosWrapper">`
      );
      videosHTML.push('<div id="addVideoBtn" class="hidden adminOnly">+</div>');

      // Recently Deleted
      const deletedVideos = this.global.retrievedData.recentlyDeleted.videos;
      for (let prop in deletedVideos) {
        videoInfo = deletedVideos[prop];
        videosHTML.push(`
          <div class="watchVideoContainer recentlyDeleted" data-video-id="${prop}"c>
            <div class="removeFromRecentlyDeleted"></div>
            <div class="watchVideoPoster" style="background-image: url(${imageUrl(prop)});"></div>
            <div class="watchVideoCategory">${videoInfo[this.uiLang].category}</div>
            <div class="watchVideoTitle">${videoInfo[this.uiLang].title}</div>
            <div class="watchVideoFooter">${videoInfo[this.uiLang].title2}</div>
          </div>
        `);
      }

      // Videos
      for (let i = 0; i < arrVideos.length; i++) {
        videoInfo = arrVideos[i].videoData;

        videosHTML.push(`
          <div class="watchVideoContainer" data-video-id="${arrVideos[i].id}" data-upload-date="${videoInfo.uploadDate}">
            <div class="editVideoBtn hidden adminOnly"></div>
            <div class="watchVideoPoster" style="background-image: url(${imageUrl(arrVideos[i].id)});"></div>
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
        const uploadDate = el.getAttribute('data-upload-date');
        const videoData = videos[videoId];

        if(el.classList.contains('recentlyDeleted')) {
          const removeDeleted = el.querySelector('.removeFromRecentlyDeleted');
          const deletedData = this.global.retrievedData.recentlyDeleted.videos[videoId];
          delete this.global.retrievedData.recentlyDeleted.videos[videoId];
          if (event.target !== removeDeleted && !removeDeleted.contains(event.target)) {
            // undo delete
            this.global.modules.Firebase.addEditVideo(deletedData, null, true, true, videoId, uploadDate, true);
          }
          else {
            // remove from carousel and deleted List
            this.updateFeaturedVideos(divFeaturedVideos);
          }
        }
        else if (editIcon.classList.contains('hidden') || event.target !== editIcon && !editIcon.contains(event.target)) {
          that.utils.openVideoPlayer(videoId, videoData, that.resources);
        }
        else {
          // open edit popup
          const popup = this.global.modules[that.global.references.ModuleNames.AddEditPopup];
          popup.onAddEditVideoClick(true, videoId, videoData, uploadDate)();
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