import store from '../index'

const fb = require('../../../firebaseConfig');
const uuid = require("uuid");

const state = {
    tasks: [],
    done: [],
    boardTasks: [],
    boardDone: []
};

const actions = {
    async addTask({commit}, {task}) {
        const tag = "";
        if (store.state.user !== null) {
            const authorId = store.state.user.uid;
            await fb.tasksCollection.add({
                task,
                authorId,
                tag,
                createdOn: fb.firebase.firestore.Timestamp.now(),
            });
        } else {
            let uid = uuid.v4();
            let created = fb.firebase.firestore.Timestamp.now();
            commit("addTask", {id: uid, task: task, tag: tag, createdOn: created});
        }
    },
    async deleteTask({state, commit}, {id}) {
        if (store.state.user !== null) {
            await fb.tasksCollection.doc(id).delete();
        } else {
            const index = state.tasks.findIndex(n => n.id === id);
            if (index !== -1) {
                commit("delTask", index);
            }
        }
    },
    async doneTask({state, commit}, {id, task, tag}) {
        if (store.state.user !== null) {
            const authorId = store.state.user.uid;
            await fb.doneCollection.add({
                task,
                tag,
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
            commit("addDone", {id: uid, task: task, tag: tag, createdOn: created});
        }
    },
    async restoreTask({state, commit}, {id, task, tag}) {
        if (store.state.user !== null) {
            const authorId = store.state.user.uid;
            await fb.tasksCollection.add({
                task,
                tag,
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
            commit("addTask", {id: uid, task: task, tag: tag, createdOn: created});
        }
    },
    async updTag({state, commit}, {id, tag}) {
        if (store.state.user !== null) {
            await fb.tasksCollection.doc(id).update({tag: tag})
        } else {
            const index = state.tasks.findIndex(n => n.id === id);
            console.log(index);
            if (index !== -1) {
                commit("updTag", {index, tag});
            }
        }
    },
};

const mutations = {
    setTasks: (state, payload) => {
        state.tasks = payload;
    },
    addTask: (state, payload) => {
        state.tasks.unshift(payload);
    },
    updTag: (state, payload) => {
        console.log(payload);
        state.tasks[payload.index].tag = payload.tag;
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
    }
};

const getters = {
    tasksCount(state) {
        return state.tasks.length;
    },
    doneCount(state) {
        return state.done.length;
    },
    tasksBoardCount(state) {
        return state.boardTasks.length;
    },
    doneBoardCount(state) {
        return state.boardDone.length;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
