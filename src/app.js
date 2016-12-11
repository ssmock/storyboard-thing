const Vue = require("vue");
const VueRouter = require("vue-router");
const routing = require("./routing.js");

const main = require("~components/main.js");

Vue.use(VueRouter);

document.addEventListener("DOMContentLoaded", () => {
    var vm = new Vue({
        el: "#app",
        template: "<sb-main v-bind:routes='$router.options.routes' v-bind:current-route='$route'></sb-main>",
        router: routing.router
    });
});