const Vue = require("vue");
const VueRouter = require("vue-router");
const router = require("./routing.js").router;

const main = require("~components/main.js");

Vue.use(VueRouter);

document.addEventListener("DOMContentLoaded", () => {
    var vm = new Vue({
        el: "#app",
        template: "<sb-main></sb-main>",
        router: router
    });
});