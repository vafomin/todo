<template>
  <v-card class="mx-4 mx-sm-auto my-4">
    <v-card-text>
      <p class="handle headline">
        <v-chip v-if="tag !== ''" class="ma-2" close :color="tagColor" outlined @click:close="delTag">{{ tag }}</v-chip>
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
      <v-btn color="primary" outlined @click="openDialog" :disabled="disabled">
        <v-icon v-if="tag !== ''">mdi-tag-text</v-icon>
        <v-icon v-else>mdi-tag-plus</v-icon>
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
            <v-color-picker
                width="100%"
                v-model="myTagColor"
                mode="hexa"
                hide-canvas
                hide-inputs
                show-swatches
                :swatches="swatches"
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
    tagColor: String,
    created: undefined
  },
  mounted() {
    console.log(this.tag);
  },
  data() {
    return {
      disabled: false,
      dialog: false,
      tagName: "",
      myTagColor: "#03A9F4",
      swatches: [
        ["#F44336", "#CDDC39"],
        ["#E91E63", "#FFEB3B"],
        ["#9C27B0", "#FFC107"],
        ["#673AB7", "#FF9800"],
        ["#3F51B5", "#FF5722"],
        ["#2196F3", "#795548"],
        ["#03A9F4", "#607D8B"],
        ["#00BCD4", "#9E9E9E"],
      ],
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
      let tagColor = this.tagColor;
      this.doneTask({id, task, tag, tagColor}).then(() => this.disabled = false);
    },
    openDialog() {
      this.dialog = true;
      this.tagName = this.tag;
      this.myTagColor = this.tagColor;
    },
    newTag() {
      let id = this.id;
      let tag = this.tagName.trim();
      let tagColor = this.myTagColor;
      this.updTag({id, tag, tagColor});
      this.tagName = "";
      this.myTagColor = "#03A9F4";
      this.dialog = false;
    },
    delTag() {
      let id = this.id;
      let tag = "";
      let tagColor = "#03A9F4"
      this.updTag({id, tag, tagColor});
    }
  }
}
</script>
