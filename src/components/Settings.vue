<template>
    <v-dialog v-model="isDialog" max-width="500">
        <v-card>
            <v-card-title class="headline">{{ $t("settings.title") }}</v-card-title>
            <v-card-text>
                <div v-if="isAuth">
                    <p class="headline text-center">
                        <b class="wave">👋</b>{{ $t("hello") }}, {{ name }}
                    </p>
                </div>
                <div>
                    <p class="body-1">{{ $t("settings.colorTheme") }}:
                        <v-btn icon @click="change_color()">
                            <v-icon>{{ icon }}</v-icon>
                        </v-btn>
                    </p>
                </div>
                <div>
                    <p class="body-1">{{ $t("settings.lang") }}:
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <b v-if="isLang === 'ru'" v-on="on" @click="change_lang('en')">русский 🇷🇺</b>
                                <b v-else v-on="on" @click="change_lang('ru')">english 🇺🇸</b>
                            </template>
                            <span>{{ $t("settings.tooltipLang") }}</span>
                        </v-tooltip>
                    </p>
                </div>
                <div v-if="isAuth">
                    <v-switch v-model="isShare" :label="$t('settings.isShare')"></v-switch>
                    <div v-if="isShare">
                        <p>{{ $t("settings.share") }}: <a :href="url" target="_blank">{{ url }}</a></p>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import i18n from '../plugins/i18n'
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        name: "Settings",
        computed: {
            ...mapState(["user", "settings", "isSettingsDialog"]),
            isDialog: {
                get() {
                    return this.isSettingsDialog;
                },
                set(v) {
                    this.setSettingsDialog(v);
                }
            },
            isAuth() {
                return this.user !== null;
            },
            name() {
                return this.user.displayName;
            },
            icon() {
                if (!this.$vuetify.theme.dark) {
                    return "wb_sunny";
                } else {
                    return "brightness_2";
                }
            },
            isLang() {
                if (i18n.locale === "ru")
                    return "ru";
                else {
                    return "en";
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
        methods: {
            ...mapMutations(["setSettings", "setSettingsDialog"]),
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
    .wave {
        font-size: 1.5em;
        margin: 10px;
        animation-name: wave-animation;
        animation-duration: 2.5s;
        animation-iteration-count: infinite;
        transform-origin: 70% 70%;
        display: inline-block;
    }

    @keyframes wave-animation {
        0% {
            transform: rotate(0deg)
        }
        10% {
            transform: rotate(-10deg)
        }
        20% {
            transform: rotate(12deg)
        }
        30% {
            transform: rotate(-10deg)
        }
        40% {
            transform: rotate(9deg)
        }
        50% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(0deg)
        }
    }
</style>