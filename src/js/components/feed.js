import { Global } from '../global/global.js';
import { Config } from '../global/config.js';

class Feed {

  constructor () {
    this.global = new Global();
    this.resources = this.global.getResources();
    this.posts = this.global.getPosts();
    this.uiLang = Config.uiLang.get.call(Config.uiLang)
  } 

  loadPage () {
    console.log('Feed component is loaded');
    this.buildHtml();
  }

  buildHtml () {

    const rootEl = document.querySelector('#contentContainer');
    // Page Embed
    // const html = `
    //   <main class="contentPosts">
    //     <div class="fbPageHeader">IFC - Israeli Free-Market Coalition</div>
    //     <div class="fbPageLeftCover"></div>
    //     <div class="fbPageWrapper">
    //       <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIsraeli-Free-Market-Coalition-107814867514490%2F&tabs=timeline&width=340&height=465&small_header=false&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="465" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
    //     </div>
    //     <div class="fbPageRightCover"></div>
    //   </main>
    // `;
    // const scriptHTML = `<div id="fb-root"></div><script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=267391923615424&autoLogAppEvents=1" nonce="40B4fouT"></script>`
    // rootEl.insertAdjacentHTML('beforeend', scriptHTML);
    // Post Embed
    // const html = `
    //   <main class="contentPosts">
    //     <div class="fbPageHeader">IFC - Israeli Free-Market Coalition</div>
    //     <div class="fbPageLeftCover"></div>
    //     <div class="fbPageWrapper">
    //       <div class="fb-post" data-href="https://www.facebook.com/IFC.Israel/posts/158092269153416" data-show-text="true" data-width=""><blockquote cite="https://developers.facebook.com/IFC.Israel/posts/158092269153416" class="fb-xfbml-parse-ignore"><p>אנו שמחים לבשר כי החממה הליברלית לאקטיביסטים יוצאת לדרך!
    //       ב-22/7, שבוע הבא, תתחיל ההכשרה של המחזור הראשון.
    //       ההכשרה מיועדת...</p>Posted by <a href="https://www.facebook.com/IFC.Israel/">IFC - Israeli Free-Market Coalition</a> on&nbsp;<a href="https://developers.facebook.com/IFC.Israel/posts/158092269153416">Sunday, July 12, 2020</a></blockquote>
    //        </div>
    //     </div>
    //     <div class="fbPageRightCover"></div>
    //   </main>
    // `;
    let post = '';
    let user = '';
    let postMedia = '';
    let postText = '';
    let postsHtml = '';
    let socialLinks = [];
    let linksHTML = '';
    let link = '';
    for (let prop in this.posts.posts) {
      post = this.posts.posts[prop];
      user = this.posts.users[post.user];
      
      postMedia = '';
      if (post.media.image) {
        const mediaImg = `<div class="postMedia"><img src="posts/${prop}/${post.media.image}" /></div>`;
        postMedia = mediaImg;
        if (post.media.imageLink) {
          postMedia =`<a href="${post.media.imageLink}" target="_blank">${mediaImg}</a>`
        }
      }
      else if (post.media.video) {
        postMedia = `<div class="postMedia"><video src="posts/${prop}/${post.media.video}"></video></div>`
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