import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        lang: undefined,
        user: null,
        tasks: [],
        done: []
    },
    getters: {
        lang: state => {
            return state.lang;
        },
        user: state => {
            return state.user;
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
        setUser: (state, payload) => {
            state.user = payload;
        },
        setTasks: (state, payload) => {
            state.tasks.unshift(payload);
        },
        updateTasks: (state, payload) => {
            state.tasks = payload;
        },
        deleteTask: (state, payload) => {
            state.tasks.splice(payload, 1);
        },
        setDone: (state, payload) => {
            state.done.unshift(payload);
        },
        updateDone: (state, payload) => {
            state.done = payload;
        },
        deleteDone: (state, payload) => {
            state.done.splice(payload, 1);
        }
    },
    plugins: [createPersistedState()]
});
