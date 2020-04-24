<template>
    <v-card
            class="mx-auto my-4"
            width="40em"
    >
        <v-card-text>
            <p class="headline">{{ task }}</p>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" outlined>
                <v-icon>mdi-check</v-icon>
                {{ $t("buttons.done") }}
            </v-btn>
            <v-btn color="error" outlined>
                <v-icon>mdi-delete</v-icon>
                {{ $t("buttons.delete") }}
            </v-btn>

        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "TaskCard",
        props: {
            task: String
        }
    }
</script>

<style scoped>

</style>
