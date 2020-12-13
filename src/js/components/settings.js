import { Config } from '../global/config.js';

class Settings {

  constructor (global) {
    this.name = 'Settings';
    this.global = global;
    this.utils = global.utils;
    this.resources = this.global.getResources();
    this.uiLang = Config.uiLang.get.call(Config.uiLang);
  } 

  init () {
    console.log('Settings component is loaded');
    this.buildHtml();
    this.bindEvents();
  }

  buildHtml () {
    const user = this.global.getUser();
    console.log('@@@@@@ Settings user @@@@@')
    console.log(user)
    console.log('@@@@@@ Settings user @@@@@')
    // HTML Settings
    const rootEl = document.querySelector('#contentContainer');
    const html = `
      <main class="contentSettings">
        <div id="settingsHeader"></div>
        <div id="settingsContent">
          <h3 id="settingsPageTitle">${this.resources.settings.title}</h3>
          <div id="settingsInfo">
            <div class="settings_Item" id="settings_username">
              <span class="settingsLabel">${this.resources.settings.info.user.username}: </span>
              <span class="settingsValue"></span>
              <span class="settingUserRole hidden adminOnly">${this.resources.settings.roles.admin}</span>
            </div>
            <div class="settings_Item hidden adminOnly" id="settings_addRole">
              <span class="settingsLabel">${this.resources.settings.roles.addAdmin}: </span>
              <span class="settingsValue">
                <label class="labelAddAdmin" for="addAdmin">${this.resources.settings.info.user.email}</label>
                <input id="inputAddAdmin" class="settingsFormInput" type="email" placholder="${this.resources.settings.info.user.email}" name="addAdmin" required>
                <button type="submit">${this.resources.settings.actions.add}</button>
                <div id="settings_addAdminErrorTxt"></div>
              </span>
            </div>
          </div>
        </div>
      </main>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  htmlInitialized () {
    const contentSettings = document.querySelector('.contentSettings');
    return !!contentSettings;
  }

  eventHandler (eventName) {
    switch (eventName) {
      case this.global.references.Events.userStateChangd:
        this.updateUserData();
        break;
      default:
        break;
    }
  }

  updateUserData () {
    const that = this;
    const user = that.global.getUser();

    if (this.htmlInitialized()) {

      // Update Values
      const username = document.querySelector('#settings_username').querySelector('.settingsValue');
      if (user) {
        username.innerHTML = user.email;
      }
      else {
        username.innerHTML = this.resources.settings.notLoggedIn;
      }
    }
  }

  bindEvents () {
    const that = this;
    const addAdminBtn = document.querySelector('#settings_addRole').querySelector('button');
    const inputAddAdmin = document.querySelector('#inputAddAdmin');
    const addAdminErrorTxt = document.querySelector('#settings_addAdminErrorTxt');

    addAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addAdminErrorTxt.innerHTML = '';
      
      if (inputAddAdmin.value == '') {
        addAdminErrorTxt.innerHTML = this.global.resources.login.errorTxt.emptyEmail;
        return;
      }
      
      const regExValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!inputAddAdmin.value.match(regExValidEmail)) {
        addAdminErrorTxt.innerHTML = this.global.resources.login.errorTxt.invalidEmail;
        return;
      }

      console.log('Add Admin btn - admin name: ' + inputAddAdmin.value);

      // Reference to Firebase function - does not yet call it
      const addAdminRole = that.global.functions.httpsCallable('addAdminRole');
      addAdminRole({ email: inputAddAdmin.value}).then(result => {
        inputAddAdmin.value = '';
        addAdminErrorTxt.innerHTML = '';
        console.log('addAdminRole result -----');
        console.log(result);
        console.log('addAdminRole result -----');
        // TODO - refresh credentials - so that will not need to log in/out
      });
    });

    // Clear Error text on input focus
    inputAddAdmin.addEventListener('focus', () => {
      addAdminErrorTxt.innerHTML = '';
    });
  }
}

export { Settings } 