"use strict";
module.exports = function (hour, minut, second) {
    var date = new Date();
    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours() + hour, date.getUTCMinutes() + minut, date.getUTCSeconds() + second);
    return date;
};
