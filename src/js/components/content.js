const rootEl = document.querySelector('#appMain');

class Content {
  loadContent(){
    console.log('Content component is loaded');
    this.buildHtml();
  }

  buildHtml () {
    const html = `
      <div id="contentMain">
        <div id="contentContainer">
          <aside class="contentAside">
            <div id="teamPic">
            <div id="teamPiclabel">נציגי קבוצת הליברלים בליכוד</div>
            <div id="teamPicText">
                <p>
                  <span style="font-weight: 400;">אנחנו מאמינים כי הפרט הוא ריבון לעצמו ואבן היסוד של המדינה. אנחנו מאמינים כי תפקיד המדינה הוא להרחיב את חירויות הפרט, לרבות החירויות האישיות והקנייניות, ולדאוג לביטחון ולמשפט צדק הנדרשים להבטחת זכויות אלה.</span>
                </p>
                <p>
                  <span style="font-weight: 400;">אנחנו חברי ליכוד ותיקים וחדשים מכל קצוות הארץ המעוניינים לקדם את הערכים הליברליים </span><b>חופש הפרט</b><span style="font-weight: 400;"> ו</span><b>השוק החופשי</b><span style="font-weight: 400;"> בליכוד בפרט ובמדינה בכלל.</span>
                </p>
              </div>
              <img id="liberalimTeamPic" src="/images/Theme/liberalimTeamPic.png" />
            </div>
          </aside>
          <main class="contentMain">
            <div style="text-align: center;">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTheIsraeliCitizen%2F&tabs=timeline%2C%20events%2C%20messages&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=267391923615424" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
            </div>
          </main>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }
}

export { Content } 