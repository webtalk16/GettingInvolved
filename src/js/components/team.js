import { Config } from '../global/config.js';

class Team {

  constructor (global) {
    this.name = 'Team';
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
  } 

  init () {
    console.log('Team component is loaded');
    this.buildHtml();
    this.bindEvents();
  }

  buildHtml () {

    // HTML Our Team
    const teamMembers = [];
    let teamMemberLinks = [];
    let teamHtml = '';
    let memberLinksHtml = '';
    let member = '';
    teamMembers.push(`<h2>${this.resources.about.ourTeam.title}</h2>`);
    teamMembers.push('<div class="infoBoxes">');
    let initFirstLink = false;
    for (let prop in this.resources.about.ourTeam.team) {
      member = this.resources.about.ourTeam.team[prop];

      // HTML Member Links
      initFirstLink = false;
      teamMemberLinks = [];
      teamMemberLinks.push(`<div class="memeberLinkedIcons">`);
      if (member.links.fb) { 
        teamMemberLinks.push(`<a href="${member.links.fb}" target="_blank"><span class="iconFacebook"></span></a>`);
        initFirstLink = true;
      }
      if (member.links.website) { 
        if (initFirstLink) teamMemberLinks.push(`<span class="iconDivider"></span>`);
        teamMemberLinks.push(`<a href="${member.links.website}" target="_blank"><span class="iconWebsite"></span></a>`);
        initFirstLink = true;
      }
      if (member.links.twitter) {
        if (initFirstLink) teamMemberLinks.push(`<span class="iconDivider"></span>`);
        teamMemberLinks.push(`<a href="${member.links.twitter}" target="_blank"><span class="iconTwitter"></span></a>`);
        initFirstLink = true;
      }
      if (member.links.linkedIn) {
        if (initFirstLink) teamMemberLinks.push(`<span class="iconDivider"></span>`);
        teamMemberLinks.push(`<a href="${member.links.linkedIn}" target="_blank"><span class="iconLinkedIn"></span></a>`);
        initFirstLink = true;
      }
      if (member.links.email) {
        if (initFirstLink) teamMemberLinks.push(`<span class="iconDivider"></span>`);
        teamMemberLinks.push(`<a href="mailto:${member.links.email}"><span class="iconEmail"></span></a>`);
        initFirstLink = true;
      }
      if (member.links.phone) {
        if (initFirstLink) teamMemberLinks.push(`<span class="iconDivider"></span>`);
        teamMemberLinks.push(`<a href="tel:${member.links.phone}"><span class="iconPhone"></span></a>`);
      }
      teamMemberLinks.push(`</div>`);
      memberLinksHtml = teamMemberLinks.join('');

      // HTML Member Infobox
      teamMembers.push(`<div class="infoBox">
                        <header>
                          <h3 class="infoBoxTitle">${member.name}</h3>
                          <div class="memberTitle">${member.title}</div>
                        </header>
                        <content>
                          <div class="teamMemberPic"><img src="${member.pic}" /></div>
                          <div class="teamMemberAbout">${member.about}</div>
                        </content>
                        <footer>${memberLinksHtml}</footer>
                      </div>`);
    }
    teamMembers.push('</div>');
    teamHtml = teamMembers.join('');

    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentTeam">
        <div id="teamHeader">
          <img id="ifcTeamPic" src="/images/Theme/MeetUp5-ZoomScreenshot.jpg" />
        </div>
        <div id="ourTeamText">
          ${teamHtml}
        </div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
  }
}

export { Team } 