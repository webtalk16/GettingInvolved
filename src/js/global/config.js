// export default {
//     googleClientID:'xxxx'
// };
class Config {

    constructor (global) {
        this.config = this.getConfig(global);
    }

    getConfig (global) {
        return {
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
            firebase: {
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
                        };
                    }
                },
                storage: {
                    url: {
                        get: function (videoId) {
                            const url = `https://firebasestorage.googleapis.com/v0/b/ifcisrael.appspot.com/o/public%2Fvideos%2F${videoId}%2Fplaceholder.jpg?alt=media&token=0c70a668-465a-426d-9bde-d3726f9d9bd5`;
                            return url;
                        }
                    }
                }
            },
            videoSort: {
                sortType : global.references.Sort.newestFirst,
                get: function () {
                    return this.videoSort.sortType;
                },
                set: function (sortType) {
                    this.videoSort.sortType = sortType;
                    return this.videoSort.sortType;
                }
            }
        };
    }
}
export { Config };