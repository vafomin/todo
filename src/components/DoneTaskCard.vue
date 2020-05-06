<template>
    <v-card class="mx-4 mx-sm-auto my-4" width="75vw">
        <v-card-text>
            <p class="headline">{{ task }}</p>
            <small>{{ $t("done") }} {{ created.toDate() | dateTransform }}</small>
        </v-card-text>
        <v-card-actions>
            <v-btn color="blue lighten-1" outlined @click="restore">
                <v-icon>mdi-restore</v-icon>
                {{ $t("buttons.restore") }}
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
            ...mapActions(["restoreTask"]),

            restore() {
                let id = this.id;
                let task = this.task;
                this.restoreTask({id, task});
            }
        },
        filters: {
            dateTransform(date) {
                return dateFormat(date, 'h:MM dd.mm.yyyy');
            }
        }
    }
</script>
