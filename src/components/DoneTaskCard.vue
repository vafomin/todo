<template>
  <v-card class="mx-4 mx-sm-auto my-4">
    <v-card-text>
      <p class="headline">
        <v-chip v-if="tag !== ''" class="ma-2" :color="tagColor" outlined>{{ tag }}</v-chip>
        {{ task }}
      </p>
      <small>{{ $t("done") }} {{ created | dateTransform }}</small>
    </v-card-text>
    <v-card-actions>
      <v-btn color="blue lighten-1" outlined @click="restore" :disabled="disabled">
        <v-icon>mdi-restore</v-icon>
      </v-btn>
      <v-btn color="error" outlined @click="del" :disabled="disabled">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DoneTaskCard",
  props: {
    id: String,
    task: String,
    tag: String,
    tagColor: String,
    created: undefined
  },
  data() {
    return {
      disabled: false
    }
  },
  methods: {
    ...mapActions("app", ["deleteDone", "restoreTask"]),
    del() {
      let id = this.id;
      this.deleteDone({id});
      this.deleteDone({id});
    },
    restore() {
      this.disabled = true;
      let id = this.id;
      let task = this.task;
      let tag = this.tag;
      let tagColor = this.tagColor;
      this.restoreTask({id, task, tag, tagColor}).then(() => this.disabled = false);
    }
  }
}
</script>
