import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const fb = require('../../firebaseConfig');

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
        async addTask({state}, {task}) {
            const authorId = state.user.uid;
            await fb.tasksCollection.add({
                task,
                authorId,
                createdOn: fb.firebase.firestore.Timestamp.now(),
            });
        },
        // eslint-disable-next-line no-unused-vars
        async deleteTask({state}, {id}) {
            await fb.tasksCollection.doc(id).delete();
        },
        async doneTask({state}, {id, task}) {
            const authorId = state.user.uid;
            await fb.doneCollection.add({
                task,
                authorId,
                createdOn: fb.firebase.firestore.Timestamp.now(),
            });
            await fb.tasksCollection.doc(id).delete();
        },
        async restoreTask({state}, {id, task}) {
            const authorId = state.user.uid;
            await fb.tasksCollection.add({
                task,
                authorId,
                createdOn: fb.firebase.firestore.Timestamp.now(),
            });
            await fb.doneCollection.doc(id).delete();
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
        setDone: (state, payload) => {
            state.done = payload;
        }
    },
    plugins: [createPersistedState()]
});

export default store;
