<template>
  <div class="v-container pa-4">
    <v-layout column="column" justify-center="justify-center" align-center="align-center">
      <v-flex xs12="xs12" md10="md10">
        <p v-if="!isAuth" class="headline text-center">{{ $t("start") }}</p>

        <v-tabs v-model="tab" grow>
          <v-tabs-slider v-if="tab === 1" color="green"></v-tabs-slider>
          <v-tab>
            <v-badge v-if="showBadges && tasksCount > 0" :content="tasksCount">
              <span>{{ $t("tabs.tasks") }}</span>
            </v-badge>
            <span v-else>{{ $t("tabs.tasks") }}</span>
          </v-tab>
          <v-tab>
            <v-badge v-if="showBadges && doneCount > 0" :content="doneCount" color="green">
              <span class="green--text">{{ $t("tabs.done") }}</span>
            </v-badge>
            <span v-else class="green--text">{{ $t("tabs.done") }}</span>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-form class="my-4" @submit.prevent="newTask">
              <v-text-field
                  v-model="task"
                  solo
                  :label="$t('enterTask')">
                <template slot="append">
                  <v-btn outlined @click="newTask">
                    {{ $t("buttons.add") }}
                  </v-btn>
                </template>
              </v-text-field>
            </v-form>
            <div v-if="!isLoading" class="text-center mb-6">
              <v-progress-circular :size="70" indeterminate
                                   color="primary"></v-progress-circular>
            </div>
            <div v-else>
              <p class="headline text-center" v-if="tasksCount === 0">{{ $t("tabs.noTask") }}</p>
              <TaskCard v-else v-for="(task, i) in taskList" :key="i" :id="task.id"
                        :task="task.task"
                        :tag="task.tag"
                        :created="task.createdOn"/>
            </div>
          </v-tab-item>
          <v-tab-item>
            <p class="headline text-center" v-if="doneCount === 0">{{ $t("tabs.noDone") }}</p>
            <DoneCard v-else v-for="(task, i) in doneList" :key="i" :id="task.id"
                      :task="task.task"
                      :tag="task.tag"
                      :created="task.createdOn"/>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

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
    ...mapState(["user", "load"]),
    ...mapState("app", ["tasks", "done"]),
    ...mapState("settings", ["settings"]),
    ...mapGetters("app", ["tasksCount", "doneCount"]),
    isAuth() {
      return this.user != null;
    },
    isLoading() {
      return this.load;
    },
    taskList() {
      return this.tasks;
    },
    doneList() {
      return this.done;
    },
    showBadges() {
      return this.settings.showBadges;
    }
  },
  methods: {
    ...mapMutations(["setUser", "setLoad"]),
    ...mapActions("app", ["addTask"]),
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
