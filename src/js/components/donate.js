class Donate {

  constructor (global) {
    this.name = 'Donate';
    this.global = global;
    this.resources = this.global.getResources();
    this.uiLang = this.global.config.uiLang.get.call(this.global.config.uiLang);
  } 

  init () {
    console.log('Donate component is loaded');
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
        groupLinks.push(`<a href="${group.Link.fb}" target="_blank"><span class="iconFacebook"></span></a>`);
        initialized = true;
      }
      if (group.Link.website) { 
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href="${group.Link.website}" target="_blank"><span class="iconWebsite"></span></a>`);
        initialized = true;
      }
      if (group.Link.email) {
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href=mailto:"${group.Link.email}"><span class="iconEmail"></span></a>`);
        initialized = true;
      }
      if (group.Link.donate) {
        if (initialized) groupLinks.push(`<span class="iconDivider"></span>`);
        groupLinks.push(`<a href="${group.Link.donate}" target="_blank"><span class="iconDonate">Donate</span></a>`);
      }
      groupLinks.push(`</div></div></div>`);
    }
    groupsHtml = groupLinks.join('');

    const rootEl = document.querySelector('#contentContainer');
    const html = `
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
          <div class="supportOthers">
            <h2>ניתן גם לתמוך ולתרום באופן ישיר לארגונים
                ש-IFC תומכת בהם
              כגון:
            </h2>
            <div>${groupsHtml}</div>
          </div>
        </div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
    const donateBtnCampaign = document.querySelector('.donateButton.campaign');
    const ifcDonateDrove = 'https://drove.com/.294k';
    donateBtnCampaign.addEventListener('click', function () {
      window.open(ifcDonateDrove, '_blank');
    });
  }
}

export { Donate } 