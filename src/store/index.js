import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
        },
        deleteTask: (state, payload) => {
            state.tasks.splice(payload, 1);
        },
        deleteDone: (state, payload) => {
            state.done.splice(payload, 1);
        }
    },
    plugins: [createPersistedState()]
});
