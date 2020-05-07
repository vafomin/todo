import Vue from "vue"

const dateFormat = require('dateformat');

Vue.filter("dateTransform", function dateTransform(date) {
    try {
        date = date.toDate();
    } catch (e) {
        date = new Date(date);
    }
    return dateFormat(date, 'HH:MM dd.mm.yyyy');
});
