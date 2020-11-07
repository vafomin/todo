<template>
  <v-card class="mx-4 mx-sm-auto my-4" width="75vw">
    <v-card-text>
      <p class="handle headline">
        <v-chip v-if="tag !== ''" class="ma-2" close color="primary" outlined @click:close="delTag">{{ tag }}</v-chip>
        {{ task }}
      </p>
      <small>{{ $t("created") }} {{ created | dateTransform }}</small>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" outlined @click="done" :disabled="disabled">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn color="error" outlined @click="del" :disabled="disabled">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn color="primary" outlined @click="dialog = true" :disabled="disabled">
        <v-icon>mdi-tag-plus</v-icon>
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline">
          {{ $t("addTag") }}
        </v-card-title>
        <v-card-text>
          <v-form class="my-4" @submit.prevent="newTag">
          <v-text-field
              v-model="tagName"
              :label="$t('tagName')"
              solo
          />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="primary" text @click="newTag">
            {{ $t("addTag") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'


export default {
  name: "TaskCard",
  props: {
    id: String,
    task: String,
    tag: String,
    created: undefined
  },
  mounted() {
    console.log(this.tag);
  },
  data() {
    return {
      disabled: false,
      dialog: false,
      tagName: ""
    }
  },
  methods: {
    ...mapActions("app", ["deleteTask", "doneTask", "updTag"]),
    del() {
      let id = this.id;
      this.deleteTask({id});
      this.deleteTask({id});
    },
    done() {
      this.disabled = true;
      let id = this.id;
      let task = this.task;
      let tag = this.tag;
      this.doneTask({id, task, tag}).then(() => this.disabled = false);
    },
    newTag() {
      let id = this.id;
      let tag = this.tagName.trim();
      this.updTag({id, tag});
      this.tagName = "";
      this.dialog = false;
    },
    delTag() {
      let id = this.id;
      let tag = "";
      this.updTag({id, tag});
    }
  }
}
</script>
