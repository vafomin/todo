<template>
    <v-card
            class="mx-auto my-4"
            width="40em"
    >
        <v-card-text>
            <p class="headline">{{ task }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="blue lighten-3" outlined @click="restoreTask">
                <v-icon>mdi-restore</v-icon>
                {{ $t("buttons.restore") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "TaskCard",
        props: {
            task: String
        },
        methods: {
            restoreTask() {
                this.$store.commit("setTasks", this.task);
                let idx = this.$store.state.done.indexOf(this.task);
                this.$store.commit("deleteDone", idx);
            },
        }
    }
</script>

<style scoped>

</style>
