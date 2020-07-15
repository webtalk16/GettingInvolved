import { Global } from '../global/global.js';
import { Config } from '../global/config.js'

class Home {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadHome () {
    console.log('Home component is loaded');
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

    // HTML Groups
    const groupItems = [];
    let interactiveBoxes = '';
    let groupItem = '';
    let addedFirstLogo = false;
    for(let prop in this.resources.groups) {
      addedFirstLogo = false;
      groupItem = this.resources.groups[prop];
      groupItems.push(`<div class="interactiveBox">
        <header>${groupItem[this.uiLang]}</header>
        <content>
          <div class="groupItemLogo">
            <img src="images/groups/Logos/${groupItem.logo}" />
          </div>
          <div class="groupItemInfo"><div class="groupLinkedIcons">`);
            if (groupItem.Link.fb) { 
              groupItems.push(`<a href="${groupItem.Link.fb}"><span class="iconFacebook"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.website) { 
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.website}"><span class="iconWebsite"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.email) {
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.email}"><span class="iconEmail"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.donate) {
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.donate}"><span class="iconDonate">Donate</span></a>`);
            }
            groupItems.push(`</div><div class="groupItemDesc">`);
            if (groupItem.info) {
              groupItems.push(`<span>${groupItem.info}</span>`);
            }
            groupItems.push(`</div><div class="groupItemInfoFooter"></div></div>`);
            groupItems.push(`</content>
        <footer></footer>
      </div>`);
      interactiveBoxes = groupItems.join('');
    }

    const calendarLang = this.uiLang == 'heb' ? '&amp;hl=iw' : '';
    const locationImage = this.uiLang == 'heb' ? 'Hebrew' : '';
    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentHome">
        <div class="homeHeader">
          <div class="homeHeaderImage"></div>
          <div class="mainPromotionBox">
            <div class="homePromoBoxContent">
              <p class="category">${this.resources.home.promoBox.category}</p>
              <h1>${this.resources.home.promoBox.date}</h1>
              <p class="title">${this.resources.home.promoBox.title}</p>
            </div>
            <img class="homePromoBoxFooter" src="images/Theme/eventLocation${locationImage}.jpg" width="100%" />
          </div>
        </div>
        <div class="homeContent">
          <div class="youTubeChannelPlaylist">
            <div class="youTubePlaylistHeader">
              <img src="images/content/YouTube-Header.jpg" />
            </div>
            <div class="youTubePlaylists">
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.army.link}')"><img src="${this.resources.youTube.playlists.army.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.meetups.link}')"><img src="${this.resources.youTube.playlists.meetups.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.news.link}')"><img src="${this.resources.youTube.playlists.news.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.pannels.link}')"><img src="${this.resources.youTube.playlists.pannels.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.podcasts.link}')"><img src="${this.resources.youTube.playlists.podcasts.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.radio.link}')"><img src="${this.resources.youTube.playlists.radio.poster}" /></div>
                <div class="playlist" onclick="window.open('${this.resources.youTube.playlists.shows.link}')"><img src="${this.resources.youTube.playlists.shows.poster}" /></div>
            </div>
          </div>
          <div class="leadingGroups">
            <h2 class="leadingGroupsTitle">${this.resources.groupsGeneral.Title1}</h2>
            <h3 class="leadingGroupsTitle">${this.resources.groupsGeneral.Title2}</h3>
            <div class="interactiveBoxes">${interactiveBoxes}</div>
          </div>
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
      <main class="contentTeam">
        <div id="teamHeader">
          <img id="ifcTeamPic" src="/images/Theme/MeetUp5-ZoomScreenshot.png" />
        </div>
        <div id="ourTeamText">
          <h2>${this.resources.about.ourTeam.title}</h2>
        </div>
      </main>
      <main class="contentPlan">
        <div id="aboutHeader">
          <img id="ifcAboutPic" src="/images/Theme/MeetUp5-ZoomScreenshot.png" />
        </div>
        <div id="contentPlanText">
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

    const homePromoBoxFooter = document.querySelector('.homePromoBoxFooter');
    const eventDirections = 'https://docs.google.com/document/d/1PoTf5UFPJ1nN4XFbyjz8s2-CWWe73AeDk4pZrvHDHlY/edit?usp=sharing';
    homePromoBoxFooter.addEventListener('click', function () {
      window.open(eventDirections, '_blank');
    });
  }
}

export { Home } 