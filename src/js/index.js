import '../css/main.css';
import { app } from './app'

try {
  window.deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired');
    e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
    window.deferredPrompt = e;// Stash the event so it can be triggered later.
  });

  window.addEventListener('load', () => {
    console.log('@@ window loaded');

    if ('serviceWorker' in navigator) {
      // window.onpush = function(event) {
      //   console.log('push data: ' + event.data);
      // }

      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);

        // try {
        //   registration.pushManager.subscribe({userVisibleOnly: true});
        //   // registration.pushManager.subscribe().then(
        //   //     function(pushSubscription) {
        //   //         console.log('push id: ' + pushSubscription.subscriptionId);
        //   //         console.log('push endpoint: ' + pushSubscription.endpoint);
        //   //     }, function(error) {
        //   //         console.log('push error: ' + error);
        //   //     }
        //   // );
        // } catch (e) {
        //   console.error('pushManager error ' + e);
        // }


        try {
          app.loadApp();
        } catch (e) {
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