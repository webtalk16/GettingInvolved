import { Config } from '../global/config.js';

class Feed {

  constructor (global) {
    this.name = 'Feed';
    this.global = global;
    this.resources = this.global.getResources();
    this.posts = this.global.getPosts();
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
  } 

  init () {
    console.log('Feed component is loaded');
    this.buildHtml();
  }

  buildHtml () {

    const rootEl = document.querySelector('#contentContainer');
    let post = '';
    let user = '';
    let postMedia = '';
    let postText = '';
    let postsHtml = '';
    let socialLinks = [];
    let linksHTML = '';
    let link = '';
    let allPosts = this.posts.posts.sort((a,b) => { return b.dateTime - a.dateTime;});

    for (let i = 0; i < allPosts.length; i++) {
      post = allPosts[i];
      user = this.posts.users[post.user];
      
      postMedia = '';
      if (post.media.image) {
        const mediaImg = `<div class="postMedia"><img src="posts/${post.dateTime}/${post.media.image}" /></div>`;
        postMedia = mediaImg;
        if (post.media.imageLink) {
          postMedia =`<a href="${post.media.imageLink}" target="_blank">${mediaImg}</a>`
        }
      }
      else if (post.media.video) {
        postMedia = `<div class="postMedia"><video src="posts/${post.dateTime}/${post.media.video}"></video></div>`
      }
      else if (post.media.videoEmbed) {
        postMedia = `<div class="postMedia">${post.media.videoEmbed}</div>`
      }

      postText = post.text ? `<div class="postTextContainer"><div class="postText">${post.text}</div></div>` : '';

      socialLinks = [];
      for (let obj in post.socialLinks) {
        link = post.socialLinks[obj];
        if (link) {
          socialLinks.push(`
            <div class="postSocialIcon">
              <a href="${link}" target="_blank">
                <img src="${this.posts.icons[obj]}" />
              </a>
            </div>
          `);
        }
      }
      linksHTML = socialLinks.length ? ('<div class="postSocialLinks"><div class="socialLinksTxt">' + this.resources.posts.viewOn + '</div> ' + socialLinks.join('') + '</div>') : '';

      postsHtml += `<div class="postContainer">
                      <div class="postHeader">
                        <div class="postHeaderLogo" style="background-image: url(${user.logo})"></div>
                        <div class="postHeaderInfo">
                          <div class="postHeaderInfoTitle">${user.name}</div>
                          <div class="postHeaderInfoDate">${this.dateTimeOfPost(post.dateTime)}</div>
                        </div>
                      </div>
                      ${postText}
                      ${postMedia}
                      ${linksHTML}
                    </div>`;
    }
    const html = `
      <main class="contentPosts">
        <div class="postsPageHeader"></div>
        <div class="postsPageWrapper">${postsHtml}</div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);

    var facebookSDK = document.createElement('script');
    facebookSDK.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
    facebookSDK.defer = true;
    rootEl.appendChild(facebookSDK);
  }

  dateTimeOfPost (timestamp) {
    let formatedDate = '';
    const currentDate = new Date().getTime();
    const date = new Date(timestamp);
    const datePosted = date.getTime();

    //Diff in hours
    const diff =(currentDate - datePosted) / 1000;
    const diffMinutes = Math.round(diff / (60));
    const diffHours = Math.round(diff / (60 * 60));
    const diffDays = Math.round(diff / (60 * 60 * 24));
    const diffMonths = Math.round(diff / (60 * 60 * 24 * 30));

    if (diffMinutes < 60) {
      if (diffMinutes < 2) { 
        formatedDate = this.resources.dateTime.now;
      }
      else {
        formatedDate = this.resources.dateTime.minutesAgo.replace('@@@', diffMinutes)
      }
    } else if (diffHours < 24) {
      if (diffHours == 1) {
        formatedDate = this.resources.dateTime.hourAgo.replace('@@@', diffHours)
      }
      else {
        formatedDate = this.resources.dateTime.hoursAgo.replace('@@@', diffHours)
      }
    } else if (diffDays < 60) {
      if (diffDays == 1) {
        formatedDate = this.resources.dateTime.dayAgo.replace('@@@', diffDays)
      }
      else {
        formatedDate = this.resources.dateTime.daysAgo.replace('@@@', diffDays)
      }
    } else {
      if (diffMonths == 1) {
        formatedDate = this.resources.dateTime.monthAgo.replace('@@@', diffMonths)
      }
      else {
        formatedDate = this.resources.dateTime.monthsAgo.replace('@@@', diffMonths)
      }
    }

    // const datevalues = {
    //   year: date.getFullYear(),
    //   month: date.getMonth() + 1,
    //   day: date.getDate(),
    //   hour: date.getHours(),
    //   minute: date.getMinutes(),
    //   second: date.getSeconds(),
    // };
    // const hours = (datevalues.hour < 10 ? "0" : "") + datevalues.hour;
    // const minutes = (datevalues.minute < 10 ? "0" : "") + datevalues.minute;
    // const time = hours + ':' + minutes;
    // formatedDate = time;

    return formatedDate;

  }
}

export { Feed } 