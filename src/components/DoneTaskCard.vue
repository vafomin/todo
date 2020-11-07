<template>
  <v-card class="mx-4 mx-sm-auto my-4" width="75vw">
    <v-card-text>
      <p class="headline">
        <v-chip v-if="tag !== ''" class="ma-2" color="primary" outlined >{{ tag }}</v-chip>
        {{ task }}
      </p>
      <small>{{ $t("done") }} {{ created | dateTransform }}</small>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue lighten-1" outlined @click="restore" :disabled="disabled">
        <v-icon>mdi-restore</v-icon>
        {{ $t("buttons.restore") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "DoneTaskCard",
  props: {
    id: String,
    task: String,
    tag: String,
    created: undefined
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    ...mapActions("app", ["restoreTask"]),

    restore() {
      this.disabled = true;
      let id = this.id;
      let task = this.task;
      let tag = this.tag;
      this.restoreTask({id, task, tag}).then(() => this.disabled = false);
    }
  }
}
</script>
