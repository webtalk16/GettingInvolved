import { Config } from '../global/config.js';

class AddEditPopup {

  constructor (global) {
    this.name = 'AddEditPopup';
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
    this.addEditPopup = document.querySelector('#addEditPopup');
    this.onCloseCallback = null;
  } 

  init () {
    console.log('AddEditPopup component is loaded');
  }

  eventHandler (eventName) {
    switch (eventName) {
      case this.global.references.Events.newVideoAdded:
        this.closePopup();
        break;
      default:
        break;
    }
  }

  closePopup () {
    if (this.onCloseCallback) this.onCloseCallback();
  }

  onAddVideoClick (el) {
    const that = this;
    return () => {
      // open add/edit popup
      const socialIcons = that.utils.getSocialIcons('color');
      const header = that.resources.addEditPopup.header.addFeaturedVideo;
      const content = `
        <div class="addEditItem">
          <span class="addEditLabel">${that.resources.addEditPopup.item.category}</span>
          <div class="inputsByLang eng">
            <label for="inputCategoryEnglish">${that.resources.addEditPopup.lang.eng}</label>
            <input type="text" id="inputCategoryEnglish" class="formInput" name="inputCategoryEnglish" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputCategoryHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputCategoryHebrew" class="formInput" name="inputCategoryHebrew" required>
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
            <input type="text" id="inputMainTitleEnglish" class="formInput" name="inputMainTitleEnglish" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputMainTitleHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputMainTitleHebrew" class="formInput" name="inputMainTitleHebrew" required>
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
            <input type="text" id="inputTitleFooterEnglish" class="formInput" name="inputTitleFooterEnglish" required>
          </div>
          <div class="inputsByLang heb">
            <label for="inputTitleFooterHebrew">${that.resources.addEditPopup.lang.heb}</label>
            <input type="text" id="inputTitleFooterHebrew" class="formInput" name="inputTitleFooterHebrew" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.videoTitle2}</span>
          </div>
        </div>
        <div class="addEditItem videoLink">
          <span class="addEditLabel">${that.resources.addEditPopup.item.videoLink}</span>
          <div id="addEditVideoLink">
            <input type="text" id="inputYouTubeLink" class="formInput" name="inputYouTubeLink" required>
          </div>
          <div class="addEditItemHint">
            <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
            <span class="hintExample">${that.resources.addEditPopup.hint.youTubeEmbedLink}</span>
          </div>
        </div>
        <div class="addEditItem videoCover">
          <span class="addEditLabel">${that.resources.addEditPopup.item.coverImage}</span>
          <div id="addEditVideoCover">
            <input type="file" id="inputCoverImage" class="formInput" name="inputCoverImage" required>
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
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialFB}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Web">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
            <div id="inputSocialLinks_Spotify">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialSpotify}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Insta">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
            <div id="inputSocialLinks_YouTube">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialYouTube}</span>
              </div>
            </div>
            <div id="inputSocialLinks_LinkedIn">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample">${that.resources.addEditPopup.hint.socialLinkedIn}</span>
              </div>
            </div>
            <div id="inputSocialLinks_Twitter">
              <input type="text" required>
              <div class="addEditItemHint">
                <span class="hintLabel">${that.resources.addEditPopup.hint.hint}</span>
                <span class="hintExample"></span>
              </div>
            </div>
          </div>
        </div>
        <div id="errorTxt"></div>
        <div class="addEditItem">
          <button id="addEditSubmitBtn" type="submit">${that.resources.addEditPopup.buttonText}</button>
        </div>
      `;
      that.openAddEditPopup(header, content, that.onSubmitAddVideo);
    }
  }

  openAddEditPopup (header, content, onSubmit, onClose) {
    const popupContent = this.addEditPopup.querySelector('#addEditContent');
    const popupHeader = this.addEditPopup.querySelector('#addEditHeader');

    // TODO - fix bug on scroll input hints remain floating
    // TODO - cancel header open on scroll (when popup open), or cancel background scroll
    
    popupHeader.innerHTML = header;
    popupContent.innerHTML = content;

    // on add video form submit (add video)
    const onSubmitNewVideo = document.querySelector('#addEditSubmitBtn');
    this.utils.attachEventListeners('click', onSubmit(popupContent, this.global), [onSubmitNewVideo]);

    this.addEditPopup.classList.add('show');
    popupContent.scrollTop = 0;

    this.onCloseCallback = onClose ? () => { onClose(); this.addEditPopup.classList.remove('show'); } : () => { this.addEditPopup.classList.remove('show') };
    
    const closeBtn = this.addEditPopup.querySelector('.closeBtn');
    this.utils.attachEventListeners('click', this.onCloseCallback, [closeBtn]);
  }

  onSubmitAddVideo (popupContent, global) {
    const onAddVideo = () => {
      console.log('add video button clicked');
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

      const inputs = [categoryEng, categoryHeb, titleEng, titleHeb, titleFooterEng, titleFooterHeb, inputYouTubeLink, inputCoverImage];
      let hasError = false;
      let elFirstError = null;
      inputs.forEach(element => {
        if (!element.value || element.value == '' || (element.getAttribute('type') == 'file' && (!element.files.length || !element.files[0].name.match(/.(jpg)$/i)))) {
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

      // get form vals
      const videoData = { categoryEng, categoryHeb, titleEng, titleHeb, titleFooterEng, titleFooterHeb, inputYouTubeLink, links_FB, links_Web, links_Spotify, links_Insta, links_YouTube, links_LinkedIn, links_Twitter };
      global.modules.Firebase.addNewVideo(videoData, inputCoverImage);
      
    };
    return onAddVideo;
  }

}

export { AddEditPopup } 