<template>
    <div class="v-container pa-4">
        <v-layout class="text-xs-center" column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <v-tabs v-model="tab" grow>
                    <v-tab>{{ $t("tabs.tasks") }}</v-tab>
                    <v-tab :disabled="disabled">{{ $t("tabs.done") }}</v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="tab-item-wrapper">
                            <br>
                            <v-text-field
                                    v-model="task"
                                    :label="$t('enterTask')"
                                    solo
                                    style="margin: 15px;"
                            >
                                <template slot="append">
                                    <v-btn outlined @click="addTask">
                                        {{ $t("buttons.add") }}
                                    </v-btn>
                                </template>
                            </v-text-field>
                            <TaskCard v-for="task in taskList" :key="task" :task="task"/>
                        </div>
                    </v-tab-item>
                    <v-tab-item class="tab-item-wrapper">
                        <DoneTaskCard v-for="task in doneList" :key="task" :task="task"/>
                    </v-tab-item>

                </v-tabs-items>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        components: {
            TaskCard: () => import("../components/TaskCard"),
            DoneTaskCard: () => import("../components/DoneTaskCard")
        },
        data() {
            return {
                tab: null,
                task: "",
                googleSignInParams: {
                    client_id: "901060617777-1nic5bknq28bi7ohhj9k66398hlqtvp4.apps.googleusercontent.com"
                }
            }
        },
        computed: {
            disabled: function () {
                return this.$store.state.done.length <= 0;
            },
            taskList: function () {
                return this.$store.state.tasks;
            },
            doneList: function () {
                return this.$store.state.done;
            }
        },
        methods: {
            addTask() {
                this.$store.commit("setTasks", this.task);
                this.task = "";
            }
        }
    }
</script>

<style>
    .tab-item-wrapper {
        width: 50em;
        height: calc(100vh - 48px);
        overflow-y: auto;
    }
</style>
