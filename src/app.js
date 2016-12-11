const thing = require("~templates/app.html");

const config = require("~/config.js");

console.log(config);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("app").innerHTML = thing;
});