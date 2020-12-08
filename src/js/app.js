import { Header } from './layouts/header.js';
import { Content } from './components/content.js';
import { Footer } from './layouts/footer.js';
import { Firebase } from './global/init-firebase.js';

class App {
  loadApp(){

    const firebase = new Firebase();
    firebase.initFirebase();
    // TODO - use cache if no success then load below

    const header = new Header();
    header.loadHeader();

    const content = new Content();
    content.loadContent();

    const footer = new Footer();
    footer.loadFooter();

    console.log('App component is loaded!');
  }
}

export const app = new App(); 