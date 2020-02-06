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
    }
}

// export const config = new Config(); 
// exports = Config;
// module.exports = Config; 

export { Config };