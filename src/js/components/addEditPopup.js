class AddEditPopup {

  constructor (global) {
    this.name = 'AddEditPopup';
    this.isActive = false;
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = this.global.config.uiLang.get.call(this.global.config.uiLang);
    this.addEditPopup = document.querySelector('#addEditPopup');
    this.onCloseCallback = null;
  } 

  init () {
    console.log('AddEditPopup component is loaded');
  }

  eventHandler (eventName) {
    switch (eventName) {
      case this.global.references.Events.newVideoAdded:
      case this.global.references.Events.videoDeleted:
        this.closePopup();
        break;
      default:
        break;
    }
  }

  openPopup () {
    this.isActive = true;
    this.addEditPopup.classList.add('show');
    this.utils.closeStickyHeader();
  }

  closePopup () {
    this.isActive = false;
    this.addEditPopup.classList.remove('show');
    if (this.onCloseCallback && typeof this.onCloseCallback === 'function') this.onCloseCallback();
  }

  onAddEditVideoClick (isEdit, videoId, videoData, uploadDate) {
    const that = this;
    return () => {

      // values
      const inputCategoryEnglish = !isEdit ? '' : videoData.eng.category || '';
      const inputCategoryHebrew = !isEdit ? '' : videoData.heb.category || '';
      const inputMainTitleEnglish = !isEdit ? '' : videoData.eng.title || '';
      const inputMainTitleHebrew = !isEdit ? '' : videoData.heb.title || '';
      const inputTitleFooterEnglish = !isEdit ? '' : videoData.eng.title2 || '';
      const inputTitleFooterHebrew = !isEdit ? '' : videoData.heb.title2 || '';
      const inputYouTubeLink = !isEdit ? '' : videoData.media.videoLink || '';
      const inputSocialLinks_FB = !isEdit ? '' : videoData.socialLinks.fb || '';
      const inputSocialLinks_Web = !isEdit ? '' : videoData.socialLinks.website || '';
      const inputSocialLinks_Spotify = !isEdit ? '' : videoData.socialLinks.spotify || '';
      const inputSocialLinks_Insta = !isEdit ? '' : videoData.socialLinks.insta || '';
      const inputSocialLinks_YouTube = !isEdit ? '' : videoData.socialLinks.youTube || '';
      const inputSocialLinks_LinkedIn = !isEdit ? '' : videoData.socialLinks.linkedIn || '';
      const inputSocialLinks_Twitter = !isEdit ? '' : videoData.socialLinks.twiter || '';

      const imageUrl =  !isEdit ? '' : that.global.config.firebase.storage.url.get.call(that.global.config.firebase.storage.url, videoId);
      const coverImageClass = !isEdit ? 'class="hidden"' : '';
      const coverPreviewForEdit = `<div id="videoCoverImagePreview" ${coverImageClass}><img src="${imageUrl}"></div>`;

      const buttonText = !isEdit ? that.resources.addEditPopup.buttonTextAdd : that.resources.addEditPopup.buttonTextEdit;
      const deleteVideoBtn = !isEdit ? '' : `<div id="addEditDeleteVideo"><span id="addEditDeleteVideoBtn">${that.resources.addEditPopup.buttonTextDelete}</span></div>`;

      // open add/edit popup
      const socialIcons = that.utils.getSocialIcons('color');
      const header = isEdit ? that.resources.addEditPopup.header.editFeaturedVideo : that.resources.addEditPopup.header.addFeaturedVideo;
      const content = `
        <div class="addEditItem">
          <span class="addEditLabel">${that.resources.addEditPopup.item.category}</span>
          <div class="inputsByLang eng">
            <label for="inputCategoryEnglish">${that.resources.addEditPopup.lang.eng}</label>
            <input type="text" id="inputCategoryEnglish" class="formInput" name="inputCategoryEnglish" value="${inputCategoryEnglish}" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputCategoryHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputCategoryHebrew" class="formInput" name="inputCategoryHebrew" value="${inputCategoryHebrew}" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.category}</span>
          </div>
        </div>
        <div class="addEditItem">
          <span class="addEditLabel">${that.resources.addEditPopup.item.titleMain}</span>
          <div class="inputsByLang eng">
            <label for="inputMainTitleEnglish">${that.resources.addEditPopup.lang.eng}</label>
            <input type="text" id="inputMainTitleEnglish" class="formInput" name="inputMainTitleEnglish" value="${inputMainTitleEnglish}" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputMainTitleHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputMainTitleHebrew" class="formInput" name="inputMainTitleHebrew" value="${inputMainTitleHebrew}" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.videoTitle}</span>
          </div>
        </div>
        <div class="addEditItem">
          <span class="addEditLabel">${that.resources.addEditPopup.item.titleFooter}</span>
          <div class="inputsByLang eng">
            <label for="inputTitleFooterEnglish">${that.resources.addEditPopup.lang.eng}</label>
            <input type="text" id="inputTitleFooterEnglish" class="formInput" name="inputTitleFooterEnglish" value="${inputTitleFooterEnglish}" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputTitleFooterHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputTitleFooterHebrew" class="formInput" name="inputTitleFooterHebrew" value="${inputTitleFooterHebrew}" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.videoTitle2}</span>
          </div>
        </div>
        <div class="addEditItem videoLink">
          <span class="addEditLabel">${that.resources.addEditPopup.item.videoLink}</span>
          <div id="addEditVideoLink">
            <input type="text" id="inputYouTubeLink" class="formInput" name="inputYouTubeLink" value="${inputYouTubeLink}" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.youTubeEmbedLink}</span>
          </div>
        </div>
        <div class="addEditItem videoCover">
          <span class="addEditLabel">${that.resources.addEditPopup.item.coverImage}</span>
          <div id="addEditVideoCover">
            ${coverPreviewForEdit}
            <input type="file" id="inputCoverImage" class="formInput" onchange="document.querySelector('#videoCoverImagePreview').classList.add('hidden')" name="inputCoverImage" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.imageSize}</span>
          </div>
        </div>
        <div class="addEditItem socialLinks">
          <span class="addEditLabel">${that.resources.addEditPopup.item.socialLinksToPost}</span>
          <div id="addEditVideoSocialLinks">
            <div id="inputSocialLinks_FB">
              <input type="text" value="${inputSocialLinks_FB}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialFB}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Web">
              <input type="text" value="${inputSocialLinks_Web}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
            <div id="inputSocialLinks_Spotify">
              <input type="text" value="${inputSocialLinks_Spotify}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialSpotify}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Insta">
              <input type="text" value="${inputSocialLinks_Insta}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
            <div id="inputSocialLinks_YouTube">
              <input type="text" value="${inputSocialLinks_YouTube}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialYouTube}</span>
              </div>
            </div>
            <div id="inputSocialLinks_LinkedIn">
              <input type="text" value="${inputSocialLinks_LinkedIn}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialLinkedIn}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Twitter">
              <input type="text" value="${inputSocialLinks_Twitter}" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
          </div>
        </div>
        <div id="errorTxt"></div>
        <div class="addEditItem">
          <button id="addEditSubmitBtn" type="submit">${buttonText}</button>
          ${deleteVideoBtn}
        </div>
      `;
      that.openAddEditPopup(header, content, that.onSubmitAddEditVideo, that.onSubmitDeleteVideo, isEdit, videoId, uploadDate, null);
    }
  }

  openAddEditPopup (header, content, onSubmit, onDelete, isEdit, videoId, uploadDate, onClose) {
    const that = this;
    const popupContent = this.addEditPopup.querySelector('#addEditContent');
    const popupHeader = this.addEditPopup.querySelector('#addEditHeader');

    // TODO - fix bug on scroll input hints remain floating
    // TODO - cancel header open on scroll (when popup open), or cancel background scroll
    
    popupHeader.innerHTML = header;
    popupContent.innerHTML = content;

    // on add/edit video form submit (add video)
    const addEditSubmitBtn = document.querySelector('#addEditSubmitBtn');
    this.utils.attachEventListeners('click', onSubmit(isEdit, videoId, uploadDate, popupContent, this.global), [addEditSubmitBtn]);
    if (isEdit) {
      const onSubmitDeleteVideo = document.querySelector('#addEditDeleteVideoBtn');
      this.utils.attachEventListeners('click', onDelete(videoId, this.global), [onSubmitDeleteVideo]);
    }

    this.openPopup();
    popupContent.scrollTop = 0;

    this.onCloseCallback = onClose;
    const closeBtn = this.addEditPopup.querySelector('.closeBtn');
    this.utils.attachEventListeners('click', function () { that.closePopup.call(that) }, [closeBtn]);
  }

  onSubmitDeleteVideo(videoId, global) {
    const onDeleteVideo = () => {
      const onConfirm = () => { global.modules.Firebase.deleteVideo(videoId); };

      const imageUrl =  global.config.firebase.storage.url.get.call(global.config.firebase.storage.url, videoId);
      const contentHTML = `
        <div class='deleteVideoConfirmContent'>
          <div class="deleteVideoImagePreview"><img src="${imageUrl}"></div>
          <div class="deleteVideoConfirmText">${global.resources.addEditPopup.confirmDelete}</div>
        <div>
      `;
      
      global.utils.openLightBox(contentHTML, null, onConfirm, global.resources);
      
    };
    return onDeleteVideo;
  }

  onSubmitAddEditVideo (isEdit, videoId, uploadDate, popupContent, global, isDelete) {
    const onAddEditVideo = () => {
      // validate form
      const errorTxt = popupContent.querySelector('#errorTxt');
      const categoryEng = popupContent.querySelector('#inputCategoryEnglish');
      const categoryHeb = popupContent.querySelector('#inputCategoryHebrew');
      const titleEng = popupContent.querySelector('#inputMainTitleEnglish');
      const titleHeb = popupContent.querySelector('#inputMainTitleHebrew');
      const titleFooterEng = popupContent.querySelector('#inputTitleFooterEnglish');
      const titleFooterHeb = popupContent.querySelector('#inputTitleFooterHebrew');
      const inputYouTubeLink = popupContent.querySelector('#inputYouTubeLink');
      const inputCoverImage = popupContent.querySelector('#inputCoverImage');

      // Social Links
      const links_FB = popupContent.querySelector('#inputSocialLinks_FB').querySelector('input');
      const links_Web = popupContent.querySelector('#inputSocialLinks_Web').querySelector('input');
      const links_Spotify = popupContent.querySelector('#inputSocialLinks_Spotify').querySelector('input');
      const links_Insta = popupContent.querySelector('#inputSocialLinks_Insta').querySelector('input');
      const links_YouTube = popupContent.querySelector('#inputSocialLinks_YouTube').querySelector('input');
      const links_LinkedIn = popupContent.querySelector('#inputSocialLinks_LinkedIn').querySelector('input');
      const links_Twitter = popupContent.querySelector('#inputSocialLinks_Twitter').querySelector('input');

      const keepOriginalCover = isEdit && !document.querySelector('#videoCoverImagePreview').classList.contains('hidden');

      const inputs = [categoryEng, categoryHeb, titleEng, titleHeb, titleFooterEng, titleFooterHeb, inputYouTubeLink, inputCoverImage];
      let hasError = false;
      let elFirstError = null;
      inputs.forEach(element => {
        if ((!(element.getAttribute('type') == 'file' && keepOriginalCover) && (!element.value || element.value == '')) || (element.getAttribute('type') == 'file' && (!keepOriginalCover && (!element.files.length || !element.files[0].name.match(/.(jpg)$/i))))) {
          if (!hasError) { elFirstError = element; }
          element.classList.add('err');
          hasError = true;
        }
      });

      const doOnFocus = (el) => {
        el.classList.remove('err');
      };
      global.utils.attachEventListeners('focus', doOnFocus, inputs);

      if (hasError) { 
        const elem = elFirstError.parentNode.classList.contains('addEditItem') ? elFirstError.parentNode : elFirstError.parentNode.parentNode;
        elem.scrollIntoView();
        return;
      }

      //  TODO - write error text - errorTxt.innerHTML = resources.addEditPopup.errorTxt.missingTitle;

      uploadDate = !isEdit ? (new Date()).getTime() : uploadDate;
      
      const videoData = { categoryEng, categoryHeb, titleEng, titleHeb, titleFooterEng, titleFooterHeb, inputYouTubeLink, links_FB, links_Web, links_Spotify, links_Insta, links_YouTube, links_LinkedIn, links_Twitter };
      global.modules.Firebase.addEditVideo(videoData, inputCoverImage, keepOriginalCover, isEdit, videoId, uploadDate);
      
    };
    return onAddEditVideo;
  }

}

export { AddEditPopup } 