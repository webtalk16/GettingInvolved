
class Login {
  loadLogin(){
    this.buildHtml();
    console.log('Login component is loaded');
  }

  buildHtml () {
    const rootEl = document.querySelector('#appMain');
    const html = `
      <div id="loginMain">
        <div id="loginContainer">
        This is the Login Page
        </div>
      </div>
    `;
    rootEl.innerHTML = html;
  }

}

export { Login } 