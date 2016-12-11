const Vue = require("vue");
const template = require("~components/main.html");

require("~components/main.less");

module.exports = Vue.component("sb-main", {
    template,
    props: ["routes", "current-route"],
    computed: {
        routePaths() {
            return this.routes.map(r => r.path);
        },
        route() {
            return this.currentRoute.path;
        },
        currentIndex() {
            const result = this.routes.findIndex(r => r.path == this.currentRoute.path);

            return result;
        },
        previousPath() {
            const prevIndex = this.currentIndex - 1;

            if (prevIndex < 0) {
                return "";
            }

            return this.routes[prevIndex].path;
        },
        nextPath() {
            const nextIndex = this.currentIndex + 1;

            if (nextIndex >= this.routes.length) {
                return "";
            }

            return this.routes[nextIndex].path;
        }
    }
});