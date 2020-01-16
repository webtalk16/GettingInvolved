import { Login } from './components/login.js';
import { Header } from './layouts/header.js';

class App {
  loadApp(){

    // Create new instances
    const login = new Login();
    const header = new Header();
    header.loadHeader();
    login.loadLogin();

    // setTimeout(()=> {throw 'this is my error'}, 0);

    console.log('App component is loaded!');
  }

}

export const app = new App(); 