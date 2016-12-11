const VueRouter = require("vue-router");

module.exports = {
    router: new VueRouter({
        routes: [
            {
                path: "/a",
                component: require("~/components/a/a.js")
            },
            {
                path: "/b",
                component: require("~/components/b/b.js")
            },
            {
                path: "/c",
                component: require("~/components/c/c.js")
            }
        ]
    })
};