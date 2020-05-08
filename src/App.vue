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

            <v-btn v-if="isAuth" @click.stop="settingsDialog = true" icon>
                <v-icon>settings</v-icon>
            </v-btn>
            <v-btn icon @click="change_color()">
                <v-icon>{{ icon }}</v-icon>
            </v-btn>
            <v-menu left bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        {{ langIcon }}
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="change_lang('en')">
                        <v-list-item-title>🇺🇸</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="change_lang('ru')">
                        <v-list-item-title>🇷🇺</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn icon @click.stop="helpDialog = true">
                <v-icon>mdi-help</v-icon>
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

        <v-dialog v-model="settingsDialog" max-width="500">
            <v-card>
                <v-card-title class="headline">{{ $t("settings.title") }}</v-card-title>
                <v-card-text>
                    <v-switch v-model="isShare" :label="$t('settings.isShare')"></v-switch>
                    <div v-if="isShare">
                        <p>{{ $t("settings.share") }}:</p><a :href="url" target="_blank">{{ url }}</a>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import i18n from "./plugins/i18n";
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapState(["user", "settings"]),
            isAuth() {
                return this.user !== null;
            },
            icon() {
                if (this.$vuetify.theme.dark) {
                    return "wb_sunny";
                } else {
                    return "brightness_2";
                }
            },
            langIcon() {
                if (i18n.locale === "ru")
                    return "🇷🇺";
                else {
                    return "🇺🇸";
                }
            },
            url() {
                if (this.isAuth) {
                    return `${process.env.VUE_APP_DOMAIN}/b/${this.user.uid}`;
                } else {
                    return "no";
                }
            },
            isShare: {
                get: function () {
                    return this.settings.isShare;
                },
                set: function (v) {
                    this.setSettings({isShare: v});
                    this.newSettings();
                }
            }
        },
        data() {
            return {
                helpDialog: false,
                settingsDialog: false,
            }
        },
        mounted() {
            this.setLoad(false);
            const theme = localStorage.getItem("useDarkTheme");
            if (theme) {
                this.$vuetify.theme.dark = theme === "true";
            }
        },
        methods: {
            ...mapMutations(["setLoad", "setSettings"]),
            ...mapActions(["newSettings", "cleanData"]),

            change_color() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
            },
            change_lang(lang) {
                i18n.locale = lang;
                this.$store.commit("setLang", lang);
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>
