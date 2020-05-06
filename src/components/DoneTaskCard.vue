<template>
    <v-card class="mx-auto my-4" width="70vw">
        <v-card-text>
            <p class="headline">{{ task }}</p>
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

    export default {
        name: "TaskCard",
        props: {
            id: String,
            task: String
        },
        methods: {
            ...mapActions(["restoreTask"]),

            restore() {
                let id = this.id;
                let task = this.task;
                this.restoreTask({id, task});
            }
        }
    }
</script>
