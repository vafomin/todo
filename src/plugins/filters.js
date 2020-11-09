import Vue from "vue";

const dateFormat = require("dateformat");

Vue.filter("dateTransform", function dateTransform(date) {
    date = new Date(date.seconds * 1000);
    return dateFormat(date, "HH:MM dd.mm.yyyy");
});
