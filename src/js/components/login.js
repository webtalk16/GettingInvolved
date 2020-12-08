import { Global } from '../global/global.js';
import { Utils } from '../global/utils.js';

class Login {

  constructor () {
    this.global = new Global();
    this.utils = new Utils();
    this.resources = this.global.getResources();
    this.data = null;
    this.user = null;
  }

  loadLogin(firebase){
    const that = this;

    // this.global.setUser(firebase.auth().currentUser);
    // console.log('1111111 ' + this.global.user);
    this.data = firebase;

    this.data.auth().onAuthStateChanged(function(user) {
      // TODO - dont show login btn until check if logged in or out

        that.user = user; // check THIS
        const logInOutBtn = document.querySelector('#logInOutBtn');
        if (that.user) {
            console.log('User is Now signed in');
            logInOutBtn.innerHTML = that.resources.login['logout'];
        } else {
            console.log('User is Now signed out');
            logInOutBtn.innerHTML = that.resources.login['login'];
        }
        logInOutBtn.classList.remove('hide');
        that.utils.closeLoginForm();
        
      });

    this.buildHtml();
    this.bindEvents();
    console.log('Login component is loaded');
  }

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const loggedIn = this.user ? 'logout' : 'login';
    const html = `
      <div id="loginMain">
        <div id="loginContainer">
          <div id="logInOutBtn" class="hide"><span>${this.resources.login[loggedIn]}</span></div>
          <div id="loginForm" class='hide'>
            <form>
              <div id="loginForm_User">
                <label class="loginFormLabel" for="uname">${this.resources.login.username}</label>
                <input id="inputLoginEmail" class="loginFormInput" type="email" placholder="${this.resources.login.username}" name="uname" required>
              </div>
              <div id="loginForm_Password">
                <label class="loginFormLabel" for="upass">${this.resources.login.userpassword}</label>
                <input id="inputLoginPassword" class="loginFormInput" type="password" placholder="${this.resources.login.userpassword}" name="upass" required>
              </div>
              <div id="loginForm_ErrorTxt"></div>
              <div id="loginForm_LoginExistingUser">
                <div id="loginForm_loginBtn"><span id="resetPassBtn">${this.resources.login.resetPassword}</span><button type="submit">${this.resources.login.login}</button></div>
                <div id="loginForm_gotoRegister">${this.resources.login.register}</div>
              </div>
              <div id="loginForm_RegisterNewUser" class="hide">
                <div id="loginForm_registerBtn"><button type="submit">${this.resources.login.registerUser}</button></div>
                <div id="loginForm_gotoLogin">${this.resources.login.LoginExistingUser}</div>
              </div>
              <div id="loginForm_ResetPassword" class="hide">
                <div id="loginForm_resetPassBtn"><button type="submit">${this.resources.login.resetPassword}</button></div>
                <div id="loginForm_resetSuccessTxt" class="hide">${this.resources.login.resetSuccess}</div>
                <div id="loginForm_gotoLoginAfterReset">${this.resources.login.LoginExistingUser}</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  refreshLoginForm (loginForm, errorTxt) {
    errorTxt.innerHTML = '';
    loginForm.classList.add('hide');
    setTimeout (() => {
      loginForm.classList.remove('hide');
    }, 150);
  }

  bindEvents () {
    const that = this;
    const loginForm = document.querySelector('#loginForm');
    const errorTxt = document.querySelector('#loginForm_ErrorTxt');

    const loginBtn = document.querySelector('#loginForm_loginBtn').querySelector('button');
    const registerBtn = document.querySelector('#loginForm_registerBtn').querySelector('button');
    const resetPassBtn = document.querySelector('#loginForm_resetPassBtn').querySelector('button');
    
    // Log in/out Btn
    const logInOutBtn = document.querySelector('#logInOutBtn');
    logInOutBtn.addEventListener('click', () => {
      if (that.user) {
        // preform sign out
        that.data.auth().signOut().then(function() {
          console.log('success logged OUT');
        }).catch(function(error) {
          console.log('ERROR logged OUT ' + error);
        });
      } else {
        // open/close sign in form for login
        if (loginForm.classList.contains('hide')) {
          loginForm.classList.remove('hide');
        }
        else {
          that.utils.closeLoginForm();
        }
      }
    });

    // TODO - add "email IFC" link (facebook email)
    // TODO - Check not hebrew letters

    // Switch Login/Register/Reset
    const gotoRegister = document.querySelector('#loginForm_gotoRegister');
    const registerNewUser = document.querySelector('#loginForm_RegisterNewUser');
    const gotoLogin = document.querySelector('#loginForm_gotoLogin');
    const loginExistingUser = document.querySelector('#loginForm_LoginExistingUser');
    const gotoReset = document.querySelector('#resetPassBtn');
    const resetPassword = document.querySelector('#loginForm_ResetPassword');
    const gotoLoginAfterReset = document.querySelector('#loginForm_gotoLoginAfterReset');
    const loginForm_Password = document.querySelector('#loginForm_Password');
    const resetSuccessTxt = document.querySelector('#loginForm_resetSuccessTxt');
    gotoRegister.addEventListener('click', () => {
      loginBtn.disabled = true;
      registerBtn.disabled = false;
      resetPassBtn.disabled = true;
      loginExistingUser.classList.add('hide');
      registerNewUser.classList.remove('hide');
      loginForm_Password.classList.remove('hide');
      that.refreshLoginForm(loginForm, errorTxt);
    });
    gotoLogin.addEventListener('click', () => {
      loginBtn.disabled = false;
      registerBtn.disabled = true;
      resetPassBtn.disabled = true;
      registerNewUser.classList.add('hide');
      loginExistingUser.classList.remove('hide');
      loginForm_Password.classList.remove('hide');
      that.refreshLoginForm(loginForm, errorTxt);
    });
    gotoReset.addEventListener('click', () => {
      loginBtn.disabled = true;
      registerBtn.disabled = true;
      resetPassBtn.disabled = false;
      loginExistingUser.classList.add('hide');
      loginForm_Password.classList.add('hide');
      resetPassword.classList.remove('hide');
      that.refreshLoginForm(loginForm, errorTxt);
    });
    gotoLoginAfterReset.addEventListener('click', () => {
      loginBtn.disabled = false;
      registerBtn.disabled = true;
      resetPassBtn.disabled = true;
      resetPassword.classList.add('hide');
      resetSuccessTxt.classList.add('hide');
      resetPassBtn.classList.remove('hide');
      loginExistingUser.classList.remove('hide');
      loginForm_Password.classList.remove('hide');
      that.refreshLoginForm(loginForm, errorTxt);
    });

    // Login
    const inputEmail = document.querySelector('#inputLoginEmail');
    const inputPassword = document.querySelector('#inputLoginPassword');
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      errorTxt.innerHTML = '';
      
      if (inputEmail.value == '') {
        errorTxt.innerHTML = this.global.resources.login.errorTxt.emptyEmail;
        return;
      } else if (inputPassword.value == '') {
        errorTxt.innerHTML = this.global.resources.login.errorTxt.emptyPassword;
        return;
      }

      // perform login
      that.data.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value)
        .then((user) => {
          // Signed in 
          // ...
          console.log('success logged in existing user - ' + user);
          loginForm.classList.add('hide');
          errorTxt.innerHTML = '';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error logging in existing user - ' + errorCode + ' ' + errorMessage);
          
          let code = '';
          switch (errorCode) {
            case 'auth/invalid-email':
              code = errorCode;
              break;
            case 'auth/user-disabled':
              code = errorCode;
              break;
            case 'auth/user-not-found':
              code = errorCode;
              break;
            case 'auth/wrong-password':
              code = errorCode;
              break;
            case 'auth/too-many-requests':
              code = errorCode;
              break;
            default:
              code = 'default';
          }

          errorTxt.innerHTML = that.global.resources.login.errorTxt['signInWithEmailAndPassword'][code];
        });
    });

    // Register
    // TODO - send confirmation regitered email
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      errorTxt.innerHTML = '';

      if (inputEmail.value == '') {
        errorTxt.innerHTML = this.global.resources.login.errorTxt.emptyEmail;
        return;
      } else if (inputPassword.value == '') {
        errorTxt.innerHTML = this.global.resources.login.errorTxt.emptyPassword;
        return;
      }
      
      // perform add user
      that.data.auth().createUserWithEmailAndPassword(inputEmail.value, inputPassword.value)
        .then((user) => {
            // Signed in 
            console.log('success created new user - ' + user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error creating new user - ' + errorCode + ' ' + errorMessage);

          let code = '';
          switch (errorCode) {
            case 'auth/email-already-in-use':
              code = errorCode;
              break;
            case 'auth/invalid-email':
              code = errorCode;
              break;
            case 'auth/weak-password':
              code = errorCode;
              break;
            default:
              code = 'default';
          }

          errorTxt.innerHTML = that.global.resources.login.errorTxt['createUserWithEmailAndPassword'][code];
      });
    });

    // Reset Password
    resetPassBtn.addEventListener('click', (e) => {
      e.preventDefault();
      errorTxt.innerHTML = '';

      if (inputEmail.value == '') {
        errorTxt.innerHTML = this.global.resources.login.errorTxt.emptyEmail;
        return;
      }

      // preform reset
      const actionCodeSettings = {
        url: 'https://ifcisrael.org/',
        handleCodeInApp: true
      };
      that.data.auth().sendPasswordResetEmail(inputEmail.value, actionCodeSettings)
        .then(function() {
          // Password reset email sent.
          console.log('Password reset email sent.');
          resetPassBtn.classList.add('hide');
          resetSuccessTxt.classList.remove('hide');
        })
        .catch(function(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Password reset email send error ' + errorCode + ' ' + errorMessage);

          let code = '';
          switch (errorCode) {
            case 'auth/invalid-email':
              code = errorCode;
              break;
            case 'auth/user-not-found':
              code = errorCode;
              break;
            default:
              code = 'default';
          }

          errorTxt.innerHTML = that.global.resources.login.errorTxt['signInWithEmailAndPassword'][code];
        });

    });

    // Clear Error text on input focus
    inputEmail.addEventListener('focus', () => {
      errorTxt.innerHTML = '';
    });
    inputPassword.addEventListener('focus', () => {
      errorTxt.innerHTML = '';
    });

  }
}

export { Login } 