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
    // console.log('@@@@@@ Settings user @@@@@');
    // console.log(user)
    // console.log('@@@@@@ Settings user @@@@@');
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
              <span id="settingsUserRole" class="settingsUserRole hidden loggedinOnly"></span>
            </div>
            <div class="settings_Item hidden ownerOnly" id="settings_addRole">
              <span class="settingsLabel">${this.resources.settings.roles.addRole}: </span>
              <span class="settingsValue">
                <div class="settingsValueRow">
                  <label class="settingsValueRowLabel" for="addRole">${this.resources.settings.info.user.email}</label>
                  <input id="inputAddRoleEmail" class="settingsValueRowValue" type="email" placholder="${this.resources.settings.info.user.email}" name="addRole" required>
                </div>
                <div class="settingsValueRow">
                  <label class="settingsValueRowLabel" for="selectAddRoleType">${this.resources.settings.roles.type}</label>
                  <select id="selectAddRoleType" class="settingsValueRowValue">
                    <option>${this.resources.settings.roles.admin}</option>
                    <option>${this.resources.settings.roles.editor}</option>
                  </select>
                  <button type="submit">${this.resources.settings.actions.add}</button>
                </div>
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
      case this.global.references.Events.updateUserItems:
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
      const username = document.querySelector('#settings_username').querySelector('.settingsValue');

      // Update Values
      if (user) {
        username.innerHTML = user.email;
        if (user.accessLevel) {
          const userRole = document.querySelector('#settingsUserRole');
          let roles = '';
          let isFirst = true;
          for (let prop in user.accessLevel) {
            if (!isFirst) {
              isFirst = false;
              roles += ', ';
             }
            roles += this.resources.settings.roles[prop];
          }
          userRole.innerHTML = roles;
        }
      }
      else {
        username.innerHTML = this.resources.settings.notLoggedIn;
      }

      // clear error messages
      const addAdminErrorTxt = document.querySelector('#settings_addAdminErrorTxt');
      addAdminErrorTxt.innerHTML = '';

    }
  }

  bindEvents () {
    const that = this;
    const addAdminBtn = document.querySelector('#settings_addRole').querySelector('button');
    const inputAddRoleEmail = document.querySelector('#inputAddRoleEmail');
    const selectAddRoleType = document.querySelector('#selectAddRoleType');
    const addAdminErrorTxt = document.querySelector('#settings_addAdminErrorTxt');

    addAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addAdminErrorTxt.innerHTML = '';
      
      if (inputAddRoleEmail.value == '') {
        addAdminErrorTxt.innerHTML = this.global.resources.login.errorTxt.emptyEmail;
        return;
      }
      
      const regExValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!inputAddRoleEmail.value.match(regExValidEmail)) {
        addAdminErrorTxt.innerHTML = this.global.resources.login.errorTxt.invalidEmail;
        return;
      }

      console.log('Add Admin btn - admin name: ' + inputAddRoleEmail.value);

      // TODO - delete admin from user by sending null 
      // TODO - check if custom claims come back after a user is deleted and then registers again

      // Reference to Firebase function - does not yet call it
      const addAppRole = that.global.functions.httpsCallable('addAppRole');
      // const type = 'owner'; // temp
      const type = selectAddRoleType.value;
      addAppRole({ email: inputAddRoleEmail.value, type: type }).then(result => {
        inputAddRoleEmail.value = '';
        addAdminErrorTxt.innerHTML = '';

        console.log('addAppRole result -----');

        if (result && result.data) {
          console.log(result.data);

          if (result.data.successCode) {
            // TODO - add success message
            // TODO - refresh credentials - so that will not need to log in/out
          }
          else if (result.data.errorCode) {
            let code = '';
            switch (result.data.errorCode) {
              case 'functions/error-owner-only':
                code = result.data.errorCode;
                break;
              case 'functions/error-role-create':
                code = result.data.errorCode;
                break;
              default:
                code = 'default';
            }
            addAdminErrorTxt.innerHTML = that.resources.settings.errorTxt.httpsCallable.addAppRole[code];
          }
        }
      }).catch ((err) => {
        console.log('Error creating admin role - error ' + err);
        addAdminErrorTxt.innerHTML = that.resources.settings.errorTxt.httpsCallable.addAppRole.default;
      });
    });

    // Clear Error text on input focus
    inputAddRoleEmail.addEventListener('focus', () => {
      addAdminErrorTxt.innerHTML = '';
    });
  }
}

export { Settings } 