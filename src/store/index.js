import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls';
import fire from '../plugins/fire'

let ls = new SecureLS({isCompression: false});

const fb = require('../../firebaseConfig');
const uuid = require("uuid");

Vue.use(Vuex);


fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit("setUser", user);
        store.commit("setLoad", false);
        fire.getSettings(user).then(() => console.log("OK"));
        fire.getTasks(user).then(() => console.log("OK"));
        fire.getDone(user).finally(() => {
            setTimeout(() => store.commit("setLoad", true), 1000);
        });
    } else {
        store.commit("setLoad", true);
    }
});

export const store = new Vuex.Store({
    state: {
        lang: undefined,
        user: null,
        load: false,
        tasks: [],
        done: [],
        boardTasks: [],
        boardDone: [],
        settings: {},
        isSettingsDialog: false
    },
    actions: {
        cleanData({commit}) {
            commit("setUser", null);
            commit("setTasks", []);
            commit("setDone", []);
            commit("setSettings", {});
            localStorage.removeItem("vuex");
            localStorage.removeItem("_secure__ls__metadata");
        },
        async addTask({state, commit}, {task}) {
            if (state.user !== null) {
                const authorId = state.user.uid;
                await fb.tasksCollection.add({
                    task,
                    authorId,
                    createdOn: fb.firebase.firestore.Timestamp.now(),
                });
            } else {
                let uid = uuid.v4();
                let created = fb.firebase.firestore.Timestamp.now();
                commit("addTask", {id: uid, task: task, createdOn: created});
            }
        },
        async deleteTask({state, commit}, {id}) {
            if (state.user !== null) {
                await fb.tasksCollection.doc(id).delete();
            } else {
                const index = state.tasks.findIndex(n => n.id === id);
                if (index !== -1) {
                    commit("delTask", index);
                }
            }
        },
        async doneTask({state, commit}, {id, task}) {
            if (state.user !== null) {
                const authorId = state.user.uid;
                await fb.doneCollection.add({
                    task,
                    authorId,
                    createdOn: fb.firebase.firestore.Timestamp.now(),
                });
                await fb.tasksCollection.doc(id).delete();
            } else {
                const index = state.tasks.findIndex(n => n.id === id);
                if (index !== -1) {
                    commit("delTask", index);
                }
                let uid = uuid.v4();
                let created = fb.firebase.firestore.Timestamp.now();
                commit("addDone", {id: uid, task: task, createdOn: created});
            }
        },
        async restoreTask({state, commit}, {id, task}) {
            if (state.user !== null) {
                const authorId = state.user.uid;
                await fb.tasksCollection.add({
                    task,
                    authorId,
                    createdOn: fb.firebase.firestore.Timestamp.now(),
                });
                await fb.doneCollection.doc(id).delete();
            } else {
                const index = state.done.findIndex(n => n.id === id);
                if (index !== -1) {
                    commit("delDone", index);
                }
                let uid = uuid.v4();
                let created = fb.firebase.firestore.Timestamp.now();
                commit("addTask", {id: uid, task: task, createdOn: created});
            }
        },
        async newSettings({state}) {
            let uid = state.user.uid;
            let isShare = state.settings.isShare;
            await fb.usersCollection.doc(uid).set({isShare});
        }
    },
    mutations: {
        setLang: (state, payload) => {
            state.lang = payload;
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        setLoad: (state, payload) => {
            state.load = payload;
        },
        setTasks: (state, payload) => {
            state.tasks = payload;
        },
        addTask: (state, payload) => {
            state.tasks.unshift(payload);
        },
        delTask: (state, payload) => {
            state.tasks.splice(payload, 1);
        },
        setDone: (state, payload) => {
            state.done = payload;
        },
        addDone: (state, payload) => {
            state.done.unshift(payload);
        },
        delDone: (state, payload) => {
            state.done.splice(payload, 1);
        },
        setBoardTasks: (state, payload) => {
            state.boardTasks = payload;
        },
        setBoardDone: (state, payload) => {
            state.boardDone = payload;
        },
        setSettings: (state, payload) => {
            state.settings = payload;
        },
        setSettingsDialog: (state, payload) => {
            state.isSettingsDialog = payload;
        }
    },
    plugins: [createPersistedState({
        paths: ['lang', 'user', 'tasks', 'done', 'settings'],
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        }
    })]
});

export default store;
