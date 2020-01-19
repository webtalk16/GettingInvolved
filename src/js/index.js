import '../css/main.css';
import { app } from './app'

try {
  window.addEventListener('load', () => {
    console.log('@@ window loaded');

    if ('serviceWorker' in navigator) {
      console.log('@@ SW in navigator');
      
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
        try {
          app.loadApp();
        }
        catch (e) {
          console.error('app load error ' + e);
        }
      }).catch(registrationError => {
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