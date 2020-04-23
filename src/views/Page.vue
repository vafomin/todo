<template>
    <div class="v-container pa-4">
        <v-layout class="text-xs-center" column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <div class="headline pb-4">
                    <h1>{{ $t("profile") }}</h1>
                </div>
                <p>{{ $t("hello") }}, {{ profile }}</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        computed: {
            profile() {
                return this.$store.getters.profile
            }
        }
    }
</script>
