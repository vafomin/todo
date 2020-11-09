const fb = require("../../../firebaseConfig");

const state = {
    settings: {
        isShare: undefined,
        showBadges: undefined,
        url: ""
    },
    isSettingsDialog: false
};

const actions = {
    async newSettings({state}, {uid}) {
        let settings = state.settings;
        await fb.usersCollection.doc(uid).set(settings);
    }
};

const mutations = {
    setSettings: (state, payload) => {
        state.settings = payload;
    },
    setIsShare: (state, payload) => {
        state.settings.isShare = payload;
    },
    setShowBadges: (state, payload) => {
        state.settings.showBadges = payload;
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
