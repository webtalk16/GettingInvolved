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
    // HTML other organization info
    const groupLinks = [];
    let groupsHtml= '';
    let group = '';
    let initialized = false;
    for (let prop in this.resources.groups) {
      initialized = false;
      group = this.resources.groups[prop];
      groupLinks.push(`<div class="suportOrg ${prop}"><div class="supportOrgWrapper">`);
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
      groupLinks.push(`</div></div></div>`);
    }
    groupsHtml = groupLinks.join('');

    // HTML Organizational Plan info
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

    const calendarLang = this.uiLang == 'heb' ? '&amp;hl=iw' : '';
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="contentMain">
        <div id="contentContainer">
          <main class="contentAbout">
            <div id="aboutHeader">
              <img id="ifcTeamPic" src="/images/Theme/MeetUp5-ZoomScreenshot.png" />
            </div>
            <div id="teamPicText">
              ${planHtml}
            </div>
            <div class="planLinks">
              <a class="planUpdateLink" href="${this.resources.about.organizationalPlan.planUpdateLink}">
                <span>
                <span class="planUpdateText">${this.resources.about.organizationalPlan.planUpdateText}</span>
                <br>
                <span class="planUpdateDate">${this.resources.about.organizationalPlan.planUpdateDate}</span>
                </span>
              </a>
            </div>
          </main>
          <main class="contentFbPage">
            <div class="fbPageHeader">IFC - Israeli Free-Market Coalition</div>
            <div class="fbPageLeftCover"></div>
            <div class="fbPageWrapper">
              <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIsraeli-Free-Market-Coalition-107814867514490%2F&tabs=timeline&width=340&height=465&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="465" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div class="fbPageRightCover"></div>
            </main>
          <main class="contentDonate">
            <div style="text-align: center;">
              <div class="donationImage">
                <img id="mainPhotoStreetMeetup" src="/images/MainPhotoStreetMeetup.png" width="100%" />
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
          <main class="contentCalendar">
            <div class="calendarHeader">
              <img id="calendarHeaderImage" src="/images/Theme/calendarHeader.png" />
            </div>
            <div class="calendarWrapper">
              <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=amltbXlqbGV2eUBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=NzdiZjBlOGtjMWhvbWd2bWQyYjNidGkyYjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=Y3E3MmpxajZqNnUxbDEwdXJqZ2xlNzM1bnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4uamV3aXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%23A79B8E&amp;color=%239E69AF&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showCalendars=0&amp;showTz=1${calendarLang}" style="border:none" width="100%" height="500" frameborder="0" scrolling="no"></iframe>
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