<template>
    <v-card class="mx-4 mx-sm-auto my-4" width="75vw">
        <v-card-text>
            <p class="handle headline">{{ task }}</p>
            <small>{{ $t("created") }} {{ created.toDate() | dateTransform }}</small>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" outlined @click="done">
                <v-icon>mdi-check</v-icon>
                {{ $t("buttons.done") }}
            </v-btn>
            <v-btn color="error" outlined @click="del">
                <v-icon>mdi-delete</v-icon>
                {{ $t("buttons.delete") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'

    const dateFormat = require('dateformat');

    export default {
        name: "TaskCard",
        props: {
            id: String,
            task: String,
            created: Object
        },
        methods: {
            ...mapActions(["deleteTask", "doneTask"]),
            del() {
                let id = this.id;
                this.deleteTask({id});
            },
            done() {
                let id = this.id;
                let task = this.task;
                this.doneTask({id, task})
            },
        },
        filters: {
            dateTransform(date) {
                return dateFormat(date, 'h:MM dd.mm.yyyy');
            }
        }
    }
</script>
