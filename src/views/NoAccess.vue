<template>
    <div class="v-container pa-4">
        <v-layout class="text-xs-center" column="column" justify-center="justify-center" align-center="align-center">
            <v-flex xs12="xs12" md10="md10">
                <div class="headline pb-4">
                    <h1>{{ $t("noAccess") }}</h1>
                </div>
                <v-btn color="primary" outlined large to="/">
                    {{ $t("buttons.home") }}
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>
