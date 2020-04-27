<template>
    <div class="v-container pa-4">
        <v-layout column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
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
    </div>
</template>

<script>
    export default {
        components: {
            TaskCard: () => import("../components/TaskCard"),
            DoneTaskCard: () => import("../components/DoneTaskCard"),
            draggable: () => import("vuedraggable")
        },
        data() {
            return {
                tab: null,
                task: ""
            }
        },
        computed: {
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
            }
        },
        methods: {
            addTask() {
                if (this.task.length > 0) {
                    this.$store.commit("setTasks", this.task);
                    this.task = "";
                }
            },
            upd() {
                this.$store.commit("updateTasks", this.taskList);
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
