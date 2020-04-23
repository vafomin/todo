import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {messages} from '../assets/localization'
import store from '../store'

Vue.use(VueI18n);

const myLang = ["en", "ru"];

function getLang() {
    if (store.state.lang) {
        return store.state.lang;
    } else {
        const lang = navigator.language.substr(0, 2).toLowerCase();
        if (myLang.includes(lang)) {
            return lang;
        } else {
            return "en";
        }
    }
}

export default new VueI18n({
    locale: getLang(),
    messages,
});
