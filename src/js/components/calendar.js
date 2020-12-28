class Calendar {

  constructor (global) {
    this.name = 'Calendar';
    this.global = global;
    this.resources = this.global.getResources();
    this.uiLang = this.global.config.uiLang.get.call(this.global.config.uiLang);
  } 

  init () {
    console.log('Calendar component is loaded');
    this.buildHtml();
    this.bindEvents();
  }

  buildHtml () {
    const calendarLang = this.uiLang == 'heb' ? '&amp;hl=iw' : '';
    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentCalendar">
        <div class="calendarHeader">
          <img id="calendarHeaderImage" src="/images/Theme/calendarHeader.jpg" />
        </div>
        <div class="calendarWrapper">
          <iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FJerusalem&amp;src=amltbXlqbGV2eUBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=NzdiZjBlOGtjMWhvbWd2bWQyYjNidGkyYjBAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=Y3E3MmpxajZqNnUxbDEwdXJqZ2xlNzM1bnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4uamV3aXNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%23A79B8E&amp;color=%239E69AF&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showCalendars=0&amp;showTz=1${calendarLang}" style="border:none" width="100%" height="500" frameborder="0" scrolling="no"></iframe>
        </div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  bindEvents () {
  }
}

export { Calendar } 