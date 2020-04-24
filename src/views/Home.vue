<template>
    <div class="v-container pa-4">
        <v-layout class="text-xs-center" column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <v-text-field
                        v-model="task"
                        :label="$t('enterTask')"
                        solo
                        style="margin-right: 15px; width: 50em"
                >
                    <template slot="append">
                        <v-btn outlined @click="addTask">
                            {{ $t("buttons.add") }}
                        </v-btn>
                    </template>
                </v-text-field>
                <TaskCard v-for="task in taskList" :key="task" :task="task"/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        components: {
            TaskCard: () => import("../components/TaskCard")
        },
        data() {
            return {
                task: "",
                googleSignInParams: {
                    client_id: "901060617777-1nic5bknq28bi7ohhj9k66398hlqtvp4.apps.googleusercontent.com"
                }
            }
        },
        computed: {
            taskList: function () {
                return this.$store.state.tasks;
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
    .g-signin-button {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
        cursor: pointer;
    }
</style>
