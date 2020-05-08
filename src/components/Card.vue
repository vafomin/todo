<template>
    <v-card class="mx-4 mx-sm-auto my-4" width="75vw">
        <v-card-text>
            <p class="handle headline">{{ task }}</p>
            <small>{{ $t("created") }} {{ created | dateTransform }}</small>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Card",
        props: {
            id: String,
            task: String,
            created: Object
        }
    }
</script>
