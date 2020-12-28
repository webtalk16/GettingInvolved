import { VideoCarousel } from '../components/videoCarousel.js';
import { AddEditPopup } from '../components/addEditPopup.js';
import { Home } from '../components/home.js';
import { Calendar } from '../components/calendar.js';
import { Donate } from '../components/donate.js';
import { Feed } from '../components/feed.js';
import { Plan } from '../components/plan.js';
import { Team } from '../components/team.js';
import { Settings } from '../components/settings.js';

class Content {

  constructor (global) {
    this.name = 'Content';
    this.global = global;
    this.resources = this.global.getResources();
    this.uiLang = this.global.config.uiLang.get.call(this.global.config.uiLang);
  } 

  init () {
    console.log('Content component is loaded');
    this.buildHtml();
    this.loadPages();
  }

  loadPages () {
    this.global.addModule(VideoCarousel);
    this.global.addModule(AddEditPopup);
    this.global.addModule(Home);
    this.global.addModule(Calendar);
    this.global.addModule(Donate);
    this.global.addModule(Feed);
    this.global.addModule(Plan);
    this.global.addModule(Team);
    this.global.addModule(Settings);
  }

  // loadScripts (rootEl) {
  //   const FacebookSDK = `
  //   <div id="fb-root"></div>
  //   <script async defer src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2"></script>
  //   `;
  //   rootEl.insertAdjacentHTML('beforeend', FacebookSDK);
  // }

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer"></div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
    // this.loadScripts(rootEl);
  }
}

export { Content } 