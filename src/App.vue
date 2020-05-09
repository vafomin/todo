<template>
    <v-app>
        <v-app-bar app clipped-left>
            <v-toolbar-title>
                <router-link to="/">
                    <v-icon large color="blue">done_all</v-icon>
                    {{ $t("app") }}
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn @click.stop="openSettingsDialog" icon>
                <v-icon>settings</v-icon>
            </v-btn>
            <v-btn icon @click.stop="helpDialog = true">
                <v-icon>mdi-help</v-icon>
            </v-btn>
            <v-btn v-if="!isAuth" outlined color="primary" @click="login">
                {{ $t("buttons.login") }}
            </v-btn>
            <v-btn v-else outlined color="primary" @click="logout">
                {{ $t("buttons.logout") }}
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer app>
            <span>{{ $t("createdBy") }} <a href="https://enotcode.com" target="_blank">enotcode</a></span>
        </v-footer>

        <v-dialog v-model="helpDialog" max-width="400">
            <v-card>
                <v-card-title class="headline">{{ $t("about.title") }}</v-card-title>
                <v-card-text class="subtitle-1">
                    <p>{{ $t("about.body") }}</p>
                    <p class="subtitle-2">{{ $t("about.github") }}
                        <a href="https://github.com/enotcode/todo" target="_blank">GitHub</a></p>
                </v-card-text>
            </v-card>
        </v-dialog>
        <Settings/>
    </v-app>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import firebase from 'firebase/app'

    const fb = require('../firebaseConfig.js');

    export default {
        components: {
            Settings: () => import("./components/Settings")
        },
        data() {
            return {
                helpDialog: false,
            }
        },
        computed: {
            ...mapState(["user"]),
            isAuth() {
                return this.user != null;
            },
        },
        mounted() {
            this.setLoad(false);
            const theme = localStorage.getItem("useDarkTheme");
            if (theme) {
                this.$vuetify.theme.dark = theme === "true";
            }
        },
        methods: {
            ...mapMutations(["setLoad", "setSettingsDialog", "setUser"]),
            ...mapActions(["cleanData"]),
            openSettingsDialog() {
                this.setSettingsDialog(true);
            },
            async login() {
                const provider = new firebase.auth.GoogleAuthProvider();
                await fb.auth.signInWithPopup(provider)
                    .then(r => {
                        this.setUser(r.user);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            async logout() {
                await fb.auth.signOut();
                this.cleanData();
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
