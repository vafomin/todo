<template>
  <div class="v-container mx-lg-16 px-lg-16">
    <div v-if="!isLoading" class="text-center ma-16 pa-16">
      <v-progress-circular :size="70" indeterminate
                           color="primary"></v-progress-circular>
    </div>
    <p v-if="!isAuth" class="headline text-center">{{ $t("start") }}</p>
    <div v-if="isLoading">
      <v-tabs v-model="tab" grow :background-color="this.$vuetify.theme.dark ? '#121212' : ''">
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
          <div class="tab-item-wrapper pa-6" :style="getStyle">
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
            <p v-if="currentTag.tag !== ''" >
              {{ $t('currentTag') }}
            <v-chip class="ma-2" close :color="currentTag.color" outlined @click:close="resetCurrentTag">
              {{ currentTag.tag }}
            </v-chip>
            </p>
            <p class="headline text-center" v-if="tasksCount === 0">{{ $t("tabs.noTask") }}</p>
            <TaskCard v-else-if="tasksCount > 0 && currentTag.tag === ''" v-for="(task, i) in taskList" :key="i"
                      :id="task.id"
                      :task="task.task"
                      :tag="task.tag"
                      :tagColor="task.tagColor"
                      :created="task.createdOn"/>
            <div v-else v-for="(task, i) in taskList" :key="i">
              <TaskCard v-if="currentTag.tag === task.tag" :id="task.id"
                        :task="task.task"
                        :tag="task.tag"
                        :tagColor="task.tagColor"
                        :created="task.createdOn"/>
            </div>
          </div>

        </v-tab-item>
        <v-tab-item>
          <div class="tab-item-wrapper pa-6" :style="getStyle">
            <p class="headline text-center" v-if="doneCount === 0">{{ $t("tabs.noDone") }}</p>
            <DoneCard v-else v-for="(task, i) in doneList" :key="i" :id="task.id"
                      :task="task.task"
                      :tag="task.tag"
                      :tagColor="task.tagColor"
                      :created="task.createdOn"/>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";

export default {
  components: {
    TaskCard: () => import("../components/TaskCard"),
    DoneCard: () => import("../components/DoneTaskCard")
  },
  data() {
    return {
      tab: null,
      task: "",
    }
  },
  computed: {
    ...mapState(["user", "load", "currentTag"]),
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
    },
    getStyle() {
      return this.$vuetify.theme.dark ? "background: #121212" : "";
    }

  },
  methods: {
    ...mapMutations(["setUser", "setLoad", "setCurrentTag"]),
    ...mapActions("app", ["addTask"]),
    newTask() {
      if (this.task.trim().length > 0) {
        let task = this.task;
        this.addTask({task});
        this.task = "";
      }
    },
    resetCurrentTag() {
      this.setCurrentTag({tag: "", color: "#03A9F4"});
    }
  }
}
</script>
