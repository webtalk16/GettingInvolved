// import { App } from './app.js'; 
// const app = new App(); 
// app.loadApp(); 
import '../css/main.css';
import { app } from './app'

try {
  window.addEventListener('load', () => {
    console.log('@@ window loaded');

    if ('serviceWorker' in navigator) {
      console.log('@@ SW in navigator');
      
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('@@ registered');
        console.log('SW registered: ', registration);
        app.loadApp();
        console.log('now loading!');
      }).catch(registrationError => {
        console.log('@@ registered failed');
        console.log('SW registration failed: ', registrationError);
      });
    }
  });
}
catch (e) {
    console.log(e);
}

// function myModule() {
//     this.hello = function() {
//       return 'hello!';
//     }
  
//     this.goodbye = function() {
//       return 'goodbye!';
//     }
//   }
  
//   module.exports = myModule;