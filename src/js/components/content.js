import { Global } from '../global/global.js';

class Content {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
  } 

  loadContent(){
    console.log('Content component is loaded');
    this.buildHtml();
  }

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer">
          <main class="contentAbout">
            <div id="teamPic">
              <img id="ifcTeamPic" src="/images/Theme/MeetUp5-ZoomCover.jpg" />
              <div id="teamPiclabel"></div>
            </div>
            <div id="teamPicText">${this.resources.about.oragizationPlan}</div>
          </main>
          <main class="contentFbPage">
            <div style="text-align: center;">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIsraeli-Free-Market-Coalition-107814867514490%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
          </main>
          <main class="contentDonate">
            <div style="text-align: center;">
              Donate here
            </div>
          </main>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }
}

export { Content } 