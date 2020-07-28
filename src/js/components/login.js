const rootEl = document.querySelector('#appMain');

class Login {

  loadLogin(){
    this.buildHtml();
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
}

export { Login } 