import { Global } from '../global/global.js';
import { Config } from '../global/config.js';

class Plan {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadPage () {
    console.log('Plan component is loaded');
    this.buildHtml();
    this.bindEvents();
  }

  buildHtml () {

    // HTML Organizational Plan info
    const planItems = [];
    let planHtml= '';
    let item = '';
    planItems.push(`<h2>${this.resources.about.organizationalPlan.title}</h2>`);
    planItems.push('<div class="infoBoxes">');
    for (let prop in this.resources.about.organizationalPlan.info) {
      item = this.resources.about.organizationalPlan.info[prop];
      planItems.push(`<div class="infoBox">
                        <h3 class="infoBoxTitle">${item.title}</h3>
                        <content>${item.content}</content>
                        <footer></footer>
                      </div>`);
    }
    planItems.push('</div>');
    planHtml = planItems.join('');

    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentPlan">
        <div id="aboutHeader">
          <img id="ifcAboutPic" src="/images/Theme/MeetUp5-ZoomScreenshot.jpg" />
        </div>
        <div id="contentPlanText">
          ${planHtml}
        </div>
        <div class="planLinks">
          <a class="planUpdateLink" href="${this.resources.about.organizationalPlan.planUpdateLink}" target="_blank">
            <span>
            <span class="planUpdateText">${this.resources.about.organizationalPlan.planUpdateText}</span>
            <br>
            <span class="planUpdateDate">${this.resources.about.organizationalPlan.planUpdateDate}</span>
            </span>
          </a>
        </div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
  }
}

export { Plan } 