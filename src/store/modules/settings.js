const fb = require('../../../firebaseConfig');

const state = {
    settings: {},
    isSettingsDialog: false
};

const actions = {
    async newSettings({state}, {uid}) {
        let isShare = state.settings.isShare;
        await fb.usersCollection.doc(uid).set({isShare});
    }
};

const mutations = {
    setSettings: (state, payload) => {
        state.settings = payload;
    },
    setSettingsDialog: (state, payload) => {
        state.isSettingsDialog = payload;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
