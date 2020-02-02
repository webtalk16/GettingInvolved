const rootEl = document.querySelector('#appMain');
// let pwaEvent = null;

class Login {

  loadLogin(){
    this.buildHtml();
    this.checkPwa();
    console.log('Login component is loaded');
  }

  buildHtml () {
    const html = `
      <div id="loginMain">
        <div id="loginContainer">
        This is the Login Page
        </div>
      </div>
    `;
    rootEl.insertAdjacentHTML('beforeend', html);
  }

  checkPwa () {
    setTimeout(() => {
      if (window.deferredPrompt) {
        // add install button
        const node = document.createElement('DIV');
        node.id = 'btnPwa';
        const textnode = document.createTextNode('Install on Home Screen');
        node.appendChild(textnode);
        rootEl.appendChild(node);

        const btnPwa = document.querySelector('#btnPwa');
        btnPwa.addEventListener('click', e => {
          window.addEventListener('appinstalled', e => {
            console.log('app is now installed on this device, thank you and enjoy :)');
          });
          this.doPwaInstall();
        });
      }
    }, 2000);
  }

  async doPwaInstall() {
    window.deferredPrompt.prompt();
    console.log('deferredPrompt' + window.deferredPrompt)
    window.deferredPrompt.userChoice.then(function(choiceResult){
      if (choiceResult.outcome === 'accepted') {
        console.log('Your PWA has been installed');
      } else {
        console.log('User chose to not install your PWA');
      }
      window.deferredPrompt = null;
    });
  }
}

export { Login } 