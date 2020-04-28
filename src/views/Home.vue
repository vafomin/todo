<template>
    <div class="v-container pa-4">
        <v-layout column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <p v-if="!isAuth" class="headline text-center">{{ $t("start") }}
                    <a @click="dialog=true">{{ $t("buttons.login").toLowerCase() }}</a>
                </p>
                <p v-else class="headline text-center">{{ $t("auth.youLogin") }} {{ user }}.
                    <a @click="logout">{{ $t("auth.logout") }}</a>
                </p>
                <v-tabs v-model="tab" grow>
                    <v-tab>{{ $t("tabs.tasks") }}</v-tab>
                    <v-tab :disabled="disabled">{{ $t("tabs.done") }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="tab-item-wrapper">
                            <v-form class="my-4" @submit.prevent="addTask">
                                <v-text-field
                                        v-model="task"
                                        :label="$t('enterTask')"
                                        solo
                                        style="margin: auto; width: 70vw;"> >
                                    <template slot="append">
                                        <v-btn outlined @click="addTask">
                                            {{ $t("buttons.add") }}
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-form>
                            <p class="headline text-center" v-if="taskList.length === 0">{{ $t("noTask") }}</p>
                            <draggable v-else v-model="taskList" :animation="200" handle=".handle">
                                <TaskCard v-for="task in taskList" :key="task" :task="task"/>
                            </draggable>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="tab-item-wrapper">
                            <DoneTaskCard v-for="task in doneList" :key="task" :task="task"/>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>

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
    </div>
</template>

<script>
    import api from "../plugins/api";

    export default {
        components: {
            TaskCard: () => import("../components/TaskCard"),
            DoneTaskCard: () => import("../components/DoneTaskCard"),
            draggable: () => import("vuedraggable")
        },
        data() {
            return {
                tab: null,
                task: "",
                dialog: false,
                email: "",
                password: ""
            }
        },
        computed: {
            isAuth: function () {
                return this.$store.state.user != null;
            },
            disabled: function () {
                return this.$store.state.done.length <= 0;
            },
            taskList: {
                get() {
                    return this.$store.state.tasks;
                },
                set(value) {
                    this.$store.commit("updateTasks", value);
                }
            },
            doneList: function () {
                return this.$store.state.done;
            },
            user: function () {
                return this.$store.state.user;
            }
        },
        methods: {
            addTask() {
                if (this.task.length > 0) {
                    this.$store.commit("setTasks", this.task);
                    this.task = "";
                }
            },
            login() {
                api.auth(this.email, this.password).then(response => {
                    this.$store.commit("setUser", response);
                    this.dialog = false;
                });
            },
            logout() {
                this.$store.commit("setUser", null);
            }
        }
    }
</script>

<style>
    .tab-item-wrapper {
        width: 100vw;
        overflow-y: auto;
    }
</style>
