import { Global } from '../global/global.js';
import { Config } from '../global/config.js'

class Content {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadContent(){
    console.log('Content component is loaded');
    this.buildHtml();
    this.bindEvents();
    
  }

  buildHtml () {
    const groupLinks = [];
    let groupsHtml= '';
    let group = '';
    let initialized = false;
    for (let prop in this.resources.groups) {
      initialized = false;
      group = this.resources.groups[prop];
      groupLinks.push(`<div class="suportOrg ${prop}">`);
      if (group.banner) {
        groupLinks.push(`<div class="groupBanner"><img src="images/groups/Banners/${group.banner}" /></div>`);
      }
      groupLinks.push(`<div class="orgTitle">${group[this.uiLang]}</div><div class="groupLinkedIcons">`);

      
      if (group.Link.fb) { 
        groupLinks.push(`<a href="${group.Link.fb}"><span class="iconFacebook"></span></a>`);
        initialized = true;
      }
      if (group.Link.website) { 
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href="${group.Link.website}"><span class="iconWebsite"></span></a>`);
        initialized = true;
      }
      if (group.Link.email) {
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href="${group.Link.email}"><span class="iconEmail"></span></a>`);
        initialized = true;
      }
      if (group.Link.donate) {
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href="${group.Link.donate}"><span class="iconDonate">Donate</span></a>`);
      }
      groupLinks.push(`</div></div>`);
    }
    groupsHtml = groupLinks.join('');

    const planItems = [];
    let planHtml= '';
    let item = '';
    planItems.push(`<h2>${this.resources.about.organizationalPlan.title}</h2>`);
    planItems.push('<div class="infoBoxes">');
    for (let prop in this.resources.about.organizationalPlan.info) {
      item = this.resources.about.organizationalPlan.info[prop];
      planItems.push(`<div class="infoBox">
                        <h3>${item.title}</h3>
                        <conent>${item.content}<conent>
                        <footer></footer>
                      </div>`);
    }
    planItems.push('</div>');
    planHtml = planItems.join('');

    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer">
          <main class="contentAbout">
            <div id="teamPic">
              <img id="ifcTeamPic" src="/images/Theme/MeetUp5-ZoomScreenshot.png" />
            </div>
            <div id="teamPicText">
              ${planHtml}
            </div>
          </main>
          <main class="contentFbPage">
            <div style="text-align: center;">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIsraeli-Free-Market-Coalition-107814867514490%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
          </main>
          <main class="contentDonate">
            <div style="text-align: center;">
              <div class="donationImage">
                <img id="mainPhotoStreetMeetup" src="/images/MainPhotoStreetMeetup.jpg" width="100%" />
                <div class="donateButtons">
                  <div class="donateTitle">${this.resources.donate.title}</div>
                </div>
              </div>
              <div class='donateButton campaign'>
                <span class="donateButtonText">${this.resources.donate.buttonCampaign}</span>
              </div>
              <div class='donateButton general'>
                <span class="donateButtonText">${this.resources.donate.buttonGeneral}</span>
              </div>
              <div class="supportOthers">
                <h2>ניתן גם לתמוך ולתרום באופן ישיר לארגונים
                   ש-IFC תומכת בהם
                  כגון:
                </h2>
                <div>${groupsHtml}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
    const donateBtnGeneral = document.querySelector('.donateButton.general');
    const ifcDonatePaypal = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9EGG93TWBLKMQ&source=url';
    donateBtnGeneral.addEventListener('click', function () {
      window.open(ifcDonatePaypal, '_blank');
    });

    const donateBtnCampaign = document.querySelector('.donateButton.campaign');
    const ifcDonateDrove = 'https://drove.com/.294k';
    donateBtnCampaign.addEventListener('click', function () {
      window.open(ifcDonateDrove, '_blank');
    });
  }
}

export { Content } 