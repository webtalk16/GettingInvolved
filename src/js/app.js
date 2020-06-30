import { Login } from './components/login.js';
import { Header } from './layouts/header.js';
import { Content } from './components/content.js';
import { Footer } from './layouts/footer.js';

class App {
  loadApp(){

    const header = new Header();
    header.loadHeader();

    // if not logged in
    // const login = new Login();
    // login.loadLogin();

    const content = new Content();
    content.loadContent();

    const footer = new Footer();
    footer.loadFooter();

    console.log('App component is loaded!');
  }
}

export const app = new App(); 