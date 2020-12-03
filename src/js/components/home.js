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
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
    this.videos = this.global.getVideos();
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
            if (groupItem.Link.linkedIn) { 
              if (addedFirstLogo) groupItems.push(`<span class="iconDivider"></span>`);
              groupItems.push(`<a href="${groupItem.Link.linkedIn}" target="_blank"><span class="iconlinkedIn"></span></a>`);
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

    // HTML video carousel
    const videos = [];
    let videoInfo = '';
    let videoHTML = '';
    videos.push(`<div id="watchVideoLeftArrow"></div>`);
    videos.push(`<div id="watchVideosWrapper">`);
    for (let prop in this.videos) {
      videoInfo = this.videos[prop];
      videos.push(`
        <div class="watchVideoContainer" data-video-id="${prop}">
          <div class="watchVideoPoster" style="background-image: url(videos/${prop}/placeholder.jpg);"></div>
          <div class="watchVideoCategory">${videoInfo[this.uiLang].category}</div>
          <div class="watchVideoTitle">${videoInfo[this.uiLang].title}</div>
          <div class="watchVideoFooter">${videoInfo[this.uiLang].title2}</div>
        </div>
      `);
    }
    videos.push(`</div>`);
    videos.push(`<div id="watchVideoRightArrow"></div>`);
    videoHTML = videos.join('');

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
          <div class="watchOnIFC">
            <h2>${this.resources.video.viewOn}</h2>
            <div class="watchIFCvideos">
              ${videoHTML}
            </div>
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
    // Event Directions Link
    const homePromoBoxFooter = document.querySelector('.homePromoBoxFooter');
    const eventDirections = 'https://docs.google.com/document/d/1PoTf5UFPJ1nN4XFbyjz8s2-CWWe73AeDk4pZrvHDHlY/edit?usp=sharing';
    homePromoBoxFooter.addEventListener('click', function () {
      window.open(eventDirections, '_blank');
    });

    // Homepage Videos Click
    const watchVideoContainer = document.querySelectorAll('.watchVideoContainer');
    const numOfVideoItems = watchVideoContainer.length;
    for (let i = 0; i < numOfVideoItems; i++) {
      watchVideoContainer[i].addEventListener('click', function (that) {
        return function () {
          const videoId = this.getAttribute('data-video-id');
          const videoData = that.videos[videoId];
          that.utils.openVideoPlayer(videoId, videoData, that.resources);
        }
      }(this));
    }

    // Homepage Videos Scroll Arrows
    const isRTL = this.uiLang == 'heb';
    const videoScrollElement = document.querySelector('#watchVideosWrapper');
    const watchVideoLeftArrow = document.querySelector('#watchVideoLeftArrow');
    const watchVideoRightArrow = document.querySelector('#watchVideoRightArrow');
    const arrowBack = isRTL ? watchVideoRightArrow : watchVideoLeftArrow;
    const arrowFoward = isRTL ? watchVideoLeftArrow : watchVideoRightArrow;

    watchVideoLeftArrow.addEventListener('click', function (that, numVideos) {
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
  }
}

export { Home } 