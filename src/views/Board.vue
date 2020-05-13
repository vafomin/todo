<template>
    <div class="v-container pa-4">
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
                <div class="tab-item-wrapper pa-6">
                    <div v-if="!isLoading" class="text-center">
                        <v-progress-circular :size="70" indeterminate
                                             color="primary"></v-progress-circular>
                    </div>
                    <div v-else>
                        <p class="headline text-center" v-if="taskCount === 0">{{ $t("tabs.noTask") }}</p>
                        <Card v-else v-for="(task, i) in taskList" :key="i" :id="task.id"
                              :task="task.task"
                              :created="task.createdOn"/>
                    </div>
                </div>
            </v-tab-item>
            <v-tab-item>
                <div class="tab-item-wrapper pa-6">
                    <p class="headline text-center" v-if="doneCount === 0">{{ $t("tabs.noDone") }}</p>
                    <Card v-else v-for="(task, i) in doneList" :key="i" :id="task.id"
                          :task="task.task"
                          :created="task.createdOn" :tab="tab"/>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex'

    const fb = require('../../firebaseConfig');

    export default {
        name: "Board",
        components: {
            Card: () => import("../components/Card")
        },
        data() {
            return {
                tab: null,
            }
        },
        created() {
            this.setLoad(false);
        },
        mounted() {
            const uid = this.$route.params.id;
            if (this.user && this.user.uid === uid) {
                this.$router.replace("../");
            }
            fb.usersCollection.doc(uid).get().then((doc) => {
                if (!doc.exists || !doc.data().isShare) {
                    this.$router.replace("../noAccess");
                }
            });
            fb.tasksCollection.where("authorId", "==", uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
                let tasks = [];
                querySnapshot.forEach(doc => {
                    let task = doc.data();
                    task.id = doc.id;
                    tasks.push(task);
                });
                this.setBoardTasks(tasks);
            });
            fb.doneCollection.where("authorId", "==", uid).orderBy("createdOn", "desc").onSnapshot(querySnapshot => {
                let done = [];
                querySnapshot.forEach(doc => {
                    let task = doc.data();
                    task.id = doc.id;
                    done.push(task);
                });
                this.setBoardDone(done);
            });
            setTimeout(() => this.setLoad(true), 1000);
        },
        computed: {
            ...mapState(["load", "user"]),
            ...mapState("app", ["boardTasks", "boardDone"]),
            ...mapGetters("app", ["tasksBoardCount", "doneBoardCount"]),
            isLoading() {
                return this.load;
            },
            taskList() {
                return this.boardTasks;
            },
            doneList() {
                return this.boardDone;
            },
        },
        methods: {
            ...mapMutations(["setLoad", "setBoardTasks", "setBoardDone"]),
        }
    }
</script>
