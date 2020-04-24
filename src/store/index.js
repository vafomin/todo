import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: undefined,
        tasks: [],
        done: []
    },
    getters: {
        lang: state => {
            return state.lang;
        },
        tasks: state => {
            return state.tasks;
        },
        done: state => {
            return state.done;
        }
    },
    mutations: {
        setLang: (state, payload) => {
            state.lang = payload;
        },
        setTasks: (state, payload) => {
            state.tasks.push(payload);
        },
        setDone: (state, payload) => {
            state.done.push(payload);
        }
    }
});
