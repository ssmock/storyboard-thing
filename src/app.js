const Vue = require("vue");

const main = require("~components/main.js");

document.addEventListener("DOMContentLoaded", () => {
    var vm = new Vue({
        el: "#app",
        template: "<sb-main></sb-main>"
    });
});