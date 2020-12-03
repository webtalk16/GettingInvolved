// export default {
//     googleClientID:'xxxx'
// };
const Config = {
    uiLang: {
        defualtLang: 'heb',
        get: function () {
            if (!localStorage.getItem('uiLang')) {
                localStorage.setItem('uiLang', this.defualtLang);
            }
            return localStorage.getItem('uiLang');
        },
        set: function (lang) {
            localStorage.setItem('uiLang', lang);
        }
    },
    firebaseConfig: {
        get: function () {
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
            return {
                apiKey: "AIzaSyBcggO0xYLWfN8ACogNNwi3ifSgDQRaQlI",
                authDomain: "ifcisrael.firebaseapp.com",
                databaseURL: "https://ifcisrael.firebaseio.com",
                projectId: "ifcisrael",
                storageBucket: "ifcisrael.appspot.com",
                messagingSenderId: "1091400711839",
                appId: "1:1091400711839:web:4e8329ae7fb0f08a06acaa",
                measurementId: "G-W7GX9VM5VL"
            }
        }
    } 
    
    
}

export { Config };