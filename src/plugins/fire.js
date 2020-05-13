import store from "../store";

const fb = require('../../firebaseConfig');

async function getTasks(user) {
    await fb.tasksCollection.where("authorId", "==", user.uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
        let tasks = [];
        querySnapshot.forEach(doc => {
            let task = doc.data();
            task.id = doc.id;
            tasks.push(task);
        });
        store.commit("app/setTasks", tasks);
    });
}

async function getDone(user) {
    await fb.doneCollection.where("authorId", "==", user.uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
        let done = [];
        querySnapshot.forEach(doc => {
            let task = doc.data();
            task.id = doc.id;
            done.push(task);
        });
        store.commit("app/setDone", done);
    });
}

async function getSettings(user) {
    let uid = user.uid;
    let settings = {isShare: false, showBadges: true};
    await fb.usersCollection.doc(uid).get().then(doc => {
        if (!doc.exists) {
            fb.usersCollection.doc(uid).set({settings});
            store.commit("settings/setSettings", settings);
        } else {
            store.commit("settings/setSettings", doc.data());
        }
    });
}

export default {
    getTasks,
    getDone,
    getSettings
}
