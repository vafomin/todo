<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ $t("auth.title") }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="email" :label="$t('auth.email')" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="password" :label="$t('auth.password')" type="password"
                                              required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>{{ $t("auth.noAccount") }} {{ $t("auth.reg") }}</small>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" outlined @click="login">{{ $t("auth.btn") }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                error: false
            }
        },
        computed: {
            dialog: {
                get() {
                    return this.$store.state.loginForm;
                },
                set(v) {
                    this.$store.commit("setLoginForm", v);
                }
            }
        },
        methods: {
            login() {
                api.auth(this.email, this.password).then(r => {
                    this.$store.commit("setUser", r.user);
                    this.$store.commit("updateTasks", r.tasks);
                    this.$store.commit("updateDone", r.done);
                    this.dialog = false;
                }).catch(() => {
                    this.error = true;
                });
            }
        }
    }
</script>

<style scoped>

</style>
