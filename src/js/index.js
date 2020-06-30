import '../css/main.css';
import '../css/widgets.css';
import { app } from './app'

try {
  window.showAppLogsAlert = false;
  window.deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired');
    e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
    window.deferredPrompt = e;// Stash the event so it can be triggered later.
  });

  try {
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        var string = msg.toLowerCase();
        var substring = "script error";
        if (string.indexOf(substring) > -1) {
            alert('Script Error: See Browser Console for Detail');
        } else {
            var message = [
                'Message: ' + msg,
                'URL: ' + url,
                'Line: ' + lineNo,
                'Column: ' + columnNo,
                'Error object: ' + JSON.stringify(error)
            ].join(' - ');

            alert(message);
        }
        return false;
    };
  }
  catch (e) {
    console.log('Error producing errors ' + e);
  }

  window.addEventListener('load', () => {
    console.log('@@ window loaded');
    
    if ('serviceWorker' in navigator) {
      // window.onpush = function(event) {
      //   console.log('push data: ' + event.data);
      // }

      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ' + registration);
        if(window.showAppLogsAlert) {
          alert('SW registered: ' + registration);
        }

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
          if(window.showAppLogsAlert) {
            alert('app load error ' + e);
          }
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