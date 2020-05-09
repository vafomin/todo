<template>
    <div class="v-container pa-4">
        <v-layout column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <p v-if="!isAuth" class="headline text-center">{{ $t("start") }}</p>
                <v-tabs v-model="tab" grow>
                    <v-tabs-slider v-if="tab === 1" color="green"></v-tabs-slider>
                    <v-tab>
                        <v-badge v-if="taskCount > 0" :content="taskCount">
                            {{ $t("tabs.tasks") }}
                        </v-badge>
                        <p v-else>{{ $t("tabs.tasks") }}</p>
                    </v-tab>
                    <v-tab>
                        <v-badge v-if="doneCount > 0" :content="doneCount" color="green">
                            <div class="green--text">{{ $t("tabs.done") }}</div>
                        </v-badge>
                        <div v-else class="green--text">{{ $t("tabs.done") }}</div>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <div class="tab-item-wrapper">
                            <v-form class="my-4" @submit.prevent="newTask">
                                <v-text-field
                                        v-model="task"
                                        :label="$t('enterTask')"
                                        solo
                                        class="mx-6 mx-sm-auto"
                                        style="width: 70vw;">
                                    <template slot="append">
                                        <v-btn outlined @click="newTask">
                                            {{ $t("buttons.add") }}
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-form>
                            <v-skeleton-loader
                                    :loading="!isLoading"
                                    :boilerplate="true"
                                    class="mx-4 mx-sm-auto my-4"
                                    width="75vw"
                                    type="card, card"
                            >
                                <p class="headline text-center" v-if="taskCount === 0">{{ $t("tabs.noTask") }}</p>
                                <TaskCard v-else v-for="(task, i) in taskList" :key="i" :id="task.id"
                                          :task="task.task"
                                          :created="task.createdOn"/>
                            </v-skeleton-loader>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div class="tab-item-wrapper">
                            <p class="headline text-center ma-10" v-if="doneCount === 0">{{ $t("tabs.noDone") }}</p>
                            <DoneCard v-else v-for="(task, i) in doneList" :key="i" :id="task.id"
                                      :task="task.task"
                                      :created="task.createdOn"/>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        components: {
            TaskCard: () => import("../components/TaskCard"),
            DoneCard: () => import("../components/DoneTaskCard")
        },
        data() {
            return {
                tab: null,
                task: ""
            }
        },
        computed: {
            ...mapState(["user", "load", "tasks", "done"]),
            isAuth() {
                return this.user != null;
            },
            isLoading() {
                return this.load;
            },
            taskList() {
                return this.tasks;
            },
            taskCount() {
                return this.tasks.length;
            },
            doneList() {
                return this.done;
            },
            doneCount() {
                return this.done.length;
            }
        },
        mounted() {
            setTimeout(() => this.setLoad(true), 1000);
        },
        methods: {
            ...mapMutations(["setUser", "setLoad"]),
            ...mapActions(["addTask"]),
            newTask() {
                if (this.task.trim().length > 0) {
                    let task = this.task;
                    this.addTask({task});
                    this.task = "";
                }
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
