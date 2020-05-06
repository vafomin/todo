import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const fb = require('../../firebaseConfig');
const uuid = require("uuid");

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
    if (user) {
        store.commit("setUser", user);
        fb.tasksCollection.where("authorId", "==", user.uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
            let tasks = [];
            querySnapshot.forEach(doc => {
                let task = doc.data();
                task.id = doc.id;
                tasks.push(task);
            });
            store.commit("setTasks", tasks);
        });

        fb.doneCollection.where("authorId", "==", user.uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
            let done = [];
            querySnapshot.forEach(doc => {
                let task = doc.data();
                task.id = doc.id;
                done.push(task);
            });
            store.commit("setDone", done);
        });

    }
});

export const store = new Vuex.Store({
    state: {
        lang: undefined,
        user: null,
        tasks: [],
        done: []
    },
    actions: {
        cleanData({commit}) {
            commit("setUser", null);
            commit("setTasks", []);
            commit("setDone", []);
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
                commit("addTask", {id: uid, task: task});
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
                commit("addDone", {id: uid, task: task});
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
                commit("addTask", {id: uid, task: task});
            }
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
        }
    },
    plugins: [createPersistedState()]
});

export default store;
