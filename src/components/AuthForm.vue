<template>
    <v-row justify="center">
        <v-dialog v-model="loginDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $t("auth.loginTitle") }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="email" :label="$t('auth.email')" :rules="emailRules"
                                              required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="password" :label="$t('auth.password')" type="password"
                                              required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>{{ $t("auth.noAccount") }} <a @click="openRegForm">{{ $t("auth.reg") }}</a></small>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" outlined @click="login">{{ $t("auth.loginBtn") }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="regDialog" max-width="600px">
            <v-form v-model="valid">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ $t("auth.regTitle") }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="email" :label="$t('auth.email')" :rules="emailRules"
                                                  required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="password" :label="$t('auth.password')" :rules="passwordRules"
                                                  type="password" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>{{ $t("auth.haveAccount") }} <a @click="openLoginForm">{{ $t("auth.login") }}</a></small>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :disabled="!valid" color="primary" outlined @click="reg">{{ $t("auth.regBtn") }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-snackbar v-model="error" color="error" :timeout="2000" top>
            {{ $t("auth.error") }}
        </v-snackbar>
    </v-row>
</template>

<script>
    import api from "../plugins/api";

    export default {
        name: "AuthForm",
        data() {
            return {
                email: "",
                password: "",
                valid: true,
                error: false,
                emailRules: [
                    v => !!v || this.$t("auth.emailReq"),
                    v => /.+@.+\..+/.test(v) || this.$t("auth.emailError"),
                ],
                passwordRules: [
                    v => (v && v.length >= 8) || this.$t("auth.passwordLen"),
                ]
            }
        },
        computed: {
            loginDialog: {
                get() {
                    return this.$store.state.loginForm;
                },
                set(v) {
                    this.$store.commit("setLoginForm", v);
                }
            },
            regDialog: {
                get() {
                    return this.$store.state.regForm;
                },
                set(v) {
                    this.$store.commit("setRegForm", v);
                }
            }

        },
        methods: {
            login() {
                api.auth(this.email, this.password).then(r => {
                    this.$store.commit("setUser", r.user);
                    this.$store.commit("updateTasks", r.tasks);
                    this.$store.commit("updateDone", r.done);
                    this.$store.commit("setLoginForm", false);
                }).catch(() => {
                    this.error = true;
                });
            },
            reg() {
                console.log("Reg");
            },
            openLoginForm() {
                this.$store.commit("setRegForm", false);
                this.$store.commit("setLoginForm", true);
            },
            openRegForm() {
                this.$store.commit("setLoginForm", false);
                this.$store.commit("setRegForm", true);
            }
        }
    }
</script>

<style scoped>

</style>
