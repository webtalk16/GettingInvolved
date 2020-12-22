import { Header } from './layouts/header.js';
import { Content } from './layouts/content.js';
import { Footer } from './layouts/footer.js';
import { Firebase } from './global/init-firebase.js';
import { Global } from './global/global.js';

class App {

  constructor () {
    this.global = new Global();
  }
  loadApp(){

    // TODO - use cache if no success then load below

    this.global.addModule(Firebase);
    this.global.addModule(Header);
    this.global.addModule(Content);
    this.global.addModule(Footer);

    console.log('modules');
    // console.log(this.global.modules);

    console.log('App component is loaded!');
  }
}

export const app = new App(); 