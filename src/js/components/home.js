import { Global } from '../global/global.js';
import { Utils } from '../global/utils.js';
import { Config } from '../global/config.js';
import { Calendar } from './calendar.js';
import { Donate } from './donate.js';
import { Feed } from './feed.js';
import { Plan } from './plan.js';
import { Team } from './team.js';

class Home {

  constructor () {
    this.global = new Global();
    this.utils = new Utils();
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadHome () {
    console.log('Home component is loaded');
    this.loadPages();
    this.buildHtml();
    this.bindEvents();
  }

  loadPages () {
    const CalendarPage = new Calendar();
    CalendarPage.loadPage();
    const DonatePage = new Donate();
    DonatePage.loadPage();
    const FeedPage = new Feed();
    FeedPage.loadPage();
    const PlanPage = new Plan();
    PlanPage.loadPage();
    const TeamPage = new Team();
    TeamPage.loadPage();
  }

  buildHtml () {

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
              groupItems.push(`<a href="${groupItem.Link.fb}" target="_blank"><span class="iconFacebook"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.website) { 
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.website}" target="_blank"><span class="iconWebsite"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.email) {
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href=mailto:"${groupItem.Link.email}"><span class="iconEmail"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.phone) {
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="tel:${groupItem.Link.phone}"><span class="iconPhone"></span></a>`);
              addedFirstLogo = true;
            }
            if (groupItem.Link.donate) {
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.donate}" target="_blank"><span class="iconDonate">Donate</span></a>`);
            }
            groupItems.push(`</div><div class="groupItemDesc">`);
            if (groupItem.info) {
              groupItems.push(`<span class="groupItemDescText">${groupItem.info}</span>`);
            }
            groupItems.push(`</div><div class="groupItemInfoFooter"></div></div>`);
            groupItems.push(`</content>
        <footer></footer>
      </div>`);
      interactiveBoxes = groupItems.join('');
    }

    // HTML Activist Program Speakers
    const speakers = [];
    let activistProgramHTML = '';
    let speaker = '';
    for(let prop in this.resources.activistTraining.lecturers) {
      speaker = this.resources.activistTraining.lecturers[prop];
      speakers.push(`<div class="activistProgramLecturer">
                      <div class="activistProgramLecturerName">${speaker.name}</div>
                      <div class="activistProgramLecturerTitle">${speaker.title}</div>
                    </div>
      `);
    }
    activistProgramHTML = speakers.join('');

    const locationImage = this.uiLang == 'heb' ? 'Hebrew' : '';
    const rootEl = document.querySelector('#contentContainer');
    const activistTrainingGroupsImg = this.uiLang == 'heb' ? 'ActivistProgramGroups-straight' : 'ActivistProgramGroups-arrows';
    const activistTrainingPeopleImg = this.uiLang == 'heb' ? 'ActivistProgramPeople' : 'ActivistProgramPeople-noText';
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
          <div>
            <div class="activistProgramHeader">
              <h2 class="activistProgramTitle">${this.resources.activistTraining.title}</h2>
            </div>
            <div class="activistProgram">
              <div class="activistProgramItem activistProgramPeople">
                <div class="activistProgramPeopleHeader">
                  <div class="activistProgramPeopleTitle">${this.resources.activistTraining.peopleTitle}</div>
                  <div class="activistProgramPeopleTitle2">${this.resources.activistTraining.peopleTitle2}</div>
                </div>
                <img class="imgActivistProgram imgActivistProgramPeople" src="images/content/activistProgram/${activistTrainingPeopleImg}.png" />
              </div>
              <div class="activistProgramItem activistProgramLecturers">
                <div class="activistProgramLecturersTitle">${this.resources.activistTraining.lecturersTitle}</div>
                <div class="activistProgramLecturersList">${activistProgramHTML}</div>
              </div>
              <div class="activistProgramItem activistProgramGroups">
                <div class="activistProgramGroupsHeader">
                  <div class="activistProgramGroupsTitle">${this.resources.activistTraining.groupsTitle}</div>
                  <div class="activistProgramGroupsTitle2">${this.resources.activistTraining.groupsTitle2}</div>
                </div>
                <img class="imgActivistProgram imgActivistProgramGroupArrows" src="images/content/activistProgram/${activistTrainingGroupsImg}.png" />
              </div>
            </div>
            <div class="activistProgramFooter"><div class="activistProgramTitle2">${this.resources.activistTraining.title2}</div></div>
          </div>
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
    `;
    rootEl.insertAdjacentHTML('beforeend', html);

    this.utils.readMoreTruncate(rootEl.querySelectorAll('.groupItemDesc'), '.groupItemDescText', 5);
  }

  bindEvents () {
    const homePromoBoxFooter = document.querySelector('.homePromoBoxFooter');
    const eventDirections = 'https://docs.google.com/document/d/1PoTf5UFPJ1nN4XFbyjz8s2-CWWe73AeDk4pZrvHDHlY/edit?usp=sharing';
    homePromoBoxFooter.addEventListener('click', function () {
      window.open(eventDirections, '_blank');
    });
  }
}

export { Home } 