import { Login } from './components/login.js';
import { Header } from './layouts/header.js';
import { Content } from './components/content.js';

class App {
  loadApp(){

    const header = new Header();
    header.loadHeader();

    // if not logged in
    // const login = new Login();
    // login.loadLogin();

    const content = new Content();
    content.loadContent();

    // setTimeout(()=> {throw 'this is my error'}, 0);

    console.log('App component is loaded!');
  }
}

export const app = new App(); 