<template>
    <v-app>
        <v-app-bar app clipped-left>
            <v-toolbar-title>{{ $t("app") }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn v-if="isAuth" @click.stop="settings = true" icon>
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
            <v-btn icon @click.stop="dialog = true">
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

        <v-dialog v-model="dialog" max-width="400">
            <v-card>
                <v-card-title class="headline">{{ $t("about.title") }}</v-card-title>
                <v-card-text class="subtitle-1">
                    {{ $t("about.body") }}
                    <a href="https://github.com/enotcode/todo" target="_blank">GitHub</a>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="settings" max-width="500">
            <v-card>
                <v-card-title class="headline">{{ $t("settings.title") }}</v-card-title>
                <v-card-text>
                    <p>{{ $t("settings.share") }}:</p><a :href="url">{{ url }}</a>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import i18n from "./plugins/i18n";
    import {mapState, mapMutations} from 'vuex'

    export default {
        computed: {
            ...mapState(["user"]),
            isAuth() {
                return this.user !== null;
            },
            icon() {
                if (this.$vuetify.theme.dark) {
                    return "wb_sunny"
                } else {
                    return "brightness_2"
                }
            },
            langIcon() {
                if (i18n.locale === "ru") {
                    return "🇷🇺"
                } else {
                    return "🇺🇸"
                }
            },
            url() {
                if (this.isAuth)
                    return `https://thetodoapp.now.sh/b/${this.user.uid}`;
                else return "no";
            }
        },
        data() {
            return {
                dialog: false,
                settings: false,
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
            ...mapMutations(["setLoad"]),
            change_color() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
            },
            change_lang(lang) {
                i18n.locale = lang;
                this.$store.commit("setLang", lang);
            }
        }
        ,
    }
</script>
